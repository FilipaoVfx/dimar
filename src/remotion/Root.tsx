import { Composition } from 'remotion';
import { HeroStage } from './HeroStage';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="HeroStage"
				component={HeroStage}
				durationInFrames={240} // 8 seconds at 30 fps
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
