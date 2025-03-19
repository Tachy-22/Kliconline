"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

const TestimonyCard = ({ testimony }: { testimony: TestimonyT }) => {
  return (
    <Card className="bg-white border border-black/20">
      <CardHeader>
        <h2 className="font-semibold ">
          {testimony.title || "My victory Report"}
        </h2>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 overflow-hidden text-wrap wrap">
          {testimony.content}
        </p>
      </CardContent>
      <CardFooter className="w-full text-end  justify-end flex flex-row items-start gap-4">
        {/* <Avatar>
          <AvatarImage src={testimony.image} />
          <AvatarFallback className="bg-gray-400">
            {testimony.author.charAt(0)} {testimony.author.charAt(1)}
          </AvatarFallback>
        </Avatar> */}
        <div className="">
          <h3 className="font-">{testimony.author}</h3>
          <p className="text-sm text-gray-500">
            {formatToMonthDayYear(testimony.date)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonyCard;
