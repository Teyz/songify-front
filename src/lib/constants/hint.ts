export const HintTypeToString = (hintType: number) => {
    switch (hintType) {
        case 1:
            return 'The musical style of the music is';
        case 2:
            return 'The music was released in';
    }
}