const greetings = [
	"Hello",
	"Hello There",
	"Well Hello There",
	"Greetings",
	"Shalom",
	"Word",
	"Sup.",
	"Hihi",
	"Howyadoin' ",
	"Alrighty then",
	"Hola",
	"Guten Targ",
	"Oh Hiii",
	"Oh hi there",
	"Howdy",
	"Bonjour",
	"Speak!",
	"Hey",
	"Buwong apa tu",
	"Hey There",
	"Moshi moshi",
	"Yo",
	"Hello",
	"Hello",
	"What's up?",
	"Good day to you",
	"Supp",
	"A Hoy Hoy",
	"Mikum",
];

// export default function () {
// 	var RandomGreetings = {

// 		greet: function () {
// 			var randomNumber = Math.floor(Math.random() * this.greetings.length);

// 			return this.greetings[randomNumber];
// 		},
// 	};

// 	return RandomGreetings;
// }

export const greet = () => {
	let rand = Math.floor(Math.random() * greetings.length);
	return greetings[rand];
};
