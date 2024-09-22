import React from 'react';

function CustomCard({ imageOnRight = true }) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[rgba(50,61,109,0.5)] backdrop-blur-md rounded-2xl shadow-lg p-6 max-w-4xl mx-auto mb-8">
            {imageOnRight ? (
                <>
                    <CardContent />
                    <CardImage />
                </>
            ) : (
                <>
                    <CardImage />
                    <CardContent />
                </>
            )}
        </div>
    );
}

function CardContent() {
    return (
        <div className="w-full lg:w-1/2 mx-6 mb-4 lg:mb-0">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Special Edition Sneakers</h3>
                <span className="text-green-500 font-medium">$199</span>
            </div>
            <ProgressBar width="80%" />
            <ListItems />

            <div className="flex items-center justify-between my-4">
                <h3 className="text-white font-semibold">Luxury Leather Wallet</h3>
                <span className="text-green-500 font-medium">$99</span>
            </div>
            <ProgressBar width="50%" />
            <ListItems />
        </div>
    );
}

function ProgressBar({ width }) {
    return (
        <div className="mb-4">
            <div className="h-1 bg-gray-700 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width }}></div>
            </div>
        </div>
    );
}

function ListItems() {
    return (
        <ul className="space-y-2 text-white">
            <li className="flex justify-between">
                <span>Free Shipping</span>
                <span>Available</span>
            </li>
            <li className="flex justify-between">
                <span>Return Policy</span>
                <span>30 Days</span>
            </li>
            <li className="flex justify-between">
                <span>Stock Status</span>
                <span>In Stock</span>
            </li>
        </ul>
    );
}

function CardImage() {
    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full h-[40vh] lg:h-[50vh] bg-gradient-to-r to-blue-400 from-purple-500 rounded-2xl">
            <img
            src="https://designcode.io/images/illustrations/teamwork.svg"
            alt="Illustration"
            className="rounded-xl"
          />
            </div>
        </div>
    );
}

export default CustomCard;
