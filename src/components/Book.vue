<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import BookDetails from './BookDetails.vue';//
import Reading from './Reading.vue';
import BooksList from './BooksList.vue';
import Actions from './Actions.vue';

export type actionResult = { title: string, messages: actionResultMessage[] }
export type actionResultMessage = { id: number, text: string }
export type livre = { id: number, title: string, price: number }
export type livrebean = { book: livre, pageCount: number }
export type rnumber = {id: number, isUsed: boolean}
export type page = { id: number, firstword: string, number: number, bookid: number }

export default defineComponent({ //le mot clé 'defineComponent' + l'import en haut est nécessaire quand on utilise typescript
name:"book",

components: {
    /**/BookDetails, Reading, BooksList, Actions
},

data(){
    return {
        actionResult: null as actionResult|null,

        books: this.getBooks() as livrebean[],

        rnumbers: this.getRnumbers() as rnumber[],

        isModeLarge: false as boolean,
        
        selectedBook: null as livrebean|null,
        selectedBookPages: [] as page[]|null,
        selectedPage: null as page|null,
    }
},

methods: {

/** créé un livre dont le titre est @title et le prix est @price puis actualise la liste des livres */
addBook: async function(title : string, price : number|null){
    
    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;

    if(title && price && price > 0){

        try {
            let response = await axios({
                method: 'post',
                url: `/api/book/${title}/${price}/complete`
            });
            
            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: "Le livre " + response.data.book.title + " a été ajouté !"});

            this.books.push(response.data);
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        actionResultTitle = 'Echec';
        
        if(title == null || title == ''){
            actionResultMessagesTab.push({id:2, text:"Vous devez saisir un titre."});
        }
        if(price == null || price <= 0){
            actionResultMessagesTab.push({id:3, text:"Vous devez saisir un prix supérieur à 0."});
        }
    }

    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
},

/** créé une page à la fin de @book et actualise la liste des pages en lecture */
addPage: async function(pageContent : string, bookId? : number){
    
    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;
    
    if(pageContent && bookId){

        try {
            let response = await axios({
                method: 'post',
                url: `/api/page/${bookId}/${pageContent}`
            });

            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: "La page a été ajoutée !"});

            //update books et selectedBook en même temps
            this.books.forEach((b) => b.pageCount = b.book.id == bookId
                                    ? b.pageCount + 1
                                    : b.pageCount);

            //update selectedBookPages
            if(this.selectedBookPages == null){
                this.selectedBookPages = [];
            }
            this.selectedBookPages.push(response.data);

            if(this.selectedBookPages.length == 1){
                this.selectedPage = this.selectedBookPages[0];
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        actionResultTitle = 'Echec';
        
        if(pageContent == null || pageContent == ''){
            actionResultMessagesTab.push({id:2, text:"Vous devez écrire quelque chose."});
        }
    }

    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
},

/** ajoute le livre au panier du user */
buyBook: async function(bookId? : number){
    
    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;
    
    if(bookId){
        try {
            let response = await axios({
                method: 'post',
                url: `/api/purchase/${bookId}`
            });

            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: "Le livre a été acheté !"});

            //update books et selectedBook en même temps
            /*this.books.forEach((b) => b.pageCount = b.book.id == bookId
                                    ? b.pageCount + 1
                                    : b.pageCount);*/

            //update selectedBookPages
            /*if(this.selectedBookPages == null){
                this.selectedBookPages = [];
            }
            this.selectedBookPages.push(response.data);

            if(this.selectedBookPages.length == 1){
                this.selectedPage = this.selectedBookPages[0];
            }*/
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        actionResultTitle = 'Echec';
        
        /*if(pageContent == null || pageContent == ''){
            actionResultMessagesTab.push({id:2, text:"Vous devez écrire quelque chose."});
        }*/
    }

    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
},

/** actualise la liste des pages en lecture */
getBookContent: async function(book : livrebean|null, isNewBook: boolean){
    
    if(book){
        try {
            let response = await axios({
                method: 'get',
                url: `/api/book/${book.book.id}/pages`,
            });

            this.selectedBookPages = response.data;

            let page = this.selectedBookPages && this.selectedBookPages.length > 0
            ? this.selectedBookPages[0]
            : null;
        this.updateSelectedPage(page);
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        this.selectedBookPages = null;
    }
},

/** actualise la liste des livres */
getBooks: async function(){

    try {
        let booksList = await axios({
                method: 'get',
                url: '/api/book/list/complete',
                auth: {
                    username: "user",
                    password: "azerty",
                }
            });

        this.books = await booksList.data;

    } catch(error){
        console.log(error);
    }
},

/** actualise la liste des livres */
getRnumbers: async function(){

    try {
        let rnumbersList = await axios({
                method: 'get',
                url: '/api/rnumber/list',
                auth: {
                    username: "user",
                    password: "azerty",
                }
            });

        this.rnumbers = await rnumbersList.data;

    } catch(error){
        console.log(error);
    }
},

/**  */
modifyPageContent: async function(newPageContent : string, pageId : number){

    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;

    if(newPageContent && pageId){

        try {
            let response = await axios({
                method: 'put',
                url: `/api/page/${pageId}/${newPageContent}`
            });

            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: "La page a été modifiée pour " + response.data.firstword + " !"});

            this.selectedPage = response.data;

            if(this.selectedBookPages){
                this.selectedBookPages.forEach(
                    (p) => p.firstword = p.id == pageId
                        ? response.data.firstword
                        : p.firstword
                );
            }
        }
        catch(error) {
            console.log(error);
        }
    } else {
        actionResultTitle = 'Echec';
        
        if(!newPageContent){
            actionResultMessagesTab.push({id:2, text:"Vous devez saisir un contenu."});
        }
        if(!pageId){
            actionResultMessagesTab.push({id:3, text:"Vous devez sélectionner une page."});
        }
    }

    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
},

/** remplace le titre de @book par @newTitle */
modifyTitle: async function(newTitle : string, bookId : number){

    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;

    if(newTitle && bookId){

        try {
            let response = await axios({
                method: 'put',
                url: `/api/book/${bookId}/${newTitle}/complete`
            });

            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: "Le titre a été changé pour " + response.data.book.title + " !"});

            this.books.forEach((b) => b.book.title = b.book.id == bookId
                                    ? response.data.book.title
                                    : b.book.title);
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        actionResultTitle = 'Echec';
        
        if(!newTitle){
            actionResultMessagesTab.push({id:2, text:"Vous devez saisir un titre."});
        }
        if(!bookId){
            actionResultMessagesTab.push({id:3, text:"Vous devez sélectionner un livre."});
        }
    }

    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
},

/** efface les messages de résultat d'une action*/
removeActionMessage(){
    this.actionResult = null;
},

/** supprime le livre @livrebean et ses pages */
removeBook: async function(livrebean: livrebean) {

    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;

    if(livrebean != null){

        try {
            let response = await axios({
                method: 'delete',
                url: `/api/book/${livrebean.book.id}`
            });

            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: response.data });

            this.books = this.books.filter((l) => l != livrebean);

            this.updateSelectedBookAndBookContent(null);
        }
        catch(error) {
            console.log(error + " Une erreur est survenue dans la suppression de " + livrebean.book.title);
        }
    }
    else {
        actionResultTitle = 'Echec';
        actionResultMessagesTab.push({id:2, text:"Aucun livre n'est sélectionné."});
    }

    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
},

/** met à jour les pages du livre sélectionné pour la lecture */
removeFromPagesList(page: page){

    if(this.selectedBookPages != null){
        this.selectedBookPages = this.selectedBookPages.filter((p) => p.id != page.id);
        this.selectedBookPages.forEach((p) => p.number = p.number > page.number ? p.number - 1 : p.number);
    }
},

/** supprime la page @page et rectifie le numéro des pages suivantes */
removePage: async function(page: page, book: livrebean) {
    
    let actionResultMessagesTab = [];
    let actionResultTitle = '';
    this.actionResult = null;

    if(page != null){

        try {
            let response = await axios({
                method: 'delete',
                url: `/api/page/${page.id}`
            });

            actionResultTitle = 'Succès !';
            actionResultMessagesTab.push({id:1, text: response.data });

            
            this.removeFromPagesList(page);

            if(this.selectedBook){
                this.selectedBook.pageCount = this.selectedBook.pageCount - 1;
            }

            this.updateSelectedBookAndBookContent(book);
        }
        catch(error) {
            console.log(error + " Une erreur est survenue dans la suppression de " + page.firstword);
        }
    }
    else {
        actionResultTitle = 'Echec';
        actionResultMessagesTab.push({id:2, text:"Aucun livre n'est sélectionné."});
    }
    
    this.actionResult = {title: actionResultTitle, messages: actionResultMessagesTab};
    this.$emit("actionMessageEvent", this.actionResult);
},

/** Trie la liste des livres par id */
sortById(isAsc : boolean){
    if(isAsc){
        this.books?.sort((a, b) => {
            return a.book.id > b.book.id ? 1 : -1;
        });
    }
    else {
        this.books?.sort((a, b) => {
         return a.book.id > b.book.id ? -1 : 1;
        });
    }
},

/** Trie la liste des livres par nombre de page */
sortByPage(isAsc : boolean){
    if(isAsc){
        this.books?.sort((a, b) => {
            return a.pageCount > b.pageCount ? 1 : -1;
        });
    }
    else {
        this.books?.sort((a, b) => {
         return a.pageCount > b.pageCount ? -1 : 1;
        });
    }
},

/** Trie la liste des livres par prixe */
sortByPrix(isAsc : boolean){
    if(isAsc){
        this.books?.sort((a, b) => {
            return a.book.price > b.book.price ? 1 : -1;
        });
    }
    else {
        this.books?.sort((a, b) => {
         return a.book.price > b.book.price ? -1 : 1;
        });
    }
},

/** Trie la liste des livres par titre */
sortByTitle(isAsc : boolean){
    if(isAsc){
        this.books?.sort((a, b) => {
            return a.book.title > b.book.title ? 1 : -1;
        });
    }
    else {
        this.books?.sort((a, b) => {
         return a.book.title > b.book.title ? -1 : 1;
        });
    }
},

setModeLarge(isModeLarge : boolean){
    this.isModeLarge = isModeLarge;
},

/** met à jour le livre sélectionné et les pages de lecture */
updateSelectedBookAndBookContent(livre : livrebean|null){
    
    if(livre == null){
        this.setModeLarge(false);
    }
    let selectedBookBefore = this.selectedBook;
    this.selectedBook = livre;
    this.getBookContent(livre, selectedBookBefore?.book.id != livre?.book.id);
},

/** met à jour la page sélectionnée */
updateSelectedPage(page: page|null){

    this.selectedPage = page;
}

},
})
</script>



<template>
<div class="row titleRow">
    <!--<div id="mainTitle" class="column titlecol left">
        TITRE 
        <h1 class="green">Livres</h1>
    </div>-->

    <BookDetails
        :parentSelectedBook="selectedBook"

        @onUnselectBookEvent="updateSelectedBookAndBookContent(null)"
        @onBuyBookEvent="(bookId) => buyBook(bookId)">
    </BookDetails><!---->
</div>

<div class="row maincontent">
    <Actions
        :parentActionresult="actionResult"
        :parentSelectedBook="selectedBook"
        :parentSelectedPage="selectedPage"
        :parentIsModeLarge="isModeLarge"
        
        @addBook="(newBookTitle, newBookPrice) => addBook(newBookTitle, newBookPrice)"
        @addPage="(pageContent, bookId) => addPage(pageContent, bookId)"
        @modifyPage="(newPageContent, pageId) => modifyPageContent(newPageContent, pageId)"
        @modifyTitle="(newTitle, bookId) => modifyTitle(newTitle, bookId)"
        @removeActionMessage="removeActionMessage()">
    </Actions>
    
    <BooksList v-if="!isModeLarge"
        :parentSelectedBook="selectedBook"
        :parentMyBooks="books"
        :parentMyRnumbers="rnumbers"

        @onRemoveBookEvent="(book) => removeBook(book)"
        @onSelectBookEvent="(book) => updateSelectedBookAndBookContent(book)"

        @onSortByIdEvent="(isAsc) => sortById(isAsc)"
        @onSortByPageEvent="(isAsc) => sortByPage(isAsc)"
        @onSortByPrixEvent="(isAsc) => sortByPrix(isAsc)"
        @onSortByTitleEvent="(isAsc) => sortByTitle(isAsc)">
    </BooksList>
    
    <Reading
        :parentSelectedBook="selectedBook"
        :parentSelectedPage="selectedPage"
        :parentSelectedBookPages="selectedBookPages"
        :parentIsModeLarge="isModeLarge"

        @removePage="(page, bookId) => removePage(page, bookId)"
        @onSelectPageEvent="(page) => updateSelectedPage(page)"
        @setModeLarge="(isModeLarge) => setModeLarge(isModeLarge)">
    </Reading>
</div> 
</template>



<style>
*{
    box-sizing: border-box;
}

#mainTitle{
    width: 22%;
}
#selectedBook{
    width: 100%;
}

.actionError{
    margin-bottom: 5px;
}
.actionErrorButton{
    float: right;
    margin: 5px;
}
.actions{
    float: right
}

.column {
    float: left;
    padding: 5px;
}

.row{
    display: flex;
    justify-content: space-between;
}

.scrollablecolumn{
    max-height: 650px;
    overflow-y:auto; /*pour rendre la div scrollable*/
    margin-top: 10px;
}
.sectioncontent{
    width: 33.33%;
}
.sectioncontentlarge{
    width: 73%;
}
.sectioncontentsmall{
    width: 25%;
}

.titleRow{
    margin-top: 40px;
    margin-bottom: 15px;
    justify-content: flex-start;
}
</style>