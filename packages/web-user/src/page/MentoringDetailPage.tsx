import { useState, useRef, useEffect } from 'react';
import { Send, Upload, MessageCircle, PanelLeft, LogOut } from 'lucide-react';
import styled from '@emotion/styled';
import { color, font } from '@packages/design-token';
import { jobCategories } from '@/data';
import { useParams, useNavigate } from 'react-router-dom';
import { Background, Table } from '@/assets';
import { usePostMentoring } from '@/api';

export const MentoringDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState("");
  const characterImage = jobCategories.find(job => job.id === id)?.img;
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentInitialMessageIndex, setCurrentInitialMessageIndex] = useState(0);
  const [isChatActive, setIsChatActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [lastCharacterMessage, setLastCharacterMessage] = useState(""); // 마지막 캐릭터 메시지 저장
  const [isEnding, setIsEnding] = useState(false); // 대화 종료 상태 추가

  const initialCharacterMessages = [
    { id: 1, text: `안녕하세요! 저는 당신의 ${jobCategories.find(job => job.id === id)?.name} 멘토입니다.`, sender: "character", timestamp: new Date() },
    { id: 2, text: "직업체험을 시작하기 전에, 간단히 설명을 드리겠습니다.", sender: "character", timestamp: new Date() },
    { id: 3, text: "직업체험은 제가 간단히 제시하는 가상의 상황에서 당신이 실제 업무를 체험해보는 것입니다.", sender: "character", timestamp: new Date() },
    { id: 4, text: "체험이 끝난 후엔 제가 간단하게 피드백을 드립니다.", sender: "character", timestamp: new Date() },
    { id: 5, text: "직업체험을 시작하시겠습니까?", sender: "character", timestamp: new Date() },
  ];

  const [messages, setMessages] = useState([
    initialCharacterMessages[0]
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { mutate: postMentoring } = usePostMentoring();

  useEffect(() => {
    // 마지막 캐릭터 메시지 업데이트
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "character") {
      setLastCharacterMessage(lastMessage.text);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      lastMessage.id === initialCharacterMessages[initialCharacterMessages.length - 1].id &&
      lastMessage.sender === "character"
    ) {
      setShowOptions(true);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now(), // ID 충돌 방지를 위해 timestamp 사용
        text: currentMessage,
        sender: "user",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage("");
      setIsTyping(true);

      postMentoring(
        {
          job: `${id}`,
          content: currentMessage
        },
        {
          onSuccess: (responseData) => {
            const characterResponse = {
              id: Date.now() + 1,
              text: responseData.data.content,
              sender: "character",
              timestamp: new Date()
            };

            setMessages(prev => [...prev, characterResponse]);
            setLastCharacterMessage(responseData.data.content);
            setIsTyping(false);
          },
          onError: () => {
            setIsTyping(false);
          }
        }
      );
    }
  };

  const handleConfirm = () => {
    if (currentInitialMessageIndex < initialCharacterMessages.length - 1) {
      const nextIndex = currentInitialMessageIndex + 1;
      setCurrentInitialMessageIndex(nextIndex);
      setMessages(prev => [...prev, initialCharacterMessages[nextIndex]]);
    } else {
      setShowOptions(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartExperience = () => {
    const userMessage = {
      id: Date.now(),
      text: "직업체험 시작하기",
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsChatActive(true);
    setIsTyping(true);

    postMentoring(
      {
        job: `${id}`,
        content: "직업체험 시작하기",
      },
      {
        onSuccess: (responseData) => {
          const characterResponse = {
            id: Date.now() + 1,
            text: responseData.data.content,
            sender: "character",
            timestamp: new Date()
          };

          setMessages(prev => [...prev, characterResponse]);
          setLastCharacterMessage(responseData.data.content);
          setIsTyping(false);
        },
        onError: () => {
          setIsTyping(false);
        }
      }
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // 대화 종료 기능 추가
  const handleEndChat = () => {
    const farewellMessage = {
      id: Date.now(),
      text: `${id}직업 체험이 끝났습니다. 피드백: 당신은 주어진 상황에 대해 몰입했고, 올바르게 대처했습니다. 다만 아쉬운점은, 직업 이해도와 직업에 대한 관심이 부족한 것 같습니다. 따라서 앞으로 더 많은 직업을 체험해보시고, 직업에 대한 관심을 키워가시면 좋을 것 같습니다.`,
      sender: "character",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, farewellMessage]);
    setLastCharacterMessage("안녕!");
    setIsEnding(true);
    setIsChatActive(false);
    setShowOptions(false);
  };

  const handleLeaveChat = () => {
    navigate(-1);
  };

  return (
    <Container>
      <MainArea>
        <SidebarToggleButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen}>
          <PanelLeft size={24} />
        </SidebarToggleButton>
        <CharacterArea>
          {characterImage ? (
            <CharacterImageContainer>
              <img src={characterImage} alt="Character" />
              <IconBadge>
                <MessageCircle size={24} />
              </IconBadge>
            </CharacterImageContainer>
          ) : (
            <CharacterPlaceholder>
              <div className="placeholder-circle">
                <Upload size={64} color={color.gray[400]} />
              </div>
            </CharacterPlaceholder>
          )}
        </CharacterArea>

        <MessageBubbleArea>
          <MessageBubble>
            {isTyping ? (
              <TypingIndicator>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <span style={{ ...font.bodytext2, color: color.gray[500] }}>입력 중...</span>
              </TypingIndicator>
            ) : (
              <MessageText>
                {lastCharacterMessage}
              </MessageText>
            )}
          </MessageBubble>
        </MessageBubbleArea>

        {isEnding ? (
          <InitialOptionsContainer>
            <OptionButton onClick={handleLeaveChat}>나간다</OptionButton>
          </InitialOptionsContainer>
        ) : isChatActive ? (
          <UserChatInputArea>
            <MessageInput
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              rows={2}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
            >
              <Send size={20} />
            </SendButton>
          </UserChatInputArea>
        ) : showOptions ? (
          <InitialOptionsContainer>
            <OptionButton onClick={handleStartExperience}>직업체험 시작하기</OptionButton>
            <OptionButton onClick={handleGoBack}>뒤로가기</OptionButton>
          </InitialOptionsContainer>
        ) : (
          <InitialOptionsContainer>
            <OptionButton onClick={handleConfirm}>확인</OptionButton>
          </InitialOptionsContainer>
        )}
      </MainArea>

      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarHeader>
            대화 기록
          </SidebarHeader>

          <MessagesContainer>
            {messages.map((message) => (
              <MessageItem key={message.id} isUser={message.sender === 'user'}>
                <MessageContent isUser={message.sender === 'user'}>
                  <p className="message-text">{message.text}</p>
                  <p className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </MessageContent>
              </MessageItem>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          {/* 대화 종료 버튼 추가 */}
          {isChatActive && !isEnding && (
            <EndChatButtonContainer>
              <EndChatButton onClick={handleEndChat}>
                <LogOut size={20} />
                대화 종료하기
              </EndChatButton>
            </EndChatButtonContainer>
          )}
        </Sidebar>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-image: url('${Background}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 320px;
  background-image: url('${Table}');
  background-size: 100%;
  background-position: 50% 150%;
  background-repeat: no-repeat;
`;

const CharacterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CharacterImageContainer = styled.div`
  position: relative;
  top: 2rem;
  
  img {
    max-width: 32rem;
    max-height: 32rem;
    object-fit: contain;
  }
`;

const CharacterPlaceholder = styled.div`
  text-align: center;
  
  .placeholder-circle {
    width: 16rem;
    height: 16rem;
    background: ${color.white};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    margin-bottom: 1rem;
  }
`;

const MessageBubbleArea = styled.div`
  padding: 1.5rem;
`;

const MessageBubble = styled.div`
  width: 766px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15);
  border: none;
  position: relative;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .dot {
    width: 0.5rem;
    height: 0.5rem;
    background: ${color.main[400]};
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
    
    &:nth-of-type(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-of-type(2) {
      animation-delay: -0.16s;
    }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const MessageText = styled.p`
  ${font.header4}
  color: ${color.white};
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.07em;
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 24rem;
  background: ${color.white};
  box-shadow: -5px 0 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-top: 66px;
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  position: fixed;
  right: 0;
  top: 0;
  height: calc(100vh - 66px);
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  background: linear-gradient(90deg, ${color.main[500]} 0%, ${color.main[600]} 100%);
  color: ${color.white};
  text-align: center;
  ${font.subtitle1}
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageItem = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageContent = styled.div<{ isUser: boolean }>`
  max-width: 18rem;
  background: ${props => props.isUser ? color.main[500] : color.gray[100]};
  color: ${props => props.isUser ? color.white : color.gray[800]};
  border-radius: 0.5rem;
  padding: 0.75rem;
  
  .message-text {
    ${font.bodytext2}
    word-break: break-word;
    margin: 0;
  }
  
  .message-time {
    ${font.caption}
    color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : color.gray[500]};
    margin-top: 0.25rem;
    font-size: 0.625rem;
  }
`;

const UserChatInputArea = styled.div`
  width: 766px;
  margin: 1.5rem auto;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15);
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  resize: none;
  ${font.bodytext1}
  background: transparent;
  color: ${color.white};
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &::placeholder {
    color: ${color.gray[400]};
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${color.main[500]};
  color: ${color.white};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: ${color.main[600]};
  }
  
  &:disabled {
    background: ${color.gray[300]};
    cursor: not-allowed;
  }
`;

const IconBadge = styled.div`
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: ${color.white};
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: ${color.main[500]};
`;

const SidebarToggleButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  right: ${props => (props.isOpen ? '24rem' : '0')};
  top: 76px;
  background: ${color.main[500]};
  color: ${color.white};
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: right 0.3s ease-in-out;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InitialOptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const OptionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${color.main[500]};
  color: ${color.white};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  ${font.bodytext1}
  transition: background-color 0.2s;

  &:hover {
    background: ${color.main[600]};
  }
`;

// 대화 종료 버튼 관련 스타일 추가
const EndChatButtonContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${color.gray[200]};
`;

const EndChatButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${color.error};
  color: ${color.white};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  ${font.bodytext1}
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${color.error};
  }
`;