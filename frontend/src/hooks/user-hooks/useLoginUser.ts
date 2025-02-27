import { useAxios } from "hooks/useAxios";
import { useQuery } from "react-query";

export const useLoginUser = (credential: String | undefined) => {
  const axios = useAxios();

  const loginUser = async () => {
    try {
      const { data } = await axios.get(`auth/?credential=${credential}`);
      sessionStorage.setItem("accessToken", data.accessToken);
      window.location.reload();
      return data;
    } catch (error) {
      throw new Error("Greška kod prijave korisnika");
    }
  };

  return useQuery(["login_user", credential], loginUser, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
    enabled: credential ? true : false,
  });
};
