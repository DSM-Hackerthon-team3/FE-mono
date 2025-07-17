import { useMutation } from "@tanstack/react-query";
import { instance } from "../axios";
import { MentoringPostCommentRequest } from "./type";

export const usePostMentoring = () => {
  return useMutation({
    mutationFn: async (datas: MentoringPostCommentRequest) => {
      return await instance.post(`/job/talk`, datas);
    },
    onSuccess: async (res) => {
      console.log('성공', res);
      return res.data;
    },
    onError: (error) => console.log('error', error),
  });
};