// /*global contract, config, it, assert*/

const Bignumber = require('bignumber.js')

const OMGExchange = require('Embark/contracts/OMGExchange');
const OMGToken = require('Embark/contracts/OMGToken');
const DAIToken = require('Embark/contracts/DAIToken');

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
    OMGExchange: {
      args: [ 'OMG', '0xC4375B7De8af5a38a93548eb8453a498222C4fF2', (2.03 * 1e18).toString() ]
    },
    OMGToken: {
      args: [ 'OMG', 'OMG', 18 ],
      // onDeploy: ["OMGToken.methods.transfer('0x5666c33bb922F97B6721D3f932dfD9350C933a6F', \"100000000000000000000000000\").send()"]
    },
    DAIToken: {
      args: [ 'DAI', 'DAI', 18 ],
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("OMGExchange", function () {
  this.timeout(0);

  it("should have correct token name", async function () {
    let result = await OMGExchange.methods.tokenName().call();
    assert.strictEqual(result, 'OMG');
  });

  it("should have correct rate", async function () {
    let result = await OMGExchange.methods.rateInDai().call();
    assert.strictEqual(result, (2.03 * 1e18).toString());
  });

  it("should have correct toekn address", async function () {
    let result = await OMGExchange.methods.token().call();
    assert.strictEqual(result, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2');
  });

  it("set exchange rate", async function () {
    await OMGExchange.methods.setRate((3.1 * 1e18).toString()).send({from: accounts[1]});
    let result = await OMGExchange.methods.rateInDai().call();
    assert.strictEqual(result, (3.1 * 1e18).toString());
  });

  it("mint OMG", async function () {
    const amount = Bignumber(1000000000 * 10**18)
    await OMGToken.methods.mint(accounts[0], amount.toString(10)).send({from: accounts[0]});
    let result = await OMGToken.methods.balanceOf(accounts[0]).call();
    assert.strictEqual(result, amount.toString(10));
  });

  describe("exchange omg to dai", async function() {
    it("Init OMGExchange", async function() {
      // Update omg token address for token exchanger
      await OMGExchange.methods.setTokenAddress(OMGToken.address).send({from: accounts[0]});

      // Update dai token address for token exchanger
      await OMGExchange.methods.setDaiTokenAddress(DAIToken.address).send({from: accounts[0]});

      // Mint DAI
      await DAIToken.methods.mint(accounts[0], Bignumber(1000000000 * 10**18).toString(10)).send({from: accounts[0]});

      // Transfer DAI to exchange contract
      await DAIToken.methods.transfer(OMGExchange.address, Bignumber(1000000000 * 10**18).toString(10)).send({from: accounts[0]});
    })

    it("Mint OMG", async function () {
      // Mint
      await OMGToken.methods.mint(accounts[0], Bignumber(1000000000 * 10**18).toString(10)).send({from: accounts[0]});
    });

    it("Approve", async function () {
      // Approve first
      await OMGToken.methods.approve(OMGExchange.address, 100).send({from: accounts[0]});
    });

    it("Convert OMG -> DAI", async function () {
      const omgAmountToExchange = Bignumber(100);

      // Balance before
      const omgBalanceBefore = await OMGToken.methods.balanceOf(accounts[0]).call();
      const daiBalanceBefore = await DAIToken.methods.balanceOf(accounts[0]).call();

      // Buy
      await OMGExchange.methods.sell(omgAmountToExchange.toString(10)).send({from: accounts[0]});

      // Balance fater
      const omgBalanceAfter = await OMGToken.methods.balanceOf(accounts[0]).call();
      const daiBalanceAfter = await DAIToken.methods.balanceOf(accounts[0]).call();
      // console.log(`omgBalanceAfter ${omgBalanceAfter}`)
      // console.log(`daiBalanceAfter ${daiBalanceAfter}`)

      // Verify
      // Get rate
      let rateInDai = await OMGExchange.methods.rateInDai().call();

      // Check if has correct omg balance
      assert.strictEqual(omgBalanceAfter, Bignumber(omgBalanceBefore).minus(omgAmountToExchange).toString(10));

      // Check if has correct dai balance
      const expectedDaiReturn = omgAmountToExchange.times(rateInDai).div(1e18);
      assert.strictEqual(
        Bignumber(daiBalanceAfter).minus(Bignumber(daiBalanceBefore)).toString(10), 
        expectedDaiReturn.toString(10)
      );
    });
  })
})
