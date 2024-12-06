"use client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

const TestimonyCard = ({ testimony }: { testimony: TestimonyT }) => {
  return (
    <Card className="bg-white border border-black/20">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={testimony.image} />
          <AvatarFallback className="bg-gray-400">
            {testimony.author.charAt(0)} {testimony.author.charAt(1)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{testimony.author}</h3>
          <p className="text-sm text-gray-500">
            {formatToMonthDayYear(testimony.date)}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 overflow-hidden text-wrap wrap">{testimony.content}</p>
      </CardContent>
    </Card>
  );
};

export default TestimonyCard;
