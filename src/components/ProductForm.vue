<template>
  <div class="ProductForm">
    <br>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(saveProduct)" enctype="multipart/form-data">
            <!-- Name -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="name-group"
                class="form-component"
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
                class="form-component"
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
            <!-- Mixer -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="mixer-group"
                class="form-component"
                label="Select your Mixer:"
                label-for="mixer-input"
              >
              <b-form-checkbox-group
                  id="mixer-input"
                  v-model="productForm.mixer"
                  :options="options"
                  placeholder="Mixer"
                ></b-form-checkbox-group>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- Alcohol Type -->
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-group
                id="type-group"
                class="form-component"
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
            <!-- Image Upload -->
            <label for="coverphoto">Upload Cover Photo</label>
            <b-form-file
              id="coverphoto"
              class="form-component"
              v-model="productForm.coverphoto"
              :required="requireImage"
              :state="Boolean(productForm.coverphoto)"
              @change="onFileChange"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <a
              v-if="coverPhotoChange"
              :href="coverphotoURl"
              target="_blank"
            >View Image</a>
            <!-- Submit Button -->
            <b-button-group
              class="form-component"
            >
              <b-button
                v-if="isEdit"
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
import axios from 'axios';

export default {
  props: ['isEdit', 'productForm', 'coverphotoURl', 'coverPhotoChange', 'requireImage'],
  data() {
    return {
      options: [],
    };
  },
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
    cleanMixForCheckbox(mixers) {
      const cleanMixers = [];
      Object.values(mixers)
        .map((mix) => cleanMixers.push({
          text: mix.name,
          value: {
            text: mix.name,
            value: mix.public_id,
          },
        }));
      return cleanMixers;
    },
  },
  created() {
    axios.get('/mixers')
      .then((response) => {
        this.options = this.cleanMixForCheckbox(response.data);
      });
  },
};
</script>
<style scoped>
  .btn-group {
    width: 100%;
  }
  .form-component {
    padding-top: 0.5rem;
  }
</style>
