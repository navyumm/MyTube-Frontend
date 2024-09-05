import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/LoginSkeleton";

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const submit = async (data) => {
        const isEmail = data.username.includes("@");
        const loginData = isEmail
            ? { email: data.username, password: data.password }
            : data;

        const response = await dispatch(userLogin(loginData));
        const user = await dispatch(getCurrentUser());
        if (user && response?.payload) {
            navigate("/");
        }
    };

    if (loading) {
        return <LoginSkeleton />
    }

    return (
        <>
            <div className="w-full h-screen text-white p-3 flex justify-center items-start">
                <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-500 p-3 mt-20">
                    <div className="flex items-center gap-2 mt-5">
                        <Logo />
                    </div>

                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 p-2"
                    >
                        <Input
                            label="Username / email : "
                            type="text"
                            placeholder="example@gmail.com"
                            {...register("username", {
                                required: "username is required",
                            })}
                        />
                        {errors.username && (
                            <span className="text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="1kd074fjw0"
                            {...register("password", {
                                required: "password is required",
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password.message}
                            </span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-[#e55542]"
                            className="w-full text-lg sm:py-3 py-2 hover:bg-gradient-to-r from-red-500 via-orange-500 transition duration-200"
                        >
                            Login
                        </Button>

                        <p className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-red-500 text-lg cursor-pointer hover:opacity-80"
                            >
                                SignUp
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;