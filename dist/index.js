//first task
export const timeChecking = (arrivalTime, lateTime) => {
    if (arrivalTime + lateTime >= 24) {
        return arrivalTime + lateTime - 24;
    }
    else {
        return arrivalTime + lateTime;
    }
};
//second task
export const nameCutting = (fullName) => {
    const surname = fullName.split(' ')[0];
    const nameFirstLetter = fullName.split(' ')[1].split('')[0];
    const fatherNameFirstLetter = fullName.split(' ')[1].split('')[0];
    return `${surname} ${nameFirstLetter} ${fatherNameFirstLetter}`;
};
//third task
export const lastWord = (fullWord) => {
    const lastItem = fullWord.split(' ').pop;
    if (lastItem) {
        return lastItem.length;
    }
    return null;
};
//fourth task
export const constartMeasure = (L1, L2) => {
    if (L1 < L2) {
        return null;
    }
    const result = (L1 - L2) / (L1 + L2);
    return Math.round(result * 100) / 100;
};
export const bracketValidity = (bracketList) => {
    const BracketPares = {
        normal: ['(', ')'],
        figure: ['{', '}'],
        cube: ['[', ']'],
    };
    const stack = [];
    const bracketArray = bracketList.split('');
    for (const bracket of bracketArray) {
        if (bracket === BracketPares.normal[0] || bracket === BracketPares.figure[0] || bracket === BracketPares.cube[0]) {
            stack.push(bracket);
        }
        else if (bracket === BracketPares.normal[1] && stack.at(-1) === BracketPares.normal[0]
            || bracket === BracketPares.figure[1] && stack.at(-1) === BracketPares.figure[0]
            || bracket === BracketPares.cube[1] && stack.at(-1) === BracketPares.figure[0]) {
            stack.pop();
        }
    }
    if (stack.length === 0) {
        return 'valid';
    }
    else {
        return 'invalid';
    }
};
