"use client";
import { borrowBook } from "@/lib/actions/book";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface Props{
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  }
}

const BorrowBook = ({bookId,userId,borrowingEligibility: {isEligible, message}}: Props) => {

  const router =  useRouter();
  const [borrowing, setBorrowing]  =  useState(false);

  const handleBorrow = async() => {
    if(!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
  };

  setBorrowing(true);

  try{
    const result = await borrowBook({bookId, userId});

    if(result.success){
      toast({
        title: "Success",
        description: "book borrowed successfully",
      })
      router.push(
        "/my-profile"
      )
    }else{
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
        
      })
    }

  }catch(error){
    toast({
      title: "Error",
        description: "An error occured while borrowing the book",
        variant: "destructive",
    });
  }finally{
    setBorrowing(false);
  }
}

  return (
    <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
    <Image src="/icons/book.svg" alt="book" width={20} height={20} />
    <p className="font-bebas-neue text-xl text-dark-100">{borrowing ? "Borrowing..." : "Borrow Book"}</p>
  </Button>
  )

}

export default BorrowBook;