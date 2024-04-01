document.getElementById("signupForm").onsubmit = async function(e) {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/signup/', { // Adjust the URL accordingly
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    });

    if (response.ok) {
        console.log("Signup successful");
        // Redirect to login page or home page
        window.location.href = 'login.html';
    } else {
        alert("Signup failed");
    }
};
