import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteActivity = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteActivity = async (id: number) => {
    try {
      const response = await axios.delete(`eaktivnosti/activity/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom brisanja aktivnosti");
    }
  };

  return useMutation(deleteActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity_data"] });
      message.success("Aktivnost je uspješno obrisana");
    },
  });
};
