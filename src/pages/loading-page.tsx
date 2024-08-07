import { useEffect, useState } from "react";

export const LoadingPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div
      className="disable-selection"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        color: "white",
        height: "100vh",
        width: "100vw",
        fontSize: "3rem",
        position: "absolute",
        zIndex: "9999999",
        transition: "transform 0.3s ease-out",
        transform: `${loaded ? "translateY(-100%)" : "translateY(0)"}`,
      }}
    >
      Loading...
    </div>
  );
};
