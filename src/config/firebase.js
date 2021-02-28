import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firebase-storage';
import 'firebase/firebase-auth';

const firebaseConfig = {
    apiKey: "AIzaSyDWbRhFejmCeQlgjXmS5kwECJRWrEPiZkA",
    authDomain: "leana-cms.firebaseapp.com",
    databaseURL: "https://leana-cms.firebaseio.com",
    projectId: "leana-cms",
    storageBucket: "leana-cms.appspot.com",
    messagingSenderId: "306841343611",
    appId: "1:306841343611:web:05dd4fd689317a24d3b4de",
    measurementId: "G-TBE5G6FYGQ"
};
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();