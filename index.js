const { ethers } = require('ethers');
const fs = require('fs');
const readline = require('readline');

// Create an interface to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for the number of wallets to generate
rl.question('How many wallets would you like to generate? ', (num) => {
    const numberOfWallets = parseInt(num);

    if (isNaN(numberOfWallets) || numberOfWallets <= 0) {
        console.log("Please enter a valid number greater than zero.");
        rl.close();
        return;
    }

    const wallets = [];

    // Generate wallets
    for (let i = 0; i < numberOfWallets; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push({
            address: wallet.address,
            privateKey: wallet.privateKey
        });
    }

    // Prepare content for the file
    let fileContent = 'Generated Ethereum Wallets:\n\n';
    wallets.forEach((wallet, index) => {
        fileContent += `Wallet ${index + 1}:\n`;
        fileContent += `Address: ${wallet.address}\n`;
        fileContent += `Private Key: ${wallet.privateKey}\n`;
        fileContent += '---------------------------\n';
    });

    // Write to a file
    fs.writeFile('wallets.txt', fileContent, (err) => {
        if (err) {
            console.log('Error writing to file', err);
        } else {
            console.log('Wallets have been successfully generated and saved to wallets.txt');
        }
        rl.close();
    });
});
