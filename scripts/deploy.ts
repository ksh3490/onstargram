import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { config, getNamedAccounts } from 'hardhat';
import { HttpNetworkUserConfig } from "hardhat/types";
import CaverExtKAS from "caver-js-ext-kas";
import Caver from 'caver-js';

async function main() {
  const { deployer } = await getNamedAccounts();

  console.log("Deploying contracts with the account:", deployer);

  const network = config.networks[process.env.HARDHAT_NETWORK as string] as HttpNetworkUserConfig;

  const caver = new CaverExtKAS(new CaverExtKAS.providers.HttpProvider(network.url!, {
    headers: [
      { name: 'Authorization', value: 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64') },
      { name: 'x-chain-id', value: network.chainId!.toString() }
    ]
  }));
}