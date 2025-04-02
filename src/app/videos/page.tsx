"use client";
import { VideoList } from "@/components/VideoList";
import { useHeaderChange } from "@/hooks/useHeaderChange";
import { useVideoContext } from "@/providers/VideoProvider";

export default function Video() {
  const { current } = useVideoContext();
  useHeaderChange("My videos", "/");
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flex: 1,
      }}
    >
      <VideoList />
      {current && <video controls src={`/api/download/${current}`}></video>}
    </div>
  );
}
