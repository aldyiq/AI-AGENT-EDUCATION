def cek_input(massa, kalor_jenis, suhu_awal, suhu_akhir):
    pesan = []
    if massa <= 0:
        pesan.append("Massa harus lebih dari 0.")
    if kalor_jenis <= 0:
        pesan.append("Kalor jenis harus lebih dari 0.")
    if suhu_awal < -273.15 or suhu_akhir < -273.15:
        pesan.append("Suhu tidak bisa di bawah -273.15°C (nol mutlak).")
    if suhu_awal == suhu_akhir:
        pesan.append("Tidak ada perubahan suhu terjadi.")
    if pesan:
        return "Kesalahan Input:\n" + "\n".join(pesan)
    return None