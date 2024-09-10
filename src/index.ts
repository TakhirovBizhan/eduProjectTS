
//first task
export const timeChecking = (arrivalTime: number, lateTime: number) => {

    if (arrivalTime > 24) {
        throw new Error('INVALID_ARGUMENT');
    }

    return (arrivalTime + lateTime) % 24
}

//second task
export const nameCutting = (fullName: string) => {
    const surname = fullName.split(' ')[0];
    const nameFirstLetter = fullName.split(' ')[1].split('')[0];
    const fatherNameFirstLetter = fullName.split(' ')[2].split('')[0];

    return `${surname} ${nameFirstLetter}. ${fatherNameFirstLetter}.`
}

//third task

export const lastWord = (fullWord: string) => {
    const lastItem = fullWord.split(' ').pop();
    if (lastItem) {
        return lastItem.length;
    }
    throw new Error('INVALID_ARGUMENT');
}

//fourth task

export const contrastMeasure = (L1: number, L2: number) => {
    if (L1 < L2) {
        throw new Error('INVALID_ARGUMENT');
    }
    const result = (L1 - L2) / (L1 + L2);
    return Math.round(result * 100) / 100;
}

//fifth task

interface IBracketPares {
    normal: string[],
    figure: string[],
    cube: string[],
}


export const bracketValidity = (bracketList: string) => {
    const BracketPares: IBracketPares = {
        normal: ['(', ')'],
        figure: ['{', '}'],
        cube: ['[', ']'],
    }
    const stack: string[] = [];
    const bracketArray = bracketList.split('');

    for (const bracket of bracketArray) {
        if (bracket === BracketPares.normal[0] || bracket === BracketPares.figure[0] || bracket === BracketPares.cube[0]) {
            stack.push(bracket)
        }
        else if (bracket === BracketPares.normal[1] && stack.at(-1) === BracketPares.normal[0]
            || bracket === BracketPares.figure[1] && stack.at(-1) === BracketPares.figure[0]
            || bracket === BracketPares.cube[1] && stack.at(-1) === BracketPares.cube[0]) {
            stack.pop()
        }
    }
    if (stack.length === 0) {
        return 'valid'
    } else {
        throw new Error('INVALID_ARGUMENT');
    }

}




