import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useLocation, useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRegister = pathname.includes("register");
  const handleSelect = (type: "student" | "employee") => {
    navigate(`/${isRegister ? "register" : "login"}/${type}`);
  };
  return (
    <Container>
      <HeadText>
        {isRegister ? "회원가입할" : "로그인할"} 계정 유형을 선택해주세요
      </HeadText>
      <MiddleContainer>
        <Div onClick={() => handleSelect("student")}>학생</Div>
        <Div onClick={() => handleSelect("employee")}>현직자</Div>
      </MiddleContainer>
      <UnderDiv>
        {isRegister ? "이미 계정이 있으신가요? " : "아직 계정이 없으신가요? "}
        <span onClick={() => navigate(isRegister ? "/" : "/register")}>
          {isRegister ? "로그인하기" : "회원가입하기"}
        </span>
      </UnderDiv>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const HeadText = styled.div`
  color: ${color.black};
  ${font.header1};
`;

const Div = styled.div`
  display: flex;
  width: 316px;
  height: 367px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid ${color.main[400]};
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${color.main[500]};
  cursor: pointer;
  &:hover {
    background-color: ${color.main[50]};
    color: ${color.main[400]};
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  gap: 60px;
`;

const UnderDiv = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  > span {
    color: #000;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
  }
`;