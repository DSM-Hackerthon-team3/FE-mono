import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";

export const Section = ({ title, date, content }: { title: string; date: string; content: string }) => {
  return (
    <SectionDiv>
      <UpperDiv>
        <Title>{title}</Title>
        <Text>{date}</Text>
      </UpperDiv>
      <div>
        <Text>{content}</Text>
      </div>
    </SectionDiv>
  )
};


const SectionDiv = styled.div`
  width: 340px;
  height: 300px;
  background-color: ${color.white};
  border: 1px solid ${color.gray[500]};
  border-radius: 8px;
  padding: 23px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  ${font.header3};
  color: ${color.black};
`;

const Text = styled.p`
  ${font.bodytext1};
  color: ${color.black};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* 보여줄 최대 줄 수 */
  -webkit-box-orient: vertical;
`;
