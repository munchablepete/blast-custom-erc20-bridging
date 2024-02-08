import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-deploy";
import "dotenv/config";

const { PRIVATE_KEY = "" } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    "ethereum-sepolia": {
      url: "https://rpc.sepolia.org",
      accounts: [PRIVATE_KEY],
    },
    // for mainnet
    "blast-mainnet": {
      url: "coming end of February",
      accounts: [PRIVATE_KEY],
    },
    // for Sepolia testnet
    "blast-sepolia": {
      url: "https://sepolia.blast.io",
      accounts: [PRIVATE_KEY],
    },
    // for local dev environment
    "blast-local": {
      url: "http://localhost:8545",
      accounts: [PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
};

export default config;
