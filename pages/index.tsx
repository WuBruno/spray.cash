"use client";
import React from "react";
import Modal from "react-modal";

import Signers from "../containers/Signers";
import Address from "../containers/Address";
import Pools from "../containers/Pools";
import Connection from "../containers/Connection";
import Layout from "../features/common/Layout";
import Sidebar from "../features/sidebar/Sidebar";
import Main from "../features/main/Main";
import Network from "../containers/Network";
import OutputLog from "../containers/OutputLog";
import Head from "next/head";

Modal.setAppElement("html");

const Home = () => {
  // TODO: update description
  return (
    <OutputLog.Provider>
      <Head>
        <title>Spray.Cash</title>
        <meta content="Spray your cash with purpose." name="description" />
      </Head>
      <Connection.Provider>
        <Signers.Provider>
          <Pools.Provider>
            <Network.Provider>
              <Address.Provider>
                <Layout>
                  <Sidebar />
                  <Main />
                </Layout>
              </Address.Provider>
            </Network.Provider>
          </Pools.Provider>
        </Signers.Provider>
      </Connection.Provider>
    </OutputLog.Provider>
  );
};

export default Home;
