import { sepolia } from "viem/chains";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ERC20ABI, L1StandardBridgeABI } from "../constants/abi";
import L1Token from "../deployments/ethereum-sepolia/MyCustomL1Token.json";
import L2Token from "../deployments/blast-sepolia/MyCustomL2Token.json";
import config from "../config";

async function main() {
  const privateKey = process.env.PRIVATE_KEY as `0x${string}` | undefined;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY is not set");
  }

  console.log("Bridging ERC20 from L1 to L2...");
  console.log("L1 Token:", L1Token.address);
  console.log("L2 Token:", L2Token.address);

  const L1Provider = new ethers.providers.StaticJsonRpcProvider(
    sepolia.rpcUrls.default.http[0]
  );
  const L2Provider = new ethers.providers.StaticJsonRpcProvider(
    config.blastRpcUrl,
    {
      name: config.blastSepoliaName,
      chainId: config.blastSepoliaChainId,
    }
  );
  const L1Wallet = new ethers.Wallet(privateKey, L1Provider);
  const L2Wallet = new ethers.Wallet(privateKey, L2Provider);

  const L1TokenContract = new ethers.Contract(
    L1Token.address,
    ERC20ABI,
    L1Wallet
  );

  const PROXY_L1_STANDARD_BRIDGE_ADDRESS = config.blastSepoliaL1Bridge;
  const Proxy__L1StandardBridge = new ethers.Contract(
    PROXY_L1_STANDARD_BRIDGE_ADDRESS,
    L1StandardBridgeABI,
    L1Wallet
  );

  console.log("Approving ERC20...");

  // Approve amount
  const approveTx = await L1TokenContract.approve(
    PROXY_L1_STANDARD_BRIDGE_ADDRESS,
    parseEther(config.amountOfTokensToBridge)
  );
  await approveTx.wait();

  console.log("Depositing ERC20...");

  // Deposit ERC20
  const depositTx = await Proxy__L1StandardBridge.depositERC20To(
    L1Token.address,
    L2Token.address,
    L2Wallet.address,
    parseEther(config.amountOfTokensToBridge),
    config.blastSepoliaGasLimit,
    ethers.utils.formatBytes32String(new Date().getTime().toString())
  );
  await depositTx.wait();

  console.log(
    "Deposit completed, verify your balance on L2 after a few minutes"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
