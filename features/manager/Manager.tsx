import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Panel, Fieldset, Divider, Button } from "react95";

import Pools, { rpc } from "../../containers/Pools";
import {
  alloContract,
  distribute,
  hasVoted,
  setMilestones,
  strategyContract,
  vote,
} from "../../blockchain";
import { ethers } from "ethers";
import Signers from "../../containers/Signers";
import Address from "../../containers/Address";

const containerWidth = 475;
const Container = styled(Fieldset)`
  display: flex;
  width: ${containerWidth}px;
  min-width: ${containerWidth}px;
  display: flex;
  flex-direction: column;
`;

const AddressPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
  // margin-top: 1rem;
`;

const Manager = () => {
  const { selectedPool, applicants, isPoolManager } = Pools.useContainer();
  const { signer } = Signers.useContainer();
  const { address } = Address.useContainer();
  const [voted, setVoted] = useState<string>();
  const votingDisabled =
    voted != ethers.constants.AddressZero ||
    selectedPool?.acceptedRecipientAddress != ethers.constants.AddressZero;

  useEffect(() => {
    const updateVoted = async () => {
      if (address && selectedPool) {
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const voteForAddress: string = await hasVoted(
          strategyContract(selectedPool.strategyAddress, provider),
          address
        );

        setVoted(voteForAddress);
      }
    };

    updateVoted();
  }, [address, applicants, selectedPool]);

  if (!selectedPool) return null;

  const handleVote = async (recipient: string) => {
    if (signer) {
      const allo = alloContract(signer);
      await vote(allo, selectedPool.poolId, recipient);
    }
  };

  const handleSetMilestone = async () => {
    if (!signer) return;
    const strategy = strategyContract(selectedPool.strategyAddress, signer);
    await setMilestones(strategy);
  };

  const handleDistribute = async () => {
    if (!signer) return;
    const allo = alloContract(signer);
    await distribute(allo, selectedPool.poolId);
  };

  if (!signer || !address || !isPoolManager) return null;
  return (
    <Container label="Manager">
      <div style={{ marginBottom: 5 }}>Potential candidates to vote for</div>
      {applicants.map((applicant) => {
        return (
          <Button
            disabled={votingDisabled}
            primary={voted == applicant}
            onClick={() => handleVote(applicant)}
            key={applicant}
          >
            {applicant}
          </Button>
        );
      })}
      <Fieldset
        label="Milestones"
        style={{
          marginTop: "auto",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Button style={{ marginBottom: 5 }} onClick={handleSetMilestone}>
          Set Milestone
        </Button>
        <Button>Reject Milestone</Button>
      </Fieldset>
      <Button style={{ marginTop: 10 }} onClick={handleDistribute}>
        Distribute
      </Button>
    </Container>
  );
};

export default Manager;
