const {
  SFDC_LOGIN_URL,
  SFDC_USERNAME,
  SFDC_PASSWORD
} = require('../config.js');
const jsforce = require('jsforce');
const conn = new jsforce.Connection({
  loginUrl: SFDC_LOGIN_URL
})
// ------------------------------
// Salesforce API Integrations
// ------------------------------

const login = async () => {
  try {
    return await conn.login(SFDC_USERNAME, SFDC_PASSWORD, (err, userInfo) => {
      return userInfo
    });
  } catch (error) {
    console.log('error', error);
    return error;
  }
}
exports.getStudentsToAdd = async () => {
  try {
    await login();
    return await conn.sobject("Opportunity").select('Id, StageName').where({
      'StageName': 'Accepted',
      'Course_Product__c': 'Web Development',
      'Course_Start_Date_Actual__c': {
        $gt: jsforce.Date.TODAY
      }
    }).orderby("CreatedDate", "DESC").execute((err, res) => {
      if(err) throw new Error("SALESFORCE ERROR", err);
      const formattedStudentData = _reformatStudents(res);
      return formattedStudentData;
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// TODO: Move this elsewhere! You can skip this one for now.
// Group students in a report by (a number of parameters TBD)
// exports.groupStudentsBy = () => {};

const _reformatStudents = ogData => {
  let students = [];
  ogData.forEach(student => {
    let newStudent = {};
    newStudent.Id = student.Id;
    newStudent.Stage = student.StageName;
    students.push(newStudent);
  })
  return students;
}
