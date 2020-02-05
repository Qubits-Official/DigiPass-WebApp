// listen for auth status changes
auth.onAuthStateChanged(user => {
    //console.log(user);
    
    if (user) {
        console.log("user logged in: ", user);
    } else {
        console.log("user logged out", user);
    }
});

// signup
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user);

        return db.collection("Users").doc(cred.user.uid).set({
            "First Name": signupForm["first-name"].value,
            "Middle Name": signupForm["middle-name"].value,
            "Last Name": signupForm["last-name"].value,

            "ID Number": signupForm["id-number"].value,
            "Mobile Number": signupForm["mobile-number"].value,
            "Username": signupForm["username"].value,

            "Gender": signupForm["gender"].value,
            "Grade": signupForm["grade"].value,
            "Section": signupForm["section"].value,

            "Father's Name": signupForm["father-name"].value,
            "Father's Mobile Number": signupForm["father-mobile-number"].value,
            "Mother's Name": signupForm["mother-name"].value,
            "Mother's Mobile Number": signupForm["mother-mobile-number"].value,

            "Primary Address": signupForm["primary-address"].value,
            "Secondary Address": signupForm["secondary-address"].value,
            "Other Address #1": signupForm["other-address-1"].value,
            "Other Address #2": signupForm["other-address-2"].value,

            "Email": signupForm["email"].value,
            "Password": signupForm["password"].value
        });
    }).then(() => {
        // reset the form
        signupForm.reset();
        signupForm.querySelector(".error").innerHTML = "";

        // Simulate a mouse click:
        // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/others/dashboard-student.html";
        window.location.href = "https://digipass-0.web.app/pages/others/dashboard-student.html";

    }).catch(err => {
        signupForm.querySelector(".error").innerHTML = err.message;
    });
});
