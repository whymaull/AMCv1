

async function tampilkanLaporan() {
  const res = await fetch("/api/riwayat/statistik");
  if (!res.ok) {
    alert("Gagal memuat data laporan.");
    return;
  }

  const data = await res.json(); // format: [{ diagnosis: "Busi rusak", jumlah: 5 }, ...]
  const labels = data.map(item => item.diagnosis);
  const jumlah = data.map(item => item.jumlah);

  const ctx = document.getElementById("laporanChart").getContext("2d");
  new Chart(ctx, {
    type: "bar", // Ganti ke "pie" jika mau pie chart
    data: {
      labels: labels,
      datasets: [{
        label: "Jumlah Diagnosa",
        data: jumlah,
        backgroundColor: generateWarna(labels.length),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Statistik Diagnosa Kerusakan Motor' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Fungsi bantu buat warna dinamis
function generateWarna(jumlah) {
  const warna = [];
  for (let i = 0; i < jumlah; i++) {
    warna.push(`hsl(${(i * 40) % 360}, 70%, 60%)`);
  }
  return warna;
}

window.onload = tampilkanLaporan;
