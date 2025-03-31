import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";

const page = () => {
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

      <BookList title="Borrowed Books" books={sampleBooks}></BookList>
    </>
  );
};

export default page;
