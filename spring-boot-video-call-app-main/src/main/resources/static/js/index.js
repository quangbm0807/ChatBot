function loadAndDisplayUsers() {
    // Check if the user is connected
    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location = 'login.html';
        return;
    }

    const userListElement = document.getElementById("userList");
    // Clear any existing content in the userListElement
    userListElement.innerHTML = "Loading...";

    // Construct the base URL dynamically
    const baseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

    // Fetch the user list
    fetch(`${baseURL}/api/v1/users`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayUsers(data, userListElement);
        });
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    // Loop through the userList and create list items to display each user
    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <div>
                    <i class="fa fa-user-circle"></i>
                    ${user.username} <i class="user-email">(${user.email})</i>
                </div>
                <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
            `;
        userListElement.appendChild(listItem);
    });
}

// Call the loadAndDisplayUsers function when the page loads
window.addEventListener("load", loadAndDisplayUsers);

function handleLogout() {
    // Construct the base URL dynamically
    const baseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

    fetch(`${baseURL}/api/v1/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('connectedUser')
    })
        .then((response) => response)
        .then(() => {
            localStorage.removeItem('connectedUser');
            window.location.href = "login.html";
        });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);

function handleNewMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    window.open(`videocall.html?username=${connectedUser.username}`, "_blank");
}

// Attach the handleNewMeeting function to the "Create a New Meeting" button
const newMeetingBtn = document.getElementById("newMeetingBtn");
newMeetingBtn.addEventListener("click", handleNewMeeting);

function handleJoinMeeting() {
    const roomId = document.getElementById("meetingName").value;
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    const url = `videocall.html?roomID=${roomId}&username=${connectedUser.username}`;

    window.open(url, "_blank");
}

const joinMeetingBtn = document.getElementById("joinMeetingBtn");
joinMeetingBtn.addEventListener("click", handleJoinMeeting);
