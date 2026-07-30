"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

interface GenerationErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
  onRetry?: () => void;
}

export function GenerationErrorModal({
  isOpen,
  onClose,
  errorMessage,
  onRetry,
}: GenerationErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-6">
        <DialogHeader className="space-y-3">
          <div className="mx-auto sm:mx-0 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircleIcon className="size-6" />
          </div>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Generation Failed
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {errorMessage || "Something went wrong while generating your content. Please try again."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Close
          </Button>
          {onRetry && (
            <Button
              onClick={() => {
                onClose();
                onRetry();
              }}
              type="button"
            >
              Try Again
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
