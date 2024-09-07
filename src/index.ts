
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


//fifth task
/*
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

let stack: string[] = [];

const bracketValidity = (bracketList: string) => {
    const bracketArray = bracketList.split('');

    for(let i: number; i < bracketArray; i++){
        if(bracketArray[i] === BracketPares.normal[0] || BracketPares.figure[0] || BracketPares.cube[0]){
            stack.push(bracketArray[i])
        }
    }

}

*/




