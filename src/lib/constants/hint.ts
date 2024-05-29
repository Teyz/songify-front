export const HintTypeToString = (hintType: number, hint: string) => {
    switch (hintType) {
        case 1:
            return `This track is ${hint} music`;
        case 2:
            return `The music was released in ${hint}`;
    }
}