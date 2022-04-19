import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.5.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    hardhat: {},
    baobab: {
      url: process.env.BAOBAB_URL,
      httpHeaders: {
        'Authorization': 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64'),
        'x-chain-id': '1001',
      },
      accounts: [
        process.env.DEVELOPER || ''
      ],
      chainId: 1001,
      gas: 8500000,
      gasPrice: 8500000,
    }
  },
  mocha: {
    timeout: 100000
  }
};

export default config;