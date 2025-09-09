import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';







const Login = () => {
    const locations = useLocation();

    const { setUser, googleSignIn, logInUser, setLoading } = use(AuthContext);

    //  navigate login
    const navigate = useNavigate();
  

    //  google signin

    const handleSigninGoogle = () => {
        setLoading(true);
        googleSignIn()
            .then((result) => {
                toast.success('Successfully login')
                localStorage.setItem('devtalksToken', result?.user?.accessToken);
                navigate(locations?.state || '/', {
                    state: { toastMessage: 'Login successful!' }
                });
                const user = result.user;
                setUser(user);


            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage);
            });


    }

//   login user
    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;


        logInUser(email, password)
            .then((result) => {
                const user = (result.user);
                setUser(user)
                localStorage.setItem('devtalksToken', result?.user?.accessToken);
                toast.success('Successfully Login')
                navigate(locations?.state || '/', {
                    state: { toastMessage: 'Login successful!' }
                });



            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Invalid email or password!');
            })


    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center lg:mx-20 px-4 ">


            {/* login section */}
            <div onSubmit={handleLogin} className="w-full md:mt-7  max-w-md p-2 lg:p-8 md:px-6 md:py-6 rounded-2xl shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] bg-gradient-to-br bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700">

                <p className="space-grotesk-500 sm:text-sm text-gray-500 font-semibold text-center  mt-5">
                    Welcome Back
                </p>
                <h1 className="space-grotesk-500 mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-center mt-2">
                    Sign in  your account
                </h1>


                <div className="card-body">

                    <form className="fieldset space-y-1">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                required
                                name="email"
                                type="email"
                                className="input-field p-3 text-sm border-1 rounded-2xl border-gray-500 w-full"
                                placeholder="enter your name here"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                className="input-field p-3 border-1 text-sm rounded-2xl border-gray-500 w-full"
                                placeholder="Password"
                            />
                        </div>

                        {/* Forgot password */}
                        <div className="text-right">
                            <button type="button" className="link link-hover text-sm">
                                Forgot password?
                            </button>
                        </div>

                        {/* Sign in Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-black border border-gray-200 text-white hover:shadow-sm hover:text-blue-300 hover:shadow-blue-400 dark:hover:bg-gray-600   rounded-full transition font-bold text-lg"
                        >
                            Signin
                        </button>
                    </form>

                    <p className="text-center  text-sm">
                        Don't have an account?
                        <span className="text-blue-700">
                            <Link to="/register"> Sign up</Link>
                        </span>
                    </p>

                    <p className="font-bold text-gray-400 text-center mb-2 text-sm">
                        Or, login with
                    </p>

                    {/* Google Sign-in */}
                    <button
                        onClick={handleSigninGoogle}

                        className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 hover:text-blue-300 dark:border-gray-600 rounded-full hover:shadow-sm  hover:shadow-blue-400 dark:hover:bg-gray-700 text-sm text-black font-medium transition"
                    >
                        <svg
                            aria-label="Google logo"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path
                                    fill="#34a853"
                                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                ></path>
                                <path
                                    fill="#4285f4"
                                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                ></path>
                                <path
                                    fill="#fbbc02"
                                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                ></path>
                                <path
                                    fill="#ea4335"
                                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                ></path>
                            </g>
                        </svg>
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;