<template>
  <card type="user">
    <p class="card-text">
    </p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img class="avatar" :src="user.img" alt="...">
        <h5 class="title">{{user.fullName}}</h5>
      </a>
      <p class="description">
        {{user.title}}
      </p>
    </div>
    <p></p>
    <p class="card-description">
      {{user.description}}
    </p>
    <div slot="footer" class="button-container">
      <base-button icon round class="btn-mail">
        <a class="white" :href="'mailto:'+user.mail"><span>&#9993;</span></a>
      </base-button>
      <base-button icon round class="btn-github">
        <a class="white" target="_blank" :href="user.git"><i class="fab fa-github"></i></a>
      </base-button>
      <base-button icon round class="btn-linkedin">
        <a class="white" target="_blank" :href="user.linkedin"><i class="fab fa-linkedin"></i></a>
      </base-button>
    </div>
  </card>
</template>
<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
.white{
  color: whitesmoke!important;;
}
span {
  content: "\2709";
  font-size: 18px;
}
</style>
