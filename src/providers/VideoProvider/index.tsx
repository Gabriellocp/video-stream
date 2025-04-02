"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const VideoContext = createContext<any>(null);
export const useVideoContext = () => useContext(VideoContext);
export function VideoProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>("");
  const addVideo = (name: string) => {
    setVideos((prev) => [...prev, name]);
  };
  const play = (name: string) => {
    setCurrent(name);
  };
  useEffect(() => {
    (async () => {
      const r = await (await fetch("/api/upload")).json();
      setVideos(r.files);
    })();
  }, []);
  return (
    <VideoContext.Provider value={{ videos, current, addVideo, play }}>
      {children}
    </VideoContext.Provider>
  );
}
