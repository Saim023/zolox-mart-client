import React, { useContext } from "react";
import "../../../src/Global.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("State location: ", location.state);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    signIn(email, password).then((result) => {
      const user = result.user;
      toast.success("User logged in successfully!");
      console.log(user);
      form.reset();
      navigate(from, { replace: true });
    });
  };

  // Login with google
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-4/5 mx-auto mt-10 font-thin">
        <h1 className="text-3xl uppercase">Login</h1>

        <div className="flex items-center gap-8 mb-10">
          <form onSubmit={handleLogin} className="w-[50%]">
            <div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="custom-input mt-2"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="custom-input mt-2"
                />
              </div>
              <div className="flex items-center gap-3 mt-4 ">
                <input
                  type="submit"
                  value="Login"
                  className="px-3 py-1 bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase cursor-pointer"
                />

                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 px-2 py-1 bg-white hover:bg-[#f7f7f7] border border-gray-300 transition-colors duration-200 min-w-[100px] sm:min-w-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Google logo"
                  >
                    <title>Google's Logo</title>
                    <g fill="none" fillRule="evenodd">
                      <path d="M0 0h24v24H0z" />
                      <path
                        d="M21.35 11.1h-9.18v2.96h5.3c-.23 1.24-.92 2.29-1.97 2.99v2.48h3.19c1.86-1.72 2.92-4.25 2.92-7.23 0-.68-.06-1.34-.18-1.97z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.17 21c2.65 0 4.87-.88 6.49-2.4l-3.19-2.48c-.88.59-2.01.95-3.3.95-2.53 0-4.68-1.71-5.45-4.02H3.43v2.53C5.04 18.95 8.35 21 12.17 21z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.72 13.05a5.414 5.414 0 010-3.1V7.42H3.43A8.97 8.97 0 002.26 12c0 1.44.35 2.8.97 3.98l3.49-2.93z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.17 6.57c1.44 0 2.73.5 3.75 1.49l2.82-2.82C17.03 3.53 14.82 2.5 12.17 2.5c-3.82 0-7.13 2.05-8.74 5.04l3.49 2.93c.76-2.3 2.91-4.02 5.45-4.02z"
                        fill="#EA4335"
                      />
                    </g>
                  </svg>
                  <span className="text-[11px] xs:text-xs md:text-sm pr-2 text-gray-700 uppercase whitespace-nowrap">
                    Login with Google
                  </span>
                </button>
              </div>
            </div>
          </form>

          <div className="w-[50%] p-6 bg-[#f7f7f7] space-y-4">
            <h1 className="text-2xl text-gray-800">New Customer?</h1>
            <p className="text-gray-700">
              Create an account with us and you'll be able to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Check out faster</li>
              <li>Save multiple shipping addresses</li>
              <li>Access your order history</li>
              <li>Track new orders</li>
              <li>Save items to your Wish List</li>
            </ul>
            <NavLink to="/signup">
              <button className="mt-4 px-3 py-1 bg-[#c081c8] hover:bg-[#9740a3] text-white uppercase text-[12px] xs:text-xs md:text-sm ">
                Create Account
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
