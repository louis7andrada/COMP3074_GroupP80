const data = [
	{
		id: 1,
		title: "Yoda's Restaurant",
		description:
			"Welcome to Yoda's Gastronomic Haven, a culinary destination where the Force of Flavor is strong!",
		stars: 4,
		location: "Coruscant",
		reviews: [
			{
				userId: 1,
				name: "John Doe",
				starsGiven: 4.5,
				comment: "Great experience, loved the ambiance!",
			},
			{
				userId: 11,
				name: "Mace Windu",
				starsGiven: 4.2,
				comment: "The Force is strong with the flavors here!",
			},
			{
				userId: 12,
				name: "Obi-Wan Kenobi",
				starsGiven: 4.7,
				comment: "A Jedi's retreat with delightful dishes!",
			},
		],
	},
	{
		id: 2,
		title: "Wookiee Bites",
		description:
			"Experience the hearty flavors of Kashyyyk at Wookiee Bites, where every dish is as robust as Chewbacca's roar.",
		stars: 4.2,
		location: "Kashyyyk",
		reviews: [
			{
				userId: 2,
				name: "Leia Skywalker",
				starsGiven: 4.0,
				comment: "Delicious Wookiee specialties!",
			},
			{
				userId: 13,
				name: "Chewbacca",
				starsGiven: 4.5,
				comment: "Even I can't resist the Wookiee Bites!",
			},
			{
				userId: 14,
				name: "Hans Solo",
				starsGiven: 4.2,
				comment: "Perfect blend of flavors from Kashyyyk!",
			},
		],
	},
	{
		id: 3,
		title: "Ewok Eats",
		description:
			"Embark on a culinary adventure inspired by the forest moon of Endor at Ewok Eats, where every bite is an exploration of flavor.",
		stars: 4.7,
		location: "Endor",
		reviews: [
			{
				userId: 3,
				name: "Han Solo",
				starsGiven: 5.0,
				comment: "Best dining experience in the galaxy!",
			},
			{
				userId: 15,
				name: "Wicket W. Warrick",
				starsGiven: 4.8,
				comment: "Ewok-sized portions, big on flavor!",
			},
			{
				userId: 16,
				name: "Princess Leia",
				starsGiven: 4.9,
				comment: "Ewok Eats - a royal delight!",
			},
		],
	},
	{
		id: 4,
		title: "Jedi Juice Bar",
		description:
			"Quench your thirst with the Force at Jedi Juice Bar, where refreshing concoctions are blended with a touch of lightsaber magic.",
		stars: 4.5,
		location: "Tatooine",
		reviews: [
			{
				userId: 4,
				name: "Padmé Amidala",
				starsGiven: 4.8,
				comment: "Amazing drinks and atmosphere!",
			},
			{
				userId: 17,
				name: "Anakin Skywalker",
				starsGiven: 4.5,
				comment: "The Force is strong in these beverages!",
			},
			{
				userId: 18,
				name: "Aunt Beru",
				starsGiven: 4.3,
				comment: "Moisture farming has never been so refreshing!",
			},
		],
	},
	{
		id: 5,
		title: "Cantina Canticles",
		description:
			"Immerse yourself in the lively ambiance of Cantina Canticles, where the music is as delightful as the intergalactic dishes on offer.",
		stars: 3.8,
		location: "Mos Eisley",
		reviews: [
			{
				userId: 5,
				name: "Lando Calrissian",
				starsGiven: 4.2,
				comment: "Fun place with great tunes!",
			},
			{
				userId: 19,
				name: "Greedo",
				starsGiven: 3.5,
				comment: "Shot first, but still enjoyed the Cantina Canticles!",
			},
			{
				userId: 20,
				name: "Luke Skywalker",
				starsGiven: 4.0,
				comment: "A must-visit for any Jedi in training!",
			},
		],
	},
	{
		id: 6,
		title: "Droid Delights",
		description:
			"Indulge in futuristic flavors at Droid Delights, where culinary creations are crafted with precision, just like your favorite astromech.",
		stars: 4.3,
		location: "Coruscant",
		reviews: [
			{
				userId: 6,
				name: "C-3PO",
				starsGiven: 4.5,
				comment: "A droid's delight! Exquisite flavors!",
			},
			{
				userId: 21,
				name: "R2-D2",
				starsGiven: 4.2,
				comment: "Beep boop bop - fantastic taste in every byte!",
			},
			{
				userId: 22,
				name: "BB-8",
				starsGiven: 4.6,
				comment: "Rolls in with flavors that are out of this world!",
			},
		],
	},
	{
		id: 7,
		title: "Sith Sizzles",
		description:
			"Explore the dark side of deliciousness at Sith Sizzles, where bold flavors and innovative dishes redefine the galaxy's culinary landscape.",
		stars: 3.9,
		location: "Mustafar",
		reviews: [
			{
				userId: 7,
				name: "Darth Vader",
				starsGiven: 4.0,
				comment: "Dark and tasty! Loved the Sith Sizzles!",
			},
			{
				userId: 23,
				name: "Count Dooku",
				starsGiven: 3.8,
				comment: "Sith Sizzles - a culinary masterpiece!",
			},
			{
				userId: 24,
				name: "Asajj Ventress",
				starsGiven: 4.1,
				comment: "Even Sith Lords need a good meal!",
			},
		],
	},
	{
		id: 8,
		title: "Hutt Hunch",
		description:
			"Satiate your appetite with the extravagant offerings at Hutt Hunch, where opulence and indulgence go hand in hand.",
		stars: 4.1,
		location: "Nal Hutta",
		reviews: [
			{
				userId: 8,
				name: "Jabba the Hutt",
				starsGiven: 4.3,
				comment: "Feast fit for a Hutt! Excellent!",
			},
			{
				userId: 25,
				name: "Bib Fortuna",
				starsGiven: 4.0,
				comment: "Jabba knows how to feast in style!",
			},
			{
				userId: 26,
				name: "Salacious B. Crumb",
				starsGiven: 4.2,
				comment: "Hilarious and delicious - Hutt Hunch has it all!",
			},
		],
	},
	{
		id: 9,
		title: "Galactic Grillhouse",
		description:
			"Savor the best cuts from across the galaxy at Galactic Grillhouse, where the grill is hot, and the flavors are even hotter.",
		stars: 4.6,
		location: "Coruscant",
		reviews: [
			{
				userId: 9,
				name: "Qui-Gon Jinn",
				starsGiven: 4.7,
				comment: "Exceptional cuts and flavor combinations!",
			},
			{
				userId: 27,
				name: "Mara Jade",
				starsGiven: 4.5,
				comment: "Galactic Grillhouse - a must for discerning palates!",
			},
			{
				userId: 28,
				name: "Ki-Adi-Mundi",
				starsGiven: 4.8,
				comment: "Grilled to perfection in the heart of Coruscant!",
			},
		],
	},
	{
		id: 10,
		title: "Starship Sweets",
		description:
			"Indulge your sweet tooth at Starship Sweets, where confections from every corner of the universe are crafted with love and a sprinkle of stardust.",
		stars: 4.4,
		location: "Naboo",
		reviews: [
			{
				userId: 10,
				name: "Ahsoka Tano",
				starsGiven: 4.6,
				comment: "Sweet delights that transport you to another world!",
			},
			{
				userId: 29,
				name: "Jar Jar Binks",
				starsGiven: 3.9,
				comment: "Meesa loved the sweets at Starship Sweets!",
			},
			{
				userId: 30,
				name: "Captain Panaka",
				starsGiven: 4.2,
				comment: "Naboo's finest sweets at their best!",
			},
		],
	},
];

export default data;
