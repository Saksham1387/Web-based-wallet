import { GenerateWallet } from "@/components/generateWallet";
import { NavBar } from "@/components/navbar";


export default function Home() {
  return (
    <div className="bg-black h-full">
      <div className="p-5">
      <NavBar></NavBar>
      </div>
      <GenerateWallet></GenerateWallet>
    </div>
  );
}
