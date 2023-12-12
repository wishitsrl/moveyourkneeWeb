import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../core/theme'
import { TouchableOpacity, Text, View} from 'react-native';

export default function Button({ mode, style, ...props }) {
	
	const [isActive, setIsActive] = React.useState(true);

    const onPressLearnMore = () =>{
      setIsActive(false);
	  console.log("cambioooo")
    }	

	return (
		<PaperButton
		  style={[
			styles.button,
			mode === 'contained' && { backgroundColor: isActive ? 'transparent' : "#560CCE" },
			style,
		  ]}
		  labelStyle={styles.text}
		  mode={mode}
		  {...props}
		/>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
	borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 2,
	borderColor: '#560CCE',
	borderWidth: 2,
 },
  text: {
	fontFamily: 'roboto-flex',    
    fontSize: 20,
    lineHeight: 20,
	color: '#560CCE',
  },
})
