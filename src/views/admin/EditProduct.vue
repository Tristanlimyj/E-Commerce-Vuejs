<template>
  <div class="adminEdit">
    <alert v-if="showMessage" :message="this.notification"></alert>
    <div class="container-fluid">
      <b-row>
        <b-col
          xs='12'
          sm='12'
          md='6'
          lg='6'
        >
          <b-img v-if="coverPhotoChange" :src="coverphotoURl"></b-img>
          <b-img v-else :src="$store.state.apiurl + 'images/' + productForm.currentphoto"></b-img>
        </b-col>
        <b-col
          xs='12'
          sm='12'
          md='6'
          lg='6'
        >
          <productform
            @save-product="onSubmit"
            @coverSample="coverSample"
            :requireImage="requireImage"
            :isEdit="true"
            :coverPhotoChange="coverPhotoChange"
            :productForm="productForm"
            :coverphotoURl="coverphotoURl"
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
        currentphoto: '',
        coverphoto: null,
        mixer: {
          first: '',
          second: '',
          third: '',
        },
        name: '',
        public_id: '',
        type_alcohol: '',
        price: '',
        inventory: 0,
      },
      // Image Change //
      requireImage: false,
      coverPhotoChange: false,
      coverphotoURl: '',
      // notification //
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    editProduct(payload) {
      axios.put('update_product/'.concat(this.productForm.public_id), payload, {
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
      this.productForm.mixer.first = dirtyForm[0].mixer.first;
      this.productForm.mixer.second = dirtyForm[0].mixer.second;
      this.productForm.mixer.third = dirtyForm[0].mixer.third;
      this.productForm.name = dirtyForm[0].name;
      this.productForm.public_id = dirtyForm[0].public_id;
      this.productForm.type_alcohol = dirtyForm[0].type_alcohol;
      this.productForm.price = dirtyForm[0].price;
      this.productForm.inventory = dirtyForm[0].inventory;
    },
    onSubmit() {
      const payload = new FormData();
      payload.append('name', this.productForm.name);
      payload.append('type_alcohol', this.productForm.type_alcohol);
      payload.append('mixer', JSON.stringify(this.productForm.mixer));
      payload.append('price', this.productForm.price);
      payload.append('inventory', this.productForm.inventory);
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
    const productUrl = '/indv_product/'.concat(this.$route.params.name);

    axios.get(productUrl)
      .then((response) => {
        const dirtyForm = Object.values(response.data);
        this.currentData(dirtyForm);
      });
  },
};
</script>
<style scoped>
img {
  height: 25rem;
  width: 25rem;
  }
</style>
