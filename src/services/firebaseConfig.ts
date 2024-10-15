const config = {
  apiKey: 'AIzaSyADJwSudN3vMRicU7QdobwUT_55h1ughww',
  authDomain: 'arrr-13914.firebaseapp.com',
  databaseURL: 'https://arrr-13914-default-rtdb.firebaseio.com',
  projectId: 'arrr-13914',
  storageBucket: 'arrr-13914.appspot.com',
  messagingSenderId: '695438168915',
  appId: '1:695438168915:web:094bf90d0621de702347a6',
  measurementId: 'G-CNSQQBD7FM'
};

type IConfig = typeof config;

export function getFirebaseConfig(): IConfig {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');
  else return config;
}
