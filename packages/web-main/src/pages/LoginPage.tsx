import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Input } from "@packages/ui";
import { FormEvent, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserLogin, useAdminLogin } from "@/api/user";

// 상수 정의
const FORM_WIDTH = "835px";
const MIN_PASSWORD_LENGTH = 4;

export const LoginPage = () => {
  const { pathname } = useLocation();
  const isStudent = pathname.includes("student");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    id?: string;
    password?: string;
    general?: string;
  }>({});

  // React Query mutations
  const {
    mutate: userLogin,
    isPending: isUserLoginPending,
    error: userLoginError,
    isSuccess: isUserLoginSuccess
  } = useUserLogin();

  const {
    mutate: adminLogin,
    isPending: isAdminLoginPending,
    error: adminLoginError,
    isSuccess: isAdminLoginSuccess
  } = useAdminLogin();

  // 로딩 상태 통합
  const isLoading = isUserLoginPending || isAdminLoginPending;
  const loginError = userLoginError || adminLoginError;
  const isSuccess = isUserLoginSuccess || isAdminLoginSuccess;

  // 유효성 검사 함수
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!id.trim()) {
      newErrors.id = "아이디를 입력해주세요.";
    } else if (id.length < 3) {
      newErrors.id = "아이디는 3자 이상이어야 합니다.";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 로그인 에러 처리
  useEffect(() => {
    if (loginError) {
      // API 에러 메시지를 파싱하여 적절한 에러 메시지 표시
      const errorMessage = getErrorMessage(loginError);
      setErrors(prev => ({ ...prev, general: errorMessage }));
    }
  }, [loginError]);

  // 성공 처리
  useEffect(() => {
    if (isSuccess) {
      // 로그인 성공 시 리다이렉트 또는 다른 처리
      console.log("로그인 성공!");
      // navigate('/dashboard');
    }
  }, [isSuccess]);

  // 에러 메시지 파싱 함수
  const getErrorMessage = (error): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "로그인에 실패했습니다. 다시 시도해주세요.";
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 이전 에러 초기화
    setErrors({});

    const loginData = { id: id.trim(), password };

    if (isStudent) {
      userLogin(loginData);
    } else {
      adminLogin(loginData);
    }
  };

  // 입력값 변경 시 해당 필드의 에러 제거
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (errors.id) {
      setErrors(prev => ({ ...prev, id: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  // 버튼 비활성화 조건
  const isButtonDisabled = isLoading || !id.trim() || !password;

  return (
    <Container>
      <HeaderWrapper>
        <HeadText>{isStudent ? "학생" : "현직자"} 로그인</HeadText>
      </HeaderWrapper>

      <Form onSubmit={handleLogin} noValidate>
        {/* 일반적인 로그인 에러 메시지 */}
        {errors.general && (
          <ErrorMessage role="alert">{errors.general}</ErrorMessage>
        )}

        <InputWrapper>
          <Input
            label="아이디"
            placeLabel="아이디를 입력해주세요"
            type="text"
            value={id}
            onChange={handleIdChange}
            disabled={isLoading}
            required
            error={errors.id}
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            label="비밀번호"
            placeLabel="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
            required
            error={errors.password}
          />
        </InputWrapper>

        <ButtonWrapper>
          <LoginButton
            type="submit"
            disabled={isButtonDisabled}
            isLoading={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

// 스타일드 컴포넌트들
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: ${FORM_WIDTH};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 34px;
  width: 100%;
  max-width: ${FORM_WIDTH};
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 66px; // 100px에서 gap 34px을 뺀 값
`;

const HeadText = styled.h1`
  font-family: Pretendard;
  font-size: 42px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  color: ${color.black || '#000'};
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background-color: ${color.error?.[50] || '#ffebee'};
  border: 1px solid ${color.error?.[200] || '#ffcdd2'};
  border-radius: 6px;
  color: ${color.error?.[700] || '#c62828'};
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: -10px; // gap을 조정하여 간격 유지
`;

const LoginButton = styled.button<{ isLoading?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 58px;
  background-color: ${color.white};
  ${font.header3};
  color: ${color.main[500]};
  cursor: pointer;
  border: 1px solid ${color.main[400]};
  border-radius: 6px;
  min-width: 140px;
  position: relative;
  
  &:hover:not(:disabled) {
    background-color: ${color.main[50] || '#f8f9fa'};
    border-color: ${color.main[500]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${color.main[200] || '#e3f2fd'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: ${color.gray?.[100] || '#f5f5f5'};
    color: ${color.gray?.[400] || '#999'};
    border-color: ${color.gray?.[300] || '#ddd'};
  }
  
  ${({ isLoading }) => isLoading && `
    &:disabled {
      cursor: wait;
    }
  `}
  
  transition: all 0.2s ease-in-out;
`;