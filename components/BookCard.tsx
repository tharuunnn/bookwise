import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BookCover from "./BookCover";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => {
  console.log("props:", { coverColor, coverUrl });
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href="#"
        /*{`/books/${id}`} */ className={cn(
          isLoanedBook && "w-full flex flex-col items-center"
        )}
      >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />

        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full flex flex-col">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calender"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return!</p>
            </div>

            <Button className="book-btn"> Download reciept</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
