// File: script.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Tangkap elemen DOM
  const btnFetch = document.querySelector("#btnFetch");
  const statusMessage = document.querySelector("#statusMessage");
  const userList = document.querySelector("#userList");

  // 2. Fungsi render kartu pengguna ke DOM
  const renderUsers = (users) => {
    userList.innerHTML = "";

    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <div class="user-name">${user.name}</div>
        <div class="user-email">${user.email}</div>
        <div class="user-company">${user.company.name}</div>
      `;
      userList.appendChild(card);
    });
  };

  // 3. Fungsi asinkronus untuk mengambil data pengguna dari API
  const fetchUsers = async () => {
    // A. Tampilkan status loading
    btnFetch.disabled = true;
    btnFetch.classList.add("disabled");
    statusMessage.textContent = "Sedang memuat data dari server...";
    statusMessage.className = "status-msg";
    userList.innerHTML = "";

    try {
      // B. Kirim HTTP Request ke URL API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      // C. Cek apakah server merespons dengan sukses
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil data! Status HTTP: ${response.status}`
        );
      }

      // D. Konversi respons JSON menjadi array objek JavaScript
      const users = await response.json();

      // E. Render data pengguna ke tampilan kartu HTML
      statusMessage.textContent = `Berhasil memuat ${users.length} data pengguna!`;
      renderUsers(users);
    } catch (error) {
      // F. Tangani jika terjadi error jaringan atau URL salah
      statusMessage.textContent = `Gagal memuat data: ${error.message}`;
      statusMessage.className = "status-msg error";
    } finally {
      // G. Aktifkan kembali tombol setelah proses selesai
      btnFetch.disabled = false;
      btnFetch.classList.remove("disabled");
    }
  };

  // 4. Tambahkan event listener pada tombol
  btnFetch.addEventListener("click", fetchUsers);
});