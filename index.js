const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const inquirer = require("./node_modules/inquirer/lib/inquirer.js");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      message: "Name: ",
      name: "name",
      default: "Employee",
    },
    {
      type: "list",
      message: "Select a position",
      choices: ["Manager", "Intern", "Engineer"],
      name: "position",
    },
    {
      type: "input",
      message: "Email: ",
      name: "email",
      default: "example@email.com",
    },
    {
      type: "input",
      message: "Office Number: ",
      name: "officeNumber",
      when: (checked) => {
        if (checked.position.includes("Manager")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "Github Username: ",
      name: "github",
      when: (checked) => {
        if (checked.position.includes("Engineer")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "School/University: ",
      name: "school",
      when: (checked) => {
        if (checked.position.includes("Intern")) {
          return true;
        }
        return false;
      },
    },
  ])
  .then(function (data) {
    let newMember;
    let i;
    let positions = [];
    let members = [];
    let count = 0;
    let pop;
    let card;
    let html = "";

    fs.readFile("members.json", function (err, res) {
      members = JSON.parse(res);
      members.push(data);
      fs.writeFileSync("members.json", JSON.stringify(members), function (err) {
        if (err) throw err;
        console.log("saved");
      });

      pop = JSON.parse(res);

      for (let x = 0; x < pop.length; x++) {
        switch (pop[x].position) {
          case "Manager":
            newMember = new Manager(
              data.name,
              pop[x],
              data.email,
              data.officeNumber,
              data.position
            );
            card += `<div class="card m-3" style='width:300px'>
              <div class="card-header">
                  <span>${
                    pop[x].name.charAt(0).toUpperCase() + pop[x].name.slice(1)
                  }</span> | <small class="text-muted">${
                    pop[x].position
                  }</small>
              </div>
              <div class="card-body">
                  <ul class="list-group list-group-flush border rounded">
                      <li class="list-group-item">ID: ${pop[x].id}</li>
                      <li class="list-group-item">Email: ${pop[x].email} </li>
                      <li class="list-group-item">Office Number: ${
                        pop[x].officeNumber
                      }</li>
                  </ul>
                    </div>
                </div>`;
            break;
          case "Intern":
            newMember = new Intern(
              data.name,
              pop[x],
              data.email,
              data.school,
              data.position
            );
            card += `<div class="card m-3" style='width:300px'>
              <div class="card-header">
                  <span>${
                    pop[x].name.charAt(0).toUpperCase() + pop[x].name.slice(1)
                  }</span> | <small class="text-muted">${
                    pop[x].position
                  }</small>
              </div>
              <div class="card-body">
                  <ul class="list-group list-group-flush border rounded">
                      <li class="list-group-item">ID: ${pop[x].id}</li>
                      <li class="list-group-item">Email: ${pop[x].email} </li>
                      <li class="list-group-item">School: ${pop[x].school}</li>
                  </ul>
                    </div>
                </div>`;
            break;
          case "Engineer":
            newMember = new Employee(
              data.name,
              pop[x],
              data.email,
              data.github,
              data.position
            );
            card += `<div class="card m-3" style='width:300px'>
              <div class="card-header">
                  <span>${
                    pop[x].name.charAt(0).toUpperCase() + pop[x].name.slice(1)
                  }</span> | <small class="text-muted">${
              pop[x].position
            }</small>
              </div>
              <div class="card-body">
                  <ul class="list-group list-group-flush border rounded">
                      <li class="list-group-item">ID: ${pop[x].id}</li>
                      <li class="list-group-item">Email: ${pop[x].email} </li>
                      <li class="list-group-item">Github:<a href='https://github.com/${
                        pop[x].github
                      }' >${pop[x].github}</a></li>
                  </ul>
                    </div>
                </div>`;
            break;
        }
        html = card;
      }
      fs.writeFileSync(
        "index.html",
        `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
            <meta name="description" content="">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="./assets/style.css">
        </head>
        
        <body class='bg-light'>
            <nav class="navbar navbar-light bg-light border-bottom">
                <div class="container-fluid">
                    <span class="navbar-brand">
                        Team<b class="text-secondary">Dashboard</b>
                    </span>
                </div>
            </nav>
            <div class="container-fluid d-inline">
                <div class="row align-items-start">
                    <div id="container" class="col-md-12 p-5 d-flex">
                        ${html}
                    </div>
                </div>
        
            </div>
        
            <script src="index.js" async defer></script>
        </body>
        
        </html>`
      );
    });
  });
