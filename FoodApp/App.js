import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,SafeAreaView,Modal,Button } from 'react-native';

export default function App() {
  const[isvisible,setIsvisible] = useState(false);
  const [data,setData] = useState({
    name:'',
    email:'',
    
  })
  const handleOpen =()=>{
    setIsvisible(true);
  }
  const handleClose =()=>{
    setIsvisible(false);
  }
  return (  
      <View style={styles.container}>
      <Text>Food@App</Text>
      <StatusBar style="dark" />
      <Button style={styles.button} title='open' onPress={handleOpen}></Button>
      <Modal animationType='fade' visible={isvisible}>
        <View style={styles.modal}>
      <Text style={styles.text}>REGISTER</Text>
      <Button title='close' onPress={handleClose}></Button>
      <TextInput style={styles.input} placeholder='Enter name' value={name} onChangeText={setName}></TextInput>
      <TextInput style={styles.input} placeholder='Enter email'></TextInput>
      <TextInput style={styles.input} placeholder='Enter password'></TextInput>
      <Button style={styles.button} title='register'></Button>
      </View>
    </Modal>
    </View>
    
    

  );
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:'purple'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor:'white'
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'pink'
  },
  modal:{
    flex:1,
    alignItems:'center',
    backgroundColor:'purple',
    flexDirection:'column',
    justifyContent:'flex-start',
  },
});
