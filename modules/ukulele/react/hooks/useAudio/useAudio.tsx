import { useState, useEffect } from 'react';

/**
 * React hook for playing audio on website.
 *
 * NOOP on SSR, since virtual dom doesn't have Audio object
 *
 * @param url Audio url path
 * @returns state of hook and method to play/stop
 */
const useAudio = (url: string): [boolean, () => void, () => void] => {
    // SSR check
    if (typeof window === 'undefined') {
        return [false, () => {}, () => {}];
    }
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(0);

    const start = () => setPlaying(playing + 1);

    useEffect(() => {
        if (!!playing) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.pause();
        }
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(0));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(0));
        };
    }, []);

    return [!!playing, start, stop];
};

export default useAudio;
