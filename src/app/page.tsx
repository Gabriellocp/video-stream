"use client";
import { Button } from "@/components/Button";
import { useVideoContext } from "@/providers/VideoProvider";
import { useState } from "react";
import styles from "./page.module.css";
export default function Home() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { current, addVideo } = useVideoContext();
  return (
    <div className={styles.page}>
      Faça o upload do seu vídeo
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0])}
        accept="video/mp4"
      />
      {file && (
        <Button
          onClick={async () => {
            const formData = new FormData();
            formData.append("file", file);
            await fetch("/api/upload", { method: "POST", body: formData });
            addVideo(file.name);
          }}
        >
          Selecionar arquivo
        </Button>
      )}
      {current && <video controls src={`/api/download/${current}`}></video>}
    </div>
  );
}
