import React from "react";
import styled from "styled-components";
import { Fieldset, Button } from "react95";
import OutputLogContainer from "../../containers/OutputLog";

const Container = styled(Fieldset)`
  display: flex;
  flex-grow: 1;
  position: relative;
  margin-left: 16px;
`;

const Content = styled.pre`
  position: absolute;
  top: 16px;
  left: 12px;
  right: 16px;
  bottom: 12px;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;

  font-family: monospace;
  font-size: 12px;
`;

const LogItem = styled.div`
  overflow-wrap: anywhere;
  white-space: normal;
`;

const LogItemJSON = styled.code`
  overflow-wrap: anywhere;
`;

const ClearButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const OutputLog = () => {
  const { logItems, clear } = OutputLogContainer.useContainer();
  return (
    <Container label="Log">
      <Content className="output-log">
        {logItems.map((logItem, i) => {
          return (
            <LogItemJSON key={i} className="output-log-item">
              {logItem.message}{" "}
              <a
                href={logItem.url}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Txn
              </a>
            </LogItemJSON>
          );
        })}
      </Content>
      <ClearButton onClick={clear}>Clear</ClearButton>
    </Container>
  );
};

export default OutputLog;
