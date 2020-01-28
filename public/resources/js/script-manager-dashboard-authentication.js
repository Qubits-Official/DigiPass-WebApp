// listen for auth status changes
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("user logged in: ", user);

        db.collection("Leave Pass").where("Status", "==", "Pending").onSnapshot((querySnapshot) => {
            setupLeavePassRequest(querySnapshot);
        });
    } else {
        console.log("user logged out", user);
    };
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
