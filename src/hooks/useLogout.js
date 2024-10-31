import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../services/apiAuth";
import { replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries(); //removing all loaded data ub cache
      toast.success("You've been logout successfully");
      navigate("/login", { replace: true }); //replace true makes sure to prevent navigation to previous page and previous route is not saved in history
    },
  });

  return { logout, isLoading };
}
