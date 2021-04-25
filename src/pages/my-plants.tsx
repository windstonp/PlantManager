import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import waterDrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { PlantProps } from '../helper/Interfaces';
import { loadStoragePlant, removeStoragePlant } from '../helper/storage';
import { formatDistance } from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { FlatList } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/plant-card-secondary';
import { Load } from '../components/Load';

export function MyPlants(){
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] =  useState<string>();

  function handleRemove(plant: PlantProps){
    Alert.alert(
      'Remover',
      `Deseja remover a ${plant.name}?`,
      [
        {
          text: 'Não 🙏',
          style: 'cancel'
        },
        {
          text: 'Sim 😭',
          onPress: async () => {
            try{
              await removeStoragePlant(String(plant.id));
              setMyPlants(
                (oldData) => 
                  oldData.filter((item) => item.id !== plant.id)
                )
            }catch{
              Alert.alert('Não conseguimos remover a planta 😭');
            }
          }
        }
      ]
    )
  }
  
  useEffect(()=>{
    async function loadStorageDate(){
      const plantsLoaded = await loadStoragePlant();

      const nextTime = formatDistance(
        new Date(plantsLoaded[0].dateTimeNotification).getTime(),
        new Date(),
        {locale: ptBR}
      );
      setNextWatered(
        `Regue sua ${plantsLoaded[0].name} daqui a ${nextTime}`
      );
      setMyPlants(plantsLoaded);
      setLoading(false);
    }
    loadStorageDate();
  },[]);

  if(loading){
    return <Load/>
  }
  return(
    <View style={styles.container}>
      <Header/>
      <View style={styles.spotlight}>
        <Image 
          source={waterDrop} 
          style={styles.spotlightWaterDrop}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary 
              plantData={item} 
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightWaterDrop:{
    width: 60,
    height: 60,
  },
  spotlightText:{
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
});