"use client";
import { Video } from "@/types/Video";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IVideoContext {
  current: Video | undefined;
  addVideo: (video: Video) => void;
  play: (video: Video) => void;
  videos: Video[];
}
const VideoContext = createContext<IVideoContext | undefined>(undefined);
export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("Video context not defined");
  }
  return context;
};
export function VideoProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [current, setCurrent] = useState<Video | undefined>(undefined);
  const addVideo = (video: Video) => {
    setVideos((prev) => [...prev, video]);
  };
  const play = (video: Video) => {
    setCurrent(video);
  };
  useEffect(() => {
    (async () => {
      const response = await (await fetch("/api/videos")).json();
      setVideos(response.files);
    })();
  }, []);
  return (
    <VideoContext.Provider value={{ videos, current, addVideo, play }}>
      {children}
    </VideoContext.Provider>
  );
}
