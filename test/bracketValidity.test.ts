import { bracketValidity } from '../src/index';

describe('Функция nameCutting', () => {
    it('Валидные данные', () => {
        expect(bracketValidity("()()()")).toBe('valid');
    });
    it('Невалидные данные', () => {
        expect(() => bracketValidity("((()")).toThrowError(/^INVALID_ARGUMENT$/);
    });
    it('Разнообразная вложенность', () => {
        expect(bracketValidity("(({[][]}))")).toBe('valid');
    });

})