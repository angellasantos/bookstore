import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Components/Home'
import Register from '@/Components/Register'
import login from '@/Components/login'
import AdminHome from '@/Components/AdminHome'
import AdminProducts from '@/Components/AdminProducts'
Vue.use(Router)

export default new Router ({
    routes: [
        {
        path:'/',
        name: 'home',
        component: Home,
        meta: {Auth:false, title:'Inicio'}
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { Auth: false, title: 'register' }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { Auth: false, title: 'login' }
            childen:{
                path:'products',
                component:'AdminProducts',
                meta:{title:'Asministrar Libros'}
            }
        },
        {
            path:'/admin',
            name:'Admin',
            component:'AdminHome',
            meta:{Auth:true,title:'Administracion','role':'admin'}
        }
    ]
})