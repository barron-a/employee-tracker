const Department = require('../lib/Department');

test('creates a department object', () => {
    const department = new Department('Design');

    expect(department.name).toEqual(expect.any(String));
});