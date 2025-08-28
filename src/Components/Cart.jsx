import { useCart } from "../context/cartContext";


const Cart = () => {
  const { cart, dispatch } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0
  );

  return (
    <div className="w-[80%] mx-auto my-30">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-red-500 font-medium">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-5  items-center justify-between border p-4 rounded-md shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500">{item.category}</p>
                  <p className="text-blue-600">
                    {item.salePrice} EGP x {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                  }
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
                  }
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="ml-3 text-red-600 font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-5">
            Total: {totalPrice} EGP
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

