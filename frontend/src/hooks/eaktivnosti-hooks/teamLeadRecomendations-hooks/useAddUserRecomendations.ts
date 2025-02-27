import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { RecommendationsType } from "types";
import { message } from "antd";

export const useAddUserRecomendations = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addUserRecomendations = async (
    UserRecomendation: RecommendationsType
  ) => {
    try {
      const response = await axios.post(
        "eaktivnosti/recomendations/",
        UserRecomendation
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom dodavanja preporuke");
    }
  };

  return useMutation(addUserRecomendations, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_for_recomentation_data"],
      });
      message.success("Preporuka je uspiješno unesena");
    },
  });
};
