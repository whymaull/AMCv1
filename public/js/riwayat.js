

async function tampilkanRiwayat() {
  const res = await fetch("/api/riwayat");
  if (!res.ok) {
    alert("Gagal memuat riwayat diagnosa.");
    return;
  }

  const data = await res.json();
  const tbody = document.getElementById("tabel-riwayat");

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Belum ada riwayat.</td></tr>`;
    return;
  }

  data.forEach((item, index) => {
    const listGejala = item.gejala.join(', '); // gejala berupa array teks
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama_pelanggan}</td>
        <td>${item.jenis_motor}</td>
        <td>${item.nomor_plat}</td>
        <td>${listGejala}</td>
        <td>${item.hasil}</td>
        <td>${formatTanggal(item.tanggal)}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function formatTanggal(waktu) {
  const date = new Date(waktu);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

window.onload = tampilkanRiwayat;
