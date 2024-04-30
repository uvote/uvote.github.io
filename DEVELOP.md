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

The following environment variables are used:

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

Launch local blockchain. Optionally remove all JSON files in [local-blockchain/](./local-blockchain/) folder to start from scratch.

```sh
npm run local-blockchain
```

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
