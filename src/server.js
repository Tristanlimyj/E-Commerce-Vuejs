import { createServer, Model, hasMany, Serializer, belongsTo } from "miragejs";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable import/prefer-default-export */
export function makeServer() {
  const server = createServer({
    models: {
      product: Model.extend({
        mixer: hasMany
      }),
      mixer: Model.extend({
        product: hasMany
      }),
      addOn: Model,
      cart: Model.extend({
        cartItem: hasMany,
        promoCode: belongsTo
      }),
      cartItem: Model.extend({
        cart: belongsTo
      }),
      deliveryOption: Model,
      promoCode: Model.extend({
        cart: belongsTo
      })
    },
    serializers: {
      product: Serializer.extend({
        embed: true
      }),
      cart: Serializer.extend({
        embed: true
      })
    },
    seeds(server) {
      // Creating Products
      server.create("product", {
        category: "whisky",
        coverphoto: "monkey-shoulders.png",
        mixer: [
          {
            id: 1,
            name: "coke"
          },
          {
            id: 2,
            name: "sprite"
          }
        ],
        name: "monkey shoulder's (700ml)",
        price: 79.9,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "whisky",
        coverphoto: "jim-beam-square.png",
        mixer: [
          {
            id: 1,
            name: "coke"
          },
          {
            id: 2,
            name: "sprite"
          }
        ],
        name: "jim beam (700ml)",
        price: 55,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "brandy",
        coverphoto: "martell-square.png",
        mixer: [
          {
            id: 1,
            name: "coke"
          },
          {
            id: 2,
            name: "sprite"
          }
        ],
        name: "martell vsop red barrel",
        price: 109.9,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "rum",
        coverphoto: "bacardi-square.png",
        mixer: [
          {
            id: 1,
            name: "coke"
          },
          {
            id: 2,
            name: "sprite"
          }
        ],
        name: "barcardi rum (700ml)",
        price: 55,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "vodka",
        coverphoto: "absoulut-vodka.png",
        mixer: [
          {
            id: 1,
            name: "coke"
          },
          {
            id: 2,
            name: "sprite"
          }
        ],
        name: "absolute vodka original (700ml)",
        price: 59.9,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "soju",
        coverphoto: "good-day-peach-soju.png",
        mixer: [
          {
            id: 3,
            name: "yakult"
          }
        ],
        name: "peach soju",
        price: 55,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "soju",
        coverphoto: "plum-soju.png",
        mixer: [
          {
            id: 3,
            name: "yakult"
          }
        ],
        name: "plum soju",
        price: 55,
        publicId: uuidv4()
      });
      server.create("product", {
        category: "soju",
        coverphoto: "green-grape-soju.png",
        mixer: [
          {
            id: 3,
            name: "yakult"
          }
        ],
        name: "green grape soju",
        price: 55,
        publicId: uuidv4()
      });
      // Creating Mixers

      // Creating Add Ons
      server.create("addOn", {
        category: "mixers",
        coverphoto: "coke.png",
        name: "1.5l coke",
        price: 2.9,
        publicId: uuidv4()
      });
      server.create("addOn", {
        category: "mixers",
        coverphoto: "milkis.png",
        name: "6 pack milkis",
        price: 8.0,
        publicId: uuidv4()
      });
      server.create("addOn", {
        category: "mixers",
        coverphoto: "tonic-water.png",
        name: "4 cans of tonic",
        price: 4.9,
        publicId: uuidv4()
      });
      server.create("addOn", {
        category: "alcohol",
        coverphoto: "corona-beer.png",
        name: "6 pack corona beer",
        price: 24.0,
        publicId: uuidv4()
      });
      server.create("addOn", {
        category: "mixers",
        coverphoto: "green-tea.png",
        name: "1.5l green tea",
        price: 2.9,
        publicId: uuidv4()
      });
      server.create("addOn", {
        category: "food",
        coverphoto: "chicken-twisties.png",
        name: "chicken twisties",
        price: 1.9,
        publicId: uuidv4()
      });
      // Creating Delivery Options
      server.create("deliveryOption", {
        name: "1 hour delivery",
        price: 10
      });
      server.create("deliveryOption", {
        name: "2 hours delivery",
        price: 7
      });
      server.create("deliveryOption", {
        name: "3 hours delivery",
        price: 3
      });
      // Creating PromoCode Options
      server.create("promoCode", {
        code: "123",
        value: 5,
        used: false
      });
      server.create("promoCode", {
        code: "abc",
        value: 5,
        used: false
      });
    },

    routes() {
      // Routes Configurations
      this.timing = 0;
      // Products
      this.get("/products", schema => {
        return schema.products.all();
      });
      this.get("/products/:productName", (schema, request) => {
        const productName = request.params.productName.replaceAll("-", " ");
        return schema.products.findBy({ name: productName });
      });
      // Add Ons
      this.get("/add-ons", schema => {
        return schema.addOns.all();
      });
      this.get("/add-ons/:productName", (schema, request) => {
        const productName = request.params.productName.replaceAll("-", " ");
        return schema.addOns.findBy({ name: productName });
      });
      // Cart
      this.post("/cart", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);
        const cartId = payload.cartId;
        // Search for Cart
        const userCart = schema.carts.findBy({ cartPubId: cartId });

        if (userCart) {
          // response array
          let responseCart = [];

          const cartItems = schema.cartItems.where({ cartId: userCart.id }).models;
          // Get the information required
          for (let i = 0; i < cartItems.length; i++) {
            // Get the name of the product
            const currentItem = cartItems[i];

            let productData = null;
            // if is liquor get the mixer name
            if (currentItem.isLiquor) {
              productData = schema.products.findBy({ publicId: currentItem.productId });
              productData.update({ isLiquor: true });
              productData.mixer = {
                mixerOptions: productData.mixer,
                currentMixer: productData.mixer.find(mix => mix.id === currentItem.mixerId)
              };
            } else {
              productData = schema.addOns.findBy({ publicId: currentItem.productId });
              productData.isLiquor = false;
            }
            // add to the cart
            responseCart.push({
              productData: productData,
              cartItemId: currentItem.id
            });
          }
          let cartPromoCode = {};

          if (userCart.promoCodeId) {
            cartPromoCode = schema.promoCodes.find(userCart.promoCodeId);
          }

          return {
            customerCart: responseCart,
            emptyCart: false,
            deliveryOptionId: userCart.deliveryOptionId,
            promoCode: cartPromoCode
          };
        } else {
          return {
            message: "Cart is empty! Add some drinks to get the party started!!!",
            emptyCart: true
          };
        }
      });
      this.post("/add-to-cart", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);

        const { cartId, productId } = payload;

        // Creating/Getting User Carts
        const userCart = schema.carts.findOrCreateBy({ cartPubId: cartId });

        // Check if it is recently created
        if (!userCart.deliveryOptionId && !userCart.promoCodeId) {
          userCart.update({
            deliveryOptionId: null,
            promoCodeId: null
          });
        }

        // Creating the Product
        let product = null;
        if (payload.isLiquor) {
          product = schema.cartItems.create({
            productId: productId,
            mixerId: payload.mixer,
            cartId: userCart.id,
            isLiquor: payload.isLiquor
          });
        } else {
          product = schema.cartItems.create({
            productId: productId,
            cartId: userCart.id,
            isLiquor: payload.isLiquor
          });
        }
        // Updating the Cart
        if (userCart.cartItemIds) {
          userCart.cartItemIds.push(product.id);
        } else {
          userCart.update({
            cartItemIds: [product.id]
          });
        }
      });
      this.post("/cart/change-bundle-mixer", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);
        // Get the cart Item
        const selectedCartItem = schema.cartItems.find(payload.cartItemId);
        // Change the the mixer to the current mixer
        selectedCartItem.update({
          mixerId: payload.mixerId
        });
      });
      this.delete("/cart/remove-item", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);
        // Get the cart Item
        const selectedItem = schema.cartItems.find(payload.cartItemId);
        const cartId = selectedItem.cartId;
        selectedItem.destroy();
        // Checking if cart is empty
        const cartEmpty = !Boolean(schema.cartItems.findBy({ cartId: cartId }));
        if (cartEmpty) {
          return {
            emptyCart: true,
            message: "Cart is empty! Add some drinks to get the party started!!!"
          };
        } else {
          return { emptyCart: false };
        }
      });
      this.post("/cart/add-promo-code", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);

        // Searching for and adding it to the cart
        const userCart = schema.carts.findBy({ cartPubId: payload.cartId });
        // Searching for the Promocode
        const promoCode = schema.promoCodes.findBy({ code: payload.promoCode });
        // if the promo code exist and if it has been used before

        if (promoCode && !promoCode.used) {
          userCart.update({
            promoCodeId: promoCode.id
          });
          return { promoCode: promoCode, message: "Promo Code Successfully Added" };
        } else {
          return { message: "Promo Code Invalid" };
        }
      });
      this.post("/cart/payment", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);
        const cartId = payload.cartId;
        // Search for Cart
        const userCart = schema.carts.findBy({ cartPubId: cartId });
        userCart.update({
          paid: true
        });
      });
      // Delivery Options
      this.get("/delivery", schema => {
        return schema.deliveryOptions.all();
      });
      this.post("/delivery/add-delivery-method", (schema, request) => {
        // Decontructing the Payload
        const payload = JSON.parse(request.requestBody);

        const userCart = schema.carts.findBy({ cartPubId: payload.cartId });
        // Updating the Cart Delivery Options
        userCart.update({
          deliveryOptionId: payload.deliveryOptionId
        });
      });
      this.get("/delivery/:id", (schema, request) => {
        const deliveryId = request.params.id;
        return schema.deliveryOptions.find(deliveryId);
      });
    }
  });
  return server;
}
