import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function NeedHelpSection() {
  const data = [
    {
      id: 1,
      question: "How do I know if the glasses will fit me?",
      answer:
        "Each product page provides virtual try-on features to help you find the perfect fit.",
    },
    {
      id: 2,
      question: "What brands do you supply?",
      answer: "We supply top brands like Ray-Ban, Oakley, Gucci, and Prada.",
    },
    {
      id: 3,
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption to ensure your payment details are safe and secure.",
    },
    {
      id: 4,
      question: "How long will it take to receive my order?",
      answer:
        "Orders are typically processed within 3 - 4 business days, with delivery times depending on your location and shipping method selected.",
    },
  ];
  return (
    <div className="container max-w-screen-lg py-10 flex gap-52">
      <div className="flex flex-col gap-6 mt-1.5">
        <p className="text-3xl font-medium">Need help?</p>
        <Button size={"sm"}>Contact Support</Button>
      </div>
      <div className="flex-1">
        <Accordion type="multiple">
          {data.map((item) => {
            return (
              <AccordionItem value={item.id.toString()} key={item.id}>
                <AccordionTrigger className="">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
