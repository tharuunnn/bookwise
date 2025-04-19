import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const page =  async () => {
   const pfpbooks = await db.select().from(books).limit(5)
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
          // signOut comes in from auth again and here it automatically clears the session and logs you out
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={pfpbooks}></BookList>
    </>
  );
};

export default page;
