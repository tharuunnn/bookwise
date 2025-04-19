import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <section className="w-full rounded-3xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            {" "}
            Create a new book
          </Link>
        </Button>{" "}
        {/* asChild means render whatever is inside like the parent, so the link acts like a button */}
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p>table</p>
      </div>
    </section>
  );
};

export default page;
