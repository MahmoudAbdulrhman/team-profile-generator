const Intern = require("../lib/Intern");

test('can I get a school name',()=>{
    const school = "UCB";
    const intern = new Intern("Zak",1,"test@test.com",school);
    expect(intern.schoolName).toBe(school);
})

test("can get a school using getSchool() ",()=>{
    const school = "UCB";
    const intern = new Intern ('Zak',1,'test@test.com',school);
    expect(intern.getSchool()).toBe(school);

})

test('get Intern using getRole()',()=>{
    const role = "Intern";
    const intern = new Intern ('Zak', 1 , "test@test.com", role);
    expect(intern.getRole()).toBe(role);
})