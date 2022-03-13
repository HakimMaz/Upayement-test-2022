import { View, Text,StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import Product from './Product'

export default function ListProducts({items,navigation}) {
  return (
    <ScrollView>

    <View style={styles.container}>
      {items.map((item)=>
         <Product key={item.id} product={item} navigation={navigation}/>
      )}
     
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    marginTop:30,
    marginHorizontal:15,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    marginBottom:30,
  },
  
})