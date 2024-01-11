import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Panel, Fieldset, Divider, Button } from "react95";

import Pools, { rpc } from "../../containers/Pools";
import {
  alloContract,
  distribute,
  hasVoted,
  registerApplicant,
  setMilestones,
  strategyContract,
  submitMilestone,
  vote,
} from "../../blockchain";
import { ethers } from "ethers";
import Signers from "../../containers/Signers";
import Address from "../../containers/Address";
import Input from "../common/Input";

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

const Applicant = () => {
  const { selectedPool, applicants } = Pools.useContainer();
  const { signer } = Signers.useContainer();
  const { address } = Address.useContainer();

  if (!selectedPool) return null;

  if (!signer || !address) return null;

  const handleRegisterPool = async () => {
    if (signer) {
      const allo = alloContract(signer);
      await registerApplicant(allo, selectedPool.poolId);
    }
  };

  const handleSubmitMilestone = async () => {
    if (signer) {
      const strategy = strategyContract(selectedPool.strategyAddress, signer);
      await submitMilestone(strategy);
    }
  };

  return (
    <Container label="Manager">
      <Input style={{ marginBottom: 10 }} />
      <Button style={{ marginBottom: 20 }} onClick={handleRegisterPool}>
        Register for Pool
      </Button>

      <Input style={{ marginBottom: 10 }} />
      <Button style={{ marginBottom: 10 }} onClick={handleSubmitMilestone}>
        Submit Milestone
      </Button>
    </Container>
  );
};

export default Applicant;
