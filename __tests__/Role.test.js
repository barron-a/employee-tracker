const Role = require('../lib/Role');

test('creates a role object', () => {
    const role = new Role('Engineer', 100000, 'Engineering');

    expect(role.title).toEqual(expect.any(String));
    expect(role.salary).toEqual(expect.any(Number));
    expect(role.parentDept).toEqual(expect.any(String));
});