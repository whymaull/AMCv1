

// Fungsi untuk login mekanik
async function loginMekanik(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Login berhasil!");
    window.location.href = "/index.html";
  } else {
    alert(data.message || "Login gagal.");
  }
}

// Fungsi untuk register mekanik
async function registerMekanik(event) {
  event.preventDefault();
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "/login.html";
  } else {
    alert(data.message || "Registrasi gagal.");
  }
}

// Fungsi logout
async function logoutMekanik() {
  const res = await fetch("/api/auth/logout");
  if (res.ok) {
    window.location.href = "/login.html";
  }
}

// Fungsi untuk cek apakah mekanik sudah login
async function cekSession() {
  const res = await fetch("/api/auth/me");
  if (!res.ok) {
    window.location.href = "/login.html";
  }
}
