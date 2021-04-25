import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { SvgFromUri } from 'react-native-svg';
import { PlantProps as PlantPropsData } from '../helper/Interfaces';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface plantProps extends RectButtonProps{
  plantData: PlantPropsData,
  handleRemove: () => void
}

export function PlantCardSecondary({plantData, handleRemove,...rest}: plantProps){
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={()=>(
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton 
        style={styles.container}
        {...rest}
      >
        <SvgFromUri uri={plantData.photo} width={70} height={70}/>
        <Text style={styles.title}>
          {plantData.name}
        </Text>
        <View style={styles.details}>
          <Text style={styles.TimeLabel}>
            Regar às
          </Text>
          <Text style={styles.Time}>
            {plantData.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17
  },
  details: {
    alignItems: 'flex-end',
    marginRight: 15
  },
  TimeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },
  Time:{
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },
  buttonRemove:{
    width: 120,
    height: 100,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15,
  }
});