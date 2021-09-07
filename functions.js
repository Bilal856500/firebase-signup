const username = document.getElementById('username');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('Password');
const confirmPassword = document.getElementById('ConfirmPassword');
// const signIn = document.getElementById('writeData');
const database = firebase.database();
var rootRef = database.ref('users/');

document.getElementById("form").addEventListener("submit", async(e) => {

    e.preventDefault();

    const checkUsername = checkExistingUsername(username.value);
    console.log(checkUsername);
});


function checkExistingUsername(username) {
    firebase.database().ref('users').child(username).on('value', async(snapshot) => {
        let flag;
        try {
            let data = await snapshot.val().UserName;

            alert('try');
            flag = true;
        } catch (e) {
            alert('catch');
            flag = false;
        }
        return flag;
        // if (snapshot.exists()) {
        //     return true;
        // } else {
        //     return false;
        // }
        // value = await snapshot.val(); //these 2 lines are used to fetch single data from database
    });
}


async function signUp() {

    // event.preventDefault();
    const checkUsername = await checkExistingUsername(username.value);
    console.log(checkUsername);
    return true;
    database.ref('users/' + username.value).set({
        UserName: username.value,
        FirstName: firstName.value,
        LastName: lastName.value,
        Password: password.value,
        ConfirmPassword: confirmPassword.value
    });

}

// function setRecord() {
// rootRef.once('value', function(snapshot) {
//     if (snapshot.exists()) {
//         let index = 1;
//         const data = snapshot.val();
//         for (const key in data) {
//             let Username = data[key].UserName;
//             // alert(key)
//             let FName = data[key].FirstName;
//             let LName = data[key].LastName;
//             let password = data[key].Password;
//             let confirmPassword = data[key].ConfirmPassword;
//             // validation(Username, FName, LName, password, confirmPassword, key, index)
//             index++;
//         }

//     }

// })