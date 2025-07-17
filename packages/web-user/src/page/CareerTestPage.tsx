import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Radio, Select } from "@packages/ui";
import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CareerTest } from "../components/CareerTest";

export const CareerTestPage = () => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [answers, setAnswers] = useState<Record<string, string | string[] | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTest = pathname.includes("test");

  const contentContainerRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSchoolChange = (value: string) => {
    setSelectedSchool(value);
    setSelectedGrade(null);
  };

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
  };

  const gradeOptions = useMemo(() => {
    if (selectedSchool === "초등학교") {
      return ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"];
    } else if (selectedSchool === "중학교" || selectedSchool === "고등학교") {
      return ["1학년", "2학년", "3학년"];
    } else {
      return [];
    }
  }, [selectedSchool]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://www.career.go.kr/inspct/openapi/v2/test?apikey=8175310316664d182aa8ee8a4e13ad91&q=33");
        const data = await response.json();
        const questions = data.result.questions.map((item) => ({
          id: String(item.no),
          question: item.text,
          options: item.choices.map((choice) => choice.text),
          rawChoices: item.choices,
        }));
        setSurveyQuestions(questions);
      } catch (error) {
        console.error("Failed to fetch survey questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isTest) {
      fetchQuestions();
    }
  }, [isTest]);

  const scrollToNextQuestion = (currentQuestionId: string) => {
    const currentQuestionIndex = surveyQuestions.findIndex(q => q.id === currentQuestionId);
    if (currentQuestionIndex !== -1 && currentQuestionIndex < surveyQuestions.length - 1) {
      const nextQuestionId = surveyQuestions[currentQuestionIndex + 1].id;
      const nextQuestionElement = questionRefs.current[nextQuestionId];
      if (nextQuestionElement && contentContainerRef.current) {
        // 헤더 높이만큼 오프셋을 고려하여 스크롤
        const headerHeight = 150; // 헤더 높이 (패딩 포함)
        const elementTop = nextQuestionElement.offsetTop;
        const scrollTop = elementTop - headerHeight;

        contentContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleAnswerChange = (questionId: string, value: string, checked?: boolean) => {
    setAnswers((prevAnswers) => {
      let newAnswer: string | string[] | null;

      if (questionId === '135' || questionId === '136') {
        const currentAnswers = (prevAnswers[questionId] || []) as string[];
        if (checked) {
          newAnswer = [...currentAnswers, value];
        } else {
          newAnswer = currentAnswers.filter(item => item !== value);
        }
      } else {
        newAnswer = value;
      }

      const newAnswers = {
        ...prevAnswers,
        [questionId]: newAnswer,
      };

      if (!(questionId === '135' || questionId === '136')) {
        // 약간의 지연을 두어 자연스러운 스크롤
        setTimeout(() => {
          scrollToNextQuestion(questionId);
        }, 100);
      }
      return newAnswers;
    });
  };

  const getTrgetse = () => {
    if (selectedSchool === "중학교") {
      return "100206";
    } else if (selectedSchool === "고등학교") {
      return "100207";
    }
    return "";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const transformedAnswers = Object.entries(answers).map(([no, val]) => {
        let transformedVal: string;
        if (Array.isArray(val)) {
          transformedVal = val.join(',');
        } else if (val === null) {
          transformedVal = '';
        } else {
          transformedVal = val;
        }
        return { no, val: transformedVal };
      });

      const gradeNumber = selectedGrade ? parseInt(selectedGrade.replace('학년', '')) : null;

      const payload = {
        apikey: "8175310316664d182aa8ee8a4e13ad91",
        answers: transformedAnswers,
        gender: "100323",
        grade: gradeNumber,
        qno: 33,
        school: selectedSchool || "",
        startdtm: Date.now(),
        trgetse: getTrgetse(),
      };

      const response = await fetch("https://www.career.go.kr/inspct/openapi/v2/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultData = await response.json();
      console.log("API Response:", resultData);

      navigate('/career/result', { state: { resultData } });

    } catch (error) {
      console.error("Failed to submit survey:", error);
      alert("설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = surveyQuestions.length > 0 ? (Object.keys(answers).length / surveyQuestions.length) * 100 : 0;

  return (
    <MainContainer>
      {isTest ? (
        <TestContainer>
          <TestHeader>
            <HeaderContent>
              <TestTitle>진로적성검사</TestTitle>
              <ProgressContainer>
                <ProgressInfo>
                  <ProgressText>{Object.keys(answers).length} / {surveyQuestions.length}</ProgressText>
                  <ProgressPercentage>{Math.round(progressPercentage)}%</ProgressPercentage>
                </ProgressInfo>
                <ProgressBarContainer>
                  <ProgressBar progress={progressPercentage} />
                </ProgressBarContainer>
              </ProgressContainer>
            </HeaderContent>
          </TestHeader>

          <TestContent ref={contentContainerRef}>
            {isLoading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>문항을 불러오는 중...</LoadingText>
              </LoadingContainer>
            ) : (
              <QuestionsContainer>
                {surveyQuestions.map((questionData) => (
                  <CareerTest
                    key={questionData.id}
                    Number={questionData.id}
                    question={questionData.question}
                    options={questionData.options}
                    name={questionData.id}
                    onChange={(value, checked) => handleAnswerChange(questionData.id, value, checked)}
                    selectedValue={answers[questionData.id] || null}
                    isMultiSelect={questionData.id === '135' || questionData.id === '136'}
                    onNext={() => scrollToNextQuestion(questionData.id)}
                    rawChoices={questionData.rawChoices}
                    ref={(el) => (questionRefs.current[questionData.id] = el)}
                  />
                ))}
              </QuestionsContainer>
            )}
          </TestContent>

          {Object.keys(answers).length === surveyQuestions.length && surveyQuestions.length > 0 && (
            <SubmitContainer>
              <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <ButtonSpinner />
                    <SubmitButtonText>결과 생성 중...</SubmitButtonText>
                  </>
                ) : (
                  '결과 보기'
                )}
              </SubmitButton>
            </SubmitContainer>
          )}
        </TestContainer>
      ) : (
        <SetupContainer>
          <SetupCard>
            <CardHeader>
              <SetupTitle>진로적성검사</SetupTitle>
              <SetupSubtitle>간단한 정보 입력 후 검사를 시작하세요</SetupSubtitle>
            </CardHeader>

            <SetupContent>
              <FormGroup>
                <FormLabel>학교 구분</FormLabel>
                <RadioWrapper>
                  <Radio
                    title=""
                    options={["초등학교", "중학교", "고등학교"]}
                    name="school"
                    onChange={handleSchoolChange}
                  />
                </RadioWrapper>
              </FormGroup>

              <FormGroup>
                <FormLabel>학년</FormLabel>
                <SelectWrapper>
                  <Select
                    options={gradeOptions}
                    placeholder="학년을 선택해주세요"
                    onSelect={handleGradeChange}
                  />
                </SelectWrapper>
              </FormGroup>
            </SetupContent>

            <CardFooter>
              <StartButton
                onClick={() => navigate('/career/test')}
                disabled={!selectedSchool || !selectedGrade}
              >
                검사 시작하기
              </StartButton>
            </CardFooter>
          </SetupCard>
        </SetupContainer>
      )}
    </MainContainer>
  );
};

// 공통 스타일 - 모바일 반응형 추가
const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: 86px; /* 66px header + 20px padding */
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 16px;
    padding-top: 20px; /* 모바일에서 상단 패딩 조정 */
    align-items: flex-start;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    padding-top: 76px;
  }
`;

// 테스트 페이지 스타일 - 모바일 반응형
const TestContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 106px); /* 상단 여백 고려 */
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: calc(100vh - 52px);
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    border-radius: 12px;
    height: calc(100vh - 100px);
  }
`;

const TestHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 40px;
  color: white;
  flex-shrink: 0; /* 헤더 크기 고정 */
  
  @media (max-width: 768px) {
    padding: 24px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const TestTitle = styled.h1`
  ${font.header1};
  margin: 0;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 1.4;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressText = styled.span`
  ${font.header4};
  opacity: 0.9;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ProgressPercentage = styled.span`
  ${font.header3};
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    height: 6px;
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 4px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TestContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  position: relative; /* 스크롤 위치 계산을 위해 추가 */
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
    
    @media (max-width: 480px) {
      width: 4px;
    }
  }
  
  &::-webkit-scrollbar-track {
    background: ${color.gray[100]};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${color.gray[300]};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${color.gray[400]};
  }
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  @media (max-width: 768px) {
    gap: 32px;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 20px;
  
  @media (max-width: 480px) {
    height: 200px;
    gap: 16px;
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${color.gray[200]};
  border-top: 4px solid ${color.main[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  ${font.header3};
  color: ${color.gray[500]};
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SubmitContainer = styled.div`
  padding: 30px 40px;
  background: ${color.gray[50]};
  border-top: 1px solid ${color.gray[200]};
  display: flex;
  justify-content: center;
  flex-shrink: 0; /* 푸터 크기 고정 */
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const SubmitButton = styled.button`
  ${font.header3};
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 16px 60px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  
  @media (max-width: 768px) {
    padding: 14px 40px;
    border-radius: 10px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 32px;
    border-radius: 8px;
    font-size: 14px;
    gap: 8px;
    width: 100%;
    justify-content: center;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    
    @media (max-width: 480px) {
      transform: none; /* 모바일에서는 hover 효과 제거 */
    }
  }
  
  &:disabled {
    background: ${color.gray[400]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SubmitButtonText = styled.span`
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 설정 페이지 스타일 - 모바일 반응형
const SetupContainer = styled.div`
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const SetupCard = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    border-radius: 20px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 50px 40px;
  text-align: center;
  color: white;
  border-radius: 24px 24px 0 0;
  
  @media (max-width: 768px) {
    padding: 40px 32px;
    border-radius: 20px 20px 0 0;
  }
  
  @media (max-width: 480px) {
    padding: 32px 24px;
    border-radius: 16px 16px 0 0;
  }
`;

const SetupTitle = styled.h1`
  ${font.header1};
  margin: 0 0 12px 0;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 1.4;
    margin-bottom: 8px;
  }
`;

const SetupSubtitle = styled.p`
  ${font.header4};
  margin: 0;
  opacity: 0.9;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const SetupContent = styled.div`
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  gap: 35px;
  
  @media (max-width: 768px) {
    padding: 40px 32px;
    gap: 32px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 24px;
    gap: 28px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const FormLabel = styled.label`
  ${font.header3};
  color: ${color.gray[800]};
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`;

const RadioWrapper = styled.div`
  .radio-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    
    @media (max-width: 480px) {
      gap: 12px;
      flex-direction: column;
    }
  }
`;

const SelectWrapper = styled.div`
  .select-container {
    position: relative;
    
    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

const CardFooter = styled.div`
  padding: 30px 40px 40px;
  background: ${color.gray[50]};
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  
  @media (max-width: 768px) {
    padding: 24px 32px 32px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 24px 24px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const StartButton = styled.button`
  ${font.header3};
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 18px 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  
  @media (max-width: 768px) {
    padding: 16px 40px;
    border-radius: 10px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 32px;
    border-radius: 8px;
    font-size: 14px;
    width: 100%;
    min-width: 200px;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    
    @media (max-width: 480px) {
      transform: none; /* 모바일에서는 hover 효과 제거 */
    }
  }
  
  &:disabled {
    background: ${color.gray[400]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;