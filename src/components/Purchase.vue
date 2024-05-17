<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
    
export default defineComponent({ //le mot clé  + l'import en haut est nécessaire quand on utilise typescript
    name:"purchase",
    data(){
        return {
            bookId: null,
            book : null,
            books: this.fetchBooks(),
            reading: null,
            newBookTitle: '',
            newBookPrice: null,
            newBook: null,
            newBookErrorMsg: [],
            added: 0,
            deletedBook: '',
            selectedBook: null,
        }
    },
    methods: {
        increment() {
            this.bookId++
        },
        selectBook(livre : any){
            this.selectedBook = livre;
        },
        async fetchBooks(){
            try {
                const res = await fetch('/api/book/list'); //quelle différence avec let ?
                this.books = await res.json();
            } catch(error){
                console.log(error);
            }
        },
        getBook: async function(idb : any){
            try {
                let response = await axios({ //quelle différence avec const ?
                    method: 'get',
                    url: `/api/book/${idb}`
                });

                this.book = response.data;
            }
            catch(error) {
                console.log(error);
            }
        },
        getBookContent: async function(id : any){
            try {
                let response = await axios({
                    method: 'get',
                    url: `/api/book/${id}/pages`
                });

                this.reading = response.data;
            }
            catch(error) {
                console.log(error);
            }
        },
        addBook: async function(title : any, price : any){
            if(title != null && title != '' && price > 0){
                try {
                    let response = await axios({
                        method: 'post',
                        url: `/api/book/${title}/${price}`
                    });

                    this.newBook = response.data;
                    this.added = 1;
                    this.books = this.fetchBooks()
                }
                catch(error) {
                    console.log(error);
                }
            }
            else {
                this.added = -1;
                this.newBookErrorMsg = [];
                if(title == null || title == ''){
                    this.newBookErrorMsg.push({id:1, text:"Vous devez saisir un titre."});
                }
                if(price == null || price <= 0){
                    this.newBookErrorMsg.push({id:2, text:"Vous devez saisir un prix supérieur à 0."});
                }
            }
        },
        removeBook: async function(livre: any) {
            try {
                let response = await axios({
                    method: 'delete',
                    url: `/api/book/${livre.id}`
                });

                this.books = this.books.filter((l) => l.id != livre.id);
                this.deletedBook = response.data;
            }
            catch(error) {
                console.log(error);
                this.deletedBook = "Une erreur est survenue dans la suppression de " + livre.title;
            }
        }
    },
    mounted(){
        this.getBook(this.bookId); //nécessaire d'écrire ça ici sinon le this.bookId n'est pas pris en compte
        this.getBookContent(this.bookId)
    },
    watch:{
        selectedBook(){
            this.getBook(this.selectedBook.id);
            this.getBookContent(this.selectedBook.id);
        }
    },
})
</script>
    
<template>
<h1 class="green">Achats</h1>
<br><br><br>

<div class="row">
    <div id="actions" class="column left">
        <h2>Actions</h2><br>
        
        <form @submit.prevent="addBook(newBookTitle, newBookPrice)">
            <input v-model="newBookTitle" placeholder="Ajouter un titre">
            <input v-model="newBookPrice" placeholder="Ajouter un prix supérieur à 0">
            <button>Ajouter ce livre</button>
        </form>
        <br>
        <div v-if="added < 0">
            Erreur :
            <p v-for="msg in newBookErrorMsg" :key="msg.id">{{ msg.text }}</p>
        </div>
        <div v-else-if="newBook">
            {{ newBook.title}} a été ajouté au prix de {{ newBook.price }} euros !
        </div>
        <div v-else></div>
    </div>

    <div id="rayon" class="column middle">
        <h2>Livres en rayon</h2><br>
        
        <span v-if="!books">Chargement de la librairie...</span>
        <div id="catalog" v-else>
            <div class="book" v-for="livre in books" :key="livre.id">
                <div class="bookTitle">{{ livre.title }}</div>
                <div class="bookInfos"></div>
                <br>
                <button @click="selectBook(livre)">Lire</button> id : {{ livre.id }} ..::.. prix : {{ livre.price }} <button @click="removeBook(livre)">X</button>
            </div>
        </div>
        <br>
        <p v-if="deletedBook != ''">{{ deletedBook }}</p>
        <p v-else></p>
    </div>

    <div id="reading" class="column right">
        <h2>Lecture</h2><br>
        
        <div class="noBookSelected" v-if="!selectedBook">Aucun livre n'est sélectionné.</div>
        <div class="selectedReading" v-else>
            {{ selectedBook.title }}<br>
            Id : {{ selectedBook.id }}, prix : {{ selectedBook.price }}
        </div>
        <br>
        
        <div class="noReadSection" v-if="Array.isArray(reading) && reading.length == 0">
            Aucune page
        </div>
        <div class="readSection" v-else v-for="page in reading" :key="page.number">
            <p>Page {{ page.number }} :</p>
            {{ page.firstword }}
        </div>
    </div>
</div> 

<br><br><br>
</template>