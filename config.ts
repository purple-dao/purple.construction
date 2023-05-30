import auctionABI from "./abi/auctionABI";
import tokenABI from "./abi/tokenABI";
import daoABI from "./abi/daoABI";

export const auctionContractAddress = "0x43790fe6bd46b210eb27F01306C1D3546AEB8C1b"; // Auction contract address
export const tokenContractAddress = "0xa45662638E9f3bbb7A6FeCb4B17853B7ba0F3a60"; // Auction contract address
export const treasuryContractAddress = "0xeB5977F7630035fe3b28f11F9Cb5be9F01A9557D"; // Auction contract address
export const daoContractAddress = "0xe3f8d5488c69d18abda42fca10c177d7c19e8b1a"; // Auction contract address

export const auctionContract = {
  address: auctionContractAddress,
  abi: auctionABI,
};

export const tokenContract = {
  address: tokenContractAddress,
  abi: tokenABI,
};

export const treasuryContract = {
  address: tokenContractAddress,
  abi: tokenABI,
};

export const daoContract = {
  address: tokenContractAddress,
  abi: daoABI,
};