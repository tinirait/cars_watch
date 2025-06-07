import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import styles from "./СarDetail.module.css";
import cars from "../dataRequest/TestLocalData";

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

function CarDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const car = cars.find((c) => c.id === parseInt(id));
    const [mainSlider, setMainSlider] = useState(null);
    const [thumbSlider, setThumbSlider] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(0); // Новый state для подсветки

    if (!car) return <p>Car not found.</p>;

    const mainSettings = {
        asNavFor: thumbSlider,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ref: setMainSlider,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (_, next) => setCurrentIndex(next), // обновляем текущий индекс
    };

    const thumbSettings = {
        asNavFor: mainSlider,
        arrows: false,
        dots: false,
        slidesToShow: Math.min(car.images.length, 6),
        swipeToSlide: true,
        focusOnSelect: true,
        ref: setThumbSlider,
        centerMode: false, // отключаем центрирование, чтобы не показывались "кусочки"
        variableWidth: true, // фиксированная ширина слайдов
        infinite: false, // по желанию — отключить бесконечный цикл, чтобы крайние слайды не повторялись
        // добавь padding: 0, если нужно, но slick сам обычно не даёт отступов

    };


    const lightboxSlides = car.images.map((src) => ({ src }));

    return (
        <div className={styles.detail}>
            <button onClick={() => navigate(-1)} className={styles.back}>
                ← Back
            </button>

            <h1 className={styles.title}>{car.title}</h1>
            <p className={styles.auctionDate}>Auction Date: {car.auctionDate}</p>

            <div className={styles.sliderWrapper}>
                <div className={styles.sliderHoverArea}>
                    <Slider {...mainSettings} className={styles.mainSlider}>
                        {car.images.map((img, i) => (
                            <div key={i}>
                                <img
                                    src={img}
                                    alt={`Slide ${i}`}
                                    className={styles.sliderImage}
                                    onClick={() => setLightboxIndex(i)}
                                    style={{ cursor: "grab", transition: "transform 0.3s ease" }}
                                />
                            </div>
                        ))}
                    </Slider>

                    <Slider {...thumbSettings} className={styles.thumbSlider}>
                        {car.images.map((img, i) => (
                            <div key={i}>
                                <img
                                    src={img}
                                    alt={`Thumbnail ${i}`}
                                    className={`${styles.thumbImage} ${i === currentIndex ? styles.activeThumb : ""}`}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h2 className={styles.sectionTitle}>Vehicle Information</h2>
                <p>{car.info}</p>

                {car.currentRate !== null && (
                    <p className={styles.price}>
                        💰 Current rate: <strong>${car.currentRate.toLocaleString()}</strong>
                    </p>
                )}
                {car.buyNow !== null && (
                    <p className={styles.buyNow}>
                        🛒 Buy now: <strong>${car.buyNow.toLocaleString()}</strong>
                    </p>
                )}

                <div className={styles.tags}>
                    {car.copart && <span className={styles.tagCopart}>Copart</span>}
                    {car.iaai && <span className={styles.tagIAAI}>IAAI</span>}
                </div>
            </div>

            <Lightbox
                open={lightboxIndex >= 0}
                close={() => setLightboxIndex(-1)}
                index={lightboxIndex}
                slides={lightboxSlides}
                plugins={[Fullscreen, Thumbnails, Zoom]}
                animation={{ fade: 200, swipe: 550 }}
                zoom={{ maxZoomPixelRatio: 5, zoomInMultiplier: 2 }}
                on={{
                    view: ({ index }) => setLightboxIndex(index),
                }}
                thumbnails={{
                    vignette: false,
                    showToggle: false,
                    border: 0,
                    padding: 4,
                    gap: 4,
                    imageFit: "cover",
                    scrollSnap: false,
                    width: 80,
                    height: 60,
                    carousel: {
                        finite: true,
                        preload: 0,
                        spacing: 4,
                        center: false,       // ✅ Не центрирует активную
                        autoScroll: false,   // ✅ Не скроллит к активной
                        // 👇 ЭТО КЛЮЧЕВОЙ ПАРАМЕТР
                        shift: 0,            // ✅ Отключает смещение активной миниатюры
                    },
                }}
                render={{
                    slideHeader: () =>
                        lightboxIndex >= 0 ? (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    left: "16px",
                                    color: "#fff",
                                    background: "rgba(0, 0, 0, 0.5)",
                                    padding: "4px 10px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    zIndex: 1000,
                                }}
                            >
                                {lightboxIndex + 1} / {lightboxSlides.length}
                            </div>
                        ) : null,
                }}
            />
        </div>
    );
}

export default CarDetail;
