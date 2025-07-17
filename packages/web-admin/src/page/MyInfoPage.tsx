import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Profile } from "../../../web-user/src/assets";

// --- Mock Data ---
const mockUser = {
  name: "김코딩",
  job: "프론트엔드 개발자",
  avatar: "https://via.placeholder.com/150", // Placeholder image
};

const mockPosts = [
  { id: 1, title: "리액트 질문 있습니다!", date: "2025/07/15" },
  { id: 2, title: "자바스크립트 클로저에 대한 고찰", date: "2025/07/12" },
  { id: 3, title: "CSS Grid와 Flexbox, 언제 무엇을 써야할까?", date: "2025/07/10" },
  { id: 4, title: "Vite 프로젝트 초기 설정 가이드", date: "2025/07/05" },
];

export const MyInfoPage = () => {
  return (
    <Container>
      <PageTitle>내 정보</PageTitle>
      <ContentWrapper>
        <ProfileSection>
          <Avatar src={Profile} alt={`${mockUser.name} profile`} />
          <Name>{mockUser.name}</Name>
          <Job>{mockUser.job}</Job>
        </ProfileSection>

        <Divider />

        <PostsSection>
          <SectionTitle>내가 작성한 글</SectionTitle>
          <PostList>
            {mockPosts.map((post) => (
              <PostItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
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

  &:hover {
    background-color: ${color.gray[50]};
  }
`;

const PostTitle = styled.span`
  ${font.bodytext1};
  color: ${color.gray[800]};
`;

const PostDate = styled.span`
  ${font.bodytext2};
  color: ${color.gray[500]};
  min-width: 100px;
  text-align: right;
`;
