import React, { useState } from "react";
import Modal from "react-modal";

import Signers from "../containers/Signers";
import Address from "../containers/Address";
import Contracts from "../containers/Contracts";
import Connection from "../containers/Connection";
import Layout from "../features/common/Layout";
import Sidebar from "../features/sidebar/Sidebar";
import Main from "../features/main/Main";
import Network from "../containers/Network";
import EtherscanABI from "../containers/Etherscan";
import ContractAddress from "../containers/ContractAddress";
import OutputLog from "../containers/OutputLog";

Modal.setAppElement("html");

const Home = () => {
  const [pool, setPool] = useState();
  return (
    <EtherscanABI.Provider>
      <OutputLog.Provider>
        <Contracts.Provider>
          <Connection.Provider>
            <Signers.Provider>
              <Network.Provider>
                <Address.Provider>
                  <ContractAddress.Provider>
                    <Layout>
                      <Sidebar pool={pool} setPool={setPool} />
                      <Main />
                    </Layout>
                  </ContractAddress.Provider>
                </Address.Provider>
              </Network.Provider>
            </Signers.Provider>
          </Connection.Provider>
        </Contracts.Provider>
      </OutputLog.Provider>
    </EtherscanABI.Provider>
  );
};

export default Home;
