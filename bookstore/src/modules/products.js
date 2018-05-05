import firebase from 'firebase';
import * as faker from 'faker';

export default{
    state:{
        admin:{
            products:{
                dialog:false,
                editMode:false,
                products:{
                    id: null,
                    name: '',
                    price: '',
                    file_id: '',
                    url: ''
                }
            }
        }
    },
    actions:{
        removeFile({commit},product){
            return firebase.storage().ref().child(`products/${product.file_id}`).delete();
        },
        updateDeleteProduct({commit},id){
            let product = firebase.firestore().collection(` products` ).doc(id);
            if(product){
                return product.update({
                    url:'',
                    file_id: ''
                });
            }
        },
        pushFileToStorage({commit},{fileToUpLood,id}){
            const storageRef=firebase.storage().ref();
            const fileId=faker.random.alphaNumeric(16);
            const uploadTask = storageRef.child(`/products/${fileId}`).put(fileToupload);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{
                const snap=firebase.storage.uploadTaskSnapshot;
            },
        (error)=>{
            console.log(error);
        },
        ()=>{
            fileToUpLood.url=uploadTask.snapshot.downloadURL;
            let product = firebase.firestore().collection(` products`).doc(id);
            if (product) {
                return product.update({
                    url:fileToUpLood.url,
                    file_id:fileId
                });
            }
        })
        }
        
    },
    getters:{
        productsDialog:(store)=>{
            return state.admin.products.dialog;
        },
        productsForEdit:(state)=>{
            return state.admn.products.product;
        },
        productsDialogEditMode:(stote)=>{
            return state.admin.product.editMode;
        }

        }

    },
    mutation:{
        toggleProductsDialog:(state,data)=>{
            state.admin.products.dialog = !state.admiN.products.dialog;
            state.admin.products.editMode= data.editMode;
            state.admin.products.product=data.product;
        }
    }
}