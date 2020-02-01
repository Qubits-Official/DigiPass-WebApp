// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            console.log(idTokenResult.claims);
            user.admin = idTokenResult.claims.admin;

            if (user.admin) {
                console.log("admin user logged in: ", user);
                
                // Simulate a mouse click:
                window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/administrator/dashboard-manager.html";
            } else {
                console.log("user logged in: ", user);
        
                // Simulate a mouse click:
                window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/others/dashboard-student.html";
                // window.location.href = "https://digipass-0.firebaseapp.com/pages/others/dashboard-student.html";
            }
        });
    } else {
        console.log("user logged out", user);
    }
});

// login
const signinForm = document.querySelector("#signin-form");
signinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let loader = document.querySelector(".loader");
    loader.className = "loader loader-default is-active";

    // get the user info
    const email = signinForm["email"].value;
    const password = signinForm["password"].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // reset the form
        signinForm.reset();
        signinForm.querySelector(".error").innerHTML = "";
    }).catch(err => {
        signinForm.querySelector(".error").innerHTML = err.message;

        loader.className = "loader loader-default";
    });
});
