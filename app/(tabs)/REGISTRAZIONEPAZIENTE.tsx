import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import LogoViola from '../../components/UX/LogoViola'
import Footer from '../../components/UX/Footer'
import { useAuth } from '../context/auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { useRef, useState, useCallback, useEffect } from "react";
import Bcrypt from 'react-native-bcrypt';

export default function REGISTRAZIONEPAZIENTE() {
  
  const { signUp, user } = useAuth();
  const router = useRouter();
  const [punteggio, setPunteggio] = React.useState(''); 
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [codiceFiscale, setCodiceFiscale] = useState('');
  const [cartellaClinica, setCartellaClinica] = useState('');
  const [anamnesi, setAnamnesi] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../../assets/fonts/RobotoFlex.ttf'),
		"roboto-flex-regular": require('../../assets/fonts/RobotoFlex-Regular.ttf'),
		"roboto-flex-variable": require('../../assets/fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),		
		"Acumin-Variable-Concept": require('../../assets/fonts/Acumin-Variable-Concept.ttf'),
		"AcuminVariableConcept-WideUltraBlack": require('../../assets/fonts/AcuminVariableConcept-WideUltraBlack.ttf'),		
		"ultra-black": require('../../assets/fonts/ultrablackitalic.ttf'),
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
	  
	  const generateUniqueID = () => {
		  // Algoritmo di generazione ID personalizzato
		  return '_' + Math.random().toString(36).substr(2, 9);
		};
		
	 const handleRegister = async () => {
	 try {
		const uniqueID = generateUniqueID();
		const datiPaziente = databases.createDocument('652e8e4607298ced5902', '6571da39d8650d801786', ID.unique(),
		{
			'idPaziente': uniqueID, 
			'nome': nome, 
			'cognome': cognome, 
			'codiceFiscale': codiceFiscale, 			
			'email': email,
			'password': password,
			'anamnesi': anamnesi,
			'cartellaClinica': cartellaClinica,
		},
        [Permission.update(Role.any())],				
	  );	
		datiPaziente.then(function (response) {
		
		try {
		const { data, error } =  signUp(email, password, "Paziente");			
					if (data) {		
						console.log(response); // Success 
						router.push('/')	
					} else {
						console.log(error);
						setErrortext("Qualcosa è andato storto nella mail o nella password!");
					}
			} catch (err: any) {
					alert(err.errors[0].message);
					setErrortext("Qualcosa è andato storto!");
				} 

		}, function (error) {
			console.log(error); // Failure
		});
		} catch (err: any) {
			alert(err.errors[0].message);
			setErrortext("Qualcosa è andato storto!");
		} finally {
		}
	  };

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
				<Text style={{ color: '#560CCE', }}> ID MEDICO</Text> 			
			</View>
		</View>		
		<ScrollView style={styles.scrollView}>     
			<View style={styles.layout}>
				<View>
					<View style={{ flexDirection: 'row',   }}>		
							<View style={{ flex: 1 }}>
								 <Text style={styles.titoloText}>
									Registrazione paziente
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
				
				{
					errortext != '' ? (
						<Text style={styles.errorTextStyle}>
							{errortext}
						</Text>
					) : null
				}
				
				<View>
					<Text style={styles.paragrafo2Text}>
						NOME
					</Text>
					<View style={styles.form}>
						<TextInput 
							style={styles.input}
							placeholder="Nome"
							onChangeText={(text) => setNome(text)}
							value={nome}
						/>
					</View>	
				</View>
				
				<View>
					<Text style={styles.paragrafo2Text}>
						COGNOME
					</Text>
					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Cognome"
							onChangeText={(text) => setCognome(text)}
							value={cognome}
						/>
					</View>	
				</View>
				
				<View>
					<Text style={styles.paragrafo2Text}>
						CODICE FISCALE
					</Text>
					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Codice fiscale"
							onChangeText={(text) => setCodiceFiscale(text)}
							value={codiceFiscale}
						/>
					</View>	
				</View>
				
				<View>
					<Text style={styles.paragrafo2Text}>
						EMAIL
					</Text>
					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Email"
							onChangeText={(text) => setEmail(text)}
							value={email}
						/>
					</View>	
				</View>

				<View>
					<Text style={styles.paragrafo2Text}>
						PASSWORD
					</Text>
					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Password"
							secureTextEntry
							onChangeText={(text) => setPassword(text)}
							value={password}
							secureTextEntry
						/>
					</View>	
				</View>
				
				<View>
					<Text style={styles.paragrafo2Text}>
						ANAMNESI
					</Text>
					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Anamnesi"
							onChangeText={(text) => setAnamnesi(text)}
							value={anamnesi}
						/>
					</View>	
				</View>
				
				<View>
					<Text style={styles.paragrafo2Text}>
						CARTELLA CLINICA
					</Text>
					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Cartella clinica"
							onChangeText={(text) => setCartellaClinica(text)}
							value={cartellaClinica}
						/>
					</View>	
				</View>
				
				<View style={styles.buttonLayout}>
					<TouchableOpacity 
						style={styles.buttonContainer}
						onPress={handleRegister}>
						<Text style={styles.buttonTextStyle}>Crea</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
			<Footer/>
    </SafeAreaView>
  );
}

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
	marginHorizontal: 15,
    fontSize: 20,
	color: '#1786aa',
	fontFamily: 'roboto-flex',
	marginTop: 10,
	marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
	color: '#560CCE',
	fontWeight: 'bold',
    borderRadius: 7,
    padding: 15, 
	flex: 1,
    flexDirection: 'row',    
    justifyContent: 'center',
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
	fontSize: 10,
	marginTop: 20,
	fontFamily: 'roboto-flex',
  },
   barTop: {
    backgroundColor: "lightgrey",
    padding: 40
  },  
});

