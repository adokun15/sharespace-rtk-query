import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="min-h-[10rem] md:flex space-y-4  justify-center gap-10 bg-blue-950 text-slate-600  text-center py-1 ">
      <article>
        <h3 className="font-bold text-xl font-sans_serif">ShareSpace</h3>
        <p>CopyRight &copy; 2025 - All Rights reserved</p>
        <p>
          Made by{" "}
          <Link className="border-dotted border-b-2 border-b-purple-900" to="#">
            Ohida
          </Link>
        </p>
      </article>

      <article>
        <h2>LINKS</h2>
        <ul className="text-slate-300">
          <li>Log In</li>
          <li>Pricing</li>
          <li>Faqs</li>
          <li>About</li>
        </ul>
      </article>
      <article>
        <h2>LEGAL</h2>
        <ul className="text-slate-300">
          <li>Terms of Service</li>
          <li>Privacy</li>
        </ul>
      </article>
      <article>
        <h2>OTHERS</h2>

        <ul className="text-slate-300">
          <li>SpaceBiz</li>
        </ul>
      </article>
    </footer>
  );
}
