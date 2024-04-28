# uVote development

## Launch webapp locally

1. Install deps: `npm install`.
2. Launch webapp: `npm start`.

## Environment

The following environment variables are used:

- `NICKNAME_REGISTRY_ADDRESS`
- `POLL_FACTORY_REGISTRY_ADDRESS`
- `VITE_RPC_URL`

See example environment file [here](./.example.env).

## Smart contracts development

Install [foundry](https://getfoundry.sh/).

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
