// get server time stamp
var getServerTimeStamp = new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            let time = JSON.parse(http.response);

            resolve(time["timestamp"]);
        }
    };

    http.open("GET", "http://api.timezonedb.com/v2.1/get-time-zone?key=KFGFQ41VONQB&format=json&by=zone&zone=Asia/Manila", true);
    http.send();
});

getServerTimeStamp.then((resolve) => {
    // listen for auth status changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("user logged in: ", user);

            db.collection("Leave Pass").where("Status", "==", "Pending").orderBy("Time Stamp").limit(10).onSnapshot((querySnapshot) => {
                setupLeavePassRequest(querySnapshot, resolve);
            });
        } else {
            console.log("user logged out", user);
        };
    });
});getServerTimeStamp.catch((reject) => {
    console.log(reject);
});

// signout
const signout = document.querySelector(".signout");

signout.addEventListener("click", (event) => {
    event.preventDefault();
    auth.signOut().then(() => {
        //console.log("user signed out");

        // Simulate a mouse click:
        window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/authentication/signin.html";
        // window.location.href = "https://digipass-0.firebaseapp.com/pages/authentication/signin.html";
    });
});
