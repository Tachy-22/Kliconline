
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../TableControls";

interface NewsletterHistoryT {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientCount: number;
}

export const NewsletterHistoryTable = ({ newsletters }: { newsletters: NewsletterHistoryT[] }) => {
  const {
    paginatedData: displayedNewsletters,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: newsletters,
    searchFields: ['subject', 'content'],
    itemsPerPage: 10
  });

  return (
    <Card className="min-w-full mx-auto bg-white text-black border border-black/20">
      <CardHeader>
        <CardTitle className="text-black">Newsletter History</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchControls searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <Table>
          <TableHeader>
            <TableRow className="border-black/20">
              <TableHead className="text-black font-bold">Subject</TableHead>
              <TableHead className="text-black font-bold">Content Preview</TableHead>
              <TableHead className="text-black font-bold">Recipients</TableHead>
              <TableHead className="text-black font-bold">Sent Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedNewsletters.map((newsletter) => (
              <TableRow key={newsletter.id} className="border-black/20">
                <TableCell className="font-medium">{newsletter.subject}</TableCell>
                <TableCell>{newsletter.content.substring(0, 100)}...</TableCell>
                <TableCell>{newsletter.recipientCount}</TableCell>
                <TableCell>{new Date(newsletter.sentAt).toLocaleDateString()}</TableCell>
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