"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../../TableControls";

export const NewsletterTable = ({
  subscribers,
}: {
  subscribers: SubscriberT[];
}) => {
  const {
    paginatedData: displayedSubscribers,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: subscribers,
    searchFields: ["email", "name"],
    itemsPerPage: 10,
  });

  return (
    <Card className="min-w-full mx-auto bg-white text-black border border-black/20">
      <CardHeader>
        <CardTitle className="text-black">Subscribers List</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <Table>
          <TableHeader>
            <TableRow className="border-black/20">
              <TableHead className="text-black font-bold">Email</TableHead>
              <TableHead className="text-black font-bold">Status</TableHead>
              <TableHead className="text-black font-bold">
                Subscribed Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id} className="border-black/20">
                <TableCell className="font-medium">
                  {subscriber.email}
                </TableCell>
                <TableCell>{subscriber.status}</TableCell>
                <TableCell>
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
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
  );
};
