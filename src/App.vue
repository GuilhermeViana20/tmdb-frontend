<template>
  <Navbar ref="navbar" />

  <div class="container">
    <router-view @open-search-modal="openSearchFromNavbar" />
  </div>

  <Footer />
</template>

<script>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods: {
    openSearchFromNavbar() {
      this.$refs.navbar.openSearchModal()
    }
  }
}
</script>