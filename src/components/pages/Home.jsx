import Agregator from "../Agregator";
import CarSlider from "../CarSlider";
import styles from "./Home.module.css";
import TestRequest from "../TestRequest";


function Home() {
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.homeTitle}>Cars Whatch</h1>
            <p className={styles.homeDescription}>
                Start exploring cars and auctions.
            </p>
            <Agregator />
            <CarSlider />

            {/*Для тестирования запросов*/}
            <TestRequest />




        </div>
    );
}

export default Home;