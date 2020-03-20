import { useState, useEffect } from 'react';

/**
 * React hook for playing audio on website. 
 * 
 * NOOP on SSR, since virtual dom doesn't have Audio object
 * 
 * @param url Audio url path
 * @returns state of hook and method to play/pause
 */
const useAudio = (url: string): [boolean, () => void] => {
    // SSR check
    if (typeof window === 'undefined') {
        return [false, () => {}];
    }
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

export default useAudio;
