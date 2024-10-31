import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: userSignUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success("Account has been successfully created.");
    },
  });
  return { userSignUp, isSigningUp };
}
