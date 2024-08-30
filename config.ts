const getSubdomain = (): string => {
  const host = typeof window !== "undefined" ? window.location.host : "";
  const split = host.split(".");

  if (split.length > 1) {
    return split[0] + ".";
  }

  return "";
};

const baseUrl = (): string => {
  const subdomain = getSubdomain();
  return `http://${subdomain}localhost:8988`;
};

export default baseUrl;
