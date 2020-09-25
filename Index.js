const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const team = [];

const initApp = () => {
  startHtml();
  createTeam();
};

const createTeam = () => {
  return inquirer
    .prompt([
      {
        message: "Enter team manager`s name",
        name: "name",
      }, 
      {
        message: "Enter team manager's id",
        name: "id",
      },
      
      {
        type: "list",
        message: "Select team member's role",
        choices: ["Engineer", "Intern"],
        name: "role",
      },
     
     
    ])
    .then(({ name, role, id, email }) => {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else if (role === "Intern") {
        roleInfo = "school name";
      } else {
        roleInfo = "office number";
      }
      inquirer
        .prompt([
          {
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["yes", "no"],
            name: "moreMembers",
          },
        ])
        .then(({ roleInfo, moreMembers }) => {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } 
        //   else {
        //     newMember = new Manager(name, id, email, roleInfo);
        //   }
          team.push(newMember);
          addHtml(newMember).then(() => {
            if (moreMembers === "yes") {
              createTeam();
            } else {
              finishHtml();
            }
          });
        });
    });
};

const startHtml = () => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
  fs.writeFile("./dist/team.html", html,(err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("start");
};

const addHtml = (member) => {
  return new Promise((resolve, reject) => {
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    let data = "";
    if (role === "Engineer") {
      const gitHub = member.getGithub();
      data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
    } else if (role === "Intern") {
      const school = member.getSchool();
      data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
    } else {
      const officePhone = member.getOfficeNumber();
      data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`;
    }
    console.log("adding team member");
    fs.appendFile("./dist/team.html", data, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

const finishHtml = ()=> {
  const html = ` </div>
    </div>
    
</body>
</html>`;

  fs.appendFile("./dist/team.html", html,(err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("end");
}

initApp();
