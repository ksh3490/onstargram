import caver from "./caver";
import fs from "fs";
import { AbiItem } from 'web3-utils'


/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.OnstagramContract ` variable.
 */

const DEPLOYED_ADDRESS = JSON.stringify(fs.readFileSync('../../deployedAddress', 'utf8').replace(/\n|\r/g, ""))
const DEPLOYED_ABI: AbiItem[] = fs.existsSync('../../deployedABI.JSON') && fs.readFileSync('../../deployedAddress.JSON', 'utf8')

const OnstagramContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default OnstagramContract
