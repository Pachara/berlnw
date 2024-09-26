import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

export default defineNuxtPlugin({
    name: 'Bootstrap5',
    // parallel: true,
    async setup (nuxtApp) {
       nuxtApp.provide('bootstrap', bootstrap);
    }
  })