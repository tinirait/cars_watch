import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                &copy; {new Date().getFullYear()} Cars Watch. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;