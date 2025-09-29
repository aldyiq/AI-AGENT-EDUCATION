import matplotlib.pyplot as plt

def simulasi_grafik(suhu_awal, suhu_akhir, waktu_total):
    waktu = list(range(waktu_total + 1))
    perubahan_suhu = [
        suhu_awal + ((suhu_akhir - suhu_awal) * t / waktu_total)
        for t in waktu
    ]
    plt.plot(waktu, perubahan_suhu, marker='o')
    plt.xlabel('Waktu (detik)')
    plt.ylabel('Suhu (°C)')
    plt.title('Simulasi Perubahan Suhu terhadap Waktu')
    plt.grid(True)
    plt.show()