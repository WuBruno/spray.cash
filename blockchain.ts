// Pool admins

import { Contract, Signer } from "ethers";
import Allo from "./abi/Allo.json";
import HedgeyStrategy from "./abi/HedgeyRFPCommitteeStrategy.json";
import { AbiCoder, defaultAbiCoder, parseEther } from "ethers/lib/utils";
import { Provider } from "@ethersproject/providers";

export const alloAddress = "0x1133eA7Af70876e64665ecD07C0A0476d09465a1";

export function alloContract(signer: Signer | Provider) {
  return new Contract(alloAddress, Allo, signer);
}

export function strategyContract(address: string, signer: Signer | Provider) {
  return new Contract(address, HedgeyStrategy, signer);
}

export async function hasVoted(
  strategyContract: Contract,
  recipient: string
): Promise<string> {
  // Allo contract `hasVoted`
  return strategyContract.votedFor(recipient);
}

export async function vote(
  alloContract: Contract,
  poolId: number,
  recipient: string
) {
  // Allo contract `allocate`
  const data = defaultAbiCoder.encode(["address"], [recipient]);
  const tx = await alloContract.allocate(poolId, data);
  const res = await tx.wait();
  console.log(res);
}

export async function setMilestones(strategyContract: Contract) {
  // Strategy Contract `setMilestones`
  const data = defaultAbiCoder.encode(
    ["tuple(uint, tuple(uint, string), uint)[]"],
    [
      [parseEther("0.5"), [1, "hash"], 0],
      [parseEther("0.5"), [1, "hash"], 0],
    ]
  );
  const tx = await strategyContract.setMilestones(data);
  const res = await tx.wait();
  console.log(res);
}

export async function distribute(alloContract: Contract, poolId: number) {
  // Allo contract
  const tx = await alloContract.distribute(poolId, [], "");
  const res = await tx.wait();
  console.log(res);
}

// Applicants

async function getApplications() {}

export async function registerApplicant(
  alloContract: Contract,
  poolId: number,
  bid: string, // amount to bid, must be less than max_bid
  term: number //seconds
) {
  // Allo contract `registerApplicant`
  const address = await alloContract.signer.getAddress();
  const data = defaultAbiCoder.encode(
    ["address", "address", "uint", "tuple(uint, string)", "uint"],
    [null, address, parseEther(bid), [1, "hash"], term]
  );

  const tx = await alloContract.registerApplicant(poolId, data);
  const res = await tx.wait();
  console.log(res);
}

export async function submitMilestone(strategyContract: Contract) {
  // Strategy contract `submitMilestone`
  const data = defaultAbiCoder.encode(["tuple(uint, string)"], [[1, "hash"]]);

  const tx = await strategyContract.submitUpcomingMilestone(data);
  const res = await tx.wait();
  console.log(res);
}

// View functions
async function getMilestones() {}
