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
