import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/">
          DAO.BUILD
        </Link>
      </h2>
    </div>
  );
};