import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { PartnersContactCreateType } from "types";

export const useCreateContact = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createContact = async (partnerContact: PartnersContactCreateType) => {
    try {
      const response = await axios.post(
        "epartneri/partners-contacts/",
        partnerContact
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom unosa kontakta");
    }
  };

  return useMutation(createContact, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_info_data"] });
      message.success("Kontakt je uspješno unesena");
    },
  });
};
