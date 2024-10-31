import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  //React Query tool to "mutate" => edit/delete
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id), //calling function to delete cabin

    //resetting the cache to immediately update ui
    onSuccess: () => {
      toast.success("Booking successfully deleted!");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteBooking };
}
