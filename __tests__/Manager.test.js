const Manager = require("../lib/Manager");

test("Can set office number via constructor argument", () => {
  const oNumber = 302;
  const manager = new Manager("Foo", 1, "test@test.com", oNumber);
  expect(manager.officeNumber).toBe(oNumber);
});

test("getRole() should return \"Manager\"", () => {
  const role = "Manager";
  const manager = new Manager("Foo", 1, "test@test.com", 100);
  expect(manager.getRole()).toBe(role);
});

test("Can get office number via getOffice()", () => {
  const oNumber = 302;
  const manager = new Manager("Foo", 1, "test@test.com", oNumber);
  expect(manager.getOfficeNumber()).toBe(oNumber);
});