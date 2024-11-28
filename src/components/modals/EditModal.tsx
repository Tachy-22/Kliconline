"use client";

import {
  AlertDialog,
  //  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
//import AddEventForm from "../forms/AddEventForm";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import React from "react";

interface EditModalProps {
  children: React.ReactElement;
}

export function EditModal({  children }: EditModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {" "}
        <Pencil className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl z-50  class rounded- bg-white">
        <AlertDialogHeader className="w-full !flex justify-between">
          <AlertDialogTitle className="w-full flex justify-between items-center">
            Edit Event
            <AlertDialogCancel
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-fit aspect-square rounded-full"
            >
              <X />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="max-h-[80vh] overflow-auto">
          <div className=" ">
            {React.cloneElement(children, { onClose: () => setIsOpen(false) })}
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
