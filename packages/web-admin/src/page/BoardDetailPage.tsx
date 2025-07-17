import { useGetPostsDetail, usePostComments } from "@/api";
import styled from "@emotion/styled";
import { color, font } from "@packages/design-token";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../../web-user/src/assets";

// --- Components ---
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return <StarContainer>{fullStars}{emptyStars}</StarContainer>;
};

const RatingModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (selectedRating === 0) {
      alert("평가를 선택해주세요.");
      return;
    }
    onSubmit(selectedRating);
    setSelectedRating(0);
    setHoverRating(0);
    onClose();
  };

  const handleClose = () => {
    setSelectedRating(0);
    setHoverRating(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>댓글 평가하기</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <RatingText>이 댓글이 얼마나 도움이 되었나요?</RatingText>
          <InteractiveStarContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <InteractiveStar
                key={star}
                active={star <= (hoverRating || selectedRating)}
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </InteractiveStar>
            ))}
          </InteractiveStarContainer>
          <RatingDescription>
            {selectedRating === 0 ? "별점을 선택해주세요" :
              selectedRating === 1 ? "별로예요" :
                selectedRating === 2 ? "그저 그래요" :
                  selectedRating === 3 ? "괜찮아요" :
                    selectedRating === 4 ? "좋아요" :
                      "매우 좋아요"}
          </RatingDescription>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={handleClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>평가하기</SubmitButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export const BoardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const { data: postDetail } = useGetPostsDetail(Number(id));
  const queryClient = useQueryClient();
  const { mutate: postComments } = usePostComments(queryClient, Number(id));

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    postComments({
      postId: Number(id),
      content: newComment,
    });
    alert("댓글이 등록되었습니다.");
    setNewComment("");
  };

  const handleRateComment = (commentId: number) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(true);
  };

  const handleRatingSubmit = (rating: number) => {
    // 여기에 댓글 평가 API 호출 로직을 추가하세요
    console.log(`댓글 ${selectedCommentId}에 ${rating}점 평가`);
    alert(`댓글에 ${rating}점을 평가했습니다.`);
  };

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

        <Divider />

        <CommentsSection>
          <CommentsHeader>
            <CommentsTitle>댓글 ({postDetail?.commentList.commentsCnt})</CommentsTitle>
          </CommentsHeader>

          <CommentsContainer>
            {postDetail?.commentList.comments.map((comment) => (
              <CommentItem key={comment.id}>
                <CommentAvatar src={Profile} alt={`profile`} />
                <CommentContent>
                  <CommentHeader>
                    <CommentAuthorInfo>
                      <CommentAuthorName>{comment.author}</CommentAuthorName>
                      <StarRating rating={0} />
                    </CommentAuthorInfo>
                    <RateButton onClick={() => handleRateComment(comment.id)}>
                      평가하기
                    </RateButton>
                  </CommentHeader>
                  <CommentText>{comment.content}</CommentText>
                </CommentContent>
              </CommentItem>
            ))}
          </CommentsContainer>

          <CommentInputSection>
            <CommentInputTitle>댓글 작성하기</CommentInputTitle>
            <CommentInputContainer>
              <CommentTextarea
                placeholder="따뜻한 댓글을 남겨주세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <SubmitCommentButton onClick={handleCommentSubmit}>
                댓글 등록
              </SubmitCommentButton>
            </CommentInputContainer>
          </CommentInputSection>
        </CommentsSection>
      </Container>

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRatingSubmit}
      />
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
`;

const PostHeader = styled.div`
  margin-bottom: 32px;
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
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${color.gray[200]};
  margin: 40px 0;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentsTitle = styled.h2`
  ${font.header2};
  color: ${color.black};
  margin: 0;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  background: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray[100]};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${color.gray[200]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const CommentAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${color.gray[200]};
  border: 2px solid ${color.gray[100]};
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentAuthorName = styled.span`
  ${font.subtitle2};
  color: ${color.black};
  font-weight: 600;
`;

const StarContainer = styled.span`
  color: ${color.main[500]};
  font-size: 16px;
`;

const RateButton = styled.button`
  ${font.bodytext2};
  color: ${color.main[500]};
  background: ${color.main[50]};
  border: 1px solid ${color.main[200]};
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${color.main[100]};
    border-color: ${color.main[300]};
  }
`;

const CommentText = styled.p`
  ${font.bodytext2};
  color: ${color.gray[800]};
  margin: 0;
  line-height: 1.6;
`;

const CommentInputSection = styled.div`
  background: ${color.white};
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${color.gray[100]};
`;

const CommentInputTitle = styled.h3`
  ${font.subtitle1};
  color: ${color.black};
  margin: 0 0 16px 0;
  font-weight: 600;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentTextarea = styled.textarea`
  ${font.bodytext1};
  padding: 16px;
  border: 1px solid ${color.gray[300]};
  border-radius: 8px;
  outline: none;
  height: 120px;
  resize: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${color.main[500]};
  }

  &::placeholder {
    color: ${color.gray[400]};
  }
`;

const SubmitCommentButton = styled.button`
  ${font.subtitle1};
  color: ${color.white};
  background: ${color.main[500]};
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
  font-weight: 600;

  &:hover {
    background: ${color.main[600]};
    transform: translateY(-1px);
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${color.white};
  border-radius: 16px;
  width: 90%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
`;

const ModalTitle = styled.h2`
  ${font.header2};
  color: ${color.black};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${color.gray[500]};
  padding: 4px;
  
  &:hover {
    color: ${color.gray[700]};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  text-align: center;
`;

const RatingText = styled.p`
  ${font.bodytext1};
  color: ${color.gray[700]};
  margin: 0 0 24px 0;
`;

const InteractiveStarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const InteractiveStar = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: ${props => props.active ? color.main[500] : color.gray[300]};
  transition: all 0.2s ease;
  padding: 4px;

  &:hover {
    transform: scale(1.1);
  }
`;

const RatingDescription = styled.p`
  ${font.bodytext2};
  color: ${color.gray[600]};
  margin: 0;
  height: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px 24px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  ${font.bodytext1};
  color: ${color.gray[600]};
  background: ${color.gray[100]};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${color.gray[200]};
  }
`;

const SubmitButton = styled.button`
  ${font.bodytext1};
  color: ${color.white};
  background: ${color.main[500]};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;

  &:hover {
    background: ${color.main[600]};
  }
`;