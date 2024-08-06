
const firebaseConfig = {
    apiKey: "AIzaSyB0GgklCc8-Rz3g_sV00AsuArezoQ0PVi4",
    authDomain: "exalt-technologies-task-2.firebaseapp.com",
    databaseURL: "https://exalt-technologies-task-2-default-rtdb.firebaseio.com",
    projectId: "exalt-technologies-task-2",
    storageBucket: "exalt-technologies-task-2.appspot.com",
    messagingSenderId: "838333644662",
    appId: "1:838333644662:web:9c52b38901989dda940457",
    measurementId: "G-EBLPZHVFQZ"
  };


  // initialize firebase
firebase.initializeApp(firebaseConfig)

  // reference for DB
export  const contactFromDB = firebase.database().ref('event');