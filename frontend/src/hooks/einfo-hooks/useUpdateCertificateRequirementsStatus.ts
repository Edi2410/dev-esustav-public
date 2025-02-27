import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { ActivityListType, CertificateRequirementsType } from "types";

export const useUpdateCertificateRequirementsStatus = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateCertificateRequirementsStatus = async (StatusData: any) => {
    try {
      const response = await axios.patch(
        `einfo/admin/${StatusData.id}/`,
        StatusData
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom uređenja aktivnosti");
    }
  };

  return useMutation(updateCertificateRequirementsStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data"],
      });
      message.success("Success");
    },
  });
};
