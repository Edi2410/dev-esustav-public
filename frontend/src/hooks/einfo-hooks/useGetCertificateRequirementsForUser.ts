import { useAxios } from "hooks/useAxios";
import { message } from "antd";
import { useQuery } from "react-query";

export const useGetCertificateRequirementsForUser = (
  id: number | undefined
) => {
  const axios = useAxios();

  const fetchCertificateRequirementsDataForUser = async () => {
    try {
      const { data } = await axios.get(`einfo/admin/${id}`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka o kandidatima");
    }
  };

  return useQuery(
    ["certificate_requirements_data_for_user", id],
    fetchCertificateRequirementsDataForUser,
    {
      onError: (error) => message.error(String(error)),
      enabled: id ? true : false,
      staleTime: Infinity,
    }
  );
};
