import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    isShuffling: boolean;

    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export const usePlayer = () => {
    return useContext(PlayerContext);
};

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    };

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    };

    function togglePlay() {
        setIsPlaying(!isPlaying);
    };

    function toggleLoop() {
        setIsLooping(!isLooping);
    };

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    };

    function setPlayingState(state) {
        setIsPlaying(state);
    };

    function clearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    };

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        };
    };

    function playPrevious() {
        if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        };
    }

    return (
        <PlayerContext.Provider 
            value={{
                episodeList, 
                currentEpisodeIndex, 
                isPlaying,
                hasNext,
                hasPrevious,
                isLooping,
                isShuffling,
                setPlayingState, 
                togglePlay, 
                toggleLoop,
                toggleShuffle,
                playList,
                play,
                playNext,
                playPrevious,
                clearPlayerState
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};