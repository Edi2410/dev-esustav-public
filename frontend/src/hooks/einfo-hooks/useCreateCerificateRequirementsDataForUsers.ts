import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useCreateCerificateRequirementsDataForUsers = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const createCerificateRequirementsDataForUsers = async () => {
    try {
      const response = await axios.post(
        `einfo/admin/create-new-empty-requirements/`
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška kod kreiranja podataka");
    }
  };

  return useMutation(createCerificateRequirementsDataForUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data"],
      });
      message.success("Kreiranje je uspiješno");
    },
    onError: (error) => {
      message.error(String(error));
    },
  });
};
