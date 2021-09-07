const username = document.getElementById('username');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('Password');
const confirmPassword = document.getElementById('ConfirmPassword');
const database = firebase.database().ref('users');

async function checkExistingUsername(username) {
	return database.child(username).once('value').then(async (snapshot) => {
		return snapshot.exists();
	});
}

async function signUp() {
	return database.child(username.value).set({
		userName: username.value,
		firstName: firstName.value,
		lastName: lastName.value,
		password: password.value,
		confirmPassword: confirmPassword.value
	});
}


document.getElementById("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	const checkUsername = await checkExistingUsername(username.value);
	if (checkUsername) {
		alert('Username exists!');
	} else if (password.value !== confirmPassword.value) {
		alert(`Passwords do not match!`);
	} else {
		await signUp();
		location.reload();
	}

});