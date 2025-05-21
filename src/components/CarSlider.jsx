import { useState, useEffect } from "react";
import Slider from "react-slick";
import styles from "./CarSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import './CarSlider.css';

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

const cars = [
    {
        id: 1,
        images: [
            "https://pluto.bid.car/0-41838864/2017-BMW-X5-5UXKR0C36H0V83396-1.jpg",
            "https://pluto.bid.car/0-41838864/2017-BMW-X5-5UXKR0C36H0V83396-2.jpg",
            "https://pluto.bid.car/0-41838864/2017-BMW-X5-5UXKR0C36H0V83396-16.jpg"
        ],
        title: "2019 BMW X5",
        info: "Odometer: 34,000 mi | 3.5L | Front wheel drive",
        timeRemaining: "27:24:15",
        currentRate: 12300,
        buyNow: 18500,
    },
    {
        id: 2,
        images: [
            "https://pluto.bid.car/0-41399099/2017-Audi-Q7-WA1LAAF70HD037732-1.jpg",
            "https://pluto.bid.car/0-41399099/2017-Audi-Q7-WA1LAAF70HD037732-3.jpg",
            "https://pluto.bid.car/0-41399099/2017-Audi-Q7-WA1LAAF70HD037732-8.jpg"
        ],
        title: "2021 Audi Q7",
        info: "Odometer: 12,000 mi | 2.0L | All wheel drive",
        timeRemaining: "01:12:05",
        currentRate: 10000,
        buyNow: null,
    },
    {
        id: 3,
        images: [
            "https://images.bid.cars/041958027_680794e49d276/1969-Plymouth-Road-Runner-RM23H9G130511-1.jpg",
            "https://images.bid.cars/041958027_680794e49d276/1969-Plymouth-Road-Runner-RM23H9G130511-13.jpg",
            "https://images.bid.cars/041958027_680794e49d276/1969-Plymouth-Road-Runner-RM23H9G130511-16.jpg"
        ],
        title: "1969 Plymouth Road Runner",
        info: "Odometer: 20,000 mi | 5.5L | Rear wheel drive",
        timeRemaining: "00:00:30",
        currentRate: null,
        buyNow: 25000,
    }
];

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

// ...весь импорт остаётся без изменений

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
                            <h3 className={styles.title}>{car.title}</h3>
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
