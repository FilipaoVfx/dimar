import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const SoundWave: React.FC = () => {
    const frame = useCurrentFrame();

    // Create 3 concentric rings that loop every 60 frames
    return (
        <div style={{ position: 'relative', width: 0, height: 0, top: '20%' }}>
            {[0, 20, 40].map((delay, index) => {
                const localFrame = (frame + delay) % 60;
                
                const scale = interpolate(localFrame, [0, 60], [0.5, 3]);
                const opacity = interpolate(localFrame, [0, 40, 60], [0, 0.5, 0]);

                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            border: '2px solid rgba(255, 145, 90, 1)',
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            opacity: opacity,
                            filter: 'blur(2px)',
                        }}
                    />
                );
            })}
        </div>
    );
};
