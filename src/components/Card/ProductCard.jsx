import { FaRegHeart, FaEye } from "react-icons/fa";
import { TbBrandDatabricks } from "react-icons/tb";
import { Rating } from "@smastrom/react-rating";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const ProductCard = ({ item }) => {
  const {
    brand,
    category,
    featuredItem,
    image,
    inStock,
    name,
    price,
    rating,
    _id,
  } = item;
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async (product) => {
    if (user && user.email) {
      try {
        const response = await axiosSecure.get(`/carts?email=${user.email}`);
        const existingItem = response.data.find(
          (cartItem) => cartItem.name === name && cartItem.brand === brand
        );

        if (existingItem) {
          toast.error(`${name} is already in your cart.`);
          return;
        }

        const cartItem = {
          email: user.email,
          name,
          image,
          price,
          brand,
          quantity: 1,
        };

        const res = await axiosSecure.post("/carts", cartItem);

        if (res.data.insertedId) {
          toast.success(`${name} added to the cart!!`);
          refetch();
        }
      } catch (error) {
        if (error.response?.status === 409) {
          toast.error(`${name} is already in your cart.`);
        } else {
          toast.error("Failed to add item to cart.");
          console.error(error);
        }
      }
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        width: "350px",
        background: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
        customClass: {
          popup: "my-swal-shadow",
          title: "my-swal-title",
          htmlContainer: "text-msg",
          confirmButton: "my-swal-confirm",
          cancelButton: "my-swal-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="relative shadow-sm bg-white h-full md:h-[420px] group overflow-hidden">
      {/* Action buttons */}
      <div className="absolute top-0 right-0 z-20 flex flex-col items-end p-2 space-y-2 transform translate-y-[-100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <button className="text-white bg-[#9740a3] hover:bg-[#b150bb] p-2">
          <FaRegHeart />
        </button>
        <button className="mb-2 text-white bg-[#9740a3] hover:bg-[#b150bb] p-2">
          <FaEye />
        </button>
        <button className="mb-2 text-white bg-[#9740a3] hover:bg-[#b150bb] p-2">
          <TbBrandDatabricks />
        </button>
      </div>

      {/* Product image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-auto object-cover"
      />

      {/* Description */}
      <div className="w-full py-1 text-center bg-white z-20 transform transition-all group-hover:-translate-y-10 duration-500">
        <Rating
          readOnly
          className="mx-auto mt-1"
          style={{ maxWidth: 90 }}
          value={item.rating}
        />
        <h1 className="my-1">{item.name}</h1>
        <p className="font-semibold mb-3">${item.price}</p>
        <button
          onClick={() => handleAddToCart(item)}
          className="bg-[#9740a3] hover:bg-[#b150bb] px-4 mb-6 py-1 text-white uppercase font-thin text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
