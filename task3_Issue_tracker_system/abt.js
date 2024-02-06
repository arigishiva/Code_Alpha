let currentUser = null;
function login() {
            const username = prompt("Enter your username:");
            if (username) {
                currentUser = username;
                showApp();
            }
        }

        function logout() {
            currentUser = null;
            hideApp();
        }

        function showApp() {
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'block';
            document.getElementById('app').style.display = 'block';
        }

        function hideApp() {
            document.getElementById('loginBtn').style.display = 'block';
            document.getElementById('logoutBtn').style.display = 'none';
            document.getElementById('app').style.display = 'none';
        }

        

        

    