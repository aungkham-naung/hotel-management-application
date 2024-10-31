import styled from "styled-components";
import { useRecentBookings } from "../../hooks/useRecentBookings";
import { useRecentStays } from "../../hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
import Stat from "./Stat";
import Stats from "./Stats";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    isLoading: isLoadingCabins,
    data: cabins,
    error,
  } = useQuery({
    //query name
    queryKey: ["cabins"],

    //query function to fetch data
    queryFn: getCabins, //getCabin is from apiCabins.js
  });
  const { bookings, isLoading: isLoadingRecentBooking } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    numDays,
    isLoading: isLoadingConfirmedStays,
  } = useRecentStays();

  if (isLoadingConfirmedStays && isLoadingRecentBooking && isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
