import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../H_FormsCSS/GoogleLogin.css";

const GoogleLogin = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        // Handle Google OAuth callback
        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const error = params.get("error");

            if (error) {
                setError(error);
                return;
            }

            if (code) {
                try {
                    // Exchange code for token
                    const response = await axios.post("http://localhost:1001/auth/google/callback", { code });
                    
                    if (response.data.token) {
                        // Store token in cookie
                        Cookies.set("token", response.data.token, { expires: 21 }); // 21 days expiry
                        
                        // Store user info in cookies
                        Cookies.set("Username", response.data.user.name, { expires: 21 });
                        Cookies.set("Useremail", response.data.user.email, { expires: 21 });
                        
                        // Redirect to home page
                        window.location.href = "/";
                    }
                } catch (err) {
                    setError("Failed to authenticate user");
                    console.error("Auth error:", err);
                }
            }
        };

        handleCallback();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            // Get Google OAuth URL from backend
            const response = await axios.get("http://localhost:1001/auth/google/url");
            
            if (response.data.url) {
                // Redirect to Google login page in the same tab
                window.location.href = response.data.url;
            } else {
                setError("Failed to get Google login URL");
            }
        } catch (err) {
            setError("Failed to initiate Google login");
            console.error("Google login error:", err);
        }
    };

    return (
        <div className="google-login-container">
            <div className="google-login-content">
                <h1>Welcome to Fluffy</h1>
                <p>Please sign in to continue</p>
                
                <div className="google-login-button" onClick={handleGoogleLogin}>
                    <img 
                        src="https://www.google.com/favicon.ico" 
                        alt="Google icon" 
                        className="google-icon"
                    />
                    <span>Sign in with Google</span>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleLogin;