import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FoodItem from '../../Components/FoodItem'
import axios from 'axios';

const hotel = () => {
    const params = useLocalSearchParams()
    const router = useRouter()
    const [menu,setMenu]= useState([])
    useEffect(()=>{
        const item = params
    },[params])
    const getMenu = async()=>{
        try{
            await axios.get(`http://192.168.1.12:5000/items/getmenu`).then((res)=>{
                let response = res.data
                console.log(typeof response.data)
                setMenu(response.data)
                console.log(response.data)
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getMenu()
    },[])
  return (
    <ScrollView style={styles.container}>
    <View style={styles.viewouter}>
        <MaterialIcons onPress={()=>router.back()} style={{padding:5}} name="keyboard-backspace" size={24} color="black" />
        <View style={styles.view1}>
            <Fontisto name="camera" size={24} color="black" />
            <FontAwesome name="bookmark-o" size={24} color="black" />
            <MaterialCommunityIcons name="share" size={24} color="black" />
        </View>
    </View>
    <View style={styles.view3}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{params?.name}</Text>
        <Text style={{marginTop:5,color:'gray',fontWeight:'500',fontSize:15}}>{params?.cuisine}</Text>
        <View style={styles.viewss}>
        <View  style={styles.view2}>
        <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>{params?.rating}</Text>
        <MaterialIcons name="star" size={22} color="white" />
    </View>
    <Text style={{fontWeight:'500',fontSize:14,marginLeft:5}}>{params?.deliveries}</Text>
        </View>
        <View style={styles.viewstime}>
        <Text>{params?.time}</Text>
    </View>
    </View>
    {menu?.map((item,index)=>{
        return(
            <FoodItem key={index} item={item}></FoodItem>
        )
    })}
    </ScrollView>
  )
}

export default hotel

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    view1:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:14,
        gap:15
    },
    view2:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#006a4e',
        borderRadius:4,
        paddingHorizontal:4,
        paddingVertical:5,
        gap:6
    },
    view3:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
    },
    viewouter:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    viewss:{
        flexDirection:'row',
        alignItems:'center',
        gap:4,
        marginTop:10
    },
    viewstime:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#d8f0c0',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop:12
    }
})