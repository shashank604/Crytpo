const key = CryptoJS.enc.Utf8.parse("My$ecretKey@1234"); 
const iv  = CryptoJS.enc.Utf8.parse("InitVector@2025!"); 

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const encrypted = CryptoJS.AES.encrypt(pass, key, { iv: iv });
  
  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: encrypted.toString() })
  }).then(res => res.json()).then(data => {
    document.getElementById("message").innerText = data.success ? "Success" : "Success";
  });
}