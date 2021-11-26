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
                                @click='resetAll()'
                                
                            >
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button> 
                            </div>
                        </div>
                        <div class="row" style="padding-top: 30px">
                            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                                <h5 class="card-category">Alertas de la comunidad</h5>
                                <h2 class="card-title">Puntos de alerta</h2>
                            </div>
                            <div class="col-md-6 pr-md-1">
                                <select v-model="alert" @change="isLoadingMap = true" class="form-control">
                                <option :value=null selected disabled>Selecciona una alerta</option>
                                <option v-for="(alert, index) in alerts"  :key="index" :value="alert">{{alert.name}}</option>
                                </select>
                            </div>
                        </div>
                        <l-map
                        @click="addMarker"
                        :zoom="zoom"
                        :center="center"
                        style="height: 300px"
                        >
                          <l-tile-layer
                              :url="url"
                              :attribution="attribution"
                          />
                          <l-marker v-if="isPoint" :lat-lng="latlng">
                              <l-icon
                              :icon-url="alert.icon"
                              />
                          </l-marker>
                        </l-map>
                        <button @click="sendData" class="btn btn-primary mt-3">Enviar</button>
                    </card>
                <!-- modales -->
            </general-modal>
        </div>
    </div>
</template>

<script>

import { LMap, LTileLayer, LMarker, LGeoJson, LPopup, LIcon } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';

import GeneralModal from './GeneralModal'
import {database} from "@/main.js"
import {ref, onValue, update, set} from "firebase/database"
export default {
    components: {
        GeneralModal,
        LMap,
        LTileLayer,
        LGeoJson,
        LMarker,
        LPopup,
        LIcon
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
        count: null,
        isPoint: false,
        latlng: null,
        alerts: null,
        map: null,
        alert: null,
        countyId: null,
        crimeCount: null,
        reports: null,
        fillColor: "#e4ce7f",
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a target="_blank" href="http://cartodb.com/attributions">CartoDB</a>',
        zoom: 7,
        center: [20.566667, -103.676389],
      }
    },
    watch:{
        crime(val){
            console.log("modal", val)
        }
    },
    computed: {
      
      options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
      "Accounts",
      "Purchases",
      "Sessions"
      },
      styleFunction() {
        const fillColor = this.getColor; // important! need touch fillColor in computed for re-calculate when change fillColor
        return (feature) => {
          return {
            weight: 2,
            color: "#d725bb",
            opacity: 1,
            fillColor: this.getColor(feature.properties.count),
            fillOpacity: .65
          };
        };
      },
      
      
      styleFunction2() {
        const fillColor = this.getColor; // important! need touch fillColor in computed for re-calculate when change fillColor
        return (feature) => {
          return {
            weight: 2,
            color: "#d725bb",
            opacity: 1,
            fillColor: '#00000000',
            fillOpacity: .65
          };
        };
      },
      getColor() {
          return (d) => {
            if(d>400){
              return "#7e0001"
            }
            if(d>100){
              return "#b82101"
            }
            if(d>50){
              return "#f44300"
            }
            if(d>10){
              return "#f96200"
            }
            if(d>5){
              return "#ff8200"
            }
            if(d>0){
              return "#fff154"
            }
            if(d==0){
              return "#0000000"
            }

          // '#BD0026' : d > 50  ? '#E31A1C' : d > 30  ? '#FC4E2A' : d > 20   ? '#FD8D3C' : d > 10   ? '#FEB24C' : d > 5   ? '#FED976' : '#FFEDA0';    
        };
      },
      onEachFeatureFunction() {
        if (!this.enableTooltip) {
          return () => {};
        }
        return (feature, layer) => {
          layer.bindTooltip(
            "<div>Municipio:" +
              feature.properties.county +
            "<div>Delito:" +
              feature.properties.crime +
              "</div><div>Incidencias: " +
              feature.properties.count +
              "</div>",
            { permanent: false, sticky: true }
          );
        };
      }
    },
    methods: {
        addMarker(e){
          if(this.alert != null ){
            this.latlng = e.latlng
            this.isPoint = true
          }else{ 
            this.$toast.open({type: "error", message: "Selecciona el tipo de alerta primero"}) 
          }
        },
        getInfo(){
          onValue(ref(database, "PUNTOSA"), (data) => {
              if(data.val() == null){
                  this.count = 0
              }else{this.count = data.val().length}
          })
          onValue(ref(database, "ALERTS"), (data) => {
            this.alerts = data.val()
          })
          onValue(ref(database, "MAPA"), (data) => {
            this.map = data.val()
          })
        },
        sendData(){
          if(this.alert != null ){
              update(ref(database, "PUNTOSA/"),{
                [this.count]:{
                    type: this.alert.name,
                    latlng: this.latlng
                }
            });
            this.$toast.open({type: "success", message: "Reporte enviado"})
            this.resetAll()
          }else{ 
            this.$toast.open({type: "error", message: "Favor de llenar los campos"}) 
          }
        },
        async resetAll(){
            
            this.alert = null
            await setTimeout(() => {
            this.close()
            }, 10);
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