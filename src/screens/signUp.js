import { useState } from "react";
import { Text, View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as colors from '../utilities/colors';
import auth from "@react-native-firebase/auth";
import Toast from "../components/toast";
import * as AdId from '../Ad-Ids';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = ({ navigation }) => {

    const bannerId = __DEV__ ? TestIds.BANNER : AdId.bannerId;
    const [isAdLoaded, setIsAdLoaded] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password) {
            Toast("Please fill all fields");
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
        } catch (error) {
            Alert.alert("Sign Up Error", error.message);
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
                placeholder="at least 6 characters long"
                placeholderTextColor={colors.gray}
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

            <View style={styles.signUpButtonContainer}>
                <Button
                    style={styles.signUpButton}
                    labelStyle={styles.buttonLabel}
                    onPress={handleSignUp}
                >Sign Up</Button>
            </View>

            <View style={styles.signInPrompt}>
                <Text style={styles.signInText}>
                    Already have an account?
                    <Text
                        onPress={() => {
                            navigation.reset({ index: 0, routes: [{ name: 'SignIn-Screen' }] });
                        }}
                        style={styles.signInLink}
                    >
                        {" "}Sign In
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
        paddingHorizontal: 20,
        flex: 1
    },
    textInput: {
        marginVertical: 5,
    },
    signUpButtonContainer: {
        alignItems: 'flex-end',
    },
    signUpButton: {
        backgroundColor: colors.buttonColor,
        marginTop: 20,
    },
    buttonLabel: {
        fontSize: 15,
        paddingHorizontal: 20,
        color: colors.primaryLight,
    },
    signInPrompt: {
        marginTop: 50,
    },
    signInText: {
        fontSize: 18,
    },
    signInLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default SignUp;
