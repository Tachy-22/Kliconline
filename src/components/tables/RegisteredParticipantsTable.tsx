"use client";
import React from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  //  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  eventId: string;
  participants: { id: string; data: ParticipantT }[];
  isLoading?: boolean;
}

const RegisteredParticipantsTable = ({
  eventId,
  participants,
  isLoading,
}: Props) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      participants.map((p) => ({
        Name: p.data.name,
        Email: p.data.email,
        Phone: p.data.phone,
        "Registration Date": p.data.registrationDate,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    XLSX.writeFile(workbook, `${eventId}-participants-list.xlsx`);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between mb-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {[...Array(4)].map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(4)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl">Registered Participants</h2>
        <Button
          onClick={exportToExcel}
          variant="default"
          className="bg-green-500 text-white rounded hover:bg-green-500/80"
          disabled={participants.length === 0}
        >
          Export to Excel
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          {/* <TableCaption>
            {participants.length === 0 
              ? "No participants registered yet." 
              : `A list of ${participants.length} registered participants.`}
          </TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Registration Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  No participants found.
                </TableCell>
              </TableRow>
            ) : (
              participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.data.name}</TableCell>
                  <TableCell>{participant.data.email}</TableCell>
                  <TableCell>{participant.data.phone}</TableCell>
                  <TableCell>{participant.data.registrationDate?.toString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RegisteredParticipantsTable;
