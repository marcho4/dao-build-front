export function Footer() {
  return (
    <footer>
      <div className="w-full bg-[#F8F8F8] dark:bg-dark-primary flex flex-row p-6 items-center mt-5 z-0">
        <div className="text-xl font-bold basis-1/2 select-none ">
            © {new Date().getFullYear()} DAO.BUILD. All rights reserved.
        </div>
        {/*<nav className="basis-1/2 justify-end">*/}
        {/*  <ul className="flex flex-col text-xl items-end">*/}
        {/*    <li><Link href="/about" className="hover:underline font-bold">About Us</Link></li>*/}
        {/*    <li><Link href="/privacy" className="hover:underline font-bold">Privacy Policy</Link></li>*/}
        {/*    <li><Link href="/contact" className="hover:underline font-bold">Contact</Link></li>*/}
        {/*  </ul>*/}
        {/*</nav>*/}
      </div>
    </footer>
  );
}