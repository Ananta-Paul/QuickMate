/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { v4 as uuid } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

const Page = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [login, setLogin] = useState(0);
  //   const [orderId, setOrderid] = useState(uuid());
  const [name, setName] = useState("");

  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const router = useRouter();

  let [countDown, setCountDown] = useState(60);
  const [loading, setLoading] = useState(false);

  //otp input functionality

  const otpInputs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const focusInput = (inputs, index) => {
    inputs[index].current.focus();
  };

  const handleInputChange = (inputs, index, value) => {
    // Move to the next input on value change
    if (value && index < inputs.length - 1) {
      focusInput(inputs, index + 1);
    }
  };

  const handleKeyDown = (inputs, index, e) => {
    //also select the value of the input
    // On pressing the Arrow keys, move the focus on the left and right side
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(inputs, index - 1);
    } else if (e.key === "ArrowRight" && index < inputs.length - 1) {
      e.preventDefault();
      focusInput(inputs, index + 1);
    }

    // Move to the previous input on Backspace if not on the first input
    if (e.key === "Backspace" && index > 0) {
      if (inputs[index].current.value !== "") {
        inputs[index].current.value = "";
      } else focusInput(inputs, index - 1);
    }
  };
  const otpResend = async () => {
    try {
      //const otpRes = await axios.post(`/v1/otp/resend`, { dtCode: orderId });
      // setOrderId(otpRes?.data?.orderId);
      //console.log(otpRes);
      setCountDown(60);
    } catch (error) {
      // toast.warn("Enter correct number");
      alert(error?.response?.data || "Please wait for for 1 min");
      console.error(error);
    }
  };

  const handleSendOtp = async () => {
    setLogin(2);
    setCountDown(60);
  };
  const handleLogin = async () => {};

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setCountDown(0);
    }
  }, [countDown]);

  //     try {
  //     //   const otpRes = await axios.post(`/v1/otp/send`, {
  //     //     dtCode: orderId,
  //     //     phoneNumber: phoneNum,
  //     //     name: parentName,
  //     //     //"email": "yashpratapsingh125@gmail.com",
  //     //     //"orderId": "ABC1235",
  //     //     otpTTL: 60,
  //     //     otpLength: 6,
  //     //     // "channel": "WHATSAPP/SMS/EMAIL"
  //     //   });
  //       // const status = otpRes;
  //       // console.log(otpRes);
  //       // setOrderid(otpRes?.data?.orderId);
  //       router.push("/otpverification?callbackUrl=" + callbackUrl);
  //     } catch (error) {
  //       // toast.warn("Enter correct number");
  //       alert(error?.response?.data || "Enter correct number");
  //       console.error(error);
  //     }
  //   };

  const handleChange = (pn) => {
    const phoneNumRegex = /^[0-9]\d{9}$/;
    if (phoneNumRegex.test(pn)) {
      setPhoneNum(pn);
      setLogin(1);
    } else {
      setLogin(0);
      setCountDown(0);
    }
  };

  return (
    <div className="max-w-screen h-screen flex items-center overflow-hidden">
      <div className="flex mx-auto gap-2 w-fit  h-fit flex-col rounded-3xl py-11 justify-center bg-white shadow-lg  p-10">
        <label htmlFor="name" className="font-Nunito text-base font-normal">
          Name
        </label>
        <div className=" flex w-full rounded-md border border-gray-300 bg-white px-3 py-3 shadow-lg 6px]">
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <label type="number" className="font-Nunito text-base font-normal">
          Phone number
        </label>
        <div className=" flex w-full whitespace-nowrap rounded-md border border-gray-300 bg-white shadow-lg 6px]">
          <span className=" pl-3 py-3 font-bold text-gray-600">+91</span>
          <input
            type="tel"
            maxLength={10}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-2 py-3 outline-none"
          />
          {login === 1 && (
            <button
              className="backgroud-button rounded-md cursor-pointer px-3 py-2 text-white"
              onClick={handleSendOtp}
            >
              Get OTP
            </button>
          )}
        </div>
        <p className="font-Nunito text-xs font-light 6px]">
          A 6 digit OTP will be sent via SMS to verify your mobile number.
        </p>

        {login >= 2 && (
          <>
            <div className="mt-4 flex justify-center gap-2">
              {otpInputs.map((inputRef, index) => (
                <input
                  key={index}
                  type="text"
                  className="h-10 w-10 rounded-md border-2 border-slate-500 text-center "
                  maxLength={1}
                  pattern="\d+"
                  inputMode="numeric"
                  ref={inputRef}
                  onChange={(e) =>
                    handleInputChange(otpInputs, index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(otpInputs, index, e)}
                  onClick={() => focusInput(otpInputs, index)}
                />
              ))}
            </div>

            <div className="mx-auto mt-3 flex w-full justify-between">
              {countDown === 0 ? (
                <>
                  <button
                    onClick={() => otpResend()}
                    className="text-sm font-semibold text-[#F58720]"
                  >
                    Resend OTP
                  </button>
                </>
              ) : (
                <>
                  <h4 className="text-sm font-semibold text-[#F58720]/60">
                    Resend OTP in
                  </h4>
                  <h4 className="text-xs">{countDown} sec</h4>
                </>
              )}
            </div>
          </>
        )}

        <button
          disabled={login < 2}
          className="backgroud-button disabled:disable cursor-pointer rounded-full px-6 py-3 text-white"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="w-full max-w-[276px] text-xs">
          By signing in, you agree to the{" "}
          <Link href="/t&c" className="font-semibold">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="font-semibold">
            Privacy Policy
          </Link>
          . You also agree that you have parental consent (if child). We use
          WhatsApp for important updates
        </p>
        {/* <p className="font-Nunito text-xs font-bold n">
              <Link href="/t&c">Terms of Service</Link> |{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </p> */}
      </div>
    </div>
  );
};

export default Page;
