// setup the ui for the pending leave pass request
const setupLeavePassRequest = (data) => {
    data.forEach((leavePassRequest) => {
        console.log(leavePassRequest.id);

        let html = "";
        let counter = 0;

        db.collection("Users").doc(leavePassRequest.id).get().then((doc) => {
            counter++;

            setupRequesterProfile(doc.data());

            let  tr = `
                <tr>
                    <td class="number">${counter})</td>
                    <td class="photo"><img src="../../resources/img/avatar3.png" alt="student photo"></td>
                    <th>Marc Peejay Velasco Viernes</th>
                    <td>10 mins ago</td>
                    <td><a href="#">View Request</a></td>
                </tr>
            `;

            html += tr;


        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        /*
        <tr>
            <td class="number">1)</td>
            <td class="photo"><img src="../../resources/img/avatar3.png" alt="student photo"></td>
            <th>Marc Peejay Viernes</th>
            <td>10 mins ago</td>
            <td><a href="#">View Request</a></td>
        </tr>
        */
    })
};

// setup the requester's (student) profile
const setupRequesterProfile = (data) => {

};
