import React from "react";
import styled from "styled-components";
import Pools from "../../containers/Pools";

interface IProps {
  isActive: boolean;
}

const Item = styled.div`
  height: 24px;
  color: ${(p: IProps) => (p.isActive ? "white" : "unset")};
  background: ${(p: IProps) => (p.isActive ? "#050289" : "unset")};
  border: ${(p: IProps) => (p.isActive ? "1px dotted" : "unset")};
  cursor: default;
  padding: 2px 4px;
`;

const ContractItem = ({ name, idx = 0 }: { name: string; idx: number }) => {
  const { selectedPool, selectedId, setSelectedPoolId } = Pools.useContainer();
  const isActive = selectedId === idx;

  const handleClick = () => {
    setSelectedPoolId(isActive ? null : idx);
  };

  return (
    <Item
      isActive={isActive}
      onClick={handleClick}
      className="contract-list-item"
    >
      {name}
    </Item>
  );
};

export default ContractItem;
