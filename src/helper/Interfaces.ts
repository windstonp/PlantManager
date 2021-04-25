export interface PlantProps{
  id: number,
  name: string,
  about: string,
  water_tips: string,
  photo:  string,
  environments: Array<string>,
  frequency: {
    times: number,
    repeat_every: string
  },
  dateTimeNotification: Date,
  hour: string
}

export interface StoragePlantsProps{
  [id: string]: {
    data: PlantProps
    notificationId: string
  },
}

export interface EnvironmentProps {
  key: string,
  title: string
}

export interface ConfirmationScreenParams{
  title: string,
  subtitle: string,
  buttonTitle: string,
  icon: 'smile' | 'hug',
  nextScreen: string,
}