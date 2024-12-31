const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (text) => new Promise((resolve) => rl.question(text, resolve));
const chalk = require('chalk');
const { createacc } = require('./lib/viu');
const fs = require('fs-extra')

function showLog() {
    const title = `

    █░█ █ █░█
    ▀▄▀ █ █▄█
    
    █▀█ █▀█ █▀▀ █▀▄▀█ █ █░█ █▀▄▀█
    █▀▀ █▀▄ ██▄ █░▀░█ █ █▄█ █░▀░█
    `;
    console.log(chalk.yellow(title));

    console.log('Author: ' + chalk.blue('https://t.me/aisbirkoenz'));
    console.log('Bot Buat Viu Premium Geratis Rek\n');
}

async function main() {
    let savedata = {};
    console.clear();
    showLog();

    const getValidInput = async (prompt, errorMsg) => {
        let input;
        while (!input) {
            console.log(chalk.cyanBright("(+) ") + prompt);
            input = await ask(chalk.blue("- "));
            if (!input) {
                console.log(chalk.red('\n' + errorMsg + '\n'));
            }
        }
        return input;
    };

    savedata.domain = await getValidInput("Masukkan Domain Viu Mu:", "Domain tidak boleh kosong!");
    console.log(`\n${chalk.yellow(`Email: ${savedata.domain}`)}\nBerhasil Di Input\n`);

    savedata.password = await getValidInput("Masukkan Password:", "Password tidak boleh kosong!");
    console.log(`\n${chalk.yellow(`Email: ${savedata.domain}\nPass: ${savedata.password}`)}\nBerhasil Di Input\n`);

    let total;
    while (!total || isNaN(total)) {
        total = await getValidInput("Masukkan Jumlah Akun:", "Jumlah Akun harus berupa angka!");
        total = parseInt(total);
    }
    savedata.total = total;
    console.log(`\n${chalk.yellow(`Email: ${savedata.domain}\nPass: ${savedata.password}\nTotal: ${savedata.total}`)}\nBerhasil Di Input\n`);

    savedata.no = await getValidInput("Masukkan Nomer Telepon:", "Nomer Telepon tidak boleh kosong!");
    console.log(`\n${chalk.yellow(`Email: ${savedata.domain}\nPass: ${savedata.password}\nTotal: ${savedata.total}\nNomer Merchant: ${savedata.no}`)}\nBerhasil Di Input\n`);
    console.clear();
    showLog();
    console.log(chalk.green(`[+] Semua data telah di input. Otiwi bosku\n\n`));

    const results = [];
    for (let i = 0; i < savedata.total; i++) {
        const result = await createacc(savedata.domain, savedata.password, savedata.no);
        results.push(result);
        console.log(chalk.green(`${result}`));
    }
    const now = new Date();
const fileName = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.txt`;

fs.writeFileSync(fileName, results.join('\n'), 'utf-8');
    console.log(chalk.greenBright(`\n! Task Selesai, Data Kamu Telah disimpan kedalam folder script ini!\nUntuk Melakukan run ulang ketik node index.js`));  
    process.exit(-1)
}

main();
