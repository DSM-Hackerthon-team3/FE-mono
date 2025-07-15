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
`;

const Text = styled.p``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;