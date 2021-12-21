<template>
  <b-overlay
    id="age-verification"
    :show="show"
    variant="dark"
    opacity="0.45"
    no-wrap
    :fixed="true"
    no-center
  >
    <template #overlay>
      <b-container class="age-verification" fluid>
        <b-row>
          <b-col
            id="age-form"
            xs="12"
            sm="12"
            offset-md="3"
            md="6"
            offset-lg="4"
            lg="4"
            offset-xl="4"
            xl="4"
          >
            <div id="inner-form">
              <h5 class="verification-header">
                To use this site you must be of legal drinking age in Singapore.
              </h5>
              <h4 id="are-you-18">
                Are you 18 years old?
              </h4>
              <b-form-radio-group class="verification-header">
                <b-form-radio v-model="legalAge" :value="true">
                  Yes
                </b-form-radio>
                <b-form-radio v-model="legalAge" :value="false">
                  No
                </b-form-radio>
              </b-form-radio-group>
              <div id="qns-response">
                <h5 v-if="!legalAge">
                  You need to be at least 18 years old to enter
                </h5>
                <b-button v-if="legalAge" class="enter-site" pill @click="enterSite">
                  Enter
                </b-button>
              </div>
              <p id="agree-tnc-cook">
                By entering you are also agreeing to our
                <a href="#terms-of-service">Terms and Conditions </a>
                <a href="#privacy-policy">Privacy and Cookies Policy.</a>
              </p>
              <p>
                This is merely a mock-up purchases here do not mean anything.
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-overlay>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      legalAge: null
    };
  },
  methods: {
    enterSite() {
      this.$cookies.set("ofDrinkingAge", true, "1y");
      this.$emit("legal", false);
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  #age-form {
    margin-left: 1rem !important;
    margin-right: 1rem !important;
  }
}

.age-verification {
  text-align: center;
  margin-top: 20vh;
}
#age-form {
  padding-top: 2rem;
  padding-bottom: 1rem;
  background: white;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

#qns-response {
  margin-top: 15px;
}
.enter-site {
  background: black;
  width: 50%;
}
#agree-tnc-cook {
  margin-top: 1rem;
}
</style>
