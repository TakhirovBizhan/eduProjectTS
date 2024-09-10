import { contrastMeasure } from '../src/index';

describe('Функция nameCutting', () => {
    it('Валидные данные', () => {
        expect(contrastMeasure(55555, 11111)).toBe(0.67);
    });
    it('Невалидные данные', () => {
        expect(() => contrastMeasure(20000, 21000)).toThrowError(/^INVALID_ARGUMENT$/);
    });

})