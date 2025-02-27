import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useGreadeUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const greadeUser = async (Grade: any) => {
    try {
      const response = await axios.post("suprach/grades/", Grade);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom ocjenjivanja osobe");
    }
  };

  return useMutation(greadeUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_to_grade"] });
      queryClient.invalidateQueries({
        queryKey: ["special_user_to_grade_suprach"],
      });
      message.success("Osoba je ocijenjena");
    },
  });
};
