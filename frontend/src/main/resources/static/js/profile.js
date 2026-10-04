document.addEventListener("DOMContentLoaded", function () {

    console.log("Profile page loaded");


    // =====================================
    // LOGIN CHECK
    // =====================================

    if (!isLoggedIn()) {

        window.location.href = "/login";

        return;
    }


    // =====================================
    // LOGOUT
    // =====================================

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                logout();

            }
        );

    }


    // =====================================
    // LOAD PROFILE
    // =====================================

    loadProfile();

});


// =========================================
// LOAD PROFILE
// =========================================

async function loadProfile() {

    try {

        const response =
            await apiRequest(
                AUTH_API + "/auth/profile"
            );


        if (!response) {

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Unable to load profile"
            );

        }


        const data =
            await response.json();


        console.log(
            "Profile:",
            data
        );


        // =====================================
        // GET USERNAME
        // =====================================

        let username =
            data.username;


        // If backend response has another format
        if (!username) {

            username =
                localStorage.getItem(
                    "username"
                );

        }


        if (!username) {

            username = "User";

        }


        // =====================================
        // DISPLAY USERNAME
        // =====================================

        const profileUsername =
            document.getElementById(
                "profileUsername"
            );


        if (profileUsername) {

            profileUsername.textContent =
                username;

        }


        const usernameElement =
            document.getElementById(
                "username"
            );


        if (usernameElement) {

            usernameElement.textContent =
                username;

        }


        // =====================================
        // AVATAR
        // =====================================

        const avatar =
            document.getElementById(
                "avatar"
            );


        if (avatar && username) {

            avatar.textContent =
                username
                    .charAt(0)
                    .toUpperCase();

        }


    } catch (error) {

        console.error(
            "Profile Error:",
            error
        );


        // Fallback from localStorage

        const username =
            localStorage.getItem(
                "username"
            );


        if (username) {

            document.getElementById(
                "profileUsername"
            ).textContent =
                username;


            document.getElementById(
                "username"
            ).textContent =
                username;


            document.getElementById(
                "avatar"
            ).textContent =
                username
                    .charAt(0)
                    .toUpperCase();

        }


        showMessage(
            "Unable to load complete profile information.",
            "error"
        );

    }

}


// =========================================
// SHOW MESSAGE
// =========================================

function showMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "profileMessage"
        );


    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.classList.remove(
        "hidden",
        "bg-green-100",
        "text-green-700",
        "bg-red-100",
        "text-red-700"
    );


    if (type === "success") {

        element.classList.add(
            "bg-green-100",
            "text-green-700"
        );

    } else {

        element.classList.add(
            "bg-red-100",
            "text-red-700"
        );

    }

}
