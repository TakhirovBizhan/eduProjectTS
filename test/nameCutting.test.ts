import { nameCutting } from '../src/index';

describe('Функция nameCutting', () => {
    it('Валидный аргумент', () => {
        expect(nameCutting('Тахиров Бижан Ильхомджонович')).toBe('Тахиров Б. И.');
    });
    it('Валидный аргумент', () => {
        expect(nameCutting('Верещагин Владислав Юрьевич')).toBe('Верещагин В. Ю.');
    });

})