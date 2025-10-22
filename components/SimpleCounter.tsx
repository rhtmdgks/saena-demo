'use client';

import { MotionValue, motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  let y = useTransform(mv, latest => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return <motion.span style={{ ...style, y }}>{number}</motion.span>;
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
}

function Digit({ place, value, height }: DigitProps) {
  // Ensure value doesn't exceed 100
  const clampedValue = Math.min(value, 100);
  
  // Calculate the digit for this place
  let digitValue = Math.floor(clampedValue / place) % 10;
  
  let animatedValue = useSpring(digitValue, {
    stiffness: 100,
    damping: 30
  });

  useEffect(() => {
    animatedValue.set(digitValue);
  }, [animatedValue, digitValue]);

  const defaultStyle: React.CSSProperties = {
    height,
    position: 'relative',
    width: '1ch',
    fontVariantNumeric: 'tabular-nums',
    overflow: 'hidden'
  };

  return (
    <div style={defaultStyle}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

interface SimpleCounterProps {
  value: number;
  fontSize?: number;
  textColor?: string;
  fontWeight?: number;
}

export default function SimpleCounter({
  value,
  fontSize = 80,
  textColor = 'white',
  fontWeight = 900
}: SimpleCounterProps) {
  const height = fontSize;
  const places = [100, 10, 1];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    fontSize,
    color: textColor,
    fontWeight: fontWeight,
    lineHeight: 1
  };

  return (
    <div style={containerStyle}>
      {places.map(place => (
        <Digit key={place} place={place} value={value} height={height} />
      ))}
    </div>
  );
}
