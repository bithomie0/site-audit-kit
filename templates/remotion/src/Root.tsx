import React from 'react';
import { Composition } from 'remotion';
import { BeforeAfter } from './BeforeAfter';

const defaults = {
  before: 'before.png',
  after: 'after.png',
  accent: '#ff8a4c',
  studio: 'YOUR STUDIO',
  beforeLabel: 'Before',
  afterLabel: 'After',
};

export const RemotionRoot: React.FC = () => (
  <>
    {/* Landscape — for portfolios, emails, websites */}
    <Composition
      id="BeforeAfter"
      component={BeforeAfter}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaults}
    />
    {/* Vertical — for Reels / TikTok / Stories */}
    <Composition
      id="BeforeAfterVertical"
      component={BeforeAfter}
      durationInFrames={180}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={defaults}
    />
  </>
);
