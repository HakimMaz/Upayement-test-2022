import { View, Text,StyleSheet, Image, TouchableOpacity} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import React from 'react'

export default function Product({product,navigation}) {
    
  const {id,avatar,name,price} =product;
 
  const getDetails=(id)=>{

      navigation.navigate('ProductDetails',{product});
  }
  return (
    <TouchableOpacity style={styles.container} onPress={()=>getDetails(id)}>
     <Image
     style={styles.image}
        source={{
          uri: avatar?
           avatar:
          'https://www.brother.ca/resources/images/no-product-image.png',
        }}
        style={{ width: 120, height: 120 }}
      />
      <View style={styles.info}>
      <Text style={styles.title}> {name}</Text>
      <View style={styles.detail}>
       <Text style={styles.price}> ${price}</Text>
       <Entypo  style={styles.icon} name='edit' size={15} color='yellow'/>
      </View>
      </View>  
    </TouchableOpacity>
   
  )
}

const styles = StyleSheet.create({
    container:{
        width:'48%',
        height:220,
        backgroundColor:'#fff',
        borderRadius:20,
        alignItems:'center',
        //justifyContent:'center',
        overflow: 'hidden',
        marginVertical:10,
        paddingTop:10,
        shadowOffset: { width: 10, height: 10 },
  shadowColor: '#000',
  shadowOpacity: 1,
  //elevation: 3,
  // background color must be set
  //backgroundColor : "#fff" // invisible color
    },
   
    info:{
        backgroundColor:'#000',
        width:'100%',
        height:50,
        position: 'absolute',
        bottom:0,
        borderRadius:15,
        paddingHorizontal:5,
        paddingVertical:5,
        justifyContent:'space-between'
    },
    title:{
        color:'#fff',
        fontSize:13,
        fontWeight:'bold'
    },
    detail:{
        marignTop:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    price:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold'
    },
    icon:{
        marginRight:5
    }
})