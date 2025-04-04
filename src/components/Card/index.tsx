import { ReactNode } from "react";

export function Card({
  title,
  description,
  onClick,
  children,
}: {
  title: string;
  description: string;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 8,
        gap: 16,
        width: 320,
        alignItems: "flex-start",
        cursor: "pointer",
        height: "fit-content",
      }}
      onClick={onClick}
    >
      {children}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <strong style={{ fontSize: 20, fontWeight: "700", color: "#777" }}>
          {title}
        </strong>
        <p style={{ fontSize: 14, color: "#999" }}>{description}</p>
      </div>
    </div>
  );
}
