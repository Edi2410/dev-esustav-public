import { useAxios } from "hooks/useAxios";
import { message } from "antd";
import { useQuery } from "react-query";

export const useGetRequirementsStatusForVoditelj = (id: number | undefined) => {
  const axios = useAxios();

  const fetchRequirementsDataForVoditelj = async () => {
    try {
      const { data } = await axios.get(`einfo/voditelj/?id=${id}`);

      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka");
    }
  };

  return useQuery(
    ["certificate_requirements_data_for_voditelj", id],
    fetchRequirementsDataForVoditelj,
    {
      onError: (error) => message.error(String(error)),
      enabled: id ? true : false,
      staleTime: Infinity,
    }
  );
};
