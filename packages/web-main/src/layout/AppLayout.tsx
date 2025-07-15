import styled from "@emotion/styled";
import { Header } from "@packages/ui";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  margin-top: 66px;
`;

const MainContent = styled.div`
  flex: 1;
`;