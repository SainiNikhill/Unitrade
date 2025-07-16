import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Section2 = () => {

  const {token, navigate} = useContext(ShopContext)
  const handleClick = () =>{
    if(!token){
      toast.error('Please login To sell Products')
      navigate('/login')
      return
    }
    navigate('/create-product')
  }
  return (
    <div className="bg-zinc-100 h-[80vh] flex items-center justify-center">
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed=".3"
        className='font-["Neue_Montreal"] w-full '
      >
        <div className="p-20 flex flex-col items-center gap-5 -mt-5">
          <h1 className=" text-5xl sm:text-9xl font-medium  text-center">
            Ready
          </h1>
          <h1 className=" text-5xl  sm:text-9xl font-medium text-center">
            to buy or sell
          </h1>
          <h1 className=" text-5xl sm:text-8xl text-center"></h1>
          <p className=" text-lg sm:text-2xl text-center">
            Join thousands of students who are already saving money and
            decluttering their dorms with UniRentals
          </p>
          <div className="flex flex-row gap-12 mt-10">
            <Link to={`/collection`} className="border text-center  bg-zinc-950 hover:bg-white hover:text-black text-white rounded px-3 py-2  ">
              Browse Products
            </Link>
            <div onClick={handleClick} className="border text-center cursor-pointer bg-zinc-950 hover:bg-white hover:text-black text-white rounded px-6 py-2 ">
              Sell Products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
