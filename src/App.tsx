import {
  StaticParamList,
  createStaticNavigation,
} from "@react-navigation/native";

import { Provider as StoreProvider } from "react-redux";
import Jobs from "@/components/pages/jobs";
import { createStackNavigator } from "@react-navigation/stack";
import JobDetails from "@/components/template/jobDetails";
import { store } from "@/stores/store";
import Favorite from "@/components/pages/favorites";
import { Provider } from "react-native-paper";

const Stack = createStackNavigator({
  screens: {
    Liste: Jobs,
    Details: JobDetails,
    Favorites: Favorite,
  },
});
const Navigation = createStaticNavigation(Stack);
export type RootStackParamList = StaticParamList<typeof Stack>;

export default function App() {
  return (
    <StoreProvider store={store}>
      <Provider>
        <Navigation />
      </Provider>
    </StoreProvider>
  );
}
