import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  coverColor,
  coverUrl,
  summary,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not availble"
        : "You are not eligible to borrow the book",
  };
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            by <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p className="text-light-200">{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span className="text-light-200">{totalCopies}</span>
          </p>
          <p>
            Available Books:{" "}
            <span className="text-light-200">{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{summary}</p>
        {user?.status === "APPROVED" && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="realtive">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opcaity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
