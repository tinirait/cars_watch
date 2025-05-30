import Agregator from "../agregator/Agregator";
import CarSlider from "../carSlider/CarSlider";
import styles from "./Home.module.css";
import DataRequest from "../dataRequest/DataRequest";


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
            <DataRequest />




        </div>
    );
}

export default Home;