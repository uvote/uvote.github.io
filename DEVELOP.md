# uVote development

## Launch webapp locally

1. Install deps: `npm install`.
2. Launch webapp: `npm start`.

## Environment

The following environment variables are used:

- `FORGE_RPC_URL`
- `FORGE_PRIVATE_KEY`
- `NICKNAME_REGISTRY_ADDRESS`
- `POLL_FACTORY_REGISTRY_ADDRESS`
- `VITE_RPC_URL`

See example environment file [here](./.example.env).

## Smart contracts development

Install [foundry](https://getfoundry.sh/).

Launch local blockchain. Optionally remove _anvil/state.json_ file to start from scratch.

```sh
npm run anvil

...
Private Keys
==================

(0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
```

Check the command output and populate `FORGE_PRIVATE_KEY` with one of the private keys from the list.

Deploy [NicknameRegistry](./contracts/src/NicknameRegistry.sol) contract.

```sh
forge create contracts/src/NicknameRegistry.sol:NicknameRegistry --rpc-url $FORGE_RPC_URL --private-key $FORGE_PRIVATE_KEY
...
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
...
```

Populate `NICKNAME_REGISTRY_ADDRESS` with the output labeled as "Deployed to".

Deploy [PollFactoryMVP](./contracts/src/PollFactoryMVP.sol) contract.

```sh
forge create contracts/src/PollFactoryMVP.sol:PollFactoryMVP --rpc-url $FORGE_RPC_URL --private-key $FORGE_PRIVATE_KEY
...
Deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
...
```

Populate `POLL_FACTORY_REGISTRY_ADDRESS` with the output labeled as "Deployed to".
