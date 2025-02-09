import { services } from "../data/Services"

export const searchService = (path) => {
    const data = services.filter(service => service.route === path)
    return data;
}


export const pathCalculator = (path) => {
    const pathParts = path.split('/');
    const servicePath = `/${pathParts[2]}`;
    return servicePath;
}