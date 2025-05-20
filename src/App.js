// App.jsx — корневой компонент
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import styles from "./App.module.css"; // импортируем глобальный стиль



function App() {
    return (
        <Router>
            <div className={styles.appWrapper}>
                <Header />
                <main className={styles.mainContent}>
                    <Routes>
                        <Route path="/cars_watch" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
