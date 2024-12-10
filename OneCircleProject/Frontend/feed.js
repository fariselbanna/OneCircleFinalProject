// Mock data for professionals
const professionals = [
    {
        name: "Alice Johnson",
        skills: ["JavaScript", "React"],
        location: "San Diego",
        profession: "Software Engineer",
        lineOfWork: "Technology",
        languages: ["English", "Arabic"],
        faith: "Christianity",
        gender: "Female",
        sponsored: true,
    },
    {
        name: "Bob Smith",
        skills: ["Python", "Django"],
        location: "New York",
        profession: "Data Scientist",
        lineOfWork: "Technology",
        languages: ["English", "French"],
        faith: "Atheism",
        gender: "Male",
        sponsored: false,
    },
    {
        name: "Jane Doe",
        skills: ["Accounting", "QuickBooks"],
        location: "San Diego",
        profession: "Accountant",
        lineOfWork: "Finance",
        languages: ["English", "Spanish"],
        faith: "Islam",
        gender: "Female",
        sponsored: false,
    },
    {
        name: "Michael Green",
        skills: ["Fitness Training", "Nutrition"],
        location: "Los Angeles",
        profession: "Fitness Trainer",
        lineOfWork: "Health & Wellness",
        languages: ["English", "German"],
        faith: "None",
        gender: "Male",
        sponsored: true,
    },
    {
        name: "Amara Singh",
        skills: ["Teaching", "Curriculum Design"],
        location: "San Francisco",
        profession: "Teacher",
        lineOfWork: "Education",
        languages: ["English", "Hindi"],
        faith: "Hinduism",
        gender: "Female",
        sponsored: false,
    },
    {
        name: "Dominic Dabish",
        skills: ["Programming", "Data Structures", "Computer Organization"],
        location: "Detroit",
        profession: "Engineer, Educator, Entrepreneur",
        lineOfWork: "Technology",
        languages: ["English", "Assyrian"],
        sponsored: false,
        topRated: true,
    },
];

// Handle navigation buttons
document.querySelectorAll("a").forEach((link) => {
    if (link.textContent.trim() === "Profile") {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "dashboard.html";
        });
    }

    if (link.textContent.trim() === "Logout") {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "login.html";
        });
    }
});

// Range slider setup bAR
const rangeSlider = document.getElementById("location-range");
const rangeValue = document.getElementById("range-value");

rangeSlider.addEventListener("input", () => {
    const miles = rangeSlider.value;
    rangeValue.textContent = `${miles} miles`;
});

// Render professionals dynamically
function renderProfessionals(data) {
    const container = document.querySelector(".cards-container");
    container.innerHTML = ""; 

    data.forEach((professional) => {
        const card = document.createElement("div");
        card.className = "professional-card";

        card.innerHTML = `
            ${professional.sponsored ? `<span class="sponsored">Sponsored</span>` : ""}
            ${professional.topRated ? `<span class="top-rated">Top Rated</span>` : ""}
            <h4>${professional.name}</h4>
            <p>Profession: ${professional.profession}</p>
            <p>Skills: ${professional.skills.join(", ")}</p>
            <p>Location: ${professional.location}</p>
            <div class="tags">
                ${professional.languages.map((lang) => `<span class="tag">${lang}</span>`).join("")}
                ${professional.faith ? `<span class="tag">${professional.faith}</span>` : ""}
                ${professional.gender ? `<span class="tag">${professional.gender}</span>` : ""}
            </div>
            <button onclick="connectWithProfessional('${professional.name}')">Connect</button>
        `;
        container.appendChild(card);
    });
}

// Handle connect button functionality
function connectWithProfessional(name) {
    if (name === "Dominic Dabish") {
        window.location.href = "dominic-profile.html"; // Redirect to Dominic's profile page
    } else {
        alert(`You have connected with ${name}!`);
    }
}

// Search functionality
function handleSearch() {
    const searchInput = document.querySelector("#search-bar").value.toLowerCase();
    const professionFilter = document.querySelector("#profession-select").value;
    const lineOfWorkFilter = document.querySelector("#line-of-work-select").value;
    const languageFilter = document.querySelector("#language-select").value;
    const faithFilter = document.querySelector("#faith-select").value;
    const genderFilter = document.querySelector("#gender-select").value;

    const filtered = professionals.filter((professional) => {
        const matchesSearch =
            professional.name.toLowerCase().includes(searchInput) ||
            professional.skills.some((skill) =>
                skill.toLowerCase().includes(searchInput)
            );
        const matchesProfession = !professionFilter || professional.profession === professionFilter;
        const matchesLineOfWork = !lineOfWorkFilter || professional.lineOfWork === lineOfWorkFilter;
        const matchesLanguage = !languageFilter || professional.languages.includes(languageFilter);
        const matchesFaith = !faithFilter || professional.faith === faithFilter;
        const matchesGender = !genderFilter || professional.gender === genderFilter;

        return (
            matchesSearch &&
            matchesProfession &&
            matchesLineOfWork &&
            matchesLanguage &&
            matchesFaith &&
            matchesGender
        );
    });

    renderProfessionals(filtered);
}

// Map Integration using Leaflet
function initializeMap() {
    const map = L.map("map-container").setView([32.7157, -117.1611], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
    }).addTo(map);

    professionals.forEach((professional) => {
        const coordinates = getLocationCoordinates(professional.location);
        if (coordinates) {
            L.marker(coordinates)
                .addTo(map)
                .bindPopup(
                    `<strong>${professional.name}</strong><br>${professional.profession}<br>${professional.location}`
                );
        }
    });

    document.getElementById("map-search-btn").addEventListener("click", () => {
        const input = document.getElementById("address-input").value;
        const coordinates = getLocationCoordinates(input);

        if (coordinates) {
            map.setView(coordinates, 12);
        } else {
            alert("Location not found. Please try again.");
        }
    });
}

// Simulated location-to-coordinates function
function getLocationCoordinates(location) {
    const coordinates = {
        "San Diego": [32.7157, -117.1611],
        "New York": [40.7128, -74.0060],
        "Los Angeles": [34.0522, -118.2437],
        "San Francisco": [37.7749, -122.4194],
        "Detroit": [42.3314, -83.0458],
    };
    return coordinates[location] || null;
}

// Initialize the map and professionals on window load
window.onload = () => {
    renderProfessionals(professionals);
    initializeMap();
};
