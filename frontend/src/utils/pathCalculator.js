
export const pathCalculator = (path) => {
    const pathParts = path.split('/');
    const servicePath = `/${pathParts[2]}`;
    return servicePath;
}