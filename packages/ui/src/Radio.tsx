import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useState } from "react";

interface RadioProps {
  title: string;
  options: string[];
  name: string;
  onChange: (value: string) => void;
}

export const Radio = ({ title, options, name, onChange }: RadioProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Container>
      <Text>{title}</Text>
      <Div>
        {options.map((option) => (
          <Label key={option}>
            <Input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={handleChange}
            />
            {option}
          </Label>

        ))}
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 835px;
`;

const Text = styled.p`
  ${font.header4};
  color: ${color.black};
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap:14px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  ${font.bodytext1};
  color: ${color.black};
  cursor: pointer;
`;

const Input = styled.input`
  cursor: pointer;
`;
