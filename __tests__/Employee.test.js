const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Adam', 'Barron', 'Engineer');

    expect(employee.firstName).toEqual(expect.any(String));
    expect(employee.lastName).toEqual(expect.any(String));
    expect(employee.role).toEqual(expect.any(String));
});