import Following from "../pages/Following";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import HeaderOnly from "../components/Layouts/HeaderOnly";
const publicRoutes = [
    {
        path: '/',component: Home
    },
    {
        path: '/following',component: Following
    },
    {
        path: '/upload',component: Upload,layout: HeaderOnly
    }
]
const privateRoutes = []
export {publicRoutes,privateRoutes}