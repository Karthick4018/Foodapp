import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Allhotels = () => {
    const [data,setData] = useState([])
    const [image,setImage] = useState([]);
    const getAllhotels =async()=>{
        try{
            await axios.get(`http://192.168.1.12:5000/items/getallhotels`).then((res)=>{
                let response = res.data
                setData(response.data)
                const alldata = response.data
                const img = alldata.image
                setImage(img)
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getAllhotels()
        
    },[])
    const router = useRouter();

  return (
    <Pressable>
            {data?.length>0?(
                data?.map((item,index)=>{
                    return(
                        <Pressable style={styles.pressables} key={index} onPress={()=>{
                            router.push({
                                pathname:'/hotel',
                                params:item
                            })
                        }}>
                            {item?.image.map((img,index)=>{
                                return(
                                    <Image style={styles.image} key={index} source={{uri:img}}></Image>
                                )
                            })}
                            <View style={styles.whview}>
                            <View style={styles.next}>
                                <Text style={styles.text1}>{item?.name}</Text>
                                <Text style={styles.text2}>{item?.cuisine}</Text>
                                <Text style={styles.text3}>{item?.time}</Text>
                            </View>
                            <View style={styles.rating}>
                                <Text style={{color:'black',textAlign:'center'}}>{item?.rating}</Text>
                                <EvilIcons name="star" size={20} color="black" />
                            </View>
                            </View>
                            <View style={{borderWidth:0.5,borderColor:"#c8c8c8",marginHorizontal:10,marginVertical:4}}/>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            <View style={{flexDirection:'row',alignItems:'center',gap:4,marginHorizontal:8,marginVertical:5}}>
                            <MaterialCommunityIcons name="brightness-percent" size={24} color="black" />
                               <Text style={{marginLeft:2,color:'#1f75fe',fontWeight:'500',}}>{item?.offer}</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight:'500',color:'gray'}}>Total deliveries: {item?.deliveries}</Text>
                            </View>
                            </View>
                        </Pressable>
                    )
                })
            ):(
                <Text>loading</Text>
            )}
    </Pressable>
  )
}

export default Allhotels

const styles = StyleSheet.create({
    image:{
        width:"100%",
        aspectRatio:6/4,
        borderTopLeftRadius:6,
        borderTopRightRadius:6
    },
    pressables:{
        marginHorizontal:6,
        marginVertical:12,
        borderRadius:20,
        backgroundColor:'white'
    },
    rating:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5,
        paddingHorizontal:6,
        paddingVertical:4,
        marginRight:10,
        backgroundColor:"#ffff00",
        gap:2
    },
    whview:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    next:{
        // paddingVertical:4,
        // paddingHorizontal:3
    },
    text1:{
        paddingHorizontal:10,
        marginTop:10,
        fontSize:16,
        fontWeight:"500"
    },
    text2:{
        paddingHorizontal:10,
        marginTop:3,
        fontSize:15,
        fontWeight:"500",
        color:'gray'
    },
    text3:{
        paddingHorizontal:10,
        marginTop:3,
        fontSize:14,
        fontWeight:"500",
        color:'#505050'
    }
})