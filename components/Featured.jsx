import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function Featured({ featuedProduct }) {
  const router = useRouter();
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(featuedProduct._id);
  }

  function goToSingle() {
    router.push("/product/" + featuedProduct._id);
  }

  return (
    <div className="p-4 text-black font-semibold mt-16 max-md:shadow-md max-md:border-2 max-md:rounded-lg max-md:m-4 max-md:mt-16">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-10">
        <div className="flex flex-col justify-right">
          <div>
            <h1 className="font-satoshi font-semibold text-6xl text-left mx-0 my-5 max-lg:text-center max-lg:text-4xl max-sm:text-2xl">
              {featuedProduct.title}
            </h1>
            <p className="text-s max-md:truncate text-black/55 max-lg:mx-6">
              {featuedProduct.description}
            </p>
          </div>
          <div className="mt-6">
            <div className="max-md:flex max-md:justify-center max-lg:justify-center flex items-center">
              <Button variant="link" onClick={goToSingle}>
                Read more
              </Button>
              <Button variant="default" onClick={addFeaturedToCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                <span className="">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-right items-center max-md:justify-center max-lg:justify-center">
          <img
            src={featuedProduct.images}
            alt="Processzor"
            className="rounded-3xl max-h-96 ml-20 max-xl:max-h-72 max-lg:max-h-52 max-sm:max-h-32"
          />
        </div>
      </div>
    </div>
  );
}