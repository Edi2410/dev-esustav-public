import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import {
  PartnerDataType,
  PartnerNotesCreateType,
  PartnersContactCreateType,
} from "types";

export const useUpdateNotes = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateNote = async (partnerNote: PartnerNotesCreateType) => {
    try {
      const response = await axios.patch(
        `epartneri/partners-notes/${partnerNote.id}/`,
        partnerNote
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom uređenja bilješke");
    }
  };

  return useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_info_data"] });
      queryClient.invalidateQueries({ queryKey: ["partners_list_data"] });
      message.success("Bilješka je uspješno uređena");
    },
  });
};
