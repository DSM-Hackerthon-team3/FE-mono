import styled from "@emotion/styled"

export const Input = () => {
  return (
    <Container>
      <Text>아이디</Text>
      <InputStyle placeholder="아이디를 입력" />
    </Container>
  );
};

const InputStyle = styled.input`
  border-radius: 6px;
  width: 100%;
  height: 52px;
  font-size:18px;
  padding: 0 12px;
  border: 1px solid #000;
`;

const Text = styled.p`
font-weight: bold;
font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
