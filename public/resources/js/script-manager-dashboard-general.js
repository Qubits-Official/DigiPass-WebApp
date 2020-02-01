// setup the ui for the pending leave pass request
const setupLeavePassRequest = (data, serverTimeStamp) => {
    let pendingRequest = document.querySelector(".pending-request");
    let counter = 0;
    let html = `
        <col>
        <col width="1px">
        <tr class="default">
            <th><i class="ion-ios-grid"></i></th>
            <th><i class="ion-ios-image"></i>Photo</th>
            <th><i class="ion-ios-person"></i>Student's Name</th>
            <th><i class="ion-ios-timer"></i>Time</th>
            <th><i class="ion-ios-arrow-dropright"></i>Action</th>
        </tr>
        <tr><th colspan="5"><div class="line-boundary"></div></th></tr>
    `;

    data.forEach((leavePassRequest) => {
        counter++;

        let  tr = `
            <tr>
                <td class="number">${counter})</td>
                <td class="photo"><img src="../../resources/img/avatar3.png" alt="student photo"></td>
                <th>${leavePassRequest.data()["Full Name"]}</th>
                <td>${getRequestTime(leavePassRequest.data(), serverTimeStamp)} mins ago</td>
                <td>
                    <a class="view-request"
                    href="file:///C:/Users/Qubits/VSCodeProjects/DigiPass/public/pages/others/leave-pass-confirmation.html?uid=${leavePassRequest.id}">
                        View Request
                    </a>
                </td>
            </tr>
        `;

        html += tr;

        pendingRequest.innerHTML = html;
    })
};

const getRequestTime = (data, serverTimeStamp) => {
    let firestoreTimeStamp = data["Time Stamp"]["seconds"];
    let requestTime = ((serverTimeStamp - firestoreTimeStamp) / 60) - 480;

    return Math.round(requestTime);
}