import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import LogoViola from '../components/UX/LogoViola'
import Footer from '../components/UX/Footer'
import { useAuth } from './context/auth';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import client, { databases } from "../lib/appwrite-service";
import { Permission, Role,  ID, Query, } from "appwrite";
import { useRef, useState, useCallback, useEffect } from "react";

export default function NotFoundScreen() {
 
 const { signOut, user } = useAuth();
 const router = useRouter();
 return (
   <SafeAreaView style={styles.container}>
	    <StatusBar hidden={true} />
			<View style={styles.barTop}>
			<View style={{  marginHorizontal: 70, }}>
				<TouchableOpacity 
					onPress={() => router.replace("/")}>
					<Image source= {require('../assets/LOGOVIOLA.png')}  style={{width:400, height:20, resizeMode:'center'}} />							
				</TouchableOpacity>
			</View>
			<View style={{ marginHorizontal: 170, alignItems: 'flex-end', }}>
				<Text style={{ color: '#560CCE', }}> ID MEDICO</Text> 			
			</View>
		</View>		
		<ScrollView style={styles.scrollView}>    
			<View style={styles.layout}>
				<Text style={styles.titoloText}>Dashboard</Text>
				
				<View style={styles.buttonLayout}>
					<TouchableOpacity 
						style={styles.buttonContainer}
						onPress={() => router.push("/MONITORAGGIOPAZIENTE")} >
						<Text style={styles.buttonTextStyle}>Monitoraggio pazienti</Text>
					</TouchableOpacity>
				</View>
  
				<View style={styles.buttonLayout}>
					<TouchableOpacity 
						style={styles.buttonContainer}
						onPress={() => router.push("/REGISTRAZIONEPAZIENTE")}>
						<Text style={styles.buttonTextStyle}>Registrazione pazienti</Text>
					</TouchableOpacity>
				</View>
				
				<View style={styles.buttonLayout}>
					<TouchableOpacity 
						style={styles.buttonContainer}
						onPress={() => signOut()}>
						<Text style={styles.buttonTextStyle}>Sign Out</Text>
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
	alignItems: 'center',
    justifyContent: 'center',
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
	alignItems: 'center',
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

