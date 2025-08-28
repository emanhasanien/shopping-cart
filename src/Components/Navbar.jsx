import { Link } from "react-router-dom";
import Logo from "../../public/assets/images/logo.jpg";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.userName;
  const { cart } = useCart();
  const totalItems = cart.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0),
    0
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <>
      <nav className="h-24 bg-violet-700 fixed w-full z-10 top-0 start-0 ">
        <div className="w-[80%] mx-auto flex items-center justify-between gap-5">
          <img
            src={Logo}
            alt="logo image"
            className="h-20 w-20 mt-2 rounded-md"
          />
          <h3 className="text-[18px] md:text-2xl font-bold text-white">
            welcome {userName ? userName : user?.email} 🎉
          </h3>

          <ul className="flex gap-5 text-white text-[20px] items-center">
            <li>
              <Link to={"/cart"} className="relative">
                <FaShoppingCart size={30} />
                <span className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-white bottom-[60%] start-[90%] text-black text-xs font-bold">
                  {totalItems}
                </span>
              </Link>
            </li>
            <li className="hover:underline cursor-pointer text-[18px] md:text-2xl">
              <Link to={"/login"} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
