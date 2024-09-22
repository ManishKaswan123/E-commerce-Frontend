import React from "react";
import ReactStars from "react-rating-stars-component";
import ProfilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 w-[20%]">
            <img src={ProfilePng} alt="User" className="w-12 h-auto rounded-full" />
            <div>
                <p className="font-semibold text-black">{review?.name}</p>
                <ReactStars {...options} />
                <span className="text-black">{review?.comment}</span>
            </div>
        </div>
    );
};

export default ReviewCard;
