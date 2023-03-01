"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImage = void 0;
const fs = require('fs');
const client = require('https');
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            }
            else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}
exports.downloadImage = downloadImage;
