import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Carousel from '../../Components/Carousel';
import Items from '../../Components/Items';
import Hotel from '../../Components/Hotel'
import Data from '../../Components/Data'
import Allhotels from '../../Components/Allhotels'
import axios from 'axios'
import Search from '../../Components/Search';

const index = () => {
    const [LocationServiesEnabled,setLocationServicesEnabled] = useState(false);
    const[displayCurrentAddress,setdisplayCurrentAddress] = useState('Fetching Current location')
    const [search,setsearch] = useState('')
    const [searchresult,setsearchresult] = useState([])
    const [nomatch,setNomatch] = useState([])
    const searchData = async(search)=>{
        try{
            await axios.post(`http://192.168.1.12:5000/items/searchitems`,{search:search}).then((res)=>{
                let response = res.data
                setsearchresult(response.data)
                console.log(response)
                if(response.success===false){
                    setNomatch(response.message)
                }
                if(response.success===true){
                    setNomatch([]);
                }
                console.log(response)
            })
        }catch(err){
            console.log(err)
        }
    }
    const handleChange =()=>{
        console.log(search)
        if(!search){
            setsearchresult([]);
        setNomatch('');
            Alert.alert(
                'Noting Searched',
                'Search something',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                  }
                ],
                { cancelable: false }
              );
              return 
        }
            searchData(search)
        
    }
    const checkLocationEnabled = async()=>{
        let enabled = await Location.hasServicesEnabledAsync();
        if(!enabled){
            Alert.alert('Location Not Enabled',
            'Enable Location to continue',
            [{text:'OK'}],{cancelable:false})
        }else{
            setLocationServicesEnabled(true);
        }
    }
    const getCurrentLocation = async()=>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status!=='granted'){
            Alert.alert('Permission to Location is Not Allowed',
            'Allow app to use Location',
            [{text:'OK'}],{cancelable:false})
        }
        const location = await Location.getCurrentPositionAsync({
            accuracy:Location.Accuracy.High
        })
        const {coords} = await Location.getCurrentPositionAsync()
        if(coords){
            const {latitude,longitude} = coords
            let response = await Location.reverseGeocodeAsync({latitude,longitude});
            const address = await LocationGeocoding.reverseGeocodeAsync({latitude,longitude});
            const streetAddress = address[0].name;
            for(let item of response){
                let address = `${item?.name}, ${item?.city},${item?.postalCode}, ${item?.country}`
                setdisplayCurrentAddress(address)
            }
            
        }
    }
    useEffect(()=>{
        checkLocationEnabled();
        getCurrentLocation();
    },[])
  return (
    <ScrollView style={styles.scrollViewContainer}>
    <View style={styles.view1}>
        <Entypo name="location" size={24} color="black" />
    <View style={styles.view2}>
        <Text style={styles.parat}>Deliver To</Text>
        <Text style={styles.parat2}>{displayCurrentAddress}</Text>
    </View>
    <Pressable style={styles.icon}>
        <Text>K</Text>
    </Pressable>
    </View>
    <View style={styles.view3}>
        <TextInput style={{flex:1}} placeholder='search anything..' value={search} onChangeText={setsearch}></TextInput>
        <Ionicons name="search" size={24} color="black" />
    </View>
    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginVertical:10,gap:10}}>
    {
           nomatch?.length>0&&(
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={{textTransform:'capitalize',color:'red',fontWeight:'500'}}>
                    {nomatch}
                </Text>
            </View>
           ) 
        }
    <TouchableOpacity  style={[styles.button]} onPress={handleChange}>
      <Text style={styles.buttonText}>search</Text>
    </TouchableOpacity>
    </View>
    <View>
        {
            searchresult?.map((searchs,index)=>{
                return(
                    <Search key={index} searchresults={searchresult} ></Search>
                )
            })
        }
    </View>
    <View style={{marginTop:10}}>
    <Carousel></Carousel>
    </View>
    <View>
        <Items></Items>
    </View>
    <View>
        <Hotel></Hotel>
    </View>
    <Text style={{textAlign:'center',marginTop:7,letterSpacing:4,marginBottom:5,color:'gray'}}>EXPLORE</Text>
    <ScrollView>
        <Data></Data>
    </ScrollView>
    <Text style={{textAlign:'center',marginTop:7,letterSpacing:4,marginBottom:5,color:'gray'}}>ALL RESTAURANTS</Text>
    <View style={{marginHorizontal:8}}>
        <Allhotels></Allhotels>
    </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
    scrollViewContainer:{
        flex:1,
    },
    icon:{
        backgroundColor:'#6cb4ee',
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    view1:{
        flexDirection:'row',
        alignItems:'center',
        gap:12,
        padding:10,
    },
    view2:{
        flex:1,
    },
    view3:{
        flexDirection:'row',
        borderWidth:1,
        paddingVertical:8,
        paddingHorizontal:10,
        marginHorizontal:12,
        marginTop:12,
        borderRadius:11,
        justifyContent:'space-between',
        borderColor:'#c0c0c0',
        alignItems:'center',
    },
    parat:{
        fontSize:15,
        fontWeight:'500'
    },
    parat2:{
        color:'gray',
        fontSize:16,
        marginTop:3
    },
    button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
})