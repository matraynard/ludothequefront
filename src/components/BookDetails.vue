<script lang="ts">
import { defineComponent } from 'vue';

export type livre = { id: number, title: string, price: number }
export type livrebean = { book: livre, pageCount: number }

export default defineComponent({
name:"bookdetail",

props: {
    parentSelectedBook: {type: null as livrebean|null},
},

emits: ['onUnselectBookEvent', 'onBuyBookEvent'],
})
</script>



<template>
<div id="selectedBook" class="column titlecol right">
    <!-- INFOS LIVRE SELECTIONNE -->
    <div class="noBookSelected" v-if="!parentSelectedBook">Aucun livre n'est sélectionné.</div>
    <div class="selectedBookInfos" v-else>
        <div class="container">
            <div class="row">
                <div id="bookInfoActions" class="column">
                    <div class="bookInfoActionRow">
                        <button class="bookInfoActionButton" @click="$emit('onUnselectBookEvent', null)">X</button><br>
                    </div>
                    <div class="bookInfoActionRow">
                        <button class="bookInfoActionButton" @click="$emit('onBuyBookEvent', null)">Acheter</button>
                    </div>
                    
                </div>
                <div id="bookInfoRow" class="column">
                    <div class="divSquare"><!-- TITRE DU LIVRE -->
                        {{ parentSelectedBook.book.title }}
                    </div>
                    <div class="divSquare"><!-- PRIX DU LIVRE -->
                        Prix : {{ parentSelectedBook.book.price }}
                    </div>
                </div>
                <div id="bookInfoRow" class="column">
                    
                    <div class="divSquare"><!-- ID DU LIVRE -->
                        Id : {{ parentSelectedBook.book.id }}
                    </div>
                    <div class="divSquare"><!-- NB DE PAGES DU LIVRE -->
                        Pages : {{ parentSelectedBook.pageCount }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>



<style>
#bookInfoActions{
    width: 10%;
}
#bookInfoRow{
    width: 45%;
}

.bookInfoActionButton{
    float: left;
}
.bookInfoActionRow{
    margin-bottom: 3px;
}

.divSquare{
    float: left;
    height:20px;
    
    margin:4px;
    padding-left: 25%;
    
    text-align: justify;
    width:100%;
}

.noBookSelected{
    text-align: center;
}

.selectedBookInfos{
    background-color: #0a290a;
    border-style: solid;
    border-width: thin;
    border-radius: 1ch;
    border-color: hsla(160, 100%, 37%, 1);
    
    padding: 5px;
    text-align: center;
}
</style>