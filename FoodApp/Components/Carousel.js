// import { FlatList, StyleSheet, Text, View,Image, Dimensions } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import {SliderBox} from 'react-native-image-slider-box'
// const Carousel = () => {
//     const screenWidth = Dimensions.get('window').width
//     const [activeIndex,setactiveIndex] = useState(null)
//     const flatref = useRef()
//     const carouselData = [
//         {
//             id:1,
//             image: require('../assets/pexels-photo-376464.jpeg')
//         },
//         {
//             id:2,
//             image: require('../assets/lhnwo9ezxo7mpkpvtdcy.webp')
//         },
//     ]
//     const renderItem =({item,index})=>{
//         return(
//             <View>
//                 <Image source={item.image} style={{height:200,width:screenWidth}}></Image>
//             </View>
//         )
//     }
//     const handleScroll = (event)=>{
//         const scrollPosition = event.nativeEvent.contentOffset.x
//         const index = scrollPosition / screenWidth
//         setactiveIndex(index)
//     }
//     const renderDotIndicator =()=>{
//         return(
//             carouselData.map((dot,index)=>{
//                 if(activeIndex===index){
//                     return(
//                         <View key={index} style={{width:10,height:10,borderRadius:5,backgroundColor:'black',marginHorizontal:5}}></View>
//                     )
//                 }else{
//                     return(
//                         <View key={index} style={{width:10,height:10,borderRadius:5,backgroundColor:'gray',marginHorizontal:5}}></View>
//                     )
//                 }
//             })
//         )
//     }
//     const getItemLayout =(data,index)=>({
//         length:screenWidth,
//         offset:screenWidth*index,
//         index:index,
//     })
//     useEffect(()=>{
//         let interval=setInterval(()=>{
//             if(activeIndex===carouselData.length-1){
//                 flatref.current.scrollToIndex({
//                     index:0,
//                     animation:true,
//                 })
//             }else{
//                 flatref.current.scrollToIndex({
//                     index:activeIndex+1,
//                     animation:true
//                 })
//             }
//         },2000)
//         return ()=>clearInterval(interval)
//     })
//   return (
//     <View>
//         <FlatList data={carouselData}
//          keyExtractor={(item)=>item.id}
//         renderItem={renderItem}
//         getItemLayout={getItemLayout}
//         horizontal={true}
//         pagingEnabled={true}
//         onScroll={handleScroll}></FlatList>
//         <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
//             {renderDotIndicator()}
//         </View>
//     </View>
//   )
// }

// export default Carousel

// const styles = StyleSheet.create({})
import { FlatList, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Carousel = () => {
    const screenWidth = Dimensions.get('window').width
    const [activeIndex, setActiveIndex] = useState(0)
    const flatref = useRef(null) // Initialize flatref with null
    const carouselData = [
        {
            id:1,
            image: require('../assets/pexels-photo-376464.jpeg')
        },
        {
            id:2,
            image: require('../assets/lhnwo9ezxo7mpkpvtdcy.webp')
        },
    ]
    const renderItem = ({ item }) => {
        return (
            <View>
                <Image source={item.image} style={{ height: 200, width: screenWidth }} />
            </View>
        )
    }
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const index = Math.floor(scrollPosition / screenWidth) // Use Math.floor to get the correct index
        setActiveIndex(index)
    }
    const renderDotIndicator = () => {
        return (
            carouselData.map((dot, index) => (
                <View
                    key={index}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: index === activeIndex ? 'black' : 'gray',
                        marginHorizontal: 5
                    }}
                />
            ))
        )
    }
    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index,
    })
    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1) {
                flatref.current.scrollToIndex({
                    index: 0,
                    animated: true,
                })
            } else {
                flatref.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true
                })
            }
        }, 2000)
        return () => clearInterval(interval)
    },[])
    return (
        <View>
            <FlatList
                ref={flatref} // Assign ref to the FlatList component
                data={carouselData}
                keyExtractor={(item) => item.id.toString()} // Ensure key is string type
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                horizontal={true}
                pagingEnabled={true}
                onScroll={handleScroll}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                {renderDotIndicator()}
            </View>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({})
