import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const Spotlight: React.FC = () => {
    const frame = useCurrentFrame();

    // 0s to 1s (0-30): off
    // 1s to 2s (30-60): turn on
    // 2s to 8s (60-240): pan left and right
    
    const intensity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const rotation = interpolate(Math.sin((frame - 60) / 40), [-1, 1], [-15, 15], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transformOrigin: 'top center',
            transform: `translate(-50%, 0) rotate(${frame < 60 ? 0 : rotation}deg)`,
            opacity: intensity,
        }}>
            {/* The Lamp source */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '40px',
                background: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 40px 20px rgba(255, 145, 90, 0.8)',
            }} />
            
            {/* The Beam */}
            <div style={{
                width: '1200px',
                height: '1500px',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 145, 90, 0.2) 40%, rgba(5, 5, 5, 0) 100%)',
                clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)',
                transform: 'translateX(-50%)',
                filter: 'blur(20px)',
            }} />
        </div>
    );
};
