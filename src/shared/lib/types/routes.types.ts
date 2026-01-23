export enum GuestRoutesTypes {
  HOME = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  SIGNUP = '/signup',
  NOT_FOUND = '*',
}

export enum UserRoutesTypes {
  INTERVIEW = 'interview',
  INTERVIEW_ID = 'interview/:interviewId',
  INTERVIEW_ID_RESULTS = 'interview/:interviewId/results',
  INTERVIEW_LOADING_INTERVIEW = 'interview/loading-interview',
  DASHBOARD = 'dashboard',
  MY_INTERVIEWS = 'my-interviews',
  PROFILE = 'profile',
  SETTINGS = 'settings',
}
