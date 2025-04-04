"use client";
import { VideoList } from "@/components/VideoList";
import { VideoWrapper } from "@/components/VideoWrapper";
import { useHeaderChange } from "@/hooks/useHeaderChange";

export default function Video() {
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
      <VideoWrapper />
    </div>
  );
}
