import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBJrBcaQ27FB-r-2iWtcIOBK5GgZQx-NGQ",
  authDomain: "t-rexauth.firebaseapp.com",
  projectId: "t-rexauth",
  storageBucket: "t-rexauth.appspot.com",
  messagingSenderId: "567916191944",
  appId: "1:567916191944:web:9f81982636bc85849b05fd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let cUser = "";

const reg = document.getElementById('logout-but');
//to - check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.replace("./index.html");
  }
  else {
    document.getElementById('welcome').innerHTML = "Welcome, " + user.email;
    cUser = user.email;
  }
});
reg.addEventListener('click', (e) => {
  e.preventDefault()

  signOut(auth).then(() => {
    alert('signed out')
  }).catch((error) => {
    alert('Some error has occured')
  });

});
// accessing database
const db = getFirestore(app);
//ScoreBoard
let fid = ""
let fids = 1
let sid = ""
let sids = 2
let tid = ""
let tids = 3
const querySnapshot = await getDocs(collection(db, "HighScores"));
querySnapshot.forEach((doc) => {

  if((doc.data().hs) > fids)
  {
      tids = sids;
      tid = sid;
      sids = fids;
      sid = fid;
      fids = doc.data().hs;
      fid = doc.data().name;
  }
  else if((doc.data().hs) > sids)
  {
      tids = sids;
      tid = sid;
      sids = doc.data().hs;
      sid = doc.data().name;
  }
  else if((doc.data().hs) > tids)
  {
      tids = doc.data().hs;
      tid= doc.data().name;
  }
});
document.getElementById("first").innerHTML = fid+"-"+fids
document.getElementById("second").innerHTML = sid+"-"+sids
document.getElementById("third").innerHTML = tid+"-"+tids

//Bgm
let cou = 0
document.getElementById('muse').addEventListener('click', (e) => {
  // console.log('cou')
  if ((cou % 2) == 0) {

    document.getElementById("strangertA").play()
    document.getElementById('muse').innerHTML = "Music:On"
  }
  else {
    document.getElementById("strangertA").pause()
    document.getElementById('muse').innerHTML = "Music:Off"

    // document.getElementById("strangertA").currentTime = 0
  }
  cou++
})

export default class UpdateStore {
  // constructor(score) {
  //   const db = getFirestore(app);
  //   const highRef = collection(db, "HighScores");
  //   setDoc(doc(highRef, cUser), {
  //     name: cUser, hs: score
  //   })
  // }
  async setterSc(score)
  {
    const db = getFirestore(app)
    const docRef = doc(db, "HighScores", "test@gmail.com")
    const docSnap = await getDoc(docRef)
    // console.log(docSnap.data().hs)
    if((docSnap.data().hs)<score)
    {
    // alert("sfsf")
    const highRef = collection(db, "HighScores");
    setDoc(doc(highRef, cUser), {name: cUser,
    hs: score}).then()
    }
  }
}