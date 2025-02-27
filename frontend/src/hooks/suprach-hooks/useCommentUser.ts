import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useCommentUser = () => {
  const axios = useAxios();

  const commentUser = async (commentUser: any) => {
    try {
      const response = await axios.post(
        "suprach/user-to-comment/",
        commentUser
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom komentiranja osobe");
    }
  };

  return useMutation(commentUser, {
    onError: (error) => console.log("error", error),
    onSuccess: () => {
      message.success("Komentar je predan!");
    },
  });
};
