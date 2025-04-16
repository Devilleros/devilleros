import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <Link href="/" className="flex items-center space-x-2">
                <div className="text-lg font-bold">Devilleros.com</div>
            </Link>
        <ul className="flex space-x-4">
            <li>
            <Link href="/inicio" className="hover:text-gray-300">
                inicio
            </Link>
            </li>
        </ul>
        </nav>
    );
}