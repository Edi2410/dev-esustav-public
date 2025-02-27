import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetDocuments = () => {
  const axios = useAxios();

  const getDocuments = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/documents/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka o pravilnicima");
    }
  };

  return useQuery(["election_documents_data"], getDocuments, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
