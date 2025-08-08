function generateDeterministicKey() {
  const keyBytes = [];
  for (let i = 0; i < 16; i++) {
    keyBytes.push((i * 17 + 42) % 256);
  }
  return keyBytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateDeterministicIV() {
  const ivBytes = [];
  for (let i = 0; i < 16; i++) {
    ivBytes.push((i * 31 + 99) % 256);
  }
  return ivBytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function login() {
  const key = CryptoJS.enc.Hex.parse(
    Array.from({ length: 16 }, (_, i) =>
      ((i * 17 + 42) % 256).toString(16).padStart(2, "0")
    ).join("")
  );

  const iv = CryptoJS.enc.Hex.parse(
    Array.from({ length: 16 }, (_, i) =>
      ((i * 31 + 99) % 256).toString(16).padStart(2, "0")
    ).join("")
  );

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const encrypted = CryptoJS.AES.encrypt(pass, key, { iv: iv });

  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: encrypted.toString() }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("message").innerText = data.success
        ? "Success"
        : "Success";
    });
}
