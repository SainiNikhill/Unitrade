import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='w-full p-4 sm:p-10 font-["Neue_Montreal"] h-screen flex'>
      {/* left div */}
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed=".3"
        className="w-1/2 h-screen flex flex-col justify-between p-3 sm:p-6"
      >
        <div className="gap-6 flex flex-col">
          <h1 className="text-2xl sm:text-8xl font-semibold">Unitrade</h1>
          <p className="text-sm sm:text-lg">
            The easiest way for university students to buy, sell, and rent items
            within their campus community.
          </p>
          <div className=" flex gap-2  text-sm sm:text-lg flex-col w-auto">
            <Link href="#" className=" underline hover:no-underline">
              About us
            </Link>
            <Link href="#" className="underline hover:no-underline">
              How it works
            </Link>
            <Link href="#" className="underline hover:no-underline">
              safet
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-20 ">
          <h1 className='font-["League_Spartan"] text-xl sm:text-3xl '>
            unitrade.
          </h1>
          <h1 className="text-[10px] sm:text-[15px] ">
            @2025 unitrade All Rights Reserved
          </h1>
        </div>
      </div>
      {/* right div */}
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed=".3"
        className="w-1/2 h-[80vh] sm:h-screen flex flex-col  gap-2 sm:gap-10 pt-5 sm:p-30 "
      >
        {/* div1 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-9 text-[12px] sm:text-[20px] pl-10 sm:pl-0">
          <div className="Account flex flex-col gap-2 ">
            A:
            <Link href="#" className="underline hover:no-underline">
              Register
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Log in
            </Link>
            <Link href="#" className="underline hover:no-underline">
              My listings
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Messages
            </Link>
          </div>
          <div className="Categories flex flex-col gap-2 ">
            C:
            <Link href="#" className="underline hover:no-underline">
              Textbooks
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Electronics
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Furniture
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Clothing
            </Link>
          </div>
          <div className="Support flex flex-col gap-2">
            S:
            <Link href="#" className="underline hover:no-underline">
              Help
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Terms of service
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Report an issue
            </Link>
            <Link href="#" className="underline hover:no-underline">
              Privacy policy
            </Link>
          </div>
        </div>
        {/* div2 */}
        <div className="conatact  flex justify-start ">
          <div className="flex flex-col gap-2 text-[12px] sm:text-[20px] pl-10 sm:p-0">
            C:
            <Link
              href="www.instagram.com"
              className="underline hover:no-underline flex items-center gap-2"
            >
              Instagram{" "}
              <span>
                <FaInstagram />
              </span>
            </Link>
            <Link
              href="www.x.com"
              className="underline hover:no-underline flex items-center gap-2"
            >
              X{" "}
              <span>
                <FaSquareXTwitter />
              </span>
            </Link>
            <Link
              href="www.facebook.com"
              className="underline hover:no-underline flex items-center gap-2"
            >
              Facebook{" "}
              <span>
                <FaFacebook />
              </span>
            </Link>
            <Link
              href="www.Linkedin.com"
              className="underline hover:no-underline flex items-center gap-2"
            >
              Linkedin{" "}
              <span>
                <FaLinkedin />
              </span>
            </Link>
            <Link
              href="www.unitrade.com"
              className="underline hover:no-underline flex items-center gap-2"
            >
              www.unitrade.com{" "}
              <span>
                <FaGoogle />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
