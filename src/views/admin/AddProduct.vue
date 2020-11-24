<template>
  <div class="Add-Products">
    <alert v-if="showMessage" :message="this.notification"></alert>
    <div class="container-fluid row">
      <b-col
        xs='12'
        sm='12'
        offset-md='3'
        md='6'
        offset-lg='3'
        lg='6'
        offset-xl='3'
        xl='6'
      >
        <productform
          id="add-product-form"
          @save-product="onSubmit"
          @coverSample="coverSample"
          :required="requireImage"
          :coverPhotoChange="coverPhotoChange"
          :isEdit="false"
          :productForm="productForm"
          :coverphotoURl="coverphotoURl"
        ></productform>
      </b-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '../../components/Alert.vue';
import ProductForm from '../../components/ProductForm.vue';

export default {
  components: {
    alert: Alert,
    productform: ProductForm,
  },
  data() {
    return {
      productForm: {
        name: '',
        price: '',
        type_alcohol: '',
        mixer: [],
        coverphoto: null,
      },
      // notification //
      showMessage: false,
      notification: '',
      // Image Change //
      requireImage: true,
      coverphotoURl: '',
      coverPhotoChange: false,
    };
  },
  methods: {
    createProduct(payload) {
      axios.post('/products/new_product', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then(() => {
          this.initForm();
          this.showMessage = true;
          this.notification = 'Product Uploaded';
          this.$router.push('dashboard');
        })
        .catch(() => {
          this.showMessage = true;
          this.notification = 'Upload Unsuccessful';
        });
    },
    initForm() {
      this.productForm.name = '';
      this.productForm.price = '';
      this.productForm.type_alcohol = '';
      this.productForm.mixer = [];
      this.productForm.inventory = '';
      this.productForm.coverphoto = null;
    },
    onSubmit() {
      const payload = new FormData();
      payload.append('name', this.productForm.name);
      payload.append('type_alcohol', this.productForm.type_alcohol);
      payload.append('mixer', JSON.stringify(this.productForm.mixer));
      payload.append('price', this.productForm.price);
      payload.append('inventory', this.productForm.inventory);
      payload.append('coverphoto', this.productForm.coverphoto, this.productForm.coverphoto.name);

      this.createProduct(payload);
    },
    coverSample(url, change) {
      this.coverphotoURl = url;
      this.coverPhotoChange = change;
    },
  },
};
</script>
<style scoped>
  #add-product-form {
    padding: 2rem;
  }
</style>
