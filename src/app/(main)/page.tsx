import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="font-sans">
      <div className="flex flex-col items-center justify-center mt-30">
        <div className="text-3xl sm:text-7xl font-bold flex text-center">Welcome to Verto Quiz App</div>
        <div className="mt-50">
          <Link href='/dashboard'><Button>Get Started</Button></Link>
        </div>
      </div>
    </div>
  );
}
