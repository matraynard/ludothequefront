<script lang="ts">
import { defineComponent } from 'vue';

export type actionResult = { title: string, messages: actionResultMessage[] }
export type actionResultMessage = { id: number, text: string }

export type livre = { id: number, title: string, price: number }
export type livrebean = { book: livre, pageCount: number }

export type page = { id: number, firstword: string, number: number, bookid: number }

export default defineComponent({
name:"reading",

data(){
    return {
        newBookTitle: '' as string|null,
        newBookPrice: '' as number|null,

        newPageContent: '' as string|null,

        newTitleToModify: '' as string|null,

        pageContent: '' as string|null,
    }
},

methods: {

/** demande l'ajout d'un livre */
addBook(){
    this.$emit('addBook', this.newBookTitle, this.newBookPrice);
    this.resetFormFields();
},

/** demande l'ajout d'une page */
addPage(){
    this.$emit('addPage', this.pageContent, this.parentSelectedBook.book.id);
    this.resetFormFields();
},

/** demande la modification de la page */
modifyPage(){
    this.$emit('modifyPage', this.newPageContent, this.parentSelectedPage.id);
    this.resetFormFields();
},

/** demande la modification du titre du livre */
modifyTitle(){
    this.$emit('modifyTitle', this.newTitleToModify, this.parentSelectedBook.book.id);
    this.resetFormFields();
},

/** remet à 0 les champs des forms d'action */
resetFormFields(){
    this.newBookTitle = '';
    this.newBookPrice = '';
    this.newPageContent = '';
    this.newTitleToModify = '';
    this.pageContent = '';
}

},

props: {
    parentActionresult: {type:  null as actionResult|null},
    parentSelectedBook: {type: null as livrebean|null},
    parentSelectedPage: {type: null as page|null},
    parentIsModeLarge: {type: null as boolean|null},
},

emits: ['addBook',
        'addPage',

        'modifyPage',
        'modifyTitle',

        'removeActionMessage'],
})
</script>



<template>
<div id="actions" :class="parentIsModeLarge ? 'column left actioncontent sectioncontentsmall' : 'column left actioncontent sectioncontent'">
    <!-- SECTION ACTIONS -->
    <h2>Actions</h2>
    <hr>
    <div class="scrollablecolumn"><!-- Actions result messages -->
        <div class="actionError" v-if="parentActionresult != null">
            
            <button @click="$emit('removeActionMessage')" class="removeActionMessageButton">X</button>
            {{ parentActionresult.title }}
            <p v-for="msg in parentActionresult.messages" :key="msg.id">{{ msg.text }}</p>
            <hr>
        </div>

        <!-- Actions -->
        <div class="basicActions">
            <form class="actionform" @submit.prevent="addBook"><!-- AJOUTER UN LIVRE -->
                <button class="btn-action" :disabled="newBookTitle == '' || newBookPrice == ''">Ajouter un livre</button><br>
                <input style="margin-right:3px; width:190px" v-model="newBookTitle" placeholder="Le titre">
                <input style="width:100px" type="number" v-model="newBookPrice" placeholder="Prix > 0">
            </form>
        </div>

        <div class="selectedBookForActions" v-if="parentSelectedBook != null">
            <form class="actionform" @submit.prevent="modifyTitle"><!-- MODIFIER LE TITRE -->
                <button class="btn-action" :disabled="newTitleToModify == ''">Changer le titre</button><br>
                Ancien titre : {{ parentSelectedBook.book.title }}<br>
                <input style="width:97%" v-model="newTitleToModify" placeholder="Nouveau titre">
            </form>
            
            <form class="actionform" @submit.prevent="addPage"><!-- AJOUTER UNE PAGE -->
                <button class="btn-action" :disabled="pageContent == ''">Ajouter une page</button><br>
                <b style="font-weight: bold;text-decoration: underline;">{{ parentSelectedBook.book.title }}</b> a {{ parentSelectedBook.pageCount }} pages<br>
                <input style="width:97%" v-model="pageContent" placeholder="Ecrire la page">
            </form>
            
            <form class="actionform" v-if="parentSelectedPage != null" @submit.prevent="modifyPage"><!-- MODIFIER UNE PAGE -->
                <button class="btn-action" :disabled="newPageContent == ''">Réécrire la page</button><br>
                Actuellement :<br>{{ parentSelectedPage?.firstword }}<br>
                <input style="width:97%" v-model="newPageContent" placeholder="Ecrire la page">
            </form>
        </div>
    </div>
</div>
</template>



<style>
.actionform{
    background-color: #33001a;

    border-color: coral;
    border-style: dashed;

    margin-bottom: 20px;
    margin-top: 10px;

    padding-bottom: 5px;
    padding-left: 3px;
    padding-top: 5px;
}

.btn-action{
    margin-bottom: 5px;
    font-size: 17px;
}

.removeActionMessageButton{
    margin-bottom: 10px;
}
</style>