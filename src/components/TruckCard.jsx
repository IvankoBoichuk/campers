import { NavLink } from "react-router-dom";
import { toggle, selectIsWishlisted } from "@/redux/wishlist/wishlistSlice";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import Characteristics from "./Characteristics";
import { cn, formatPrice } from "@/lib/utils";
import { useCallback } from "react";

const TruckCard = ({ truck: { id, name, price, reviews, rating, location, description, gallery, ...etc } }) => {
    const dispatch = useDispatch();
    const active = useSelector(selectIsWishlisted(id));

    const onClick = useCallback(() => {
        // оптимістично перемикаємо
        dispatch(toggle(id));
        // (опційно) тригер синка з бекендом з debounce
        // dispatch(syncWishlist());
    }, [dispatch, id]);

    return <div className="border border-theme-gray-light rounded-[20px] flex gap-6 p-6">
        <img src={gallery[0].thumb} alt={name} width={292} height={320} className="rounded-[10px] object-cover object-center" />
        <div className="w-full flex flex-col">
            <div className="text-2xl font-semibold flex items-center gap-3 mb-2">
                <div className="flex-1 overflow-hidden">
                    <h2>{name}</h2>
                </div>
                <span>{formatPrice(price)}</span>
                <button type="button"
                    onClick={onClick}
                    aria-pressed={active}
                    aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
                    title={active ? "Remove from wishlist" : "Add to wishlist"}
                    className={cn({
                        "[&>svg]:fill-theme-btn": active,
                    })}>
                    <Icon name="heart" size={26} />
                </button>
            </div>
            <div className="flex gap-4 items-center mb-6">
                <div className="flex items-center gap-1">
                    <Icon name="star" size={16} className="fill-theme-rating" />
                    <span>{rating}({reviews.length} Reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon name="map" size={16} />
                    <span>{location}</span>
                </div>
            </div>
            {/* truncate */}
            <div className="text-theme-text mb-6 line-clamp-1">
                {description}
            </div>
            <Characteristics className="mb-6" {...etc} />
            <NavLink className="block w-max py-4 px-14 rounded-full font-medium text-white bg-theme-btn hover:bg-theme-btn-hover" to={id}>Show more</NavLink>
        </div>
    </div>
}

export default TruckCard;