const requestLeavePassForm = document.querySelector("#request-leavepass");

// listen for auth status changes
auth.onAuthStateChanged(user => {
    //console.log(user);
    
    if (user) {
        console.log("user logged in: ", user);

        db.collection("Users").doc(user.uid).onSnapshot((doc) => {
            setupStudentDashboard(doc.data());
        }, (error) => {
            console.log(error.message);
        });

        db.collection("Leave Pass").doc(user.uid).onSnapshot((doc) => {
            fullDynamicSetupPrintablePass(doc.data());
        }, (error) => {
            console.log(error.message);
        });
        
        completeLeavePassRequest(user);
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
        window.location.href = "https://digipass-0.firebaseapp.com/pages/authentication/signin.html";
    });
});

// upload leave pass request data
const uploadLeavePassData = (downloadURL, user) => {
    db.collection("Leave Pass").doc(user.uid).set({
        "Reference Number" : generateId(),
        "Status": "Pending",
        "Time Stamp": firebase.firestore.FieldValue.serverTimestamp(),

        "Leave Pass Type": requestLeavePassForm["leave-pass-type"].value,
        "Destination": requestLeavePassForm["destination"].value,
        "Companions": requestLeavePassForm["companions"].value,
        "Departure Time": requestLeavePassForm["departure"].value,
        "Arrival Time": requestLeavePassForm["arrival"].value,
        "Parent's Consent": downloadURL
    }).then(() => {
        requestLeavePassForm.reset();
        alert("Leave Pass Request was successfully submitted.")
    }).catch(error => {
        console.log(error);
    });
};

// upload parent's consent image and data
const completeLeavePassRequest = (user) => {
    requestLeavePassForm.addEventListener("submit", (e) => {
        e.preventDefault();

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
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
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
