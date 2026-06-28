import React from 'react';
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
} from 'remotion';

export type BeforeAfterProps = {
  before: string;
  after: string;
  accent: string;
  studio: string;
  beforeLabel: string;
  afterLabel: string;
};

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  before,
  after,
  accent,
  studio,
  beforeLabel,
  afterLabel,
}) => {
  const frame = useCurrentFrame();

  // gentle fade-in at the very start
  const introOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // the wipe: AFTER is revealed left-to-right between ~1.3s and ~3.5s
  const pct = interpolate(frame, [40, 105], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // studio name fades in near the end
  const studioOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pill: React.CSSProperties = {
    position: 'absolute',
    top: 48,
    fontFamily: 'sans-serif',
    fontWeight: 700,
    fontSize: 32,
    letterSpacing: 4,
    textTransform: 'uppercase',
    padding: '14px 28px',
    borderRadius: 14,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#0c1120', opacity: introOpacity }}>
      {/* BEFORE — full frame */}
      <AbsoluteFill>
        <Img
          src={staticFile(before)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* AFTER — clipped, revealed by the wipe */}
      <AbsoluteFill style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <Img
          src={staticFile(after)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* the moving divider line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pct}%`,
          width: 4,
          backgroundColor: accent,
          transform: 'translateX(-2px)',
          boxShadow: '0 0 30px rgba(0,0,0,.55)',
        }}
      />

      {/* labels */}
      <div
        style={{
          ...pill,
          left: 48,
          backgroundColor: 'rgba(12,17,32,.72)',
          color: '#cdd6e8',
          border: '1px solid #2a3650',
        }}
      >
        {beforeLabel}
      </div>
      <div style={{ ...pill, right: 48, backgroundColor: accent, color: '#1a0e06' }}>
        {afterLabel}
      </div>

      {/* studio sign-off */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          width: '100%',
          textAlign: 'center',
          opacity: studioOpacity,
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: 44,
          color: '#ffffff',
          letterSpacing: 2,
        }}
      >
        {studio}
      </div>
    </AbsoluteFill>
  );
};
