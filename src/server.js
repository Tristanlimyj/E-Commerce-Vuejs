import { createServer, Model, hasMany } from "miragejs";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable import/prefer-default-export */
export function makeServer() {
  const server = createServer({
    models: {
      product: Model,
      mixer: Model,
      addOn: Model
    },

    seeds(server) {
      // Creating Products
      server.create("product", {
        category: "whisky",
        coverphoto: "monkey-shoulders.png",
        mixer:
          '["1a754c28-c281-4de7-9c54-21b7d4db93ba", "650af07c-45fe-4413-b821-5a9fb34ad1ae", "380ef6ab-b5da-4cd4-a74a-af7a3aeaaca2", "fff447d3-f66f-4b4f-b466-97cda87f032b", "4307f0ca-8559-4168-a313-dcd3b1797f40"]',
        name: "monkey shoulder's (700ml)",
        price: 79.9,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "whisky",
        coverphoto: "jim-beam-square.png",
        mixer:
          '["650af07c-45fe-4413-b821-5a9fb34ad1ae", "1a754c28-c281-4de7-9c54-21b7d4db93ba", "fff447d3-f66f-4b4f-b466-97cda87f032b", "380ef6ab-b5da-4cd4-a74a-af7a3aeaaca2", "4307f0ca-8559-4168-a313-dcd3b1797f40"]',
        name: "jim beam (700ml)",
        price: 55,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "brandy",
        coverphoto: "martell-square.png",
        mixer:
          '["650af07c-45fe-4413-b821-5a9fb34ad1ae", "fff447d3-f66f-4b4f-b466-97cda87f032b", "380ef6ab-b5da-4cd4-a74a-af7a3aeaaca2", "4307f0ca-8559-4168-a313-dcd3b1797f40", "1a754c28-c281-4de7-9c54-21b7d4db93ba"]',
        name: "martell vsop red barrel",
        price: 109.9,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "rum",
        coverphoto: "bacardi-square.png",
        mixer:
          '["1a754c28-c281-4de7-9c54-21b7d4db93ba", "650af07c-45fe-4413-b821-5a9fb34ad1ae", "380ef6ab-b5da-4cd4-a74a-af7a3aeaaca2", "fff447d3-f66f-4b4f-b466-97cda87f032b", "4307f0ca-8559-4168-a313-dcd3b1797f40"]',
        name: "barcardi rum (700ml)",
        price: 55,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "vodka",
        coverphoto: "absoulut-vodka.png",
        mixer:
          '["1a754c28-c281-4de7-9c54-21b7d4db93ba", "650af07c-45fe-4413-b821-5a9fb34ad1ae", "380ef6ab-b5da-4cd4-a74a-af7a3aeaaca2", "fff447d3-f66f-4b4f-b466-97cda87f032b", "4307f0ca-8559-4168-a313-dcd3b1797f40"]',
        name: "absolute vodka original (700ml)",
        price: 59.9,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "soju",
        coverphoto: "good-day-peach-soju.png",
        mixer:
          '["0dbf7bdd-dd74-405a-a389-f340d18b6a37", "4b457ee4-a7c2-42ff-9ecc-f36e9e8220f7", "a73ddeb1-cae9-412e-b429-b573baeeb760", "2979d57a-58f8-41e7-bb17-2592dade4f18"]',
        name: "peach soju",
        price: 55,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "soju",
        coverphoto: "plum-soju.png",
        mixer:
          '["4b457ee4-a7c2-42ff-9ecc-f36e9e8220f7", "a73ddeb1-cae9-412e-b429-b573baeeb760", "0dbf7bdd-dd74-405a-a389-f340d18b6a37", "2979d57a-58f8-41e7-bb17-2592dade4f18"]',
        name: "plum soju",
        price: 55,
        public_id: uuidv4()
      });
      server.create("product", {
        category: "soju",
        coverphoto: "green-grape-soju.png",
        mixer:
          '["4b457ee4-a7c2-42ff-9ecc-f36e9e8220f7", "a73ddeb1-cae9-412e-b429-b573baeeb760", "0dbf7bdd-dd74-405a-a389-f340d18b6a37", "2979d57a-58f8-41e7-bb17-2592dade4f18"]',
        name: "green grape soju",
        price: 55,
        public_id: uuidv4()
      });
      // Creating Mixers

      // Creating Add Ons
      server.create("addOn", {
        category: "mixers",
        coverphoto: "coke.png",
        name: "1.5l coke",
        price: 2.9,
        public_id: uuidv4()
      });
      server.create("addOn", {
        category: "mixers",
        coverphoto: "milkis.png",
        name: "6 pack milkis",
        price: 8.0,
        public_id: uuidv4()
      });
      server.create("addOn", {
        category: "mixers",
        coverphoto: "tonic-water.png",
        name: "4 cans of tonic",
        price: 4.9,
        public_id: uuidv4()
      });
      server.create("addOn", {
        category: "alcohol",
        coverphoto: "corona-beer.png",
        name: "6 pack corona beer",
        price: 24.0,
        public_id: uuidv4()
      });
      server.create("addOn", {
        category: "mixers",
        coverphoto: "green-tea.png",
        name: "1.5l green tea",
        price: 2.9,
        public_id: uuidv4()
      });
      server.create("addOn", {
        category: "food",
        coverphoto: "chicken-twisties.png",
        name: "chicken twisties",
        price: 1.9,
        public_id: uuidv4()
      });
    },

    routes() {
      // Routes Configurations
      this.timing = 0;

      this.get("/products", schema => {
        return schema.products.all();
      });
      this.get("/add-ons", schema => {
        return schema.addOns.all();
      });
    }
  });
  return server;
}
