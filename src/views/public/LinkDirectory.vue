<template>
  <div id="link-directory">
    <b-container fluid>
      <b-row>
        <b-col
          xs='12'
          sm='12'
          offset-md='2'
          md='8'
          offset-lg='4'
          lg='4'
          offset-xl='4'
          xl='4'
        >
         <div id="inner-directory">
           <b-img
            id="logo-picture"
            fluid
            :src="logoPhoto"
            rounded="circle"/>
            <br>
            <div
              id="link-button-group"
            >
              <b-button
                class="link-buttons"
                v-for="link in links" :key="link"
                @click="redirect(link.name,link.url)"
                pill
              >
                <h5>
                  {{ callTitlelize(link.name) }}
                </h5>
              </b-button>
            </div>
         </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Axios from 'axios';
import LogoPhoto from '../../images/the-alchemist-alcohol-logo.png';
import { stringFunctions as strfunction } from '../../commonFunctions';

export default {
  data() {
    return {
      logoPhoto: LogoPhoto,
      links: [],
    };
  },
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    redirect(name, url) {
      this.track(name);
      window.location = url;
    },
    track(name) {
      this.$gtag.event(name, {
        event_category: 'link directory',
        event_label: name,
        value: 1,
      });
    },
  },
  beforeCreate() {
    Axios.get('link-directory')
      .then((res) => {
        this.links = res.data.link_directory;
      })
      .catch(() => {
        this.$router.push({ name: 'products' });
      });
  },
};
</script>

<style scoped>
#inner-directory {
  margin: 5vh;
  text-align: center;
}
#logo-picture {
  max-width: 150px;
  border-radius: 0px!important;
}
#link-button-group {
  margin-top: 20px;
}
.link-buttons {
  padding: 0.25rem 0px;
  width: 100%;
  background: #242124 ;
  margin-bottom: 12px;
}
.link-buttons:hover {
  color: black;
  background: white;
  border-style: solid;
}
</style>
