import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetCertificateRequirementsList = () => {
  const axios = useAxios();

  const fetchCertificateRequirementsList = async () => {
    try {
      const { data } = await axios.get(`einfo/admin/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvačanja podataka");
    }
  };

  return useQuery(
    ["certificate_requirements_data"],
    fetchCertificateRequirementsList,
    {
      onError: (error) => message.error(String(error)),
      staleTime: Infinity,
    }
  );
};
