import { View, Text,Image ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function ProductDetails({route,navigation}) {
    const {avatar,name,price,description}= route.params.product;

    const backToHome =()=>{
        navigation.navigate('Home');
    }
  return (

    <View>
     <TouchableOpacity style={styles.icon} onPress={backToHome}> 
        <Ionicons name='arrow-back-outline' size={25}/>
     </TouchableOpacity>
     <Image
     style={styles.image}
     source={{uri:avatar?avatar:'https://www.brother.ca/resources/images/no-product-image.png'}}
     />
     <View style={styles.details}>
        <View style={styles.detailsTitle}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
        </View>
        <Text style={styles.description}>
            {description}
        </Text>
        <TouchableOpacity style={styles.cart} 
        onPress={()=>alert('this fonctionnality not available')}>
            <Text style={styles.cartText}>
                Add To Cart
            </Text>
            <AntDesign name='shoppingcart' size={20} color='#fff'/>

        </TouchableOpacity>
     </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        height:'100%',   
    },
    icon:{
        backgroundColor:'#eeeeee',
        position:'absolute',
        height:40,
        width:40,
        borderRadius:25,
        top:50,
        left:30,
        zIndex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    image:{
        width:'100%',
        height:500,
    },
    details:{
        backgroundColor:'#fff',
        position: 'absolute',
        top:400,
        bottom:0,
        height:'90%',
        width:'100%',
        borderTopEndRadius:20,
        borderTopStartRadius:20,
        padding:20,
        shadowColor:'#fff',
        shadowOffset:{
            width: 10,
            height: -6
          },
       opacity: 0.8,
       zIndex:1,
       overflow:'hidden'
    },
    detailsTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    title:{
       fontWeight:'bold',
       fontSize:20
    },
    price:{
        fontWeight:'bold',
        fontSize:20
    },
    description:{
        fontSize:16,
        fontWeight:'500'
    },
    cart:{
        backgroundColor:'#000',
        height:50,
        width:'90%',
        alignSelf:'center',
        position: 'absolute',
        bottom:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    cartText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'700',
        marginRight:10
    }
})