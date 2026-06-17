import React from 'react';
import { AbsoluteFill, useCurrentFrame, random } from 'remotion';

export const Particles: React.FC = () => {
    const frame = useCurrentFrame();

    // Generate 50 static random particles
    const particles = new Array(50).fill(0).map((_, i) => {
        return {
            x: random(`x-${i}`) * 100,
            y: random(`y-${i}`) * 100,
            size: random(`size-${i}`) * 4 + 2,
            speed: random(`speed-${i}`) * 1 + 0.5,
            offset: random(`offset-${i}`) * 100,
        };
    });

    return (
        <AbsoluteFill>
            {particles.map((p, i) => {
                // Drift upwards slowly
                const yPos = (p.y - (frame * p.speed) * 0.1) % 100;
                // Avoid negative modulo issues in CSS by keeping it in 0-100 correctly, but let's just make it simpler
                const actualY = yPos < 0 ? 100 + yPos : yPos;
                
                // Twinkle
                const opacity = (Math.sin((frame + p.offset) / 10) + 1) / 2 * 0.8;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${p.x}%`,
                            top: `${actualY}%`,
                            width: p.size,
                            height: p.size,
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px 2px rgba(255, 145, 90, 0.8)',
                            opacity: opacity,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
