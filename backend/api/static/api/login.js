document.getElementById("loginForm").onsubmit = async function(e) {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/login/', { // Adjust the URL accordingly
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        // Store the tokens and redirect to the home page
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        window.location.href = 'home.html'; // Adjust as necessary
    } else {
        alert("Invalid username or password");
    }
};
