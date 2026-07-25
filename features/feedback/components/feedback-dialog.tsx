"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Star, Loader2 } from "lucide-react";
import { FeedbackCategory } from "../models/feedback.interface";
import { submitFeedback } from "../actions/submit-feedback";
import { toast } from "sonner";

interface FeedbackDialogProps {
  children?: React.ReactNode;
  triggerVariant?: "default" | "outline" | "ghost" | "secondary";
  triggerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FeedbackDialog({
  children,
  triggerVariant = "outline",
  triggerClassName = "",
  open: customOpen,
  onOpenChange: customOnOpenChange,
}: FeedbackDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = customOpen !== undefined;
  const open = isControlled ? customOpen : internalOpen;
  const setOpen = isControlled ? (customOnOpenChange ?? (() => {})) : setInternalOpen;

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<FeedbackCategory>(FeedbackCategory.GENERAL);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = () => {
    setMessage("");
    setRating(0);
    setCategory(FeedbackCategory.GENERAL);
    setHoverRating(0);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a feedback message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitFeedback({
        rating,
        category,
        message: message.trim(),
      });

      if (res.success) {
        toast.success(res.message || "Thank you for your feedback!");
        resetForm();
        setOpen(false);
      } else {
        toast.error(res.error || "Failed to submit feedback.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger
          render={
            (children as React.ReactElement) || (
              <Button
                variant={triggerVariant}
                size="sm"
                className={`gap-2 cursor-pointer ${triggerClassName}`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Feedback</span>
              </Button>
            )
          }
        />
      )}

      <DialogContent className="sm:max-w-[480px] p-6 sm:p-8">
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <MessageSquare className="h-5 w-5" />
            Share Feedback
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            We'd love to hear your thoughts, feature requests, or bug reports to improve Quillo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
          {/* Star Rating */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium leading-normal">
              How would you rate your experience? <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeStar = currentDisplayRating > 0 && star <= currentDisplayRating;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-6 w-6 transition-colors ${
                        activeStar
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30 hover:text-primary/60"
                      }`}
                    />
                  </button>
                );
              })}
              <span className="ml-2 text-xs font-medium text-muted-foreground">
                {currentDisplayRating > 0 ? `${currentDisplayRating}/5` : "Tap to rate"}
              </span>
            </div>
          </div>

          {/* Feedback Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="feedback-category" className="text-sm font-medium leading-normal">
              Feedback Category
            </Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as FeedbackCategory)}
            >
              <SelectTrigger id="feedback-category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={FeedbackCategory.GENERAL}>General Feedback</SelectItem>
                <SelectItem value={FeedbackCategory.FEATURE}>Feature Request</SelectItem>
                <SelectItem value={FeedbackCategory.BUG}>Bug Report</SelectItem>
                <SelectItem value={FeedbackCategory.CONTENT_QUALITY}>Content Quality</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Feedback Message */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="feedback-message" className="text-sm font-medium leading-normal">
              Your Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="feedback-message"
              placeholder="Tell us what's working well or what we can improve..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={2000}
              className="min-h-[110px] resize-y text-sm leading-relaxed p-3"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="px-5 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 px-6 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
