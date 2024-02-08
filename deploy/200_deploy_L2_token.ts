import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import config from "../config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const L1Token = "0xD6CCfc165A6864c475B61f4Cd53bF6a67927EB37";

  if (!L1Token) {
    throw new Error("L1Token is not set in L2 deploy script.");
  }
  const L2BridgeAddress = config.blastSepoliaL2Bridge;

  const { deployer } = await getNamedAccounts();
  await deploy("MyCustomL2Token", {
    from: deployer,
    contract: "MyCustomL2Token",
    args: [L2BridgeAddress, L1Token],
    log: true,
  });
};
export default func;
func.tags = ["MyCustomL2Token"];
