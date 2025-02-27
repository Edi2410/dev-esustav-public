import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { PartnerDataType } from "types";

export const useUpdatePartner = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updatePartner = async (PartnerData: PartnerDataType) => {
    try {
      const response = await axios.patch(
        `epartneri/partners/${PartnerData.id}/`,
        PartnerData
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom uređenja partnera");
    }
  };

  return useMutation(updatePartner, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners_list_data"] });
      message.success("Partner je uspješno uređen");
    },
  });
};
