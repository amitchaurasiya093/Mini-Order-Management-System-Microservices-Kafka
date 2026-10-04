// =====================================================
// REGISTER
// =====================================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const username =
                document.getElementById("username").value.trim();


            const password =
                document.getElementById("password").value;


            const confirmPassword =
                document.getElementById("confirmPassword").value;


            const message =
                document.getElementById("registerMessage");


            // Password validation

            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "http://localhost:8081/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                username: username,
                                password: password
                            })
                        }
                    );


                const result =
                    await response.text();


                if (response.ok) {

                    showMessage(
                        message,
                        result ||
                        "Registration successful!",
                        "success"
                    );


                    registerForm.reset();


                    // Redirect to login

                    setTimeout(
                        function () {

                            window.location.href =
                                "/login";

                        },
                        1500
                    );

                } else {

                    showMessage(
                        message,
                        result ||
                        "Registration failed.",
                        "error"
                    );

                }

            } catch (error) {

                console.error(error);

                showMessage(
                    message,
                    "Unable to connect to Auth Service.",
                    "error"
                );

            }

        }
    );

}



// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const username =
                document.getElementById("username").value.trim();


            const password =
                document.getElementById("password").value;


            const message =
                document.getElementById("loginMessage");


            const button =
                document.getElementById("loginButton");


            try {

                button.disabled = true;

                button.innerText = "Logging in...";


                const response =
                    await fetch(
                        "http://localhost:8081/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                username: username,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                if (response.ok && data.token) {


                    // Save JWT

                    localStorage.setItem(
                        "token",
                        data.token
                    );


                    // Save username

                    localStorage.setItem(
                        "username",
                        username
                    );


                    showMessage(
                        message,
                        "Login successful! Redirecting...",
                        "success"
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                "/dashboard";

                        },
                        1000
                    );


                } else {

                    showMessage(
                        message,
                        data.message ||
                        "Invalid username or password.",
                        "error"
                    );

                }

            } catch (error) {

                console.error(error);

                showMessage(
                    message,
                    "Unable to connect to Auth Service.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.innerText = "Login";

            }

        }
    );

}



// =====================================================
// MESSAGE FUNCTION
// =====================================================

function showMessage(
    element,
    message,
    type
) {

    if (!element) {

        return;

    }


    element.classList.remove(
        "hidden",
        "bg-red-100",
        "text-red-700",
        "bg-green-100",
        "text-green-700"
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


    element.innerText = message;

}
