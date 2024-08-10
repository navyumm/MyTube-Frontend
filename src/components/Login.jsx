import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                                required: true,
                            })}
                        />
                        {errors.username && (
                            <span className="text-white">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="1kd074fjw0"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-[#e55542]"
                            className="w-full rounded sm:py-3 py-2 hover:bg-[#d6685a] text-lg"
                        >
                            Login
                        </Button>

                        <p className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-[#e55542] cursor-pointer hover:opacity-70"
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