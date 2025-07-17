import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useEffect, useState } from "react";

interface SelectProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

export const Select = ({ options, placeholder, onSelect }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    setSelectedItem(null);
  }, [options]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SelectButton
        type="button" // 이 부분이 핵심! form submit 방지
        isOpen={isOpen}
        hasValue={!!selectedItem}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem || placeholder || "선택해주세요"}
      </SelectButton>
      {isOpen && (
        <DropdownContainer>
          <SearchInput
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <OptionList>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <OptionItem
                  key={option}
                  onClick={() => {
                    setSelectedItem(option);
                    onSelect(option);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {option}
                </OptionItem>
              ))
            ) : (
              <NoOptionsItem>검색 결과가 없습니다</NoOptionsItem>
            )}
          </OptionList>
        </DropdownContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectButton = styled.button<{ isOpen: boolean; hasValue: boolean }>`
  width: 100%;
  padding: 15px 12px;
  border-radius: ${({ isOpen }) => (isOpen ? "6px 6px 0 0" : "6px")};
  border: 1px solid ${color.gray[200]};
  background-color: ${color.gray[50]};
  color: ${({ hasValue }) => (hasValue ? color.black : color.gray[400])};
  ${font.subtitle1};
  text-align: left;
  height: 52px;
  cursor: pointer;
  
  &:hover {
    background-color: ${color.gray[100]};
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid ${color.gray[200]};
  border-top: none;
  border-radius: 0 0 6px 6px;
  background-color: ${color.white};
  z-index: 30;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 12px;
  border: none;
  border-bottom: 1px solid ${color.gray[200]};
  outline: none;
  ${font.bodytext1};
  box-sizing: border-box;
`;

const OptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${color.gray[100]};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${color.gray[400]};
    border-radius: 3px;
  }
`;

const OptionItem = styled.li`
  padding: 15px 12px;
  cursor: pointer;
  ${font.subtitle1};
  color: ${color.black};
  border-bottom: 1px solid ${color.gray[100]};
  
  &:hover {
    background-color: ${color.gray[100]};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NoOptionsItem = styled.li`
  padding: 15px 12px;
  ${font.subtitle1};
  color: ${color.gray[400]};
  text-align: center;
`;