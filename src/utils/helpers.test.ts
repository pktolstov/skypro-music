import { formatTime } from "./helper";
describe('formatTime', () => {
    it('Добавление 0, если секунд меньше 10', () => {
        expect(formatTime(61)).toBe('1:01')
    })
    it('Корректность форматирования, если входные данные меньше 1 минуты', () => {
        expect(formatTime(59)).toBe('0:59')
    })
    it('Корректность форматирования, если входные данные 0', () => {
        expect(formatTime(0)).toBe('0:00')
    })
})