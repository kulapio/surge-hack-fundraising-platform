'use strict';

const Web3         = require('web3'),
      KatinrunJson = require('./katinrun.json');

const web3 = new Web3('https://kovan.infura.io/3ikLuZwohJ81nAe4aPyI'); // Kovan

const Katinrun = new web3.eth.Contract(
    KatinrunJson,
    "0xD45Db64bcDbDC42cAB08EEF8e848acCa1Ef76481"
);

// main();

// async function main() {

//     try {
//         let proposal = await getProposal(1);
//         console.log('proposal: ' + proposal);

//         let proposalAmount = await getProposalAmount();
//         console.log('proposalAmount: ' + proposalAmount);

//         await submitProposal(
//             "proposalName", 
//             "proposalDescHash", 
//             "proposalDocHash", 
//             "100", 
//             100
//         )

//         proposalAmount = await getProposalAmount();
//         console.log('proposalAmount: ' + proposalAmount);

//         process.exit(0);
//     }
//     catch (err) {
//         return console.error(err);
//     }
// }

export async function addApprover(newApproverAddr) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.addApprover(newApproverAddr).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function removeApprover(approverAddr) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.removeApprover(approverAddr).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function submitProposal(
        proposalName, proposalDescHash, proposalDocHash, goal, dueDate
    ) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.submitProposal(
            proposalName, proposalDescHash, proposalDocHash, goal, dueDate
        ).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function approveProposal(pid) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.approveProposal(pid).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function rejectProposal(pid) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.rejectProposal(pid).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function donateProposal(pid, sponsor, amount) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.donateProposal(pid, sponsor, amount).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function submitDeliveryReport(pid, deliveryDescHash, deliveryDocHash) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.submitDeliveryReport(pid, deliveryDescHash, deliveryDocHash).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function withdrawFund(pid) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.withdrawFund(pid).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function massExits(pid) {
    let err, receipt;

    [err, receipt] = await callContractFunction(
        Katinrun.methods.massExits(pid).send({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return receipt
}

export async function getProposalAmount() {
    let err, amount;

    [err, amount] = await callContractFunction(
        Katinrun.methods.getProposalAmount().call({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return amount;
}

export async function getProposal(pid) {
    let err, proposal;

    [err, proposal] = await callContractFunction(
        Katinrun.methods.getProposal(pid).call({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return proposal;
}

export async function getSponsorAmountByProposalId(pid) {
    let err, amount;

    [err, amount] = await callContractFunction(
        Katinrun.methods.getSponsorAmountByProposalId(pid).call({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return amount;
}

export async function getSponsorByProposalId(pid, index) {
    let err, sponsorAddr;

    [err, sponsorAddr] = await callContractFunction(
        Katinrun.methods.getSponsorByProposalId(pid, index).call({})
    );

    if (err) {
        throw new Error(err.message);
    }
    return sponsorAddr;
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
