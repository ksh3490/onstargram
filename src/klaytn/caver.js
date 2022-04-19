/**
 * caver-js library helps making connection with klaytn node.
 * You can connect to specific klaytn node by setting 'rpcURL' value.
 * default rpcURL is 'https://api.baobab.klaytn.net:8651'.
 */
import CaverExtKAS from 'caver-js-ext-kas'

const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey
const chainId = 1001

const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

export default caver