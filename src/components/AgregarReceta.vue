<template>
  <v-form v-model="validado" ref="form" lazy-validation>
  <v-text-field
    label="Titulo"
    v-model="titulo"
    :rules="reglasTitulo"
    required></v-text-field>
    <v-text-field
      label="Descripcion"
      v-model="descripcion"
      :rules="reglasDescripcion"
      required></v-text-field>
    <v-select
      label="Nivel de Dificultad"
      v-model="nivel_dificultad"
      :items="niveles_dificultad"
      :rules="reglasNivelDificultad"
      required></v-select>
    <v-select
      label="Tiempo de preparacion"
      v-model="tiempo_preparacion"
      :items="tiempos_preparaciones"
      :rules="reglasTiempoPreparacion"
      required></v-select>
      <v-select
      label="Tiempo de coccion"
      v-model="tiempo_coccion"
      :items="tiempos"
      :rules="reglasTiempoCoccion"
      required></v-select>
      <v-select
        label="Categoria"
        v-model="categoria"
        :items="categorias"
        required
        :rules="reglasCategoria">
      </v-select>
      <v-text-field
      label="Ingredientes"
      v-model="ingredientes"
      :rules="reglasIngredientes"
      required></v-text-field>
      <v-btn @click="enviar" :disabled="!validado">
        Enviar
        </v-btn>
      <v-btn @click="limpiar">Limpiar</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  date: () => ({
    validado: true,
    titulo: '',
    reglasTitulo: [
      v => !!v || 'Se requiere el titulo de la receta',
    ],
    descripcion: '',
    reglasDescripcion: [
      v => !!v || 'Se requiere la descripcion de la receta',
    ],
    nivel_dificultad: '',
    reglasNivelDificultad: [
      v => !!v || 'Se requiere el nivel de dificultad de la receta',
    ],
    niveles_dificultad: [
      'Facil',
      'Intermedio',
      'Dificil',
    ],
    tiempo_preparacion: '',
    reglasTiempoPreparacion: [
      v => !!v || 'Se requiere el tiempo de preparacion de la receta',
    ],
    tiempos_preparaciones: [
      '-5 minutos',
      '5 minutos',
      '10 minutos',
      '15 minutos',
      '20 minutos',
      '25 minutos',
      '30 minutos',
      '35 minutos',
      '40 minutos',
      '45 minutos',
      '50 minutos',
      '55 minutos',
      '60 minutos',
      '65 minutos',
      '70 minutos',
      '75 minutos',
      '80 minutos',
      '85 minutos',
      '90 minutos',
      '95 minutos',
      '100 minutos',
      '105 minutos',
      '110 minutos',
      '115 minutos',
      '120 minutos',
      '125 minutos',
      '130+ minutos',
    ],
    tiempo_coccion: '',
    reglasTiempoCoccion: [
      v => !!v || 'Se requiere el tiempo de coccion de la receta',
    ],
    tiempos: [
      '-5 minutos',
      '5 minutos',
      '10 minutos',
      '15 minutos',
      '20 minutos',
      '25 minutos',
      '30 minutos',
      '35 minutos',
      '40 minutos',
      '45 minutos',
      '50 minutos',
      '55 minutos',
      '60 minutos',
      '65 minutos',
      '70 minutos',
      '75 minutos',
      '80 minutos',
      '85 minutos',
      '90 minutos',
      '95 minutos',
      '100 minutos',
      '105 minutos',
      '110 minutos',
      '115 minutos',
      '120 minutos',
      '125 minutos',
      '130+ minutos',
    ],
    categoria: '',
    reglasCategoria: [
      v => !!v || 'Se requiere establecer la categoria de la receta',
    ],
    select: null,
    categorias: [
      'Desayuno',
      'Almuerzo',
      'Postres',
      'Cenas',
      'Exotico',
    ],
    ingredientes: '',
    reglasIngredientes: [
      v => !!v || 'Se requiere establecer los ingredientes de la receta',
    ],
  }),
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            titulo: this.titulo,
            descripcion: this.descripcion,
            nivel_dificultad: this.nivel_dificultad,
            tiempo_preparacion: this.tiempo_preparacion,
            tiempo_coccion: this.tiempo_coccion,
            categoria: this.categoria,
          },
          url: '/recetas',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Exito',
              'La recete ha sido agregada correctamente!',
              'success',
            );
            this.$router.push({ name: 'recetas' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Lo sentimos',
              'Su recete no ha podido ser agregada, intente mas tarde',
              'error',
            );
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
