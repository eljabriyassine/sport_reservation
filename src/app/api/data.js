// app/api/data.js
export let reservations = [
  {
    date: "2024-12-26",
    time: "9:00 AM",
    stadium: "Terrain 1",
    sport: "Tennis",
    firstName: "John",
    lastName: "Doe",
    email: "yassine@gmail.com",
    telephone: "123456789",
  },
  {
    date: "2024-12-27",
    time: "9:00 AM",
    stadium: "Central Stadium",
    sport: "Football",
    firstName: "John",
    lastName: "Doe",
    email: "yassine@gmail.com",
    telephone: "123456789",
  },
];

export const timeSlots = ["9:00 AM", "10:00 AM"];

export const isDayFullyReserved = (date, stadium, sport) => {
  const reservedSlotsForDay = reservations.filter(
    (reservation) =>
      reservation.date === date &&
      reservation.stadium === stadium &&
      reservation.sport === sport
  );
  return reservedSlotsForDay.length >= timeSlots.length;
};
