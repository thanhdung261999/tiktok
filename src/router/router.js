import Following from "../pages/Following";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import HeaderOnly from "../layouts/HeaderOnly";
import Profile from "../pages/Profile";
import config from "../config";
const publicRoutes = [
    {
        path: config.configRoutes.home,component: Home
    },
    {
        path: config.configRoutes.following,component: Following
    },
    {
        path: config.configRoutes.upload,component: Upload,layout: HeaderOnly
    },
    {
        path: config.configRoutes.profile,component: Profile
    }
]
const privateRoutes = []
export {publicRoutes,privateRoutes}