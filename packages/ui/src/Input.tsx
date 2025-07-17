import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { forwardRef, useId } from "react";

interface InputProps {
  label: string;
  placeLabel: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeLabel,
  value,
  disabled = false,
  onChange,
  type,
  required = false,
  error,
  autoComplete,
  maxLength,
  minLength,
  ...props
}, ref) => {
  const inputId = useId();
  const errorId = useId();

  return (
    <Container>
      <LabelWrapper>
        <Label htmlFor={inputId}>
          {label}
          {required && <RequiredIndicator aria-label="필수 입력">*</RequiredIndicator>}
        </Label>
      </LabelWrapper>

      <InputWrapper hasError={!!error}>
        <InputStyle
          id={inputId}
          ref={ref}
          placeholder={placeLabel}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          hasError={!!error}
          {...props}
        />
      </InputWrapper>

      {error && (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      )}
    </Container>
  );
});

Input.displayName = "Input";

// 스타일드 컴포넌트들
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.label`
  ${font.header4};
  color: ${color.black};
  cursor: pointer;
  user-select: none;
  
  &:hover {
    color: ${color.main?.[600] || color.black};
  }
`;

const RequiredIndicator = styled.span`
  color: ${color.error?.[500] || '#d32f2f'};
  font-size: 16px;
  font-weight: 500;
  margin-left: 2px;
`;

const InputWrapper = styled.div<{ hasError: boolean }>`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ hasError }) =>
    hasError ? color.error?.[500] || '#d32f2f' : 'transparent'};
    transform: scaleX(${({ hasError }) => hasError ? 1 : 0});
    transform-origin: left;
    transition: transform 0.2s ease-in-out;
  }
`;

const InputStyle = styled.input<{ hasError: boolean }>`
  border-radius: 5px;
  width: 100%;
  height: 52px;
  font-size: 18px;
  padding: 0 16px;
  background-color: ${color.gray[50]};
  border: 1px solid ${({ hasError }) =>
    hasError ? color.error?.[400] || '#ef5350' : color.gray?.[200] || '#e0e0e0'};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError }) =>
    hasError ? color.error?.[500] || '#d32f2f' : color.main?.[500] || '#1976d2'};
    box-shadow: 0 0 0 2px ${({ hasError }) =>
    hasError ? color.error?.[100] || '#ffcdd2' : color.main?.[100] || '#e3f2fd'};
    background-color: ${color.white};
  }
  
  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ hasError }) =>
    hasError ? color.error?.[500] || '#d32f2f' : color.gray?.[400] || '#bdbdbd'};
  }
  
  &:disabled {
    background-color: ${color.gray?.[100] || '#f5f5f5'};
    border-color: ${color.gray?.[300] || '#e0e0e0'};
    color: ${color.gray?.[500] || '#9e9e9e'};
    cursor: not-allowed;
    
    &::placeholder {
      color: ${color.gray?.[400] || '#bdbdbd'};
    }
  }
  
  &::placeholder {
    color: ${color.gray[400]};
    ${font.subtitle1};
    opacity: 1;
  }
  
  /* 자동완성 스타일 */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${color.white} inset;
    -webkit-text-fill-color: ${color.black};
    transition: background-color 5000s ease-in-out 0s;
  }
  
  /* 입력값이 있을 때 스타일 */
  &:not(:placeholder-shown) {
    background-color: ${color.white};
  }
  
  /* 비밀번호 필드 특별 처리 */
  &[type="password"] {
    font-family: text-security-disc;
    letter-spacing: 0.1em;
  }
  
  /* 숫자 입력 필드의 스피너 제거 */
  &[type="number"] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const ErrorMessage = styled.div`
  ${font.bodytext2};
  color: ${color.error?.[600] || '#d32f2f'};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 16px;
  
  &::before {
    content: '⚠';
    font-size: 14px;
    color: ${color.error?.[500] || '#d32f2f'};
  }
`;