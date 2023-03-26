import useCart from "@/hooks/useCart";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { cartStateValue } = useCart();
  return (
    <header>
      <nav className="flex h-12 items-center px-4 justify-between shadow-md">
        <Link href="/" className="text-lg font-bold">
          Kaili Cen
        </Link>
        <div>
          <Link className="p-2" href="/cart">
            Cart
            {cartStateValue.items.length > 0 && (
              <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                {cartStateValue.items.length}
              </span>
            )}
          </Link>

          <Link className="p-2" href="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
