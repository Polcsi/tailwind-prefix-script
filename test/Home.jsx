import React from "react";

const Home = () => {
  return (
    <main>
      <h1>ts-Home</h1>
      <section className="Home h-[46px] w-[46px] rounded-full bg-gray-200 dark:bg-gray-700 focus:invalid:ring-pink-500">
        <p className="h-[2px] bg-[#F3EAEA] after:content-['*'] after:ml-0.5 after:text-red-500">
          Home page content
        </p>
        <button
          type="button"
          class="rounded-full p-2 text-2xl text-main md:text-3xl -inset-1 -skew-y-3"
        >
          Button
        </button>
      </section>
    </main>
  );
};

export default Home;
