import Link from 'next/link';


export function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="w-full bg-gray-500 flex-1">
        <p>© {new Date().getFullYear()} DAO.BUILD. All rights reserved.</p>
        <nav>
          <ul className="">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}