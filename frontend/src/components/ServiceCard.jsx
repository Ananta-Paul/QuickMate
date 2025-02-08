import Image from "next/image";
import React from "react";


const ServiceCard = ({ title, description, imgPath }) => {
    return (
        <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 rounded-lg bg-white flex flex-col items-center 
        text-center">
           <div className="w-full h-[200px] overflow-hidden rounded-lg">
                <Image 
                    src={imgPath} 
                    alt={title} 
                    width={300} 
                    height={200} 
                    className="w-full h-full object-cover " // Ensures full coverage
                />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );
};

export default ServiceCard;
