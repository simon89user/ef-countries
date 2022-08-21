import { useTheme } from "next-themes";
import Link from "next/link";
import { FaMoon } from "react-icons/fa";
import styles from "../../styles/header.module.scss";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.navWrapper + " theming-bg-dark"}>
      <nav className="navbar">
        <div className="container-fluid">
          <Link href="/" passHref>
            <a className="navbar-brand">
              <b>Where in the World?</b>
            </a>
          </Link>
          <button
            className={
              theme === "dark"
                ? "btn btn-outline-light"
                : "btn btn-outline-dark"
            }
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          >
            <FaMoon className={styles.icon} />
            Dark Mode
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
