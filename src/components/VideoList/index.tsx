"use client";
import PlayButtonSVG from "@/assets/icons/play-button.svg";
import { useVideoContext } from "@/providers/VideoProvider";
import Image from "next/image";
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
      {videos.map((x: string, index: number) => (
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: current === x ? "#fff" : "#666",
            backgroundColor: current === x ? "#666" : "#fff",
            padding: 16,
            display: "flex",
            gap: 8,
            alignItems: "center",
            borderTop: index > 0 ? "1px solid #666" : "",
          }}
          key={x}
          onClick={() => play(x)}
        >
          {current === x && <Image src={PlayButtonSVG} alt="" />}
          {x}
        </div>
      ))}
    </div>
  );
}
