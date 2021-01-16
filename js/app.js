var retrievedObject;

//******************* COMMENTS AND RATINGS *********************************//

var starRatings = 0;
var onComplete = function (error) {
    if (error) {
        console.log('Operation failed');
    } else {
        console.log(' Operation completed');
    }
};
function IDGenerator() {

    this.length = 8;
    this.timestamp = +new Date;

    var _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.generate = function () {
        var ts = this.timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < this.length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    }
}

function saveComments() {

    const commentsRef = firebase.database();

    var viewedFreelancer = retrievedObject;
    var commentedUser;
    var commentedUserID;

    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            //User is signed in
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
                commentedUserID = uid;
            }
            
            //Validate the commented freelancer's ID
            var selectedFreelancer = retrievedObject;
            var freeDataRef = firebase.database().ref('Users').child('Freelancers').orderByChild('freelancerID');
            var freelancerRef = freeDataRef.equalTo(selectedFreelancer); //State specific freelancerID
            freelancerRef.on('value', (dataSnapShot)=>{
                //Extract Freelancer details according to specific freelancerID
                dataSnapShot.forEach(function(data) {
                    /*The loop will not get execute if the received ID have problems*/
                    viewedFreelancer = data.val().freelancerID;
                });
            })

            //Retrieve User Name from database
            let firebaseRefKey = firebase.database().ref('Users/').child('Clients').child(uid);
            //Save to database
            var newComments = document.getElementById('commentText').value.replace(/\n/g, "<br>");
            var newPostRef = commentsRef.ref('Comments'); //Child for comments
            if (newComments != "") {

                firebaseRefKey.on('value', (userdataSnapShot) => {
                    commentedUser = userdataSnapShot.val().fullName;

                    newPostRef.push({
                        userID: commentedUserID, //testing
                        name: commentedUser,
                        comment: newComments,
                        freelancerID: viewedFreelancer,
                        star: starRatings,
                        when: firebase.database.ServerValue.TIMESTAMP
                    }).then(() => {
                        
                        window.location.reload();
                    });
                })
            }
            else {
                document.getElementById("commentTextError").style.display = "block";
            }
            document.getElementById("star5").checked = false;
        }
        else {
            //No user is signed in
           
        }
    });
}

function displayComments(getRetrieved) {
    
    //display posted comments
    var commentOf;
    var displayItems = document.getElementById('postedcomments');
    var commentsRef;
    var sumOfRatings = 0;
    var numOfComments = 0;
    var starPercentageRoundedSUM;

    //Validate the commented freelancer's ID
    var selectedFreelancer = getRetrieved;
    var freeDataRef = firebase.database().ref('Users').child('Freelancers').orderByChild('freelancerID');
    var freelancerRef = freeDataRef.equalTo(selectedFreelancer); //State specific freelancerID
    freelancerRef.on('value', (dataSnapShot)=>{
        //Extract Freelancer details according to specific freelancerID
        dataSnapShot.forEach(function(data) {
            commentOf = data.val().freelancerID;
            commentsRef = firebase.database().ref('Comments/').orderByChild('freelancerID').equalTo(commentOf);

            //Retrieve from comments section in database
            commentsRef.once('value', function (snapshot) {
                // total number of stars
                const starTotal = 5;
                snapshot.forEach(function (itemSnapshot) {
                    var valueOfStars = 0;
                    var commentItemData = itemSnapshot.val();
                    var comment = commentItemData.comment;
                    var starValue = commentItemData.star;
                    var name = commentItemData.name;
                    var when = new Date(commentItemData.when).toLocaleDateString("en-us");

                    const starPercentage = (parseFloat(starValue) / starTotal) * 100;
                    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
                    valueOfStars = starPercentageRounded;

                    displayItems.innerHTML += '<div class = "comments_card"><li>'
                        + '<span>' + name + ' (' + when + ') '
                        + '</span>' + '<div class = "stars-outer">'
                        + '<div class = "stars-inner" style = "width:' + valueOfStars + '"></div></div>' + ' ' + starValue
                        + '<br>'
                        + comment + '</li></div><br>';

                    sumOfRatings += parseFloat(starValue);
                    numOfComments++;
                })
                var totalRatings = (sumOfRatings / numOfComments);
                if (totalRatings >= 0.0) {
                    const starPercentageSUM = (totalRatings / starTotal) * 100;
                    starPercentageRoundedSUM = `${(Math.round(starPercentageSUM / 10) * 10)}%`;
                    document.querySelector(`.user_ratings .stars-inner`).style.width = starPercentageRoundedSUM;
                    document.getElementById("userRatingVal").innerHTML = totalRatings.toFixed(2);
                    document.getElementById("numRatings").innerHTML = numOfComments;
                }
            })
        });
    })
}

//Change star rating value and display on realtime
let star = document.querySelectorAll('input[type="radio"]');
var showValue = document.getElementById('rating-value');

for (let j = 0; j < star.length; j++) {
    star[j].addEventListener('click', function () {
        j = this.value;
        starRatings = j; //global starRatings will update in function saveComments
        showValue.innerHTML = starRatings + " out of 5";
    });
}

function checkFreelancerInFavourite(favourite){
    //Get the viewed freelancer
    //Get the user ID
    //Check the favourite list
    var currUserID;
    var viewed;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //User is signed in
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
                currUserID = uid;
            }

            //Get the current viewed freelancer's ID
            var selectedFreelancer = favourite;
            var freeDataRef = firebase.database().ref('Users').child('Freelancers').orderByChild('freelancerID');
            var freelancerRef = freeDataRef.equalTo(selectedFreelancer); //State specific freelancerID
            freelancerRef.on('value', (dataSnapShot)=>{
                //Extract Freelancer details according to specific freelancerID
                dataSnapShot.forEach(function(data) {
                    viewed = data.val().freelancerID;

                    //Check whether the current viewed freelancer was added in favourite list
                    //by the signed in user
                    var favourFreelanceRef = firebase.database().ref('Favourite/').orderByChild('selectedID').equalTo(viewed);
                    favourFreelanceRef.on('value', (snapShot)=>{
                        snapShot.forEach(function(dataU) {
                            var currentUser = dataU.val().clientID;

                            if(currentUser === currUserID)
                            {
                                //If the signed in user added the freelancer in favourite list before
                                //Disable the add to favourite button
                                $("#addFavourite").prop("disabled",true);
                                $("#addFavourite").html("Added in favourite");
                            }
                        });
                    })
                })
            })

        }else {
            //No user is signed in
           
        }
    });
}


// //******************** DISPLAY FREELANCER PROFILE UPON SEARCH ****************/

function displayFreelancerForUser(){
    
    // Retrieve the searched freelancerID from storage
    retrievedObject = localStorage.getItem('objectToPass');

    checkFreelancerInFavourite(retrievedObject);
    displayComments(retrievedObject);

    //path of my data
    var database = firebase.database();
    var userSearchRef = database.ref('Users').child('Freelancers');

    userSearchRef.orderByChild('freelancerID').equalTo(retrievedObject).on('value', function (snapshot) {

        snapshot.forEach(function (profileSnapshot) {

            var flcUname = profileSnapshot.val().username;
            var flcEmail = profileSnapshot.val().email;
            var flcPhone = profileSnapshot.val().phoneNo;
            var flcAbout = profileSnapshot.val().about;
            var flcServices = profileSnapshot.val().providedServices;
            var flcServiceDescrip = profileSnapshot.val().servicesDescription;
            var flcProf = profileSnapshot.val().professional;

            //show data in HTML
            document.getElementById("flcUname").innerHTML = flcUname;
            document.getElementById("flcEmail").innerHTML = flcEmail;
            document.getElementById("flcPhone").innerHTML = flcPhone;
            document.getElementById("flcAbout").innerHTML = flcAbout;
            document.getElementById("flcService").innerHTML = flcServices;
            document.getElementById("flcServiceDescrip").innerHTML = flcServiceDescrip;
            document.getElementById("flcProf").innerHTML = flcProf;
        });

    });

}

document.addEventListener( "DOMContentLoaded", function() {

    //Btn add to favourite
    var btnFavour = document.querySelector( "#addFavourite" )
    btnFavour.addEventListener( "click", function() {

        var dbRef = firebase.database();
        var currUserID;
        var freelanceUserName;
        var freelanceJob;
        var freeID;
        //Assume the selected freelancer is the 1st freelancer
        //Assume current log in user is userNO2
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //User is signed in
                var user = firebase.auth().currentUser;
                var uid;
                if (user != null) {
                    uid = user.uid;
                    currUserID = uid;
                }

                //Get the current viewed freelancer's ID
                var selectedFreelancer = retrievedObject;
                var freeDataRef = dbRef.ref('Users').child('Freelancers').orderByChild('freelancerID');
                var freelancerRef = freeDataRef.equalTo(selectedFreelancer); //State specific freelancerID
                freelancerRef.on('value', (favourSnapShot)=>{
                    //Extract Freelancer details according to specific freelancerID
                    favourSnapShot.forEach(function(data) {
                        freeID = data.val().freelancerID;
                        freelanceUserName = data.val().username;
                        freelanceJob = data.val().providedServices;

                        //Save to database
                        var userDataRef = dbRef.ref('Favourite');
                        var generator = new IDGenerator();
                        userDataRef.push({
                            favouriteID: "favour" + generator.generate(),
                            selectedID: freeID,
                            clientID: currUserID,
                            jobName: freelanceJob,
                            selectedName: freelanceUserName
                        }, onComplete);
                    });
                })
            }
        });    
    }, false);
    
});