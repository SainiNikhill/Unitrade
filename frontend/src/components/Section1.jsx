import { MdOutlineTimer } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { AiOutlineSafety } from "react-icons/ai";

const Section1 = () => {
  return (
    <div className="mt-5">
      <div className="p-10  w-full flex flex-col items-center gap-18 font-['Neue_Montreal'] bg-zinc-100">
        <div className="text-center mt-6">
          <h1 className="text-6xl sm:text-8xl">Why Unitrade is Better</h1>
          <p className="text-2xl mt-5">
            we've built the most convenient platform for university students to
            exhange items safely and affordably
          </p>
        </div>

        {/* cards div */}
        <div className="w-full flex flex-col sm:flex-row gap-3 justify-between p-6 ">
          <div className=" w-full sm:w-1/4 h-70 border border-zinc-200 shadow-lg hover:shadow-2xl flex justify-center rounded-xl flex-col items-center gap-3 text-center p-3">
            <MdOutlineTimer className="text-5xl" />
            <h2 className="text-2xl font-bold">Save Time & Money</h2>
            <p className="text-sm ">
              find what you need from students who no longer need it. No
              shipping delays, no delivery fees.
            </p>
          </div>
          <div className="  gap-3 w-full sm:w-1/4 h-70 border border-zinc-200 shadow-lg hover:shadow-2xl flex justify-center rounded-xl flex-col items-center text-center p-3 ">
            <PiStudent className="text-5xl" />
            <h2 className="text-2xl font-bold">Student Verified</h2>
            <p className="text-sm">
              Everyone on the platform is a student from your university,
              creating a trusted community.
            </p>
          </div>
          <div className=" w-full sm:w-1/4 h-70  gap-3 border border-zinc-200 shadow-lg hover:shadow-2xl flex justify-center rounded-xl flex-col items-center text-center p-3 ">
            <AiOutlineSafety className="text-5xl" />
            <h2 className="text-2xl font-bold">Safe Transaction</h2>
            <p className="text-sm">
              meet on campus in designated safe zones. inspect items before
              purchasing for peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
