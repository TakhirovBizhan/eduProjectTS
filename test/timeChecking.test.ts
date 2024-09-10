import { timeChecking } from '../src/index';


describe('Функция timeCheking', () => {
    it('2 валидных аргумента', () => {
        expect(timeChecking(3, 5)).toBe(8);
    });

    it('2 валидных аргумента больше 24 часов', () => {
        expect(timeChecking(22, 5)).toBe(3);
    });

    it('1 невалидный аргумент', () => {
        expect(() => timeChecking(100, 5)).toThrowError(/^INVALID_ARGUMENT$/);
    });

    it('2 аргумент больше 24', () => {
        expect(timeChecking(21, 100)).toBe(1);
    });

})
