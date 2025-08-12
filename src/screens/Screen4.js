import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { InterstitialAd, AdEventType, BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as colors from '../utilities/colors';
import * as AdId from '../Ad-Ids';

const interstitial = InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : AdId.bannerId);

const Screen4 = ({ navigation }) => {
    const [loaded, setLoaded] = useState(false);
    const bannerId = __DEV__ ? TestIds.BANNER : AdId.bannerId;
    const [bannerAdLoaded, setBannerAdLoaded] = useState(false);

    useEffect(() => {
        interstitial.load();
        const loadListener = interstitial.addAdEventListener(AdEventType.LOADED, () => setLoaded(true));

        return () => { loadListener(); }
    }, []);

    const showAdAndNavigate = () => {
        if (loaded) {
            interstitial.show();
            navigation.navigate('Screen5');
        } else {
            navigation.navigate('Screen5');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContent}>
                <Text style={styles.mainText}>This is the 4th Screen</Text>
                <Button
                    onPress={showAdAndNavigate}
                    style={styles.nextButton}
                    labelStyle={styles.nextLabel}
                >
                    Next Screen
                </Button>

                <View style={styles.interstitialContainer}>
                    <Text style={styles.interstitialLabel}>Interstitial Ad: </Text>
                    <Text style={[styles.interstitialStatus, { color: loaded ? 'green' : 'red' }]}>
                        {loaded ? 'Loaded' : 'Loading...'}
                    </Text>
                    {
                        loaded ? null : <ActivityIndicator size="small" color="red" />
                    }
                </View>
            </View>

            <View style={styles.adContainer}>
                {!bannerAdLoaded && (
                    <View style={styles.adLoadingContainer}>
                        <Text style={styles.adLoadingText}>Loading Banner Ad... </Text>
                        <ActivityIndicator size="small" />
                    </View>
                )}

                <BannerAd
                    unitId={bannerId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    onAdLoaded={() => setBannerAdLoaded(true)}
                />
            </View>
        </SafeAreaView>
    );
}

export default Screen4;

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
    nextButton: {
        backgroundColor: colors.buttonColor,
    },
    nextLabel: {
        color: colors.primaryLight,
        fontSize: 18,
    },
    interstitialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    interstitialLabel: {
        fontSize: 16,
    },
    interstitialStatus: {
        fontSize: 16,
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

