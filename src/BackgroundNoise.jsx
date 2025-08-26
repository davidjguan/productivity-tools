
import { useEffect, useState, useRef } from "react";
import "./index.css";

// soundConfigs outside the component for stable reference
const soundConfigs = [
    {
        label: '🔥',
        file: '/background sounds/fire.mp3',
        name: 'fire',
    },
    {
        label: '🐦‍⬛',
        file: '/background sounds/birds.mp3',
        name: 'bird',
    },
    {
        label: '🌙',
        file: '/background sounds/night ambience.mp3',
        name: 'night',
    },
    {
        label: '🚰',
        file: '/background sounds/water stream.mp3',
        name: 'stream',
    },
    {
        label: '🌊',
        file: '/background sounds/ocean waves.mp3',
        name: 'ocean',
        boost: 2,
    },
    {
        label: '⬜️',
        file: '/background sounds/white noise.mp3',
        name: 'white',
    }
];



function BackgroundNoise() {
    const soundRefs = useRef([]);
    const [volumes, setVolumes] = useState(Array(soundConfigs.length).fill(50));
    const [isPlaying, setIsPlaying] = useState(false);

    // Initialize Audio objects and set looping ONCE
    useEffect(() => {
        soundConfigs.forEach((cfg, i) => {
            if (!soundRefs.current[i]) {
                soundRefs.current[i] = new Audio(process.env.PUBLIC_URL + cfg.file);
                soundRefs.current[i].loop = true;
            }
        });
    }, []);

    // Update volume when volumes change
    useEffect(() => {
        soundConfigs.forEach((cfg, i) => {
            if (soundRefs.current[i]) {
                const boost = cfg.boost || 1;
                let vol = (volumes[i] / 100) * boost;
                if (vol > 1) vol = 1;
                soundRefs.current[i].volume = vol;
            }
        });
    }, [volumes]);

    // Play/pause logic
    useEffect(() => {
        soundConfigs.forEach((cfg, i) => {
            if (soundRefs.current[i]) {
                if (isPlaying) {
                    soundRefs.current[i].play().catch(() => {});
                } else {
                    soundRefs.current[i].pause();
                }
            }
        });
        return () => {
            soundRefs.current.forEach(sound => sound && sound.pause());
        };
    }, [isPlaying]);

    const handleVolumeChange = (i, value) => {
        const newVolumes = [...volumes];
        newVolumes[i] = Number(value);
        setVolumes(newVolumes);
    };

    return (
        <div className="background-noise-container">
            <h1>Background Noise</h1>
            <button onClick={() => setIsPlaying(p => !p)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            {soundConfigs.map((cfg, i) => (
                <div className="noiseControl" key={cfg.name}>
                    <span className="soundIcon">{cfg.label}</span>
                    <input
                        className="soundVolumeSlider"
                        type="range"
                        min="0"
                        max="100"
                        value={volumes[i]}
                        onChange={e => handleVolumeChange(i, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export default BackgroundNoise;