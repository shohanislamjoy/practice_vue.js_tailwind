import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import product_list from "@/views/product_page.vue";
import contact_us from "../views/contact_page.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URl),
    routes: [
        
        {
            path: "/",
            name: "home",
            component: home,

        },
        {
            path: "/product",
            name: "product",
            component: product_list,
        },
        {
            path: "/contact_us",
            name: "contact_us",
            component: contact_us,
        },
    ],
});

export default router;