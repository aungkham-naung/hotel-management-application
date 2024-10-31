import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { getBookings } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

function BookingTable() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  //filtering
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //query
  const { isLoading, data } = useQuery(
    {
      //query name
      queryKey: ["bookings", filter, page], //whenever filter changes, data will be refetced -- sort of like dependency array

      //query function to fetch data
      queryFn: () => getBookings({ filter, page }), //getbookings is from apibookings.js
    }

    //pre-fetching
  );

  const bookings = data?.data || [];
  const count = data?.count || 0;

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page + 1], //whenever filter changes, data will be refetced -- sort of like dependency array

      //query function to fetch data
      queryFn: () => getBookings({ filter, page: page + 1 }), //getbookings is from apibookings.js
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page - 1], //whenever filter changes, data will be refetced -- sort of like dependency array

      //query function to fetch data
      queryFn: () => getBookings({ filter, page: page - 1 }), //getbookings is from apibookings.js
    });

  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
