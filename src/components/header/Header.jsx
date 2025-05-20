import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";
import styles from "./Header.module.css";

function Header() {
    // const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY > 1);
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        // <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.leftBlock}>
                    <Link to="/cars_watch" className={styles.logo}>
                        <Car size={35} className={styles.logoIcon}/>
                        <span className={styles.logoText}>Cars Whatch</span>
                    </Link>
                    {/* Бургер на мобилках */}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>


                <div className={styles.searchWrapper}>
                    <div className={styles.searchInner}>
                        <select className={styles.select}>
                            <option value="1">Archived</option>
                            <option value="2">Current</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search..."
                            className={styles.searchInput}
                        />
                    </div>
                </div>


                {/* Навигация на десктопе */}
                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    <Link to="/about" className={styles.navLink}>About</Link>

                </nav>


            </div>


            {/* Мобильное меню */}
            {mobileOpen && (
                <div className={styles.mobileMenu}>
                    <Link to="/" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>Home</Link>
                    <Link to="/about" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>About</Link>

                </div>
            )}




        </header>
    );
}

export default Header;
