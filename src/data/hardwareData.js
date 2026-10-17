/**
 * BTY.5.1.5. Bilgisayar Sistemlerini Çözümleyebilme
 * 5. Sınıf Seviyesine Uygun Donanım Birimleri Veri Seti (Gerçekçi Fotoğraflar ve 3D Modeller)
 */

export const HARDWARE_ITEMS = [
  // --- İÇ DONANIM BİRİMLERİ ---
  {
    id: 'motherboard',
    name: 'Anakart (Motherboard)',
    shortName: 'Anakart',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '🏙️',
    analogy: 'Şehir Meydanı veya İskelet',
    analogyIcon: '🏙️',
    description: "Bilgisayarın 'şehir meydanı' veya 'iskeletidir'. Tüm iç ve dış donanım birimleri anakarta bağlanır. Parçaların birbiriyle haberleşmesini sağlar.",
    shortDescription: "Tüm parçaların bağlandığı ve haberleştiği ana devre kartıdır.",
    funFact: "Üzerinde binlerce mikroskobik bakır yol bulunur. Bilgiler bu yollar üzerinden ışık hızında akar!",
    specs: {
      baglanti: "Kasa İçi",
      gorev: "Haberleşme & Bağlantı Merkezi",
      onem: "Anakart olmadan hiçbir parça birbiriyle konuşamaz!"
    },
    color: '#10b981',
    accentColor: '#059669',
    assemblySlot: 'motherboard_base',
    realPhotoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'cpu',
    name: 'İşlemci / CPU (Central Processing Unit)',
    shortName: 'İşlemci (CPU)',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '🧠',
    analogy: 'Beyin',
    analogyIcon: '🧠',
    description: "Bilgisayarın 'beynidir'. Yaptığımız tüm işlemleri, hesaplamaları ve komutları çok hızlı bir şekilde düşünür ve sonuçlandırır.",
    shortDescription: "Tüm işlemleri ve hesaplamaları saniyede milyarlarca kez yapan beyindir.",
    funFact: "Modern bir işlemci saniyede milyarlarca matematiksel işlemi göz açıp kapayıncaya kadar tamamlar!",
    specs: {
      baglanti: "Anakart CPU Soketi",
      gorev: "Hesaplama & Komut Yürütme",
      onem: "Bilgisayarın en çok çalışan ve en zeki parçasıdır."
    },
    color: '#3b82f6',
    accentColor: '#1d4ed8',
    assemblySlot: 'cpu_socket',
    realPhotoUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'ram',
    name: 'RAM Bellek (Geçici Bellek)',
    shortName: 'RAM Bellek',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '🪑',
    analogy: 'Çalışma Masası',
    analogyIcon: '🪑',
    description: "Bilgisayarın 'çalışma masasıdır'. O an açık olan oyunlar, programlar ve dosyalar burada tutulur. Bilgisayar kapandığında üzerindeki tüm bilgiler silinir.",
    shortDescription: "O an açık olan uygulamaların çalıştığı hızlı ve geçici bellektir.",
    funFact: "Çalışma masanız ne kadar geniş olursa, aynı anda o kadar çok defter ve kitap açabilirsiniz. RAM de böyledir!",
    specs: {
      baglanti: "Anakart RAM Slotları",
      gorev: "Geçici Hızlı Hafıza",
      onem: "Bilgisayar kapandığında içindekiler tamamen sıfırlanır."
    },
    color: '#8b5cf6',
    accentColor: '#6d28d9',
    assemblySlot: 'ram_slot',
    realPhotoUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'ssd',
    name: 'Sabit Disk / SSD - HDD (Kalıcı Bellek)',
    shortName: 'SSD / Sabit Disk',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '📚',
    analogy: 'Kütüphane veya Depo Odası',
    analogyIcon: '📚',
    description: "Bilgisayarın 'kütüphanesi' veya 'depo odasıdır'. Fotoğraflarımız, videolarımız, oyunlarımız ve dosyalarımız bilgisayar kapalı olsa bile burada güvenle saklanır.",
    shortDescription: "Tüm dosya, oyun ve fotoğraflarımızı kalıcı olarak saklayan depodur.",
    funFact: "Yeni nesil SSD'ler içinde hareketli parça bulunmaz; bu sayede eski disklere göre 10 kat daha hızlı açılır!",
    specs: {
      baglanti: "M.2 Slotu veya SATA Kablosu",
      gorev: "Kalıcı Veri Depolama",
      onem: "Bilgisayar kapansa bile dosyalarınız asla silinmez."
    },
    color: '#06b6d4',
    accentColor: '#0891b2',
    assemblySlot: 'ssd_slot',
    realPhotoUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'gpu',
    name: 'Ekran Kartı (GPU)',
    shortName: 'Ekran Kartı',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '🎨',
    analogy: 'Göz ve Ressam',
    analogyIcon: '🎨',
    description: "Bilgisayarın 'gözü ve ressamıdır'. Bilgisayardaki görüntüleri işler ve ekrana yansıtır. Oyunların ve videoların kaliteli görünmesini sağlar.",
    shortDescription: "Oyun ve videoların ekranda kusursuz görünmesini sağlayan görüntü ustasıdır.",
    funFact: "Ekranda gördüğünüz 3 boyutlu oyun karakterlerini ve ışık efektlerini saniyede 60'tan fazla kez baştan çizer!",
    specs: {
      baglanti: "PCIe x16 Slotu",
      gorev: "Görüntü İşleme & Çizim",
      onem: "Özellikle 3D oyunlar ve grafik tasarım için gereklidir."
    },
    color: '#f59e0b',
    accentColor: '#d97706',
    assemblySlot: 'gpu_slot',
    realPhotoUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'psu',
    name: 'Güç Kaynağı / PSU (Power Supply)',
    shortName: 'Güç Kaynağı',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '❤️',
    analogy: 'Kalp',
    analogyIcon: '❤️',
    description: "Bilgisayarın 'kalbidir'. Prizden aldığı elektriği bilgisayar parçalarının kullanabileceği seviyeye düşürür ve ihtiyaç duyan her parçaya dağıtır.",
    shortDescription: "Prizden aldığı elektriği parçaların ihtiyacına göre düzenleyip dağıtan kalptir.",
    funFact: "Prizdeki 220 voltluk güçlü elektriği, hassas parçalar için 12V, 5V ve 3.3V gibi güvenli seviyelere çevirir!",
    specs: {
      baglanti: "Kasa İçi & Güç Kabloları",
      gorev: "Enerji Dönüştürme & Dağıtma",
      onem: "Güç kaynağı olmadan hiçbir bileşene elektrik ulaşmaz."
    },
    color: '#ef4444',
    accentColor: '#dc2626',
    assemblySlot: 'psu_socket',
    realPhotoUrl: 'https://images.unsplash.com/photo-1587202372573-0fb62d37320b?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'cooler',
    name: 'Soğutucu Fan (Cooler)',
    shortName: 'Soğutucu Fan',
    category: 'internal',
    categoryLabel: 'İç Donanım',
    icon: '❄️',
    analogy: 'Klima',
    analogyIcon: '❄️',
    description: "Bilgisayarın 'klimasıdır'. Çalışırken ısınan parçaları (özellikle işlemciyi) soğutarak bilgisayarın bozulmasını ve yavaşlamasını önler.",
    shortDescription: "Isınan işlemciyi serinleterek bilgisayarın hızlı ve güvende kalmasını sağlar.",
    funFact: "İşlemciler zorlu oyunlarda 80 dereceye kadar ısınabilir. Fan olmasaydı saniyeler içinde sıcaktan kapanırdı!",
    specs: {
      baglanti: "İşlemci Üzeri & Fan Soketi",
      gorev: "Isı Tahliyesi & Soğutma",
      onem: "Parçaların aşırı sıcaktan yanmasını ve bozulmasını engeller."
    },
    color: '#0284c7',
    accentColor: '#0369a1',
    assemblySlot: 'cooler_slot',
    realPhotoUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1000&auto=format&fit=crop&q=85'
  },

  // --- DIŞ DONANIM: GİRİŞ BİRİMLERİ ---
  {
    id: 'keyboard',
    name: 'Klavye',
    shortName: 'Klavye',
    category: 'external-input',
    categoryLabel: 'Giriş Birimi (Dış)',
    icon: '⌨️',
    analogy: 'Yazı Kalemi & Kumanda',
    analogyIcon: '⌨️',
    description: "Üzerindeki harfler, sayılar ve semboller sayesinde bilgisayara yazı yazmamızı ve komut vermemizi sağlar.",
    shortDescription: "Harfler ve sayılarla bilgisayara yazı yazıp komut verdiğimiz giriş aracıdır.",
    funFact: "En yaygın kullanılan 'Q Klavye' düzeni, daktilo döneminden günümüze kadar gelmiştir!",
    specs: {
      baglanti: "USB veya Kablosuz (Bluetooth)",
      gorev: "Metin & Komut Girişi",
      tur: "Giriş Birimi (Bilgisayara bilgi aktarır)"
    },
    color: '#6366f1',
    accentColor: '#4f46e5',
    realPhotoUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'mouse',
    name: 'Fare (Mouse)',
    shortName: 'Fare (Mouse)',
    category: 'external-input',
    categoryLabel: 'Giriş Birimi (Dış)',
    icon: '🖱️',
    analogy: 'Uzatılmış Parmak',
    analogyIcon: '🖱️',
    description: "Ekranda gördüğümüz ok simgesini (imleç) hareket ettirerek istediğimiz nesnelere tıklamamızı ve yönetmemizi sağlar.",
    shortDescription: "Ekrandaki imleci yönlendirerek butonlara tıklamamızı sağlayan giriş aracıdır.",
    funFact: "İlk bilgisayar faresi 1964 yılında ahşaptan yapılmıştı ve arkasından çıkan kablo kuyruğa benzediği için 'fare' dendi!",
    specs: {
      baglanti: "USB veya Kablosuz",
      gorev: "İmleç Kontrolü & Tıklama",
      tur: "Giriş Birimi (Bilgisayara bilgi aktarır)"
    },
    color: '#ec4899',
    accentColor: '#db2777',
    realPhotoUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'microphone',
    name: 'Mikrofon',
    shortName: 'Mikrofon',
    category: 'external-input',
    categoryLabel: 'Giriş Birimi (Dış)',
    icon: '🎙️',
    analogy: 'Ses Kulağı',
    analogyIcon: '🎙️',
    description: "Sesimizi bilgisayara aktarmamızı sağlar. İnternetten konuşurken veya ses kaydı yaparken kullanılır.",
    shortDescription: "Ses dalgalarını elektrik sinyaline dönüştürüp bilgisayara aktaran giriş birimidir.",
    funFact: "Mikrofon ses titreşimlerini elektrik sinyallerine dönüştürür; bilgisayar da bu sinyalleri 1 ve 0'lara çevirir!",
    specs: {
      baglanti: "3.5mm Jak veya USB",
      gorev: "Ses Girişi & Kayıt",
      tur: "Giriş Birimi (Bilgisayara bilgi aktarır)"
    },
    color: '#14b8a6',
    accentColor: '#0d9488',
    realPhotoUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'webcam',
    name: 'Web Kamerası (Webcam)',
    shortName: 'Web Kamerası',
    category: 'external-input',
    categoryLabel: 'Giriş Birimi (Dış)',
    icon: '📷',
    analogy: 'Kamera Gözü',
    analogyIcon: '📷',
    description: "Görüntümüzü bilgisayara aktarır. Canlı derslerde ve görüntülü aramalarda kullanılır.",
    shortDescription: "Canlı video ve fotoğraflarımızı bilgisayara ileten dijital gözdür.",
    funFact: "Tarihteki ilk webcam 1991'de Cambridge Üniversitesi'nde kahve demliğinin dolu mu boş mu olduğunu görmek için icat edilmişti!",
    specs: {
      baglanti: "USB veya Dahili (Laptop)",
      gorev: "Görüntü & Video Yakalama",
      tur: "Giriş Birimi (Bilgisayara bilgi aktarır)"
    },
    color: '#f97316',
    accentColor: '#ea580c',
    realPhotoUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'barcode',
    name: 'Barkod Okuyucu / QR Okuyucu',
    shortName: 'Barkod Okuyucu',
    category: 'external-input',
    categoryLabel: 'Giriş Birimi (Dış)',
    icon: '🏷️',
    analogy: 'Lazerli Kod Okuyucu',
    analogyIcon: '🏷️',
    description: "Marketlerde veya kütüphanelerde ürünlerin üzerindeki çizgileri okuyarak bilgiyi bilgisayara aktarır.",
    shortDescription: "Ürünlerin üzerindeki çizgileri ışıkla tarayıp bilgisayara anında iletir.",
    funFact: "Barkod üzerindeki siyah çizgiler ışığı emer, beyaz boşluklar ise yansıtır. Okuyucu aslında beyaz boşlukları okur!",
    specs: {
      baglanti: "USB veya Lazer Tarayıcı",
      gorev: "Kod ve Ürün Bilgisi Girişi",
      tur: "Giriş Birimi (Bilgisayara bilgi aktarır)"
    },
    color: '#a855f7',
    accentColor: '#9333ea',
    realPhotoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=85'
  },

  // --- DIŞ DONANIM: ÇIKIŞ BİRİMLERİ ---
  {
    id: 'monitor',
    name: 'Ekran (Monitör)',
    shortName: 'Monitör / Ekran',
    category: 'external-output',
    categoryLabel: 'Çıkış Birimi (Dış)',
    icon: '🖥️',
    analogy: 'Pencere / Gösteri Sahnesi',
    analogyIcon: '🖥️',
    description: "Bilgisayarda yapılan tüm işlemleri, yazıları, resimleri ve videoları görmemizi sağlayan görsel birimdir.",
    shortDescription: "Bilgisayardaki tüm görsel sonuçları gözlerimizin önüne seren ekrandır.",
    funFact: "Monitör ekranı milyonlarca kırmızı, yeşil ve mavi (RGB) minik ışık noktasından (piksel) oluşur!",
    specs: {
      baglanti: "HDMI / DisplayPort Kablosu",
      gorev: "Görsel Çıktı Sunumu",
      tur: "Çıkış Birimi (Bilgiyi bize sunar)"
    },
    color: '#38bdf8',
    accentColor: '#0284c7',
    realPhotoUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'speaker',
    name: 'Hoparlör / Kulaklık',
    shortName: 'Hoparlör & Kulaklık',
    category: 'external-output',
    categoryLabel: 'Çıkış Birimi (Dış)',
    icon: '🔊',
    analogy: 'Müzik Kutusu / Ağız',
    analogyIcon: '🔊',
    description: "Bilgisayardaki müzikleri, oyun seslerini ve videoların sesini duymamızı sağlar.",
    shortDescription: "Bilgisayardan gelen sesleri havada titreşime çevirerek duymamızı sağlar.",
    funFact: "Hoparlörün içindeki mıknatıs ve koni saniyede binlerce kez ileri-geri titreyerek havada ses dalgası üretir!",
    specs: {
      baglanti: "3.5mm Jak, USB veya Bluetooth",
      gorev: "İşitsel Çıktı Sunumu",
      tur: "Çıkış Birimi (Bilgiyi bize sunar)"
    },
    color: '#e11d48',
    accentColor: '#be123c',
    realPhotoUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'printer',
    name: 'Yazıcı (Printer)',
    shortName: 'Yazıcı',
    category: 'external-output',
    categoryLabel: 'Çıkış Birimi (Dış)',
    icon: '🖨️',
    analogy: 'Matbaa Ustası',
    analogyIcon: '🖨️',
    description: "Bilgisayar ekranında gördüğümüz yazı, resim ve ödevleri kâğıda basmamızı sağlar.",
    shortDescription: "Ekrandaki ödev ve resimleri fiziksel kâğıda döken çıkış aracıdır.",
    funFact: "Mürekkep püskürtmeli bir yazıcı, bir saniyede kâğıda milyonlarca mikroskobik boya damlacığı püskürtür!",
    specs: {
      baglanti: "USB veya Wi-Fi Ağ Bağlantısı",
      gorev: "Kalıcı Kâğıt Baskı Çıktısı",
      tur: "Çıkış Birimi (Bilgiyi bize sunar)"
    },
    color: '#84cc16',
    accentColor: '#65a30d',
    realPhotoUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1000&auto=format&fit=crop&q=85'
  },
  {
    id: 'projector',
    name: 'Projeksiyon Cihazı',
    shortName: 'Projeksiyon Cihazı',
    category: 'external-output',
    categoryLabel: 'Çıkış Birimi (Dış)',
    icon: '📽️',
    analogy: 'Dev Sinema Işığı',
    analogyIcon: '📽️',
    description: "Bilgisayardaki görüntüyü büyüterek duvara veya beyaz perdeye yansıtan araçtır.",
    shortDescription: "Görüntüyü dev bir perdeye yansıtarak sınıfta herkesin görmesini sağlar.",
    funFact: "Sınıflarımızda ve sinemalarda kullanılan projeksiyonlar, içerisindeki güçlü lamba ve merceklerle görüntüyü onlarca kat büyütür!",
    specs: {
      baglanti: "HDMI / VGA Kablosu",
      gorev: "Geniş Alan Görsel Yansıtma",
      tur: "Çıkış Birimi (Bilgiyi bize sunar)"
    },
    color: '#fbbf24',
    accentColor: '#d97706',
    realPhotoUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1000&auto=format&fit=crop&q=85'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Tüm Donanımlar', icon: '🌐' },
  { id: 'internal', label: 'İç Donanım Birimleri', icon: '📦', description: 'Kasanın içinde yer alan, bilgisayarın çalışmasını sağlayan temel parçalar.' },
  { id: 'external-input', label: 'Giriş Birimleri (Dış)', icon: '📥', description: 'Bilgisayara dışarıdan bilgi, ses ve komut aktaran birimler.' },
  { id: 'external-output', label: 'Çıkış Birimleri (Dış)', icon: '📤', description: 'Bilgisayarda işlenen bilgileri bize görüntü, ses veya kâğıtla sunan birimler.' }
];

export const ASSEMBLY_PARTS = [
  {
    id: 'cpu',
    name: 'İşlemci (CPU)',
    slotId: 'cpu_socket',
    slotName: 'LGA-1700 Soket',
    icon: '🧠',
    hint: "Anakartın tam ortasındaki metal nikel kaplamalı sokete takılır.",
    successMsg: "Harika! İşlemci (CPU) bilgisayarın beyni olarak yerine oturdu!",
    realPhotoUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ram',
    name: 'DDR5 RAM Bellek',
    slotId: 'ram_slot',
    slotName: 'DDR5 Yuvası',
    icon: '🪑',
    hint: "İşlemcinin sağ yanındaki dikey uzun mandallı yuvaya takılır.",
    successMsg: "Süper! RAM takıldı, çalışma masamız hazır!",
    realPhotoUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'gpu',
    name: 'Ekran Kartı (GPU)',
    slotId: 'gpu_slot',
    slotName: 'PCIe x16 Slotu',
    icon: '🎨',
    hint: "Anakartın alt kısmındaki çelik zırhlı uzun PCIe yuvasına yerleşir.",
    successMsg: "Muhteşem! Ekran kartı yerine oturdu, 4K oyunlar akıcı çalışacak!",
    realPhotoUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ssd',
    name: 'M.2 NVMe SSD',
    slotId: 'ssd_slot',
    slotName: 'M.2 SSD Yuvası',
    icon: '📚',
    hint: "Anakartın ortasındaki alüminyum soğutucu zırhının altına yerleşir.",
    successMsg: "Tebrikler! SSD takıldı, dosyalarımız kalıcı olarak güvende!",
    realPhotoUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cooler',
    name: 'Kule Tipi Soğutucu Fan',
    slotId: 'cooler_slot',
    slotName: 'İşlemci Soğutucu Alanı',
    icon: '❄️',
    hint: "İşlemcinin tam üzerine monte edilerek bakır borularla onu serin tutar.",
    successMsg: "Harika! Soğutucu monte edildi, işlemcimiz artık hiç ısınmayacak!",
    realPhotoUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'psu',
    name: '24-Pin ATX Güç Kablosu',
    slotId: 'psu_socket',
    slotName: '24-Pin ATX Güç Soketi',
    icon: '❤️',
    hint: "Anakartın sağ kenarındaki 24 pinli ana güç yuvasına kilitlenir.",
    successMsg: "Tüm sisteme elektrik canı bağlandı, bilgisayar çalışmaya hazır!",
    realPhotoUrl: 'https://images.unsplash.com/photo-1587202372573-0fb62d37320b?w=500&auto=format&fit=crop&q=80'
  }
];
