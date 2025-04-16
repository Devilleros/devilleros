import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="absolute top-1/2 left-1/2 z-10 w-full max-w-3xl
         -translate-x-1/2 -translate-y-1/2 transform text-center font-mono
          text-sm lg:flex lg:items-center lg:justify-center">
          Bienvenido a devilleros.com
        </h1>
      </main>
    </div>
  );
}
