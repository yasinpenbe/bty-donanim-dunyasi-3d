# BTY.5.1.5. Bilgisayar Sistemlerini Çözümleyebilme
## 3D Etkileşimli Öğrenme Modülü İçerik ve Tasarım Dokümanı

**Hedef Kitle:** 5. Sınıf Öğrencileri (10-12 Yaş)  
**Öğrenme Çıktıları:**
- **a)** Bilgisayar sistemlerinin temel bileşenlerini belirler.
- **b)** Bilgisayar sistemlerinin temel bileşenleri arasındaki ilişkileri belirler.

---

## 1. Menü ve Uygulama Mimari Yapısı

Uygulama ana ekranında iki ana kategori yer alacaktır:

1. **Temel Bileşenler (Donanımlar)**
   * **İç Donanım Birimleri**
   * **Dış Donanım Birimleri (Çevre Birimleri)**
     * Giriş Birimleri
     * Çıkış Birimleri
2. **Etkinlikler**
   * **Etkinlik 1:** Eşleştirme Oyunu
   * **Etkinlik 2:** Donanımı Bul (Akvaryum Oyunu)
   * **Etkinlik 3:** Anakart Yerleşim Oyunu (3D Montaj)

---

## 2. Donanım Birimleri ve 5. Sınıf Seviyesine Uygun Tanımları

### A. İç Donanım Birimleri
*(Bilgisayar kasasının veya cihazın içinde yer alan, bilgisayarın çalışmasını sağlayan temel parçalardır.)*

* **Anakart (Motherboard)**
  * **Tanım:** Bilgisayarın "şehir meydanı" veya "iskeletidir". Tüm iç ve dış donanım birimleri anakarta bağlanır. Parçaların birbiriyle haberleşmesini sağlar.
* **İşlemci / CPU (Central Processing Unit)**
  * **Tanım:** Bilgisayarın "beynidir". Yaptığımız tüm işlemleri, hesaplamaları ve komutları çok hızlı bir şekilde düşünür ve sonuçlandırır.
* **RAM Bellek (Geçici Bellek)**
  * **Tanım:** Bilgisayarın "çalışma masasıdır". O an açık olan oyunlar, programlar ve dosyalar burada tutulur. Bilgisayar kapandığında üzerindeki tüm bilgiler silinir.
* **Sabit Disk / SSD - HDD (Kalıcı Bellek)**
  * **Tanım:** Bilgisayarın "kütüphanesi" veya "depo odasıdır". Fotoğraflarımız, videolarımız, oyunlarımız ve dosyalarımız bilgisayar kapalı olsa bile burada güvenle saklanır.
* **Ekran Kartı (GPU)**
  * **Tanım:** Bilgisayarın "gözü ve ressamıdır". Bilgisayardaki görüntüleri işler ve ekrana yansıtır. Oyunların ve videoların kaliteli görünmesini sağlar.
* **Güç Kaynağı / PSU (Power Supply)**
  * **Tanım:** Bilgisayarın "kalbidir". Prizden aldığı elektriği bilgisayar parçalarının kullanabileceği seviyeye düşürür ve ihtiyaç duyan her parçaya dağıtır.
* **Soğutucu Fan (Cooler)**
  * **Tanım:** Bilgisayarın "klimasıdır". Çalışırken ısınan parçaları (özellikle işlemciyi) soğutarak bilgisayarın bozulmasını ve yavaşlamasını önler.

---

### B. Dış Donanım Birimleri (Çevre Birimleri)
*(Kasanın dışından kablo veya kablosuz olarak bilgisayara bağlanan, bilgi girişi veya çıkışı sağlayan birimlerdir.)*

#### 1. Giriş Birimleri (Bilgisayara Bilgi Aktaranlar)
* **Klavye:** Üzerindeki harfler, sayılar ve semboller sayesinde bilgisayara yazı yazmamızı ve komut vermemizi sağlar.
* **Fare (Mouse):** Ekranda gördüğümüz ok simgesini (imleç) hareket ettirerek istediğimiz nesnelere tıklamamızı ve yönetmemizi sağlar.
* **Mikrofon:** Sesimizi bilgisayara aktarmamızı sağlar. İnternetten konuşurken veya ses kaydı yaparken kullanılır.
* **Web Kamerası (Webcam):** Görüntümüzü bilgisayara aktarır. Canlı derslerde ve görüntülü aramalarda kullanılır.
* **Barkod Okuyucu / QR Okuyucu:** Marketlerde veya kütüphanelerde ürünlerin üzerindeki çizgileri okuyarak bilgiyi bilgisayara aktarır.

#### 2. Çıkış Birimleri (Bilgisayardan Bize Bilgi Sunanlar)
* **Ekran (Monitör):** Bilgisayarda yapılan tüm işlemleri, yazıları, resimleri ve videoları görmemizi sağlayan görsel birimdir.
* **Hoparlör / Kulaklık:** Bilgisayardaki müzikleri, oyun seslerini ve videoların sesini duymamızı sağlar.
* **Yazıcı (Printer):** Bilgisayar ekranında gördüğümüz yazı, resim ve ödevleri kâğıda basmamızı sağlar.
* **Projeskiyon Cihazı:** Bilgisayardaki görüntüyü büyüterek duvara veya beyaz perdeye yansıtan araçtır.

---

## 3. 3D Görsel Etkileşim ve Ses Modülü Özellikleri

* **Herhangi bir donanım adına tıklandığında:**
  1. İlgili parçanın **3D Modeli** ekranın merkezinde belirir.
  2. Kullanıcı modeli sağa, sola, yukarı ve aşağı 360 derece döndürebilir, yakınlaştırıp uzaklaştırabilir.
  3. Modelin alt kısmında okunaklı, büyük font ile 5. sınıf seviyesine uygun **ayrıntılı tanım** metni yer alır.
  4. Tanım metni **sesli olarak** Türkçe metin okuma (TTS) veya önceden kaydedilmiş net bir seslendirme ile okunur.

---

## 4. Etkinlikler Bölümü Kurgu ve Mekanikleri

### Etkinlik 1: Eşleştirme Oyunu
* **Yapı:** İki sütunlu sürükle-bırak mekaniği.
* **İçerik:** Bir tarafta kısa tanımlar, diğer tarafta küçük donanım görselleri ve isimleri.
* **Etkileşim:** Öğrenci doğru görseli doğru tanımın yanına eşleştirir.
* **Geribildirim:** Doğru eşleştirmede yeşil çerçeve ve onay sesi; yanlış eşleştirmede kırmızı uyarı ve parçanın yerine dönmesi.

### Etkinlik 2: Donanımı Bul (Akvaryum Oyunu)
* **Yapı:** Hareketli görsel ve metin seçimi.
* **İçerik:**
  * Ekranın üst kısmında sabit bir tanım metni yer alır.
  * Akvaryum ekranında sağdan sola yüzen balıklar/baloncuklar içinde **Donanım Görseli + Donanım İsmi** birlikte hareket eder.
* **Geri Bildirim:**
  * Doğru yanıt seçildiğinde nesne **yeşil** yanar, onay sesi çalar ve sonraki soruya geçilir.
  * Yanlış yanıt seçildiğinde seçilen nesne **kırmızı** yanar, doğru olan nesne **yeşil** yanarak vurgulanır ve öğrenci doğrusunu gördükten sonra yeni soruya geçilir.

### Etkinlik 3: Anakart Yerleşim Oyunu (3D Montaj)
* **Yapı:** 3D interaktif montaj/puzzle simülasyonu.
* **İçerik:** Ekranda boş yuvaları (soket, slotlar vb.) olan 3D Anakart ve kenarda takılmayı bekleyen iç donanım parçaları.
* **Etkileşim:** Öğrenci parçaları anakart üzerindeki doğru yuvalara yerleştirir.
* **Geri Bildirim:**
  * Doğru yerleşimde yuva **yeşil** yanar, parça yerine oturur ve sabitlenir.
  * Yanlış yerleşimde yuva/parça **kırmızı** yanar ve parça yerine oturmayarak eski paneline geri döner.