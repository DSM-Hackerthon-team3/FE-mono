/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { color, font } from '@packages/design-token';
import { Users, BookOpen, MessageCircle, Briefcase, Play, ArrowRight } from 'lucide-react';
import { jobCategories } from '@/data';

export const MentoringPage = () => {
  const [currentStep, setCurrentStep] = useState('main');
  const navigate = useNavigate();

  const features = [
    { icon: Users, title: '다양한 직업 선택', description: '30개의 다양한 직업 중 관심 있는 직업을 골라보세요' },
    { icon: BookOpen, title: '직업 설명', description: '각 직업의 실제 업무를 알아보세요' },
    { icon: MessageCircle, title: '실제 체험', description: '질문하고 답하며 직접 체험해보세요' }
  ];

  const handleJobSelect = (jobId: string) => {
    setCurrentStep('detail');
    navigate(`/mentoring/${jobId}/detail`);
  };

  const handleStartExploring = () => {
    setCurrentStep('jobList');
  };

  const renderMainPage = () => (
    <div css={containerStyle}>
      <div css={maxWidthStyle}>
        {/* Header */}
        <div css={headerStyle}>
          <div css={iconContainerStyle}>
            <Briefcase size={48} color={color.main[600]} />
          </div>
          <h1 css={titleStyle}>안녕하세요! 👋</h1>
          <p css={subtitleStyle}>이곳은 다양한 직업을 체험해볼 수 있는</p>
          <p css={mainTitleStyle}>직업체험 챗봇입니다</p>
        </div>

        {/* Features */}
        <div>
          <h2 css={sectionTitleStyle}>무엇을 할 수 있나요?</h2>
          <div css={featureGridStyle}>
            {features.map((feature, index) => (
              <div key={index} css={featureCardStyle}>
                <div css={featureHeaderStyle}>
                  <div css={featureIconStyle}>
                    <feature.icon size={24} color={color.main[600]} />
                  </div>
                  <h3 css={featureTitleStyle}>{feature.title}</h3>
                </div>
                <p css={featureDescriptionStyle}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Categories */}
        <div>
          <h2 css={sectionTitleStyle}>자, 시작해볼까요?</h2>
          <div css={ctaContainerStyle}>
            <button css={ctaButtonStyle} onClick={handleStartExploring}>
              <Play size={20} />
              진로 체험 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobListPage = () => (
    <div css={containerStyle}>
      <div css={maxWidthStyle}>
        {/* Header */}
        <div css={jobListHeaderStyle}>
          <button
            css={backButtonStyle}
            onClick={() => setCurrentStep('main')}
          >
            ← 돌아가기
          </button>
          <h1 css={jobListTitleStyle}>직업을 선택해주세요</h1>
          <p css={jobListSubtitleStyle}>관심 있는 직업을 클릭하여 체험해보세요!</p>
        </div>

        {/* Job Grid */}
        <div css={jobGridStyle}>
          {jobCategories.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobSelect(job.id)}
              css={jobCardStyle}
            >
              <div css={jobImageContainerStyle}>
                <img
                  src={job.img}
                  alt={job.name}
                  css={jobImageStyle}
                />
              </div>
              <div css={jobContentStyle}>
                <h3 css={jobTitleStyle}>{job.name}</h3>
                <p css={jobDescriptionStyle}>{job.description}</p>
                <div css={jobFooterStyle}>
                  <span css={jobActionStyle}>체험하기</span>
                  <ArrowRight size={20} color={color.main[600]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );



  return currentStep === 'main' ? renderMainPage() : renderJobListPage();
};

const containerStyle = css`
  min-height: 100vh;
  background: linear-gradient(135deg, ${color.main[50]} 0%, ${color.main[100]} 100%);
  padding: 24px;
  margin-top: 66px;
`;

const maxWidthStyle = css`
  max-width: 1200px;
  margin: 0 auto;
`;

const headerStyle = css`
  text-align: center;
  margin-bottom: 48px;
`;

const iconContainerStyle = css`
  background: ${color.white};
  border-radius: 50%;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const titleStyle = css`
  ${font.header1}
  color: ${color.gray[800]};
  margin-bottom: 16px;
`;

const subtitleStyle = css`
  ${font.header4}
  color: ${color.gray[600]};
  margin-bottom: 8px;
`;

const mainTitleStyle = css`
  ${font.header2}
  color: ${color.main[600]};
  margin-bottom: 32px;
`;

const sectionTitleStyle = css`
  ${font.header3}
  color: ${color.gray[800]};
  margin-bottom: 24px;
  text-align: center;
`;

const featureGridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const featureCardStyle = css`
  background: ${color.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const featureHeaderStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const featureIconStyle = css`
  background: ${color.main[100]};
  border-radius: 8px;
  padding: 12px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const featureTitleStyle = css`
  ${font.subtitle1}
  color: ${color.gray[800]};
`;

const featureDescriptionStyle = css`
  ${font.bodytext1}
  color: ${color.gray[600]};
`;

const jobGridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const jobCardStyle = css`
  background: ${color.white};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    
    img {
      transform: scale(1.05);
    }
  }
`;

// const jobHeaderStyle = css`
//   display: flex;
//   align-items: center;
//   margin-bottom: 16px;
// `;

// const jobIconContainerStyle = (bgColor) => css`
//   background: ${bgColor};
//   border-radius: 8px;
//   padding: 10px;
//   margin-right: 14px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: transform 0.3s ease;
//   min-width: 50px;
//   min-height: 50px;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

const jobTitleStyle = css`
  ${font.header4}
  color: ${color.gray[800]};
  margin-bottom: 4px;
`;

const jobDescriptionStyle = css`
  ${font.bodytext2}
  color: ${color.gray[600]};
  line-height: 1.4;
`;

const jobFooterStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const jobActionStyle = css`
  ${font.subtitle2}
  color: ${color.main[600]};
`;

const ctaContainerStyle = css`
  text-align: center;
`;

const ctaButtonStyle = css`
  background: ${color.main[600]};
  color: ${color.white};
  ${font.subtitle1}
  padding: 16px 32px;
  border-radius: 50px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${color.main[700]};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;



const jobListHeaderStyle = css`
  text-align: center;
  margin-bottom: 48px;
  position: relative;
`;

const jobListTitleStyle = css`
  ${font.header2}
  color: ${color.gray[800]};
  margin-bottom: 12px;
`;

const jobListSubtitleStyle = css`
  ${font.bodytext1}
  color: ${color.gray[600]};
`;

const jobImageContainerStyle = css`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  position: relative;
  background: ${color.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const jobImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const jobContentStyle = css`
  padding: 0 4px;
`;

const backButtonStyle = css`
  background: ${color.gray[100]};
  color: ${color.gray[700]};
  ${font.subtitle2}
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;

  &:hover {
    background: ${color.gray[200]};
  }
`;