const Employee = require("../lib/Employee");
const { TestScheduler } = require("jest");

test("Create an Employee", () => {
  const employee = new Employee();
  expect(typeof employee).toBe("object");
});

test("can set a name", () => {
  const employee = new Employee("Zak");
  expect(employee.name).toBe("Zak");
});

test("Can set an id ", () => {
  const id = "id100";
  const employee = new Employee("Zak", id);

  expect(employee.id).toBe(id);
});

test("Can I set email", () => {
  const email = "test@test";
  const employee = new Employee("Zak", 1, email);

  expect(employee.email).toBe(email);
});

test("can get name using getName", () => {
  const employee = new Employee("Zak");
  expect(employee.getName()).toBe("Zak");
});

test("Can I get id using getId()", () => {
  const id = "id100";
  const employee = new Employee("Zak", id);

  expect(employee.getId()).toBe(id);
});

test("can I get an email using getEmail",()=>{
    const email = "test@test.com";
    const employee = new Employee ('Zak',1,email);
    expect(employee.getEmail()).toBe(email);
})