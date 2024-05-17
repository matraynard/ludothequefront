<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { defineComponent } from 'vue';
import BigTitle from './BigTitle.vue';
//import BookDetails from './BookDetails.vue';

export type livre = { id: number, title: string, price: number }
export type livrebean = { book: livre, pageCount: number }

export default defineComponent({/**/
name:"app",

components: {
  BigTitle/*, BookDetails*/
},

data(){
    return {
        selectedLabel: 'Livres' as string,
        selectedBook: null as livrebean|null,
    }
},
methods: {
  //coder une méthode getActiveLink qui récupère les
  //éléments <a> de l'élément nav, trouve l'élément
  //dont la class contient "active", récupère le text
  //de ce <a>, le met dans selectedLabel
  updateSelectedLink(title : string){
    this.selectedLabel = title;
},
},
})/**/
</script>

<template>
  <header>
    <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

    <div class="wrapper">
      <!--<BigTitle msg="You did it!" />-->
      <BigTitle
          :parentSelectedlabel="selectedLabel">
      </BigTitle>

      <!--<BookDetails
        :parentSelectedBook="selectedBook"

        @onUnselectBookEvent="updateSelectedBookAndBookContent(null)"
        @onBuyBookEvent="(bookId) => buyBook(bookId)">
      </BookDetails>-->

      <nav>
        <RouterLink to="/books" @click="updateSelectedLink('Livres')">Livres</RouterLink>
        <RouterLink to="/pages" @click="updateSelectedLink('Pages')">Pages</RouterLink>
        <RouterLink to="/customers" @click="updateSelectedLink('Clients')">Clients</RouterLink>
        <RouterLink to="/purchases" @click="updateSelectedLink('Achats')">Achats</RouterLink>
        <RouterLink to="/about" @click="updateSelectedLink('About')">About</RouterLink>
        <RouterLink to="/" @click="updateSelectedLink('Welcome')">Vue's welcome</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
  border-left: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: baseline;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
