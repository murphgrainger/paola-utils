module.exports = {
  GITHUB_API_USERS: 'https://api.github.com/users',
  GITHUB_API_TEAMS: 'https://api.github.com/orgs/hackreactor/teams',
  GITHUB_API_REPOS: 'https://api.github.com/repos/hackreactor',
  SFDC_OPPTY_RECORD_ID: '012j0000000qVAP',
  SFDC_SELECT_QUERY: `Id, Student__c, Student__r.Name,
  Student__r.Email, Student__r.Secondary_Email__c, Campus_Formatted__c,
  Student__r.Github_Username__c, Course_Start_Date_Actual__c, Product_Code__c,
  StageName, Separation_Status__c, Separation_Type__c, Separation_Reason__c,
  Last_Day_Of_Attendance__c, Last_Day_of_Attendance_Acronym__c,
  Official_Withdrawal_Date__c`,
  LEARN_API_COHORTS: ' https://learn-2.galvanize.com/api/v1/cohorts',
};
