document.addEventListener("DOMContentLoaded", function () {

    console.log("Orders page loaded");


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
    // LOAD ORDERS
    // =====================================

    loadOrders();

});


// =========================================
// LOAD ORDERS
// =========================================

async function loadOrders() {

    const loading =
        document.getElementById("loading");

    const emptyState =
        document.getElementById("emptyState");

    const ordersContainer =
        document.getElementById("ordersContainer");

    const tableBody =
        document.getElementById("ordersTableBody");


    try {

        const response =
            await apiRequest(
                ORDER_API + "/orders"
            );


        if (!response) {

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Failed to load orders"
            );
        }


        const orders =
            await response.json();


        // Hide loading

        loading.classList.add("hidden");


        // Clear table

        tableBody.innerHTML = "";


        // =====================================
        // NO ORDERS
        // =====================================

        if (orders.length === 0) {

            emptyState.classList.remove("hidden");

            ordersContainer.classList.add("hidden");

            return;
        }


        // =====================================
        // SHOW TABLE
        // =====================================

        emptyState.classList.add("hidden");

        ordersContainer.classList.remove("hidden");


        // =====================================
        // CREATE ROWS
        // =====================================

        orders.forEach(function (order) {

            const row =
                document.createElement("tr");

            row.className =
                "hover:bg-slate-50 transition";


            row.innerHTML = `

                <td class="px-6 py-4 font-semibold text-slate-900">
                    #${order.id}
                </td>

                <td class="px-6 py-4 text-slate-700">
                    ${escapeHtml(order.productName)}
                </td>

                <td class="px-6 py-4 text-slate-700">
                    ${order.quantity}
                </td>

                <td class="px-6 py-4 font-semibold text-slate-900">
                    ₹${Number(order.price).toLocaleString("en-IN")}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${escapeHtml(order.username)}
                </td>

                <td class="px-6 py-4">

                    <div class="flex items-center
                                justify-center gap-2">

                        <a href="/edit-order?id=${order.id}"
                           class="bg-blue-600
                                  hover:bg-blue-700
                                  text-white
                                  px-3 py-2
                                  rounded-lg
                                  text-sm">

                            Edit

                        </a>

                        <button
                            onclick="deleteOrder(${order.id})"
                            class="bg-red-500
                                   hover:bg-red-600
                                   text-white
                                   px-3 py-2
                                   rounded-lg
                                   text-sm">

                            Delete

                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Load Orders Error:",
            error
        );


        loading.classList.add("hidden");


        showMessage(
            "Unable to load orders. Please try again.",
            "error"
        );

    }

}


// =========================================
// DELETE ORDER
// =========================================

async function deleteOrder(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this order?"
        );


    if (!confirmed) {

        return;
    }


    try {

        const response =
            await apiRequest(
                ORDER_API + "/orders/" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response) {

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Failed to delete order"
            );
        }


        showMessage(
            "Order deleted successfully.",
            "success"
        );


        // Reload orders

        await loadOrders();


    } catch (error) {

        console.error(
            "Delete Order Error:",
            error
        );


        showMessage(
            "Unable to delete order.",
            "error"
        );

    }

}


// =========================================
// MESSAGE
// =========================================

function showMessage(message, type) {

    const element =
        document.getElementById("ordersMessage");


    element.textContent = message;

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


    setTimeout(function () {

        element.classList.add("hidden");

    }, 3000);

}


// =========================================
// HTML ESCAPE
// =========================================

function escapeHtml(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
