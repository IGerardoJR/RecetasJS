import Vue from 'vue';
import Router from 'vue-router';
import Inicio from '@/components/Inicio';
import Contacto from '@/components/Contacto';
import AgregarPelicula from '@/components/AgregarPelicula';
import Pelicula from '@/components/Pelicula';
import Registro from '@/components/Registro';
import Login from '@/components/Login';
// Importamos los archivos de nuestro proyecto
import AgregarReceta from '@/components/AgregarReceta';
import Receta from '@/components/Receta';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio,
    },
    {
      path: '/contacto',
      name: 'Contacto',
      component: Contacto,
    },
    {
      path: '/recetas/agregar',
      name: 'AgregarReceta',
      component: AgregarReceta,
    },
   {
      path: '/recetas/:id',
      name: 'Receta',
      component: Receta,
   },
    {
      path: '/peliculas/:id',
      name: 'Pelicula',
      component: Pelicula,
    },
    {
      path: '/usuarios/registro',
      name: 'Registro',
      component: Registro,
    },
    {
      path: '/usuarios/login',
      name: 'Login',
      component: Login,
    },
  ],
});
