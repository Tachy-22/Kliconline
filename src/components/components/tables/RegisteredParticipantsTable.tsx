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
} from "@/components/components/ui/table";
import { Button } from "@/components/components/ui/button";
import { Skeleton } from "@/components/components/ui/skeleton";

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
        <h2 className="text-xl text-black font-bold">
          Registered Participants
        </h2>
        <Button
          onClick={exportToExcel}
          variant="outline"
          className="bg-black text-white hover:bg-black/90"
          disabled={participants.length === 0}
        >
          Export to Excel
        </Button>
      </div>

      <div className="rounded-md border border-black/20 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-black/20">
              <TableHead className="text-black font-bold">Name</TableHead>
              <TableHead className="text-black font-bold">Email</TableHead>
              <TableHead className="text-black font-bold">Phone</TableHead>
              <TableHead className="text-black font-bold">
                Registration Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.length === 0 ? (
              <TableRow className="border-black/20">
                <TableCell colSpan={4} className="text-center text-black">
                  No participants found.
                </TableCell>
              </TableRow>
            ) : (
              participants.map((participant) => (
                <TableRow key={participant.id} className="border-black/20">
                  <TableCell className="text-black">
                    {participant.data.name}
                  </TableCell>
                  <TableCell className="text-black">
                    {participant.data.email}
                  </TableCell>
                  <TableCell className="text-black">
                    {participant.data.phone}
                  </TableCell>
                  <TableCell className="text-black">
                    {participant.data.registrationDate?.toString()}
                  </TableCell>
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
