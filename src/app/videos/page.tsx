"use client";
import { Button } from "@/components/Button";
import { VideoList } from "@/components/VideoList";
import { VideoWrapper } from "@/components/VideoWrapper";
import { useHeaderChange } from "@/hooks/useHeaderChange";
import { useVideoContext } from "@/providers/VideoProvider";
import { useRouter } from "next/navigation";

export default function Video() {
  useHeaderChange("My videos", "/");
  const { videos } = useVideoContext();
  const router = useRouter();
  const handleAddVideo = () => {
    router.push("upload");
  };
  if (videos.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          margin: "auto",
          placeContent: "center",
        }}
      >
        <h1>Oops... It looks like you haven't added any videos yet.</h1>
        <Button onClick={handleAddVideo}>New video</Button>
      </div>
    );
  }
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
