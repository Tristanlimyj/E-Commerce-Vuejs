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
        <u><h2>Terms of Service</h2></u>
        <div id="tos-body">
          <h4>Legalities</h4>
          <ul>
            <li>
              All deliveries must be recieved by a persons aged 18 or above.
            </li>
            <li>
              We reserve the rights to request for a valid photo ID to verify
              the recipient's age.
            </li>
            <li>
              In the event, that when checked the person who is recieving the
              alcohol is not of legal drinking age, the alcohol will not be
              handed over to you. We will charge you a travel fee of $50 and
              remainder will be refunded to you.
            </li>
            <li>
              We reserve the rights to reject your purchase if you appear
              intoxicated.
            </li>
            <li>
              We reserve the rights to cancel your order if we
              are unable to fufill them for any reason(Lack of
              stock or an system error).
              We aplogise if you ever have to experience this
            </li>
          </ul>
          <h4>Payment Terms</h4>
          <ul>
            <li>
              Payment is done by Stripe which powers
              many of the worlds online transaction.
            </li>
            <li>
              The Alchemist Alcohol Pte. Ltd. does not
              keep any of your credit card information.
            </li>
            <li>
              In the event of a dispute please do contact us.
            </li>
          </ul>
          <h4>Cancellations/Returns</h4>
          <ul>
            <li>
              Cancellation is on a case by case basis.
            </li>
            <li>
              Cancellation can be done by contacting
              us and we will be in touch with you.
            </li>
            <li>
              We reserve the rights to reject your refund requests.
            </li>
            <li>
              We reserve the rights to charge you a fee for the cancellation.
            </li>
          </ul>
          <h4>Changes to this Terms and Conditions</h4>
          <ul>
            <li>
              We may update our terms and Conditions
              from time to time. You are advised to
              review this page whenever you use the bot.
              The changes will be effect immediately
              once they are changed.
            </li>
          </ul>
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
import PublicNav from '../components/PublicNav.vue';
import PublicFooter from '../components/PublicFooter.vue';

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
