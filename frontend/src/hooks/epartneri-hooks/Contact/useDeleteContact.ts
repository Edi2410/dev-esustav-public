import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";

export const useDeleteContact = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteContact = async (id: number) => {
    try {
      const response = await axios.delete(`epartneri/partners-contacts/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom brisanja kontakta");
    }
  };

  return useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_info_data"] });
      message.success("Kontakt je uspješno obrisan");
    },
  });
};
