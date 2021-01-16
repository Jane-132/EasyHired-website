//validate search button
function validate(obj) {
    if (obj.value.length > 0) {
        document.getElementById("searchBtn").disabled = false;
    } else {
        document.getElementById("searchBtn").disabled = true;
    }
}

var count = 0;

//validate cateogry radio button
function checkButton() {
    if (document.getElementById('Freelancer').checked) {

        if (count >= 1) {
            $('#freelancerTable td').remove()
        }

        count++;
        displayFreeTable();
        searchFreelancer();
    }

    else if (document.getElementById('Services').checked) {

        if (count >= 1) {
            $('#freelancerTable td').remove()
        }

        count++;
        displayServTable();
        searchService();
    }

    else {
        window.alert("You must selected the category.");
    }
}

function searchFreelancer() {

    //firebase data retrieval function
    var search = document.getElementById("searchField").value;

    var database = firebase.database();
    //var userRef = database.ref('users/' + search);
    var userRef = database.ref('Users').child('Freelancers');

    // userRef.once('value').then(function (snapshot) {

    userRef.orderByChild('username').equalTo(search).on('value', function (snapshot) {


        if (snapshot.exists()) {
            var content = '';

            snapshot.forEach(function (userSnapshot) {

                //get data
                var flcID = userSnapshot.val().freelancerID;
                var flcUname = userSnapshot.val().username;
                var flcEmail = userSnapshot.val().email;
                var flcName = userSnapshot.val().fullName;
                var flcServices = userSnapshot.val().providedServices;
                var flcWorkHrs = userSnapshot.val().workingHours;


                content += '<tr>';
                content += '<td>' + flcName + '</td>';
                content += '<td>' + flcUname + '</td>';
                content += '<td>' + flcEmail + '</td>';
                content += '<td>' + flcServices + '</td>';
                content += '<td>' + flcWorkHrs + '</td>';
                content += '<td><button type="button" class=" btn btn-outline-primary profileBtn" style="width:80px; " onclick="return toProfilePage(\'' + flcID + '\')">View</button></td>';
                content += '</tr>';

                console.log(snapshot.val());

            });
            $('#freelancerTable').append(content);
        }

        else {
            window.alert("Freelancer not found.");
        }

    });
}


function viewProfile(flcID) {
    // Put the object into storage
    localStorage.setItem('objectToPass', flcID);
    window.location.href = "freelancerProfile.html";

}

function toProfilePage(flcID) {

    viewProfile(flcID);

}


function searchService() {

    //firebase data retrieval function
    var search1 = document.getElementById("searchField").value;
    
    //path of my data
    var database = firebase.database();
    // var userSearchRef = database.ref().child('users/');
    var userSearchRef = database.ref('Users').child('Freelancers');

    userSearchRef.orderByChild('providedServices').equalTo(search1).on('value', function (snapshot) {

        if (snapshot.exists()) {
            var content = '';

            snapshot.forEach(function (serviceSnapshot) {
                var flcID = serviceSnapshot.val().freelancerID;
                var flcUname = serviceSnapshot.val().username;
                var flcEmail = serviceSnapshot.val().email;
                var flcName = serviceSnapshot.val().fullName;
                var flcAbout = serviceSnapshot.val().about;
                var flcServices = serviceSnapshot.val().providedServices;

                console.log(snapshot.val());
                content += '<tr>';
                content += '<td>' + flcName + '</td>';
                content += '<td>' + flcUname + '</td>';
                content += '<td>' + flcEmail + '</td>';
                content += '<td>' + flcAbout + '</td>';
                content += '<td>' + flcServices + '</td>';
                content += '<td><button type="button" class=" btn btn-outline-primary profileBtn" style="width:80px; " onclick="return toProfilePage(\'' + flcID + '\')">View</button></td>';
                content += '</tr>';

            });

            $('#freelancerTable2').append(content);
        }
        else {
            window.alert(" Services not found.");
        }
    })

}
function displayServTable(){
   document.getElementById("FreelancerTable1").style.display="none";
   document.getElementById("ServiceTable1").style.display="block";
}
function displayFreeTable(){
    document.getElementById("ServiceTable1").style.display="none";
    document.getElementById("FreelancerTable1").style.display="block";
}