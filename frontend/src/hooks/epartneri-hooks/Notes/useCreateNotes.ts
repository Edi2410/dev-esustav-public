import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { PartnerNotesCreateType } from "types";

export const useCreateNotes = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createNotes = async (partnerNote: PartnerNotesCreateType) => {
    try {
      const response = await axios.post(
        "epartneri/partners-notes/",
        partnerNote
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom unosa bilješke");
    }
  };

  return useMutation(createNotes, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_info_data"] });
      queryClient.invalidateQueries({ queryKey: ["partners_list_data"] });
      message.success("bilješka je uspješno unesena");
    },
  });
};
