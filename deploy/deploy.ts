import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { config, getNamedAccounts } from 'hardhat';
import { HttpNetworkUserConfig } from "hardhat/src/types/config";

// import CaverExtKAS from "caver-js-ext-kas";
import Caver from 'caver-js';
import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`)

  const Onstar = await ethers.getContractFactory("Onstargram");
  const onstar = await Onstar.deploy();

  console.log(`Onstar address: ${onstar.address}`)


  // const network = config.networks[process.env.HARDHAT_NETWORK as string] as HttpNetworkUserConfig;

  // const caver = new Caver(new Caver.providers.HttpProvider(network.url!, {
  //   headers: [
  //     { name: 'Authorization', value: 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64') },
  //     { name: 'x-chain-id', value: network.chainId!.toString() }
  //   ]
  // }));

  // caver.klay.accounts.wallet.add(caver.klay.accounts.privateKeyToAccount(process.env.DEVELOPER!));

  // const transaction = await caver.klay.sendTransaction({
  //   type: 'SMART_CONTRACT_DEPLOY',
  //   from: deployer,
  //   data: '',
  //   gas: '50000000',
  //   value: 0,
  // });

  // console.log(transaction);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
