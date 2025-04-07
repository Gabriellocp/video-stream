"use client";
import PlayButtonSVG from "@/assets/icons/play-button.svg";
import { useVideoContext } from "@/providers/VideoProvider";
import { Video } from "@/types/Video";
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
        overflowY: "scroll",
        width: "300px",
        backgroundColor: "#fff",
      }}
    >
      {videos.map((x: Video, index: number) => (
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: current?._id === x._id ? "#fff" : "#666",
            backgroundColor: current?._id === x._id ? "#666" : "#fff",
            padding: 16,
            display: "flex",
            gap: 8,
            alignItems: "center",
            borderTop: index > 0 ? "1px solid #666" : "",
          }}
          key={x._id}
          onClick={() => play(x)}
        >
          {current?._id === x._id && <Image src={PlayButtonSVG} alt="" />}
          {x.name}
        </div>
      ))}
    </div>
  );
}
