import { getCamp } from "@/api";
import BookingForm from "@/components/BookingForm";
import Characteristics from "@/components/Characteristics";
import Gallery from "@/components/Gallery";
import Icon from "@/components/Icon";
import Loader from "@/components/Loader";
import Review from "@/components/Review";
import ReviewList from "@/components/ReviewList";

import { formatPrice, galleryModifier } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Truck = () => {
    const { id } = useParams();
    const { hash } = useLocation();
    
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTruck = async () => {
            try {
                const data = await getCamp(id);
                setTruck(data);
                setError(null);
            } catch (err) {
                setError("Не вдалося завантажити дані 😢");
            } finally {
                setLoading(false);
            }
        };

        fetchTruck();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <section className="p-4 text-red-500">{error}</section>;
    }

    const { name, rating, location, reviews, price, gallery, description } = truck;

    return <>
        <section className="container !mb-[60px]">
            <h1 className="text-2xl font-semibold mb-2">{name}</h1>
            <div className="flex gap-4 items-center mb-4">
                <div className="flex items-center gap-1">
                    <Icon name="star" size={16} className="fill-theme-rating" />
                    <a href="#reviews" className="underline underline-offset-3 hover:no-underline">{rating}({reviews.length} Reviews)</a>
                </div>
                <div className="flex items-center gap-1">
                    <Icon name="map" size={16} />
                    <span>{location}</span>
                </div>
            </div>
            <h1 className="text-2xl font-semibold mb-7">{formatPrice(price)}</h1>
            <Gallery className="flex gap-12 mb-7" images={galleryModifier(truck)} />
            <p className="text-theme-text">{description}</p>
        </section>
        <section className="container">
            <nav>
                <ul className="flex gap-10 text-xl font-semibold border-b border-theme-gray-light">
                    <li className="relative"><a href="#features" className={!hash || hash === "#features" ? "after:absolute after:bottom-0 after:left-0 after:h-[5px] after:w-full after:translate-y-1/2 after:bg-theme-btn" : "pb-6 block"}>Features</a></li>
                    <li className="relative"><a href="#reviews" className={hash == "#reviews" ? "after:absolute after:bottom-0 after:left-0 after:h-[5px] after:w-full after:translate-y-1/2 after:bg-theme-btn" : "pb-6 block"}>Reviews</a></li>
                </ul>
            </nav>
            <div className="flex gap-10 pt-11">
                <div className="w-[631px] flex-none">
                    {(hash === "" || hash === "#features") && <div className="bg-theme-inputs rounded-[10px] py-11 px-13">
                        <Characteristics className="mb-[100px]" {...truck} />
                        <span className="text-xl font-semibold pb-6 mb-6 border-b border-theme-gray-light block">Vehicle details</span>
                        <ul className="flex flex-col gap-4 font-medium">
                            <li className="flex justify-between">Form <span className="capitalize">{truck.form}</span></li>
                            <li className="flex justify-between">Length <span className="capitalize">{truck.length}</span></li>
                            <li className="flex justify-between">Width <span className="capitalize">{truck.width}</span></li>
                            <li className="flex justify-between">Height <span className="capitalize">{truck.height}</span></li>
                            <li className="flex justify-between">Tank <span className="capitalize">{truck.tank}</span></li>
                            <li className="flex justify-between">Consumption <span className="capitalize">{truck.consumption}</span></li>
                        </ul>
                    </div>}
                    {hash == "#reviews" && <ReviewList reviews={reviews} />}
                </div>
                <BookingForm />
            </div>
        </section>
    </>;
};

export default Truck;
