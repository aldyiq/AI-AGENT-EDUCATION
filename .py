def agent_interaktif():
    try:
        massa = float(input("Massa (kg): "))
        kalor_jenis = float(input("Kalor Jenis (J/kg°C): "))
        suhu_awal = float(input("Suhu Awal (°C): "))
        suhu_akhir = float(input("Suhu Akhir (°C): "))
        waktu_total = int(input("Durasi pemanasan (detik): "))

        # Cek & Debug Input
        error = cek_input(massa, kalor_jenis, suhu_awal, suhu_akhir)
        if error:
            print(error)
            return

        # Perhitungan Kalor
        Q, delta_T = hitung_kalor(massa, kalor_jenis, suhu_awal, suhu_akhir)
        print(f"Rumus: Q = m × c × ΔT = {massa} × {kalor_jenis} × ({suhu_akhir} - {suhu_awal})")
        print(f"Kalor yang dibutuhkan: {Q:.2f} Joule (Kenaikan suhu {delta_T:.2f}°C)")

        # Visualisasi Proses
        print("\nMenampilkan grafik simulasi perubahan suhu...")
        simulasi_grafik(suhu_awal, suhu_akhir, waktu_total)

    except Exception as e:
        print(f"Terjadi error: {e}\nCoba cek input Anda!")

# Untuk demonstrasi, tinggal jalankan:
agent_interaktif()