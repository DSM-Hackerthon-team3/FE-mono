import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useLocation, useNavigate } from "react-router-dom";

export const CareerTestResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultData } = location.state || {};
  const reportUrl = resultData?.result?.inspct?.reporturl;

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <ContentWrapper>
        <IconContainer>
          <CheckIcon>✓</CheckIcon>
        </IconContainer>

        <HeadText>진로적성검사 결과</HeadText>

        <ResultCard>
          {reportUrl ? (
            <>
              <ResultText>검사 결과 보고서가 준비되었습니다.</ResultText>
              <SubText>아래 버튼을 클릭하여 상세한 결과를 확인하세요.</SubText>
              <ReportButton href={reportUrl} target="_blank" rel="noopener noreferrer">
                <ButtonIcon>📊</ButtonIcon>
                <ButtonText>결과 보고서 보기</ButtonText>
              </ReportButton>
            </>
          ) : (
            <ErrorContainer>
              <ErrorIcon>⚠️</ErrorIcon>
              <ErrorText>결과 보고서 URL을 불러올 수 없습니다.</ErrorText>
              <ErrorSubText>잠시 후 다시 시도해주세요.</ErrorSubText>
            </ErrorContainer>
          )}
        </ResultCard>

        <FooterText>
          결과에 대한 문의사항이 있으시면 고객센터로 연락해주세요.
        </FooterText>

        <HomeButton onClick={handleGoHome}>홈으로 나가기</HomeButton>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 16px;
    align-items: flex-start;
    padding-top: 60px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    padding-top: 40px;
  }
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 50px 32px;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 480px) {
    padding: 40px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${color.main[400]} 0%, ${color.main[600]} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-bottom: 24px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CheckIcon = styled.div`
  color: white;
  font-size: 36px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const HeadText = styled.h1`
  ${font.header1};
  color: ${color.black};
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 32px;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 28px;
    line-height: 1.4;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${color.main[400]} 0%, ${color.main[600]} 100%);
    border-radius: 2px;
    
    @media (max-width: 768px) {
      bottom: -12px;
      width: 50px;
      height: 3px;
    }
    
    @media (max-width: 480px) {
      bottom: -10px;
      width: 40px;
      height: 3px;
    }
  }
`;

const ResultCard = styled.div`
  background: ${color.gray[50]};
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid ${color.gray[200]};
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
`;

const ResultText = styled.p`
  ${font.header3};
  color: ${color.black};
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 8px;
    line-height: 1.5;
  }
`;

const SubText = styled.p`
  ${font.bodytext1};
  color: ${color.gray[600]};
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.7;
  }
`;

const ReportButton = styled.a`
  ${font.header3};
  background: linear-gradient(135deg, ${color.main[500]} 0%, ${color.main[600]} 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 16px;
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    gap: 8px;
    width: 100%;
    justify-content: center;
    min-width: 200px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, ${color.main[600]} 0%, ${color.main[700]} 100%);
    
    @media (max-width: 480px) {
      transform: none; /* 모바일에서는 hover 효과 제거 */
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonText = styled.span`
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 4px;
  }
`;

const ErrorText = styled.p`
  ${font.header3};
  color: ${color.error};
  text-align: center;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const ErrorSubText = styled.p`
  ${font.bodytext1};
  color: ${color.gray[600]};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;

const FooterText = styled.p`
  ${font.bodytext2};
  color: ${color.gray[500]};
  text-align: center;
  line-height: 1.6;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 12px;
    line-height: 1.7;
    padding: 0 8px;
  }
`;

const HomeButton = styled.button`
  ${font.subtitle1};
  background-color: ${color.gray[300]};
  color: ${color.gray[800]};
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  font-weight: 500;
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    margin-top: 24px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 18px;
    margin-top: 20px;
    font-size: 14px;
    border-radius: 6px;
    width: 100%;
    max-width: 200px;
  }

  &:hover {
    background-color: ${color.gray[400]};
    transform: translateY(-1px);
    
    @media (max-width: 480px) {
      transform: none; /* 모바일에서는 hover 효과 제거 */
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;