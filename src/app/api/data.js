// app/api/data.js
export let reservations = [];

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
