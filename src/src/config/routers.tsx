import WordsList from "../page/WordsList";
import WordEdit from "../page/WordEdit.js";
import Index from '../page/index'

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [
    {
        path: "/index",
        component:Index
    },
    {
        path: "/words/list",
        component:WordsList
    },
    {
        path:"/words/edit",
        component:WordEdit
    },
    {
        path:"/words/create",
        component:WordEdit
    }
]

export default routers
