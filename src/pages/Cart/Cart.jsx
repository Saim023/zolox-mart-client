import React, { useState } from "react";
import useCart from "../../hooks/useCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import "../../Global.css";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  console.log(cart);
  const [likedItems, setLikedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const allSelected =
    cart.length > 0 && cart.every((item) => selectedItems[item._id]);

  // Select all
  const handleSelectAll = (checked) => {
    const updatedSelections = {};
    cart.forEach((item) => {
      updatedSelections[item._id] = checked;
    });
    setSelectedItems(updatedSelections);
  };

  const handleItemSelect = (id, checked) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  //  Liked item
  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Price calculation
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shippingFee = 7;

  const grandTotal = totalPrice + shippingFee;

  //   Cart quantity
  const updateCartQuantity = (_id, action) => {
    const item = cart.find((item) => item._id === _id);
    if (!item) return;

    let newQuantity = item.quantity || 1;

    if (action === "increment") {
      newQuantity += 1;
    } else if (action === "decrement") {
      newQuantity = Math.max(1, newQuantity - 1);
    } else if (typeof action === "number") {
      newQuantity = Math.max(1, action);
    }

    axiosSecure
      .patch(`/carts/${item._id}`, { quantity: newQuantity })
      .then((res) => {
        refetch();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  //   Delete item from cart
  const handleDeleteOne = (id) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "350px",
      background: "#fff",
      customClass: {
        popup: "my-swal-shadow",
        title: "my-swal-title",
        htmlContainer: "text-msg",
        confirmButton: "my-swal-confirm",
        cancelButton: "my-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Item deleted successfully!",
                width: "350px",
                background: "#fff",
                customClass: {
                  popup: "my-swal-shadow",
                  title: "my-swal-title",
                  htmlContainer: "text-msg",
                  confirmButton: "my-swal-confirm",
                  cancelButton: "my-swal-cancel",
                },
              });
            }
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  //   Delete selected
  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(selectedItems)
      .filter((id) => selectedItems[id])
      .map((id) => id);

    if (selectedIds.length === 0) {
      Swal.fire({
        title: "No items selected",
        text: "Please select items to delete",
        icon: "warning",
      });
      return;
    }

    console.log("Selected IDs to delete:", selectedIds);

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedIds.length} item(s)`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
      width: "350px",
      background: "#fff",
      customClass: {
        popup: "my-swal-shadow",
        title: "my-swal-title",
        htmlContainer: "text-msg",
        confirmButton: "my-swal-confirm",
        cancelButton: "my-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/carts/selected", { ids: selectedIds })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${res.data.deletedCount} item(s) deleted successfully!`,
                width: "350px",
                background: "#fff",
                customClass: {
                  popup: "my-swal-shadow",
                  title: "my-swal-title",
                  htmlContainer: "text-msg",
                  confirmButton: "my-swal-confirm",
                  cancelButton: "my-swal-cancel",
                },
              });
              setSelectedItems({});
            }
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting items:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete items",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className=" bg-[#f7f7f7] py-4 text-center font-thin">
        My Cart: {cart.length}
      </div>
      <div className="w-4/5 mx-auto flex justify-between gap-5 mt-4">
        <div className="w-2/3">
          <div className="flex items-center justify-between p-4 bg-[#f7f7f7]">
            <div>
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span className="checkbox-label-text uppercase font-thin">
                  Select All
                </span>
              </label>
            </div>
            <div className="">
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 px-2 py-1 bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase font-thin"
              >
                <RiDeleteBin6Line></RiDeleteBin6Line>
                Delete
              </button>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="py-4 border-b border-gray-200 mt-5 bg-[#f7f7f7]"
                >
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-4 w-2/3">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={!!selectedItems[item._id]}
                        onChange={(e) =>
                          handleItemSelect(item._id, e.target.checked)
                        }
                      />
                      <img
                        className="w-20 h-20 object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="space-y-1">
                        <h1 className="text-base font-medium leading-tight line-clamp-1">
                          {item.name}
                        </h1>
                        <p className="font-thin text-sm text-gray-500">
                          Brand: {item.brand}
                        </p>
                      </div>
                    </div>
                    <div className="w-2/6 flex items-center justify-between">
                      <div className="text-right">
                        <p className=" font-semibold">{item.price}</p>
                        <div className="flex items-center justify-end gap-2 mt-2 text-gray-500">
                          {likedItems[item._id] ? (
                            <FaHeart
                              className="cursor-pointer text-[#9740a3]"
                              onClick={() => toggleLike(item._id)}
                            />
                          ) : (
                            <FaRegHeart
                              className="cursor-pointer"
                              onClick={() => toggleLike(item._id)}
                            />
                          )}
                          <RiDeleteBin6Line
                            onClick={() => handleDeleteOne(item._id)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, "decrement")
                            }
                          >
                            <FiMinus></FiMinus>
                          </button>

                          <input
                            className="cart-input text-center"
                            type="number"
                            name="quantity"
                            id="quantity"
                            min="1"
                            value={item.quantity || 1}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value) || 1;
                              updateCartQuantity(item._id, newQuantity);
                            }}
                          />

                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, "increment")
                            }
                          >
                            <GoPlus></GoPlus>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">Your cart is empty</p>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="w-1/3">
          <div className="p-4 bg-[#f7f7f7]">
            <h1 className="font-thin text-xl">Order Summary</h1>
            <div className="mt-4 font-thin">
              <div className="flex justify-between mb-3">
                <span>Subtotal</span> <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Shipping fee</span>
                {cart.length > 0 ? (
                  <>
                    <span>${shippingFee}</span>
                  </>
                ) : (
                  0
                )}
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <input
                  className="custom-input"
                  type="text"
                  name="voucher"
                  id="voucher"
                  placeholder="Enter your voucher code"
                />
                <button className="px-3 py-[7px] bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase">
                  Apply
                </button>
              </div>
              <div className="flex justify-between mb-3 font-normal">
                <span>Total</span>
                {cart.length > 0 ? (
                  <>
                    <span>${grandTotal.toFixed(2)}</span>
                  </>
                ) : (
                  0
                )}
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
