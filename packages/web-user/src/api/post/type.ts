export interface Post {
  author: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  commentsCnt: number;
}

export interface PostResponse {
  data: Post[];
}

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
  title: string;
  content: string;
}

export interface PostCommentRequest {
  content: string;
  postId: number;
}