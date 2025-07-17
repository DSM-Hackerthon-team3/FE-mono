import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Profile } from "@/assets";
import { useGetMyPage } from "@/api/user";
import { useNavigate } from "react-router-dom";

export const MyInfoPage = () => {
  const { data } = useGetMyPage();
  const navigate = useNavigate();

  return (
    <Container>
      <PageTitle>내 정보</PageTitle>
      <ContentWrapper>
        <ProfileSection>
          <Avatar src={Profile} alt={`profile`} />
          <Name>{data?.id ?? 0}</Name>
          <Job>{data?.jobType ?? 0}</Job>
          <Gender>{data?.gender ?? "성별 정보 없음"}</Gender>
        </ProfileSection>

        <Divider />

        <PostsSection>
          <SectionTitle>내가 작성한 글</SectionTitle>
          <PostList>
            {data?.posts.map((data) => (
              <PostItem key={data?.id ?? 0} onClick={() => navigate(`/board/${data?.id}`)}>
                <PostTitle>{data?.title}</PostTitle>
                <PostDate>{data?.content}</PostDate>
              </PostItem>
            ))}
          </PostList>
        </PostsSection>
      </ContentWrapper>
    </Container>
  );
};


// --- Styled Components ---
const Container = styled.div`
  width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 60px 40px;
          margin-top: 66px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          `;

const PageTitle = styled.h1`
          ${font.header1};
          color: ${color.black};
          `;

const ContentWrapper = styled.div`
          display: flex;
          gap: 60px;
          width: 100%;
          `;

const ProfileSection = styled.aside`
          width: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          `;

const Avatar = styled.img`
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-color: ${color.gray[200]};
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          `;

const Name = styled.h2`
          ${font.header2};
          color: ${color.black};
          margin: 0;
          `;

const Job = styled.p`
          ${font.subtitle1};
          color: ${color.main[500]};
          margin-top: 8px;
          `;

const Gender = styled.p`
          ${font.subtitle1};
          color: ${color.gray[600]};
          margin-top: 4px;
          `;

const Divider = styled.div`
          width: 1px;
          background-color: ${color.gray[200]};
          align-self: stretch;
          `;

const PostsSection = styled.main`
          flex: 1;
          display: flex;
          flex-direction: column;
          `;

const SectionTitle = styled.h3`
          ${font.header3};
          color: ${color.black};
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid ${color.gray[300]};
          `;

const PostList = styled.ul`
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          `;

const PostItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid ${color.gray[200]};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${color.main[50]};
    box-shadow: inset 0 1px 0 0 ${color.main[500]}, inset 0 -1px 0 0 ${color.main[500]};
    color: ${color.main[600]};
  }

  &:hover span {
    color: ${color.main[600]};
  }
`;

const PostTitle = styled.span`
  ${font.bodytext1};
  color: ${color.gray[800]};
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostDate = styled.span`
  ${font.bodytext2};
  color: ${color.gray[500]};
  min-width: 100px;
  max-width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
`;
