// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCaQ_WFEOBk13sFfCf2rTI00gX3Knty3ag",
    authDomain: "digipass-0.firebaseapp.com",
    databaseURL: "https://digipass-0.firebaseio.com",
    projectId: "digipass-0",
    storageBucket: "digipass-0.appspot.com",
    messagingSenderId: "1086325406607",
    appId: "1:1086325406607:web:670b1db6a894688cf5e9fa",
    measurementId: "G-NMY3RVKFW8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// make auth, firestore, and functions references
const auth = firebase.auth();
const db = firebase.firestore();
