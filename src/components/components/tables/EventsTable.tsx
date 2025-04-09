"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table";
//import { Badge } from "@/components/components/ui/badge"; // Add this import

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import { EditModal } from "../../modals/EditModal";
import { DeleteConfirmationModal } from "../../modals/DeleteConfirmationModal";
import AddEventForm from "../forms/AddEventForm";
import Link from "next/link";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
//import Image from "next/image";
//import { deleteDocument } from "@/actions/deleteDocument";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../../TableControls";

const EventsTable = ({ events }: { events: EventT[] }) => {
  const {
    paginatedData: displayedEvents,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: events,
    searchFields: ["title", "description", "location"],
    itemsPerPage: 10,
  });

  const success = Array.isArray(events) || "items" in events;
  const error = !success ? "Failed to load events" : null;
  const loading = !success && !error;

  // const [selectedEvent, setSelectedEvent] = useState<EventT | null>(null);

  const slideIn = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  if (error) {
    return (
      <motion.div {...slideIn}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div {...slideIn}>
        <Card className="min-w-full mx-auto !bg-white border-0">
          <CardContent className="flex justify-center p-4">
            Loading...
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={slideIn.initial}
      animate={slideIn.animate}
      transition={slideIn.transition}
    >
      <Card className="min-w-full mx-auto bg-white text-black border border-black/20">
        <CardHeader>
          <CardTitle className="text-black">All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <Table>
            <TableHeader>
              <TableRow className="border-black/20">
                <TableHead className="text-black font-bold">Images</TableHead>
                <TableHead className="text-black font-bold">Title</TableHead>
                <TableHead className="text-black font-bold">
                  Description
                </TableHead>
                <TableHead className="text-black font-bold">Date</TableHead>
                <TableHead className="text-black font-bold">Location</TableHead>
                <TableHead className="text-black font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedEvents.length === 0 ? (
                <TableRow className="border-black/20">
                  <TableCell colSpan={6} className="text-center text-black">
                    No events found
                  </TableCell>
                </TableRow>
              ) : (
                displayedEvents.map((event) => (
                  <TableRow
                    key={event.id}
                    className="border-black/20 hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        {event.images && event.images.length > 0 ? (
                          <div className="flex -space-x-4">
                            {event.images.slice(0, 2).map((image, index) => (
                              <img
                                width={40}
                                height={40}
                                key={index}
                                src={image as string}
                                alt={`Event ${image + 1}`}
                                className="w-10 h-10 rounded border-2 border-black bg-white object-cover"
                              />
                            ))}
                            {event.images.length > 2 && (
                              <div className="ml-2 h-fit p-1 rounded-full bg-white border border-black hover:bg-gray-100">
                                +{event.images.length - 2}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-600 text-sm">
                            No images
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{formatToMonthDayYear(event.date)}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal title="Edit Event">
                          <AddEventForm update event={event} />
                        </EditModal>
                        <DeleteConfirmationModal
                          id={event.id}
                          collection="events"
                          name="event"
                        />
                        <Link
                          href={`/admin/events/${event.id}`}
                          className="text-black hover:underline"
                        >
                          Participants
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventsTable;
