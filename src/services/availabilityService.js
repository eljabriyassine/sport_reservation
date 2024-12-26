// /services/availabilityService.js
const timeSlots = ["9:00 AM", "10:00 AM"];
const reservations = [
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

// Utility to check if a day is fully reserved for a particular sport and stadium
const isDayFullyReserved = (date, stadium, sport) => {
  const reservedSlotsForDay = reservations.filter(
    (reservation) =>
      reservation.date === date &&
      reservation.stadium === stadium &&
      reservation.sport === sport
  );
  return reservedSlotsForDay.length >= timeSlots.length;
};

// Function to get available slots
const getAvailableSlots = (date, stadium, sport) => {
  return timeSlots.filter(
    (time) =>
      !reservations.some(
        (reservation) =>
          reservation.date === date &&
          reservation.time === time &&
          reservation.stadium === stadium &&
          reservation.sport === sport
      )
  );
};

module.exports = {
  getAvailableSlots,
  isDayFullyReserved,
};
