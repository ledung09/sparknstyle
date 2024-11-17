"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import axios from "axios";

export default function TrashDialog({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"} className="h-8 w-8">
          <Trash size={16} strokeWidth={2.5} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the product from the database.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={() => {
              setLoading(true);
              axios
                .delete(
                  `${process.env.NEXT_PUBLIC_API_HOST_NAME}/product/${id}`
                )
                .then((response) => {
                  setLoading(false);
                  window.history.go(0);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            {loading && <Loader2 className="animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
