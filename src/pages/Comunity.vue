<template>
  <div>
      <div class="row mb-4">
          <div class="col-12">
              <button class="btn btn-primary text-uppercase" @click="console('reporte')" style="width:100%"> Realizar un Reporte</button>
          </div>
          <div class="col-12">
              <button class="btn btn-primary text-uppercase" @click="console('alerta')" style="width:100%"> Nueva Alerta</button>
          </div>
      </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-4" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Delitos reportados</h5>
                <h2 class="card-title">Delitos</h2>
              </div>
              <div class="col-sm-4 text-center">
              </div>
              <div class="col-md-4 pr-md-1">
                <select v-model="crime" @change="isLoadingMap = true" class="form-control">
                  <option :value=null selected disabled>Selecciona un delito</option>
                  <option v-for="(crime, index) in crimes"  :key="index" :value="crime.NAME">{{crime.NAME}}</option>
                </select>
      </div>
            </div>
          </template>
          <!-- <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div> -->
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
          <!-- <l-map v-if="!isLoadingMap" style="height: 600px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-polygon v-for="(poly, index) in polygonMap" :key="index" :lat-lngs="polygonMap[index].coordinates" :color="polygon.color" :fillColor="polygonMap[index].color"></l-polygon>
          </l-map> -->
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
              <div class="col-md-4 pr-md-1">
                <select v-model="crime" @change="isLoadingMap = true" class="form-control">
                  <option :value=null selected disabled>Selecciona una alerta</option>
                  <option v-for="(crime, index) in crimes"  :key="index" :value="crime.NAME">{{crime.NAME}}</option>
                </select>
      </div>
            </div>
          </template>
          <!-- <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div> -->
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
                :options-style="styleFunction2"
              />
            </l-map>
          <!-- <l-map v-if="!isLoadingMap" style="height: 600px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-polygon v-for="(poly, index) in polygonMap" :key="index" :lat-lngs="polygonMap[index].coordinates" :color="polygon.color" :fillColor="polygonMap[index].color"></l-polygon>
          </l-map> -->
        </card>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> asd</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div> -->
  </div>
</template>
<script>
  import {database} from "@/main.js"  
  import {ref, onValue, update} from "firebase/database"

  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  import { latLng } from "leaflet";
  import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";
  import 'leaflet/dist/leaflet.css';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable,
      LMap,
      LTileLayer,
      LGeoJson,
      LMarker
    },
    data() {
      return {
        isLoadingMap: true,
        polygonMap:{},
        enableTooltip: true,
        fillColor: "#e4ce7f",
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a target="_blank" href="http://cartodb.com/attributions">CartoDB</a>',
        zoom: 7,
        center: [20.566667, -103.676389],
        years: {
          years: ["2016", "2017", "2018"],
          ids: ["16", "17", "18"]
        },
        year: "18",
        crimes: null,
        crime: null,
        counts: {},
        polygons: null,
        data: null,
        bigLineChart: {
          allData: [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
            datasets: [{
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
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
        console(a){
            console.log(a)
        },
      getInfo(){
        this.isLoadingMap = true
        onValue(ref(database, "DELITOS"), (data) => {
            this.crimes = data.val()
          })
          onValue(ref(database, "DELITOS" + this.year), (data) => {
            this.data = data.val()
          })
        onValue(ref(database, "MAPA"), (data) => {
            this.polygons = data.val()
          })
          
      },
      async generateMap(crime){
        if(this.crime == null){
          crime = "ABUSO SEXUAL INFANTIL"
        }
        else{crime = this.crime}
        for(const polygon in this.polygons){
          Object.assign(this.counts, {[polygon]: this.data[polygon][crime]})
        }
        
        await setTimeout(() => {
          this.parsePoly(crime)
        }, 0);

        // let municipio = "Acatic"
        //   Object.assign(this.polygonMap, {[municipio]: [], color:'#0f0'})

        
      },
      parsePoly(crime){
        let aux = []
        Object.assign(this.polygonMap, {"type": "FeatureCollection", "features": []})
        for(const polygon in this.polygons){
          this.polygons[polygon].geometry.coordinates[0].forEach((element, index) => {
            aux.push(element)
          });
          this.polygons[polygon].geometry.coordinates[0] = aux
          this.polygonMap.features.push({"type": "Feature", "geometry": this.polygons[polygon].geometry, "properties":{"crime": crime, "count": this.counts[polygon], "county": this.polygons[polygon].MUNICIPIO}})
          aux = []
        }
        this.isLoadingMap = false
      },
    },
    async mounted() {
      await this.getInfo()
      
      this.initBigChart(0);
    },
    
    watch:{
      polygons(){
        this.generateMap()
      },
      crime(val){
        this.isLoadingMap = true
        this.generateMap(val)
      }
    }
  };
</script>
<style>
</style>
