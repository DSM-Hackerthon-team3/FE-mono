import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { color } from "@packages/design-token";

interface DropdownProps {
  props: {
    data: string[];
  };
}

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  padding: 16px 16px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #ffffff;
  align-self: center;
  border: 1px solid black;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #777777;

  &::before {
    content: "⌵";
    position: absolute;
    top: 4px;
    right: 8px;
    color: #1C1B1F;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Label = styled.label`
  font-size: 14px;
  display: inline-block;
`;

const SelectOptions = styled.ul<{ $show: boolean }>`
  position: absolute;
  top: 52px;
  left: 0;
  width: 100%;
  max-height: ${(props) => (props.$show ? "200px" : "0")};
  overflow-y: auto;
  border: ${(props) => (props.$show ? "1px solid #cccccc" : "none")};
  background-color: #EFF1FF;
  padding: 0;
  margin: 0;
  list-style: none;
  transition: max-height 0.2s ease-in;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 0px 3px 3px 0px;
  }
`;

const Option = styled.li`
  font-size: 14px;
  padding: 10px;
  transition: background-color 0.2s ease-in;
  font-weight: bold;

  &:hover {
    border-radius: 5px;
    background-color: ${color.gray[400]};
  }
`;

export const DropDown: React.FC<DropdownProps> = ({ props }) => {
  const list = props?.data || [];
  const selectRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState<string>("학년 선택");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectBox onClick={() => setShowOptions((prev) => !prev)} ref={selectRef}>
      <Label>{currentValue}</Label>
      <SelectOptions $show={showOptions}>
        {list.map((item, index) => (
          <Option
            key={index}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleSelect(item);
            }}
          >
            {item}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};