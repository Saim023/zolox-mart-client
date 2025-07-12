import React, { useContext, useState } from "react";
import "../../../src/Global.css";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        const displayName = `${data.firstName} ${data.lastName}`;

        updateUserProfile(displayName, data.photoURL).then(() => {
          console.log("User profile updated");
          reset();
          toast.success("User created successfully!");
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Failed to create user.");
      });
  };

  return (
    <div className="w-4/5 mx-auto mt-10 font-thin">
      <h1 className="text-2xl text-center uppercase mb-10">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 items-center content-center gap-6">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              name="firstName"
              placeholder="Enter your First Name"
              className="signup-input mt-2"
            />
            {errors.firstName && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              name="lastName"
              placeholder="Enter your Last Name"
              className="signup-input mt-2"
            />
            {errors.lastName && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="Enter your email"
              className="signup-input mt-2"
            />
            {errors.email && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", { required: true })}
              name="phone"
              placeholder="Enter your phone number"
              className="signup-input mt-2"
            />
            {errors.phone && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              placeholder="Enter your password"
              className="signup-input mt-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[42px] text-sm"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            {errors.password && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Enter your password again"
              className="signup-input mt-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-[42px] text-sm"
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            {errors.confirmPassword && (
              <span className="text-red-700">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: true })}
              name="address"
              placeholder="Enter your address"
              className="signup-input mt-2"
            />
            {errors.address && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="">
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
              name="city"
              placeholder="Enter your city"
              className="signup-input mt-2"
            />
            {errors.city && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="">
              State
            </label>
            <input
              type="text"
              id="state"
              {...register("state", { required: true })}
              name="state"
              placeholder="Enter your state"
              className="signup-input mt-2"
            />
            {errors.state && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="country" className="">
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country", { required: true })}
              name="country"
              placeholder="Enter your country"
              className="signup-input mt-2"
            />
            {errors.country && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="postcode">Zip / Postcode</label>
            <input
              type="text"
              id="postcode"
              {...register("postcode", { required: true })}
              name="postcode"
              placeholder="Enter your postcode"
              className="signup-input mt-2"
            />
            {errors.postcode && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="photoURL">PhotoURL</label>
            <input
              type="text"
              id="photoURL"
              {...register("photoURL", { required: true })}
              name="photoURL"
              placeholder="Enter your photoURL"
              className="signup-input mt-2"
            />
            {errors.photoURL && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-1 bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
