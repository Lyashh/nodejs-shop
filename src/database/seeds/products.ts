import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
	// Deletes ALL existing entries
	return knex("products").del()
		.then(() => {
			let info = [
				{title: 'Hawaiian Umbrella', url: 'url'}
			]
			let products: Array<Object> = []
			return knex("products").insert([
				{
					title: "Hawaiian Umbrella",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 200,
					main_photo: 'url',
					category_id: 2,
					years: 6
				},
				{
					title: "Golden Gate (Tiger Bark) Ficus",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 300,
					main_photo: 'url',
					category_id: 2,
					years: 5
				},
				{
					title: "Dwarf Mini Jade Bonsai Tree",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 250,
					main_photo: 'url',
					category_id: 2,
					years: 8
				},
				{
					title: "Ginseng Grafted Ficus",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 350,
					main_photo: 'url',
					category_id: 2,
					years: 9
				},
				{
					title: "Chinese Elm Bonsai",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 150,
					main_photo: 'url',
					category_id: 2,
					years: 10
				},
				{
					title: "Dwarf Jade in Water Pot",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 550,
					main_photo: 'url',
					category_id: 2,
					years: 14
				},
				{
					title: "Green Mound Juniper - Procumbens Nana",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 950,
					main_photo: 'url',
					category_id: 2,
					years: 9
				},
				{
					title: "Hawaiian Umbrella Exclusive Set",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 650,
					main_photo: 'url',
					category_id: 2,
					years: 10
				},
				{
					title: "Money Tree Grove",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus",
					price: 70,
					main_photo: 'url',
					category_id: 2,
					years: 11
				}
			]);
		});
};
