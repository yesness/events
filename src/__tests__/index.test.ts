import YNEvents from '..';

describe('YNEvents', () => {
    test('on and emit', () => {
        const events = new YNEvents();
        let count = 0;
        events.on('inc', (amount: number) => (count += amount));
        events.on('dec', (amount: number) => (count -= amount));
        events.emit('inc', 1);
        expect(count).toBe(1);
        events.emit('inc', 2);
        expect(count).toBe(3);
        events.emit('dec', 4);
        expect(count).toBe(-1);
    });

    test('once', () => {
        const events = new YNEvents();
        let count = 0;
        events.on('inc', (amount: number) => (count += amount));
        events.once('inc', (_amount: number) => count--);
        events.emit('inc', 5);
        expect(count).toBe(4);
        events.emit('inc', 5);
        expect(count).toBe(9);
    });

    test('off', () => {
        const events = new YNEvents();
        let count = 0;
        const cb1 = (amount: number) => (count += amount);
        const cb2 = (amount: number) => (count += amount * 10);
        const cb3 = (amount: number) => (count += amount * 100);
        events.on('inc', cb1);
        events.on('inc', cb2);
        events.on('inc', cb3);
        events.emit('inc', 5);
        expect(count).toBe(555);
        count = 0;
        events.off('inc', cb2);
        events.emit('inc', 5);
        expect(count).toBe(505);
        events.once('inc', cb2);
        events.once('inc', cb2);
        events.off('inc');
        count = 0;
        events.emit('inc', 5);
        expect(count).toBe(0);
    });
});
