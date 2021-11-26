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
        <p class="text-justify">[1] B Incidencia delictiva 2 – IIEG. (2021). Retrieved 10 September 2021, from 
          <a target="_blank" href="https://iieg.gob.mx/ns/?page_id=1958"> https://iieg.gob.mx/ns/?page_id=1958</a>
        </p>
        <p class="text-justify">[2] Además de pandemia por COVID-19, México enfrenta propagación de noticias falsas. (2021).
           Retrieved 23 November 2021, from <a target="_blank" href="https://www.dgcs.unam.mx/boletin/bdboletin/2020_318.html "> 
           https://www.dgcs.unam.mx/boletin/bdboletin/2020_318.html </a>
        </p>
        <p class="text-justify">[3] Datos Abiertos - Jalisco. (2021). Retrieved 18 September 2021, from
          <a target="_blank" href="https://datos.jalisco.gob.mx/"> https://datos.jalisco.gob.mx/</a>
        </p>
        <p class="text-justify">[4] Jalisco destaca en delincuencia y armas | NTR Guadalajara. (2021). Retrieved 18 September 2021, from 
          <a target="_blank" href="https://ntrguadalajara.com/post.php?id_nota=161527#:~:text=En%202020%2C%20Jalisco%20fue%20el,delitos%20de%20armas%20de%20fuego.&text=En%202015%20el%20registro%20alcanz%C3%B3%20un%20m%C3%A1ximo%20de%2078%20investigaciones"> https://ntrguadalajara.com/</a>
        </p>
        <p class="text-justify">[5] (2021). Retrieved 18 September 2021, from
          <a target="_blank" href="http://www.injuve.es/sites/default/files/2017/46/publicaciones/revista108_14-nuevas-formas-consumir-informacion.pdf">http://www.injuve.es</a>
        </p>
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
          img: 'https://res.cloudinary.com/raulumg/image/upload/v1637961546/ORION/adrian_h5xidg.jpg',
          linkedin:'https://www.linkedin.com/in/adri%C3%A1nochoa/',
          git: 'https://github.com/Adrian8aS',
          mail:'ppadrian8a@outlook.com',
          fullName: 'Adrián Ochoa',
          title: 'Ceo/Co-Founder',
          description: `Análisis de datos | Desarrollo Base de datos | Documentación `,
        },
        Mariano: {
          img: 'https://res.cloudinary.com/raulumg/image/upload/v1637961737/ORION/mariano_vembyr.jpg',
          linkedin:'https://www.linkedin.com/in/angel-mariano-junco-ruiz-150913',
          git: 'https://github.com/Legan-Aminora',
          mail:'changeek2@outlook.com',
          fullName: 'Mariano Junco',
          title: 'Ceo/Co-Founder',
          description: `Análisis de datos`,
        },
        Raul: {
          img: 'https://res.cloudinary.com/raulumg/image/upload/v1637961976/ORION/raul_sm68pc.jpg',
          linkedin:'https://www.linkedin.com/in/raul-verduzco/',
          git: 'https://www.github.com/rulasvrdz',
          mail:'rulasvrdz@gmail.com',
          fullName: 'Raúl Verduzco',
          title: 'Ceo/Co-Founder',
          description: `Desarrollo pagina web`,
        },
        Charly: {
          img: 'https://res.cloudinary.com/raulumg/image/upload/v1637961639/ORION/charly_phoniz.jpg',
          linkedin:'https://www.linkedin.com/in/carlosvillalobos587/',
          git: 'https://github.com/Carlos-Villalobos',
          mail:'charlievilla587@gmail.com',
          fullName: 'Carlos Villalobos',
          title: 'Ceo/Co-Founder',
          description: `Desarrollo pagina web`,
        }
      }
    }
  }
</script>
<style>
</style>
