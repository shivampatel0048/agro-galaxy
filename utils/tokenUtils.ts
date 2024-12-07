// tokenUtils.ts
export const setToken = (token: string, rememberMe: boolean): void => {
  if (typeof window === "undefined") return;
  const expiresAt = rememberMe ? Date.now() + 7 * 24 * 60 * 60 * 1000 : null; // 1 week in milliseconds
  const tokenData = { token, expiresAt };

  if (rememberMe) {
    localStorage.setItem("token", JSON.stringify(tokenData));
  } else {
    sessionStorage.setItem("token", token);
  }
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
