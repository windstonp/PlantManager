import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { Button } from "../components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification(){
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function handleNextPageRequest(){
    if(Boolean(isFilled)){
      try{
        await AsyncStorage.setItem('@plantManager:username', name);
        navigation.navigate('user-confirmation',{
          title: 'Prontinho',
          subtitle: `Agora vamos começar a cuidar das suas ${'\n'} plantinhas com muito cuidado.`,
          buttonTitle: 'Começar',
          icon: 'smile',
          nextScreen: 'user-authenticated'
        });
      }catch{
        setShowError(true);
        setErrorMessage(`Oops, não conseguimos salvar seu nome`);
      }
    }
    else{
      setShowError(true);
      setErrorMessage(`desculpe, mas precisamos saber seu \n nome para continuarmos.`);
    }
  }
  function handlerInputBlur(){
    setIsFocused(false);
    setIsFilled(Boolean(name));
  }
  function handlerInputFocus(){
    setIsFocused(true);
  }
  function handlerInputChange(value: string){
    setIsFilled(Boolean(value));
    setShowError(!Boolean(value));
    setErrorMessage(`desculpe, mas precisamos saber seu \n nome para continuarmos.`);
    setName(value);
  }
  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { isFilled ? '😃' : '😄'}
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>
              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="digite seu nome!"
                onBlur={handlerInputBlur}
                onFocus={handlerInputFocus}
                onChangeText={handlerInputChange}
              />
              { showError &&
                <View>
                  <Text style={styles.textError}>
                    {errorMessage}
                  </Text>
                </View>
              }
              <View style={styles.footer}>
                <Button 
                  title="Confirmar"
                  activeOpacity={0.5}
                  onPress={handleNextPageRequest}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
  },
  textError:{
    textAlign: 'center',
    fontSize: 17,
    fontFamily: fonts.text,
    marginTop: 10,
    color: colors.red,
    fontWeight: 'bold'
  }
});