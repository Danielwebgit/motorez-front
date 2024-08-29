const getSubdomain = (): string => {
    const host = typeof window !== 'undefined' ? window.location.host : '';
    const subdomain = host.split('.')[0];
    return subdomain;
  };
  
  const baseUrl = (): string => {
    const subdomain = getSubdomain();
    return `http://${subdomain}.localhost:8988`;
  };
  
  export default baseUrl;