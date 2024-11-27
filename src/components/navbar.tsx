import { Wallet } from "lucide-react";

export const NavBar = () => {
  return (
    <div className="w-full h-20 p-5 bg-zinc-900  flex justify-start rounded-xl items-center gap-3">
        <Wallet className="text-white "></Wallet>
      <h1 className=" text-white text-2xl">RayWallet</h1>
    </div>
  );
};
