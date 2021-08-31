import App from "../App";
import WordsList from "../page/WordsList";

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
            
        ]
    }
]

export default routers
