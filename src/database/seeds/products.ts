import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
	// Deletes ALL existing entries
	return knex("products").del()
		.then(() => {
			// Inserts seed entries
			return knex("products").insert([
				{
					title: "ВЯЗ МЕЛКОЛИСТНЫЙ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 200,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "ВЯЗ МЕЛКОЛИСТНЫЙ, МЕТЛОВИДНЫЙ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 300,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "КАРМОНА МЕТЛОВИДНАЯ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 250,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "ЗАНТОКСИЛУМ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 350,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "ФИКУС",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 150,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "СИЗИГИУМ МЕТЛОВИДНЫЙ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 550,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "ЗАНТОКСИЛУМ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 950,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "ПОРТУЛАКАРИЯ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 650,
					main_photo: 'url',
					category_id: 1
				},
				{
					title: "ПЛЮЩ",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
						"Donec et mi at urna blandit consectetur sit amet eget mauris. " +
						"Nulla eget libero in massa fringilla efficitur. Vestibulum ultrices massa lectus," +
						"vitae gravida ante elementum id. Nullam mollis orci diam, a tincidunt nisl gravida ut." +
						"Curabitur tincidunt mollis aliquet. Maecenas eu mollis nisl. Fusce a ex hendrerit, posuere" +
						"urna id, mattis eros. Vivamus mollis consectetur leo vitae scelerisque. Ut vitae magna non elit" +
						" pharetra convallis. Nullam vel turpis ac risus tincidunt suscipit.",
					price: 70,
					main_photo: 'url',
					category_id: 2
				}
			]);
		});
};
