"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Button";

export function FilePicker({
  onChange,
}: {
  onChange: (file: File | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(undefined);
  };
  useEffect(() => {
    onChange(selectedFile);
  }, [selectedFile]);
  return (
    <>
      <input
        hidden
        ref={inputRef}
        onChange={handleSelect}
        type="file"
        accept="video/*"
      />

      {!selectedFile && (
        <Button onClick={() => inputRef.current?.click()}>Select file</Button>
      )}
      {selectedFile && (
        <strong
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 16,
          }}
        >
          {selectedFile.name}
          <span
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleRemove}
          >
            X
          </span>
        </strong>
      )}
    </>
  );
}
