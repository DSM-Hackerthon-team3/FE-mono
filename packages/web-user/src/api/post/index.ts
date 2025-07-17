import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { instance } from "../axios";
import { PostDetailResponse, PostResponse, PostPostRequest, PostCommentRequest } from "./type";
import { useNavigate } from "react-router-dom";

const router = "/post";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ['getPosts'],
    queryFn: async () => {
      const { data } = await instance.get<PostResponse>(`/posts`);
      return data;
    },
    staleTime: 5000,
  });
};

export const useGetPostsDetail = (id: number) => {
  return useQuery({
    queryKey: ['getPostsDetail', id],
    queryFn: async () => {
      const { data } = await instance.get<PostDetailResponse>(`${router}/${id}`);
      return data;
    }
  })
};

export const usePostPost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (datas: PostPostRequest) => {
      return await instance.post(`${router}`, datas);
    },
    onSuccess: () => {
      console.log('성공');
      navigate(-1);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: (error) => console.log('error', error),
  });
};

export const usePostComments = (queryClient: QueryClient, id: number) => {
  return useMutation({
    mutationFn: async (datas: PostCommentRequest) => {
      return await instance.post(`/comment`, datas);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostsDetail', Number(id)] });
    },
    onError: (error) => console.log('error', error),
  });
};