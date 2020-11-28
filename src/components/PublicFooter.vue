<template>
<div id="footer">
    <b-container fluid class="description">
        <h5>
          We aim to be the most convienent alcohol delivery service in Singapore
        </h5>
        <p>
          <router-link
            class="footer-links"
            :to="{ name: 'ContactPage' }"
          >
            Contact Details
          </router-link>
        </p>
        <p>
          <router-link
            class="footer-links"
            :to="{ name: 'TermsofService' }"
          >
            Terms of Service
          </router-link>
        </p>
        <p>
          <router-link
            class="footer-links"
            :to="{ name: 'PrivacyPolicy' }"
          >
            Privacy Policy
          </router-link>
        </p>
    </b-container>
</div>
</template>
<style scoped>
    #footer {
        color:#fbfcfc;
        background-color:#060606 ;
        padding: 1rem;
    }
    .description {
        text-align: center;
    }
    .description a{
        color: #fbfcfc;
    }
</style>
