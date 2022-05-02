import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { ethers, config, getNamedAccounts } from 'hardhat';
import { HttpNetworkUserConfig } from "hardhat/src/types/config";
import fs from "fs";

// import CaverExtKAS from "caver-js-ext-kas";
import Caver from 'caver-js';

async function main() {

  const [deployer] = await ethers.getSigners();

  const Onsta = await ethers.getContractFactory("Onstagram");
  const onsta = await Onsta.deploy()

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`)
  console.log(`Onsta address: ${onsta.address}`)

  if (onsta.interface) {
    // 1. Record recently deployed contract's abi file to 'deployedABI'
    fs.writeFileSync(
      'deployedABI.json',
      JSON.stringify(onsta.interface)
    )
  }

  // 2. Record recently deployed contract's address to 'deployedAddress'
  fs.writeFileSync(
    'deployedAddress',
    onsta.address
  )


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
