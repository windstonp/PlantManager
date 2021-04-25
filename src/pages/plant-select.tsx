import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { 
  Text,
  View, 
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { api } from '../api/axios';
import { EnvironmentButton } from '../components/environment-button';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/plant-card-primary';
import { EnvironmentProps, PlantProps } from '../helper/Interfaces';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSelect(){
  const navigation = useNavigation();
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentActive, setEnvironmentActive] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);

  function handlerNextPageRequest(plant: PlantProps){
    navigation.navigate('plant-save', { plant });
  }

  async function setPlantsData(){
    const { data } = await api.get('plants',{
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 8
      }
    });
    if(!data){
      return setLoading(true);
    }
    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);

    }else{
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);

  }

  function handleEnvironmentActive(environment: string){
    setEnvironmentActive(environment);
    if(environment == 'all'){
      return setFilteredPlants(plants);
    }
    const filtered = plants.filter((plants) => 
      plants.environments.includes(environment)
    );
    setFilteredPlants(filtered);
  };

  function handleFetchMore(distance: number){
    if(distance < 1){
      return;
    }
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    setPlantsData();
  }

  useEffect(()=>{
    async function setEnvironmentData(){
      const { data } = await api.get('plants_environments',{
        params: {
          _sort: 'title',
          _order: 'asc'
        }
      });
      setEnvironment([
        {
          key: 'all',
          title: 'todos',
        },
        ...data
      ]);
    }
    setEnvironmentData();
  },[]);
  useEffect(() => {
    setPlantsData();
  }, []);

  if(loading){
    return <Load />
  }
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente 
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View>
        <FlatList 
          data={environment}
          keyExtractor={(item)=> String(item.key)}
          renderItem={({item}) => (
            <EnvironmentButton
              title={item.title}
              active={item.key == environmentActive}
              onPress={() => handleEnvironmentActive(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item)=> String(item.id)}
          renderItem={({item}) => (
            <PlantCardPrimary
              key={item.id}
              plantData={item}
              onPress={() => handlerNextPageRequest(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore 
            ?
              <ActivityIndicator color={colors.green} />
            : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title:{
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  header: {
    paddingHorizontal: 30
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});