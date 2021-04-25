import React from 'react';
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome(){
  const navigation = useNavigation();

  function handleNextPageRequest(){
    navigation.navigate('user-identification')
  }
  return( 
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper} >
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil {'\n'}
        </Text>
        <Image 
          source={wateringImg}  
          style={styles.wateringImg}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. {'\n'}
          Nós cuidamos de lembrar você sempre que {'\n'} 
          precisar. 
        </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={handleNextPageRequest}>
          <Feather name="chevron-right"  style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  wateringImg: {
    height: Dimensions.get('window').width * 0.7
  },
  buttonIcon:{
    color: colors.white,
    fontSize: 32
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderRadius: 16,
    height: 56,
    width: 56
  },
});