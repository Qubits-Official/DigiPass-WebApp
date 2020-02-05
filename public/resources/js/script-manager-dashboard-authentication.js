var loader = document.querySelector(".loader");

// get server time stamp
var getServerTimeStamp = new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            let time = JSON.parse(http.response);

            resolve(time["timestamp"]);
        }
    };

    http.open("GET", "https://api.timezonedb.com/v2.1/get-time-zone?key=KFGFQ41VONQB&format=json&by=zone&zone=Asia/Manila", true);
    http.send();
    /*putcha*/
});

getServerTimeStamp.then((resolve) => {
    // listen for auth status changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            user.getIdTokenResult().then(idTokenResult => {
                console.log(idTokenResult.claims);
                user.admin = idTokenResult.claims.admin;
    
                if (user.admin) {
                    console.log("admin user logged in: ", user);
                    
                    db.collection("Leave Pass").where("Status", "==", "Pending").orderBy("Time Stamp").limit(10).onSnapshot((querySnapshot) => {
                        loader.className = "loader loader-default is-active";

                        setupLeavePassRequest(querySnapshot, resolve);

                        loader.className = "loader loader-default";
                    }), (error) => {
                        console.log(error.message);

                        loader.className = "loader loader-default";
                    };
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
});getServerTimeStamp.catch((reject) => {
    console.log(reject);
});

// signout
const signout = document.querySelector(".signout");

signout.addEventListener("click", (event) => {
    event.preventDefault();

    loader.setAttribute("data-text", "Signing out");
    loader.className = "loader loader-default is-active";

    auth.signOut().then(() => {
        // Simulate a mouse click:
        // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/authentication/signin.html";
        window.location.href = "https://digipass-0.web.app/pages/authentication/signin.html";
    });
});
