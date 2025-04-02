"use client";
import { Card } from "@/components/Card";
import { useHeaderChange } from "@/hooks/useHeaderChange";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
export default function Home() {
  useHeaderChange("Memory keeper");
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <div className={styles.page}>
      <div style={{ display: "flex", gap: 16 }}>
        <Card
          title="New video"
          description="Add a new memory to watch later"
          onClick={() => handleNavigate("/upload")}
        />
        <Card
          title="My videos"
          description="Remember one of your favourite moments here!"
          onClick={() => handleNavigate("/videos")}
        />
      </div>
    </div>
  );
}
