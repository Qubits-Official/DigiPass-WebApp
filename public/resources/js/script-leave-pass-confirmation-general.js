// setup student's dashboard profile data
const setupStudentProfile = (data) => {
    let valueContainer = document.querySelectorAll(".value");

    valueContainer.forEach((valueContainer) => {
        valueContainer.textContent = data[valueContainer.id];
    });
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
            status[0].className = "ion-ios-remove-circle status"
            status[0].style.color = "#f39c12";
            status[1].style.color = "#f39c12";
            break;
        case "Approved":
            status[0].className = "ion-ios-checkmark-circle status"
            status[0].style.color = "#27ae60";
            status[1].style.color = "#27ae60";
            break;
        case "Declined":
        case "Expired":
            status[0].className = "ion-ios-close-circle status"
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

    loader.setAttribute("data-text", "Updating Server Data");
    loader.className = "loader loader-default is-active";

    db.collection("Leave Pass").doc(getUrlParam("uid", "#")).update({
        "Status": "Approved"
    }).then(() => {
        // Simulate a mouse click:
        // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/administrator/dashboard-manager.html";
        window.location.href = "https://digipass-0.web.app/pages/administrator/dashboard-manager.html";
    }).catch((error) => {
        console.log(error.message);

        loader.className = "loader loader-default";
    });
});

// decline leave pass application
const decline = document.querySelector(".decline");

decline.addEventListener("click", (event) => {
    event.preventDefault();

    loader.setAttribute("data-text", "Updating Server Data");
    loader.className = "loader loader-default is-active";

    db.collection("Leave Pass").doc(getUrlParam("uid", "#")).update({
        "Status": "Declined"
    }).then(() => {
        // Simulate a mouse click:
        // window.location.href = "file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/administrator/dashboard-manager.html";
        window.location.href = "https://digipass-0.web.app/pages/administrator/dashboard-manager.html";
    }).catch((error) => {
        console.log(error.message);

        loader.className = "loader loader-default";
    });
});

// print pdf
const downloadPDF = document.querySelector(".download-pdf");

downloadPDF.addEventListener("click", (event) => {
    event.preventDefault();

    var w = document.querySelector("#print-content").offsetWidth;
    var h = document.querySelector("#print-content").offsetHeight;
    
    html2canvas(document.querySelector("#print-content"), {
        dpi: 300, // Set to 300 DPI
        scale: 3, // Adjusts your resolution
        
        onrendered: function(canvas) {
            var img = canvas.toDataURL("image/jpeg", 1);
            var doc = new jsPDF('L', 'px', [w, h]);

            doc.addImage(img, 'JPEG', 0, 0, w, h);
            doc.save('sample-file.pdf');
        }
    });
});

/*
$(document).ready(function(){

    //pdf 다운로드 	
    $(".download-pdf").click(function(){
        html2canvas(document.getElementById("print-content"), {
            onrendered: function(canvas) {
                
                var imgData = canvas.toDataURL('image/png');
                console.log('Report Image URL: '+imgData);
                var doc = new jsPDF('p', 'mm', [297, 210]); //210mm wide and 297mm high
                
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('sample.pdf');
            }
        });
    });
})
*/
