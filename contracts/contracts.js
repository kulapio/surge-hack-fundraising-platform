module.exports = {
  // default applies to all environments
  default: {
    // Blockchain node to deploy the contracts
    deployment: {
      host: "localhost", // Host of the blockchain node
      port: 8546, // Port of the blockchain node
      type: "ws" // Type of connection (ws or rpc),
      // Accounts to use instead of the default account to populate your wallet.
      // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
      /*,accounts: [
        {
          privateKey: "a0596b7b461f2c16195451dc504fa37cd2ddf17cb8f9e5a6ee4d9e8ad41db9ba", // address: 0xff0B7DC5c86427B3CaC46C2B0A7E4B7a4E673030
          balance: "5 ether"  // You can set the balance of the account in the dev environment
                              // Balances are in Wei, but you can specify the unit with its name
        },
        {
          privateKey: "7220522bb5157dd254df843ad77d229edffae9593e9f5b032f4377dbbd06ba57", // address: 0xffe15c7CFD10Ea85e63c499c06080970c1654fC4
          balance: "5 ether"  // You can set the balance of the account in the dev environment
                              // Balances are in Wei, but you can specify the unit with its name
        },
        // {
        //   privateKeyFile: "path/to/file", // Either a keystore or a list of keys, separated by , or ;
        //   password: "passwordForTheKeystore" // Needed to decrypt the keystore file
        // },
        // {
        //   mnemonic: "12 word mnemonic",
        //   addressIndex: "0", // Optional. The index to start getting the address
        //   numAddresses: "1", // Optional. The number of addresses to get
        //   hdpath: "m/44'/60'/0'/0/" // Optional. HD derivation path
        // },
        // {
        //   "nodeAccounts": true // Uses the Ethereum node's accounts
        // }
      ]*/
    },
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8545"
    ],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    // dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    //strategy: 'implicit',

    contracts: {
      // example:
      Katinrun: {
       args: [ 100 ]
      },
      DexExchange: {
        args: [ 'OMG', '0xc4375b7de8af5a38a93548eb8453a498222c4ff2', (2.03 * 1e18).toString() ]
      },
      OMGToken: {
        args: [ 'OMG', 'OMG', 18 ],
        // onDeploy: ["OMGToken.methods.transfer('0x5666c33bb922F97B6721D3f932dfD9350C933a6F', \"100000000000000000000000000\").send()"]
      },
      DAIToken: {
        args: [ 'DAI', 'DAI', 18 ],
      }
    }
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    dappConnection: [
      "ws://localhost:8546",
      "http://localhost:8545",
      "$WEB3"  // uses pre existing web3 object if available (e.g in Mist)
    ]
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {
  },

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {
  },

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
