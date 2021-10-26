<template>
  <card>
    <h5 slot="header" class="title text-uppercase">Generar nuevo reporte</h5>
    <div class="row">
      <div class="col-md-4 pr-md-1">
          <label>Selecciona el delito</label>
                <select class="form-control">
                  <option>Delito 1</option>
                  <option>Delito 2</option>
                  <option>Delito 3</option>
                  <option>Delito 4</option>
                  <option>Delito 5</option>
                </select>
      </div>
      <div class="col-md-4">
          <label>Selecciona el Municipio</label>
                <select class="form-control">
                  <option>Opcion 1</option>
                  <option>Opcion 2</option>
                  <option>Opcion 3</option>
                  <option>Opcion 4</option>
                  <option>Opcion 5</option>
                </select>
      </div>
      <div class="col-md-4 pl-md-1">
            <label>Hora:</label>
            <input class="form-control" type="text" placeholder="HH:MM">
      </div>
    </div>
    <div class="row">
      
      <div class="col-md-6 pr-md-1">
          
            <label>Ubicacion:</label>
            <input class="form-control" type="text" placeholder="Calle, Colonia, CP">
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input>
          <label>Breve descripcion</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Brinda una breve descripcion de lo ocurrido"
                    v-model="model.about">

              </textarea>
        </base-input>
      </div>
    </div>
    <button @click="send" class="btn btn-primary">Enviar</button>
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    methods:{
        send(){
            console.log("Reporte enviado")
        }
    }
  }
</script>
<style>
</style>
