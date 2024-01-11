import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Panel, Fieldset, Divider, Button } from "react95";

import Network from "../../containers/Network";
import Input from "../common/Input";
import Pools, { rpc } from "../../containers/Pools";
import { formatEther, parseEther } from "ethers/lib/utils";
import {
  alloContract,
  hasVoted,
  strategyContract,
  vote,
} from "../../blockchain";
import { Signer, ethers } from "ethers";
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

const Voting = () => {
  const { selectedPool, applicants } = Pools.useContainer();
  const { signer } = Signers.useContainer();
  const { address } = Address.useContainer();
  const [voted, setVoted] = useState<string>();

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
      vote(allo, selectedPool.poolId, recipient);
    }
  };

  if (!signer || !address) return null;
  return (
    <Container label="Voting">
      <div style={{ marginBottom: 5 }}>Potential candidates to vote for</div>
      {applicants.map((applicant) => {
        return (
          <Button
            disabled={voted?.length > 0}
            primary={voted == applicant}
            onClick={() => handleVote(applicant)}
            key={applicant}
          >
            {applicant}
          </Button>
        );
      })}
    </Container>
  );
};

export default Voting;
