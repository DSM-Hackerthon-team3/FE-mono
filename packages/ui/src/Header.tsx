import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderDiv>
        <Text>게시판</Text>
        <Text>내 정보</Text>
        <Text>로그아웃</Text>
      </HeaderDiv>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 66px;
  padding: 0 76px;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: ${color.main[50]};
`;

const Text = styled.p`
  color: ${color.black};
  ${font.header4};
  cursor: pointer;
`;

const HeaderDiv = styled.div`
  display: flex;
  gap: 40px;
`;