import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
	// Deletes ALL existing entries
	return knex("products").del()
		.then(() => {
			let info = [
				/*OUTDOR*/
				{
					title: 'Hawaiian Umbrella', photo_url: 'IMG_0395__42275.1585009441.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Golden Gate (Tiger Bark) Ficus', photo_url: 'IMG_1281__94683.1539216362.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Dwarf Mini Jade Bonsai Tree', photo_url: 'IMG_0404__68170.1585009741.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Ginseng Grafted Ficus', photo_url: 'IMG_1118__92557.1538662329.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Chinese Elm Bonsai', photo_url: 'IMG_6857__84871.1572542155.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Dwarf Jade in Water Pot', photo_url: 'IMG_0512__09843.1585140646.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Green Mound Juniper', photo_url: '78637650_large_3035399_bonsai_22.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Money Tree Grove', photo_url: 'IMG_0438__76467.1585147183.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Flowering Azalea', photo_url: 'IMG_0429__27880.1585147024.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Ponderosa Pine In Mica Pot', photo_url: 'IMG_0499__04558.1585138726.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Chinese Elm Bonsai', photo_url: 'IMG_0316__54280.1584710428.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Japanese Five Needle White Pine', photo_url: 'IMG_0321__15081.1584710765.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Green Mound Juniper', photo_url: 'IMG_0321__15081.15847107687.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Contoneaster', photo_url: 'IMG_0309__79191.1584642688.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Fruiting Silvererry', photo_url: 'IMG_0381__37226.1585008385.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Trident Maple', photo_url: 'IMG_0219__18788.1584559855.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Silverberry', photo_url: 'IMG_0525__61608.1585141906.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Specimen Dwarf Japanese Maple Bonsai "Kiyo Hime"', photo_url: 'IMG_0620__18990.1585525723.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
				{
					title: 'Black Pine Kokedama Moss Ball', photo_url: 'IMG_0438__76467.1585147183.jpg',
					age: 0, price: 0, description: '' , category_id: 1
				},
			].map(el => {
				el.age = Math.floor(Math.random() * (17 - 6) + 6)
				el.price = Math.floor(Math.random() * (410 - 45) + 45)
				el.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' +
					'do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' +
					'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute' +
					'irure dolor in reprehenderit in voluptate velit esse cillum dolore'
				return el
			})
			return knex("products").insert(info);
		});
};
