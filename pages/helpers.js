const { ethers } = require('ethers');
const { abi: IUniswap }= require('');
const { abi: SwapRouterABI } = require('')
const ERC20ABI = require('./abi.json')

require('dotenv').config()
const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
