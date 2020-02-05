var loader = document.querySelector(".loader");

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;

            if (user.admin) {
                console.log("admin user logged in: ", user);

                db.collection("Users").doc(getUrlParam("uid", "#")).get().then((doc) => {
                    setupStudentProfile(doc.data());
                    setupDefaultPrintablePass(doc.data());

                    // fetch the printable leave pass data
                    db.collection("Leave Pass").doc(getUrlParam("uid", "#")).onSnapshot((doc) => {
                        if (doc.exists) {
                            loader.className = "loader loader-default is-active";
    
                            setupLeavePassApplication(doc.data());
                            fullDynamicSetupPrintablePass(doc.data());
                        } else {
                            console.log("No current leave pass data.");
                        }
    
                        loader.className = "loader loader-default";
                    }, (error) => {
                        console.log(error.message);
    
                        loader.className = "loader loader-default";
                    });
                }).catch((error) => {
                    console.log("Error getting document:", error);

                    loader.className = "loader loader-default";
                });
            } else {
                loader.setAttribute("data-text", "Redirecting Account");
                loader.className = "loader loader-default is-active";

                console.log("user logged in: ", user);

                // Simulate a mouse click:
                // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/others/dashboard-student.html";
                window.location.href = "https://digipass-0.web.app/pages/others/dashboard-student.html";
            }
        });
    } else {
        loader.setAttribute("data-text", "Redirecting to the Sign in Page");
        loader.className = "loader loader-default is-active";

        console.log("user logged out", user);

        // Simulate a mouse click:
        // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/authentication/signin.html";
        window.location.href = "https://digipass-0.web.app/pages/authentication/signin.html";
    };
});

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
