const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_db",
})

connection.connect(function (err) {
  if (err) throw err
  console.log("connected as id " + connection.threadId + "\n")
})

function init() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update an Employee Role",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add Department":
          // function
          addDepartment()
          break
        case "Add Role":
          // function
          addRole()
          break
        case "Add Employee":
          // function
          addEmployee()
          break
        case "View Departments":
          // function
          viewDepartments()
          break
        case "View Roles":
          // function
          viewRoles()
          break
        case "View Employees":
          // function
          viewEmployees()
          break
        case "Update an Employee Role":
          // function
          UpdateRole()
          break
        case "Exit":
          // function
          return
          break
        default:
          return
      }
    })
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the department?",
    })
    .then(function (answer) {
      var query = "INSERT INTO department(name) VAlUES (?)"
      connection.query(query, [answer.department], function (err, result) {
        if (err) throw err
      })
      init()
    })
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the title of this role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "department",
        message: function () {
          viewDepartments()
          return "What is the department id?"
        },
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO role (title, salary, department_id) VAlUES (?,?,?)"
      connection.query(
        query,
        [answer.role, answer.salary, answer.department],
        function (err, result) {
          if (err) throw err
        }
      )
      init()
    })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role",
        message: function () {
          viewRoles()
          return "What is the role id?"
        },
      },
      {
        type: "input",
        name: "manager",
        message: function () {
          viewDepartments()
          return "What is the manager id?"
        },
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VAlUES (?,?,?,?)"
      connection.query(
        query,
        [answer.firstName, answer.lastName, answer.role, answer.manager],
        function (err, result) {
          if (err) throw err
        }
      )
      init()
    })
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err
    console.table(result)
  })
  connection.end()
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err
    console.table(result)
  })
  connection.end()
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err
    console.table(result)
  })
  connection.end()
}

function UpdateRole() {}

init()
