// listen for auth status changes
auth.onAuthStateChanged(user => {
    //console.log(user);
    
    if (user) {
        console.log("user logged in: ", user);
    } else {
        console.log("user logged out", user);
    }
});

// login
const signinForm = document.querySelector("#signin-form");
signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get the user info
    const email = signinForm["email"].value;
    const password = signinForm["password"].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // reset the form
        signinForm.reset();
        signinForm.querySelector(".error").innerHTML = "";

        // Simulate a mouse click:
        window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/others/dashboard-student.html";
        // window.location.href = "https://digipass-0.firebaseapp.com/pages/others/dashboard-student.html";
    }).catch(err => {
        signinForm.querySelector(".error").innerHTML = err.message;
    });
});
