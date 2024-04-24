import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CartContext } from "./CartContext";
import axios from "axios";
import Image from "next/image";

const SinglePage = ({ product }) => {
  const [allImg, setAllImg] = useState(product.images);
  const [activeImages, setActiveImages] = useState(product.images[0]);
  const { addProduct } = useContext(CartContext);
  const [parameter, setParameter] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (url.includes("/product/")) {
      const productId = url.split("/product/"[1]);
      axios.get(`/api/category?_id=${productId}`).then((response) => {
        setParameter(response.data);
      });
    }
  }, [url]);

  return (
    <>
      <div className="mt-16 flex w-full justify-around shadow-2xl border-2 border-blue-400/95 rounded-2xl max-md:flex-col max-md:w-auto">
        <div className="p-10">
          <div className="flex justify-center">
            <Image
              src={activeImages}
              alt="kep"
              className="h-44"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
          <div className="flex gap-10 mt-6 max-sm:flex-col max-sm:justify-center max-sm:items-center">
            {allImg.map((image, index) => (
              <button key={index} onMouseEnter={() => setActiveImages(image)}>
                <Image
                  src={image}
                  alt="kep"
                  loading="lazy"
                  width={70}
                  height={70}
                  className="h-20 hover:border-2 transition-transform border-blue-400/95 p-2 rounded-sm"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="p-10 flex flex-col justify-between text-right m-2 max-md:p-4 max-md:text-center max-md:gap-4">
          <div>
            <h1 className="title">{product.title}</h1>
            <p className="text-2xl font-bold text-red-500">{product.price}Ft</p>
            <p className="text-xl">
              <span className="font-semibold">{product.amount}</span> darab van
              raktáron
            </p>
          </div>
          <div>
            <Button
              variant="default"
              className="w-full text-lg gap-2 max-md:w-auto max-md:p-6 max-md:rounded-xl"
              onClick={() => addProduct(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              Kosárba
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 shadow-2xl border-2 border-blue-400/95 rounded-2xl p-10 w-full">
        <h2 className="title">Leírás:</h2>
        <p className="mt-2 text-lg font-mono justify-evenly">
          {product.description}
        </p>
      </div>
    </>
  );
};

export default SinglePage;
