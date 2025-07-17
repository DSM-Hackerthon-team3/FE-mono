import { useQuery } from "@tanstack/react-query";
import { instance } from "../axios";
import { MyPageResponse } from "./type";

const router = "/user"

export const useGetMyPage = () => {
  return useQuery({
    queryKey: ['getMyPage'],
    queryFn: async () => {
      const { data } = await instance.get<MyPageResponse>(`${router}/myPage`);
      return data;
    }
  })
};