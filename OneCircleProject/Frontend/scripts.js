const apiUrl = 'http://localhost:3000';

// Hardcoded users array (for demonstration purposes)
const users = [
    { email: "felbanna8935@sdsu.edu", password: "OneCircleFaris", name: "Faris Felbanna", profession: "Web Developer", location: "San Diego", role: "professional" },
    { email: "clientuser@example.com", password: "clientpass", name: "John Client", role: "client" }
];

// Function to handle role selection
function selectRole(role) {
    localStorage.setItem("userRole", role); 

    if (role === "client") {
        window.location.href = "profile-creation-client.html";
    } else if (role === "professional") {
        window.location.href = "profile-creation.html";
    }
}

// Fetch all users and display them
function fetchUsers() {
    fetch(`${apiUrl}/users`)
        .then(response => response.json())
        .then(data => {
            const profilesList = document.getElementById('profilesList');
            profilesList.innerHTML = ''; // Clear any existing content
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.profession || "N/A"} - ${user.location || "N/A"}`;
                profilesList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Search for users based on query
function searchUsers() {
    const query = document.getElementById('searchBar').value;
    fetch(`${apiUrl}/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';

            if (data.length === 0) {
                searchResults.innerHTML = '<li>No results found</li>';
            } else {
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.name} - ${user.profession}`;
                    searchResults.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to handle login (check email and password)
function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); 
        // Redirect based on user role
        if (user.role === "professional") {
            window.location.href = "dashboard.html";
        } else if (user.role === "client") {
            window.location.href = "client-dashboard.html";
        }
    } else {
        alert("Invalid login credentials");
    }
}

// Function to display user info on profile page
function loadProfile() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("user-info").innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Profession:</strong> ${user.profession || "N/A"}</p>
            <p><strong>Location:</strong> ${user.location || "N/A"}</p>
        `;
    } else {
        window.location.href = "login.html"; // Redirect to login if not logged in
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to home page
}

if (window.location.href.includes("profile.html")) {
    loadProfile();
}

document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store email and password in localStorage for now
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to role selection
    window.location.href = 'role-selection.html';
});

// Prefill email on profile creation page
if (window.location.href.includes("profile-creation.html") || window.location.href.includes("profile-creation-client.html")) {
    const email = localStorage.getItem('email');
    document.getElementById('email').value = email;
}

// Handle professional profile creation form submission
document.getElementById('profileCreationForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const profileData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        profession: document.getElementById("profession").value,
        services: document.getElementById("services").value,
        role: "professional"
    };

    localStorage.setItem("professionalProfile", JSON.stringify(profileData));
    window.location.href = "dashboard.html"; // Redirect to professional dashboard
});

// Handle client profile creation form submission
document.getElementById('clientProfileForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const clientProfile = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        servicesNeeded: document.getElementById("servicesNeeded").value,
        budget: document.getElementById("budget").value,
        preferences: document.getElementById("preferences").value,
        timeline: document.getElementById("timeline").value,
        communication: document.getElementById("communication").value,
        role: "client"
    };

    localStorage.setItem("clientProfile", JSON.stringify(clientProfile));
    window.location.href = "client-dashboard.html"; // Redirect to client dashboard
});

// Load users on page load
window.onload = fetchUsers; // Load users when the page is loaded
