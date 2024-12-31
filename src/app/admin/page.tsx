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
    fetch("api/get_reservations")
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
    fetch("api/data")
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
      }
      setShowDeleteConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setReservationToDelete(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Filters */}
      <div className="flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>
        <div className="flex space-x-4 justify-end">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="sportFilter"
              className="text-sm font-medium text-gray-600"
            >
              Sport:
            </label>
            <select
              id="sportFilter"
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All</option>
              {getUniqueSports(stadiums).map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 justify-end">
            <label
              htmlFor="dateFilter"
              className="text-sm font-medium text-gray-600"
            >
              Date:
            </label>
            <input
              id="dateFilter"
              type="date"
              typeof="mutliple"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 bg-[#EFEFEF] rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
      )}

      {/* Reservations Table */}
      {!loading && filteredReservations.length > 0 ? (
        <>
          <Table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border-separate">
            <TableHeader>
              <TableRow>
                <TableCell>Sport</TableCell>
                <TableCell>Stadium</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <motion.tr
                  key={reservation._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-100 transition-colors duration-300 border-b border-gray-300"
                >
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                      {reservation.sport}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                      {reservation.stadium}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {new Date(reservation.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                      {reservation.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-indigo-500" />
                      {reservation.firstName} {reservation.lastName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                      {reservation.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-indigo-500" />
                      {reservation.telephone}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDelete(reservation)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        !loading && (
          <div className="text-center text-gray-600 text-3xl mt-10 py-4">
            No reservations found
          </div>
        )
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirmation && reservationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white-500 bg-opacity-50">
          <div className="bg-white-500 p-6 rounded-lg shadow-lg max-w-xs w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete the reservation for{" "}
              {reservationToDelete.firstName} {reservationToDelete.lastName}?
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
