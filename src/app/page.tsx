"use client";
import PlaySVG from "@/assets/icons/play.svg";
import VideoSVG from "@/assets/icons/video.svg";
import { Card } from "@/components/Card";
import { useHeaderChange } from "@/hooks/useHeaderChange";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
export default function Home() {
  useHeaderChange("My memories");
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
        >
          <Image src={VideoSVG} alt="" height={70} />
        </Card>
        <Card
          title="My videos"
          description="Remember one of your favourite moments here!"
          onClick={() => handleNavigate("/videos")}
        >
          <Image src={PlaySVG} alt="" height={70} />
        </Card>
      </div>
    </div>
  );
}
