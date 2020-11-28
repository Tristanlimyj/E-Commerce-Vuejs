<template>
  <div id="terms-of-service">
    <b-container class="nav-bar" fluid>
      <PublicNav/>
    </b-container>
    <b-container class="tos-page" fluid>
      <b-row>
        <b-col
          class="tos-information"
          xs='12'
          sm='12'
          offset-md='3'
          md='6'
          offset-lg='4'
          lg='4'
          offset-xl='4'
          xl='4'
        >
        <h2>Privacy Policy</h2>
        <div id="tos-body">
          <ol>
            <li>
              This page is used inform
              website visitors regarding our policies
              with the collection, use, and disclosure
              of Personal Information if anyone
              decided to use our Service.
            </li>
            <li>
                If you choose to use our Service,
                then you agree to the collection and
                use of information in relation to
                this policy. The Personal Information
                that we collect is used for providing
                and improving the Service. We will not
                use or share your information with anyone
                except as described in this Privacy
                Policy.
            </li>
            <li>
                For a better experience, while using our Service,
                we may require you to provide us with certain
                personally identifiable information. The information
                that we request is will be retained by us and used
                as described in this privacy policy.
            </li>
            <li>
                This webiste uses third party
                services provided such as...
                <ul>
                    <li>Google Analytics</li>
                </ul>
            </li>
            <li>
                This website uses cookies to store
                information such as your cart if you
                are of legal drinking age and other
                information that we will need to use
                for the website.
            </li>
            <li>
              We will do our best to use the industry's best
              practices to store your data and keep your data
              safe. However, like everything we cannot guarantee
              absolute security.
            </li>
            <li>
              We may update our Privacy Policy from time to time.
              Thus, you are advised to review this page periodically
              for any changes. We will notify you of any changes by
              posting the new Privacy Policy on this page. These
              changes are effective immediately after they are
              posted on this page.
            </li>
          </ol>
        </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="footer-container" fluid>
      <PublicFooter/>
    </b-container>
  </div>
</template>

<script>
import PublicNav from '../../components/PublicNav.vue';
import PublicFooter from '../../components/PublicFooter.vue';

export default {
  components: {
    PublicNav,
    PublicFooter,
  },
};
</script>

<style scoped>
.tos-page {
  padding-top: 4vh;
  text-align: center;
  min-height: 80vh;
}
#tos-body {
    text-align: left;
}
</style>
