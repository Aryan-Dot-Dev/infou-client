import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import './Counter.css';

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function normalizeNearInteger(num: number): number {
  const nearest = Math.round(num);
  const tolerance = 1e-9 * Math.max(1, Math.abs(num));
  return Math.abs(num - nearest) < tolerance ? nearest : num;
}

function getValueRoundedToPlace(value: number, place: number): number {
  const scaled = value / place;
  return Math.floor(normalizeNearInteger(scaled));
}

interface DigitProps {
  place: number | string;
  value: number;
  height: number;
  digitStyle?: React.CSSProperties;
}

function Digit({ place, value, height, digitStyle }: DigitProps) {
  const isDecimal = place === '.';
  const valueRoundedToPlace = isDecimal ? 0 : getValueRoundedToPlace(value, place as number);
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 120,
    damping: 18,
    mass: 0.8
  });

  useEffect(() => {
    if (!isDecimal) {
      animatedValue.set(valueRoundedToPlace);
    }
  }, [animatedValue, valueRoundedToPlace, isDecimal]);

  if (isDecimal) {
    return (
      <span className="counter-digit" style={{ height, ...digitStyle, width: 'fit-content' }}>
        .
      </span>
    );
  }

  return (
    <span className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  );
}

export interface CounterProps {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: (number | string)[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: string | number;
  containerStyle?: React.CSSProperties;
  counterStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
}

export function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'inherit',
  fontWeight = 'inherit',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle,
}: CounterProps) {
  const height = fontSize + padding;

  const defaultPlaces = useMemo(() => {
    if (places) return places;
    const strVal = value.toString();
    return [...strVal].map((ch, i, a) => {
      if (ch === '.') {
        return '.';
      } else {
        const dotIndex = a.indexOf('.');
        return 10 ** (dotIndex === -1 ? a.length - i - 1 : i < dotIndex ? dotIndex - i - 1 : -(i - dotIndex));
      }
    });
  }, [value, places]);

  const defaultCounterStyle: React.CSSProperties = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight,
    direction: "ltr"
  };

  const defaultTopGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
  };

  const defaultBottomGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
  };

  return (
    <span className="counter-container" style={containerStyle}>
      <span className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {defaultPlaces.map((place, idx) => (
          <Digit key={`${place}-${idx}`} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </span>
      <span className="gradient-container">
        <span className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></span>
        <span
          className="bottom-gradient"
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
        ></span>
      </span>
    </span>
  );
}

interface AnimatedCounterProps {
  value: string | number;
  fontSize?: number;
  mdFontSize?: number;
  fontWeight?: string | number;
  textColor?: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export function AnimatedCounter({
  value,
  fontSize = 32,
  mdFontSize,
  fontWeight = 'extrabold',
  textColor = 'inherit',
  className = '',
  gradientFrom = 'transparent',
  gradientTo = 'transparent',
}: AnimatedCounterProps) {
  const parsed = useMemo(() => {
    const str = String(value).trim();
    const regex = /^([^\d\.]*)(\d+(?:\.\d+)?)(.*)$/;
    const match = str.match(regex);
    if (match) {
      const [, prefix = '', numStr = '0', suffix = ''] = match;
      const num = parseFloat(numStr);
      return { prefix, num, suffix };
    }
    return { prefix: '', num: parseFloat(str) || 0, suffix: '' };
  }, [value]);

  const [size, setSize] = useState(fontSize);

  useEffect(() => {
    if (!mdFontSize) return;
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSize(mdFontSize);
      } else {
        setSize(fontSize);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fontSize, mdFontSize]);

  return (
    <span className={`inline-flex items-center tracking-tight ${className}`} style={{ color: textColor, fontWeight }}>
      {parsed.prefix ? (
        <span style={{ fontSize: size }} className="select-none mr-[-0.05em]">
          {parsed.prefix}
        </span>
      ) : null}
      <Counter
        value={parsed.num}
        fontSize={size}
        textColor={textColor}
        fontWeight={fontWeight}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        gradientHeight={Math.round(size * 0.16)}
        borderRadius={0}
        horizontalPadding={0}
        gap={size * 0.03}
      />
      {parsed.suffix ? (
        <span style={{ fontSize: size }} className="select-none ml-[0.05em]">
          {parsed.suffix}
        </span>
      ) : null}
    </span>
  );
}

export default AnimatedCounter;
