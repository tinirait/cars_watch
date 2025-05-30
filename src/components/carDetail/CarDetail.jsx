import { useParams, useNavigate } from "react-router-dom";
import styles from "./СarDetail.module.css";
//import cars from "../dataRequest/TestLocalData"; //TestData

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

function CarDetail() {
    const { id } = useParams();
    const car = cars.find((c) => c.id === parseInt(id));
    const navigate = useNavigate();

    if (!car) {
        return <p>Car not found.</p>;
    }

    return (
        <div className={styles.detail}>
            <button onClick={() => navigate(-1)} className={styles.back}>← Back</button>
            <h2>{car.title}</h2>
            <div className={styles.gallery}>
                {car.images.map((img, i) => (
                    <img key={i} src={img} alt={`${car.title} ${i + 1}`} />
                ))}
            </div>
            <p>{car.info}</p>
            {car.currentRate && <p>Current rate: ${car.currentRate.toLocaleString()}</p>}
            {car.buyNow && <p>Buy now: ${car.buyNow.toLocaleString()}</p>}
        </div>
    );
}

export default CarDetail;
