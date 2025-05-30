import { useState, useEffect } from "react";
import Slider from "react-slick";
import styles from "./CarSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import './CarSlider.css';
import { Link } from "react-router-dom";

import cars from "../dataRequest/TestLocalData"; //TestData



const PrevArrow = (props) => (
    <div className={`${styles.arrow} ${styles.prev}`} onClick={props.onClick}>
        <ArrowLeft size={20} />
    </div>
);

const NextArrow = (props) => (
    <div className={`${styles.arrow} ${styles.next}`} onClick={props.onClick}>
        <ArrowRight size={20} />
    </div>
);



const parseTimeToSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
};

const formatTimeParts = (totalSeconds) => {
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return { d, h, m, s };
};



function CarSlider() {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const [remainingSeconds, setRemainingSeconds] = useState(
        cars.map((car) => parseTimeToSeconds(car.timeRemaining))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds((prev) =>
                prev.map((sec) => (sec > 0 ? sec - 1 : 0))
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.grid}>
            {cars.map((car, index) => {
                const secondsLeft = remainingSeconds[index];
                const { d, h, m, s } = formatTimeParts(secondsLeft);

                return (
                    <div key={car.id} className={styles.card}>
                        <div className={styles.sliderWrapper}>
                            <Slider {...settings} className={styles.imageSlider}>
                                {car.images.map((img, i) => (
                                    <div key={i}>
                                        <img
                                            src={img}
                                            alt={`${car.title} ${i + 1}`}
                                            className={styles.image}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.title}>
                                <Link to={`/car/${car.id}`} className={styles.link}>
                                    {car.title}
                                </Link>
                            </h3>
                            <p className={styles.info}>{car.info}</p>

                            <p className={styles.timer}>
                                {secondsLeft === 0 ? (
                                    <>
                                        <span className={styles.auctionOver}>⛔ Auction is over:</span>
                                        <span className={styles.timePartRed}>{d}d</span>
                                        <span className={styles.timePartRed}>{h}h</span>
                                        <span className={styles.timePartRed}>{m}m</span>
                                        <span className={styles.timePartRed}>{s}s</span>
                                    </>
                                ) : (
                                    <>
                                        ⏳ Auction ends in:
                                        <span className={styles.timePart}>{d}d</span>
                                        <span className={styles.timePart}>{h}h</span>
                                        <span className={styles.timePart}>{m}m</span>
                                        <span className={styles.timePart}>{s}s</span>
                                    </>
                                )}
                            </p>

                            <div className={styles.actions}>
                                {car.currentRate !== null && (
                                    <div className={styles.infoBox}>
                                        <div>Current rate:</div>
                                        <div>${car.currentRate.toLocaleString()}</div>
                                    </div>
                                )}
                                {car.buyNow !== null && (
                                    <div className={styles.infoBox}>
                                        <div>Buy now:</div>
                                        <div>${car.buyNow.toLocaleString()}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CarSlider;
