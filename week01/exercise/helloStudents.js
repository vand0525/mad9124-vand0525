const students = require('./students.json');

// concatenate and print students first name and last name
const say = (message) => {console.log(message)};

for (const student of students) {
    const {firstName, lastName} = student;
    say(`Hello ${firstName} ${lastName}`);
}

// count number of students who's last name starts with D
const targetStudents = students.filter(({lastName}) => lastName.startsWith('D'));
console.log(`Count of last names starting with D is ${targetStudents.length}`);

// generate student emails and return to new array
const studentEmails = students.map(({firstName}) => `${firstName.toLowerCase()}@algonquincollege.com`);
console.log(studentEmails);


