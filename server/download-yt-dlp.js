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

if (fs.existsSync(filePath)) {
    console.log(`yt-dlp already exists at ${filePath}`);
} else {
    console.log(`Downloading yt-dlp for ${platform}...`);
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download completed.');
            if (platform !== 'win32') {
                try {
                    execSync(`chmod +x ${filePath}`);
                    console.log('Made yt-dlp executable.');
                } catch (e) {
                    console.error('Failed to make executable:', e);
                }
            }
        });
    });
}
