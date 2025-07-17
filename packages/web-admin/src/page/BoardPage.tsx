import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useNavigate } from "react-router-dom";
import { useGetPosts } from "@/api";

export const BoardPage = () => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  const { data: posts } = useGetPosts();

  return (
    <Container>
      <HeaderContainer>
        <TextDiv>
          <Title>질문 게시판</Title>
          <Subtitle>다양한 정보와 새로운 소식을 만나보세요!</Subtitle>
        </TextDiv>
        <WriteButton onClick={() => navigate("/board/write")}>작성하기</WriteButton>
      </HeaderContainer>
      <BoardTable>
        <thead>
          <tr>
            <TableHeader style={{ width: "25%" }}>작성자</TableHeader>
            <TableHeader style={{ width: "75%" }}>제목</TableHeader>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <TableRow key={post.id} onClick={() => handleRowClick(post.id)}>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.title}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </BoardTable>
    </Container >
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-top: 66px;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: flex-end;
  width: 100%;
  padding-top: 30px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  ${font.header1};
  color: ${color.black};
`;

const Subtitle = styled.p`
  ${font.bodytext1};
  color: ${color.gray[600]};
`;

const WriteButton = styled.button`
  ${font["heading-1"]};
  color: ${color.black};
  background-color: ${color.white};
  border: 1px solid ${color.main[400]};
  border-radius: 6px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${color.main[50]};
  }
`;

const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  ${font.header4};
  color: ${color.black};
  border-top: 2px solid ${color.gray[300]};
  padding: 16px;
  text-align: left;
  border-bottom: 2px solid ${color.gray[300]};
`;

const TableRow = styled.tr`
  cursor: pointer;
  border-bottom: 1px solid ${color.gray[200]};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${color.main[50]};
    border-bottom-color: transparent;
  }

  &:hover td {
    box-shadow: inset 0 1px 0 0 ${color.main[500]}, inset 0 -1px 0 0 ${color.main[500]};
    color: ${color.main[600]};
  }
`;

const TableCell = styled.td`
  ${font.subtitle1};
  color: ${color.black};
  padding: 16px;
  max-width: 800px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
