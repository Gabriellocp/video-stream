"use client";
import { VideoUploader } from "@/components/VideoUploader";
import { useVideoContext } from "@/providers/VideoProvider";
import { useState } from "react";
import styles from "./page.module.css";
export default function Home() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { current, addVideo } = useVideoContext();
  return (
    <div className={styles.page}>
      <VideoUploader />
      {current && <video controls src={`/api/download/${current}`}></video>}
    </div>
  );
}
