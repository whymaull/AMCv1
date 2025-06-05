

let semuaGejala = [];
let semuaDiagnosis = [];
let semuaRule = [];

let gejalaTerpilih = [];  // Akan diisi sesuai input
let hasilDiagnosis = null;

// Load data dari API (gejala, diagnosis, rulebase)
async function loadKnowledgeBase() {
  const [gejalaRes, diagnosisRes, ruleRes] = await Promise.all([
    fetch("/api/gejala"),
    fetch("/api/diagnosis"),
    fetch("/api/rulebase"),
  ]);

  semuaGejala = await gejalaRes.json();
  semuaDiagnosis = await diagnosisRes.json();
  semuaRule = await ruleRes.json();
}

// Fungsi backward chaining utama
async function mulaiDiagnosis(gejalaAwal) {
  await loadKnowledgeBase();
  gejalaTerpilih = [gejalaAwal];

  // Coba cari diagnosis dari rule yang cocok
  for (const rule of semuaRule) {
    const ruleGejala = rule.gejala; // array of id_gejala
    const diagnosis = semuaDiagnosis.find(d => d.id === rule.id_diagnosis);

    const semuaGejalaDipenuhi = ruleGejala.every(gid => {
      if (gejalaTerpilih.includes(gid)) return true;
      // Tanya ke mekanik (via confirm, nanti ganti UI real)
      const g = semuaGejala.find(x => x.id === gid);
      const jawab = confirm(`Apakah motor mengalami: ${g.nama}?`);
      if (jawab) gejalaTerpilih.push(gid);
      return jawab;
    });

    if (semuaGejalaDipenuhi) {
      hasilDiagnosis = diagnosis.nama;
      break;
    }
  }

  if (hasilDiagnosis) {
    alert(`Hasil Diagnosis: ${hasilDiagnosis}`);
  } else {
    alert("Tidak ditemukan diagnosis berdasarkan gejala yang dipilih.");
  }

  return hasilDiagnosis;
}
