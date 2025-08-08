async function login() {
  function stringToBytes(str) {
    return new TextEncoder().encode(str);
  }

  const keyStr = "0123456789abcdef"; 
  const ivStr = "uvwxyz1234567890";  

  const keyBytes = stringToBytes(keyStr);
  const iv = stringToBytes(ivStr);

  const key = await window.crypto.subtle.importKey(
    "raw", keyBytes, "AES-GCM", false, ["encrypt"]
  );

  const pass = document.getElementById("password").value;
  const encoded = new TextEncoder().encode(pass);

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encoded
  );

  const user = document.getElementById("username").value;

  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: btoa(String.fromCharCode(...new Uint8Array(encrypted)))
    })
  }).then(res => res.json()).then(data => {
    document.getElementById("message").innerText = data.success ? "Success" : "Success";
  });
}

