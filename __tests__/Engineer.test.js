const Engineer  = require("../lib/Engineer")
const { TestScheduler } = require("jest");
const { exportAllDeclaration } = require("@babel/types");
const Employee = require("../lib/Employee");

test("can set a gitHub userName",()=>{
 const gitHubAcc = "user.gitHub";
 const employee = new Engineer ('Zak',1,'test@test.com',gitHubAcc);
 expect(employee.github).toBe(gitHubAcc);
})

test("can get a getHub userName using getGithub() ",()=>{
    const github = "user@github.test";
    const engineer = new Engineer ('Zak',1,'test@test.com',github);
    expect(engineer.getGithub()).toBe(github);

})

test('get engineer using getRole()',()=>{
    const role = "Engineer";
    const engineer = new Engineer ('Zak', 1 , "test@test.com", role);
    expect(engineer.getRole()).toBe(role);
})