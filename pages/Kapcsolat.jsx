import Link from "next/link";
import React from "react";

const kapcsolat = () => {
  return (
    <>
      <div className="mt-20 border-0 p-4 text-center">
        <p className="text-sm">Kérdésed lenne?</p>
        <h1 className="title">Mi segítünk neked!</h1>
      </div>
      <div className="flex w-full justify-evenly mt-10 max-md:flex-col max-md:items-center max-lg:gap-2">
        <div className="mt-1 border-2 p-8 w-64 text-center rounded-xl">
          <p className="text-center text-2xl mb-4">Név</p>
          <p className="font-thin">PcWeb</p>
        </div>
        <div className="mt-1 border-2 p-8 w-64 text-center rounded-xl">
          <p className="text-center text-2xl mb-4">Adószám</p>
          <p className="font-thin">*</p>
        </div>
        <div className="mt-1 border-2 p-8 w-64 text-center rounded-xl">
          <p className="text-center text-2xl mb-4">Székhely</p>
          <p className="font-thin">1184 Budapest, Hengersor utca 34.</p>
        </div>
        <div className="mt-1 border-2 p-8 w-64 text-center rounded-xl">
          <p className="text-center text-2xl mb-4">E-mail cím</p>
          <p className="font-thin">pcwebhun@gmail.com</p>
        </div>
      </div>
      <div className="flex p-8 gap-8 max-md:flex-col max-md:items-center max-lg:gap-2">
        <div>
          <Link href="https://mail.google.com/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-28 h-28"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </Link>
        </div>
        <div>
          <p className="font-thin max-md:text-center">
            Ha rendelkezik olyan használt termékkel, amelyet szívesen eladna
            vagy újrahasznosítana, ne habozzon kapcsolatba lépni velünk! Kérjük,
            küldjön egy részletes leírást és fotókat a termékről a következő
            e-mail címre:{" "}
            <span className="font-semibold">[pcwebhun@gmail.com]</span>.
            Ügyeljen arra, hogy pontos információkat adjon meg, hogy meg tudjuk
            vizsgálni az áru értékesíthetőségét. Várjuk jelentkezését, hogy
            közösen találjunk megoldást a régi termékek újrahasznosítására!
          </p>
        </div>
      </div>
    </>
  );
};

export default kapcsolat;
