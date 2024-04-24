"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { CartContext } from "./CartContext";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    window.location.reload();
    window.location.href = "/";
  };
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  const { cartProducts } = useContext(CartContext);
  return (
    <nav className="flex justify-center items-center w-full bg-white p-3 fixed z-50 max-lg:justify-end">
      <div className="flex items-center mr-20 hover:text-orange-300 transition-all">
        <Link href="/" className="max-lg:hidden">
          <img src="/img/favicon.ico" alt="hipp" className="size-7" />
        </Link>
      </div>
      <div className="lg:flex lg:flex-none" hidden>
        {session?.user ? (
          <div className="flex gap-16 items-center">
            <Link href="/auctions" className="link">
              Aukció
            </Link>
            <Link href="/products" className="link">
              Összes termék
            </Link>
            <Link href="/cart" className="link">
              Kosár ({cartProducts.length})
            </Link>
            <Button type="button" onClick={handleSignOut} variant="destructive">
              Kijelentkezés
            </Button>
            <Link href="/Profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="proflie"
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  variant="outline"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="ml-2"
                >
                  Bejelentkezés
                </Button>
              ))}
          </div>
        )}
      </div>

      <div className="lg:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Főoldal
                </Link>
                <Link
                  href="/Profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profilom
                </Link>
                <Link
                  href="/cart"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Kosár
                </Link>
                <Link
                  href="/products"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Ősszes termék
                </Link>
                <Link
                  href="/auctions"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Aukció
                </Link>
                <Button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Kijelentkezés
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  variant="outline"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="ml-2"
                >
                  Bejelentkezés
                </Button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
