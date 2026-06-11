export const API_BASE_URL = import.meta?.env?.VITE_BACKEND_URL || "https://rw4taxkwgg.execute-api.ap-south-1.amazonaws.com/dev";

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
