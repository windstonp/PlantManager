import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImage from '../assets/userImage.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
  const [userName, setUserName] = useState<string>();

  useEffect(()=>{
    async function loadStorageUsername(){
      const storageUserName = await AsyncStorage.getItem('@plantManager:username');
      setUserName(storageUserName || '');
    }
    loadStorageUsername()
  },[]);
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.hiText}>
          Olá
        </Text>
        <Text style={styles.userNameText}>
          {userName}
        </Text>
      </View>
      <Image source={userImage} style={styles.userImage}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  hiText: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  }, 
  userNameText: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
});