import Link from 'next/link';


export function Footer() {
  return (
    <footer>
      <div className="w-full flex flex-row p-6 items-center">
        <div className="text-xl font-bold basis-1/2">© {new Date().getFullYear()} DAO.BUILD. All rights reserved.</div>
        <nav className="basis-1/2 justify-end">
          <ul className="flex flex-col text-xl items-end">
            <li><Link href="/about" className="hover:underline font-bold">About Us</Link></li>
            <li><Link href="/privacy" className="hover:underline font-bold">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:underline font-bold">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}