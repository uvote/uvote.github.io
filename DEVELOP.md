# uVote development

## Launch webapp locally

First of all install dependencies (only once, as usual): `npm install`.

To launch webapp run: `npm start`.

**NOTA BENE**
Actually webapp when launched locally needs data from [local blockchain](#local-blockchain), so before launching `npm start` you probably want to deploy smart contracts locally. Read below for instructions.

### TLDR

If dependencies are already installed and steps below were already done, you can launch webapp with:

1. Launch local blockchain: `npm run local-blockchain`
2. Launch development webserver: `npm start`

## Environment

The following environment variables are used for development:

- `NICKNAME_REGISTRY_ADDRESS`
- `POLL_FACTORY_MVP_REGISTRY_ADDRESS`
- `VITE_RPC_URL`

See example environment file [here](./.example.env).

**Action Required**: copy example environment file to `.env` file, for instance

```sh
cp .example.env .env
```

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

Deploy [NicknameRegistry](./contracts/src/NicknameRegistry.sol) contract.

```sh
npm run local-blockchain_create_NicknameRegistry
```

Deploy [PollFactoryMVP](./contracts/src/PollFactoryMVP.sol) contract.

```sh
npm run local-blockchain_create_PollFactoryMVP
```

Update `.env` file with addresses of locally deployed contracts:

- `npm run local-blockchain_update_env_contract_NicknameRegistry`
- `npm run local-blockchain_update_env_contract_PollFactoryMVP`

Once `.env` file is updated with the addresses of deployed contracts, it is possible to launch `npm run wagmi_generate`.
This command is automatically launched before `npm start`.

#### Configure wallet to use local blockchain

To get the _chain ID_ of local blockchain, launch `cast chain-id`. It should be `31337`.

Add a new network to your wallet:

- Network name: `anvil`
- Chain ID: `31337`
- RPC URL: `http://localhost:8545`
- Currency symbol: `ETH`

To fund your wallet, do something like:

1. Get the account address, assuming you save it in `MY_ADDRESS` environment variable.
2. Get a private key, assuming you save it in `PRIVATE_KEY` environment variable. Once [local blockchain is launched](#launch-local-blockchain) from [local-blockchain](./local-blockchain/) folder open _anvil-config.json_ file and copy one item from the `private-keys` array.
3. Send a value, for instance _one Ether_, to your wallet: `cast send $MY_ADDRESS --value 1ether --private-key $PRIVATE_KEY`

Try setting a nickname to your wallet:

1. Assuming `NicknameRegistry` contract address is stored in `NICKNAME_REGISTRY_ADDRESS` environment variable: once you follow instructions above to deploy the contract and update the `.env` file, you should be able to import the variables with something like `source .env`.
2. Get the private key of your wallet and store it in a `MY_PRIVATE_KEY` environment variable.
3. Then you can:
   - set the nickname: `cast send --private-key $MY_PRIVATE_KEY $NICKNAME_REGISTRY_ADDRESS "setNickname(string)" "my nickname"`
   - get the nickname: `cast call $NICKNAME_REGISTRY_ADDRESS "getNickname(address)(string)" $MY_ADDRESS`
