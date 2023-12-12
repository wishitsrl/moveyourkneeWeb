import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { View, Text, Pressable, useColorScheme, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'
import REGISTRAZIONEPAZIENTE from './REGISTRAZIONEPAZIENTE'
import MONITORAGGIOPAZIENTE from './MONITORAGGIOPAZIENTE'
import Colors from '@/constants/Colors';
import { useAuth } from '../context/auth';
import { Stack, useRouter } from "expo-router";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useRef, useState, useCallback } from "react";

export default function Layer() {
	const colorScheme = useColorScheme();
	const { user } = useAuth();
	const router = useRouter();
	const Stack = createNativeStackNavigator();
	const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../../assets/fonts/RobotoFlex.ttf'),
		"RobotoFlex-Regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),
		"ultrablackitalic": require('../../assets/fonts/ultrablackitalic.ttf'),
		"UltraBlackRegular": require('../../assets/fonts/UltraBlackRegular.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  }
  return (
	<Stack.Navigator  screenOptions={{ headerShown: false }}>
		<Stack.Screen name="REGISTRAZIONEPAZIENTE" component={REGISTRAZIONEPAZIENTE} />
		<Stack.Screen name="MONITORAGGIOPAZIENTE" component={MONITORAGGIOPAZIENTE} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
