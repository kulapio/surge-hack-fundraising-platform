// /*global contract, config, it, assert*/

const TokenExchange = require('Embark/contracts/TokenExchange');
const OMGToken = require('Embark/contracts/OMGToken');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    TokenExchange: {
      args: [ 'OMG', '0xC4375B7De8af5a38a93548eb8453a498222C4fF2', (2.03 * 1e18).toString() ]
    },
    OMGToken: {
      args: [ 'OMG', 'OMG', 18 ],
      // onDeploy: ["OMGToken.methods.transfer('0x5666c33bb922F97B6721D3f932dfD9350C933a6F', \"100000000000000000000000000\").send()"]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("TokenExchange", function () {
  this.timeout(0);

  it("should have correct token name", async function () {
    let result = await TokenExchange.methods.tokenName().call();
    assert.strictEqual(result, 'OMG');
  });

  it("should have correct rate", async function () {
    let result = await TokenExchange.methods.rateInDai().call();
    assert.strictEqual(result, (2.03 * 1e18).toString());
  });

  it("should have correct toekn address", async function () {
    let result = await TokenExchange.methods.token().call();
    assert.strictEqual(result, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2');
  });

  it("set exchange rate", async function () {
    await TokenExchange.methods.setRate((3.1 * 1e18).toString()).send({from: accounts[1]});
    let result = await TokenExchange.methods.rateInDai().call();
    assert.strictEqual(result, (3.1 * 1e18).toString());
  });

  it("mint OMG", async function () {
    await OMGToken.methods.mint(accounts[0], '100000000000000000000000000').send({from: accounts[0]});
    let result = await OMGToken.methods.balanceOf(accounts[0]).call();
    assert.strictEqual(result, '100000000000000000000000000');
  });

  describe("exchange omg to dai", async function() {
    it("Mint", async function () {
      // Mint
      await OMGToken.methods.mint(accounts[0], '100000000000000000000000000').send({from: accounts[0]});
      const balanceBefore = await OMGToken.methods.balanceOf(accounts[0]).call();
    });

    it("Approve", async function () {
      // Approve first
      await OMGToken.methods.approve(TokenExchange.address, 100).send({from: accounts[0]});
    });

    it("Update omg token address for token exchanger", async function () {
      await TokenExchange.methods.setTokenAddress(OMGToken.address).send({from: accounts[0]});
    });

    it("Convert OMG -> DAI", async function () {
      // Buy
      await TokenExchange.methods.sell(100).send({from: accounts[0]});
      // let result =await OMGToken.methods.balanceOf(accounts[0]).call();
      // assert.strictEqual(result, '100000000000000000000000000');
    });
  })
})
