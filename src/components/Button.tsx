import React from "react";
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import colors from "../styles/colors";
import fonts from '../styles/fonts';

interface ButtonsProps extends TouchableOpacityProps {
  title: string
}
export function Button({title, ...rest} : ButtonsProps){
  return(
    <TouchableOpacity 
      style={styles.button} 
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white
  }
});