import React from "react";
import styled from "styled-components";
import { Cutout } from "react95";

import Pools from "../../containers/Pools";
import ContractItem from "./ContractItem";
import ConnectOptions from "../connection/ConnectOptions";

const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const ContractsSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
`;

const FilesCutout = styled(Cutout)`
  flex-grow: 1;
  background: white;
  overflow: hidden;
  padding-bottom: 35px;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const FilesContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Sidebar = () => {
  const { pools } = Pools.useContainer();
  return (
    <Container>
      <ConnectOptions />
      <ContractsSection>
        <div>Pools:</div>
        <FilesCutout shadow={false}>
          <FilesContainer className="contract-list">
            {pools.map((c, i) => (
              <ContractItem key={c.poolId} idx={i} name={c.poolId.toString()} />
            ))}
          </FilesContainer>
        </FilesCutout>
      </ContractsSection>
    </Container>
  );
};

export default Sidebar;
