"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { InputForm } from "./FormComponents";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";
import { SignInValidation, SignUpValidation } from "@/constants/FormValidation";
import { Progress } from "../ui/progress";
import { signIn } from "@/auth";

const SignInSignUp = ({ type }: { type: string }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const { SignInForm, SignInSubmit } = SignInValidation();
  const { SignUpForm, SignUpSubmit } = SignUpValidation();

  const passwordValue = SignUpForm.watch("password");

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;

    if (pass.length > 6) strength += 20;
    if (pass.match(/[a-z]+/)) strength += 20;
    if (pass.match(/[A-Z]+/)) strength += 20;
    if (pass.match(/[0-9]+/)) strength += 20;
    if (pass.match(/[$@#&!]+/)) strength += 20;

    setPasswordStrength(strength);
  };

  useEffect(() => {
    if (passwordValue !== undefined) checkPasswordStrength(passwordValue);
  }, [passwordValue]);

  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center p-4">
      <Card className="m-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            {type === "sign-in"
              ? "Sign in to your account"
              : "Join our community"}
          </CardTitle>
          <CardDescription className="text-center">
            {type === "sign-in"
              ? "Enter your email and password to access your account"
              : "Create an account and start sharing your ideas with the world"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {type === "sign-in" ? (
            <Form {...SignInForm}>
              <form onSubmit={SignInForm.handleSubmit(SignInSubmit)}>
                <div className="space-y-2">
                  <InputForm
                    control={SignInForm.control}
                    formName="email"
                    title="Email"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <InputForm
                      control={SignInForm.control}
                      formName="password"
                      title="Password"
                      type={showPassword ? "text" : "password"}
                      icon={() => (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      )}
                    />
                  </div>
                </div>

                <React.Fragment>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </React.Fragment>
              </form>
            </Form>
          ) : (
            <Form {...SignUpForm}>
              <form onSubmit={SignUpForm.handleSubmit(SignUpSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <InputForm
                      control={SignUpForm.control}
                      formName="firstName"
                      title="First Name"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <InputForm
                      control={SignUpForm.control}
                      formName="lastName"
                      title="Last Name"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <InputForm
                    control={SignUpForm.control}
                    formName="email"
                    title="Email"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <InputForm
                    control={SignUpForm.control}
                    formName="password"
                    title="Password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    icon={() => (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}
                  />
                  <Progress value={passwordStrength} className="h-2 w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Weak</span>
                    <span>Moderate</span>
                    <span>Strong</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <InputForm
                    control={SignUpForm.control}
                    formName="confirmPassword"
                    title="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" className="mt-5 w-full gap-2">
                  Create Account
                  <ArrowRight className="size-4" />
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <hr className="mb-5 border" />
        <CardFooter className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-5">
            <Button variant={"outline"} className="w-full">
              <svg className="mr-2 size-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Using Google
            </Button>

            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => signIn("facebook")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                className="mr-2 size-5"
              >
                <linearGradient
                  id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                  x1="9.993"
                  x2="40.615"
                  y1="9.993"
                  y2="40.615"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#2aa4f4"></stop>
                  <stop offset="1" stopColor="#007ad9"></stop>
                </linearGradient>
                <path
                  fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                  d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                ></path>
                <path
                  fill="#fff"
                  d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                ></path>
              </svg>
              Using Facebook
            </Button>
          </div>
          <div className="text-center text-sm">
            {type === "sign-in" ? (
              <span>
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInSignUp;
