import { Link } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";
import ArtLogo from "./common/ArtLogo";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-surface/70 dark:bg-void/20 backdrop-blur-md border-b border/5 dark:border-subtle/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center">
          <ArtLogo />
        </Link>

        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-text-muted dark:text-primary-text/80 hover:text-primary dark:hover:text-primary-text font-medium transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-primary text-primary-text px-5 py-2 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};


export default Navbar;
