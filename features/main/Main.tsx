import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Fieldset, Panel } from "react95";

import Pools from "../../containers/Pools";
import OutputLog from "../output-log/OutputLog";
import PoolInfo from "../pool-info/PoolInfo";
import Manager from "../manager/Manager";
import Applicant from "../applicant/Applicant";

const Container = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

const ContentFrame = styled(Fieldset)`
  height: calc(100% - 8px);
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 28px;
  grid-gap: 16px;
`;

const TopContainer = styled.div`
  display: flex;
`;

const FooterPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
`;

const Main = () => {
  const { selectedPool } = Pools.useContainer();

  return (
    <Container>
      <ContentFrame label={selectedPool?.poolId}>
        <Content>
          <TopContainer>
            <PoolInfo />
            <Manager />
            <Applicant />
          </TopContainer>
        </Content>
      </ContentFrame>
    </Container>
  );
};

export default Main;
