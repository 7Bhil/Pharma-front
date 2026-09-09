// Service Worker Registration Helper for Vite
export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[PharmaConnect PWA] Service Worker registered:", registration.scope);
        })
        .catch((error) => {
          console.error("[PharmaConnect PWA] Service Worker registration failed:", error);
        });
    });
  }
}
