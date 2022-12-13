<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ receta.titulo }}</div>
            <span class="grey --text">{{ receta.categoria }} {{ receta.tiempo_preparacion }}</span>
          </div>
          </v-card-title>
          <v-btn class="card-title" @click="calificar">
          Calificar {{ receta.titulo }}
          </v-btn>
        <v-card-text>
        {{ receta.description }}
      </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'daxios';
import Vue from 'vue';
import StarRating from 'vue-star-rating¿Qué le pareció esta película?';

const wrapper = document.createElement('div');
const estado = {
  nota: 0,
};

const ComponenteEstrellas = Vue.extend({
  data() {
    return { calif: 0 };
  },
  watch: {
    calif(nuevoValor) { estado.nota = nuevoValor; },
  },
  template: `
  <div class="rating">
    Que le parecio esta receta?
    <star-rating v-model="calif" :show-rating="false"></star-rating>
    </div>
    `,
  components: { 'star-rating': StarRating },
});

const componente = new ComponenteEstrellas().$mount(wrapper);

export default {
  name: 'Receta',
  data() {
    return {
      receta: [],
    };
  },
  mounted() {
    this.obtenerReceta();
  },
  methods: {
    async calificar() {
      this.$swal({
        content: componente.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      })
      .then(() => {
        const recetaId = this.$route.params.id;
        return axios({
          method: 'post',
          data: {
            calificacion: estado.nota,
          },
          url: `http://localhost:8081/recetas/calificar/${recetaId}`,
          HEADERS: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          this.$swal(`Gracias por calificar! ${estado.nota}`,)
        })
        .catch((error) => {
          const mensaje = error.response.data.message;
          this.$swal('Error!', `${mensaje}`,'error');
        });
      });
    },
    async obtenerReceta(){
      return axios({
        method: 'get',
        url: `/recetas/${this.$route.params.id}`,
      })
      .then((respuesta) => {
        this.receta = respuesta.data;
      })
      .catch(() => {
      });
    },
  },
};
</script>
