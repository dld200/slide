import React, { useState, useEffect } from "react";
import { TitleSlide } from "./components/slides/TitleSlide";
import { ApiPlatformSlide } from "./components/slides/ApiPlatformSlide";
import { UiFrameworkSlide } from "./components/slides/UiFrameworkSlide";
import { AiAgentSlide } from "./components/slides/AiAgentSlide";
import { MemoryMapSlide } from "./components/slides/MemoryMapSlide";
import { FutureSlide } from "./components/slides/FutureSlide";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { SlideType } from "./types";

const SLIDE_ORDER = [
  SlideType.TITLE,
  SlideType.API_PLATFORM,
  SlideType.UI_FRAMEWORK,
  SlideType.AI_AGENT,
  SlideType.MEMORY_MAP,
  SlideType.FUTURE,
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum distance to trigger a swipe
  const minSwipeDistance = 50;

  const goToNext = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDE_ORDER.length - 1));
  };

  const goToPrev = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  const currentSlideType = SLIDE_ORDER[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDE_ORDER.length) * 100;

  return (
    <div
      className="w-screen h-[100dvh] bg-presentation-bg text-presentation-text flex flex-col relative touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress Bar */}
      <div className="h-1 bg-slate-800 w-full  bottom-16 left-0 z-50">
        <div
          className="h-full bg-presentation-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Main Slide Area */}
      <main className="flex-1 relative">
        <TitleSlide isActive={currentSlideType === SlideType.TITLE} />
        <ApiPlatformSlide
          isActive={currentSlideType === SlideType.API_PLATFORM}
        />
        <UiFrameworkSlide
          isActive={currentSlideType === SlideType.UI_FRAMEWORK}
        />
        <AiAgentSlide isActive={currentSlideType === SlideType.AI_AGENT} />
        <MemoryMapSlide isActive={currentSlideType === SlideType.MEMORY_MAP} />
        <FutureSlide isActive={currentSlideType === SlideType.FUTURE} />
      </main>

      {/* Navigation Bar / Controls */}
      {/* <footer className="h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-4 text-slate-500 text-sm font-mono">
          <button 
            onClick={() => setShowOverview(!showOverview)}
            className="hover:text-presentation-accent transition-colors"
          >
            <Menu size={20} />
          </button>
          <span>Slide {currentSlideIndex + 1} / {SLIDE_ORDER.length}</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={goToPrev} 
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext} 
            disabled={currentSlideIndex === SLIDE_ORDER.length - 1}
            className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </footer> */}

      {/* Quick Overview Overlay */}
      {showOverview && (
        <div className="absolute bottom-20 left-6 bg-slate-800 border border-slate-700 rounded-lg p-2 shadow-2xl animate-in slide-in-from-bottom-2 z-50">
          {SLIDE_ORDER.map((type, idx) => (
            <button
              key={type}
              onClick={() => {
                setCurrentSlideIndex(idx);
                setShowOverview(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm rounded ${
                currentSlideIndex === idx
                  ? "bg-presentation-accent text-slate-900 font-bold"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {idx + 1}. {type.replace("_", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
