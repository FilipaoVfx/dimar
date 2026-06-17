import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Haze } from './components/Haze';
import { Spotlight } from './components/Spotlight';
import { SoundWave } from './components/SoundWave';
import { Particles } from './components/Particles';

export const HeroStage: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
			<Haze />
			<Particles />
			<AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<SoundWave />
			</AbsoluteFill>
			<AbsoluteFill style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', top: '-20%' }}>
				<Spotlight />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
