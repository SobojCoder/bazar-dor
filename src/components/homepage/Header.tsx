import logo from "@/assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "../UserInfo";
import TodayDate from "./TodayDate";

const Header = () => {
  return (
    <header className="bg-[#FAFCFA]">
      <div className="flex justify-between items-center gap-2 sm:gap-3 py-2.5 sm:py-4 lg:py-5 px-3 sm:px-6 xl:px-0 container mx-auto">
        <Link href="/" className="min-w-0 flex-1">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              src={logo}
              alt="বাজার দর লোগো"
              width={60}
              height={60}
              priority
              className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0 bg-[#05893E] p-1.5 sm:p-2 rounded-lg"
            />
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl lg:text-2xl text-black font-extrabold truncate">
                বাজার দর
              </h1>
              <TodayDate />
            </div>
          </div>
        </Link>
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header;