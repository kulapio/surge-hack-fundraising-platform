'use strict';

const Web3        = require('web3'),
      SwapDexJson = require('./swap-dex.json');

const web3 = new Web3(window.web3.currentProvider);

const SwapDex = new web3.eth.Contract(
    SwapDexJson,
    "0xf968219c1be33e1a7f506aad3bef9af6dc433909"
);

export async function donateWithToken(token, amount, pid, from) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        SwapDex.methods.donateWithToken(token, amount, pid).send({ from }).on('confirmation', (confirmationNumber) => {
          if (confirmationNumber === 0) {
            alert('Success !')
          }
        })
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
          throw new Error(err.message);
        });
}
