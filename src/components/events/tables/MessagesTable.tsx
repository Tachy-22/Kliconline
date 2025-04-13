"use client";

import { useOptimistic, startTransition } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import { Checkbox } from "../../ui/checkbox";
import { updateDocument } from "@/actions/updateDocument";
import { useToast } from "@/hooks/use-toast";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../../TableControls";
import { PreviewModal } from "../../modals/PreviewModal";

const MessagesTable = ({
  messages: initialMessages,
}: {
  messages: ContactMessage[];
}) => {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    initialMessages,
    (state: ContactMessage[], newMessage: ContactMessage) =>
      state.map((msg) => (msg.id === newMessage.id ? newMessage : msg))
  );
  const { toast } = useToast();
  const success =
    Array.isArray(optimisticMessages) || "items" in optimisticMessages;
  const error = !success ? "Failed to load messages" : null;
  const loading = !success && !error;
  const slideIn = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const {
    paginatedData: displayedMessages,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: optimisticMessages,
    searchFields: ["fullName", "email", "message", "query"],
    itemsPerPage: 10,
  });

  const handleReplyToggle = async (id: string, currentStatus: boolean) => {
    startTransition(() => {
      addOptimisticMessage({
        ...optimisticMessages.find((msg) => msg.id === id)!,
        replied: !currentStatus,
      });
    });

    const result = await updateDocument(
      "contact-messages",
      id,
      { replied: !currentStatus },
      window.location.pathname
    );

    if ("code" in result) {
      // The useOptimistic hook will automatically revert on error
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update message status",
      });
    } else {
      toast({
        title: "Success",
        description: `Message marked as ${
          !currentStatus ? "replied" : "pending"
        }`,
      });
    }
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
          <CardTitle className="text-black">Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showStatusFilter
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <Table>
            <TableHeader>
              <TableRow className="border-black/20">
                <TableHead className="text-black font-bold">Name</TableHead>
                <TableHead className="text-black font-bold">Email</TableHead>
                <TableHead className="text-black font-bold">Query</TableHead>
                <TableHead className="text-black font-bold">Message</TableHead>
                <TableHead className="text-black font-bold">Date</TableHead>
                <TableHead className="text-black font-bold">Status</TableHead>
                <TableHead className="text-black font-bold">
                  Mark as Replied
                </TableHead>
                <TableHead className="text-black font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedMessages.length === 0 ? (
                <TableRow className="border-black/20">
                  <TableCell colSpan={5} className="text-center text-black">
                    No messages found
                  </TableCell>
                </TableRow>
              ) : (
                displayedMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{message.fullName}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.query}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {message.message}
                    </TableCell>
                    <TableCell>
                      {formatToMonthDayYear(message.submissionDate)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          message.replied
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {message.replied ? "Replied" : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={message.replied}
                        onCheckedChange={() =>
                          handleReplyToggle(message.id, message.replied)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <PreviewModal
                          content={message.message}
                          author={message.fullName}
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

export default MessagesTable;
