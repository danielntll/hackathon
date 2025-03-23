import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home/Home-Page";
import {
  homeOutline,
  listOutline,
  square,
  statsChartOutline,
} from "ionicons/icons";
import {
  ContextLanguageProvider,
  useContextLanguage,
} from "./context/contextLanguage";
import { ContextPantryProvider } from "./context/contextPantry";
import { route__HomePage } from "./pages/Home/route";
import { route__PantryDetailsPage } from "./pages/Pantry Details/route";
import PantryDetailsPage from "./pages/Pantry Details/PantryDetailsPage";
import { ContextListProvider } from "./context/contextList";
setupIonicReact();

const App: React.FC = () => {
  const { l } = useContextLanguage();
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>{authenticatedRoutesOutlet()}</IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton
              tab={route__HomePage.tab[l]}
              href={route__HomePage.path_base}
            >
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>{route__HomePage.tab[l]}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={listOutline} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={statsChartOutline} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

export const authenticatedRoutesOutlet = () => (
  <ContextLanguageProvider>
    <ContextListProvider>
      <ContextPantryProvider>
        <IonRouterOutlet>
          {/* ---- DEFAULT REDIRECT ----  */}
          <Route exact path="/">
            <Redirect to={route__HomePage.path} />
          </Route>
          {/* ---- HOME PAGE ---- */}
          <Route exact path={route__HomePage.path}>
            <Home />
          </Route>
          {/* ---- PANTRY PAGE ---- */}
          {/* ----------------PANTRY DETAILS PAGE ---- */}
          <Route exact path={route__PantryDetailsPage.path}>
            <PantryDetailsPage />
          </Route>
        </IonRouterOutlet>
      </ContextPantryProvider>
    </ContextListProvider>
  </ContextLanguageProvider>
);
