"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

interface ProductTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  isVisible: boolean;
}

export function ProductTour({ steps, onComplete, isVisible }: ProductTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentStep = steps[currentStepIndex];

  // ── Calculate Spotlight Position ──
  const updateSpotlight = useCallback(() => {
    if (!isVisible || !currentStep) return;
    const element = document.getElementById(currentStep.targetId);
    if (element) {
      // Scroll element into view if needed
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Use timeout to wait for scroll/layout to settle
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        setSpotlightRect(rect);
      }, 300);
    }
  }, [isVisible, currentStep]);

  useEffect(() => {
    updateSpotlight();
    window.addEventListener("resize", updateSpotlight);
    window.addEventListener("scroll", updateSpotlight);
    return () => {
      window.removeEventListener("resize", updateSpotlight);
      window.removeEventListener("scroll", updateSpotlight);
    };
  }, [updateSpotlight]);

  if (!isVisible || !currentStep || !spotlightRect) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // ── Tooltip Positioning Logic ──
  const getTooltipStyle = () => {
    const gap = 20;
    const { top, left, width, height, bottom, right } = spotlightRect;

    switch (currentStep.placement) {
      case "top":
        return { bottom: window.innerHeight - top + gap, left: left + width / 2, transform: "translateX(-50%)" };
      case "bottom":
        return { top: bottom + gap, left: left + width / 2, transform: "translateX(-50%)" };
      case "left":
        return { top: top + height / 2, right: window.innerWidth - left + gap, transform: "translateY(-50%)" };
      case "right":
        return { top: top + height / 2, left: right + gap, transform: "translateY(-50%)" };
      default:
        return { top: bottom + gap, left: left + width / 2, transform: "translateX(-50%)" };
    }
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* ── Spotlight Background (SVG Trick) ── */}
      <div 
        className="absolute inset-0 bg-slate-950/80 pointer-events-auto transition-all duration-500"
        style={{
          clipPath: `polygon(
            0% 0%, 
            0% 100%, 
            ${spotlightRect.left}px 100%, 
            ${spotlightRect.left}px ${spotlightRect.top}px, 
            ${spotlightRect.right}px ${spotlightRect.top}px, 
            ${spotlightRect.right}px ${spotlightRect.bottom}px, 
            ${spotlightRect.left}px ${spotlightRect.bottom}px, 
            ${spotlightRect.left}px 100%, 
            100% 100%, 
            100% 0%
          )`
        }}
      />

      {/* ── Highlight Border ── */}
      <div 
        className="absolute border-2 border-sky-500 rounded-xl transition-all duration-500 shadow-[0_0_20px_rgba(14,165,233,0.5)] pointer-events-none"
        style={{
          top: spotlightRect.top - 4,
          left: spotlightRect.left - 4,
          width: spotlightRect.width + 8,
          height: spotlightRect.height + 8,
        }}
      />

      {/* ── Tooltip ── */}
      <div 
        className="absolute pointer-events-auto w-72 sm:w-80 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 transition-all duration-500 z-50"
        style={getTooltipStyle() as any}
      >
        {/* Arrow */}
        <div 
          className={`absolute w-4 h-4 bg-white border-l border-t border-slate-200 rotate-45 
            ${currentStep.placement === 'bottom' ? '-top-2 left-1/2 -translate-x-1/2' : 
              currentStep.placement === 'top' ? '-bottom-2 left-1/2 -translate-x-1/2 border-l-0 border-t-0 border-r border-b' :
              currentStep.placement === 'right' ? '-left-2 top-1/2 -translate-y-1/2 border-l border-t-0 border-r-0 border-b' :
              '-right-2 top-1/2 -translate-y-1/2 border-l-0 border-t border-r border-b-0'
            }`}
        />

        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-sky-600 font-mono-custom text-[10px] font-bold">
            {currentStepIndex + 1}
          </span>
          <h4 className="font-mono-custom font-bold text-slate-800 text-sm uppercase tracking-wider">
            {currentStep.title}
          </h4>
        </div>

        <p className="text-xs text-slate-600 font-inter leading-relaxed mb-6">
          {currentStep.content}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button 
            onClick={() => onComplete?.()}
            className="text-[10px] font-mono-custom font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
          >
            Skip
          </button>
          
          <div className="flex gap-2">
            {currentStepIndex > 0 && (
              <button 
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono-custom font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-sky-500 text-white text-[10px] font-mono-custom font-bold hover:bg-sky-600 transition-all shadow-md shadow-sky-500/20"
            >
              {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
