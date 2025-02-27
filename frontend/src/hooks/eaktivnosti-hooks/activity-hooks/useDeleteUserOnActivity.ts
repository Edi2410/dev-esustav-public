import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteUserOnActivity = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteUserOnActivity = async (id: number) => {
    try {
      const response = await axios.delete(`eaktivnosti/user/activity/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom brisanja osobe");
    }
  };

  return useMutation(deleteUserOnActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_on_activity_data"] });
      message.success("Osoba je uspješno obrisana");
    },
  });
};
