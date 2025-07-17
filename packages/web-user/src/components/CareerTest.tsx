import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { forwardRef } from "react";

interface CareerTestProps {
  Number: string;
  question: string;
  options: string[];
  rawChoices: Array<{ no: string; text: string; }>;
  name: string;
  onChange: (value: string, checked?: boolean) => void;
  selectedValue: string | string[] | null;
  isMultiSelect?: boolean;
  onNext?: () => void;
}

export const CareerTest = forwardRef<HTMLDivElement, CareerTestProps>(
  ({
    Number,
    question,
    rawChoices,
    name,
    onChange,
    selectedValue,
    isMultiSelect = false,
    onNext,
  }, ref) => {

    return (
      <Container ref={ref}>
        <UpperDiv>
          <NumberText>{Number}.</NumberText>
          <Text>{question}</Text>
        </UpperDiv>
        <SelectDiv>
          {rawChoices.map((choice, index) => {
            // choice.no가 undefined인 경우 인덱스 사용
            const choiceValue = choice.no || index.toString();

            const checked = isMultiSelect
              ? Array.isArray(selectedValue) && selectedValue.includes(choiceValue)
              : selectedValue === choiceValue;

            return (
              <RadioOptionWrapper
                key={choiceValue}
                isChecked={checked}
              >
                <input
                  type={isMultiSelect ? "checkbox" : "radio"}
                  id={`${name}-${choiceValue}`}
                  name={name}
                  value={choiceValue}
                  checked={checked}
                  onChange={(e) => {
                    console.log('onChange called:', {
                      choice_value: choiceValue,
                      checked: e.target.checked,
                      isMultiSelect
                    });
                    if (isMultiSelect) {
                      onChange(choiceValue, e.target.checked);
                    } else {
                      onChange(e.target.value);
                    }
                  }}
                />
                <span>{choice.text}</span>
              </RadioOptionWrapper>
            );
          })}
        </SelectDiv>
        {isMultiSelect && onNext && (
          <NextButton onClick={onNext}>다음</NextButton>
        )}
      </Container>
    );
  }
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
  padding: 38px 44px;
`;

const Text = styled.p`
  ${font.header3};
  color: ${color.black};
`;

const NumberText = styled.p`
  ${font.header3};
  color: ${color.main[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const UpperDiv = styled.div`
  display: flex;
  gap: 14px;
`;

const SelectDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
`;

const RadioOptionWrapper = styled.label<{ isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid ${({ isChecked }) => (isChecked ? color.main[500] : color.gray[400])};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
  background-color: ${({ isChecked }) => (isChecked ? color.main[500] : 'transparent')};

  input[type="radio"], input[type="checkbox"] {
    display: none;
  }

  &:hover {
    border-color: ${color.main[500]};
  }

  span {
    ${font.bodytext1};
    color: ${({ isChecked }) => (isChecked ? color.white : color.black)} !important;
    display: block;
    width: 100%;
  }
`;

const NextButton = styled.button`
  ${font.header3};
  color: ${color.white};
  background-color: ${color.main[500]};
  border: none;
  border-radius: 6px;
  padding: 12px 120px;
  cursor: pointer;
  margin-top: 40px;
  align-self: center;
  &:hover {
    background-color: ${color.main[600]};
  }
`;
