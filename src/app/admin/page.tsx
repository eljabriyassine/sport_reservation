import ReservationsTable from "@/components/ReservationsTable";

export default async function AdminReservationsPage() {
  try {
    // Use correct URL for the API route
    const reservationResponse = await fetch(
      `${process.env.API_URL}/api/get_reservations`,
      {
        cache: "no-store",
      }
    );
    const reservations = await reservationResponse.json();

    const stadiumResponse = await fetch(`${process.env.API_URL}/api/data`, {
      cache: "no-store",
    });
    const stadiums = await stadiumResponse.json();

    return (
      <div>
        <ReservationsTable
          initialReservations={reservations}
          initialStadiums={stadiums.stadiums}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <p>Error loading reservations. Please try again later. </p>
        <div>{process.env.API_URL}feufheufhue</div>
        <p>wiat</p>
      </div>
    );
  }
}
