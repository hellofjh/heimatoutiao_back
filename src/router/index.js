import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
//登录页
import Login from '@/views/Login.vue'

//欢迎页
import Welcome from '@/views/Welcome.vue'
//首页
import Index from '@/views/Index.vue'

//文章列表页
import PostList from '@/views/PostList.vue'

//文章发布页面
import Postarticle from '@/views/Postarticle.vue'
// 栏目列表
import CateList from '@/views/CateList.vue'

Vue.use(VueRouter)
let router = new VueRouter({
    routes: [{
            name: 'defalut',
            path: '/',
            //当打开更组件的术后，让其自动的进行重定向 
            redirect: {
                name: 'Index'
            }
        }, {

            name: 'Index',
            path: '/index',
            component: Index,
            // 默认加载指定的嵌套路由
            redirect: {
                name: 'Welcome'
            },
            children: [{
                    name: 'Welcome',
                    path: 'welcome',
                    component: Welcome
                },
                //文章列表
                {
                    name: 'PostList',
                    path: 'postList',
                    component: PostList
                },
                // 文章发布页
                {
                    name: 'Postarticle',
                    path: 'postarticle',
                    component: Postarticle
                },
                // 栏目列表
                {
                    name: 'CateList',
                    path: 'catelist',
                    component: CateList
                }
                
            ]
        },
        {
            name: 'Login',
            path: '/login',
            component: Login
        }
    ]
})
//router.beforeEach 导航守卫，检测您输入的地址是否需要登录 判断有无token
//to ： Router 即将要进入的目标路由
// from 从哪里来的
//next 函数 
router.beforeEach((to, from, next) => {
    if (to.path === '/login') { //如果是登录页就 给你登录
        next()
    } else { //如果不是登录页，就需要判断你是否有token咯

        let token = localStorage.getItem('toutiao_back_token')
        if (token) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    }

})

//如果我们想在请求之前做点什么，用拦截器再好不过了

//config 相当于当前的请求报文
//添加请求拦截器  为每次请求添加请求头

axios.interceptors.request.use(function (config) {
    // console.log(config);
    //请求的时候判断是否有token，如果有则添加请求的设置，否则不处理
    let token = localStorage.getItem('toutiao_back_token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})



export default router