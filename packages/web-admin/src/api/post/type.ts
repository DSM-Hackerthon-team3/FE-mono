export interface PostResponse {
  author: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  commentsCnt: number;
}

export type PostListResponse = PostResponse[];

export interface PostDetailResponse {
  author: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  commentList: {
    comments: Comment[];
    commentsCnt: number;
  };
}

export interface Comment {
  author: string;
  id: number;
  content: string;
  createdAt: string;
}

export interface PostPostRequest {
  stockId: number;
  title: string;
  content: string;
}

export interface PostCommentRequest {
  content: string;
  postId: number;
}