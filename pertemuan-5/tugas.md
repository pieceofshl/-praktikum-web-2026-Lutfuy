BAB 3: TUGAS MANDIRI
• Fitur 1 - Penghitung Jumlah Tugas (Task Counter): Tambahkan elemen teks di bawah judul atau di
atas daftar tugas untuk menampilkan ringkasan jumlah tugas secara dinamis. Contoh format: 'Total:
3 Tugas | Selesai: 1 | Belum Selesai: 2'. Angka ini harus otomatis diperbarui setiap kali tugas
ditambah, dicoret, atau dihapus.

• Fitur 2 - Tombol 'Bersihkan Tugas Selesai': Tambahkan satu tombol bertuliskan 'Bersihkan Tugas
Selesai' di bagian bawah daftar tugas. Ketika tombol ini diklik, aplikasi hanya menghapus tugas-tugas
yang berstatus completed: true dari LocalStorage, sementara tugas yang belum selesai tetap
tersimpan dengan aman.

Fitur 3 - Konfirmasi Sebelum Menghapus (Confirm Dialog): Saat pengguna mengklik tombol 'Hapus'
pada salah satu tugas, tampilkan dialog konfirmasi bawaan peramban menggunakan
confirm('Apakah Anda yakin ingin menghapus tugas ini?'). Jika pengguna menekan 'OK', barulah
tugas dihapus; jika menekan 'Cancel', tugas batal dihapus.