<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Mail,
  Phone,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type Reservation = {
  _id: string;
  date: string;
  time: string;
  stadium: string;
  sport: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: any;
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [sportFilter, setSportFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [reservationToDelete, setReservationToDelete] =
    useState<Reservation | null>(null);
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Start loading when fetching data
    fetch(`api/get_reservations?${new Date().getTime()}`)
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
        setFilteredReservations(data);
      })
      .catch((error) => console.error("Error fetching reservations:", error))
      .finally(() => setLoading(false)); // Stop loading when done
  }, []);

  useEffect(() => {
    setLoading(true); // Start loading when fetching stadium data
    fetch(`api/data?${new Date().getTime()}`)
      .then((response) => response.json())
      .then((data) => {
        setStadiums(data.stadiums);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false)); // Stop loading when done
  }, []);

  useEffect(() => {
    let filteredData = reservations;

    // Apply filters for sport and date
    if (sportFilter) {
      filteredData = filteredData.filter(
        (reservation) =>
          reservation.sport.toLowerCase() === sportFilter.toLowerCase()
      );
    }

    if (dateFilter) {
      filteredData = filteredData.filter(
        (reservation) =>
          new Date(reservation.date).toLocaleDateString() ===
          new Date(dateFilter).toLocaleDateString()
      );
    }

    setFilteredReservations(filteredData); // Set filtered list
  }, [sportFilter, dateFilter, reservations]);

  const handleDelete = (reservation: Reservation) => {
    console.log("Deleting reservation:", reservation._id);
    setReservationToDelete(reservation);
    setShowDeleteConfirmation(true);
  };

  function getUniqueSports(stadiums: any[]): string[] {
    return stadiums.reduce(
      (uniqueSports: string[], stadium: { sport: string }) => {
        if (!uniqueSports.includes(stadium.sport)) {
          uniqueSports.push(stadium.sport);
        }
        return uniqueSports;
      },
      []
    );
  }

  const confirmDelete = async () => {
    if (reservationToDelete) {
      try {
        const response = await fetch(
          `/api/delete_reservation/${reservationToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setReservations(
            reservations.filter((r) => r._id !== reservationToDelete._id)
          );
          setFilteredReservations(
            filteredReservations.filter(
              (r) => r._id !== reservationToDelete._id
            )
          );
        } else {
          console.error("Error deleting reservation");
        }
      } catch (error) {
        console.error("Error deleting reservation:", error);
=======
import ReservationsTable from "@/components/ReservationsTable";

export default async function AdminReservationsPage() {
  try {
    // Use correct URL for the API route
    const reservationResponse = await fetch(
      `${process.env.API_URL}/api/get_reservations`,
      {
        cache: "no-store",
>>>>>>> 69eb5fe40cba71d5a051f46aabc6533059878167
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
