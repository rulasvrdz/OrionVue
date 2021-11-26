<template>
  <div>
      <div class="row mb-4">
          <div class="col-12">
              <button class="btn btn-primary text-uppercase" @click="modalVisible=true" style="width:100%"> Realizar un Reporte</button>
          </div>
          <div class="col-12">
              <button class="btn btn-primary text-uppercase" @click="mapModalVisible=true" style="width:100%"> Nueva Alerta</button>
          </div>
      </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-4" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Delitos por año</h5>
                <h2 class="card-title">Delitos</h2>
              </div>
              <div class="col-sm-4 text-md-right">
                
                <label style="padding: 11px 0px;" >Selecciona un delito</label>
                
              </div>
              <div class="col-md-4 ">
                <select v-model="crime" @change="isLoadingMap = true" class="form-control">
                  <option :value=null selected disabled>Delitos</option>
                  <option v-for="(crime, index) in crimes"  :key="index" :value="crime.NAME">{{crime.NAME}}</option>
                </select>
      </div>
            </div>
          </template>
            <l-map
              :zoom="zoom"
              :center="center"
              style="height: 500px"
            >
              <l-tile-layer
                :url="url"
                :attribution="attribution"
              />
              <l-geo-json
              v-if="!isLoadingMap"
                :geojson="polygonMap"
                :options="options"
                :options-style="styleFunction"
              />
            </l-map>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-4" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Alertas de la comunidad</h5>
                <h2 class="card-title">Puntos de alerta</h2>
              </div>
              <div class="col-sm-4 text-center">
              </div>
              <!-- <div class="col-md-4 pr-md-1">
                <select v-model="alert" class="form-control">
                  <option :value=null selected disabled>Selecciona una alerta</option>
                  <option :value="'All'" selected >Todas</option>
                  <option v-for="(alert, index) in alerts"  :key="index" :value="alert.name">{{alert.name}}</option>
                </select>
              </div> -->
            </div>
          </template>
          <h3 v-if="points == null" class="text-center">NO HAY PUNTOS DE ALERTA</h3>
            <l-map
              v-if="points != null"
              :zoom="zoom"
              :center="center"
              style="height: 500px"
            >
              <l-tile-layer
                :url="url"
                :attribution="attribution"
              />
              <l-marker  v-for="(point, index) in points" :key="index" :lat-lng="point.latlng">}
                <l-popup>
                  <div>
                    <span style="font-size:10px">{{point.type}}</span>
                  </div>
                </l-popup>
                  <l-icon
                  :icon-url="alerts[point.type].icon"
                  />
              </l-marker>
              <l-geo-json
              v-if="!isLoadingMap"
                :geojson="polygonMap2"
                :options="options2"
                :options-style="styleFunction2"
              />
            </l-map>
        </card>
      </div>
    </div>
    <ModalPlan
    :show="modalVisible"
    @onCloseModal="closeModal"
    />
    <MapModal
    v-if="mapModalVisible"
    :show="mapModalVisible"
    @onCloseModal="closeModal"
    />
  </div>
</template>
<script>
  import MapModal from "./Modal/MapModal.vue"
  import ModalPlan from "./Modal/ModalPlan.vue"
  import {database} from "@/main.js"  
  import {ref, onValue, update} from "firebase/database"

  import { LMap, LTileLayer, LMarker, LGeoJson, LIcon, LPopup } from "vue2-leaflet";
  import 'leaflet/dist/leaflet.css';

  

  export default {
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
      LMarker,
      LIcon,
      LPopup,
      ModalPlan,
      MapModal 
    },
    data() {
      return {
        first: false,
        helper: null,
        points:null,
        alerts: null,
        alert:null,
        modalVisible: false,
        mapModalVisible: false,
        isLoadingMap: true,
        polygonMap:{},
        polygonMap2:{},
        enableTooltip: true,
        fillColor: "#e4ce7f",
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a target="_blank" href="http://cartodb.com/attributions">CartoDB</a>',
        zoom: 7,
        center: [20.566667, -103.676389],
        crimes: null,
        crime: null,
        counts: {},
        polygons: null,
        datas: null,
      }
    },
    computed: {
      
      options() {
        return {
          onEachFeature: this.onEachFeatureFunction
        };
      },
      options2() {
        return {
          onEachFeature: this.onEachFeatureFunction2
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
            fillOpacity: .65,
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
      },
      onEachFeatureFunction2() {
        if (!this.enableTooltip) {
          return () => {};
        }
        return (feature, layer) => {
          layer.bindTooltip(
              feature.properties.county ,
            // "<div>Delito:" +
            //   feature.properties.alert +
            //   "</div><div>Incidencias: " +
            //   feature.properties.count +
            //   "</div>",
            { permanent: false, sticky: true }
          );
        };
      }
    },
    methods: {
      closeModal() {
          this.mapModalVisible = false
          this.modalVisible = false
          this.isLoadingMap = true
        this.getInfo()
      },
      async getInfo(){
        this.isLoadingMap = true
        await onValue(ref(database, "DELITOS"), (data) => {
            this.crimes = data.val()
          })
        await onValue(ref(database, "PUNTOSA"), (data) => {
            this.points = data.val()
          })
        await onValue(ref(database, "MAPA"), (data) => {
            this.polygons = data.val()
            this.getData()
          })
          
      },
      getData(){
        onValue(ref(database, "REPORTES"), (data) => {
            this.datas = data.val()
          })
      },
      async generateMap(crime){
        if(this.crime == null){
          this.crime = crime = "ABUSO SEXUAL INFANTIL"
        }
        else{crime = this.crime}
        for(const polygon in this.polygons){
          Object.assign(this.counts, {[polygon]: this.datas[polygon][crime]})
        }
        
        await setTimeout(() => {
          this.parsePoly(crime)
        }, 0);

        
      },
      parsePoly(crime){
        let aux = []
        Object.assign(this.polygonMap, {"type": "FeatureCollection", "features": []})
        Object.assign(this.polygonMap2, {"type": "FeatureCollection", "features": []})
        for(const polygon in this.polygons){
          this.polygons[polygon].geometry.coordinates[0].forEach((element) => {
            aux.push(element)
          });
          this.polygons[polygon].geometry.coordinates[0] = aux
          this.polygonMap.features.push({"type": "Feature", "geometry": this.polygons[polygon].geometry, "properties":{"crime": crime, "count": this.counts[polygon], "county": this.polygons[polygon].MUNICIPIO}})
          this.polygonMap2.features.push({"type": "Feature", "geometry": this.polygons[polygon].geometry, "properties":{"alert": "crime", "count": this.counts[polygon], "county": this.polygons[polygon].MUNICIPIO}})
          aux = []
        }
        this.isLoadingMap = false
      },
    },
    async mounted() {
      await this.getInfo()
    },
    
    watch:{
      async polygons(){
        await onValue(ref(database, "REPORTES"), (data) => {
            this.datas = data.val()
          })
        await onValue(ref(database, "ALERTS"), (data) => {
            this.alerts = data.val()
            this.generateMap()
          })
      },
      crime(val){
        this.isLoadingMap = true
        this.generateMap(val)
      },
      mapModalVisible(val){
        this.mapModalVisible = val
      }
    }
  };
</script>
<style>
</style>
