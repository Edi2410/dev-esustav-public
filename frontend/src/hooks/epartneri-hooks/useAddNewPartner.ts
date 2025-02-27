import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { PartnerDataType } from "types";
export const useAddNewPartner = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addNewPartner = async (PartnerData: PartnerDataType) => {
    try {
      const response = await axios.post("epartneri/partners/", PartnerData);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom unosa partnera");
    }
  };

  return useMutation(addNewPartner, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_list_data"] });
      message.success("Partner je uspješno unesena");
    },
  });
};
