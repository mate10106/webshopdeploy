import ProductsGrid from "./ProductsGrid";

const NewProduct = ({ products }) => {
  return (
    <>
      <h1 className="font-semibold text-2xl font-mono max-md:text-center">
        Új termékek
      </h1>
      <ProductsGrid products={products} />
    </>
  );
};

export default NewProduct;
