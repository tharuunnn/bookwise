const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-container justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Slow down there flash!
      </h1>
      <p className="text-center mt-3 max-w-xl text-light-400">
        You&apos;ve been sending way too many requests. Chill down for a bit and
        try again!
      </p>
    </main>
  );
};

export default page;
