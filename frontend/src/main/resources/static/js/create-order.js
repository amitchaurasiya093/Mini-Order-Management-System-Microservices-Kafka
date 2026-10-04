document.addEventListener("DOMContentLoaded", function () {

    console.log("Create Order page loaded");


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
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                logout();

            }
        );

    }


    // =====================================
    // FORM SUBMIT
    // =====================================

    const form =
        document.getElementById("createOrderForm");


    form.addEventListener(
        "submit",
        createOrder
    );

});


// =========================================
// CREATE ORDER
// =========================================

async function createOrder(event) {

    event.preventDefault();


    const productName =
        document.getElementById(
            "productName"
        ).value.trim();


    const quantity =
        Number(
            document.getElementById(
                "quantity"
            ).value
        );


    const price =
        Number(
            document.getElementById(
                "price"
            ).value
        );


    // =====================================
    // VALIDATION
    // =====================================

    if (!productName) {

        showMessage(
            "Product name is required.",
            "error"
        );

        return;
    }


    if (!quantity || quantity < 1) {

        showMessage(
            "Quantity must be at least 1.",
            "error"
        );

        return;
    }


    if (!price || price <= 0) {

        showMessage(
            "Price must be greater than 0.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "createOrderButton"
        );


    button.disabled = true;

    button.textContent =
        "Creating Order...";


    try {

        // =====================================
        // API REQUEST
        // =====================================

        const response =
            await apiRequest(
                ORDER_API + "/orders",
                {
                    method: "POST",

                    body: JSON.stringify({

                        productName:
                            productName,

                        quantity:
                            quantity,

                        price:
                            price

                    })
                }
            );


        if (!response) {

            return;
        }


        const data =
            await response.json();


        // =====================================
        // SUCCESS
        // =====================================

        if (response.ok) {

            showMessage(
                "Order created successfully!",
                "success"
            );


            document
                .getElementById(
                    "createOrderForm"
                )
                .reset();


            // Redirect to orders page

            setTimeout(function () {

                window.location.href =
                    "/orders";

            }, 1200);


        } else {

            // =================================
            // BACKEND ERROR
            // =================================

            let errorMessage =
                "Unable to create order.";


            if (typeof data === "string") {

                errorMessage = data;

            } else if (data.message) {

                errorMessage =
                    data.message;

            }


            showMessage(
                errorMessage,
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Create Order Error:",
            error
        );


        showMessage(
            "Unable to connect to Order Service.",
            "error"
        );

    } finally {

        button.disabled = false;

        button.textContent =
            "Create Order";

    }

}


// =========================================
// SHOW MESSAGE
// =========================================

function showMessage(message, type) {

    const element =
        document.getElementById(
            "createOrderMessage"
        );


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
