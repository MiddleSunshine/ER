import App from "../App";
import WordsList from "../page/WordsList";
import WordEdit from "../page/WordEdit.js";

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [
    {
        path: "/",
        component:App,
        children: [

        ]
    },
    {
        path: "/words",
        component:WordsList,
        children: [
            {
                path:"/edit",
                component:WordEdit,
                children:[]
            },
            {
                path:"/create",
                component:WordEdit,
                children:[]
            }
        ]
    }
]

export default routers
