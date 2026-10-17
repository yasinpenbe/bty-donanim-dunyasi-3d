# BTY.5.1.5. Bilgisayar Sistemlerini Çözümleyebilme
## 3D Etkileşimli Öğrenme ve Montaj Modülü

Bu proje, 5. sınıf Bilişim Teknolojileri ve Yazılım (BTY) dersi **BTY.5.1.5.** kazanımı doğrultusunda hazırlanmış; 3 boyutlu, etkileşimli, sesli anlatımlı ve oyunlaştırılmış bir Web uygulamasıdır.

---

### 🎯 Hedef Kitle ve Öğrenme Çıktıları
* **Hedef Kitle:** 5. Sınıf Öğrencileri (10-12 Yaş)
* **Kazanımlar:**
  * **a)** Bilgisayar sistemlerinin temel bileşenlerini (iç ve dış donanım birimleri) belirler.
  * **b)** Bilgisayar sistemlerinin temel bileşenleri arasındaki ilişkileri, veri akışını ve bağlantı yuvalarını belirler.

---

### 🚀 Modül Özellikleri ve Bölümler

#### 1. 🖥️ 3D Donanım Rehberi (Temel Bileşenler)
* **16 Donanım Birimi:**
  * **İç Donanım:** Anakart, İşlemci (CPU), RAM Bellek, SSD / Sabit Disk, Ekran Kartı (GPU), Güç Kaynağı (PSU), Soğutucu Fan
  * **Dış Donanım - Giriş Birimleri:** Klavye, Fare, Mikrofon, Web Kamerası, Barkod Okuyucu
  * **Dış Donanım - Çıkış Birimleri:** Ekran (Monitör), Hoparlör / Kulaklık, Yazıcı, Projeksiyon Cihazı
* **3D Etkileşim:** 360° döndürme, yakınlaştırma/uzaklaştırma, otomatik dönüş, podyum ışıklandırması.
* **Sesli Anlatım (TTS):** Web Speech API kullanılarak Türkçe net ve akıcı sesli okuma.
* **5. Sınıf Benzetimleri:** Beyin (CPU), Çalışma Masası (RAM), Kütüphane (SSD), Şehir Meydanı (Anakart), Ressam (GPU), Kalp (PSU), Klima (Fan).

#### 2. 🎮 Etkinlik 1: Eşleştirme Oyunu
* İki sütunlu (Tanım ve Donanım Kartları) sürükle-bırak ve tıklamalı eşleştirme mekaniği.
* Akıllı tahtalarda ve tabletlerde dokunarak eşleştirme desteği.
* Doğru yanıtta yeşil onay ve başarı melodisi, yanlış yanıtta kırmızı uyarı ve eski yerine dönüş.
* Puan, seri (streak) ve konfeti kutlaması.

#### 3. 🐠 Etkinlik 2: Donanımı Bul (Akvaryum Oyunu)
* Ekranın üstünde sabit tanım ve sesli okuma butonu.
* Akvaryum içinde sağdan sola dalgalı fizikle yüzen donanım baloncukları.
* Doğru baloncuk seçildiğinde patlama animasyonu ve onay sesi.
* Yanlış seçimde kırmızı geri bildirim ve öğrencinin öğrenmesi için doğru olan baloncuğun yeşil ışıkla vurgulanması.

#### 4. 🧩 Etkinlik 3: Anakart Yerleşim Oyunu (3D Montaj)
* Gerçekçi 3D Anakart ve parlayan interaktif soketler (CPU soketi, RAM slotu, PCIe yuvası, M.2 yuvası, fan montaj alanı, 24-pin ATX güç soketi).
* Parçayı seçip anakart üzerindeki yuvaya yerleştirme.
* Parçalar doğru yuvaya oturduğunda mekanik "KLİK" kilitleme sesi.
* Tüm parçalar takıldığında bilgisayarın açılış sekansı: RGB ışık dalgası, dönen fan pervaneleri, açılış sesi ve kutlama.

---

### 💻 Nasıl Çalıştırılır?

#### Yöntem 1: Tek Tıkla Başlatma (Windows)
Klasördeki `baslat.bat` dosyasına çift tıklayın. Tarayıcınızda otomatik olarak açılacaktır.

#### Yöntem 2: Komut Satırı ile
```bash
npm install
npm run dev
```

#### Yöntem 3: Üretim Sürümü (Build)
```bash
npm run build
npm run preview
```
