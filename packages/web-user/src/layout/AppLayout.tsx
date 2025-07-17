import styled from "@emotion/styled";
import { Header } from "@packages/ui";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <AppContainer>
        <MainContent>
          <Outlet />
        </MainContent>
      </AppContainer>
    </>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  // height: calc(100vh - 66px);
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  overflow: hidden;
`;
