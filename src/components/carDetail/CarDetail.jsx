import { useParams, useNavigate } from "react-router-dom";
import styles from "./СarDetail.module.css";
import cars from "../dataRequest/TestLocalData"; //TestData



function CarDetail() {
    const { id } = useParams();
    const car = cars.find((c) => c.id === parseInt(id));
    const navigate = useNavigate();

    if (!car) return <p>Car not found.</p>;

    return (
        <div className={styles.detail}>
            <button onClick={() => navigate(-1)} className={styles.back}>← Back</button>

            <div className={styles.header}>
                <h1 className={styles.title}>{car.title}</h1>
                <p className={styles.auctionDate}>Auction Date: {car.auctionDate}</p>
            </div>

            <div className={styles.gallery}>
                {car.images.map((img, i) => (
                    <img key={i} src={img} alt={`${car.title} ${i + 1}`} />
                ))}
            </div>

            <div className={styles.infoSection}>
                <h2 className={styles.sectionTitle}>Vehicle Information</h2>
                <p>{car.info}</p>

                {car.currentRate !== null && (
                    <p className={styles.price}>💰 Current rate: <strong>${car.currentRate.toLocaleString()}</strong></p>
                )}
                {car.buyNow !== null && (
                    <p className={styles.buyNow}>🛒 Buy now: <strong>${car.buyNow.toLocaleString()}</strong></p>
                )}

                <div className={styles.tags}>
                    {car.copart && <span className={styles.tagCopart}>Copart</span>}
                    {car.iaai && <span className={styles.tagIAAI}>IAAI</span>}
                </div>
            </div>
        </div>
    );
}

export default CarDetail;