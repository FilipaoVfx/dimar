import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Haze: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Slow pulsing opacity
    const opacity = interpolate(
        Math.sin(frame / 30),
        [-1, 1],
        [0.4, 0.7]
    );

    return (
        <AbsoluteFill>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '150%',
                    height: '150%',
                    background: 'radial-gradient(circle at center, rgba(255, 145, 90, 0.15) 0%, rgba(5, 5, 5, 0) 70%)',
                    filter: 'blur(60px)',
                    opacity: opacity,
                }}
            />
        </AbsoluteFill>
    );
};
