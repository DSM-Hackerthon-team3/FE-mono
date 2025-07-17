import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { Section } from "@packages/ui";
import { useNavigate } from "react-router-dom";
import { Note, Search } from "@/assets";
import { useGetPosts } from "@/api";
import { useState, useEffect } from "react";

export const MainPage = () => {
  const navigate = useNavigate();
  const { data: posts } = useGetPosts();

  const bannerItems = [
    {
      id: 1,
      title: (
        <>
          AI와 함께 하는 직업 체험? <br /> 지금 바로 시작해보세요!
        </>
      ),
      buttonText: "바로가기",
      buttonLink: "/mentoring",
      image: Search,
      bg: `linear-gradient(135deg, ${color.main[300]}, ${color.main[400]})`,
    },
    {
      id: 2,
      title: (
        <>
          진로 적성 검사를 통해 <br />
          자신에게 맞는 직업을 찾아보세요!
        </>
      ),
      buttonText: "진로 적성 검사 하기",
      buttonLink: "/career",
      image: Note,
      bg: `linear-gradient(135deg, ${color.main[300]}, ${color.main[400]})`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, 5000); // 5초마다 자동 전환

    return () => clearInterval(interval);
  }, [bannerItems.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerItems.length - 1 : prev - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Container>
      <BannerSlider>
        {bannerItems.map((item, index) => (
          <BannerSection
            key={item.id}
            style={{
              background: item.bg,
              opacity: currentIndex === index ? 1 : 0,
              zIndex: currentIndex === index ? 1 : 0,
            }}
          >
            <div>
              <BannerTitle>{item.title}</BannerTitle>
              <BannerSubtitle onClick={() => navigate(item.buttonLink)}>
                {item.buttonText}
              </BannerSubtitle>
            </div>
            <Img src={item.image} />
          </BannerSection>
        ))}

        <ArrowLeft onClick={handlePrev}>◀</ArrowLeft>
        <ArrowRight onClick={handleNext}>▶</ArrowRight>

        {/* 인디케이터 점들 */}
        <DotsContainer>
          {bannerItems.map((_, index) => (
            <Dot
              key={index}
              active={currentIndex === index}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotsContainer>
      </BannerSlider>

      {/* 추가 버튼들 - 배너와 게시글 섹션 사이의 자연스러운 위치 */}
      <QuickActionsContainer>
        <QuickActionButton
          primary
          onClick={() => navigate("/career")}
        >
          📝 진로 적성 검사 하기
        </QuickActionButton>
        <QuickActionButton
          primary
          onClick={() => navigate("/mentoring")}
        >
          💡 AI와 직업체험 해보기
        </QuickActionButton>
      </QuickActionsContainer>

      <PostsSection>
        <SectionTitle>새로 올라온 게시글</SectionTitle>
        <Hr />
        <PostList>
          {posts?.data?.slice(0, 4).map((post) => (
            <Section
              key={post.id}
              title={post.title}
              date={post.createdAt}
              content={post.content}
            />
          ))}
        </PostList>
      </PostsSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  flex-direction: column;
  margin-top: 66px;
`;

const BannerSlider = styled.div`
  position: relative;
  height: 50%;
  overflow: hidden;
`;

const BannerSection = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 280px;
  color: ${color.white};
  padding: 20px;
  transition: opacity 0.5s ease-in-out;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }
`;

const BannerTitle = styled.h1`
  ${font.header1};
  margin: 0;
`;

const BannerSubtitle = styled.button`
  ${font.header3};
  color: ${color.white};
  padding: 12px 64px;
  background-color: ${color.main[700]};
  border: none;
  width: 230px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${color.main[800]};
  }
`;

const Img = styled.img`
  width: 228px;
  height: 228px;
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: ${color.white};
  font-size: 40px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const ArrowRight = styled.button`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: ${color.white};
  font-size: 40px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1000;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) =>
    active ? color.white : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${color.white};
  }
`;

const QuickActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px 0;
  background-color: ${color.gray[100]};
  border-top: 1px solid ${color.gray[200]};
  border-bottom: 1px solid ${color.gray[200]};
`;

const QuickActionButton = styled.button<{ primary: boolean }>`
  ${font.bodytext1};
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  
  ${({ primary }) => primary ? `
    background-color: ${color.main[600]};
    color: ${color.white};
    
    &:hover {
      background-color: ${color.main[700]};
      transform: translateY(-2px);
    }
  ` : `
    background-color: ${color.white};
    color: ${color.main[600]};
    border: 2px solid ${color.main[600]};
    
    &:hover {
      background-color: ${color.main[600]};
      color: ${color.white};
      transform: translateY(-2px);
    }
  `}
`;

const PostsSection = styled.section`
  height: 50%;
  background-color: ${color.gray[50]};
  padding: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Hr = styled.hr`
  width: 1410px;
  height: 1px;
  border: none;
  background-color: ${color.gray[500]};
`;

const SectionTitle = styled.h2`
  ${font.header2};
  color: ${color.black};
`;

const PostList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 20px;
`;