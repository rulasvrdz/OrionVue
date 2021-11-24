<template>
  <div>
    <div class="mb-3">
        <h1> Introducción </h1>
        <p>¿Sabías que jalisco según el Instituto De Información Estadística Y Geográfica De Jalisco 
            (2021) somos el tercer estado con más registros de delitos? Así como la cantidad de 
            reportes sobre abuso infantil, robo a casa habitación, feminicidios y otros delitos que 
            serán descritos más adelante, estos son proporcionados por el estado de Jalisco, pero su 
            entendimiento no es del todo claro o por lo menos no de manera visual. Por eso a lo largo 
            de este documento plantearemos la posibilidad de nuestra alternativa de proyecto para buscar 
            una solución al respecto desde nuestros conocimientos como estudiantes de cibernética y 
            sistemas computacionales.</p>
    </div>
    <div class="mb-3">
        <h1> Problematica </h1>
        <p>Hoy en día no existe la menor duda que gracias al internet se puede acceder a una gran cantidad 
            de información, pero en realidad no todos estos datos son verdaderos o actualizados y peor 
            aún de la inmensa cantidad de información no toda es fácil de entender. Tan solo hace falta 
            ver que “En México la epidemia de desinformación sobre Covid-19 alcanzó el segundo país, 
            después de Turquía, con mayor generación de noticias falsas” (Aristegui, 2020). 
            <br />
            Es un hecho que la desinformación existe en México y en todo el mundo, pero lo peligroso 
            radica en que esta puede afectar la conducta de las personas y su toma de decisiones, por 
            eso en temas de seguridad y protección civil es indispensable contar con datos con alta 
            disponibilidad, consistencia y tolerancia a fallos. Para que con esto las personas puedan 
            tomar las decisiones más oportunas logrando salvaguardad su seguridad y la de sus seres 
            queridos. Por eso es importante que la sociedad se rodee de fuentes confiables y entendibles, 
            como por ejemplo la página de datos abiertos de jalisco la cual dispone de 17 archivos en 
            materia de seguridad y protección civil, lamentablemente esta información es poco conocida a 
            pesar del gran valor que tiene, debido a que se encuentra en formatos .xls, .csv y .kml lo cual 
            hace que sean difíciles de entender o por lo menos requeriría un lago tiempo extraer algo de 
            utilidad como determinar que municipio es el menos conflictivo en temas de delito para, por ejemplo, 
            poder mudarse.</p>
    </div>
    <div class="mb-3">
        <h1> Objetivos </h1>
        <p>
            <ul>
                <li>Realizar la inscripción del proyecto.</li>
                <li>Rectificar que el planteamiento del problema es correcto para poder darle continuidad al proyecto.</li>
                <li>Documentar los hallazgos encontrados en un reporte para entregarlo a los supervisores del proyecto.</li>
                <li>Elaborar la maquetación de la página web.</li>
                <li>Programar el front-end, back-end.</li>
                <li>Elaborar un diagrama entidad relación de la base de datos a utilizar.</li>
                <li>Conectar la base de datos a la aplicación.</li>
                <li>Elaborar un prototipo funcional y buscar fallas (Testing).</li>
                <li>Incorporar las herramientas de Big Data y Cloud Computing.</li>
                <li>Documentar todo el proyecto mediante el ERS con fines educativos.</li>
                <li>Elaborar la entrega final de página web (Deployment).</li>
                <li>Presentar el proyecto final y elaborar un poster para dar prueba del trabajo de este semestre.</li>
            </ul>  
        </p>
    </div>
    <div class="mb-3">
        <h1> Justificación </h1>
        <p>
            Últimamente se han reportado y visto un incremento de actos de delincuencia 
            en algunos sectores de Guadalajara, Zapopan, Tlaquepaque, etc. En un artículo 
            que se publicó en El Diario NTR (2021) el cual habla de que Jalisco fue el 
            segundo estado del país con mayor cantidad de delitos de delincuencia organizada. 
            Por lo cual los ciudadanos se sienten cada vez más desconfiados e inseguros al 
            salir de su casa ya sea para ir al trabajo, estudiar o para alguna necesidad. 
            Por eso nosotros tenemos la idea de hacer una página web informativa con dashboards 
            que permitan al usuario ver en tiempo real como están las zonas y si hay reportes de 
            algún acto delictivo, esto con la finalidad de que el usuario tome sus debidas 
            precauciones para llegar a su destino final, ya que los jóvenes hoy en día se 
            informan por medio de las redes y medios sociales que se encuentran en la red 
            según una investigación hecha por Barbara Yuste (2020). Por lo cual nosotros 
            planteamos que se podría reducir un poco los actos de delincuencia y dar una 
            confianza a las personas, ya que los usuarios podrán estar haciendo reportes 
            y con eso alertar a las autoridades para que se estén vigilando las zonas y 
            así poder salir con más confianza y estar seguros de que rutas tomar para 
            evitar algún acto de delincuencia.
        </p>
    </div>
  </div>
</template>

<script>
// import mapJson from "./data.geojson"
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 6,
      center: [48, -1.219482],
      geojson: null,
      fillColor: "#e4ce7f",
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482)
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>code:" +
            feature.properties.code +
            "</div><div>nom: " +
            feature.properties.nom +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  },
  async created() {
    this.loading = true;
    const response = await fetch("https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson")
    const data = response;
    console.log(data)
    this.geojson = data;
    this.loading = false;
  }
};
</script>
