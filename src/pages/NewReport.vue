<template>
  <card>
    <h5 slot="header" class="title text-uppercase">Generar nuevo reporte</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
          <label>Selecciona el delito</label>
                <select v-model="crime" class="form-control">
                  <option :value=null selected disabled>Selecciona un delito</option>
                  <option v-for="(crime, index) in crimes"  :key="index" :value="crime.CRIME">{{crime.NAME}}</option>
                </select>
      </div>
      <div class="col-md-6">
          <label>Selecciona el Municipio</label>
            <select v-model="countyId" class="form-control" @change="getCount" :disabled="crime == null">
              <option :value=null selected disabled>Selecciona un municipio</option>
              <option v-for="(county, index) in map" :key="index" :value="index">{{county.MUNICIPIO}}</option>
            </select>
      </div>
    </div>
    <button @click="sendData" class="btn btn-primary">Enviar</button>
  </card>
</template>
<script>
import {database} from "@/main.js"
import {ref, onValue, update} from "firebase/database"
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data(){
      return{
        crimes: null,
        map: null,
        crime: null,
        countyId: null,
        crimeCount: null,
        reports: null
      }
    },
    mounted(){
    this.getInfo()  
    },
    methods:{
        send(){
            console.log("Reporte enviado")
        },
        getInfo(){
          onValue(ref(database, "DELITOS"), (data) => {
            this.crimes = data.val()
          })
          onValue(ref(database, "MAPA"), (data) => {
            this.map = data.val()
          })
        },
        getCount(){
          onValue(ref(database, "REPORTES/" + this.countyId + "/" + this.crime), (data) => {
            this.reports = data.val()
          })
        },
        sendData(){

          if(this.crime != null && this.countyId != null){
              update(ref(database, "REPORTES/" + this.countyId),{
                [this.crime]: this.reports + 1
            });
            this.$toast.open({type: "success", message: "Reporte enviado"})
            this.resetAll()
          }else{ 
            this.$toast.open({type: "error", message: "Favor de llenar los campos"}) 
          }
        },
        resetAll(){
          this.crime= null,
          this.countyId= null,
          this.crimeCount= null,
          this.reports= null

        }
    },
    watch:{
      // map(val){
      //   console.log("hola", val)
      // }
    }
  }
</script>
<style>
</style>
