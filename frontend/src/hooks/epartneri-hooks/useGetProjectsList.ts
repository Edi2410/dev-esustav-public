import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetProjectsList = () => {
  const axios = useAxios();

  const getProjectsList = async () => {
    try {
      const { data } = await axios.get(`epartneri/projects/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja projekata");
    }
  };

  return useQuery(["projects_list_data"], getProjectsList, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
