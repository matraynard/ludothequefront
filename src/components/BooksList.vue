<script lang="ts">
import { defineComponent } from 'vue';

export type livre = { id: number, title: string, price: number }
export type livrebean = { book: livre, pageCount: number }
export type rnumber = {id: number, isUsed: boolean}

export default defineComponent({
name:"reading",

data(){
    return {
        isSortByIdAsc: null as boolean|null,
        isSortByPageAsc: null as boolean|null,
        isSortByPriceAsc: null as boolean|null,
        isSortByTitleAsc: null as boolean|null,
    }
},

emits: ['onRemoveBookEvent',

        'onSelectBookEvent',

        'onSortByIdEvent',
        'onSortByPageEvent',
        'onSortByPrixEvent',
        'onSortByTitleEvent',],

methods: {

/** demande le trie par id, ascendant ou descendant selon le mode déjà en place, et remet à null les autres tris */
sortById(){
    this.isSortByPageAsc = null;
    this.isSortByPriceAsc = null;
    this.isSortByTitleAsc = null;

    this.isSortByIdAsc = !this.isSortByIdAsc;
    this.$emit('onSortByIdEvent', this.isSortByIdAsc);
},

/** demande le trie par page, ascendant ou descendant selon le mode déjà en place, et remet à null les autres tris */
sortByPage(){
    this.isSortByIdAsc = null;
    this.isSortByPriceAsc = null;
    this.isSortByTitleAsc = null;

    this.isSortByPageAsc = !this.isSortByPageAsc;
    this.$emit('onSortByPageEvent', this.isSortByPageAsc);
},

/** demande le trie par prix, ascendant ou descendant selon le mode déjà en place, et remet à null les autres tris */
sortByPrix(){
    this.isSortByIdAsc = null;
    this.isSortByPageAsc = null;
    this.isSortByTitleAsc = null;

    this.isSortByPriceAsc = !this.isSortByPriceAsc;
    this.$emit('onSortByPrixEvent', this.isSortByPriceAsc);
},

/** demande le trie par titre, ascendant ou descendant selon le mode déjà en place, et remet à null les autres tris */
sortByTitle(){
    this.isSortByIdAsc = null;
    this.isSortByPageAsc = null;
    this.isSortByPriceAsc = null;

    this.isSortByTitleAsc = !this.isSortByTitleAsc;
    this.$emit('onSortByTitleEvent', this.isSortByTitleAsc);
},
},

props: {
    parentSelectedBook: {type: null as livrebean|null},
    parentMyBooks: {type: null as livrebean[]|null},
    parentMyRnumbers: {type: null as rnumber[]|null},
},
})
</script>



<template>
<div id="rayon" class="column sectioncontent middle">
    <!-- SECTION LISTE DE LIVRES -->
    <div>
        <div class="sectionTitle">
            <h2>{{ parentMyBooks.length }} livres en rayon</h2>
        </div>
        <div class="sectionButtons">
            <button :class="isSortByIdAsc ? 'sortButton sortUp' : isSortByIdAsc == null ? 'sortButton sortNull' : 'sortButton sortDown'" @click="sortById()">Id</button>
            <button :class="isSortByTitleAsc ? 'sortButton sortUp' : isSortByTitleAsc == null ? 'sortButton sortNull' : 'sortButton sortDown'" @click="sortByTitle()">Titre</button>
            <button :class="isSortByPriceAsc ? 'sortButton sortUp' : isSortByPriceAsc == null ? 'sortButton sortNull' : 'sortButton sortDown'" @click="sortByPrix()">Prix</button>
            <button :class="isSortByPageAsc ? 'sortButton sortUp' : isSortByPageAsc == null ? 'sortButton sortNull' : 'sortButton sortDown'" @click="sortByPage()">Page</button>
        </div>
    </div>
    <hr>
    <div v-for="rnumber in parentMyRnumbers" :key="rnumber.id">
        <div class="bookTitle">
            {{ rnumber.id }}, {{ rnumber.isUsed }}
        </div>
    </div>
    <div class="scrollablecolumn">
        <span v-if="!parentMyBooks">Chargement de la librairie...</span>
        <div id="catalog" v-else>
            <div v-for="livre in parentMyBooks" :key="livre.book.id" :class="livre.book.id == parentSelectedBook?.book.id ? 'selected book' : 'book'" >
                <div class="bookTitle">
                    {{ livre.book.title }}
                </div>
                <div class="bookInfos">
                    <span>{{ livre.book.price }} € !</span>
                    <button v-if="parentSelectedBook?.book.id != livre.book.id" class="readButton" @click="$emit('onSelectBookEvent', livre)">Lire</button> {{ livre.pageCount }} pages. (id : {{ livre.book.id }}) <button class="removeBookButton" @click="$emit('onRemoveBookEvent', livre)">X</button>
                </div>                
            </div>
        </div>
    </div>
</div>
</template>



<style>
.book{
    background-color: #002933;

    border-color: aqua;
    border-radius: 1ch;
    border-style: double;
    
    margin-bottom: 10px;
    margin-left: 2.5%;

    padding-bottom: 10px;

    text-align: center;

    width: 95%;

    z-index: 1;
}
.bookInfos span{
    background-color: greenyellow;
    border-radius: 10%;
    color: crimson;

    font-weight: bold;
    left:5px;

    overflow: hidden;
    position:absolute;

    top:-55px;
    z-index: 5;
}
.bookTitle{
    font-weight: bold;
    font-size: larger;
    margin-bottom: 15px;
    margin-top: 5px;
}

.readButton{
    float: left;
    margin-left: 10px; 
}
.removeBookButton{
    float: right;
    margin-right: 10px; 
}

.sectionButtons{
    float: right;
    padding-top: 8px;
    
}
.sectionTitle{
    display: inline-block;;
}

.selected{
    background-color: #504b03;
    border-color: gold;
    margin-bottom: 15px;
    margin-top: 15px;
}

.sortButton{
    margin-left: 3px;
}
.sortDown{
    background-color: lightcoral;
}
.sortNull{
    
}
.sortUp{
    background-color: aquamarine;
}
</style>