document.addEventListener("DOMContentLoaded", function () {

    console.log("Edit Order page loaded");


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
    // GET ORDER ID
    // =====================================

    const params =
        new URLSearchParams(
            window.location.search
        );

    const orderId =
        params.get("id");


    if (!orderId) {

        showError();

        return;
    }


    // =====================================
    // LOAD ORDER
    // =====================================

    loadOrder(orderId);


    // =====================================
    // FORM SUBMIT
    // =====================================

    const form =
        document.getElementById(
            "editOrderForm"
        );

    form.addEventListener(
        "submit",
        function (event) {

            updateOrder(
                event,
                orderId
            );

        }
    );

});


// =========================================
// LOAD ORDER
// =========================================

async function loadOrder(id) {

    try {

        const response =
            await apiRequest(
                ORDER_API + "/orders/" + id
            );


        if (!response) {

            return;
        }


        if (!response.ok) {

            showError();

            return;
        }


        const order =
            await response.json();


        // Fill form

        document.getElementById(
            "productName"
        ).value = order.productName;


        document.getElementById(
            "quantity"
        ).value = order.quantity;


        document.getElementById(
            "price"
        ).value = order.price;


        // Hide loading

        document.getElementById(
            "loading"
        ).classList.add("hidden");


        // Show form

        document.getElementById(
            "editOrderForm"
        ).classList.remove("hidden");


    } catch (error) {

        console.error(
            "Load Order Error:",
            error
        );

        showError();

    }

}


// =========================================
// UPDATE ORDER
// =========================================

async function updateOrder(
    event,
    id
) {

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
            "updateOrderButton"
        );


    button.disabled = true;

    button.textContent =
        "Updating...";


    try {

        const response =
            await apiRequest(
                ORDER_API + "/orders/" + id,
                {
                    method: "PUT",

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


        if (response.ok) {

            showMessage(
                "Order updated successfully!",
                "success"
            );


            setTimeout(function () {

                window.location.href =
                    "/orders";

            }, 1200);


        } else {

            let message =
                "Unable to update order.";


            if (typeof data === "string") {

                message = data;

            } else if (data.message) {

                message = data.message;

            }


            showMessage(
                message,
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Update Order Error:",
            error
        );


        showMessage(
            "Unable to connect to Order Service.",
            "error"
        );


    } finally {

        button.disabled = false;

        button.textContent =
            "Update Order";

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
            "editOrderMessage"
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


// =========================================
// SHOW ERROR
// =========================================

function showError() {

    document.getElementById(
        "loading"
    ).classList.add("hidden");


    document.getElementById(
        "editOrderForm"
    ).classList.add("hidden");


    document.getElementById(
        "errorState"
    ).classList.remove("hidden");

}
