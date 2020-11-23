const user = {
	fullname: "Syakhisk Al-Azmi",
	name: "Syakhisk",
	email: "syakhisk@mamank.com",
	classes: [
		{
			code: "wp",
			classname: "Web Programming",
			schedule: { day: 2, timeStart: "10:00", timeEnd: "13:00" },
		},
		{
			code: "ds",
			classname: "Data Structure",
			schedule: { day: 3, timeStart: "10:00", timeEnd: "13:00" },
		},
	],

	getTaskWithStatus: function(status) {
		return this.tasks.filter(task => task.status == status)
	},

	getAgendaWithStatus: function(status) {
		return this.agendas.filter(task => task.status == status)
	},
	
	tasks: [
		{
			name: "Finish web programming",
			status: 0,
			classcode: "wp",
			deadline: "13/12/2020 20:00",
			description: "this is description",
		},
		{
			name: "Upload video tutorial",
			status: 0,
			classcode: "wp",
			deadline: "14/12/2020 20:00",
			description: "this is description",
		},
		{
			name: "BST Powerpoint",
			status: 0,
			classcode: "ds",
			deadline: "15/12/2020 20:00",
			description: "this is description",
		},
	],
	agendas: [
    {
			name: "Design event logo",
			status: 0,
			deadline: "13/12/2020 20:00",
			description: "this is description",
		},
  ],
};

export default user;
