"use client";
import { useVideoContext } from "@/providers/VideoProvider";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../Button";

export function VideoUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const { addVideo } = useVideoContext();
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("/api/upload", { method: "POST", body: formData }).then(
      (response) => {
        if (response.ok) {
          addVideo(selectedFile.name);
        }
      }
    );
  };
  const handleRemove = () => {
    setSelectedFile(undefined);
  };
  return (
    <>
      <input
        hidden
        ref={inputRef}
        onChange={handleSelect}
        type="file"
        accept="video/*"
      />
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 8,
        }}
      >
        <Button
          onClick={
            !selectedFile ? () => inputRef.current?.click() : handleUpload
          }
        >
          {!!selectedFile ? "Enviar" : "Selecionar arquivo"}
        </Button>
        {selectedFile && (
          <strong
            style={{
              color: "#666",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {selectedFile.name}
            <span onClick={handleRemove}>X</span>
          </strong>
        )}
      </div>
    </>
  );
}
