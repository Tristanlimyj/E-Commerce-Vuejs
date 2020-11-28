<template>
  <div class="Home">
    <b-container class="home-page" fluid>
      <b-row>
        <b-carousel
          id="carousel"
        >
          <b-carousel-slide
            :img-src="coverPhoto"
          >
          </b-carousel-slide>
        </b-carousel>
      </b-row>
      <b-row id="key-selling-points">
              <b-col
                xs="12"
                sm="12"
                md="12"
                lg="4"
                xl="4"
              >
                <i class="couch-icon fas fa-couch"></i>
                <p>
                  We provide you with the alcohol, mixer, ice and cups.
                  All you have to do is order from us and we will do the rest.
                </p>
              </b-col>
              <b-col
                xs="12"
                sm="12"
                md="12"
                lg="4"
                xl="4"
              >
                <i class="truck-icon fas fa-truck"></i>
                <p>
                  We have many delivery options for you to choose from to cater to your every need.
                </p>
              </b-col>
              <b-col
                xs="12"
                sm="12"
                md="12"
                lg="4"
                xl="4"
              >
                <i class="clock-icon fas fa-clock"></i>
                <p>
                  We deliver from 5 PM - 3 AM everyday just so that you can get your alcohol.
                </p>
              </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Coverphoto from '../../images/coverphoto.jpg';

export default {
  data() {
    return {
      coverPhoto: Coverphoto,
    };
  },
};
</script>
<style scoped>
  .home-page {
    text-align: center;
  }
  #carousel {
    margin-top: 0.5rem;
    width: 100%;
    max-height:90vh!important;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  #key-selling-points {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .truck-icon {
    font-size: 3rem;
  }
  .couch-icon {
    font-size: 3rem;
  }
  .clock-icon {
    font-size: 3rem;
  }
</style>
