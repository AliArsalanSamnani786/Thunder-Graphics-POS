const API_PREFIX = "/api/v1";

function withProtocol(value: string) {
  if (value.includes("://")) {
    return value;
  }

  if (/^(localhost|127\.0\.0\.1|\[::1\])(?::|\/|$)/.test(value)) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

function withoutTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function stripApiPrefix(pathname: string) {
  const path = withoutTrailingSlash(pathname);

  if (!path || path === "/") {
    return "";
  }

  const apiPrefixIndex = path.indexOf(API_PREFIX);
  const apiPrefixEndIndex = apiPrefixIndex + API_PREFIX.length;
  const hasApiPrefixBoundary = path.length === apiPrefixEndIndex || path[apiPrefixEndIndex] === "/";

  if (apiPrefixIndex >= 0 && hasApiPrefixBoundary) {
    return withoutTrailingSlash(path.slice(0, apiPrefixIndex));
  }

  if (path === "/api" || path.endsWith("/api")) {
    return withoutTrailingSlash(path.slice(0, -"/api".length));
  }

  return path;
}

export function normalizeApiBaseUrl(value: string) {
  const normalized = new URL(withProtocol(value.trim()));
  const basePath = stripApiPrefix(normalized.pathname);

  return withoutTrailingSlash(`${normalized.origin}${basePath}`);
}

export function resolveApiBaseUrl(request: Request) {
  const configuredApiUrl = [process.env.API_URL, process.env.NEXT_PUBLIC_API_URL].find((value) => value?.trim());

  return normalizeApiBaseUrl(configuredApiUrl ?? new URL(request.url).origin);
}

export function buildApiUrl(baseUrl: string, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizeApiBaseUrl(baseUrl)}${API_PREFIX}${normalizedPath}`;
}
