import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Haze } from './components/Haze';
import { SoundWave } from './components/SoundWave';
import { Particles } from './components/Particles';
import { MovingHead3D } from './components/MovingHead3D';

export const HeroStage: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
            <Haze />
            <Particles />

            {/* Moving head fixtures – left and right, slightly scaled and offset */}
            <MovingHead3D
                style={{ left: '0%', top: '0%', width: '50%', height: '75%' }}
                cameraZ={5}
            />
            <MovingHead3D
                style={{ left: '50%', top: '0%', width: '50%', height: '75%' }}
                cameraZ={5}
            />

            <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SoundWave />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
