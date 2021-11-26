<template>
    <div>
        <div to="modals">
            <general-modal
                :show="show"
            >
                               
                    <card>
                        <div class="close">
                            <div>
                               <button
                            class='btn-close'
                                @click='close()'
                                
                            >
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button> 
                            </div>
                        </div>
                            <h5 slot="header" class="title text-uppercase">Generar nuevo reporte</h5>
                        <div class="row">
                            <div class="col-md-6 pr-md-1">
                                <label>Selecciona el delito</label>
                                        <select v-model="crime" class="form-control">
                                        <option :value=null selected disabled>Selecciona un delito</option>
                                        <option v-for="(crime, index) in crimes"  :key="index" :value="crime.NAME">{{crime.NAME}}</option>
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
                        <button @click="sendData" class="btn btn-primary mt-3">Enviar</button>
                    </card>
                <!-- modales -->
            </general-modal>
        </div>
    </div>
</template>

<script>
import GeneralModal from './GeneralModal'
import {database} from "@/main.js"
import {ref, onValue, update, set} from "firebase/database"
export default {
    components: {
        GeneralModal
    },
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      },
        show: {
            type: Boolean,
            required: true
        }
    },
    mounted() {
    this.getInfo()  
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
    watch:{
        crime(val){
            console.log("modal", val)
        }
    },
    computed: {
        
    },
    methods: {
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
                // [this.crime]: 0
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
          this.close()
        },
        close() {
            this.$emit('onCloseModal')
        },
    },
}
</script>
<style>
.flex{
    display: flex;
}
.mx-6 {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}
.justify-end {
    justify-content: flex-end;
}
.h-6 {
    height: 2.5rem;
}
.w-6 {
    width: 1.5rem;
}
.btn-close, .btn-ubi {
    background-color: transparent;
    border: none;
    z-index: 1;
    color: whitesmoke;
}
.close{
    display: flex;
    top: 4px;
    position: absolute;
    right: 3px;
}
</style>