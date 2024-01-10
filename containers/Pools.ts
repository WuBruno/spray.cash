import { createContainer } from "unstated-next";
import { useEffect, useState } from "react";
import { alloContract, strategyContract } from "../blockchain";
import Signers from "./Signers";
import { Signer, ethers } from "ethers";

// TODO: get registered applications using events in strategy

interface Pool {
  poolId: number;
  strategyAddress: string;
  tokenAddress: string;
  profileId: string;
  amount: string;
  isPoolActive: boolean;
  acceptedRecipientAddress: string;
  maxBid: string;
  upcomingMilestone: string;
}
const poolIds = [133, 135];
const alloAddress = "0x1133eA7Af70876e64665ecD07C0A0476d09465a1";

export const rpc = "https://ethereum-goerli.publicnode.com";

async function getPools() {
  console.log("update pools");
  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const allo = alloContract(alloAddress, provider);
  const pools: Pool[] = [];

  for (let poolId of poolIds) {
    const [profileId, strategyAddress, tokenAddress] = await allo.getPool(
      poolId
    );

    const strategy = strategyContract(strategyAddress, provider);
    const amount: string = await strategy.getPoolAmount();
    const isPoolActive: boolean = await strategy.isPoolActive();
    const acceptedRecipientAddress: string =
      await strategy.acceptedRecipientId();
    const maxBid = await strategy.maxBid();
    const upcomingMilestone = await strategy.upcomingMilestone();

    const pool: Pool = {
      poolId,
      strategyAddress,
      tokenAddress,
      profileId,
      amount,
      isPoolActive,
      acceptedRecipientAddress,
      maxBid,
      upcomingMilestone,
    };
    pools.push(pool);
  }
  return pools;
}

export function usePools() {
  const [selectedId, setSelectedPoolId] = useState<number | null>(null);
  const [pools, setPools] = useState<Pool[]>([]);
  const selectedPool = selectedId === null ? null : pools[selectedId];

  const updatePools = async () => {
    const pools = await getPools();
    console.log(pools);
    setPools(pools);
  };

  useEffect(() => {
    updatePools();
  }, []);

  return { selectedId, selectedPool, setSelectedPoolId, pools, updatePools };
}

export default createContainer(usePools);
