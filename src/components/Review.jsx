import Icon from "./Icon";

const Review = ({comment, reviewer_name, reviewer_rating}) => {
    return <li className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <div className="bg-theme-badges rounded-full aspect-square h-[60px] text-2xl font-semibold flex items-center justify-center text-theme-btn">{reviewer_name[0]}</div>
            <div className="flex flex-col gap-1">
                <span className="font-medium">{reviewer_name}</span>
                <div className="flex gap-1">{[1,2,3,4,5].map((el, index) => <Icon key={index} name="star" className={el <= reviewer_rating ? "fill-theme-rating" : "fill-theme-badges"} />)}</div>
            </div>
        </div>
        <div className="text-theme-text">{comment}</div>
    </li>
}

export default Review;