// setup student's dashboard profile data
const setupStudentDashboard = (data) => {
    let valueContainer = document.querySelectorAll(".value");

    valueContainer.forEach((valueContainer) => {
        valueContainer.textContent = data[valueContainer.id];
    });

    setupDefaultPrintablePass(data);
};

const setupLeavePassApplication = (data) => {
    let leavePassApplication = document.querySelector("#request-leavepass");
    let parentConsent = document.querySelector("#consent");
    let leavePassType = document.querySelectorAll(".leave-pass-type")

    switch (data["Leave Pass Type"]) {
        case "Home Leave Pass":
            leavePassType[0].checked = true;
            break;
        case "Gate Pass":
            leavePassType[1].checked = true;
            break;
        case "Others":
            leavePassType[2].checked = true;
            break;
    };

    leavePassApplication["destination"].value = data["Destination"];
    leavePassApplication["companions"].value = data["Companions"];
    leavePassApplication["departure"].value = data["Departure Time"];
    leavePassApplication["arrival"].value = data["Arrival Time"];
    leavePassApplication["consent"].value = data["Parent's Consent"];

    parentConsent.addEventListener("click", (event) => {
        event.preventDefault();

        // Simulate a mouse click:
        window.open(data["Parent's Consent"], "_blank");
    });
};

// full dynamic setup of the printable leave pass
const fullDynamicSetupPrintablePass = (data) => {
    let status = document.querySelectorAll(".status");
    let type = document.querySelectorAll(".printable-type");

    switch (data["Status"]) {
        case "Pending":
            status[0].style.color = "#f39c12";
            status[1].style.color = "#f39c12";
            break;
        case "Approved":
            status[0].style.color = "#27ae60";
            status[1].style.color = "#27ae60";
            break;
        case "Declined":
        case "Expired":
            status[0].style.color = "#e74c3c";
            status[1].style.color = "#e74c3c";
            break;
    };

    switch (data["Leave Pass Type"]) {
        case "Home Leave Pass":
            type[0].className = "ion-ios-checkbox-outline printable-type";
            type[1].className = "ion-ios-square-outline printable-type";
            type[2].className = "ion-ios-square-outline printable-type";
            break;
        case "Gate Pass":
            type[0].className = "ion-ios-square-outline printable-type";
            type[1].className = "ion-ios-checkbox-outline printable-type";
            type[2].className = "ion-ios-square-outline printable-type";
            break;
        case "Others":
            type[0].className = "ion-ios-square-outline printable-type";
            type[1].className = "ion-ios-square-outline printable-type";
            type[2].className = "ion-ios-checkbox-outline printable-type";
            break;
    };

    let valueContainer = document.querySelectorAll(".printable-value");

    valueContainer.forEach((valueContainer) => {
        valueContainer.textContent = data[valueContainer.id];
    });

    securityTags(data);
    qrCode(data);
};

// setup the default data in the printable leave pass
const setupDefaultPrintablePass = (data) => {
    let fullName = data["First Name"] + " " + data["Middle Name"] + " " + data["Last Name"];
    let gradeAndSection = data["Grade"] + " - " + data["Section"];
    let contactNumber = data["Mobile Number"];

    let valueContainer = document.querySelectorAll(".default-value");

    valueContainer[0].textContent = fullName;
    valueContainer[1].textContent = gradeAndSection;
    valueContainer[2].textContent = contactNumber;
};

// Security Tags
const securityTags = (data) => {
    const securityTags = document.querySelector(".security-tags");

    securityTags.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Reference Number:\n" + data["Reference Number"]);
    });
};

// QR code
const qrCode = (data) => {
    const qrCode = document.querySelector(".QR-code");

    qrCode.addEventListener("click", (event) => {
        event.preventDefault();

        // Simulate a mouse click:
        window.open("http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chld=H&chl=" + data["Reference Number"], "_blank");
    });
};


// approve leave pass application
const approve = document.querySelector(".approve");

approve.addEventListener("click", (event) => {
    event.preventDefault();

    db.collection("Leave Pass").doc(getUrlParam("uid", "#")).update({
        "Status": "Approved"
    }).then(() => {
        // Simulate a mouse click:
        window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/administrator/dashboard-manager.html"
    }).catch((error) => {
        console.log(error.message);
    });
});

// decline leave pass application
const decline = document.querySelector(".decline");

decline.addEventListener("click", (event) => {
    event.preventDefault();

    db.collection("Leave Pass").doc(getUrlParam("uid", "#")).update({
        "Status": "Declined"
    }).then(() => {
        // Simulate a mouse click:
        window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/administrator/dashboard-manager.html"
    }).catch((error) => {
        console.log(error.message);
    });
});
