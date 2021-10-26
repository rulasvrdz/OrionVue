<template>
  <base-table :data="data"
              :columns="columns"
              thead-classes="text-primary">
              
  </base-table>
</template>
<script>
  import { BaseTable } from "@/components";
  export default {
    components: {
      BaseTable
    },
    data(){
      return{
        columns: [
        "Delito",
        "Municipio",
        "Descripcion",
        "Hora"
      ],
      data: [
        {
          "id": 1,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Niger",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 2,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Curaçao",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 3,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Netherlands",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 4,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Korea, South",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 5,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Malawi",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 6,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Chile",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 7,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 8,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 9,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 10,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 11,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 12,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 13,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 14,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 15,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 16,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 17,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        },
        {
          "id": 19,
          "delito": "Lorem",
          "hora": "00:00",
          "municipio": "Portugal",
          "descripcion": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, repellat."
        }
      ]
      }
    },
  }
</script>
<style>
</style>
