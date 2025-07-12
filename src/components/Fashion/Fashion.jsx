import { useRef, useState } from "react";
import ParallaxImg from "../../assets/banner/banner.jpg";
import { Parallax } from "react-parallax";
import fashionVideo from "../../assets/fashion-video/fashion.mp4";
import videoThumbnail from "../../assets/banner/banner.jpg";

const Fashion = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="mt-20">
      <Parallax
        blur={1}
        strength={400}
        bgImage={ParallaxImg}
        bgImageAlt="Fashion Background"
        bgImageStyle={{
          filter: "grayscale(90%)",
          opacity: 0.1,
        }}
      >
        <div className="relative h-[600px] flex items-center justify-center">
          <div className="relative h-3/4 w-4/5 overflow-hidden">
            <video
              ref={videoRef}
              src={fashionVideo}
              muted
              loop
              playsInline
              controls
              poster={videoThumbnail}
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Fashion;
