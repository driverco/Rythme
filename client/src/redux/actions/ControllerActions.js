export const PLAYSTOP = "PLAYSTOP";
export const ENDGAME = "ENDGAME";
export const CHANGEBPM = "CHANGEBPM";
export const TOGGLEPATTERNVIEW = "TOGGLEPATTERNVIEW";
export const TOGGLEPATTERNEDIT = "TOGGLEPATTERNEDIT";
export const SETPATTERN = "SETPATTERN";
export const SETPATTERNDISPLAY = "SETPATTERNDISPLAY";
export const TOGGLEDEMOPLAY = "TOGGLEDEMOPLAY";
export const SETREPEATTIMES = "SETREPEATTIMES";
export const TOGGLEPATTERNBEAT = "TOGGLEPATTERNBEAT";
export const ADDMUSICALTIME = "ADDMUSICALTIME";
export const SETPLAYERTRANSLATIONS = "SETPLAYERTRANSLATIONS";
export const STOP = 0;
export const PLAYING = 1;
export const FINISHED = 2;
export const RESTART = 3;


export const playStop = () => ({
    type: PLAYSTOP
});
export const endGame = () => ({
    type: ENDGAME
});
export const changeBPM = (bpm) => ({
    type: CHANGEBPM,
    bpm
});
export const togglePatternView = () => ({
    type: TOGGLEPATTERNVIEW
});
export const togglePatternEdit = () => ({
    type: TOGGLEPATTERNEDIT
});
export const setPattern = (pattern) => ({
    type: SETPATTERN,
    pattern
});
export const setPatternDisplay = (pattern) => ({
    type: SETPATTERNDISPLAY,
    pattern
});
export const toggleDemoPlay = () => ({
    type: TOGGLEDEMOPLAY
});
export const setRepeatTimes = (repeatTimes) => ({
    type: SETREPEATTIMES,
    repeatTimes
});
export const togglePatternBeat = (instrumentNumber,beatPos) => ({
    type: TOGGLEPATTERNBEAT,
    instrumentNumber,
    beatPos
});
export const addMusicalTime = () => ({
    type: ADDMUSICALTIME
});
export const setPlayerTranslations = (playerTranslations) => ({
    type: SETPLAYERTRANSLATIONS,
    playerTranslations
});





