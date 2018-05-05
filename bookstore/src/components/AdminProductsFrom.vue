<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="510" v-model="productsDialog">
      <v-btn slot="activator" color="light-blue darken-4" dark>
          {{$t('admin.productsTable.newProducts')}}
      </v-btn>
      <v-card>
        <v-card-title class="headline">{{$t('admin.productsTable.newProducts')}}</v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex>
                        <v-text-field :label="$t('admin.productsTable.name')"/>
                        v-model="prductForEdit.name"
                        />
                    </v-flex>
                    <v-spacer/>
                    <v-flex>
                        <v-text-field :label="$t('admin.productsTable.price')"/>
                        v-model="prductForEdit.price"
                        />
                    </v-flex>
                    <v-spacer/>
                    <v-flex xs12>
                        <a v-if="prductForEdit.url" :href="productsTable.url" target="_blank>"
                        {{ $t('admin.productsTable.openfile')}}</a>
                        <life-

                </v-layout>
            </v-container>                
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="cerrar">
              {{$t('common.close')}}
              </v-btn>
          <v-btn color="green darken-1" flat 
                v-if="$store.getters.productDialogEditMode">Actulizar</v-btn>
          <v-btn color="green darken-1" flat>Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import {db} from "@/main";
imprt *as faker from 'faker';
import{mapGetters} from 'vuex';
import fileImput from "@/components/hetpers/FileImput"
export default {
  name:"admin-products-from"
  componets:{fileImput}
  methods:{
      cerrar(){
          this.$store.commit('taggleProductsDialog',{
              editMode: false,
              product:{
                  id: null,
                  name:'',
                  price:'',
                  url:'',
                  file_id:'',
              }
          })
        },
        add(){
            this.productForEdit.idfaker.random.alphaNumeric(16);
            const product=Object.assign({}, this.productForEdit);
            product.createdAt=Date.now();
            db.collection('products').doc(this.productForEdit.id).set(product).then(()=>{
                if(this.image){
                    this.$store.dispatch('pushFileToStorage',{
                        fileToUpload:this.image,id:product.id
                    }).then(()=>{
                        alert('guardado');
                    })
                }else{
                    alert('guardado');
                }
            })
        }
      },
      computed:{
          productsDialog:{
              get(){
                  return this.$store.getters.productsDialog;
              },
              set(){
                  this.close();
              }
          }
      },
      ...mapGetters(['productforEdit'])
  }
}
</script>
