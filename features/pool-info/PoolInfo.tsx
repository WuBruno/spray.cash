import React, { useState } from "react";
import styled from "styled-components";
import { Panel, Fieldset, Divider } from "react95";

import Network from "../../containers/Network";
import Input from "../common/Input";
import Pools from "../../containers/Pools";

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

const PoolInfo = () => {
  const { selectedPool } = Pools.useContainer();
  return (
    <Container label="Pool Info">
      <div>
        PoolID:
        <AddressPanel variant="well">{selectedPool?.poolId}</AddressPanel>
        Custom
        <AddressPanel variant="well">
          {"No valid address, function call will fail"}
        </AddressPanel>
      </div>
    </Container>
  );
};

export default PoolInfo;
