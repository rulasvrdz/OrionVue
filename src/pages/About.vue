<template>
  <div>
    <div class="row">
      <div class=" text-center col-12">
        <h1> Nosotros </h1>
      </div>
      <div class="col-2"></div>
      <div class="col-md-8">
        <carousel 
        :perPage="1" 
        :centerMode='true' 
        :autoplay="true" 
        :autoplayTimeout='3500' 
        :paginationPosition="'bottom-overlay'"
        :autoplayHoverPause='true'
        :paginationActiveColor="'#e14eca'"
        :loop='true'
        :speed='1000'
        :paginationEnabled="true">
          <slide>
            <div class="col-12">
              <user-card :user="Adrian"></user-card>
            </div>
          </slide>
          <slide>
            <div class="col-12">
              <user-card :user="Mariano"></user-card>
            </div>
          </slide>
          <slide>
            <div class="col-12">
              <user-card :user="Raul"></user-card>
            </div>
          </slide>
          <slide>
            <div class="col-12">
              <user-card :user="Charly"></user-card>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
    <div class="row pt-5">
      <div class=" text-center col-12">
        <h3>Fuentes</h3>
        <p>Datos Abiertos - Jalisco. (2021). Retrieved 18 September 2021, from 
https://datos.jalisco.gob.mx</p>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  import { Carousel, Slide } from 'vue-carousel';
  export default {
    components: {
      Carousel,
      Slide,
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        Adrian: {
          linkedin:'https://linkedin.com',
          git: 'https://www.github.com/rulasvrdz',
          mail:'rulasvrdz@gmail.com',
          fullName: 'Adrian Ochoa',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        },
        Mariano: {
          linkedin:'https://linkedin.com',
          git: 'https://www.github.com/rulasvrdz',
          mail:'rulasvrdz@gmail.com',
          fullName: 'Mariano Junco',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        },
        Raul: {
          linkedin:'https://www.linkedin.com/in/raul-verduzco/',
          git: 'https://www.github.com/rulasvrdz',
          mail:'rulasvrdz@gmail.com',
          fullName: 'Raul Verduzco',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        },
        Charly: {
          linkedin:'https://linkedin.com',
          git: 'https://www.github.com/rulasvrdz',
          mail:'rulasvrdz@gmail.com',
          fullName: 'Carlos Villalobos',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        }
      }
    }
  }
</script>
<style>
</style>
