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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { EditModal } from "../modals/EditModal";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import AddSermonForm from "../forms/AddSermonForm";

const SermonsTable = ({ sermons }: { sermons: SermonT[] }) => {
  const success = Array.isArray(sermons);
  const error = !success ? "Failed to load sermons" : null;
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
      <Card className="min-w-full mx-auto !bg-white border-0">
        <CardHeader>
          <CardTitle>All Sermons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Preacher</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sermons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No sermons found
                  </TableCell>
                </TableRow>
              ) : (
                sermons.map((sermon) => (
                  <TableRow key={sermon.id}>
                    <TableCell>
                      {sermon.thumbnailUrl ? (
                        <img
                          src={sermon.thumbnailUrl}
                          alt={sermon.title}
                          className="w-10 h-10 rounded object-cover bg-gray-500"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {sermon.title}
                    </TableCell>
                    <TableCell>{sermon.preacher}</TableCell>
                    <TableCell>
                      {sermon.date instanceof Date
                        ? sermon.date.toLocaleDateString()
                        : new Date(
                            sermon.date.seconds * 1000
                          ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{sermon.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal>
                          <AddSermonForm update sermon={sermon} />
                        </EditModal>
                        <DeleteConfirmationModal
                          id={sermon?.id as string}
                          collection="sermons"
                          name="sermon"
                        />
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

export default SermonsTable;
