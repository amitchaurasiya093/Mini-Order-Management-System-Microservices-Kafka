
// =====================================================
// API CONFIGURATION
// =====================================================

// Auth Service
const AUTH_API = "http://localhost:8081";

// Order Service
const ORDER_API = "http://localhost:8082";


// =====================================================
// GET JWT TOKEN
// =====================================================

function getToken() {

    return localStorage.getItem("token");

}


// =====================================================
// SAVE JWT TOKEN
// =====================================================

function saveToken(token) {

    localStorage.setItem("token", token);

}


// =====================================================
// REMOVE JWT TOKEN
// =====================================================

function removeToken() {

    localStorage.removeItem("token");

}


// =====================================================
// CHECK LOGIN
// =====================================================

function isLoggedIn() {

    return getToken() !== null;

}


// =====================================================
// API REQUEST WITH JWT
// =====================================================

async function apiRequest(url, options = {}) {

    const token = getToken();


    // Create headers if not available

    options.headers = options.headers || {};


    // Content-Type

    if (!options.headers["Content-Type"]) {

        options.headers["Content-Type"] =
            "application/json";

    }


    // Add JWT

    if (token) {

        options.headers["Authorization"] =
            "Bearer " + token;

    }


    try {

        const response =
            await fetch(url, options);


        // If JWT expired / invalid

        if (response.status === 401) {

            removeToken();

            window.location.href = "/login";

            return null;

        }


        return response;

    } catch (error) {

        console.error(
            "API Request Error:",
            error
        );

        throw error;

    }

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    removeToken();

    window.location.href = "/login";

}
