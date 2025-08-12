import { useEffect } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";

const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'Home-Screen' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'SignIn-Screen' }] });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}></View>
  );
};

export default Splash;
