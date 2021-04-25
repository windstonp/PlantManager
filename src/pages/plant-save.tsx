import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore } from 'date-fns';

import { SvgFromUri } from 'react-native-svg';
import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format } from 'date-fns/esm';
import { PlantProps } from '../helper/Interfaces';
import {storagePlant} from '../helper/storage';

interface params {
  plant: PlantProps
}
export function PlantSave(){
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, SetShowDatePicker] = useState(Platform.OS == 'ios');
  const { plant } = route.params as params;
  function handleChangeTime(event: Event, datetime: Date | undefined ){
    if(Platform.OS === 'android'){
      SetShowDatePicker(oldValue => !oldValue);
    }
    if(datetime && isBefore(datetime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⏰")
    }
    if(datetime){
      setSelectedDateTime(datetime);
    }
  }
  function handleOpenTimePickerOnAndroid(){
    SetShowDatePicker(oldValue => !oldValue);
  }
  async function handleSavePlant(){
    try{
      await storagePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('user-confirmation',{
        title: 'Tudo certo',
        subtitle: `Fique tranquilo que sempre vamos ${'\n'} lembrar você de cuidar da sua plantinha ${'\n'} com bastante amor.`,
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'my-plants',
      });
    }catch{
      Alert.alert('Erro!', 'não conseguimos salvar a planta 😢');
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            width={150}
            height={150}
          />
          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>
        <View style={styles.controllers}>
          <View style={styles.tipContainer}>
            <Image source={waterDrop}/>
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>
          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>
          {showDatePicker && (
              <DateTimePicker 
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            )
          }
          { Platform.OS == 'android' && (
              <TouchableOpacity 
                style={styles.dateTimePickerButton}
                onPress={handleOpenTimePickerOnAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar Horário: ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }
          <Button 
            title="cadastrar planta" 
            onPress={handleSavePlant}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  controllers: {
    backgroundColor: colors.white,
    paddingBottom: getBottomSpace() || 20,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    fontFamily: fonts.text,
    textAlign:'center',
    color: colors.heading,
    fontSize: 17,
    marginTop: 10 
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 10,
    position: 'relative',
    transform: [{ translateY: -60 }]
  },
  tipText: {
    fontFamily: fonts.text,
    fontSize: 17,
    flex: 1,
    marginLeft: 20,
    color: colors.blue,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText:{
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24,
  }
});