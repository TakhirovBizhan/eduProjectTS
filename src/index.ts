
//first task
export const timeChecking = (arrivalTime: number, lateTime: number) => {
    if (arrivalTime + lateTime >= 24) {
        return arrivalTime + lateTime - 24
    } else {
        return arrivalTime + lateTime
    }
}

//second task
export const nameCutting = (fullName: string) => {
    const surname = fullName.split(' ')[0];
    const nameFirstLetter = fullName.split(' ')[1].split('')[0];
    const fatherNameFirstLetter = fullName.split(' ')[1].split('')[0];

    return `${surname} ${nameFirstLetter} ${fatherNameFirstLetter}`
}

//third task

export const lastWord = (fullWord: string) => {
    const lastItem = fullWord.split(' ').pop;
    if (lastItem) {
        return lastItem.length;
    }
    return null;
}

//fourth task

export const constartMeasure = (L1: number, L2: number) => {
    if(L1 < L2){
        return null;
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

const BracketPares: IBracketPares = {
    normal: ['(', ')'],
    figure: ['{', '}'],
    cube: ['[', ']'],
}

const stack: string[] = [];

export const bracketValidity = (bracketList: string) => {
    const bracketArray = bracketList.split('');

    for(const bracket of bracketArray) {
        if(bracket === BracketPares.normal[0] || bracket === BracketPares.figure[0] || bracket === BracketPares.cube[0]) {
            stack.push(bracket)
        }
        console.log(stack)
    }

}




