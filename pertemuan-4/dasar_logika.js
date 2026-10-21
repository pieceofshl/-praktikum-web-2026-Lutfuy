// File: dasar_logika.js
// Praktik Dasar Sintaks, TipeData, dan Arrow FUnction

const namaProgrammer = "Luhut";
const tahunMulai = 2045;
const tahunSekarang = new Date().getFullYear();

// Arrow Function menghitung masa pengalaman
const hitungPengalaman = (mulai, sekarang) => sekarang - mulai;
const masaKerja = hitungPengalaman(tahunMulai, tahunSekarang);

// Evaluasi kondisi dengan Ternary Operator
const statusSenioritas = masaKerja >= 2
    ? "Mid-Level Developer"
    : "Junior Developer";

console.log("===INFORMASI PENGEMBANGAN===");
console.log(`Nama       :${namaProgrammer}`);
console.log(`Pengalaman :${masaKerja} tahun`);
console.log(`Kategori   :${statusSenioritas}`);

//Menguji Strict Equality vs Loose Equality
console.log("\n===UJI PERBANDINGAN TIPE DATA===");
console.log("10=='10' :", 10 == '10'); // true (type coercion)
console.log("10==='10' :", 10 === '10'); // false  (strict equality)
console.log("Tipe 10 :", typeof 10);
console.log("Tipe '10' :", typeof '10');