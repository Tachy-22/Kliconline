"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { EditModal } from "../modals/EditModal";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import BranchesForm from "../forms/BranchesForm";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../TableControls";

const BranchesTable = ({ branches }: { branches: BranchT[] }) => {
  const {
    paginatedData: displayedBranches,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: branches,
    searchFields: ["name", "address"],
    itemsPerPage: 10,
  });

  const success = Array.isArray(branches) || "items" in branches;
  const error = !success ? "Failed to load branches" : null;
  const loading = !success && !error;

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
    <motion.div {...slideIn}>
      <Card className="min-w-full mx-auto bg-white text-black border border-black/20">
        <CardHeader>
          <CardTitle className="text-black">All Branches</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <Table>
            <TableHeader>
              <TableRow className="border-black/20">
                <TableHead className="text-black font-bold">Name</TableHead>
                <TableHead className="text-black font-bold">Address</TableHead>
                <TableHead className="text-black font-bold">Latitude</TableHead>
                <TableHead className="text-black font-bold">
                  Longitude
                </TableHead>
                <TableHead className="text-black font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedBranches.length === 0 ? (
                <TableRow className="border-black/20">
                  <TableCell colSpan={5} className="text-center text-black">
                    No branches found
                  </TableCell>
                </TableRow>
              ) : (
                displayedBranches.map((branch) => (
                  <TableRow
                    key={branch.id}
                    className="border-black/20 hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>{branch.latitude}</TableCell>
                    <TableCell>{branch.longitude}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal title="Edit Branch">
                          <BranchesForm update branch={branch} />
                        </EditModal>
                        <DeleteConfirmationModal
                          id={branch.id}
                          collection="branches"
                          name="branch"
                        />
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

export default BranchesTable;
