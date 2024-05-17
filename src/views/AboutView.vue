<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export type backversion = string

export default defineComponent({ //le mot clé 'defineComponent' + l'import en haut est nécessaire quand on utilise typescript
name:"about",

data(){
    return {
        backversion: this.getBackVersion() as string,
    }
},

methods: {
/** affiche la version du back-end */
getBackVersion: async function(){

    try {
        let backversion = await axios({
          method: 'get',
          url: '/api/version/',
        });

        this.backversion = await backversion.data;

    } catch(error){
        console.log(error);
    }
}

},
})
</script>

<template>
  <div class="about">
    <div><h1>This is an about page</h1></div>
    <div class="backversion">Back-end's version : {{  backversion }}</div>
  </div>
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100px;
    display:inline;
    align-items: center;
  }
  .backversion {
    display: flex;
    align-items: center;
  }
}
</style>
