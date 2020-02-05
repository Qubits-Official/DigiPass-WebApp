const requestLeavePassForm = document.querySelector("#request-leavepass");
var loader = document.querySelector(".loader");
var fullName = "";

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            console.log(idTokenResult.claims);
            user.admin = idTokenResult.claims.admin;
            console.log(user.admin);

            if (user.admin) {
                loader.setAttribute("data-text", "Redirecting Account");
                loader.className = "loader loader-default is-active";

                console.log("admin user logged in: ", user);
                
                // Simulate a mouse click:
                // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/administrator/dashboard-manager.html";
                window.location.href = "https://digipass-0.web.app/pages/administrator/dashboard-manager.html";
            } else {
                console.log("user logged in: ", user);
        
                db.collection("Users").doc(user.uid).get().then((doc) => {
                    setupStudentProfile(doc.data());
                    setupDefaultPrintablePass(doc.data());
        
                    // fetch the printable leave pass data
                    db.collection("Leave Pass").doc(user.uid).onSnapshot((doc) => {
                        if (doc.exists) {
                            loader.className = "loader loader-default is-active";
        
                            fullDynamicSetupPrintablePass(doc.data());
                        } else {
                            console.log("No current leave pass data.");
                        }
        
                        loader.className = "loader loader-default";
                    }, (error) => {
                        console.log(error.message);
        
                        loader.className = "loader loader-default";
                    });
        
                    completeLeavePassRequest(user);
                }).catch((error) => {
                    console.log("Error getting document:", error);
        
                    loader.className = "loader loader-default";
                });
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

// upload leave pass request data
const uploadLeavePassData = (downloadURL, user) => {
    db.collection("Leave Pass").doc(user.uid).set({
        "Reference Number" : generateId(),
        "Status": "Pending",
        "Time Stamp": firebase.firestore.FieldValue.serverTimestamp(),

        "Full Name": fullName,
        "Leave Pass Type": requestLeavePassForm["leave-pass-type"].value,
        "Destination": requestLeavePassForm["destination"].value,
        "Companions": requestLeavePassForm["companions"].value,
        "Departure Time": requestLeavePassForm["departure"].value,
        "Arrival Time": requestLeavePassForm["arrival"].value,
        "Parent's Consent": downloadURL
    }).then(() => {
        alert("Leave Pass Request was successfully submitted.")

        requestLeavePassForm.reset();

        loader.className = "loader loader-default";
    }).catch(error => {
        console.log(error);

        loader.className = "loader loader-default";
    });
};

// upload parent's consent image and data
const completeLeavePassRequest = (user) => {
    requestLeavePassForm.addEventListener("submit", (event) => {
        event.preventDefault();

        loader.setAttribute("data-text", "Sending Application Data");
        loader.className = "loader loader-default is-active";

        // upload parent's consent image
        // File or Blob
        var file = document.querySelector("#consent").files[0];

        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storage.child('images/' + user.uid).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        // or 'state_changed'
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');

                    loader.className = "loader loader-default";
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log(error.message);
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    console.log(error.message);
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    console.log(error.message);
                    break;
            }
        }, () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);

                uploadLeavePassData(downloadURL, user);
            });
        });
    });
};
