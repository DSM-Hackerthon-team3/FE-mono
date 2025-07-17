import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostPost } from "@/api";

export const BoardWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { mutate: postPost } = usePostPost();

  const handleSubmit = () => {
    postPost({ title, content });
  };

  const handleCancel = () => {
    navigate("/board");
  };

  return (
    <Container>
      <Title>질문 작성하기</Title>
      <Form>
        <Text>제목</Text>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text>내용</Text>
        <Textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-top: 66px;
`;

const Title = styled.h1`
  ${font.header1};
  color: ${color.black};
  margin-bottom: 40px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  ${font.bodytext1};
  padding: 16px;
  border: 1px solid ${color.gray[300]};
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: ${color.main[500]};
  }
`;

const Textarea = styled.textarea`
  ${font.bodytext1};
  padding: 16px;
  border: 1px solid ${color.gray[300]};
  border-radius: 6px;
  outline: none;
  height: 500px;
  resize: none;

  &:focus {
    border-color: ${color.main[500]};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  ${font.subtitle1};
  color: ${color.gray[800]};
  background-color: ${color.white};
  border: 1px solid ${color.gray[600]};
  border-radius: 12px;
  padding: 12px 52px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${color.gray[50]};
  }
`;

const SubmitButton = styled.button`
  ${font.subtitle1};
  color: ${color.white};
  background-color: ${color.main[500]};
  border: none;
  border-radius: 12px;
  padding: 12px 52px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${color.main[600]};
  }
`;

const Text = styled.p`
  ${font.header3};
  color: ${color.gray[600]};
`;
