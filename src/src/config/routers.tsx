import WordsList from "../page/WordsList";
import WordEdit from "../page/WordEdit.js";
import Index from '../page/index'
import webIndex from '../page/webIndex.js';
import SentenceList from '../page/SentenceList';

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [    
    {
        path:'/sentence/list',
        component:SentenceList
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
    },
    {
        path:'/web',
        component:webIndex
    },
    {
        path: "/",
        component:Index
    }
]

export default routers
