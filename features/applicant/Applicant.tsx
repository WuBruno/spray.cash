import React, { useEffect } from "react";
import styled from "styled-components";
import { Panel, Fieldset, Button } from "react95";

import Pools from "../../containers/Pools";
import {
  alloContract,
  registerApplicant,
  strategyContract,
  submitMilestone,
} from "../../blockchain";
import Signers from "../../containers/Signers";
import Address from "../../containers/Address";
import Input from "../common/Input";
import OutputLog from "../../containers/OutputLog";

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
  const { selectedPool } = Pools.useContainer();
  const { signer } = Signers.useContainer();
  const { address } = Address.useContainer();
  const { addLogItem } = OutputLog.useContainer();

  if (!selectedPool || !signer || !address) return null;

  const handleRegisterPool = async () => {
    if (signer) {
      const allo = alloContract(signer);
      let hash = await registerApplicant(allo, selectedPool.poolId);
      addLogItem(hash, "Pool Registration");
    }
  };

  const handleSubmitMilestone = async () => {
    if (signer) {
      const strategy = strategyContract(selectedPool.strategyAddress, signer);
      let hash = await submitMilestone(strategy);
      addLogItem(hash, "Milestone Submission");
    }
  };

  return (
    <Container label="Applicant">
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
