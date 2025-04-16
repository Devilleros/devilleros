import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Image
          src="/images/hero.png"
          alt="Hero Image"
          width={500}
          height={500}
        />
        <p className="text-lg">Welcome to Devilleros!</p>
      </main>
    </div>
  );
}
