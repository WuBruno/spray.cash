import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Window, WindowHeader, WindowContent } from "react95";
import original from "react95/dist/themes/original";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Container = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled(WindowContent)`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;

const Layout = ({ children }) => (
  <>
    <ThemeProvider theme={original}>
      <AppContainer>
        <Container shadow={false}>
          <WindowHeader>
            <div style={{ flex: 1, display: "flex", paddingRight: 5 }}>
              <div>Spray.cash</div>
              <div style={{ marginLeft: "auto" }}>
                <a
                  style={{ textDecoration: "underline" }}
                  href="https://github.com/WuBruno/spray.cash"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </div>
            </div>
          </WindowHeader>
          <Content>{children}</Content>
        </Container>
      </AppContainer>
    </ThemeProvider>
  </>
);

export default Layout;
