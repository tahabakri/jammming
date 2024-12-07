const clientId = '5f94f71228ab42a4ad4a99a07e74ea67';  // Replace with your Client ID
const clientSecret = '0474b568395d4ea49a6f35303af9041a';  // Replace with your Client Secret
const redirectUri = 'http://localhost:3001/callback'; // Make sure this matches your Spotify app redirect URI

let accessToken = '';

const Spotify = {
    getAccessToken() {
        // Check if we already have a token, if not request one.
        if (accessToken) return accessToken;

        // If no access token, check the URL for a hash with access token info.
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const token = urlParams.get('access_token');

        // If there's an access token in the URL, store it and return.
        if (token) {
            accessToken = token;
            window.history.pushState('Access Token', null, '/'); // Clean URL
            return accessToken;
        }

        // If no token, redirect the user to Spotify's authentication page
        const authEndpoint = 'https://accounts.spotify.com/authorize';
        const scope = 'user-library-read user-read-private playlist-modify-public playlist-modify-private';
        const responseType = 'token';
        const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

        window.location = authUrl; // Redirect user to login and authorize.
    },

    search(term) {
        const accessToken = this.getAccessToken();
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        )
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) return [];
                return jsonResponse.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }));
            });
    },
};

export default Spotify;
