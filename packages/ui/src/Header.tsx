import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Logo } from "./assets";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderDiv>
        <Img src={Logo} alt="" onClick={() => navigate("/")} />
        <TextDiv>
          <Text onClick={() => navigate("/board")}>게시판</Text>
          <Text onClick={() => navigate("/my-info")}>내 정보</Text>
          <Text onClick={() => navigate("/logout")}>로그아웃</Text>
        </TextDiv>
      </HeaderDiv>
    </HeaderContainer>
  );
};

const Img = styled.img`
  cursor: pointer;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 66px;
  padding: 0 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.main[50]};
`;

const TextDiv = styled.div`
  display: flex;
  gap: 40px;
`;

const Text = styled.p`
  color: ${color.black};
  ${font.header4};
  cursor: pointer;
`;

const HeaderDiv = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;