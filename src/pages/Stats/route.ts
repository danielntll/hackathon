import {
  home,
  homeOutline,
  statsChart,
  statsChartOutline,
} from "ionicons/icons";
import { typeRoute } from "../../types/typeRoute";

export const route__StatsPage: typeRoute = {
  path_base: "/stats",
  path: "/stats",
  tab: {
    it_IT: "Statistiche",
    en_GB: "Stats",
  },
  icons: {
    active: statsChart,
    notActive: statsChartOutline,
  },
};
