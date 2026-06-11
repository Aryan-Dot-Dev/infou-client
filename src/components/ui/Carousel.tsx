import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export interface CarouselItemData {
  id: string | number;
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: string;
  image?: string;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 1000;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

interface CarouselItemProps {
  item: CarouselItemData;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: any;
  transition: any;
  renderContent?: (item: CarouselItemData, index: number) => React.ReactNode;
  itemClassName?: string;
  visibleItems?: number;
}

function CarouselItem({
  item,
  index,
  itemWidth,
  trackItemOffset,
  x,
  transition,
  renderContent,
  itemClassName = "",
  visibleItems = 1,
}: CarouselItemProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative flex flex-shrink-0 flex-col justify-between bg-white border border-zinc-200 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing p-6 shadow-sm select-none ${itemClassName}`}
      style={{
        width: itemWidth,
        rotateY: 0,
        transformStyle: "preserve-3d",
      }}
      transition={transition}
    >
      {renderContent ? renderContent(item, index) : (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-primary">
              {item.icon}
            </div>
            {item.code && (
              <span className="font-mono text-[10px] font-black tracking-widest text-zinc-400">
                {item.code}
              </span>
            )}
          </div>
          <div className="flex flex-col text-left">
            <h3 className="font-sans text-base sm:text-lg font-extrabold text-zinc-900 leading-tight mb-2">
              {item.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-zinc-500">
              {item.description}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}

interface CarouselProps {
  items: CarouselItemData[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  renderContent?: (item: CarouselItemData, index: number) => React.ReactNode;
  itemClassName?: string;
  visibleItems?: number;
}

export function Carousel({
  items = [],
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  renderContent,
  itemClassName,
  visibleItems = 1,
}: CarouselProps) {
  const containerPadding = 16;
  const trackWidth = baseWidth - containerPadding * 2;
  const itemWidth = (trackWidth - (visibleItems - 1) * GAP) / visibleItems;
  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
        right: 0,
      },
    };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full flex flex-col items-center"
      style={{ width: `${baseWidth}px` }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: trackWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
            renderContent={renderContent}
            itemClassName={itemClassName}
            visibleItems={visibleItems}
          />
        ))}
      </motion.div>
      <div className="flex w-full justify-center mt-6">
        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index
                ? "bg-primary w-5"
                : "bg-zinc-200 hover:bg-zinc-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{
                scale: activeIndex === index ? 1.2 : 1,
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
