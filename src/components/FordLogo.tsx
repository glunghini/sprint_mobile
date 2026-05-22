import React from 'react';
import Svg, { Ellipse, Text as SvgText } from 'react-native-svg';

interface Props { size?: number; }

export function FordLogo({ size = 44 }: Props) {
  const w = size * 2.2;
  return (
    <Svg width={w} height={size} viewBox="0 0 110 50">
      <Ellipse cx="55" cy="25" rx="53" ry="23" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      <SvgText x="55" y="33" textAnchor="middle" fontStyle="italic" fontWeight="bold" fontSize="26" fill="#fff" letterSpacing="1">Ford</SvgText>
    </Svg>
  );
}
