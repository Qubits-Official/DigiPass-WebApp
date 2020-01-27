// add admin cloud function
const makeEmailAdmin = document.querySelector("#make-email-admin");

makeEmailAdmin.addEventListener("submit", (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector("#admin-email").value;
    const addAdminRole = functions.httpsCallable("addAdminRole");
    addAdminRole({
        email: adminEmail
    }).then(result => {
        console.log(result);
    });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
    //console.log(user);
    
    if (user) {
        console.log("user logged in: ", user);
    } else {
        console.log("user logged out", user);
    }
});
