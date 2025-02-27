import { useQuery } from "react-query";
import { useAxios } from "./useAxios";

export const useGetAllAcademicYear = () => {
  const axios = useAxios();

  const getAllAcademicYear = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("estudenti/academic-year/");
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke o akademskoj godini");
      }
    }
    return null;
  };

  return useQuery("academiy_year_data", getAllAcademicYear, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
