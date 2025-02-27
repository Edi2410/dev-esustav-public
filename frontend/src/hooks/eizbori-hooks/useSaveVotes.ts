import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useSaveVotes = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const saveVotes = async (votes: any) => {
    try {
      const response = await axios.post("eizbori/elections/votes/", votes);
      return response;
    } catch (error) {
      throw new Error("Greška prilikom glasanja");
    }
  };

  return useMutation(saveVotes, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["is_voted_data"] });
      message.success("Uspješno si glasao");
    },
  });
};
