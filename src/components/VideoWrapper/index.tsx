import { useVideoContext } from "@/providers/VideoProvider";

export function VideoWrapper() {
  const { current } = useVideoContext();
  if (!current) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        flex: 1,
        gap: 16,
      }}
    >
      <video
        style={{
          width: "80%",
          height: "auto",
          objectFit: "contain",
          placeSelf: "center",
        }}
        controls
        src={`/api/videos/${current.file}`}
      ></video>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          color: "#333",
          padding: 24,
          flex: 1,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>About</h2>
          <strong>{`Sent at: ${new Date(current.createdAt).toLocaleString(
            "en-US"
          )}`}</strong>
        </div>
        <p>
          {current.description ?? "This video does not contain any detail."}
        </p>
      </div>
    </div>
  );
}
