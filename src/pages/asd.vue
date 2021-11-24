<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-4" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Delitos por mes</h5>
                <h2 class="card-title">Delitos</h2>
              </div>
              <div class="col-sm-4 text-center">
                
                <label style="    padding: 4px 14px;" >Selecciona un año</label>
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in years.years"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: year === years.ids[index]}"
                         :id="index">
                    <input type="radio"
                           @click="chooseYear(years.ids[index])"
                           name="options" autocomplete="off"
                           :checked="year === years.ids[index]">
                    {{option}}
                  </label>
                  
                </div>
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
            <!-- <l-map
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
                :options-style="styleFunction(e)"
              />
            </l-map> -->
            <l-map 
              :center="center" 
              :zoom="zoom" 
              style="height: 500px;"
                  v-if="!isLoadingMap"
                  v-html="!isLoadingMap"
              >
                <l-choropleth-layer 
                  v-if="!isLoadingMap" 
                  v-html="!isLoadingMap"
                  :data="countyData" 
                  titleKey="county" 
                  idKey="county_id" 
                  :value="value" 
                  :extraValues="extraValues" 
                  geojsonIdKey="countyId" 
                  :geojson="polygonMap" 
                  :colorScale="colorScale"
                  strokeColor="d725bb">
                    <template slot-scope="props">
                      <l-info-control 
                        :show="!isLoadingMap"
                        :item="props.currentItem" 
                        :unit="props.unit" 
                        title="Municipio" 
                        placeholder="Pase el cursor sobre un municipio"/>
                      <l-reference-chart 
                        title="Cantidad de incidencias en el año" 
                        :colorScale="colorScale" 
                        :min="props.min" 
                        :max="400" 
                        position="bottomright"/>
                    </template>
                </l-choropleth-layer>
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
    <div class="row">
      <!-- <div class="col-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <router-link to="/new-report" tag="button" class="btn btn-primary" style="float:right">Nuevo Reporte</router-link>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div> -->
      <div class="col-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}
            <router-link to="/new-report" tag="button" class="btn btn-primary" style="float:right">Nuevo Reporte</router-link></h4>
          <div class="table-responsive" style="overflow:auto; height:500px">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
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
  
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
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
      LMarker,
      
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 

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
        countyData: [],
        value: {
          key: "count",
          metric: "Incidencias"
        },
        extraValues: [{
          key: "crime",
          metric: ""
        }],
        colorScale: ["FFEDA0",  "800026"],
        mapOptions: {
          attributionControl: false,
        },
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
      styleFunction(feature) {
        const fillColor = this.getColor(feature.properties.count); // important! need touch fillColor in computed for re-calculate when change fillColor
        return () => {
          return {
            weight: 2,
            color: "#d725bb",
            opacity: 1,
            fillColor: fillColor,
            fillOpacity: .5
          };
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
    methods: {getColor(d) {
        for(let element in d){
          return d > 150 ? '#800026' :
                d > 100  ? '#BD0026' :
                d > 50  ? '#E31A1C' :
                d > 30  ? '#FC4E2A' :
                d > 20   ? '#FD8D3C' :
                d > 10   ? '#FEB24C' :
                d > 5   ? '#FED976' :
                            '#FFEDA0';

        }
                
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
        for(const polygon in this.polygons){
          Object.assign(this.counts, {[polygon]: this.data[polygon][crime]})
        }
                await setTimeout(() => {
          this.parsePoly(crime)
        }, 1000);

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
          this.polygonMap.features.push({"type": "Feature", "geometry": this.polygons[polygon].geometry, "geometry_name": "geom", "properties":{"crime": crime, "count": this.counts[polygon], "county": this.polygons[polygon].MUNICIPIO, "countyId": polygon, }})
          this.countyData.push({county_id: polygon, county: this.polygons[polygon].MUNICIPIO, count: this.counts[polygon], "crime": crime,})
          aux = []
        }
        this.isLoadingMap = false
      },
      chooseYear(index){
        let crime
        this.year = index
        this.getInfo()
        if(this.crime == null){
          crime = "ABUSO SEXUAL INFANTIL"
        }
        this.generateMap(crime)
      },
      initBigChart(index) {
        let chartData = {
          datasets: [{
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
            data: this.bigLineChart.allData[index]
          }],
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        }
        // this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
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
.leaflet-container{
  background-color: #1e1e2d!important;
}
</style>
