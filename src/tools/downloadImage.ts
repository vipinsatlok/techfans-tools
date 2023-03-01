const fs = require('fs');
const client = require('https');

export function downloadImage(url: string, filepath: string) {
    return new Promise((resolve, reject) => {
        client.get(url, (res: any) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}