import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./help";
import News from "./news";
import Profile from "./profile";
import Events from "./events";
import People from "./people";
import Help from "./help";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={Help} />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="People" component={People} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
