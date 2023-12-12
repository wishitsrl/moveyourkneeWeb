import * as React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'
import Footer from '../../components/UX/Footer'
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { useRef, useState, useCallback, useEffect } from "react";
//import {Slider} from '@miblanchard/react-native-slider';
import Slider from '@react-native-community/slider';

export default function MONITORAGGIOPAZIENTE() {
    
	  const { user } = useAuth();
	  const router = useRouter();
	  const [punteggioPaziente, setPunteggioPaziente] = useState([]);   
  	  const [listaPazienti, setListaPazienti] = useState([]);  
	  const [matchedData, setMatchedData] = useState([]);
	  const [fontsLoaded, fontError] = useFonts({
			"RobotoFlex": require('../../assets/fonts/RobotoFlex.ttf'),
			"roboto-flex-regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
			"roboto-flex-variable": require('../../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
			"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
			"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),		
			"ultra-black": require('../../assets/fonts/ultrablackitalic.ttf'),
			"UltraBlackRegular": require('../../assets/fonts/UltraBlackRegular.ttf'),
	  });

	  useEffect(() => {
		// Fetch a list of items from your collection
		const getCollectionPunteggioPaziente = async () => {
		  try {
			const response = await databases.listDocuments('652e8e4607298ced5902', '656f2a8e31adc68dc82d');

			// Update the state with the retrieved items
			setPunteggioPaziente(response.documents);
			console.log(response.documents);

		  } catch (error) {
			console.error('Error fetching collection items:', error);
		  }
		};

		getCollectionPunteggioPaziente();
	  }, []); // Run once when the component mounts

	  useEffect(() => {
		// Fetch a list of items from your collection
		const getCollectionListaPazienti = async () => {
		  try {
			const response = await databases.listDocuments('652e8e4607298ced5902', '6571da39d8650d801786');

			// Update the state with the retrieved items
			setListaPazienti(response.documents);
			console.log(response.documents);

		  } catch (error) {
			console.error('Error fetching collection items:', error);
		  }
		};

		getCollectionListaPazienti();
	  }, []); // Run once when the component mounts

	useEffect(() => {
		// Match logic based on some criteria (adjust as needed)
		const matched = punteggioPaziente.filter(item1 =>listaPazienti.some(item2 => item1.idPaziente === item2.idPaziente));
			setMatchedData(matched);
	  }, [punteggioPaziente, listaPazienti]);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  }
	console.log("Mached:: " + matchedData)
	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<View style={{ flexDirection: 'row', }}>		
				<View>
					<Text style={styles.paragrafo2Text}>{item.idPaziente}</Text>	
				</View>
					<Slider
  					    trackStyle={customBullet.track}
						thumbStyle={customBullet.thumb}
						value={item.idLivello}
						minimumValue={1}
						maximumValue={5}
						step={1}
						minimumTrackTintColor="#560CCE"
						maximumTrackTintColor="grey"
					/>
			</View>
		</View>
	);

  return (
    <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
			<View style={styles.barTop}>
			<View style={{  marginHorizontal: 70, }}>
				<TouchableOpacity 
					onPress={() => router.replace("/")}>
					<Image source= {require('../../assets/LOGOVIOLA.png')}  style={{width:400, height:20, resizeMode:'center'}} />							
				</TouchableOpacity>
			</View>
			<View style={{ marginHorizontal: 170, alignItems: 'flex-end', }}>
				<Text style={{ color: '#560CCE', }}>{user.name} {user.email}</Text> 			
			</View>
		</View>		
		<ScrollView style={styles.scrollView}>     
			
			<View style={styles.layout}>
				<View>
					<View style={{ flexDirection: 'row',   }}>		
							<View style={{ flex: 1 }}>
								 <Text style={styles.titoloText}>
									Monitoraggio paziente
								</Text>
							</View>
							<View>
								<TouchableOpacity onPress={() => router.replace("/")}>
									<Text style={styles.chiudi}>
										CHIUDI X
									</Text>
								</TouchableOpacity>
							</View>
					</View>
				</View>
			
				<View style={{ flexDirection: 'row', }}>		
					<View style={{  flex: 1 }}>
						<Text style={styles.paragrafo2Text}>LISTA PAZIENTI</Text>
					</View>
					<View style={{  flex: 1 }}>
						<Text style={styles.paragrafo2Text}>LIV. TARTARUGA</Text>
					</View>
					<View style={{  flex: 1 }}>
						<Text style={styles.paragrafo2Text}>LIV. TORO</Text>
					</View>
					<View style={{  flex: 1 }}>
						<Text style={styles.paragrafo2Text}>LIV. TIGRE</Text>
					</View>
					<View style={{  flex: 1 }}>
						<Text style={styles.paragrafo2Text}>LIV. FALCO</Text>
					</View>
					<View style={{  flex: 1 }}>
						<Text style={styles.paragrafo2Text}>LIV. SUPER FALCO</Text>
					</View>
				</View>
				
				<View style={{  flex: 1 }}>
					<FlatList
						data={matchedData}
						keyExtractor={(item) => item.idPaziente}
						renderItem={renderItem}
					/>	
				</View>
			</View>			
		</ScrollView>
		<View>
			<Footer/>					
		</View>	
    </SafeAreaView>
  );
}
var customBullet = StyleSheet.create({
  track: {
    height: 18,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  thumb: {
    width: 70,
    height: 30,
    borderRadius: 15,
	borderWidth: 5,
	backgroundColor: '#fff',
	borderColor: '#560CCE',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   scrollView: {
	flex: 1,
  },
  layout: {
	marginHorizontal: 200,
  },
  titoloText: {
	marginTop: 10,
	marginBottom: 70,
	color: 'black',
    fontSize: 40,
	fontFamily: 'ultra-black',
	fontWeight: 'bold',
  },
  buttonContainer: {
    width: 200,
	height: 30,
	marginHorizontal: 30,
	borderRadius: 5,
	borderColor: '#560CCE',
	borderWidth: 2,
	alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLayout: {
    marginTop: 40,
	alignItems: 'flex-end',
  },
  paragrafo2Text: {
    fontSize: 20,
	color: 'black',
	fontFamily: 'roboto-flex',
	marginTop: 0,
	marginBottom: 10,
	fontWeight: 'bold',
  },
  buttonTextStyle: {
    paddingVertical: 10,
	fontFamily: 'RobotoFlex',    
    fontSize: 20,
    lineHeight: 20,
	color: '#560CCE',
	justifyContent: 'flex-end',
	
  },
  chiudi: {
    marginHorizontal: 30,
	fontSize: 10,
	marginTop: 20,
	fontFamily: 'roboto-flex',
  },
  item: {
    padding: 2,
  },
  barTop: {
    backgroundColor: "lightgrey",
    padding: 40
  },
});

