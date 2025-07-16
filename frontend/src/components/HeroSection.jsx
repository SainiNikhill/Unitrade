import { useEffect, useState } from "react";
import img1 from "../assets/images/hero9.avif";

import img2 from "../assets/images/hero2.jpg";
import img3 from "../assets/images/hero3.jpg";
import img4 from "../assets/images/hero5.jpg";
import img5 from "../assets/images/hero10.avif";
import img6 from "../assets/images/hero11.avif";
import img7 from "../assets/images/hero13.avif";
import img8 from "../assets/images/hero11.avif";
import { MdArrowDownward } from "react-icons/md";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {toast} from 'react-toastify'

const images = [img1, img2, img4, img5, img3, img7, img8, img6];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const { navigate , token  } = useContext(ShopContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

   const handleClick = () =>{
      if(!token){
          toast.error('Please Login')
          navigate('/login')
          return
  
      }
      navigate('/create-product')
  
    }
  
  return (
    <div className=" md:h-screen  lg:h-screen flex flex-col gap-8 mb-20 sm:mt-15">
      <div className='flex flex-col sm:flex-row   font-["Neue_Montreal"] m-15'>
        {/* text-section */}
        <div className="w-full sm:w-1/2 flex flex-col  sm:mt-15 ">
          <div className="w-full  sm:px-5 ">
            <h3 className="text-xl  text-center sm:text-start">
              {" "}
              For Students, By Students
            </h3>
          </div>
          <div className="m-3 mt-8 text-5xl sm:text-6xl leading-none tracking-tight text-center sm:text-start">
            <p className="text-zinc-500">Buy Sell & Rent Items </p>
            <p className="">Within Your Campus.</p>
          </div>

          <div className="mt-5 ml-3 text-xl sm:text-lg text-zinc-900 text-center sm:text-left">
            <p>
              The easiest way to find affordable textbooks, electronics,
              furniture and more, safe transaction with fellow students.
            </p>
          </div>
          <div className="flex gap-4 justify-center sm:justify-start m-3 mt-8 mb-10  text-sm sm:text-lg text-center ">
            <div
              onClick={() => navigate("/collection")}
              className="border  bg-zinc-900 rounded text-white px-3 py-3 cursor-pointer hover:bg-white hover:text-black"
            >
              Browse Products
            </div>
            <div onClick={handleClick} className="border  rounded px-4 py-3 cursor-pointer bg-zinc-950  text-white hover:bg-white hover:text-black  ">
              Sell Products
            </div>
          </div>
        </div>
        {/* image section */}
        <div className="relative w-full sm:w-1/2 h-60 sm:h-[35rem] rounded-2xl overflow-hidden ">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-0 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="hidden sm:flex justify-center">
        <div className="flex flex-col items-center text-xl animate-bounce gap-3 mt-3 mb-7 text-zinc-400">
          Scroll to see more
          <div className="w-10 h-10 rounded-full  bg-zinc-900 text-zinc-200 flex items-center justify-center">
            <MdArrowDownward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
