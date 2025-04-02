"use client";
import { VideoUploader } from "@/components/VideoUploader";
import { useHeaderChange } from "@/hooks/useHeaderChange";

export default function Upload() {
  useHeaderChange("New video", "/");
  return (
    <div style={{ width: 600 }}>
      <VideoUploader />
    </div>
  );
}
