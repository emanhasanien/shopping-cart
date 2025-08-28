import { useState } from "react";
import { products } from "../product";
import { FaRegHeart } from "react-icons/fa6";
import { useCart } from "../context/cartContext";


const Home = () => {
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("searchTitle");

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    if (searchType === "searchTitle") {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchType === "searchCategory") {
      return product.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-30 md:mt-5 w-[80%] mx-auto">
        <div className="p-2 border border-blue-600 rounded-md font-medium shadow shadow-blue-500 ">
          <select
            className="text-blue-600"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="searchTitle">Search By Title</option>
            <option value="searchCategory">Search By Category</option>
          </select>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search...."
          className="p-2 border border-blue-600 rounded-md font-medium shadow shadow-blue-500  "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20 gap-5 place-items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="w-72  border border-violet-500 rounded-md p-5 hover:scale-105 transition-all"
              >
                <img
                  src={product.imageURL}
                  alt="product image"
                  className="w-[80%] mx-auto my-2.5"
                />
                <p>
                  <span className="text-[18px] font-medium text-violet-800">
                    Product :
                  </span>
                  {product.title}.
                </p>
                <p>
                  <span className="text-[18px] font-medium text-violet-800">
                    Category :
                  </span>
                  {product.category}.
                </p>
                <p>
                  <span className="text-[18px] font-medium text-violet-800">
                    Color :
                  </span>
                  {product.color}.
                </p>
                <p>
                  <span className="text-[18px] font-medium text-violet-800">
                    Price :
                  </span>
                  <span className="line-through pr-2">{product.price} EGP</span>
                  {product.salePrice} EGP.
                </p>
                <div className="flex items-center justify-between">
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-md mt-2.5 cursor-pointer"
                    onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                  >
                    Add To Cart
                  </button>
                  <FaRegHeart className="text-cyan-500 text-3xl cursor-pointer" />
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-3 text-center text-red-500 font-medium text-lg">
            No products found
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
