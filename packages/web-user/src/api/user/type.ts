export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface MyPageResponse {
  id: string;
  jobType: string;
  gender: string;
  posts: Post[];
}
