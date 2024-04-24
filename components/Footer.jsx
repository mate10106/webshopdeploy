import Link from "next/link";

function Footer() {
  return (
    <div className="text-black bg-white w-full mt-8 rounded-xl text-center space-x-4">
      <Link href="/aszf">Aszf</Link>
      <Link href="/kapcsolat">Kapcsolat</Link>
      <p className="text-center p-2 font-light">
        Copyright © 2024 Webshop | Webshop. Minden jog fenntartva. All rights
        reserved.
      </p>
    </div>
  );
}

export default Footer;
