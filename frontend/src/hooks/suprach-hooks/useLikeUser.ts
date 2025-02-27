import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { LikesType } from "types";
export const useLikeUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const likeUser = async (LikesData: LikesType) => {
    try {
      const response = await axios.post("suprach/likes/", LikesData);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom lajkanja osobe");
    }
  };

  return useMutation(likeUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_to_grade"] });
      message.success("Osoba je lajkana");
    },
  });
};
