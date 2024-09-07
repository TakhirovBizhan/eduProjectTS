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
const BracketPares = {
    normal: ['(', ')'],
    figure: ['{', '}'],
    cube: ['[', ']'],
};
let stack = [];
const bracketValidity = (bracketList) => {
    const bracketArray = bracketList.split('');
};
