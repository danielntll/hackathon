import { nutrition, nutritionOutline } from "ionicons/icons";
import { typeRoute } from "../../types/typeRoute";

export const route__PantryDetailsPage: typeRoute = {
    path_base: "/pantry",
    path: "/pantry/:pantryProductID",
    tab:{
        it_IT: "Dettagli Prodotto",
        en_GB: "Product Details",
    },
    icons: {
        active: nutrition,
        notActive: nutritionOutline,
    },
}