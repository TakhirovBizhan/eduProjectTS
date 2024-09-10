import { lastWord } from '../src/index';

describe('Функция nameCutting', () => {
    it('Строка из 3 слов', () => {
        expect(lastWord('Тахиров Бижан ученик')).toBe(6);
    });
    it('1 слово', () => {
        expect(lastWord('Федор')).toBe(5);
    });

})