const fs = require('fs-extra')

function generateName() {
    return new Promise((resolve, reject) => {
        fs.readFile('username.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
                if (lines.length < 2) {
                    reject(new Error('Not enough lines in the file to generate a name.'));
                } else {
                    const randomLine = lines[Math.floor(Math.random() * lines.length)];
                    const randomLine2 = lines[Math.floor(Math.random() * lines.length)];
                    resolve(`${randomLine}${randomLine2}`);
                }
            }
        });
    });
}
function getRandomBytes(length) {
    const characters = '0123456789abcdef';
    let bytes_str = '';
    for (let i = 0; i < length; i++) {
        bytes_str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return bytes_str;
}
module.exports = { generateName, getRandomBytes}