// listen for auth status changes
auth.onAuthStateChanged(user => {
    //console.log(user);
    
    if (user) {
        console.log("user logged in: ", user);

        db.collection("Users").doc(getUrlParam("uid", "#")).get().then((doc) => {
            if (doc.exists) {
                setupStudentDashboard(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        db.collection("Leave Pass").doc(getUrlParam("uid", "#")).onSnapshot((doc) => {
            setupLeavePassApplication(doc.data());
            fullDynamicSetupPrintablePass(doc.data());
        }, (error) => {
            console.log(error.message);
        });
    } else {
        console.log("user logged out", user);
    };
});

// signout
const signout = document.querySelector(".signout");

signout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        //console.log("user signed out");

        // Simulate a mouse click:
        window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/authentication/signin.html";
        // window.location.href = "https://digipass-0.firebaseapp.com/pages/authentication/signin.html";
    });
});

// alert(getUrlParam("uid", "#"));

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}


