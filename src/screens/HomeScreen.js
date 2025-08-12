import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from "@react-native-firebase/auth";
import * as colors from '../utilities/colors';
import { Button } from 'react-native-paper';
import * as AdId from '../Ad-Ids';

const HomeScreen = ({ navigation }) => {
    const bannerId = __DEV__ ? TestIds.BANNER : AdId.bannerId;
    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const [email, setEmail] = useState("");
    const userId = auth().currentUser?.uid;

    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser && userId) { setEmail(currentUser.email); }
    }, [userId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Text style={styles.emailText}>{email}</Text>

                <Button
                    onPress={async () => { await auth().signOut(); }}
                    style={styles.logoutButton}
                    labelStyle={styles.logoutLabel}
                >
                    Log Out
                </Button>
            </View>

            <View style={styles.mainContent}>
                <Text style={styles.mainText}>This is 1st Screen</Text>

                <Button
                    onPress={() => navigation.navigate('Screen2')}
                    style={styles.nextButton}
                    labelStyle={styles.nextLabel}
                >
                    Next Screen
                </Button>
            </View>

            <View style={styles.adContainer}>
                {!isAdLoaded && (
                    <View style={styles.adLoadingContainer}>
                        <Text style={styles.adLoadingText}>Loading Banner Ad... </Text>
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
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        backgroundColor: colors.gray,
        padding: 20,
        borderRadius: 24,
        alignItems: 'center',
    },
    emailText: {
        fontSize: 20,
        color: colors.primaryLight,
    },
    logoutButton: {
        backgroundColor: colors.danger,
    },
    logoutLabel: {
        color: colors.primaryLight,
        fontSize: 18,
    },
    mainContent: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    mainText: {
        fontSize: 30,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: colors.buttonColor,
    },
    nextLabel: {
        color: colors.primaryLight,
        fontSize: 18,
    },
    adContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    adLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    adLoadingText: {
        fontSize: 16,
    },
});

export default HomeScreen;
