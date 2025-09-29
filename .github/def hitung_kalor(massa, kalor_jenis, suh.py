def hitung_kalor(massa, kalor_jenis, suhu_awal, suhu_akhir):
    delta_T = suhu_akhir - suhu_awal
    Q = massa * kalor_jenis * delta_T
    return Q, delta_T