<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" target="_blank" href="https://umg.edu.mx/portal/">
            Universidad Marista de Guadalajara
          </a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="http://blog.creative-tim.com">
            Blog
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://www.creative-tim.com/license">
            Licenses
          </a>
        </li> -->
      </ul>
      <div class="copyright">
        © {{year}}
        Developed by <router-link to="/about">Insert Name</router-link>
        Using 
        <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Creative Tim's</a> themplate.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
