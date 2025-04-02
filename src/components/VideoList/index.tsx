"use client";
import { useVideoContext } from "@/providers/VideoProvider";

export function VideoList() {
  const { videos, play, current } = useVideoContext();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        border: "2px solid transparent",
        overflow: "hidden",
        width: "300px",
        backgroundColor: "#fff",
      }}
    >
      {videos.map((x: string) => (
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: current === x ? "#fff" : "#666",
            backgroundColor: current === x ? "#666" : "#fff",
            padding: 16,
            display: "flex",
            gap: 8,
          }}
          key={x}
          onClick={() => play(x)}
        >
          {x}
          <span style={{ color: "green" }}>{current === x && "Playing"}</span>
        </div>
      ))}
    </div>
  );
}
