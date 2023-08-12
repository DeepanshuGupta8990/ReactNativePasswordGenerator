













import { SafeAreaView, ScrollView, StyleSheet, Text, View,Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import React,{useState} from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
//From validation
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
 passwordLength: Yup.number()
 .min(4,'Password should be min 4')
 .max(16,'Password should be max 16')
 .required('Password is required')
})

export default function App() {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const[password,setPassword] = useState('');
  const [isPasswordGenerated,setIsPasswordGenerated] = useState(false);
  const [lowerCase,setLowerCase] = useState(true);
  const [upperCase,setUppercase] = useState(false);
  const[numbers,useNumbers] = useState(false);
  const[symbols,useSymbols] = useState(false);

  const generatePasswordString = (passwordLength)=>{
   let characterList = '';
   const uperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
   const digitalChars = '0123456789';
   const specialChars = '!@#$%^&*()';

   if(upperCase){
    characterList += uperCaseChars;
   }
   if(lowerCase){
    characterList += lowerCaseChars;
   }
   if(numbers){
    characterList += digitalChars;
   }  
   if(symbols){
    characterList += specialChars;
   }

   const passwordResult = createPassword(characterList,passwordLength);
   setPassword(passwordResult);
   setIsPasswordGenerated(true);
   console.log(23232323)
  }

  const createPassword = (characters, passwordLength) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState = ()=>{
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUppercase(false);
    useNumbers(false);
    useSymbols(false);
  }

  return (
 <ScrollView keyboardShouldPersistTaps='handled'>
    <SafeAreaView style={[styles.container,{height:windowHeight}]}>
      <View style={styles.formContiner}>
         <Text style={styles.text}>
          Password generator
         </Text>
         <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={(values)=>{
        console.log(values)
         generatePasswordString(+values.passwordLength);
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text>Password length</Text>
          <View style={{display:'flex',flexDirection:"column-reverse"}}>
       
            <TextInput
            style={[styles.inputStyle,{paddingHorizontal: 5}]}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='Ex. 8'
            keyboardType='numeric'
            />
          </View>
          </View>
         </View>
         {
              touched.passwordLength && errors.passwordLength && <Text style={styles.errorText}>{errors.passwordLength}</Text>
            }
        <View style={{display:"flex",flexDirection:"column",gap:10}}>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox 
           disablebuildInState
           isChecked={lowerCase}
           onPress={()=>{setLowerCase(!lowerCase)}}
           fillColor='#29ABB7'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Uppercase</Text>
          <BouncyCheckbox 
           disablebuildInState
           isChecked={upperCase}
           onPress={()=>{setUppercase(!upperCase)}}
           fillColor='#FED85D'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include numbers</Text>
          <BouncyCheckbox 
           disablebuildInState
           isChecked={numbers}
           onPress={()=>{useNumbers(!numbers)}}
           fillColor='#C9A0DC'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include symbols</Text>
          <BouncyCheckbox 
           disablebuildInState
           isChecked={symbols}
           onPress={()=>{useSymbols(!symbols)}}
           fillColor='#FC80A5'
          />
         </View>
        </View>
         <View style={styles.formActions}>
          <Button title='Generate Password' style={styles.btnText}  onPress={handleSubmit}></Button>
          <Button title='Reset' onPress={()=>{handleReset(); resetPasswordState()}} style={styles.button}></Button>
         </View>
         </>
       )}
         </Formik>
         {isPasswordGenerated ? 
            (
             <View style={{marginTop:20,elevation:10,backgroundColor:'grey',height:70,display:'flex',justifyContent:'center'}}>
              <Text style={{fontSize: 25,textAlign:'center'}} selectable>{password}</Text>
             </View>
            )
          : null}
      </View>
    </SafeAreaView>
 </ScrollView>
  )
}

const styles = StyleSheet.create({
  text:{
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  container:{
    flex: 1,
    // marginTop:46,
    // justifyContent: 'center',
    paddingTop:46,
    alignItems: 'center',
    // backgroundColor:"grey"
  },
  inputStyle:{
    height:60,
    fontSize:30,
    width:80,
    borderWidth: 1, // Border width in pixels
    borderColor: '#ccc', // Border color
    borderRadius: 8, // Border radius in pixels
  },
  button:{
    backgroundColor:"#e6c5c3",
    width: 150,
    height:30,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
  },
  btnText:{
    textAlign:'center'
  },
  formActions:{
    display:'flex',
    flexDirection:'row',
    gap:8,
    marginTop:15
  },
  inputColumn:{
    display:'flex',
    flexDirection:'row',
    gap:120,
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 16
  },
  errorText:{
    color:'red',
    marginLeft: 220,
    width: 100
  },
  inputWrapper:{
    display:'flex',
    flexDirection: 'row',
    width: 300,
    justifyContent:'space-between'
  }
})