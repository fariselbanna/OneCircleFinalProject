// Hardcoded user data using a hash table
const userData = {
    name: "Faris Elbanna",
    profileCompletion: 70,
    profilePicture: "path/to/profile.jpg",
    languages: ["English", "Arabic"],
    culturalAffiliation: "Middle Eastern",
};

// Suggested professionals as a list
const suggestedProfessionals = [
    { name: "Jane Doe", profession: "Family Lawyer", location: "San Diego, CA" },
    { name: "John Smith", profession: "Immigration Consultant", location: "Los Angeles, CA" },
];

// Notifications managed with a stack
const notifications = [];
function addNotification(notification) {
    notifications.push(notification); // Add new notification to the stack
    if (notifications.length > 5) notifications.shift(); // Limit to the 5 most recent
}
addNotification({ type: "message", content: "You have a new message from Jane Doe." });
addNotification({ type: "connection", content: "John Smith has viewed your profile." });

// Tree structure for menu navigation
const menuTree = {
    title: "Menu",
    children: [
        { title: "Edit Profile" },
        { title: "Appointments" },
        { title: "Statistics" },
        { title: "Settings" },
        { title: "Logout" },
    ],
};

// Graph structure for user connections
const userConnections = new Map();
userConnections.set("Faris Banna", ["Jane Doe", "John Smith"]); // Faris is connected to Jane and John
userConnections.set("Jane Doe", ["Faris Elbanna"]);
userConnections.set("John Smith", ["Faris Elbanna"]);

// Populate dashboard with user data
document.getElementById("userName").innerText = userData.name;
document.getElementById("profilePicture").src = userData.profilePicture;
document.getElementById("profileCompletion").innerText = userData.profileCompletion;
document.getElementById("progress").style.width = `${userData.profileCompletion}%`;

// Display languages and cultural affiliation
document.getElementById("languages").innerText = `Languages: ${userData.languages.join(", ")}`;
document.getElementById("culturalAffiliation").innerText = `Cultural Affiliation: ${userData.culturalAffiliation}`;

// Populate suggested professionals
const suggestedList = document.getElementById("suggestedList");
suggestedProfessionals.forEach((pro) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${pro.name} - ${pro.profession} (${pro.location})`;
    suggestedList.appendChild(listItem);
});

// Populate notifications from the stack
const notificationsList = document.getElementById("notificationsList");
notifications.forEach((notification) => {
    const listItem = document.createElement("li");
    listItem.innerText = notification.content;
    notificationsList.appendChild(listItem);
});

// Function to render menu navigation using tree structure
function renderMenu(tree, container) {
    const ul = document.createElement("ul");
    tree.children.forEach((child) => {
        const li = document.createElement("li");
        li.innerText = child.title;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}
const menuContainer = document.getElementById("menuContainer");
renderMenu(menuTree, menuContainer);

// Display user connections (graph structure)
const connectionsList = document.getElementById("connectionsList");
const userConnectionsForFaris = userConnections.get("Faris Elbanna");
userConnectionsForFaris.forEach((connection) => {
    const listItem = document.createElement("li");
    listItem.innerText = connection;
    connectionsList.appendChild(listItem);
});
