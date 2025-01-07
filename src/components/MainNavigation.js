import Logo from "../image/undraw/undraw_People_re_8spw.png";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

export default function MainNavigation() {
  return (
    <motion.nav className="flex px-6 py-10  font-sans_serif justify-between ">
      <div className="flex items-center gap-1">
        <img
          src={Logo}
          className="aspect-auto object-fill max-w-20 rounded-full"
          alt="logo"
        />
        <p className="text-3xl ">
          <Link to="/">ShareSpace</Link>
        </p>
      </div>
      <div className="font-roboto inline-flex items-center gap-5">
        <Button
          variant="outline"
          className="text-xl hover:bg-purple-500 hover:text-white rounded py-2"
        >
          Sign In
        </Button>
      </div>
    </motion.nav>
  );
}
