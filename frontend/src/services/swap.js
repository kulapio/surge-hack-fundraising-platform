'use strict';

const Web3        = require('web3'),
      pe          = require('parse-error'),
      SwapDexJson = require('./swap-dex.json');

const web3 = new Web3('https://kovan.infura.io/3ikLuZwohJ81nAe4aPyI'); // Kovan

const SwapDex = new web3.eth.Contract(
    SwapDexJson,
    "0xf968219c1be33e1a7f506aad3bef9af6dc433909"
);

export async function donateWithToken(token, amount, pid) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        SwapDex.methods.donateWithToken(token, amount, pid).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

function callContractFunction(contractFunction) {
    return contractFunction
        .then(receipt => {
            return [null, receipt];
        })
        .catch(err => {
            return [pe(err), null];
        });
}
