const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const platform = process.platform;
let url = '';
let filename = 'yt-dlp';

if (platform === 'win32') {
    url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
    filename = 'yt-dlp.exe';
} else {
    url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp';
    filename = 'yt-dlp';
}

const filePath = path.join(__dirname, filename);
console.log(`[Setup] Target path: ${filePath}`);

if (fs.existsSync(filePath)) {
    console.log(`[Setup] yt-dlp already exists. Deleting to ensure fresh download...`);
    try { fs.unlinkSync(filePath); } catch (e) { }
}

console.log(`[Setup] Downloading yt-dlp for ${platform} from ${url}...`);
const file = fs.createWriteStream(filePath);

https.get(url, (response) => {
    if (response.statusCode !== 200) {
        console.error(`[Setup] Failed to download: HTTP ${response.statusCode}`);
        process.exit(1);
    }

    response.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log('[Setup] Download completed.');
        if (platform !== 'win32') {
            try {
                execSync(`chmod +x ${filePath}`);
                console.log('[Setup] Made yt-dlp executable.');
            } catch (e) {
                console.error('[Setup] Failed to make executable:', e);
                process.exit(1);
            }
        }
    });
}).on('error', (err) => {
    fs.unlink(filePath, () => { }); // Delete partial file
    console.error(`[Setup] Download Error: ${err.message}`);
    process.exit(1);
});
