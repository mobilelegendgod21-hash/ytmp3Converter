const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// On Render (Linux), we'll use the pip-installed version which is in the PATH.
// On Windows (Dev), we likely still want the local exe or we can assume user has it in PATH too.
// For safety in dev, we can keep the check, but for Prod (Linux), we perform a specific check.
const YT_DLP_PATH = process.platform === 'win32' ? path.join(__dirname, 'yt-dlp.exe') : 'yt-dlp';

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://ytmp3-converter-omega.vercel.app',
        'https://rhein-mp3.vercel.app' // Just in case
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Main Route
app.get('/', (req, res) => {
    res.send('Rhein\'s MP3 Backend is running with yt-dlp!');
});

// Conversion Route
app.get('/convert', (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    console.log(`Starting conversion for: ${videoURL}`);

    // Set Headers for Download
    // We don't know the title yet, so we'll set a generic one or try to fetch it first?
    // Using a generic name for streaming is safer to avoid double-fetching.
    // Or we can rely on frontend sending the title if we want.
    // Let's settle for "audio.mp3" or try to fetch title quickly? 
    // Fetching title adds delay. Let's send "download.mp3" and let user rename, or frontend can suggest name?
    // Actually, we can fetch metadata first in frontend, so frontend knows the title.
    // The browser prompt will use the name in Content-Disposition.
    // Let's use "audio.mp3" for now to be fast, or "RheinMP3-Convert.mp3".

    res.header('Content-Disposition', 'attachment; filename="RheinMP3-Audio.mp3"');
    res.header('Content-Type', 'audio/mpeg');

    // Spawn yt-dlp to stream MP3 to stdout
    const args = [
        videoURL,
        '-x',                   // Extract audio
        '--audio-format', 'mp3',// Convert to MP3
        '--audio-quality', '0', // Best quality
        '--ffmpeg-location', ffmpegPath, // Use local ffmpeg
        '-o', '-',              // Output to stdout
        '--force-overwrites',
        '--no-playlist'
    ];

    const ytDlpProcess = spawn(YT_DLP_PATH, args);

    // Pipe stdout (MP3 data) to Response
    ytDlpProcess.stdout.pipe(res);

    // Validating error stream
    ytDlpProcess.stderr.on('data', (data) => {
        // console.error(`yt-dlp stderr: ${data}`); // Optional logging
    });

    ytDlpProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`yt-dlp failed with code ${code}`);
            // If headers haven't been sent (unlikely if piping started), send error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Conversion failed' });
            }
        } else {
            console.log('Conversion finished successfully');
        }
    });
});

// Metadata Route
app.get('/info', (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    // Spawn yt-dlp to dump JSON
    const args = [
        videoURL,
        '--dump-json',
        '--no-playlist',
        '--skip-download'
    ];

    const ytDlpProcess = spawn(YT_DLP_PATH, args);
    let outputData = '';
    let errorData = '';

    ytDlpProcess.stdout.on('data', (chunk) => {
        outputData += chunk;
    });

    ytDlpProcess.stderr.on('data', (chunk) => {
        errorData += chunk;
    });

    ytDlpProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('yt-dlp info fetch failed:', errorData);
            return res.status(500).json({ error: 'Failed to fetch metadata', details: errorData });
        }

        try {
            const info = JSON.parse(outputData);

            // Check Duration Limit (e.g., 15 minutes = 900 seconds)
            const MAX_DURATION_SECONDS = 900;
            if (info.duration > MAX_DURATION_SECONDS) {
                return res.status(400).json({
                    error: 'Video too long',
                    details: `Video duration (${Math.floor(info.duration / 60)}m) exceeds the limit of 15 minutes.`
                });
            }

            res.json({
                title: info.title,
                thumbnail: info.thumbnail,
                lengthSeconds: info.duration,
                author: info.uploader || info.channel
            });
        } catch (err) {
            console.error('JSON Parse Error:', err);
            res.status(500).json({ error: 'Failed to parse metadata' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Using yt-dlp at: ${YT_DLP_PATH}`);
    console.log(`Using ffmpeg at: ${ffmpegPath}`);
});
