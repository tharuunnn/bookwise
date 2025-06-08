import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const page = async ({params}: {params: {id: string}}) => {
  const session = await auth();
  const id = (await params).id;

  //fetch data based on id
  const [bookDetails] =   await db.select().from
  (books).where(eq(books.id, id)).limit(1);

  if(!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          

          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;

// Flow of 'id':
// 1. Database Schema: Each book has a unique 'id' (UUID) defined in schema.ts
// 2. When clicking a book: BookCard uses this id in Link href="/books/{id}"
// 3. Dynamic Routing: [id] folder catches any URL like /books/123 and makes id available as params.id
// 4. Database Query: We use this id to fetch specific book using where(eq(books.id, id))