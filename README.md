# Token Bridging ETH Sepolia => Blast Sepolia

This repo is a minimal demo how to bridge custom ERC20 tokens from ETH Sepolia to Blast Sepolia.

## Environment Setup

Update the `.env` file with the following environment variables:

```bash
PRIVATE_KEY="0x..."
```

## Deployment and Bridging

Deploy L1ERC20.sol to ETH Sepolia

```bash
npx hardhat deploy --network ethereum-sepolia --tags MyCustomL1Token
```

Update the deployment script with the previously deployed L1 contract address and deploy L2ERC20.sol to Blast Sepolia

```bash
npx hardhat deploy --network ethereum-sepolia --tags MyCustomL2Token
```

Bridge 1 token (configurable in config.ts) from ETH Sepolia to Blast Sepolia

```bash
npx hardhat run scripts/bridge.ts
```
