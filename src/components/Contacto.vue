<template>
<v-form v-model="valido" ref="formulario" lazy-validation>
<v-text-field
  label="Correo electronico"
  v-model="correo"
  :rules="reglasEmail"
  required></v-text-field>
   <v-btn @click="registrar" :disabled="!valido">Registrar</v-btn>
  <v-btn @click="limpiar">Limpiar</v-btn>
  <br>
  <br>
  <br>
  <v-text>
    <h2> O </h2>
  </v-text>
</v-form>

</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    email: '',
    reglasEmail: [
      v => !!v || 'Se requiere el email',
      v => /\S+@\S+\.\S+/.test(v) || 'El email debe de ser válido',
    ],
  }),
  methods: {
    async registrarCorreo() {
      if (this.$refs.formulario.validate()) {
        return axios({
          method: 'post',
          data: {
            email: this.email,
          },
          url: '/notificar/correos',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Correo registrado',
              'Cualquier novedad se le notificara a su correo',
              'success',
            );
            this.$router.push({ name: 'Home' });
          })
          .catch((error) => {
            const mensaje = error.response.data.mensaje;
            this.$swal(
              'Error',
              `${mensaje}`,
              'error',
            );
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>
