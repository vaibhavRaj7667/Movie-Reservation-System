import React from 'react';

const RefreshToken = () => {
    const urls = import.meta.env.VITE_API_URL;

    const handleRefresh = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            console.log('Token refreshed successfully:', data);
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    };

    handleRefresh()
    // return (
    //     <div>
    //         <h2>Refresh Token</h2>
    //         <button onClick={handleRefresh}>Refresh Token</button>
    //     </div>
    // );
};

export default RefreshToken;
