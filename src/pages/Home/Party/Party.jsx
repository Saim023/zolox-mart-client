import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ProductCard from "../../../components/Card/ProductCard";
import Swal from "sweetalert2";
import CategoryFilters from "../../../components/CategoryDropdown/CategoryFilters";

const Party = () => {
  const { user, loading } = useContext(AuthContext);
  const [party, setParty] = useState([]);

  useEffect(() => {
    fetch("https://zolox-mart-server.onrender.com/party")
      .then((res) => res.json())
      .then((data) => setParty(data))
      .catch((error) => console.log("Error fetching party data:", error));
  }, []);

  if (loading) {
    return <h1>Party data loading...</h1>;
  }

  // Add to cart
  const handleAddToCart = (product) => {
    if (user && user.email) {
      console.log(product);
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
    console.log(product);
  };

  return (
    <div className="w-4/5 mx-auto mt-10">
      <div className="flex">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {party?.map((par) => (
              <ProductCard
                key={par._id}
                item={par}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Party;
