<template>
  <div class="adminEdit">
    <alert v-if="showMessage" :message="this.notification"></alert>
    <div class="container-fluid">
      <b-row>
        <b-col
          class="edit-form"
          col='12'
          sm='12'
          offset-md='3'
          md='6'
          offset-lg='3'
          lg='6'
          offset-xl='3'
          xl='6'
        >
          <productform
            @save-product="onSubmit"
            :isEdit="true"
            :productForm="productForm"
          ></productform>
        </b-col>
      </b-row>
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
        mixer: [],
        name: '',
        public_id: '',
        type_alcohol: '',
        price: '',
        coverphoto: null,
      },
      // notification //
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    editProduct(payload) {
      axios.put('products/update_product/'.concat(this.productForm.public_id), payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then(() => {
          this.showMessage = true;
          this.notification = 'Product Updated';
          this.$router.push({ name: 'dashboard' });
        })
        .catch(() => {
          this.showMessage = true;
          this.notification = 'Update Unsuccessful';
        });
    },
    currentData(dirtyForm) {
      this.productForm.currentphoto = dirtyForm[0].coverphoto;
      this.productForm.mixer = JSON.parse(dirtyForm[0].mixer);
      this.productForm.name = dirtyForm[0].name;
      this.productForm.public_id = dirtyForm[0].public_id;
      this.productForm.type_alcohol = dirtyForm[0].type_alcohol;
      this.productForm.price = dirtyForm[0].price;
    },
    onSubmit() {
      const payload = new FormData();
      payload.append('name', this.productForm.name);
      payload.append('type_alcohol', this.productForm.type_alcohol);
      payload.append('mixer', JSON.stringify(this.productForm.mixer));
      payload.append('price', this.productForm.price);
      if (this.productForm.coverphoto !== null) {
        payload.append('coverphoto', this.productForm.coverphoto, this.productForm.coverphoto.name);
      }
      this.editProduct(payload);
    },
    coverSample(url, change) {
      this.coverphotoURl = url;
      this.coverPhotoChange = change;
    },
  },
  created() {
    axios.get('products/indv_product/'.concat(this.$route.params.name))
      .then((response) => {
        const dirtyForm = Object.values(response.data);
        this.currentData(dirtyForm);
      });
  },
};
</script>
<style scoped>
.edit-form {
  padding: 3rem;
}
img {
  height: 25rem;
  width: 25rem;
  }
</style>
