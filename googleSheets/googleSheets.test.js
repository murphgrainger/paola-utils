const { readAllRows } = require('.');

test('Should asynchronously lie about reading all of the rows', async () => {
    const greeting = await readAllRows();
    expect(greeting).toBe('Reading all the rows! :P');
});
