"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { pathCalculator, searchService } from "@/utils/servicesHelper";
import ServiceDetails from "@/components/ServiceDetails";

const page = () => {
  //! Get the current path and shows the data of the service
  const pathname = usePathname();
  const servicePath = pathCalculator(pathname);
  const serviceData = searchService(servicePath);

  // console.log(serviceData);

  return (
    <div>
      <ServiceDetails {...serviceData} />
    </div>
  );
};

export default page;
