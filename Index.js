const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const team = [];

const initApp = () => {
  startHtml();
  createManager();
};


const createManager = () => {
  return inquirer
    .prompt([{
        type: 'input',
        message: "Enter team manager`s name",
        name: "name",
      },
      {
        type: 'input',
        message: "Enter team manager's id",
        name: "id",
      },
      {
        type: 'input',
        message: 'enter Manager E-mail',
        name: 'email'
      },
      {
        type: 'input',
        message: "Enter team manager`s Office number",
        name: "officeNumber"
      },
    ])
    .then(({
      name,
      id,
      email,
      officeNumber
    }) => {
      let newManager = new Manager(name, id, email, officeNumber);
      team.push(newManager)
      addTeamMember();
      addHtml(newManager);
    })
};

const addTeamMember = () => {

  return inquirer
    .prompt([{

      type: "list",
      message: "Select team member's role",
      choices: ["Engineer", "Intern"],
      name: "role",
    }, ]).then(({
      role
    }) => {
      if (role === "Engineer") {
        inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the Engineer name?'

          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the Engineer email?'

          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the Engineer id?'

          },
          {
            type: 'input',
            message: 'what is the Engineer github',
            name: 'github'
          }
        ]).then(({
          name,
          id,
          email,
          github
        }) => {
          let newEngineer = new Engineer(name, id, email, github);
          team.push(newEngineer);
          addNewMember();
          addHtml(newEngineer);
        })
      } else if (role === "Intern") {

        inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the Intern name?'

          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the Intern email?'

          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the Intern id?'

          },
          {
            type: 'input',
            message: 'what is the Intern school',
            name: 'school'
          }
        ]).then(({
          name,
          id,
          email,
          school
        }) => {
          let newIntern = new Intern(name, id, email, school);
          team.push(newIntern);
          addNewMember();
          addHtml(newIntern);
        })
      }
    })
}

const addNewMember = () => {
  return inquirer.prompt([{
    type: "list",
    message: "Would you like to add more team members?",
    choices: ["yes", "no"],
    name: "moreMembers",
  }]).then(({
    moreMembers
  }) => {
    if (moreMembers === "yes") {
      addTeamMember();
    } else {

      finishHtml();
      console.log('Bulid Html');
      console.log(team);
    }
  })
}

const startHtml = () => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg bg-warning mb-5 shadow p-3 mb-5 rounded">
        <h1 class=" mb-0 w-100 text-center font-weight-bold ">Team Profile</h1>
        </nav>
        <div class="container">
            <div class="row">`;
  fs.writeFile("./dist/team.html", html, (err) => {
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
      data = 
      `<div class="col-md-6 col-lg-4">
          <div class="card text-black shadow p-3 mb-5 bg-white rounded">
              <div class="card-header bg-warning">
                  <h2>${name}</h2>
                  <h3><i class="fas fa-glasses"></i> Engineer</h3>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                  <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}">${gitHub}</a></li>
              </ul>
          </div>
      </div>`;
    } else if (role === "Intern") {
      const school = member.getSchool();
      data = 
      `<div class="col-md-6 col-lg-4">
          <div class="card text-black shadow p-3 mb-5 bg-white rounded">
              <div class="card-header bg-warning">
                  <h2>${name}</h2>
                  <h3><i class="fas fa-user-graduate"></i> Intern</h3>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                  <li class="list-group-item">School: ${school}</li>
              </ul>
          </div>
      </div>`;
    } else {
      const officeNumber = member.getOfficeNumber();
      data = 
      `<div class="col-md-6 col-lg-4">
          <div class="card text-black shadow p-3 mb-5 bg-white rounded">
            <div class="card-header bg-warning">
                <h2>${name}</h2>
                <h3><i class="fas fa-mug-hot"></i> Manager</h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">Office Number:${officeNumber}</a></li>
             </ul>
          </div>
      </div>`;
    }
    fs.appendFile("./dist/team.html", data, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

const finishHtml = () => {
  const html = ` </div>
    </div>
    
</body>
</html>`;

  fs.appendFile("./dist/team.html", html, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("end");
}

initApp();