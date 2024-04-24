import { CartContext } from "@components/CartContext";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const cart = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [door, setDoor] = useState("");
  const [postal, setPostal] = useState("");
  const [alert, setAlert] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function goBack() {
    router.push("/");
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment(event) {
    event.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      !city ||
      !address ||
      !floor ||
      !door ||
      !postal
    ) {
      setAlert("Töltse ki a mezőket!");
      return;
    }
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
      city,
      address,
      floor,
      door,
      postal,
      cartProducts,
      userId: session?.user.id,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-20 grid grid-cols-3 max-md:grid-cols-1 max-md:space-y-6 md:space-x-6">
      {isSmallScreen ? (
        <div className="col-span-2 bg-white shadow-md border-2 rounded-lg p-8">
          {!cartProducts?.length && (
            <div>
              <p className="title">Üres a kosarad</p>
              <img src="/img/hippo-empty-cart.png" alt="kep" />
            </div>
          )}
          {products?.length > 0 && (
            <>
              <h2 className="title">Kosár</h2>
              <div>
                <div>
                  {products.map((l, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <h2 className="text-lg font-bold">{l.title}</h2>
                      <img src={l.images} alt="kep" className="size-16 my-2" />
                      <p className="text-red-900 font-semibold text-lg">
                        {cartProducts.filter((id) => id === l._id).length *
                          l.price}
                        Ft
                      </p>
                      <p className="font-semibold text-lg">
                        {cartProducts.filter((id) => id === l._id).length} db
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="border text-lg hover:bg-green-200 transition-all p-2 w-8"
                          onClick={() => moreOfThisProduct(l._id)}
                        >
                          +
                        </button>
                        <button
                          className="border text-lg font-semibold hover:bg-red-200 transition-all p-2 w-8"
                          onClick={() => lessOfThisProduct(l._id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between max-sm:flex-col max-sm:mt-4">
                <Button variant="outline" onClick={goBack}>
                  Vásárlás folytatása
                </Button>
                <p className="max-sm:mt-4 max-sm:text-center">
                  Vég összeg:{" "}
                  <span className="font-semibold text-lg">
                    {total.toLocaleString("hu-HU", {
                      style: "currency",
                      currency: "HUF",
                    })}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="col-span-2 bg-white shadow-md border-2 rounded-lg p-8">
          {!cartProducts?.length && (
            <div>
              <p className="title">Üres a kosarad</p>
              <img src="/img/hippo-empty-cart.png" alt="kep" />
            </div>
          )}
          {products?.length > 0 && (
            <>
              <h2 className="title max-sm:text-center">Kosár</h2>
              <div>
                <Table>
                  <TableCaption>A legutóbbi hozzáadott termékek</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Termék képe</TableHead>
                      <TableHead>Termék neve</TableHead>
                      <TableHead>Ár</TableHead>
                      <TableHead className="text-center">Darab</TableHead>
                    </TableRow>
                  </TableHeader>
                  {products.map((items, index) => (
                    <TableBody key={index}>
                      <TableRow>
                        <TableCell className="font-medium max-sm:size-5">
                          <img src={items.images} alt="kep" />
                        </TableCell>
                        <TableCell>{items.title}</TableCell>
                        <TableCell>
                          {cartProducts.filter((id) => id === items._id)
                            .length * items.price}
                          Ft
                        </TableCell>
                        <TableCell className="text-center">
                          {cartProducts.filter((id) => id === items._id).length}
                        </TableCell>
                        <TableCell className="text-right flex flex-col gap-1 max-sm:">
                          <button
                            className="border text-lg hover:bg-green-200  transition-all"
                            onClick={() => moreOfThisProduct(items._id)}
                          >
                            +
                          </button>
                          <button
                            className="border text-lg font-semibold hover:bg-red-200 transition-all"
                            onClick={() => lessOfThisProduct(items._id)}
                          >
                            -
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </div>
              <div className="flex justify-between mt-4 max-sm:flex-col max-sm:mt-4 max-lg:space-x-16">
                <Button variant="outline" onClick={goBack}>
                  Vásárlás folytatása
                </Button>
                <p className="max-sm:mt-4 max-sm:text-center">
                  Vég összeg:{" "}
                  <span className="font-semibold text-lg">
                    {total.toLocaleString("hu-HU", {
                      style: "currency",
                      currency: "HUF",
                    })}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {!!cartProducts?.length && (
        <div className="bg-white shadow-md border-2 rounded-lg p-8 w-full">
          <h2 className="title text-center max-sm:text-sm">
            Szállitási információk
          </h2>
          <Input
            type="text"
            className="mt-4 hover:border-orange-700"
            placeholder="Teljes neved"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            className="mt-4 hover:border-orange-700"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="number"
            className="mt-4 hover:border-orange-700"
            placeholder="Telefonszám-06301234567"
            value={phone}
            name="phone"
            onChange={(e) => {
              if (e.target.value.length <= 14) {
                setPhone(e.target.value);
              }
            }}
            min={0}
          />
          <Input
            type="text"
            className="mt-4 hover:border-orange-700"
            placeholder="Város"
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            type="text"
            className="mt-4 hover:border-orange-700"
            placeholder="Cím"
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            type="number"
            className="mt-4 hover:border-orange-700"
            placeholder="Irányitószám"
            value={postal}
            name="postal"
            onChange={(e) => {
              if (e.target.value.length <= 4) {
                setPostal(e.target.value);
              }
            }}
            min={4}
            max={4}
          />
          <div className="flex gap-1 mt-4 max-sm:flex-col">
            <Input
              type="number"
              placeholder="Emelet"
              value={floor}
              name="floor"
              onChange={(e) => setFloor(e.target.value)}
            />
            <Input
              type="number"
              className="max-sm:mt-2"
              placeholder="Ajtó"
              value={door}
              name="door"
              onChange={(e) => setDoor(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            className="w-full border text-lg mt-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:text-gray-50 max-sm:text-xs"
            onClick={goToPayment}
          >
            Fizetés
          </Button>
          <p className="float-right text-xs font-light italic mt-9 text-orange-700">
            *A sárga mezőket kötelező kitölteni!
          </p>
        </div>
      )}
      {alert && (
        <div
          className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={() => setAlert(!alert)}
        >
          <Alert className="p-16 cursor-pointer">
            <AlertTitle className="title text-center">Információ</AlertTitle>
            <AlertDescription className="text-center mb-4 text-lg font-serif">
              {alert}
            </AlertDescription>
            <AlertDescription className="text-center">
              <p className="text-red-800 italic text-sm">
                *A bejelentkezéshez kattintson a bejelentkezés menü fülre
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default cart;
