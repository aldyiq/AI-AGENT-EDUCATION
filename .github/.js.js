// Fungsi perhitungan kalor
function hitungKalor(massa, kalorJenis, suhuAwal, suhuAkhir) {
    const deltaT = suhuAkhir - suhuAwal;
    const Q = massa * kalorJenis * deltaT;
    return { Q, deltaT };
}

// Debugging & validasi input
function cekInput(m, c, T1, T2) {
    let pesan = [];
    if (m <= 0) pesan.push("Massa harus lebih dari 0.");
    if (c <= 0) pesan.push("Kalor jenis harus lebih dari 0.");
    if (T1 < -273.15 || T2 < -273.15) pesan.push("Suhu di bawah -273.15°C tidak diperbolehkan (nol mutlak).");
    if (T1 === T2) pesan.push("Tidak ada perubahan suhu.");
    return pesan.length ? pesan.join("<br>") : null;
}

// Event handler utama
document.getElementById("kalorForm").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById('error').innerHTML = "";
    document.getElementById('output').innerHTML = "";
    let massa = parseFloat(document.getElementById("massa").value);
    let kalorJenis = parseFloat(document.getElementById("kalorJenis").value);
    let suhuAwal = parseFloat(document.getElementById("suhuAwal").value);
    let suhuAkhir = parseFloat(document.getElementById("suhuAkhir").value);
    let waktuTotal = parseInt(document.getElementById("waktuTotal").value);

    // Validasi/debug
    let cek = cekInput(massa, kalorJenis, suhuAwal, suhuAkhir);
    if (cek) {
        document.getElementById('error').innerHTML = cek;
        resetGrafik();
        return;
    }

    // Perhitungan
    let {Q, deltaT} = hitungKalor(massa, kalorJenis, suhuAwal, suhuAkhir);

    // Tampilkan hasil & penjelasan
    let rumus = `Q = m × c × ΔT = ${massa} × ${kalorJenis} × (${suhuAkhir} - ${suhuAwal})`;
    let keterangan = `
        <b>Rumus:</b> ${rumus}<br>
        <b>Hasil:</b> Q = ${numberFormat(Q)} Joule<br>
        <b>Kenaikan suhu (ΔT):</b> ${deltaT}°C
    `;
    document.getElementById('output').innerHTML = keterangan;

    // Visualisasi grafik suhu
    visualisasiGrafik(suhuAwal, suhuAkhir, waktuTotal);
});

var chart = null;

function visualisasiGrafik(suhuAwal, suhuAkhir, waktuTotal) {
    const waktu = [];
    const suhu = [];
    for (let t=0; t<=waktuTotal; t++) {
        waktu.push(t);
        suhu.push(suhuAwal + ((suhuAkhir-suhuAwal) * t/waktuTotal));
    }

    const ctx = document.getElementById('grafikSuhu').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: waktu,
            datasets: [{
                label: 'Suhu (°C)',
                data: suhu,
                fill: false,
                borderColor: '#3a5cee',
                backgroundColor: '#5169e2',
                tension: 0.09,
                pointRadius: 2.5,
                pointBackgroundColor: '#3a5cee',
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: "Waktu (detik)",
                        color: "#233",
                        font: { weight: '700' }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "Suhu (°C)",
                        color: "#233",
                        font: { weight: '700' }
                    }
                }
            }
        }
    });
}

function resetGrafik() {
    if (chart) {
        chart.destroy();
        chart = null;
    }
    let ctx = document.getElementById('grafikSuhu').getContext('2d');
    ctx.clearRect(0, 0, 400, 200);
}

function numberFormat(x) {
    return x.toLocaleString('id-ID', {maximumFractionDigits: 2});
}