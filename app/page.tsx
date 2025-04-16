"use client";

import { SquareChevronRight } from "lucide-react";
import Link from "next/link";
import Steam from "./components/stetic/Steam";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Steam />
      <h1 className="text-4xl mb-4 font-press">Bienvenido a devilleros.com</h1>
      <Link href="/inicio">
        <SquareChevronRight size={50} strokeWidth={1.5} />
      </Link>
    </div>
  )
}
