import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/welcome';
import { UserIdentification } from '../pages/user-identification';
import { Confirmation } from '../pages/confirmation';
import { PlantSave } from '../pages/plant-save';
import AuthRoutes from './tabs.routes';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle:{
        backgroundColor: colors.white
      }
    }}
  >
    <stackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />
    <stackRoutes.Screen 
      name="user-identification"
      component={UserIdentification}
    />
    <stackRoutes.Screen 
      name="user-authenticated"
      component={AuthRoutes}
    />
    <stackRoutes.Screen 
      name="user-confirmation"
      component={Confirmation}
    />
    <stackRoutes.Screen 
      name="plant-save"
      component={PlantSave}
    />
    <stackRoutes.Screen 
      name="my-plants"
      component={AuthRoutes}
    />
  </stackRoutes.Navigator>
)

export default AppRoutes