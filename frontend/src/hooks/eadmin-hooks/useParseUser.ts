import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useParseUser = () => {
  const axios = useAxios();
 
  const addUsers = async (CSVfile: FormData) => {
    try {
      const response = await axios.post("estudenti/users/parse/", CSVfile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };
  return useMutation(addUsers, {
    onSuccess: () => {
      message.info("Pogledaj consolu da vidiš jeli sve prošlo kako treba!!!!");
    },
  });
};
