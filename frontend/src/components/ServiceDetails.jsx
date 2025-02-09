import Image from 'next/image';
import React from 'react';
import ServiceReq from './ServiceReq';

const ServiceDetails = ({ ...data }) => {
  console.log(data);

  return (
    <div className="w-[90%] py-4 m-auto">
      <h1 className="text-center text-2xl text-blue-600 font-semibold">
        {data[0].title}
      </h1>
      <div className="flex flex-col md:flex-row justify-center py-4 gap-4">
        {/* Image and Description */}
        <div className="w-full md:w-1/2">
          <Image
            src={data[0].imgPath}
            alt={data[0].title}
            width={500}
            height={300}
            className="rounded-md"
          />
          <div className="py-4 px-4">
            {data[0].description}
          </div>
        </div>

        {/* Service Request Form */}
        <div className="w-full md:w-1/2">
          <ServiceReq {...data} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
