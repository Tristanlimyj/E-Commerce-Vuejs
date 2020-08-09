<template>
  <div class="ProductForm">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(saveProduct)" enctype="multipart/form-data">
            <!-- Name -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="name-group"
                label="Name:"
                label-for="name-input"
              >
              <b-form-input
                  id="name-input"
                  v-model="productForm.name"
                  type="text"
                  required
                  placeholder="Enter Name of the product..."
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Price -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="price-group"
                label="Price:"
                label-for="price-input"
              >
              <b-form-input
                  id="price-input"
                  v-model="productForm.price"
                  type="text"
                  required
                  placeholder="Enter price of the product..."
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- First Mixer -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="mixer-first-group"
                label="First Mixer:"
                label-for="mixer-first-input"
              >
              <b-form-input
                  id="mixer-first-input"
                  v-model="productForm.mixer.first"
                  type="text"
                  required
                  placeholder="First Mixer"
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Second Mixer -->
            <ValidationProvider v-slot="{ errors }">
              <b-form-group
                id="mixer-second-group"
                label="Second Mixer (Optional):"
                label-for="mixer-second-input"
              >
              <b-form-input
                  id="mixer-second-input"
                  v-model="productForm.mixer.second"
                  type="text"
                  placeholder="Second Mixer"
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Third Mixer -->
            <ValidationProvider v-slot="{ errors }">
              <b-form-group
                id="mixer-third-group"
                label="Third Mixer (Optional):"
                label-for="mixer-third-input"
              >
              <b-form-input
                  id="mixer-third-input"
                  v-model="productForm.mixer.third"
                  type="text"
                  placeholder="Third Mixer"
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Alcohol Type -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="type-group"
                label="Alcohol Type:"
                label-for="type-input"
              >
              <b-form-input
                  id="type-input"
                  v-model="productForm.type_alcohol"
                  type="text"
                  required
                  placeholder="What Type of Alcohol"
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Price -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="inventory-group"
                label="Inventory:"
                label-for="inventory-input"
              >
              <b-form-input
                  id="inventory-input"
                  v-model="productForm.inventory"
                  type="text"
                  required
                  placeholder="Inventory..."
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Image Upload -->
            <label for="coverphoto">Upload Cover Photo</label>
            <b-form-file
              id="coverphoto"
              v-model="productForm.coverphoto"
              :required="requireImage"
              :state="Boolean(productForm.coverphoto)"
              @change="onFileChange"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <!-- Submit Button -->
            <b-button-group>
              <b-button v-if="isEdit"
                type="submit" variant="primary">Update
              </b-button>
              <b-button
                v-else
                type="submit" variant="primary">Submit
              </b-button>
            </b-button-group>
          </b-form>
        </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: ['isEdit', 'productForm', 'coverphotoURl', 'coverPhotoChange', 'requireImage'],
  methods: {
    saveProduct() {
      this.$emit('save-product');
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.productForm.coverphoto = file;
      const coverphotoURl = URL.createObjectURL(file);
      this.coverPhotoChange = true;
      this.$emit('coverSample', coverphotoURl, this.coverPhotoChange);
    },
  },
};
</script>
