

// >>>>>>>>>> Generate ClientID and FreelancerID Function <<<<<<<<<<
function IDGenerator() {

    this.length = 8;
    this.timestamp = +new Date;
    
    var _getRandomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        
        for( var i = 0; i < this.length; ++i ) {
            var index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];	 
        }
        
        return id;
    }
}

// >>>>>>>>>> Account Registration <<<<<<<<<<
// ========== Validation of Client Registration Form ==========
// ---------- Username Validation ---------- 
function checkUserName(){
    var username = document.getElementById("clientUname").value;
    var check = false;
    if(username === "" ){
        check = true;
    }
    if(check){
        document.getElementById("userNameErrorMsg").style.display = "block";
    }else{
        document.getElementById("userNameErrorMsg").style.display = "none";
    }
}
// ---------- Email Validation ---------- 
function checkEmail(){
    var email = document.getElementById("clientEmail");
    var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check;
    if(email.value.match(emailFormat)){
        check = false;
    }else{
        check = true;
    }
    if(check){
        document.getElementById("emailErrorMsg").style.display = "block";
    }else{
        document.getElementById("emailErrorMsg").style.display = "none";
    }
	
}
// ---------- Password Validation ---------- 
function checkPassword(){
    var password1 = document.getElementById("clientPswd");
    var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var check;
    if(password1.value.match(passwordFormat)){
        check = false;
    }else{
        check = true;
    }    
    if(check){
        document.getElementById("passwordErrorMsg").style.display = "block";
    }else{
        document.getElementById("passwordErrorMsg").style.display = "none";
    }
}
// ----------Re-Enter Password Validation ---------- 
function checkPassword1(){

	var password1 = document.getElementById("clientPswd1");
    var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var check;
    if(password1.value.match(passwordFormat)){
        check = false;
    }else{
        check = true;
    }    
    if(check){
        document.getElementById("passwordErrorMsg1").style.display = "block";
    }else{
        document.getElementById("passwordErrorMsg1").style.display = "none";
    }
}

// ---------- Full Name Validation ---------- 
function checkFullName(){
    var fullName = document.getElementById("clientName").value;
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
    var passportIC = document.getElementById("clientPassportIC").value;
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
    var about = document.getElementById("clientAbout").value;
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
    var phoneNo = document.getElementById("clientPhone").value;
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
    var address = document.getElementById("clientAddress").value;
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
// ========== Validation of Freelancer Registration Form ==========
// ---------- Username Validation ---------- 
function checkUserName1(){
    var username = document.getElementById("flcUname").value;	
    var check1 = false;
    if(username === "" ){
        check1 = true;
    }
    if(check1){
        document.getElementById("userNameErrorMsg1").style.display = "block";
    }else{
        document.getElementById("userNameErrorMsg1").style.display = "none";
    }
}
// ---------- Email Validation ---------- 
function checkEmail1(){
    var email = document.getElementById("flcEmail");
    var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check1;
    if(email.value.match(emailFormat)){
        check1 = false;
    }else{
        check1 = true;
    }
    if(check1){
        document.getElementById("emailErrorMsg1").style.display = "block";
    }else{
        document.getElementById("emailErrorMsg1").style.display = "none";
    }
	
}
// ---------- Password Validation ---------- 
function checkPassword2(){
    var password1 = document.getElementById("flcPswd");
    var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var check1;
    if(password1.value.match(passwordFormat)){
        check1 = false;
    }else{
        check1 = true;
    }    
    if(check1){
        document.getElementById("passwordErrorMsg2").style.display = "block";
    }else{
        document.getElementById("passwordErrorMsg2").style.display = "none";
    }
}
// ---------- Re-Enter Password Validation ---------- 
function checkPassword3(){

	var password1 = document.getElementById("flcPswd1");
    var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var check1;
    if(password1.value.match(passwordFormat)){
        check1 = false;
    }else{
        check1 = true;
    }    
    if(check1){
        document.getElementById("passwordErrorMsg3").style.display = "block";
    }else{
        document.getElementById("passwordErrorMsg3").style.display = "none";
    }
}

// ---------- Full Name Validation ---------- 
function checkFullName1(){
    var fullName = document.getElementById("flcName").value;
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
    var passportIC = document.getElementById("flcPassportIC").value;
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
    var phoneNo = document.getElementById("flcPhone").value;
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
    var address = document.getElementById("flcAddress").value;
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
    var about = document.getElementById("flcAbout").value;
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
    var acaQuali = document.getElementById("flcAcaQualification").value;
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
    var othAcaQuali = document.getElementById("OtherAcaQualiOpt").value;
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
    var profSpec = document.getElementById("flcProf").value;
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
// ----------Freelancer Type Validation ---------- 
function checkFreeType(){
    var freeType = document.getElementById("flcType").value;
	var check1 ;
    if(freeType == 0){
        check1 = true;
    }else{
		check1 = false;
	}
    if(check1){
        document.getElementById("flctypeErrorMsg").style.display = "block";
    }else{
        document.getElementById("flctypeErrorMsg").style.display = "none";
    }
}
// ---------- Company Name Validation ---------- 
function checkCompName(){
    var compName = document.getElementById("flcCompName").value;
	var check1 = false ;
    if(compName === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("compNameErrorMsg").style.display = "block";
    }else{
        document.getElementById("compNameErrorMsg").style.display = "none";
    }
}
// ---------- Company Registration Name Validation ---------- 
function checkCompRegNo(){
    var compRegNo = document.getElementById("flcCompRegNo").value;
	var check1 = false ;
    if(compRegNo === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("compRegNoErrorMsg").style.display = "block";
    }else{
        document.getElementById("compRegNoErrorMsg").style.display = "none";
    }
}
// ---------- Company Description Validation ---------- 
function checkCompDescp(){
    var compDescp = document.getElementById("flcCompDescp").value;
	var check1 = false ;
    if(compDescp === ""){
        check1 = true;
    }
    if(check1){
        document.getElementById("compDescpErrorMsg").style.display = "block";
    }else{
        document.getElementById("compDescpErrorMsg").style.display = "none";
    }
}
// ---------- Provided Services Validation ---------- 
function checkServices(){
    var provServices = document.getElementById("flcServices").value;
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
    var sevDescp = document.getElementById("flcServicesDescp").value;
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
    var workHrs = document.getElementById("flcWorkHrs").value;
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

// >>>>>>>>>> Register new CLIENT ACCOUNT in EsayHired <<<<<<<<<< 
function clientRegister(){
    var username = document.getElementById("clientUname").value;
    var email = document.getElementById("clientEmail").value;
    var password1 = document.getElementById("clientPswd").value;
	var password2 = document.getElementById("clientPswd1").value; //confirmed password
	var fullName = document.getElementById("clientName").value;
	var passportIC = document.getElementById("clientPassportIC").value;
	var about = document.getElementById("clientAbout").value;
	var phoneNo = document.getElementById("clientPhone").value;
	var address = document.getElementById("clientAddress").value;
    //variable for random clientID
    var generator = new IDGenerator();
	
	var fullNameFormat = /^([A-Za-z.\s_-])/;    
    var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkFullNameValid = fullName.match(fullNameFormat);
    var checkEmailValid = email.match(emailFormat);
    var checkPassword1Valid = password1.match(passwordFormat);
	var checkPassword2Valid = password2.match(passwordFormat);

	if(username === ""){
        return checkUserName();
    }else if(checkEmailValid == null){
        return checkEmail();
    }else if(checkPassword1Valid == null){
        return checkPassword();
    }else if(checkPassword2Valid == null){
        return checkPassword1();
    }else if(checkFullNameValid == null){
        return checkFullName();
	}else if(passportIC === ""){
        return checkPassportIC();
    }else if(about === ""){
        return checkAbout();
    }else if(phoneNo === ""){
        return checkPhone();
	}else if(address === ""){
        return checkAddress();
	}else {
		if (password1 === password2){
			firebase.auth().createUserWithEmailAndPassword(email, password1).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref("Users");
            var userData = {
				clientID: "clt" + generator.generate(),
                username: username,
				email: email,
				password: password1,
				fullName: fullName,
				passportIC: passportIC,
				about: about,
				phoneNo: phoneNo,
				address: address,
				accountType: 'Client',
            }
			
            
            firebaseRef.child("Clients").child(uid).set(userData);
            swal('Your Client Account is Created','Kindly Please LOGIN Now.', 'success',
            ).then((value) => {
                setTimeout(function(){
                    window.location.href ="login.html";
                }, 1000)
            });
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
			window.alert("The password does not match with the re-entered password. Please re-enter again");
			window.location.href ="clientReg.html";
		}
		 
	}
}
// >>>>>>>>>> Register new FREELANCER ACCOUNT in EsayHired <<<<<<<<<<  
function freelancerRegister(){
	var username = document.getElementById("flcUname").value;
	var email = document.getElementById("flcEmail").value;
	var password1 = document.getElementById("flcPswd").value; 
	var password2 = document.getElementById("flcPswd1").value; //confirmed password
	var fullName = document.getElementById("flcName").value;
	var passportIC = document.getElementById("flcPassportIC").value;
	var phoneNo = document.getElementById("flcPhone").value;
	var address = document.getElementById("flcAddress").value;
	var about = document.getElementById("flcAbout").value;
	var acaQualiOptValue = document.getElementById("flcAcaQualification").value;	
	var acaQualiOpt = document.getElementById("flcAcaQualification");
	var acaQuali = acaQualiOpt.options[acaQualiOpt.selectedIndex].text; //get academic qualification
	var otherAcaQuali = document.getElementById("OtherAcaQualiOpt").value;
	var professional = document.getElementById("flcProf").value;
	var freetypeValue = document.getElementById("flcType").value;			
	var freetype = document.getElementById("flcType");
	var freelancerType = freetype.options[freetype.selectedIndex].text; //get freelancer type
	var compName = document.getElementById("flcCompName").value;
	var compRegNo = document.getElementById("flcCompRegNo").value;
	var compDescrip = document.getElementById("flcCompDescp").value;
	var providedServices = document.getElementById("flcServices").value;
	var servicesDescrip = document.getElementById("flcServicesDescp").value;
	var workingHrs = document.getElementById("flcWorkHrs").value;
	//variable for random freelancerID
    var generator = new IDGenerator();
	
	var fullNameFormat = /^([A-Za-z.\s_-])/;    
    var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkFullNameValid = fullName.match(fullNameFormat);
    var checkEmailValid = email.match(emailFormat);
    var checkPassword1Valid = password1.match(passwordFormat);
	var checkPassword2Valid = password2.match(passwordFormat);

	if(username === ""){
        return checkUserName1();
    }else if(checkEmailValid == null){
        return checkEmail1();
    }else if(checkPassword1Valid == null){
        return checkPassword2();
    }else if(checkPassword2Valid == null){
        return checkPassword3();
    }else if(checkFullNameValid == null){
        return checkFullName1();
	}else if(passportIC === ""){
        return checkPassportIC1();
    }else if(phoneNo === ""){
        return checkPhone1();
	}else if(address === ""){
        return checkAddress1();
	}else if(about === ""){
        return checkAbout1();
    }else if(acaQualiOptValue == 0){
        return checkAcaQuali();
    }else if(acaQualiOptValue == 9 && otherAcaQuali === ""){
        return checkOthAcaQuali();
    }else if(professional === ""){
        return checkProf();
    }else if(freetypeValue == 0){
        return checkFreeType();
    }else if(freetypeValue == 2 && compName === ""){
        return checkCompName();
    }else if(freetypeValue == 2 && compRegNo === ""){
        return checkCompRegNo();
    }else if(freetypeValue == 2 && compDescrip === ""){
        return checkCompDescp();
    }else if(providedServices === ""){
        return checkServices();
    }else if(servicesDescrip === ""){
        return checkSevDescp();
    }else if(workingHrs === ""){
        return checkWorkHrs();
    }else {
		if (password1 === password2){
			// if users choose 'other' option for academic qualification && 'Individual' Freelancer type
			if(acaQualiOptValue == 9 && freetypeValue == 1){
				firebase.auth().createUserWithEmailAndPassword(email, password1).then((success) => {
				var user = firebase.auth().currentUser;
				var uid;
				if (user != null) {
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: "free" + generator.generate(),
					username: username,
					email: email,
					password: password1,
					fullName: fullName,
					passportIC: passportIC,
					phoneNo: phoneNo,
					address: address,
					about: about,
					academicQualification: otherAcaQuali, // save the user input other Academic Qualification 
					professional : professional,
					freelancerType: freelancerType,
					providedServices: providedServices,
					servicesDescription: servicesDescrip,
					workingHours: workingHrs,
					accountType: 'Freelancer',
				}
				
				
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal('Your Freelancer Account is Created','Kindly Please LOGIN Now.', 'success',
				).then((value) => {
					setTimeout(function(){
						window.location.href ="login.html";
					}, 1000)
				});
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
			// if users choose 'other' option for academic qualification && 'Company' Freelancer type
			else if(acaQualiOptValue == 9 && freetypeValue == 2){
				firebase.auth().createUserWithEmailAndPassword(email, password1).then((success) => {
				var user = firebase.auth().currentUser;
				var uid;
				if (user != null) {
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: "free" + generator.generate(),
					username: username,
					email: email,
					password: password1,
					fullName: fullName,
					passportIC: passportIC,
					phoneNo: phoneNo,
					address: address,
					about: about,
					academicQualification: otherAcaQuali, // save the user input other Academic Qualification 
					professional : professional,
					freelancerType: freelancerType,
					companyName: compName,
					companyRegistrationNo: compRegNo,
					companyDescription: compDescrip,
					providedServices: providedServices,
					servicesDescription: servicesDescrip,
					workingHours: workingHrs,
					accountType: 'Freelancer',
				}
				
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal('Your Freelancer Account is Created','Kindly Please LOGIN Now.', 'success',
				).then((value) => {
					setTimeout(function(){
						window.location.href ="login.html";
					}, 1000)
				});
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
			// if users don't choose 'other' option for academic qualification && 'Individual' Freelancer type
			else if(acaQualiOptValue != 9 && freetypeValue == 1){
				firebase.auth().createUserWithEmailAndPassword(email, password1).then((success) => {
				var user = firebase.auth().currentUser;
				var uid;
				if (user != null) {
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: "free" + generator.generate(),
					username: username,
					email: email,
					password: password1,
					fullName: fullName,
					passportIC: passportIC,
					phoneNo: phoneNo,
					address: address,
					about: about,
					academicQualification: acaQuali, // save the predefined Academic Qualification choice
					professional : professional,
					freelancerType: freelancerType,
					providedServices: providedServices,
					servicesDescription: servicesDescrip,
					workingHours: workingHrs,
					accountType: 'Freelancer',
				}
				
				
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal('Your Freelancer Account is Created','Kindly Please LOGIN Now.', 'success',
				).then((value) => {
					setTimeout(function(){
						window.location.href ="login.html";
					}, 1000)
				});
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
			// if users don't choose 'other' option for academic qualification && 'company' Freelancer type
			else if(acaQualiOptValue != 9 && freetypeValue == 2){
				firebase.auth().createUserWithEmailAndPassword(email, password1).then((success) => {
				var user = firebase.auth().currentUser;
				var uid;
				if (user != null) {
					uid = user.uid;
				}
				var firebaseRef = firebase.database().ref("Users");
				var userData = {
					freelancerID: "free" + generator.generate(),
					username: username,
					email: email,
					password: password1,
					fullName: fullName,
					passportIC: passportIC,
					phoneNo: phoneNo,
					address: address,
					about: about,
					academicQualification: acaQuali, // save the predefined Academic Qualification choice
					professional : professional,
					freelancerType: freelancerType,
					companyName: compName,
					companyRegistrationNo: compRegNo,
					companyDescription: compDescrip,
					providedServices: providedServices,
					servicesDescription: servicesDescrip,
					workingHours: workingHrs,
					accountType: 'Freelancer',
				}
				
				firebaseRef.child("Freelancers").child(uid).set(userData);
				swal('Your Freelancer Account is Created','Kindly Please LOGIN Now.', 'success',
				).then((value) => {
					setTimeout(function(){
						window.location.href ="login.html";
					}, 1000)
				});
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
		else{
			window.alert("The password does not match with the re-entered password. Please re-enter again");
			window.location.href ="freelancerReg.html";
		}
		 
	}
}
//  >>>>>>>>>> Return to main page if do not want to register account <<<<<<<<<<
function cancelRegistration(){
  window.location.href = "login.html";
}  
// >>>>>>>>>> Display the option "Other:" text field of Academic Qualification<<<<<<<<<<
function check(option) {
	// use one of possible conditions
	// if (option.value == 'Other')
	if (option.selectedIndex == 9) {
		document.getElementById("OtherOpt").style.display = 'block';
	} else {
		document.getElementById("OtherOpt").style.display = 'none';
	}
}
// >>>>>>>>>> Freelancer Type Option Function <<<<<<<<<<
function check1(option1) {
	// use one of possible conditions
	// if (option1.value == 'Company')
	if (option1.selectedIndex == 2) {
		document.getElementById("CompNameField").style.display = 'block';
		document.getElementById("CompRegNoField").style.display = 'block';
		document.getElementById("CompDescpField").style.display = 'block';
	} else {
		document.getElementById("CompNameField").style.display = 'none';
		document.getElementById("CompRegNoField").style.display = 'none';
		document.getElementById("CompDescpField").style.display = 'none';
	}
			
}

// >>>>>>>>>> Main Registration Page Function <<<<<<<<<<   
// ========== Proceed to Client Registration Page ==========
function clientRegisterPage(){
	window.location.href = "clientReg.html";
}   
// ========== Proceed to Freelancer Registration Page ==========
function FreelancerRegisterPage(){
	window.location.href = "freelancerReg.html";
} 


// >>>>>>>>>> Account Login in EsayHired <<<<<<<<<< 
// ========== Validation For FREELANCER Login ==========
// ---------- Email Validation ---------- 
function checkLogFlcEmail(){
    var logFreelancerEmail = document.getElementById("logFlcEmail").value;
	var logFlcEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check;
    if(logFreelancerEmail.match(logFlcEmailFormat)){
        check = false;
    }else{
        check = true;
    }
    if(check){
        document.getElementById("logFlcEmailErrorMsg").style.display = "block";
    }else{
        document.getElementById("logFlcEmailErrorMsg").style.display = "none";
    }
}
// ---------- Password Validation ---------- 
function checkLogFlcPassword(){
    var logFreelancerPassword = document.getElementById("logFlcPassword").value;
    var logFlcPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var check;
    if(logFreelancerPassword.match(logFlcPasswordFormat)){
        check = false;
    }else{
        check = true;
    }    
    if(check){
        document.getElementById("logFlcPasswordErrorMsg").style.display = "block";
    }else{
        document.getElementById("logFlcPasswordErrorMsg").style.display = "none";
    }
}
// ========== Validation For CLIENT Login ==========
// ---------- Email Validation ---------- 
function checkLogCltEmail(){
    var logClientEmail = document.getElementById("logCltEmail").value;
    var logCltEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check;
    if(logClientEmail.match(logCltEmailFormat)){
        check = false;
    }else{
        check = true;
    }
    if(check){
        document.getElementById("logCltEmailErrorMsg").style.display = "block";
    }else{
        document.getElementById("logCltEmailErrorMsg").style.display = "none";
    }
}
// ---------- Password Validation ---------- 
function checkLogCltPassword(){
    var logClientPassword = document.getElementById("logCltPassword").value;
    var logCltPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var check;
    if(logClientPassword.match(logCltPasswordFormat)){
        check = false;
    }else{
        check = true;
    }    
    if(check){
        document.getElementById("logCltPasswordErrorMsg").style.display = "block";
    }else{
        document.getElementById("logCltPasswordErrorMsg").style.display = "none";
    }
}
// >>>>>>>>>> FREELANCER Account Login Function in EsayHired <<<<<<<<<<   
function freelancerLogin(){
    var logFreelancerEmail = document.getElementById("logFlcEmail").value;
    var logFreelancerPassword = document.getElementById("logFlcPassword").value;
	var logFlcEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var logFlcPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkFlcEmailValid = logFreelancerEmail.match(logFlcEmailFormat);
    var checkFlcPasswordValid = logFreelancerPassword.match(logFlcPasswordFormat);
    //var accType = document.getElementById("flcAcc").value;
    if(checkFlcEmailValid == null){
        return checkLogFlcEmail();
    }else if(checkFlcPasswordValid == null){
        return checkLogFlcPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(logFreelancerEmail, logFreelancerPassword).then((success) => {
            swal({
                type: 'success',
                title: 'Succesfully Login.', 
            }).then((value) => {
                setTimeout(function(){
                    //setPageSession_main(username, accType);
                    //Go to the page for freelancer to view their profile
					window.location.href="freePage.html";
                }, 3000)
            });

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
			 if (errorCode === 'auth/wrong-password') {
				swal({
					type: 'error',
					title: 'Error',
					text: 'Wrong Password. Please Re-enter again.',
				})
			 }else{
				swal({
					type: 'error',
					title: 'Error',
					text: errorMessage,
				})
			 }
            
        });
    }
}
// >>>>>>>>>> CLIENT Account Login Function in EsayHired <<<<<<<<<<   
function clientLogin(){
    var logClientEmail = document.getElementById("logCltEmail").value;
    var logClientPassword = document.getElementById("logCltPassword").value;
	var logCltEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var logCltPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkCltEmailValid = logClientEmail.match(logCltEmailFormat);
    var checkCltPasswordValid = logClientPassword.match(logCltPasswordFormat);
    //var accType = document.getElementById("clientAcc").value;
    if(checkCltEmailValid == null){
        return checkLogCltEmail();
    }else if(checkCltPasswordValid == null){
        return checkLogCltPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(logClientEmail, logClientPassword).then((success) => {
            swal({
                type: 'success',
                title: 'Succesfully Login.', 
            }).then((value) => {
                setTimeout(function(){
                   // setPageSession_main(username, accType);
					window.location.href="cPage.html";
                }, 3000)
            });

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
			 if (errorCode === 'auth/wrong-password') {
				swal({
					type: 'error',
					title: 'Error',
					text: 'Wrong Password. Please Re-enter again.',
				})
			 }else{
				swal({
					type: 'error',
					title: 'Error',
					text: errorMessage,
				})
			 }
            
        });
    }
}
// >>>>>>>>>> Proceed to Freelancer Login Section <<<<<<<<<< 
function flcLoginSec(){
	var freelancerAcc = document.getElementById("flcAcc").value;
	if (freelancerAcc == "Freelancer" ){
		document.getElementById("freelancerLoginSection").style.display = "block";
		document.getElementById("clientloginSection").style.display = "none";
	}
}
// >>>>>>>>>> Proceed to Client Login Section <<<<<<<<<< 
function clientLoginSec(){
	var clientAcc = document.getElementById("clientAcc").value;
	if (clientAcc == "Client" ){
		document.getElementById("clientloginSection").style.display = "block";
		document.getElementById("freelancerLoginSection").style.display = "none";
	}
}























