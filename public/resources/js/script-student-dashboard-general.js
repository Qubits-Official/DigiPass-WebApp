// setup student's dashboard profile data
const setupStudentProfile = (data) => {
    fullName = data["First Name"] + " " + data["Middle Name"] + " " + data["Last Name"];

    let valueContainer = document.querySelectorAll(".value");

    valueContainer.forEach((valueContainer) => {
        valueContainer.textContent = data[valueContainer.id];
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

// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2);
};

// generateId :: Integer -> String
function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
};

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
