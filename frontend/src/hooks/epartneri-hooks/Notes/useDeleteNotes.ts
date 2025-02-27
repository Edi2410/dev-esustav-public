import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteNotes = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteNotes = async (id: number) => {
    try {
      const response = await axios.delete(`epartneri/partners-notes/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom brisanja bilješke");
    }
  };

  return useMutation(deleteNotes, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_info_data"] });
      queryClient.invalidateQueries({ queryKey: ["partners_list_data"] });
      message.success("Bilješka je uspješno obrisan");
    },
  });
};
