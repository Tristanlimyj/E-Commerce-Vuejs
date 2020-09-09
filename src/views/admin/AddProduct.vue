<template>
  <div class="Add-Products">
    <alert v-if="showMessage" :message="this.notification"></alert>
    <div class="container-fluid row">
      <b-col
        xs='12'
        sm='12'
        md='12'
        lg='6'
      >
        <img v-if="coverPhotoChange" :src="coverphotoURl">
      </b-col>
      <b-col
        xs='12'
        sm='12'
        md='12'
        lg='6'
      >
        <productform
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
        mixer: {
          first: '',
          second: '',
          third: '',
        },
        inventory: 0,
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
      axios.post('new_product', payload, {
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
      this.productForm.mixer.first = '';
      this.productForm.mixer.second = '';
      this.productForm.mixer.third = '';
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
  img {
    width: 25rem;
    height: 25rem;
  }
</style>
