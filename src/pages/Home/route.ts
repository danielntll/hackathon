import { home, homeOutline } from "ionicons/icons";
import { typeRoute } from "../../types/typeRoute";

export const route__HomePage: typeRoute = {
    path_base: "/home",
    path: "/home",
    tab:{
        it_IT: "Home",
        en_GB: "Home",
    },
    icons: {
        active: home,
        notActive: homeOutline,
    },
}