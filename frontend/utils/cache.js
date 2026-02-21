// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedData = (key) => {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
};

export const setCachedData = (key, data) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    );
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

export const clearCache = (key) => {
  if (typeof window === "undefined") return;

  if (key) {
    localStorage.removeItem(key);
  } else {
    // Clear all cache
    localStorage.clear();
  }
};
