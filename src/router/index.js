import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import ProductList from "@/views/product_page.vue";
import ContactUs from "../views/contact_page.vue";
import ViewProduct from "../views/view_products_page.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/product",
            name: "product",
            component: ProductList,
        },
        {
            path: "/products/:id", 
            name: "view_product",
            component: ViewProduct,
            props: true,
        },
        {
            path: "/contact_us",
            name: "contact_us",
            component: ContactUs,
        },
    ],
});

export default router;
