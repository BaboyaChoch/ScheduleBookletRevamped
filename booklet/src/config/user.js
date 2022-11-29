const USER_SCHEDULE = [
  ["CSC 1350", 3, "1.0", "9:30AM-10:20AM", "M W F"],
  ["CSC 1253", 1, "3.0", "12:00PM-1:20PM", "T TH"],
  ["CSC 1240", 1, "3.0", "11:30AM-12:30AM", "M W "],
];

const DEFAULT_USER = {
  currentScheduledClasses: [
    {
      courseNum: "CSC 1240",
      sectionNum: 1,
      creditHours: 3,
    },
    {
      courseNum: "CSC 1350",
      sectionNum: 1,
      creditHours: 4,
    },
  ],
  schedule: [
    [
      ...USER_SCHEDULE[0],
      () => {
        const index = USER_SCHEDULE.length;
        USER_SCHEDULE.splice(index, 1);
      },
    ],
    [
      ...USER_SCHEDULE[1],
      () => {
        const index = USER_SCHEDULE.length;
        USER_SCHEDULE.splice(index, 1);
        console.log();
      },
    ],
    [
      ...USER_SCHEDULE[2],
      () => {
        const index = USER_SCHEDULE.length;
        USER_SCHEDULE.splice(index, 1);
      },
    ],
  ],
  classesTaken: [],
  majorDepartments: ["CSC"],
  semesterCreditHoursLimit: 19,
  residentalHall: null,
};

module.exports = { DEFAULT_USER };
