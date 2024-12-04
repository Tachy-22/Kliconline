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
} from "@/components/ui/table";
//import { Badge } from "@/components/ui/badge"; // Add this import

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { EditModal } from "../modals/EditModal";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import AddEventForm from "../forms/AddEventForm";
import Link from "next/link";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
//import Image from "next/image";
//import { deleteDocument } from "@/actions/deleteDocument";

const EventsTable = ({ events }: { events: EventT[] }) => {
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
      <Card className="min-w-full mx-auto !bg-white border-0">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Images</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No events found
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id}>
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
                                className="w-10 h-10 rounded border-2 border-white bg-gray-200 object-cover"
                              />
                            ))}
                            {event.images.length > 2 && (
                              <div className="ml-2 h-fit p-1 rounded-full bg-slate-100 hover:bg-slate-200">
                                +{event.images.length - 2}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">
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
                          className="text-orange-500 hover:underline"
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventsTable;
