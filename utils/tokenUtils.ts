// tokenUtils.ts
export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  const tokenData = { token };

  localStorage.setItem("token", JSON.stringify(tokenData));
  sessionStorage.setItem("token", token);
};

// tokenUtils.ts
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  // Check localStorage first
  const tokenDataStr = localStorage.getItem("token");
  if (tokenDataStr) {
    try {
      const { token, expiresAt } = JSON.parse(tokenDataStr);
      if (expiresAt && Date.now() > expiresAt) {
        // Token has expired
        localStorage.removeItem("token");
        return null;
      }
      return token;
    } catch (e: unknown) {
      // Invalid JSON, remove the corrupted token
      localStorage.removeItem("token");
      console.error("Error parsing token data:", e);
      return null;
    }
  }

  // Then check sessionStorage
  const sessionToken = sessionStorage.getItem("token");
  return sessionToken ?? null;
};

export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
