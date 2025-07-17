import { useGetPostsDetail } from "@/api";
import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useParams } from "react-router-dom";
import { Profile } from "@/assets";

// --- Components ---
export const BoardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: postDetail } = useGetPostsDetail(Number(id));

  return (
    <>
      <Container>
        <PostSection>
          <PostHeader>
            <Title>{postDetail?.title}</Title>
            <AuthorContainer>
              <Avatar src={Profile} alt={`profile`} />
              <AuthorInfo>
                <AuthorName>{postDetail?.author}</AuthorName>
                <MetaContainer>
                  <MetaItem>
                    <MetaLabel>작성일:</MetaLabel>
                    <MetaValue>{postDetail?.createdAt}</MetaValue>
                  </MetaItem>
                  <MetaItem>
                    <MetaLabel>조회수:</MetaLabel>
                    <MetaValue>{postDetail?.commentList.commentsCnt}</MetaValue>
                  </MetaItem>
                </MetaContainer>
              </AuthorInfo>
            </AuthorContainer>
          </PostHeader>

          <PostBody>{postDetail?.content}</PostBody>
        </PostSection>
      </Container>
    </>
  );
};

// --- Styled Components ---
const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  margin-top: 66px;
`;

const PostSection = styled.div`
  background: ${color.white};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid ${color.gray[100]};
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  margin-bottom: 32px;
  flex: 1;
`;

const Title = styled.h1`
  ${font.header1};
  color: ${color.black};
  margin-bottom: 24px;
  line-height: 1.4;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${color.gray[200]};
  border: 2px solid ${color.gray[100]};
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AuthorName = styled.span`
  ${font.subtitle1};
  color: ${color.black};
  font-weight: 600;
`;

const MetaContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetaLabel = styled.span`
  ${font.bodytext2};
  color: ${color.gray[500]};
`;

const MetaValue = styled.span`
  ${font.bodytext2};
  color: ${color.gray[700]};
  font-weight: 500;
`;

const PostBody = styled.div`
  ${font.bodytext1};
  color: ${color.gray[800]};
  line-height: 1.8;
  min-height: 200px;
  white-space: pre-wrap;
  flex: 3;
`;