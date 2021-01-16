var currCltPassword, currFlcPassword;
var currCltID, currFlcID;
var currFlcType;

var loggedINClient;
//Load favourite list from database
var content;
var size = 1;

//Display Favourite List
firebase.auth().onAuthStateChanged((user)=>{

	if(user){
		//User is signed in, obtain the signed in user Firebase Key
		var uid = user.uid;
		loggedINClient = uid;
		console.log("Logged in user in Profile: " + loggedINClient);
	}else{
		//user not sign in
	}

	var refFavour = firebase.database().ref('Favourite/').orderByChild('clientID').equalTo(loggedINClient);
    console.log("Logged in CLient: " + loggedINClient);
    //Create favourite list
    refFavour.once('value',function(snapshot)
    {
        snapshot.forEach(function(itemSnapshot)
        {
			var favouriteVal = itemSnapshot.val();
			var favouriteID =favouriteVal.favouriteID;
			var selectedName = favouriteVal.selectedName;
			var jobName = favouriteVal.jobName;
		    content += '<tr id="' + "row-" + size + '">';
            content += '<td><span class="sn">'+ size +'</span>.</td>';
            content += '<td><a href="#"><img src="../images/avatar.png" alt="website template image" width="50rem"></a></td>';
            content += '<td id = "freelancer" favour-ID="' + favouriteID + '">' + selectedName + '</td>';
            content += '<td id="details">' + jobName + '</td>';
            content += '<td><a class="btn btn-xs delete-record" data-id="' + size + '"><i class="fa fa-trash-o"></i></a></td>';
            content += '</tr>';

            size++;
        })
        $('#tableBody').append(content);
	})
	
	//Remove from favourite list
    jQuery(document).delegate('a.delete-record', 'click', function(e) {
        e.preventDefault();    
        var didConfirm = confirm("Remove from favourite list?");
        if (didConfirm == true) {

            var id = jQuery(this).attr('data-id');
            var targetDiv = jQuery(this).attr('targetDiv');
            
            var $testingrow = $(this).closest('tr');
            var $testingCol = $testingrow.find('td');
            $testingCol.addClass('row-highlight');
            jQuery.each($testingCol, function(i,item){
                if(i===2)
                {
                    //get the id of freelancer to be removed from database
                    var test_id = $(this).attr('favour-id');
                    var key;
                    var dataRef = firebase.database().ref('Favourite/').orderByChild('favouriteID').equalTo(test_id);
                    dataRef.once('value',function(snapshot){
                        key = Object.keys(snapshot.val())[0]; //Get the key of selected child
                        var ref = firebase.database().ref('Favourite/').child(key); 
                        ref.remove(); //remove the child
                    })
                }
            });
            jQuery('#row-' + id).remove();
        
            //regnerate index number on table
            $('#tableBody tr').each(function(index){
                $(this).find('span.sn').html(index+1);
            });
            return true;
        } else {
            return false;
        }
    });

});

// >>>>>>>>>> Logout Function <<<<<<<<<<
function logout(){
    //   User is signed in.

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
		swal({
            type: 'success',
            title: 'Successfully Logout.', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("../index.html");
            }, 1000)
        });

    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: errorMessage,
        })
    });
	
}
// >>>>>>>>>> Client Profile Page (cPage.html) <<<<<<<<<<
// ======== After logged in, Get data from server and display in the page ======== 
function displayClientProfile(){
	firebase.auth().onAuthStateChanged((user)=>{
		if (user) {
		//   User is signed in.
			let user = firebase.auth().currentUser;
			let uid;
			if(user != null){
				uid = user.uid;
			}
				let firebaseRefKey = firebase.database().ref('Users').child('Clients').child(uid);
				firebaseRefKey.on('value', (dataSnapShot)=>{
					document.getElementById("clientUname").innerHTML = dataSnapShot.val().username;
					document.getElementById("clientEmail").innerHTML = dataSnapShot.val().email;
					document.getElementById("accType").innerHTML = dataSnapShot.val().accountType;
					document.getElementById("clientName").innerHTML = dataSnapShot.val().fullName;
					document.getElementById("clientPassportIC").innerHTML = dataSnapShot.val().passportIC;
					document.getElementById("clientAbout").innerHTML = dataSnapShot.val().about;
					document.getElementById("clientPhone").innerHTML = dataSnapShot.val().phoneNo;
					document.getElementById("clientAddress").innerHTML = dataSnapShot.val().address;
					currCltPassword = dataSnapShot.val().password;
					currCltID = dataSnapShot.val().clientID;
				})
		} else {
		//   No user is signed in.
		}
	});
}

// >>>>>>>>>>Client Profile Page <<<<<<<<<< 
// ========== Show Edit Client Profile Form with Current User Information ==========
function showEdit(){
	document.getElementById("editProfileSec").style.display = "block";
	document.getElementById("showCltProfile").style.display = "none";

	var currCltUsername = document.getElementById("clientUname").innerHTML;
	var currCltEmail = document.getElementById("clientEmail").innerHTML;
	var currCltAccType = document.getElementById("accType").innerHTML;
	var currCltFullName= document.getElementById("clientName").innerHTML;
	var currCltPassportIC = document.getElementById("clientPassportIC").innerHTML;
    var currCltAbt = document.getElementById("clientAbout").innerHTML;
    var currCltPhone = document.getElementById("clientPhone").innerHTML;
    var currCltAddress = document.getElementById("clientAddress").innerHTML;
	document.getElementById("clientUname2").innerHTML = currCltUsername; 
	document.getElementById("clientEmail2").innerHTML = currCltEmail; 
	document.getElementById("accType2").innerHTML = currCltAccType;	
	document.getElementById("clientName2").innerHTML = currCltFullName; 
    document.getElementById("clientPassportIC2").innerHTML = currCltPassportIC; 
	document.getElementById("clientAbout2").innerHTML = currCltAbt; 
	document.getElementById("clientPhone2").innerHTML = currCltPhone; 
	document.getElementById("clientAddress2").innerHTML = currCltAddress; 
}
// ========== Edit Client Profile Section ==========
// ---------- Full Name Validation ---------- 
function checkFullName(){
    var fullName = document.getElementById("clientNewName").value;
	var check = false;
    if(fullName === ""){
        check = true;
    }
    if(check){
        document.getElementById("fullNameErrorMsg").style.display = "block";
    }else{
        document.getElementById("fullNameErrorMsg").style.display = "none";
    }
}
// ---------- PassportIC Validation ---------- 
function checkPassportIC(){
    var passportIC = document.getElementById("clientNewPassportIC").value;
	var check = false;
    if(passportIC === ""){
        check = true;
    }
    if(check){
        document.getElementById("passportICErrorMsg").style.display = "block";
    }else{
        document.getElementById("passportICErrorMsg").style.display = "none";
    }
}
// ---------- About Validation ---------- 
function checkAbout(){
    var about = document.getElementById("clientNewAbout").value;
	var check = false;
    if(about === ""){
        check = true;
    }
    if(check){
        document.getElementById("aboutErrorMsg").style.display = "block";
    }else{
        document.getElementById("aboutErrorMsg").style.display = "none";
    }
}
// ---------- PhoneNo Validation ---------- 
function checkPhone(){
    var phoneNo = document.getElementById("clientNewPhone").value;
	var check = false;
    if(phoneNo === ""){
        check = true;
    }
    if(check){
        document.getElementById("phoneErrorMsg").style.display = "block";
    }else{
        document.getElementById("phoneErrorMsg").style.display = "none";
    }
}
// ---------- Address Validation ---------- 
function checkAddress(){
    var address = document.getElementById("clientNewAddress").value;
	var check = false;
    if(address === ""){
        check = true;
    }
    if(check){
        document.getElementById("addressErrorMsg").style.display = "block";
    }else{
        document.getElementById("addressErrorMsg").style.display = "none";
    }
}
// ========== Save updated profile into database ==========
function saveUpdateCltProfile(){
    var username = document.getElementById("clientUname").innerHTML;
    var email = document.getElementById("clientEmail").innerHTML;
	var accType = document.getElementById("accType").innerHTML;
	let clientNewFullName = document.getElementById("clientNewName").value ;
    let clientNewPassportIC = document.getElementById("clientNewPassportIC").value ;
    let clientNewAbt = document.getElementById("clientNewAbout").value ;
    let clientNewPhone = document.getElementById("clientNewPhone").value ;
    let clientNewAddress = document.getElementById("clientNewAddress").value ;
    var fullNameFormat = /^([A-Za-z.\s_-])/; 
    var checkNewFullNameValid = clientNewFullName.match(fullNameFormat);
    
	if(checkNewFullNameValid == null){
        return checkFullName();
    }else if(clientNewPassportIC === ""){
        return checkPassportIC();
    }else if(clientNewAbt === ""){
        return checkAbout();
    }else if(clientNewPhone === ""){
        return checkPhone();
    }else if(clientNewAddress === ""){
        return checkAddress();
    }else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref("Users");
        var userData = {
			clientID: currCltID,
			username: username,
			email: email,
			password: currCltPassword,
			fullName: clientNewFullName,
			passportIC: clientNewPassportIC,
			about: clientNewAbt,
			phoneNo: clientNewPhone,
			address: clientNewAddress,
			accountType: accType,
        }
		firebaseRef.child("Clients").child(uid).set(userData);
        swal({
            type: 'success',
            title: 'Profile is Updated successfully.',
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("showCltProfile").style.display = "block";

                document.getElementById("editProfileSec").style.display = "none";
            }, 1000)
        }).catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			swal({
				type: 'error',
				title: 'Error',
				text: "Error",
			})
		});
    }
}
// ========== Hide Edit Client Profile Form ==========
function cancelUpdate(){
	document.getElementById("editProfileSec").style.display = "none";
	document.getElementById("showCltProfile").style.display = "block";
	
}

// >>>>>>>>>> Freelancer Page (freePage.html) <<<<<<<<<<
// ======== After logged in, Get data from server and display in the page ======== 
function displayFreelancerProfile(){
	firebase.auth().onAuthStateChanged((user)=>{
		if (user) {
		//   User is signed in.
			let user = firebase.auth().currentUser;
			let uid;
			if(user != null){
				uid = user.uid;
			}
			
				let firebaseRefKey = firebase.database().ref('Users').child('Freelancers').child(uid);
				
				firebaseRefKey.on('value', (dataSnapShot)=>{
					document.getElementById("flcUname1").innerHTML = dataSnapShot.val().username;
					document.getElementById("flcUname").innerHTML = dataSnapShot.val().username;
					document.getElementById("flcEmail").innerHTML = dataSnapShot.val().email;
					currFlcPassword = dataSnapShot.val().password;
					currFlcID = dataSnapShot.val().freelancerID;
					document.getElementById("accType").innerHTML = dataSnapShot.val().accountType;
					document.getElementById("flcName").innerHTML = dataSnapShot.val().fullName;
					document.getElementById("flcPassportIC").innerHTML = dataSnapShot.val().passportIC;
					document.getElementById("flcAbout").innerHTML = dataSnapShot.val().about;
					document.getElementById("flcPhone").innerHTML = dataSnapShot.val().phoneNo;
					document.getElementById("flcAddress").innerHTML = dataSnapShot.val().address;
					document.getElementById("flcAcaQualification").innerHTML = dataSnapShot.val().academicQualification;
					document.getElementById("flcProf").innerHTML = dataSnapShot.val().professional;
					document.getElementById("flcType").innerHTML = dataSnapShot.val().freelancerType;
					document.getElementById("flcServices").innerHTML = dataSnapShot.val().providedServices;
					document.getElementById("ServicesDescription").innerHTML = dataSnapShot.val().servicesDescription;
					document.getElementById("flcWorkHrs").innerHTML = dataSnapShot.val().workingHours;
					currFlcType = dataSnapShot.val().freelancerType;
					if(currFlcType === "Individual"){
						document.getElementById("companyType").style.display = "none";
						document.getElementById("companyType1").style.display = "none";
						document.getElementById("companyType2").style.display = "none";
					}else{
						//display the company name, comapany registered no and company description if the freelancer is company type.
						document.getElementById("companyType").style.display = "block";
						document.getElementById("companyType1").style.display = "block";
						document.getElementById("companyType2").style.display = "block";
						document.getElementById("flcCompName").innerHTML = dataSnapShot.val().companyName;
						document.getElementById("flcCompRegNo").innerHTML = dataSnapShot.val().companyRegistrationNo;
						document.getElementById("flcCompDescp").innerHTML = dataSnapShot.val().companyDescription;
					}
				})
			
		} else {
		//   No user is signed in.
		}
	});
}
// ========== Display the option "Other:" text field of Academic Qualification ==========
function checkNewAca(option) {
	// use one of possible conditions
	// if (option.value == 'Other')
	if (option.selectedIndex === 9) {
		document.getElementById("OtherNewOpt").style.display = 'block';
	} else {
		document.getElementById("OtherNewOpt").style.display = 'none';
	}
}
// ========== Show Edit Freelancer Profile Form with Current User Information ==========
function showEdit2(){
	document.getElementById("editProfileSec2").style.display = "block";
	document.getElementById("showflcProfile").style.display = "none";
	
	var currFlcUsername = document.getElementById("flcUname").innerHTML;
	var currFlcEmail = document.getElementById("flcEmail").innerHTML;
	var currFlcAccType = document.getElementById("accType").innerHTML;
	var currFlcFullName= document.getElementById("flcName").innerHTML;
	var currFlcPassportIC = document.getElementById("flcPassportIC").innerHTML;
    var currFlcPhone = document.getElementById("flcPhone").innerHTML;
    var currFlcAddress = document.getElementById("flcAddress").innerHTML;
    var currFlcAbt = document.getElementById("flcAbout").innerHTML;
	var currFlcAcaQuali = document.getElementById("flcAcaQualification").innerHTML;
    var currFlcProf = document.getElementById("flcProf").innerHTML;
	var currFlcServices = document.getElementById("flcServices").innerHTML;
	var currFlcSevDescp = document.getElementById("ServicesDescription").innerHTML;
	var currFlcWorkHrs = document.getElementById("flcWorkHrs").innerHTML;
    
	document.getElementById("flcUname2").innerHTML = currFlcUsername; 
	document.getElementById("flcEmail2").innerHTML = currFlcEmail; 
	document.getElementById("accType2").innerHTML = currFlcAccType;
	document.getElementById("flcType2").innerHTML = currFlcType;
	document.getElementById("flcName2").innerHTML = currFlcFullName; 
    document.getElementById("flcPassportIC2").innerHTML = currFlcPassportIC; 
	document.getElementById("flcPhone2").innerHTML = currFlcPhone; 
	document.getElementById("flcAddress2").innerHTML = currFlcAddress; 
	document.getElementById("flcAbout2").innerHTML = currFlcAbt;
	document.getElementById("flcAcaQualification2").innerHTML = currFlcAcaQuali;
	document.getElementById("flcProf2").innerHTML = currFlcProf;
	document.getElementById("flcServices2").innerHTML = currFlcServices;
	document.getElementById("flcServicesDescp2").innerHTML = currFlcSevDescp;
	document.getElementById("flcWorkHrs2").innerHTML = currFlcWorkHrs;
	if (currFlcType === "Individual"){
		document.getElementById("flcCompTypelabel").style.display = "none";
		document.getElementById("flcCompType2").style.display = "none";
	}else{
		var currFlcCompName = document.getElementById("flcCompName").innerHTML;
		document.getElementById("flcCompType2").innerHTML = currFlcCompName;
		document.getElementById("flcCompTypelabel").style.display = "inline";
		document.getElementById("flcCompType2").style.display = "inline";
	}	
}

// ========== Edit Freelancer Profile Page Section==========
// ---------- Full Name Validation ---------- 
function checkFullName1(){
    var fullName = document.getElementById("flcNewName").value;
	var check1 = false;
    if(fullName === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("fullNameErrorMsg1").style.display = "block";
    }else{
        document.getElementById("fullNameErrorMsg1").style.display = "none";
    }
}
// ---------- PassportIC Validation ---------- 
function checkPassportIC1(){
    var passportIC = document.getElementById("flcNewPassportIC").value;
	var check1 = false;
    if(passportIC === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("passportICErrorMsg1").style.display = "block";
    }else{
        document.getElementById("passportICErrorMsg1").style.display = "none";
    }
}
// ---------- PhoneNo Validation ---------- 
function checkPhone1(){
    var phoneNo = document.getElementById("flcNewPhone").value;
	var check1 = false;
    if(phoneNo === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("phoneErrorMsg1").style.display = "block";
    }else{
        document.getElementById("phoneErrorMsg1").style.display = "none";
    }
}
// ---------- Address Validation ---------- 
function checkAddress1(){
    var address = document.getElementById("flcNewAddress").value;
	var check1 = false;
    if(address === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("addressErrorMsg1").style.display = "block";
    }else{
        document.getElementById("addressErrorMsg1").style.display = "none";
    }
}
// ---------- About Validation ---------- 
function checkAbout1(){
    var about = document.getElementById("flcNewAbout").value;
	var check1 = false;
    if(about === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("aboutErrorMsg1").style.display = "block";
    }else{
        document.getElementById("aboutErrorMsg1").style.display = "none";
    }
}
// ---------- Academic Qualification Validation ---------- 
function checkAcaQuali(){
    var acaQuali = document.getElementById("flcNewAcaQualification").value;
	var check1 ;
    if(acaQuali == 0){
        check1 = true;
    }else{
		check1 = false;
	}
    if(check1){
        document.getElementById("acaQualiErrorMsg").style.display = "block";
    }else{
        document.getElementById("acaQualiErrorMsg").style.display = "none";
    }
}
// ---------- Other Academic Qualification Validation ---------- 
function checkOthAcaQuali(){
    var othAcaQuali = document.getElementById("OtherNewAcaQualiOpt").value;
	var check1 = false ;
    if(othAcaQuali === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("otherAcaQualiErrorMsg").style.display = "block";
    }else{
        document.getElementById("otherAcaQualiErrorMsg").style.display = "none";
    }
}
// ---------- Professional/Specfication Validation ---------- 
function checkProf(){
    var profSpec = document.getElementById("flcNewProf").value;
	var check1 = false ;
    if(profSpec === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("profErrorMsg").style.display = "block";
    }else{
        document.getElementById("profErrorMsg").style.display = "none";
    }
}
// ---------- Provided Services Validation ---------- 
function checkServices(){
    var provServices = document.getElementById("flcNewServices").value;
	var check1 = false ;
    if(provServices === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("provServicesErrorMsg").style.display = "block";
    }else{
        document.getElementById("provServicesErrorMsg").style.display = "none";
    }
}
// ---------- Services Description Validation ---------- 
function checkSevDescp(){
    var sevDescp = document.getElementById("flcNewServicesDescp").value;
	var check1 = false ;
    if(sevDescp === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("sevDescpErrorMsg").style.display = "block";
    }else{
        document.getElementById("sevDescpErrorMsg").style.display = "none";
    }
}
// ---------- Working Hours Validation ---------- 
function checkWorkHrs(){
    var workHrs = document.getElementById("flcNewWorkHrs").value;
	var check1 = false ;
    if(workHrs === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("workHrsErrorMsg").style.display = "block";
    }else{
        document.getElementById("workHrsErrorMsg").style.display = "none";
    }
}
// ========== Save updated profile into database ==========
function saveUpdateFlcProfile(){
    var username = document.getElementById("flcUname").innerHTML;
    var email = document.getElementById("flcEmail").innerHTML;
	var accType = document.getElementById("accType").innerHTML;
	var compName = document.getElementById("flcCompName").innerHTML;
	var compRegNo = document.getElementById("flcCompRegNo").innerHTML;
	var compDescrip = document.getElementById("flcCompDescp").innerHTML;
	
	let freelancerNewFullName = document.getElementById("flcNewName").value ;
    let freelancerNewPassportIC = document.getElementById("flcNewPassportIC").value ;
    let freelancerNewPhone = document.getElementById("flcNewPhone").value ;
    let freelancerNewAddress = document.getElementById("flcNewAddress").value ;
	let freelancerNewAbt = document.getElementById("flcNewAbout").value ;
	var freelancerNewAcaQualiOptValue = document.getElementById("flcNewAcaQualification").value;	
	let freelancerNewAcaQualiOpt = document.getElementById("flcNewAcaQualification");
	let freelancerNewAcaQuali = freelancerNewAcaQualiOpt.options[freelancerNewAcaQualiOpt.selectedIndex].text; //get academic qualification
	let freelancerNewAcaOtherAcaQuali = document.getElementById("OtherNewAcaQualiOpt").value;
	let freelancerNewProfessional = document.getElementById("flcNewProf").value;
	let freelancerNewProvServices = document.getElementById("flcNewServices").value;
	let freelancerNewServicesDescrip = document.getElementById("flcNewServicesDescp").value;
	let freelancerNewWorkHrs = document.getElementById("flcNewWorkHrs").value;
	
    var fullNameFormat = /^([A-Za-z.\s_-])/; 
    var checkNewFullNameValid = freelancerNewFullName.match(fullNameFormat);
    
	if(checkNewFullNameValid == null){
        return checkFullName1();
    }else if(freelancerNewPassportIC === ""){
        return checkPassportIC1();
    }else if(freelancerNewPhone === ""){
        return checkPhone1();
    }else if(freelancerNewAddress === ""){
        return checkAddress1();
    }else if(freelancerNewAbt === ""){
        return checkAbout1();
    }else if(freelancerNewAcaQualiOptValue === 0){
        return checkAcaQuali();
    }else if(freelancerNewAcaQualiOptValue === 9 && freelancerNewAcaOtherAcaQuali === ""){
        return checkOthAcaQuali();
    }else if(freelancerNewProfessional === ""){
        return checkProf();
    }else if(freelancerNewProvServices === ""){
        return checkServices();
    }else if(freelancerNewServicesDescrip === ""){
        return checkSevDescp();
    }else if(freelancerNewWorkHrs === ""){
		return checkWorkHrs();
	}else{
		if(currFlcType == "Individual"){
			// if users choose 'other' option for academic qualification to update
			if (freelancerNewAcaQualiOptValue == 9 ){
				let user = firebase.auth().currentUser;
				let uid;
				if(user != null){
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: currFlcID,
					username: username,
					email: email,
					password: currFlcPassword,
					fullName: freelancerNewFullName,
					passportIC: freelancerNewPassportIC,
					phoneNo: freelancerNewPhone,
					address: freelancerNewAddress,
					about: freelancerNewAbt,
					academicQualification: freelancerNewAcaOtherAcaQuali, // save the user input other Academic Qualification 
					professional : freelancerNewProfessional,
					freelancerType: currFlcType,
					providedServices: freelancerNewProvServices,
					servicesDescription: freelancerNewServicesDescrip,
					workingHours: freelancerNewWorkHrs,
					accountType: accType,
				}
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal({
					type: 'success',
					title: 'Profile is Updated successfully.',
				}).then((value) => {
					setTimeout(function(){
						document.getElementById("showflcProfile").style.display = "block";

						document.getElementById("editProfileSec2").style.display = "none";
					}, 1000)
				}).catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					swal({
						type: 'error',
						title: 'Error',
						text: "Error",
					})
				});
			}
			else{
				// if users don't choose 'other' option for academic qualification to update
				let user = firebase.auth().currentUser;
				let uid;
				if(user != null){
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: currFlcID,
					username: username,
					email: email,
					password: currFlcPassword,
					fullName: freelancerNewFullName,
					passportIC: freelancerNewPassportIC,
					phoneNo: freelancerNewPhone,
					address: freelancerNewAddress,
					about: freelancerNewAbt,
					academicQualification: freelancerNewAcaQuali, // save the predefined Academic Qualification choice
					professional : freelancerNewProfessional,
					freelancerType: currFlcType,
					providedServices: freelancerNewProvServices,
					servicesDescription: freelancerNewServicesDescrip,
					workingHours: freelancerNewWorkHrs,
					accountType: accType,
				}
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal({
					type: 'success',
					title: 'Profile is Updated successfully.',
				}).then((value) => {
					setTimeout(function(){
						document.getElementById("showflcProfile").style.display = "block";

						document.getElementById("editProfileSec2").style.display = "none";
					}, 1000)
				}).catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					swal({
						type: 'error',
						title: 'Error',
						text: "Error",
					})
				});
			}
		}else{
			// if users choose 'other' option for academic qualification to update
			 if(freelancerNewAcaQualiOptValue == 9 ){
				let user = firebase.auth().currentUser;
				let uid;
				if(user != null){
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: currFlcID,
					username: username,
					email: email,
					password: currFlcPassword,
					fullName: freelancerNewFullName,
					passportIC: freelancerNewPassportIC,
					phoneNo: freelancerNewPhone,
					address: freelancerNewAddress,
					about: freelancerNewAbt,
					academicQualification: freelancerNewAcaOtherAcaQuali, // save the user input other Academic Qualification 
					professional : freelancerNewProfessional,
					freelancerType: currFlcType,
					companyName: compName,
					companyRegistrationNo: compRegNo,
					companyDescription: compDescrip,
					providedServices: freelancerNewProvServices,
					servicesDescription: freelancerNewServicesDescrip,
					workingHours: freelancerNewWorkHrs,
					accountType: accType,
				}
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal({
					type: 'success',
					title: 'Profile is Updated successfully.',
				}).then((value) => {
					setTimeout(function(){
						document.getElementById("showflcProfile").style.display = "block";

						document.getElementById("editProfileSec2").style.display = "none";
					}, 1000)
				}).catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					swal({
						type: 'error',
						title: 'Error',
						text: "Error",
					})
				});
			}else{
				// if users don't choose 'other' option for academic qualification to update
				let user = firebase.auth().currentUser;
				let uid;
				if(user != null){
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: currFlcID,
					username: username,
					email: email,
					password: currFlcPassword,
					fullName: freelancerNewFullName,
					passportIC: freelancerNewPassportIC,
					phoneNo: freelancerNewPhone,
					address: freelancerNewAddress,
					about: freelancerNewAbt,
					academicQualification: freelancerNewAcaQuali, // save the predefined Academic Qualification choice
					professional : freelancerNewProfessional,
					freelancerType: currFlcType,
					companyName: compName,
					companyRegistrationNo: compRegNo,
					companyDescription: compDescrip,
					providedServices: freelancerNewProvServices,
					servicesDescription: freelancerNewServicesDescrip,
					workingHours: freelancerNewWorkHrs,
					accountType: accType,
				}
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal({
					type: 'success',
					title: 'Profile is Updated successfully.',
				}).then((value) => {
					setTimeout(function(){
						document.getElementById("showflcProfile").style.display = "block";

						document.getElementById("editProfileSec2").style.display = "none";
					}, 1000)
				}).catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					swal({
						type: 'error',
						title: 'Error',
						text: "Error",
					})
				});
			}
		}
		
		
		
        
    }
}
// ========== Hide Edit Freelancer Profile Page Form ==========
function cancelUpdate2(){
	document.getElementById("editProfileSec2").style.display = "none";
	document.getElementById("showflcProfile").style.display = "block";
}

