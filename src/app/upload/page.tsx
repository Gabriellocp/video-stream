"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FilePicker } from "@/components/VideoUploader";
import { useHeaderChange } from "@/hooks/useHeaderChange";
import { useVideoContext } from "@/providers/VideoProvider";
import { useMemo, useState } from "react";

export default function Upload() {
  useHeaderChange("New video", "/");
  const [fields, setFields] = useState({
    name: "",
    description: "",
    file: undefined,
  });
  const [request, setRequest] = useState({
    loading: false,
    message: "",
    progress: 0,
  });
  const { addVideo } = useVideoContext();

  const handleChangeInput = (value: any, name: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpload = async () => {
    if (!isValidForm) {
      return;
    }
    const formData = new FormData();
    formData.append("description", fields.description);
    formData.append("name", fields.name);
    formData.append("file", fields.file!);
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("loadstart", (ev) => {
      setRequest((prev) => ({
        ...prev,
        loading: true,
      }));
    });
    xhr.upload.addEventListener("progress", (ev) => {
      const { total, loaded, lengthComputable } = ev;
      if (lengthComputable) {
        const finishedUpload = loaded === total;

        setRequest((prev) => ({
          ...prev,
          message: finishedUpload ? "Saving video" : "Uploading...",
          progress: (loaded / total) * 100,
        }));
      }
    });
    xhr.open("POST", "/api/upload", true);

    xhr.send(formData);
    xhr.addEventListener("load", () => {
      console.log(xhr.response);
      addVideo(JSON.parse(xhr.response).data);
      setRequest({
        loading: false,
        message: "",
        progress: 0,
      });
    });
    // fetch("/api/upload", { method: "POST", body: formData }).then(
    //   async (response) => {
    //     if (response.ok) {
    //       addVideo((await response.json()).data);
    //     }
    //   }
    // );
  };
  const isValidForm = useMemo(() => {
    return Object.values(fields).every((x) => !!x);
  }, [fields]);
  return (
    <div
      style={{
        width: 600,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Input
        onValueChange={handleChangeInput}
        name="name"
        value={fields.name}
      />
      <Input
        onValueChange={handleChangeInput}
        name="description"
        value={fields.description}
      />
      {request.loading && (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          {request.message} <br />
          Upload progress: {request.progress.toFixed(2)}%
        </p>
      )}
      <FilePicker onChange={(file) => handleChangeInput(file, "file")} />
      {isValidForm && (
        <Button loading={request.loading} onClick={handleUpload}>
          Upload
        </Button>
      )}
    </div>
  );
}
