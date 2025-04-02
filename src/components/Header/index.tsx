"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [headerDetails, setHeaderDetails] = useState({
    title: "",
    previous: "",
  });
  useEffect(() => {
    const handleTitle = (e: any) => {
      setHeaderDetails(e.detail);
    };
    window.addEventListener("header-title", handleTitle);
    return () => {
      window.removeEventListener("header-title", handleTitle);
    };
  }, []);
  const router = useRouter();
  const handleBack = () => {
    router.replace(headerDetails.previous);
  };
  return (
    <header
      style={{
        backgroundColor: "#fff",
        height: 80,
        display: "flex",
        alignItems: "center",
        padding: 32,
        gap: 8,
      }}
    >
      {headerDetails.previous && (
        <span
          style={{ color: "#000", cursor: "pointer" }}
          onClick={handleBack}
        >{`<`}</span>
      )}
      <strong style={{ color: "#555", fontSize: 24 }}>
        {headerDetails.title}
      </strong>
    </header>
  );
}
