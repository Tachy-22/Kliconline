"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EventRegisterationForm from "@/components/events/EventRegisterationForm";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventT;
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  event,
}: EventRegistrationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Register for {event.title}
          </DialogTitle>
        </DialogHeader>
        <EventRegisterationForm event={event} onComplete={onClose} />
      </DialogContent>
    </Dialog>
  );
}
