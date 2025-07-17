import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Input, Select, Radio } from "@packages/ui";
import { useLocation } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import { useUserRegister, useAdminRegister, useGetExist } from "@/api/user";

export const RegisterPage = () => {
  const { pathname } = useLocation();
  const isStudent = pathname.includes("student");

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [isIdCheckTriggered, setIsIdCheckTriggered] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState<{
    isChecked: boolean;
    isAvailable: boolean;
    message: string;
  }>({
    isChecked: false,
    isAvailable: false,
    message: ""
  });

  const { mutate: userRegister } = useUserRegister();
  const { mutate: adminRegister } = useAdminRegister();
  const { data: userExist, isLoading: isUserExistLoading } = useGetExist(isIdCheckTriggered ? id : "");

  // 직무 옵션들을 카테고리별로 정리
  const jobOptions = [
    "교육",
    "보건의료",
    "IT",
    "공학",
    "법률",
    "경영",
    "금융",
    "예술",
    "과학",
    "공무원",
    "영업",
    "서비스",
    "스포츠",
    "기타"
  ];

  // 중복 확인 결과 처리
  useEffect(() => {
    if (isIdCheckTriggered && userExist?.exist !== undefined && !isUserExistLoading) {
      setIdCheckResult({
        isChecked: true,
        isAvailable: !userExist.exist,
        message: userExist.exist ? "이미 사용 중인 아이디입니다." : "사용 가능한 아이디입니다."
      });
      setIsIdCheckTriggered(false); // Reset trigger after check
    }
  }, [userExist?.exist, isUserExistLoading, isIdCheckTriggered]);

  // 수동 중복 확인 버튼 클릭
  const handleCheckId = () => {
    if (!id.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (id.length < 4 || id.length > 20) {
      alert("아이디는 4자 이상 20자 이하로 입력해주세요.");
      return;
    }

    // 영문, 숫자만 허용하는 정규식
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!idRegex.test(id)) {
      alert("아이디는 영문과 숫자만 사용할 수 있습니다.");
      return;
    }

    setIsIdCheckTriggered(true);
    // useGetExist 훅이 자동으로 실행되므로 별도 로직 불필요
    // 결과는 useEffect에서 처리됨
    setTimeout(() => setIsIdCheckTriggered(false), 500);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 기본 유효성 검사
    if (!id || !password || !passwordConfirm) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 아이디 중복 확인 여부 체크
    if (!idCheckResult.isChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!idCheckResult.isAvailable) {
      alert("사용할 수 없는 아이디입니다. 다른 아이디를 선택해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    // 학생/현직자에 따른 분기 처리
    if (isStudent) {
      // 학생 회원가입
      if (!gender || !schoolLevel) {
        alert("성별과 학력을 선택해주세요.");
        return;
      }

      userRegister({
        id: id,
        password,
        schoolLevel,
        gender,
      });
    } else {
      // 현직자(어드민) 회원가입
      if (!job || !gender) {
        alert("직무와 성별을 선택해주세요.");
        return;
      }

      adminRegister({
        id,
        password,
        position: job,
        gender,
      });
    }

    console.log({
      id,
      password,
      isStudent,
      gender,
      job: !isStudent ? job : undefined,
      schoolLevel: isStudent ? schoolLevel : undefined,
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <HeadText>{isStudent ? "학생" : "현직자"} 회원가입</HeadText>
      </HeaderContainer>

      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <IdInputWrapper>
            <Input
              label="아이디"
              placeLabel="아이디를 입력해주세요 (4-20자, 영문+숫자)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              required
            />
            <IdCheckButton
              type="button"
              onClick={handleCheckId}
              disabled={isUserExistLoading || !id.trim() || idCheckResult.isChecked}
            >
              {isUserExistLoading ? "확인 중..." : "중복 확인"}
            </IdCheckButton>
          </IdInputWrapper>
          {idCheckResult.isChecked && (
            <IdStatusMessage isAvailable={idCheckResult.isAvailable}>
              {idCheckResult.message}
            </IdStatusMessage>
          )}
        </InputContainer>

        <InputContainer>
          <Input
            label="비밀번호"
            placeLabel="비밀번호를 입력해주세요 (8자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </InputContainer>

        <InputContainer>
          <Input
            label="비밀번호 확인"
            placeLabel="비밀번호를 다시 입력해주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            required
          />
        </InputContainer>

        {/* 공통 성별 선택 */}
        <FormSection>
          <Radio
            title="성별"
            options={["남성", "여성"]}
            name="gender"
            onChange={(value) => setGender(value)}
          />
        </FormSection>

        {/* 학생/현직자별 추가 정보 */}
        {isStudent ? (
          <FormSection>
            <SelectContainer>
              <Label>학력</Label>
              <Select
                options={["초등학교", "중학교", "고등학교"]}
                placeholder="학력을 선택해주세요"
                onSelect={(value) => setSchoolLevel(value)}
              />
            </SelectContainer>
          </FormSection>
        ) : (
          <FormSection>
            <SelectContainer>
              <Label>직무</Label>
              <Select
                options={jobOptions}
                placeholder="직무를 선택해주세요"
                onSelect={(value) => setJob(value)}
              />
            </SelectContainer>
          </FormSection>
        )}

        <ButtonContainer>
          <RegisterButton type="submit">회원가입</RegisterButton>
        </ButtonContainer>
      </Form>
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
  gap: 34px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 835px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const InputContainer = styled.div`
  width: 835px;
`;

const IdInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const IdCheckButton = styled.button`
  padding: 0 16px;
  height: 56px;
  background-color: ${color.main[500]};
  color: ${color.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  ${font.bodytext2}
  
  &:disabled {
    background-color: ${color.gray[300]};
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: ${color.main[600]};
  }
`;

const IdStatusMessage = styled.div<{ isAvailable: boolean }>`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ isAvailable }) => isAvailable ? color.main[500] : color.error};
`;

const FormSection = styled.div`
  width: 835px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  ${font.header4}
  color: ${color.black};
`;

const ButtonContainer = styled.div`
  width: 835px;
  display: flex;
  justify-content: flex-end;
`;

const HeadText = styled.div`
  font-family: Pretendard;
  font-size: 42px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RegisterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.header4}
  color: ${color.white};
  background-color: ${color.main[500]};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 16px;
  width: 100%;
  height: 56px;
`;