# uVote development

## Launch webapp locally

First of all install dependencies (only once, as usual): `npm install`.

To launch webapp run: `npm start`.

**NOTA BENE**
Actually webapp when launched locally needs data from [local blockchain](#local-blockchain), so before launching `npm start` you probably want to deploy smart contracts locally and populate with some data. Read below for instructions.

### TLDR

If dependencies are already installed and steps below were already done, you can launch webapp with:

1. Launch local blockchain: `npm run local-blockchain`
2. Launch development webserver: `npm start`

## Environment

The following environment variables are used for development:

- `LOCAL_NICKNAME_REGISTRY_ADDRESS`
- `LOCAL_POLL_FACTORY_BASIC_ADDRESS`
- `LOCAL_PRIVATE_KEY`
- `VITE_RPC_URL`

See example environment file [here](./.example.env).

Notice that `.env` file will be **automatically updated** by few of the commands documented below.
You can also edit it and add other variables, for instance `MY_ADDRESS`: comments and unknown variables will be preserved.

## Smart contracts development

Install [foundry](https://getfoundry.sh/). It provides `anvil`, `cast` and `forge` tools.

### Contracts

Build contracts: `npm run forge_build`.
Test contracts: `npm run forge_test`.

### Local blockchain

#### Launch local blockchain

Launch local blockchain. Optionally remove all JSON files in [local-blockchain/](./local-blockchain/) folder to start from scratch.

```sh
npm run local-blockchain
```

#### Deploy contracts locally

Deploy contracts on local blockchain with

```sh
npm run local-blockchain:deploy
```

It will also update `.env` file with addresses of locally deployed contracts. Once done it is possible to launch `npm run wagmi_generate`: this command is automatically launched before `npm start`.

#### Populate data

To add some data to the local blockchain, launch

```sh
npm run local-blockchain:populate_data
```

#### Configure wallet to use local blockchain

To get the _chain ID_ of local blockchain, launch `cast chain-id`. It should be `31337`.

Add a new network to your wallet:

- Network name: `anvil`
- Chain ID: `31337`
- RPC URL: `http://localhost:8545`
- Currency symbol: `ETH`

To fund your wallet, do something like:

1. Get the account address, assuming you save it in `MY_ADDRESS` environment variable. On MetaMask you need to do something like: _Account > Account Details > Show private key_.
2. Get a private key, assuming you save it in `LOCAL_PRIVATE_KEY` environment variable. Once [local blockchain is launched](#launch-local-blockchain) you can update the `.env` file with command `npm run local-blockchain:update_env_private_keys`, then you may want to do something like `source .env` to import the variables.
3. Send a value, for instance _one Ether_, to your wallet: `cast send $MY_ADDRESS --value 1ether --private-key $LOCAL_PRIVATE_KEY`

Try setting a nickname to your wallet:

1. Assuming `NicknameRegistry` contract address is stored in `LOCAL_NICKNAME_REGISTRY_ADDRESS` environment variable: once you follow instructions above to deploy the contracts locally, you should be able to import the variables with something like `source .env`.
2. Get the private key of your wallet and store it in a `MY_PRIVATE_KEY` environment variable.
3. Then you can:
   - set the nickname: `cast send --private-key $MY_PRIVATE_KEY $LOCAL_NICKNAME_REGISTRY_ADDRESS "setNickname(string)" "my nickname"`
   - get the nickname: `cast call $LOCAL_NICKNAME_REGISTRY_ADDRESS "getNickname(address)(string)" $MY_ADDRESS`
