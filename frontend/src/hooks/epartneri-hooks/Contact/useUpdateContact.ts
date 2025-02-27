import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { PartnerDataType, PartnersContactCreateType } from "types";

export const useUpdateContact = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateContact = async (partnerContact: PartnersContactCreateType) => {
    try {
      const response = await axios.patch(
        `epartneri/partners-contacts/${partnerContact.id}/`,
        partnerContact
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom uređenja kontakta");
    }
  };

  return useMutation(updateContact, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_info_data"] });
      message.success("Kontakt je uspješno uređena");
    },
  });
};
