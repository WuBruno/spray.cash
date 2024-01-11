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
  amount: bigint;
  isPoolActive: boolean;
  acceptedRecipientAddress: string;
  maxBid: bigint;
  upcomingMilestone: bigint;
}
const poolIds = [133, 135];

export const rpc = "https://ethereum-goerli.publicnode.com";

async function getApplicants(strategyAddress: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const strategy = strategyContract(strategyAddress, provider);

  const startBlock = 10350400;
  const endBlock = await provider.getBlockNumber();
  let events: any[] = [];
  const filter = strategy.filters.Registered();

  for (let i = startBlock; i < endBlock; i += 50000) {
    const _startBlock = i;
    const _endBlock = Math.min(endBlock, i + 49999);
    const applicants = await strategy.queryFilter(
      filter,
      _startBlock,
      _endBlock
    );
    events = [...events, ...applicants];
  }
  console.log(events);

  return events.map((a: any) => a.args[2]);
}

async function getPools() {
  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const allo = alloContract(provider);
  const pools: Pool[] = [];

  for (let poolId of poolIds) {
    const [profileId, strategyAddress, tokenAddress] = await allo.getPool(
      poolId
    );

    const strategy = strategyContract(strategyAddress, provider);
    const amount: bigint = await strategy.getPoolAmount();
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
  const [applicants, setApplicants] = useState<string[]>([]);
  const selectedPool = selectedId === null ? null : pools[selectedId];

  const updatePools = async () => {
    const pools = await getPools();
    setPools(pools);
  };

  const updateApplicants = async (selected: Pool | null) => {
    if (!selected) return;
    setApplicants([]);
    const applicants = await getApplicants(selected?.strategyAddress);
    setApplicants(applicants);
  };

  useEffect(() => {
    updatePools();
  }, []);

  useEffect(() => {
    updateApplicants(selectedPool);
  }, [selectedPool]);

  const updatePoolState = async () => {
    updateApplicants(selectedPool);
  };

  return {
    selectedId,
    selectedPool,
    setSelectedPoolId,
    pools,
    updatePools,
    applicants,
    updatePoolState,
  };
}

export default createContainer(usePools);
