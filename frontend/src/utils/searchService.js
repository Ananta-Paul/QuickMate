import { services } from "@/data/Services";

export const searchService = (path) => {
  const data = services.filter((service) => service.route === path);

  return data;
};
