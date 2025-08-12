import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import { Button, TextInput } from "react-native-paper";
import * as colors from '../utilities/colors';
import Toast from "../components/toast";
import * as AdId from '../Ad-Ids';
import { SafeAreaView } from "react-native-safe-area-context";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const SignIn = ({ navigation }) => {

  const bannerId = __DEV__ ? TestIds.BANNER : AdId.bannerId;
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast("Please fill all fields");
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      Toast('Invalid Email or Password')
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Email"
        placeholder="user@gmail.com"
        placeholderTextColor={colors.gray}
        value={email}
        mode="outlined"
        outlineColor={colors.primaryDark}
        activeOutlineColor={colors.buttonColor}
        onChangeText={setEmail}
        style={styles.textInput}
      />

      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        outlineColor={colors.primaryDark}
        activeOutlineColor={colors.buttonColor}
        onChangeText={setPassword}
        style={styles.textInput}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <View style={styles.signInButtonContainer}>
        <Button
          style={styles.signInButton}
          labelStyle={styles.buttonLabel}
          onPress={handleSignIn}
        >Sign In</Button>
      </View>

      <View style={styles.signUpPrompt}>
        <Text style={styles.signUpText}>
          Don't have an account?
          <Text
            onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: 'SignUp-Screen' }] });
            }}
            style={styles.signUpLink}
          >
            {" "}Sign Up
          </Text>
        </Text>
      </View>

      <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
        {!isAdLoaded && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>Loading Banner Ad... </Text>
            <ActivityIndicator size="small" />
          </View>
        )}

        <BannerAd
          unitId={bannerId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdLoaded={() => setIsAdLoaded(true)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    marginVertical: 5,
  },
  signInButtonContainer: {
    alignItems: 'flex-end',
  },
  signInButton: {
    backgroundColor: colors.buttonColor,
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 15,
    paddingHorizontal: 20,
    color: colors.primaryLight,
  },
  signUpPrompt: {
    marginTop: 40,
  },
  signUpText: {
    fontSize: 18,
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
