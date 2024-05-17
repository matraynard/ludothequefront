<script lang="ts">
import { defineComponent } from 'vue';

export type livre = { id: number, title: string, price: number }
export type livrebean = { book: livre, pageCount: number }
export type page = { id: number, firstword: string, number: number, bookid: number }

export default defineComponent({
name:"reading",

data(){
    return {
        //isLargeMode: false as boolean,
        modeLargeLabel: 'Mode large' as string
    }
},

emits: ['onSelectPageEvent',
        'removePage',
        'setModeLarge'],

methods: {

/** permet d'afficher la lecture sur deux colonnes (en masquant la liste de livres) ou une seule */
setModeLarge(){
    this.$emit('setModeLarge', !this.parentIsModeLarge);
    //this.isLargeMode = !this.isLargeMode;
    //this.modeLargeLabel = !this.parentIsModeLarge ? 'Mode normal' : 'Mode large';
}

},

props: {
    parentSelectedBook: {type: null as livrebean|null},
    parentSelectedBookPages: {type: [] as page[]|null},
    parentSelectedPage: {type: null as page|null},
    parentIsModeLarge: {type: null as boolean|null},
},

watch: {
    parentIsModeLarge(){
        this.modeLargeLabel = this.parentIsModeLarge ? 'Mode normal' : 'Mode large';
    }
}
})
</script>



<template>
<div id="reading" :class="parentIsModeLarge ? 'column sectioncontentlarge right' : 'column sectioncontent right'">
    <!-- SECTION LECTURE -->
    <div>
        <div class="sectionTitle">
            <h2>Lecture <span v-if="parentSelectedBook != null">: {{ parentSelectedBookPages?.length }} pages</span></h2>
        </div>
        <div v-if="parentSelectedBook != null" class="sectionButtons">
            <button :class="parentIsModeLarge ? 'sortButton largereading' : 'sortButton smallreading'" @click="setModeLarge" style="float: right;">{{ modeLargeLabel }}</button>
        </div>
    </div>
    <hr>
    
    <div class="scrollablecolumn">
        <div class="noReadSection" v-if="Array.isArray(parentSelectedBookPages) && parentSelectedBookPages.length == 0">
            Aucune page
        </div>
        <div v-else v-for="page in parentSelectedBookPages" :key="page.number" :class="page.id == parentSelectedPage.id ? 'selected readSection' : 'readSection'">
            <div class="pageheader">
                <div class="pagenumber">
                    Page {{ page.number }} :
                </div>
                <div class="pagebuttons">
                    <button v-if="parentSelectedPage?.id != page.id" @click="$emit('onSelectPageEvent', page)">Sélectionner</button> <button class="removePageButton" @click="$emit('removePage', page, parentSelectedBook)">X</button>
                </div>

            </div>
            <p>{{ page.firstword }}</p>
        </div>
    </div>
</div>
</template>



<style>
.largereading{
    background-color: darkslategray;
}
.pagebuttons{
    float: right;
}
.pagenumber{
    display: inline-block;
}

.readSection {
    border-style: solid;
    border-width: thin;
    border-color: fuchsia;
    background-color: #330033;
    padding: 2px 5px 5px 5px;
    margin-bottom: 3px;
}
.removePageButton{}

.selected {
    border-color: gold;
    background-color: #504b03;
    margin-bottom: 15px;
    margin-top: 15px;
}

.smalleading{}
</style>