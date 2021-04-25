import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { PlantProps, StoragePlantsProps} from './Interfaces';
import * as Notification from 'expo-notifications';

export async function storagePlant(plant: PlantProps): Promise<void>{
  try{
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();
    const {times, repeat_every} = plant.frequency;
    if(repeat_every === 'week'){
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    }else{
      nextTime.setDate(nextTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000
    );

    const notificationId = await Notification.scheduleNotificationAsync({
      content: {
        title: 'Heeeeeey 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notification.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      }
    })

    const data = await AsyncStorage.getItem('@plantManager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantsProps) : {};
    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    }
    await AsyncStorage.setItem('@plantManager:plants', JSON.stringify({
      ...oldPlants,
      ...newPlant,
    }));
  }catch(e){
    throw new Error(e);
  }
}


export async function loadStoragePlant(): Promise<PlantProps[]>{
  try{
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantsProps) : {};
    const plantsSorted = Object
      .keys(plants)
      .map((plant)=>{
        return {
          ...plants[plant].data,
          hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
        }
      })
      .sort((a, b)=>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

      return plantsSorted
  }catch(e){
    throw new Error(e);
  }
}

export async function removeStoragePlant(id: string): Promise<void>{
  try{
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantsProps) : {};

    await Notification.cancelScheduledNotificationAsync(plants[id].notificationId);

    delete plants[id];
    await AsyncStorage.setItem(
      '@plantManager:plants', 
      JSON.stringify(plants)
    );
  }catch(e){
    throw new Error(e);
  }
}