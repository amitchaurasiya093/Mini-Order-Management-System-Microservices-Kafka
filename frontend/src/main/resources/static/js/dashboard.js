document.addEventListener("DOMContentLoaded", async function () {

    console.log("Dashboard loaded");


    // ===============================
    // CHECK LOGIN
    // ===============================

    if (!isLoggedIn()) {

        window.location.href = "/login";

        return;
    }


    // ===============================
    // DISPLAY USERNAME
    // ===============================

    const username =
        localStorage.getItem("username");

    const usernameElement =
        document.getElementById("username");

    if (usernameElement && username) {

        usernameElement.textContent = username;
    }


    // ===============================
    // LOGOUT
    // ===============================

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


    // ===============================
    // LOAD ORDER STATISTICS
    // ===============================

    await loadOrderStatistics();

});


// =====================================
// LOAD ORDER STATISTICS
// =====================================

async function loadOrderStatistics() {

    try {

        console.log("Loading order statistics...");


        // ---------------------------------
        // GET ALL ORDERS
        // ---------------------------------

        const allOrdersResponse =
            await apiRequest(
                ORDER_API + "/orders"
            );


        if (!allOrdersResponse) {

            return;
        }


        if (!allOrdersResponse.ok) {

            console.error(
                "Failed to load all orders"
            );

            return;
        }


        const allOrders =
            await allOrdersResponse.json();


        // ---------------------------------
        // TOTAL ORDERS
        // ---------------------------------

        const totalOrdersElement =
            document.getElementById("totalOrders");


        if (totalOrdersElement) {

            totalOrdersElement.textContent =
                allOrders.length;
        }


        // ---------------------------------
        // GET MY ORDERS
        // ---------------------------------

        const myOrdersResponse =
            await apiRequest(
                ORDER_API + "/orders/my-orders"
            );


        if (!myOrdersResponse) {

            return;
        }


        if (!myOrdersResponse.ok) {

            console.error(
                "Failed to load my orders"
            );

            return;
        }


        const myOrders =
            await myOrdersResponse.json();


        // ---------------------------------
        // MY ORDERS
        // ---------------------------------

        const myOrdersElement =
            document.getElementById("myOrders");


        if (myOrdersElement) {

            myOrdersElement.textContent =
                myOrders.length;
        }


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

        const message =
            document.getElementById(
                "dashboardMessage"
            );


        if (message) {

            message.textContent =
                "Unable to load order information.";

            message.className =
                "mt-6 text-center text-sm text-red-600";
        }

    }

}
