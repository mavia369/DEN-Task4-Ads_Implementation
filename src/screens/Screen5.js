import { useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as colors from '../utilities/colors';
import * as AdId from '../Ad-Ids';

const Screen5 = ({ navigation }) => {
    const bannerId = __DEV__ ? TestIds.BANNER : AdId.bannerId;
    const [isAdLoaded, setIsAdLoaded] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContent}>
                <Text style={styles.mainText}>This is 5th Screen</Text>

                <Button
                    onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Home-Screen' }] }); }}
                    style={styles.backButton}
                    labelStyle={styles.backLabel}
                >
                    Go back to Home Screen
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
    mainContent: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    mainText: {
        fontSize: 30,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: colors.buttonColor,
    },
    backLabel: {
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

export default Screen5;
