import React from "react";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/Services";
import Link from "next/link";

const Page = () => {
  return (
    <div className="py-8 px-4">
      {/* Section Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800">
        Our Services
      </h2>

      {/* Responsive Grid Layout - Matches Navbar Breakpoints */}
      <div className="max-w-7xl py-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Link href={`/services/${service.route}`} key={index}>
            <ServiceCard {...service} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
