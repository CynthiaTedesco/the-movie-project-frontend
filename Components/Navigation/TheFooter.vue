<template>
  <footer class="block-above-product">
    <div class="footer-content">
      <div class="container">
        <div class="row footer-menu">
          <div v-if="settings.showHelp" class="col-md-3 col-6 order-2 order-md-1">
            <h3>Help</h3>
            <ul class="footer-links list-unstyled">
              <li v-for="helpItem in settings.helpItems" :key="helpItem.name">
                <a :href="helpItem.href">{{ helpItem.name }}</a>
              </li>
            </ul>
          </div>
          <div v-if="settings.showAbout" class="col-md-3 col-6 order-2 order-md-1">
            <h3>About</h3>
            <ul class="footer-links list-unstyled">
              <li v-for="aboutItem in settings.aboutItems" :key="aboutItem.name">
                <a :href="aboutItem.href">{{ aboutItem.name }}</a>
              </li>
            </ul>
          </div>
          <div class="offset-lg-1 col-lg-5 col-md-6 col-sm-12 order-1 order-md-3 pb-5 pb-md-0">
            <form
              action="https://cphgrooming.com/common/footer/subscribe"
              method="post"
              class="validate newsletter-form"
              target="_blank"
              novalidate
            >
              <h3>Be a part of the CG Community</h3>
              <p class="font-weight-light">
                There is always something new happening in our Copenhagen Grooming beard
                growing community. Subscribe to our newsletter for the latest growth hacking videos, special offers and other
                juicy stuff from us below.
              </p>
              <div class="input-group input-group-lg pt-4">
                <input
                  type="email"
                  name="email"
                  class="form-control bg-dark required email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                />
                <input
                  type="submit"
                  value="Sign Up"
                  name="subscribe"
                  class="btn filled inverted small"
                />
              </div>
              <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input type="text" name="vXpqbWHS5zIa3FUG" autocomplete="nope" tabindex="-1" value />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container footer-info text-center">
      <div class="row align-items-center">
        <div class="col-sm-6 col-lg-3 order-4 order-sm-1 footer-info-item">
          <div class="footer-info-copyright">©&nbsp;Copyright&nbsp;2019 Copenhagen&nbsp;Grooming</div>
        </div>
        <div
          v-if="settings.showSocial"
          class="col-sm-6 col-lg-3 order-2 order-sm-2 col-6 footer-info-item social-networks"
        >
          <span class="d-none d-sm-inline-block">Follow us</span>
          <a
            v-for="socialItem in settings.socialItems"
            :key="socialItem.name"
            :href="socialItem.href"
            target="_blank"
          >
            <i :class="socialItem.icon"></i>
          </a>
        </div>
        <div
          class="col-sm-6 col-lg-3 order-2 order-sm-3 col-6 footer-info-item footer-info-payment"
        >
          <span class="d-none d-sm-inline-block">Payment</span>
          <img
            class="img-fluid"
            src="image/catalog/logo/creditcard_dk.png"
            alt="image/catalog/logo/creditcard_dk.png"
          />
          <img
            class="img-fluid"
            src="image/catalog/logo/mobilepay.png"
            alt="image/catalog/logo/mobilepay.png"
          />
        </div>
        <div class="col-sm-6 col-lg-3 order-1 order-sm-4 country-change-html footer-info-item">
          <script>
            <!-- $(document).trigger("country:detected", "dk"); -->
          </script>
          <span class="text_country_shipping_to">Shipping to</span>:
          <span class="shipping-country">Denmark</span>
          <a class="country-change" href="javascript: void(0);">(Change)</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      default: () => {
        return {
          showHelp: true,
          helpItems: [
            { href: '/growth-guarantee', name: 'Growth Guarantee' },
            { href: '/terms-of-service', name: 'Terms of Service' },
            { href: '/delivery-and-return', name: 'Delivery & Return' },
            { href: '/payment-terms', name: 'Payment' },
            { href: '/track-my-order', name: 'Track My Order' }
          ],
          showAbout: true,
          aboutItems: [
            { href: '/about', name: 'About Us' },
            { href: '/contact', name: 'Contact' },
            { href: '/help', name: 'Need help bud?' },
            { href: '/careers', name: 'Careers' }
          ],
          showSocial: true,
          socialItems: [
            {
              name: 'facebook',
              icon: 'icon-facebook',
              href: 'https://www.facebook.com/CopenhagenGrooming'
            },
            {
              name: 'instagram',
              icon: 'icon-instagram',
              href: 'https://www.instagram.com/copenhagengrooming'
            },
            {
              name: 'youtube',
              icon: 'icon-youtube',
              href: 'https://www.youtube.com/channel/UCsLnoe_Fw2Dq-ffApPJvmSQ'
            }
          ]
        };
      }
    }
  }
}
</script>

<style scoped>
footer {
  font-family: "IBM Plex Sans", sans-serif;
}
footer .footer-content {
  background-color: #202020;
  color: #fff;
}
footer .footer-menu {
  padding: 60px 0;
  padding-top: 60px;
  padding-right: 0px;
  padding-bottom: 60px;
  padding-left: 0px;
}
footer .footer-menu form p {
  font-size: 12px;
  line-height: 15px;
  color: #fff;
}
footer .footer-menu form input.form-control {
  color: #fff;
  font-size: 15px;
  line-height: 19px;
}
footer .footer-menu {
  padding: 60px 0;
}
footer .footer-menu h3 {
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  font-weight: 500;
}
footer .footer-links li a {
  color: #fff;
  font-size: 12px;
  line-height: 36px;
  text-decoration: none;
}
.form-control {
  border-radius: 0;
}
@media (max-width: 767.98px) {
  footer .footer-content > .container {
    padding: 0 25px;
    padding-top: 0px;
    padding-right: 25px;
    padding-bottom: 0px;
    padding-left: 25px;
  }
}
@media (min-width: 768px) {
  footer .footer-links li a {
    font-size: 15px;
  }
}
@media (min-width: 768px) {
  footer .footer-menu h3 {
    font-size: 22px;
  }
}
@media (min-width: 1024px) {
  footer .footer-menu {
    padding: 130px 0;
  }
}
</style>
<style>
footer {
  position: relative;
}

footer.block-above-product {
  z-index: 1045;
}

footer .footer-content {
  background-color: #202020;
  color: #fff;
}

@media (max-width: 767.98px) {
  footer .footer-content > .container {
    padding: 0 25px;
  }
}

footer .footer-menu {
  padding: 60px 0;
}

@media (min-width: 1024px) {
  footer .footer-menu {
    padding: 130px 0;
  }
}

footer .footer-menu h3 {
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  font-weight: 500;
}

@media (min-width: 768px) {
  footer .footer-menu h3 {
    font-size: 22px;
  }
}

footer .footer-menu form h3 {
  font-size: 24px;
}

footer .footer-menu form p {
  font-size: 12px;
  line-height: 15px;
  color: #fff;
}

footer .footer-menu form input.form-control {
  color: #fff;
  font-size: 15px;
  line-height: 19px;
}

@media (max-width: 767.98px) {
  footer .footer-menu form input.form-control {
    width: 100%;
  }
}

footer .footer-menu form input.form-control:focus {
  color: #fff;
  border-color: #fff;
}

footer .footer-menu form input[type="submit"] {
  max-width: inherit;
}

@media (max-width: 767.98px) {
  footer .footer-menu form input[type="submit"] {
    width: 100%;
    height: 60px;
  }
}

footer .footer-links {
  margin: 0;
}

footer .footer-links li a {
  color: #fff;
  font-size: 12px;
  line-height: 36px;
  text-decoration: none;
}

@media (min-width: 768px) {
  footer .footer-links li a {
    font-size: 15px;
  }
}

footer .footer-info {
  font-size: 14px;
  background-color: #fff;
}

footer .footer-info > .row {
  padding: 18px 0;
}

@media (max-width: 1023.98px) {
  footer .footer-info-item {
    line-height: 36px;
  }
}

@media (min-width: 1024px) {
  footer .footer-info-item {
    border-right: 1px solid #d8d8d8;
  }

  footer .footer-info-item:first-child {
    text-align: left;
  }

  footer .footer-info-item:last-child {
    text-align: right;
    border: none;
  }
}

footer .footer-info-item.social-networks > span {
  margin-right: 15px;
}

footer .footer-info-item.social-networks > a {
  color: #202020;
  padding: 0 8px;
}

@media (max-width: 767.98px) {
  footer .footer-info-item.social-networks {
    margin: 20px 0;
    border-right: 1px solid #d8d8d8;
  }
}

@media (max-width: 1023.98px) {
  footer .footer-info-item .footer-info-copyright {
    line-height: 21px;
  }
}

footer .footer-info-item .country-change {
  color: #2dc291;
}

footer .footer-info-item .country-change.disabled {
  opacity: 1;
}

footer .footer-info-payment > span {
  margin-right: 15px;
}

footer .footer-info-payment > img {
  max-height: 28px;
  max-width: 75px;
}

@media (max-width: 767.98px) {
  footer .footer-info-payment {
    margin: 20px 0;
  }
}
</style>
