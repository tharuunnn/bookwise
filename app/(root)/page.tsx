import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <BookOverview/>
      <BookList/>
    </div>
  );
};

export default Home;
