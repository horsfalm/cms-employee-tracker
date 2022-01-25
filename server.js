const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require('./db/queries');
const cHelper = require('./lib/choiceHelper');

// add an department
const newDept = async () => {  

  const department = await inquirer.prompt([
     {
       type: "input",
       name: "name",
       message: "What is the name of the Department you would like to add?",
       validate: (name) =>{
         if (name) {
           return true;
         } else {
           console.log(" Please enter a Department Name.")
           return false;
         }
       },
    },
  ]);

  await sql.addDept(department);

  chooseRequest();
}

// add an employee
const newEmp = async () => {

  const roleArr = await cHelper.roleChoices();

  const mgmtArr = await cHelper.mgmtChoices();

  const emp = await inquirer.prompt([
      {
        type: "input",
        name: "first",
        message: "What is the first Name of the employee you would like to add?",
        validate: (first) =>{
          if (first && isNaN(first)) {
            return true;
          } else {
            console.log(" Please enter a Name.")
            return false;
          }
        },
     },
     {
      type: "input",
      name: "last",
      message: "What is the last name of the employee you would like to add?",
      validate: (last) =>{
        if (last && isNaN(last)) {
          return true;
        } else {
          console.log(" Please enter a Name.")
          return false;
        }
      },
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the role of the employee you wish to add?",
      choices: roleArr,
      loop: false,
    },
    {
      type: "list",
      name: 'manager_id',
      message: "Who is the Manager of the employee you wish to add?",
      choices: mgmtArr,
      loop: false,
    }
   ]);

  await sql.addEmp(emp);

  chooseRequest();  
 
}

// Add a role
const newRole = async () => {

  const choicesArr = await cHelper.deptChoices();

  const role = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the Role you wish to add?",
        validate: (title) =>{
          if (title) {
            return true;
          } else {
            console.log(" Please enter a Role name.")
            return false;
          }
        },
     },
     {
       type: "input",
       name: 'salary',
       message: "What is the Salary of the Role?",
       validate: (salary) =>{
         if(salary && !isNaN(salary)){
           return true;
         } else {
           console.log(" Please Enter a Role Salary");
         }
       }
     },
     {
      type: "list",
      name: 'department_id',
      message: "What Department is the Role connected to?",
      choices: choicesArr,
      loop: false,
    }
   ]);

  await sql.addRole(role);

  chooseRequest();  
 
}

// Delete and Employee
// Bonus Objective
const delEmp = async () => {
  const empArr = await cHelper.NonMgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Which Employee do you wish to Remove?",
      choices: empArr,
      loop: false,
    }
   ]);

  await sql.deleteEmp(emp);

  chooseRequest();

}

// Update an employees role
const updateEmpRole = async () => {

  const roleArr = await cHelper.roleChoices();

  const empArr = await cHelper.empChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Which Employee record do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the updated role?",
      choices: roleArr,
      loop: false,
    }
   ]);

  await sql.updateEmpRoleById(emp);

  chooseRequest();  
 
}

// Update an employees Manager
// Bonus Objective
const updateEmpManager = async () => {

  const empArr = await cHelper.NonMgmtChoices();

  const mgmtArr = await cHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Which Employee record do you wish to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'manager_id',
      message: "Who is the relevant Manager?",
      choices: mgmtArr,
      loop: false,
    }
   ]);

  await sql.updateEmpManagerById(emp);

  chooseRequest();  
 
}

// View All Departments
const viewDepts = () => {
  sql.getDepts()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Roles
const viewRoles = () => {
  sql.getRoles()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}
// View All employees
const viewEmps = () => {
  sql.getEmps()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Departments and their Budget 
// Bonus Objective
const viewBudgets = async () => {

  sql.getBudgetByDept()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Employees in a specific Department
// Bonus Objective
const viewEmpByDept = async () => {

  const deptArr = await cHelper.deptChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "dept_id",
      message: "Which department do you wish to view employees for?",
      choices: deptArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByDeptId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
        chooseRequest();
      })
  }) 

}

// View All Employees who report to a specific Manager
// Bonus Objective
const viewEmpByMgr = async () => {

  const mgmtArr = await cHelper.mgmtChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Which manager do you wish to view employees for?",
      choices: mgmtArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByMgrId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
        chooseRequest();
      })
  }) 

}


const chooseRequest = () => {
  inquirer.prompt([
      {
        type: 'list',
        name: 'request',
        message: 'What would you like to do?',
        choices: ['Add a department', 
                  'Add an employee', 
                  'Add a role',
                  'Delete an employee',
                  'Update employee role',
                  'Update employee manager', 
                  'View all departments', 
                  'View all employees', 
                  'View all roles', 
                  'View department budget',
                  'View employees by department',
                  'View employees by manager',
                  'Exit'
                 ],
        loop: false,
      },
  ])

  .then((data) => {
      const {request} = data;
      console.log(request);
    //   Switch case
    switch (request) {
        case 'Add a department':
          newDept();
          break;
        case 'Add a role':
          newRole();
          break;
        case 'Add an employee':
          newEmp();
          break;
        case 'Delete an employee':
          delEmp();
          break;
        case 'Update employee role':
          updateEmpRole();
          break;
        case 'Update employee manager':
          updateEmpManager();
          break;
        case 'View all departments':
          viewDepts();
          break;
        case 'View all employees':
          viewEmps();
          break;
        case 'View all roles':
          viewRoles();
          break;         
        case 'View department budget':
          viewBudgets();
          break;
        case 'View employees by department':
          viewEmpByDept();
          break;
        case 'View employees by manager':
          viewEmpByMgr();
          break;
        case 'Exit':
          console.log('Thank you. Goodbye.');
          break;                
    
        default:
            break;
    }
  })
}

chooseRequest();