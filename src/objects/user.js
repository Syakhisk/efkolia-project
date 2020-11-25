const user = {
	fullname: "Syakhisk Al-Azmi",
	name: "Syakhisk",
	email: "syakhisk@mamank.com",
	backgroundUrl: "",
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
		return this.tasks.filter(task => task.status === status)
	},

	getUnfinishedTask: function() {
		return this.tasks.filter(task => task.status !== 3)
	},

	getAgendaWithStatus: function(status) {
		return this.agendas.filter(task => task.status === status)
	},
	
	tasks: [
		{
			id: 1,
			name: "Mamank Geming",
			status: 0,
			classcode: "wp",
			classname: "Web Programming",
			deadline: "13/12/2020 20:00",
			reminder: ["h-1",],
			description: "this is description",
		},
		{
			id: 2,
			name: "Upload video tutorial",
			status: 3,
			classcode: "wp",
			classname: "Web Programming",
			deadline: "14/12/2020 20:00",
			description: "this is description",
		},
		{
			id: 3,
			name: "BST Powerpoint",
			status: 1,
			classcode: "ds",
			classname: "Data Structure",
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
