import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { useAuth } from "../context/auth";
import Logo from '../../components/UX/Logo'
import Background from '../../components/UX/Background'
import { Stack, useRouter } from "expo-router";
import { useRef, useState, useCallback } from "react";
import { useFonts } from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import { SelectList } from 'react-native-dropdown-select-list'

export default function signUp() {
	
	const { signUp } = useAuth();
	const router = useRouter();
	const tipo = [{key:'Dottore', value:'Dottore'}]
	const userNameRef = useRef("");
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const confermaPasswordRef = useRef("");
	const [loading, setLoading] = useState(false);
	const [errortext, setErrortext] = useState('');
	const [fontsLoaded, fontError] = useFonts({
		"RobotoFlex": require('../../assets/fonts/RobotoFlex.ttf')});
	
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		  await SplashScreen.hideAsync();
		}
	  }, [fontsLoaded, fontError]);

	  if (!fontsLoaded && !fontError) {
		return null;
	  }
 
	const onSignInPress = async () => {
		try {
			if (!emailRef.current) {
				setErrortext("Inserire una mail!");
			return;
			}
			if (!passwordRef.current) {
				setErrortext("Inserire una password!");
			return;
			}
			if(passwordRef.current!=confermaPasswordRef.current) {
				setErrortext("Le password non coincidono!");
			}
			else {	
				 const { data, error } = await signUp(
							  emailRef.current,
							  passwordRef.current,
							  userNameRef.current
							);			
					setLoading(true);
					if (data) {		
						router.replace("/");
					} else {
						console.log(error);
						setErrortext("Qualcosa è andato storto nella mail o nella password!");
					}
			}
		} catch (err: any) {
			alert(err.errors[0].message);
			setErrortext("Qualcosa è andato storto!");
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
	<Background>
		<SafeAreaView style={styles.container}>
			<StatusBar hidden={true} />  
			<ScrollView style={styles.scrollView}>     	
				<View style={styles.container}>
					<Logo/>
				</View>
				
				<View style={styles.layout}>
					<View>
						<Spinner visible={loading} />
					</View>
					<View>
						<Text style={styles.paragrafo2Text}>
							REGISTRAZIONE MEDICO
						</Text>
					</View>						
					{errortext != '' ? (
						<Text style={styles.errorTextStyle}>
							{errortext}
						</Text>
					) : null}	
				</View> 
							
				<View>
					<View style={{backgroundColor: "white", borderRadius: 7,  marginBottom: 12,  marginTop: 12, borderWidth: 2, borderColor: "gray", overflow: 'hidden'}}>
						<SelectList
						setSelected={(value, index) => {
						userNameRef.current = value;}}
						data={tipo} 
						search={false} 
						boxStyles={{borderRadius:0}}
						defaultOption={{ key:'Dottore', value:'Dottore' }}
						/>
					</View>
				</View>	
				<View>
					<TextInput style={styles.inputField}
						autoCapitalize="none"
						placeholder="Email"
						onChangeText={(text) => {
						emailRef.current = text;}}
					/>
				</View>
				<View>
					<TextInput style={styles.inputField}
						placeholder="Password"
						secureTextEntry={true}
						onChangeText={(text) => {
						passwordRef.current = text;}}
					/>	
				</View>		
				<View>
					<TextInput style={styles.inputField}
						placeholder="Conferma password"
						secureTextEntry={true}
						onChangeText={(text) => {
						confermaPasswordRef.current = text;}}
					/>	
				</View>	
				<View>
					<TouchableOpacity 
						style={[styles.buttonContainer,]}
						onPress={onSignInPress}>
 						<Text style={[styles.buttonTextStyle, ]}>CONTINUE</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	</Background>
	);
}

const styles = StyleSheet.create({
container: {
	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
  },
  scrollView: {
	flex: 1,
  },
  layout: {
  	alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
	marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 7,
    padding: 15, 
	height: 40,
    width: '100%',
    borderColor: 'gray',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  buttonContainer: {
	marginHorizontal: 50,
	borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 2,
	height: 40,
	borderColor: '#ffff',
	borderWidth: 1,
	alignItems: 'center',
    justifyContent: 'center',
  },
  paragrafo2Text: {
    fontSize: 18,
	color: '#fff',
	fontFamily: 'RobotoFlex',
	marginBottom: 20,
  },
   buttonTextStyle: {
    paddingVertical: 10,
	fontFamily: 'RobotoFlex',    
    fontSize: 18,
    lineHeight: 20,
	color: '#fff',
	justifyContent: 'center',
	textAlign: 'center',
  },
    errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
  },
});
