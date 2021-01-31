const _url = "https://api.quran.sutanlab.id/surah/"
const homeContent = document.getElementById('content')

function Home() {
  homeContent.innerHTML = ` 
  <div class="w-full h-72 rounded-2xl overflow-hidden mt-4 shadow-2xl ">
    <div id="image" class="w-full  rounded-2xl h-full relative flex items-center justify-center">
      <div class="absolute z-10 w-1/2">
        <p class="text-white text-xl mb-1 font-bold writer"></p>
        <p class="text-sm italic text-white mb-3">"sebaik-baiknya ibadah umatku adalah membaca Al-quran (_HR. al-baihaiqi)"</p>
        <a href="#baca-quran" class="bg-blue-300  block py-1 px-6 rounded-xl shadow-md absolute z-10 ">Baca sekarang <i class="text-xs fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
  <div class="mt-4 bold w-full">
    <h2 class="mb-2 text-xl font-bold">Dashboard</h2>
    <div class="flex w-full">
      <a href="#baca-quran" class="block w-1/2 bg-white dark:bg-selfmode dark:text-white rounded shadow-xl mr-2 p-4 menu ">
      <div class="flex justify-center w-full">
      <img src="../images/baca.png" width="50" class="rounded-full">
      </div>
        <p class="mt-2 text-xl font-bold text-center">Baca Qur'an</p>
        <p class="text-xs text-center">Lengkap beserta terjemahan</p>
      </a>
      <a href="#baca-doa" class="block w-1/2 bg-white dark:bg-selfmode dark:text-white rounded shadow-xl mr-2 p-4 menu">
        <div class="flex justify-center w-full">
          <img src="../images/harian.png" width="50" class="rounded-full">
        </div>
        <p class="mt-2 text-xl font-bold text-center">Doa-Doa Harian</p>
        <p class="text-xs text-center">30+ doa harian beserta terjemahan</p>
      </a>
    </div>
    <div class="flex w-full mt-2">
      <a href="#asmaul" class="block w-1/2 bg-white dark:bg-selfmode dark:text-white rounded shadow-xl mr-2 p-4 menu">
      <div class="flex justify-center w-full">
      <img src="../images/asmaul.png" width="50" class="rounded-full">
    </div>
    <p class="mt-2 text-xl font-bold text-center">Asmaul Husna</p>
    <p class="text-xs text-center">99 doa asmaul-husna beserta terjemahan</p>
      </a>
      <a href="#bacaan-shalat" class="block w-1/2 bg-white rounded dark:bg-selfmode dark:text-white shadow-xl mr-2 p-4 menu">
      <div class="flex justify-center w-full">
        <img src="../images/doa.png" width="55" class="rounded-full">
      </div>
        <p class="mt-2 text-xl font-bold text-center">Bacaan Shalat</p>
        <p class="text-xs text-center">Bacaan Tata Cara Shalat 5 waktu</p>
      </a>
    </div>
  </div>
  `

  const writer = document.querySelector('.writer')
  let txt = "Udah baca Qur'an hari ini?"

  const typewriter = new Typewriter(writer, {
    loop: true,
    delay: 75,
  })
  typewriter
    .typeString(txt)
    .pauseFor(300)
    .deleteChars(10)
    .pauseFor(1000)
    .start();
}

const renderPage = async () => {
  let articlesHTML = "";
  homeContent.innerHTML = `
    <div class="mt-4 p-4 relative">
      <input id="search-surah" type="search" name="search"
        class="w-full p-3 focus:outline-none bg-white text-base rounded-lg mx-auto pl-12">
        <i class="fas fa-search absolute top-8 left-8 text-2xl"></i>
    </div>
    <div class="all-surah  p-4 mx-auto"></div>`;
  const allsurah = document.querySelector(".all-surah")
  allsurah.innerHTML += loaderTemplate()

  const Writerinput = document.getElementById('search-surah')

  const customNodeCreator = function (character) {
    // Add character to input placeholder
    Writerinput.placeholder = Writerinput.placeholder + character;

    // Return null to skip internal adding of dom node
    return null;
  }
  const typewriter = new Typewriter(null, {
    loop: false,
    delay: 75,
    onCreateTextNode: customNodeCreator,
  });

  typewriter
    .typeString('mau baca surah apa?')
    .pauseFor(300)
    .start();

  try {
    const response = await fetch(_url)
    const data = await response.json()
    console.log(data.data)

    data.data.forEach(article => {
      articlesHTML +=
        `
      <div class="w-full mt-4 surah bg-bglightmode text-textlightmode dark:bg-selfmode dark:text-white shadow-2xl">
        <div data-id="${article.number}" class="w-full p-3 rounded-xl preve surahId d-block">
          <div class="flex prevent justify-around items-center mb-2">
            <div class=" prevent surah-header rounded-full">
              ${article.number}
            </div>
            <div class=" prevent surah-latin text-xl font-medium">
              ${article.name.transliteration.id} : ${article.numberOfVerses } Ayat
            </div>
            <div class="prevent p-2">
              <i class="prevent fas fa-heart"></i>
            </div>
          </div>
          <div class=" prevent surah-body w-full text-right text-3xl mb-2">
              ${article.name.short}
          </div>
          <hr>
          <div class="prevent w-full text-right text-sm italic">
              Artinya - ${article.name.translation.id}
            </div>
        </div>
      </div>`;
    });
  } catch (err) {
    console.log(err)
  }

  allsurah.innerHTML = articlesHTML;
  document.querySelectorAll('.surahId').forEach(el => {
    el.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      window.location.hash = `#${id}`
      getSurahById(id)
    })
  })
  document.title = 'Baca Quran'

  const searchSurah = document.getElementById('search-surah')
  searchSurah.addEventListener('keyup', filterSurah)

  function filterSurah(e) {
    const filterValue = e.target.value.toUpperCase()

    let surah = document.querySelectorAll('.surah')
    surah.forEach((el, i) => {
      let surahLatin = surah[i].querySelector('.surah-latin')
      if (surahLatin.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
        surah[i].style.display = ''
      } else {
        surah[i].style.display = 'none'
      }
    })
  }
}

async function getSurahById(id) {
  let surahHTML = "";

  try {
    const response = await fetch(`${_url}${id}`)
    const data = await response.json()
    const surahId = data.data

    homeContent.innerHTML = `
      <a href="#baca-quran" class="bg-gray-300 text-indigo inline-block py-1 px-2 rounded-xl"><i class="fas fa-arrow-left mr-2"></i>Kembali</a>
      <div class="title p-4 dark:bg-selfmode dark:text-white shadow-2xl rounded-xl">
        <div class="surah-body w-full text-3xl">
          ${surahId.name.short}
        </div>
        <div class="w-full text-xl">
          (${surahId.name.transliteration.id} : ${surahId.numberOfVerses } Ayat)
          </div>
        </div>
        <div class="all-surah  p-4 mx-auto"></div>
      `
    document.title = `${surahId.name.transliteration.id} : ${surahId.numberOfVerses } Ayat`

    surahId.verses.forEach(surah => {
      surahHTML += `
            <div class="bg-bglightmode text-textlightmode dark:bg-selfmode dark:text-white shadow-2xl mt-4 preve p-3 rounded-2xl">
            <div>
              <div class="surah-header rounded-full">
                ${surah.number.inSurah}
              </div>
              <div class="surah-body w-full text-right text-3xl">
              ${surah.text.arab}
              </div>
                <div class="italic w-full text-right text-sm mt-2">
                  "${surah.translation.id}"
                </div>
                <div class=" w-full text-left text-sm mt-4">
                <details class="question py-4 border-b">
                <summary class="flex items-center font-bold outline-none focus:outline-none">Tafsir <button class="ml-auto">
                <svg class="fill-current opacity-75 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
              </button></summary>
              <div class="mt-4 leading-normal text-sm ">
              ${surah.tafsir.id.long}
               
              </div>
              </details>
                </div>
                <div class="w-full bg-gray-400 mt-2 shadow rounded-2xl btn-audio p-4 
                " data-url="">
                  <audio  src="${surah.audio.primary}" id=""  type="audio/mp3" controls="controls" class=" player w-full  outline-none"></audio>
                </div>
            </div>
          </div>`;
    })

    document.querySelector(".all-surah").innerHTML = surahHTML

  } catch (error) {
    console.log(error)
  }
};

async function doaPage() {
  homeContent.innerHTML = 
    `<div class="mt-4 p-4 relative">
      <input id="search-surah" type="search" name="search"
        class="w-full p-3 focus:outline-none bg-white text-base rounded-lg mx-auto pl-12">
        <i class="fas fa-search absolute top-8 left-8 text-xl"></i>
    </div>
    <div class="all-surah  p-4 mx-auto">
    </div>`;

  const Writerinput = document.getElementById('search-surah')
  const customNodeCreator = function (character) {
    Writerinput.placeholder = Writerinput.placeholder + character;
    return null;
  }
  const typewriter = new Typewriter(null, {
    loop: false,
    delay: 75,
    onCreateTextNode: customNodeCreator,
  });

  typewriter
    .typeString('mau baca surah apa?')
    .pauseFor(300)
    .start();

  let doaHTML = "";
  const doaContent = document.querySelector(".all-surah")
  doaContent.innerHTML = loaderTemplate()
  try {
    const response = await fetch('https://islamic-api-zhirrr.vercel.app/api/doaharian')
    const data = await response.json()

    data.data.forEach((article, i) => {
      doaHTML += `
      <div class="mt-4 surah p-3 pb-6 d-block bg-bglightmode text-textlightmode dark:bg-selfmode dark:text-white shadow-2xl preve rounded-xl">
        <div>
          <div class="flex justify-between items-center mb-4">
            <div class="surah-header rounded-full">
              ${i+1}
            </div>
            <div class="doa surah-latin text-sm font-medium">
              ${article.title}
            </div>
        </div>
        <div class="surah-body w-full text-right text-3xl">
              ${article.arabic}
          </div>
          <div class="surah-latin w-full text-right text-sm mt-2 italic mt-4">
            "${article.translation}"
          </div>
        </div>
      </div>`;
    });
    
    console.log( doaContent.innerHTML)
    doaContent.innerHTML = doaHTML;
    document.title = 'Doa Harian'

    const searchSurah = document.getElementById('search-surah')
    searchSurah.addEventListener('keyup', filterSurah)

    function filterSurah(e) {
      const filterValue = e.target.value.toUpperCase()

      let surah = document.querySelectorAll('.surah')
      surah.forEach((el, i) => {
        let surahLatin = surah[i].querySelector('.doa')
        if (surahLatin.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
          surah[i].style.display = ''
        } else {
          surah[i].style.display = 'none'
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
}

function bookmark() {
  homeContent.innerHTML = `<h1 class="text-center font-bold text-2xl mt-4 dark:text-white">Coming soon..</h1>`
}

async function renderAsmaul() {
  let asmaulHTML = "";

  homeContent.innerHTML = `<div id="asmaul" class="w-full grid grid-cols-2 gap-2"></div>`;
  const asmaulPage = document.getElementById('asmaul')
  asmaulPage.innerHTML = loaderTemplate()
  try {
    const response = await fetch('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna')
    const data = await response.json()

    data.data.forEach(article => {
      asmaulHTML += `
      <div class="mt-4 surah p-3 d-block bg-bglightmode text-textlightmode dark:bg-selfmode dark:text-white shadow-2xl preve rounded-xl">
        <div>
          <div class="flex justify-between items-center mb-4">
            <div class="surah-header rounded-full">
              ${article.index}
            </div>
            <div class="doa surah-latin text-xl font-medium">
              ${article.latin}
            </div>
        </div>
        <div class="surah-body w-full text-right text-3xl">
              ${article.arabic}
          </div>
          <div class="surah-latin w-full text-right text-sm mt-2 italic mt-4">
            "${article.translation_id}"
          </div>
        </div>
      </div>`;
    });

    asmaulPage.innerHTML = asmaulHTML;
    document.title = 'Asmaul Husna'
  } catch (err) {
    console.log(err)
  }
}

async function renderPageSha() {
  homeContent.innerHTML = 
    `<div class=" p-4 bg-bglightmode text-textlightmode dark:bg-selfmode dark:text-white shadow-2xl rounded-xl all-surah mx-auto">
      <div class="w-full font-bold text-3xl text-center mb-2">
        SHALAT
      </div>
      <div class="w-full text-sm mb-4">
        <p>Salah satu di antara kewajiban mutlak yang harus di laksanakan oleh setiap muslim mukalaf menurut perhitungan syariat baik itu ketika dia sehat atau sakit adalah melaksanakan sholat wajib 5 waktu dalam sehari semalam. Kewajiban melaksanakan sholat 5 waktu ini tidak seperti ibadah haji yang memiliki syarat khusus, akan tetapi dalam sholat selagi orang tersebut dalam keadaan akalnya masih sehat dan normal, maka wajib untuk mendirikan sholat.
        </p>
        <p>
          Kewajiban sholat lima waktu subuh, dzuhur, ashar, maghrib, dan isya tidak bisa di samakan dengan ibadah lain misalnya haji yang hanya di wajibkan kepada mereka yang telah mampu untuk melaksanakannya, jika pun tidak maka tidak menjadi dosa, serta tidak bisa juga di samakan dengan puasa yang mana ketika sakit boleh di kerjakan dengan qodho di bulan lainnya. Tetapi untuk kewajiban sholat meskipun tubuh merasa payah asal ingatan pikiran masih sehat maka tetap wajib melaksanakan shalat dengan cara sesuai kemampuan.</p>
          <p class="my-3">Salah satu dalil alqur-an yang mewajibkan shalat</p>
          <p class="arab font-bold text-xl mb-2">  وَاَقِيۡمُوا الصَّلٰوةَ وَاٰتُوا الزَّكٰوةَ وَارۡكَعُوۡا مَعَ الرّٰكِعِيۡنَ
          </p>
          <p class="italic">"Dan laksanakanlah shalat, tunaikanlah zakat, dan rukuklah beserta orang yang rukuk." (Al-baqarah: 43)</p>
        </div>
        <div>
            <div class="text-center font-medium mb-3">
              Bacaan-Bacaan Dalam Shalat
            </div>
          <div class="w-full text-sm">
            <ol class="list-decimal p-4 arab leading-7">
              <li class="font-medium">Niat</li>
              <p >Berdiri tegak menghadap kiblat dan niat mengerjakan shalat. Niat shalat menurut shalat yang sedang dikerjakan, misalnya shalat dzuhur dan sebagainya.
              (Niat shalat ialah didalam hati)
              </p>
              <p >Lalu mengangkat kedua belah tangan serta membaca <strong >"Allahu Akbar" اَللهُ اَ كْبَرُ</strong> (Takbiratul ihram)
              </p>
              <p >Setelah Takbiratul ihram kedua belah tangannya disedekapkan pada dada/pusar. Kemudia membaca do'a iftitaf.
              </p>
              <li class="font-medium mt-3">Bacaan Do'a Iftitah</li>
              <p ><strong>اَللهُ اَكْبَرْكَبِيْرًا وَاْلحَمْدُ لِلهِ كَشِيْرًا وَسُبْحَانَ للهِ بُكْرَةً وَاَ صِيْلَا
              </strong><br>
              <strong>(Allahu akbar kabiraa wal-hamdu lillahi katsiiraa wa subhaanallaahi bukrataw wa ashiilaa.)</strong>
              </p>
              <p><strong>اِنِّيْ وَجَّهْتُ وَجْهِيَ لِلَّذِيْ فَطَرَ السَّمَوَاتِ وَاْلاَرْضِ حَنِيْفًامٌسْلِمًاوَمَ اَنَامِنَ اْلمُشْرِكِيْنَ
              </strong><br>
              <strong>(Innii wajjahtu wajhiya lil-laadzii fatharas-samaawaati wal ardha haniifam muslimaw wa maa ana minal-musyrikiin.)</strong>
              </p>
              <p><strong>اِنَّ صَلَا تِيْ وَنُسُكِيْ وَمَحْيَايَ وَمَمَا تِيْ لِلَّهِ رَبِّ اْلعَالَمِيْنَ لَاشَرِيْكَ لَهُ وَبِذَ لِكَ اُمِرْ تُ وَاَنَامِنَ
              اْلمُسْلِمِيْنَ
              </strong><br>
              <strong>(Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil -‘aalamiin. Laa syariikalahu wa bi dzaalika umirtu wa ana minal -muslimiin.)</strong>
              </p>
              <p >
              Bacaan iftitaf yang lain <br>
              <strong>اللَّحُمَّ بَا عِدْ بَيْنِى وَبَيْنَ خَطَا يَاىَ كَمَا بَاعَدْتْ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ , اللَّهُمَّ نَقِّنِى مِن الْخَطَايَا كَمَا يُنَقَّى الثَّوبُ الاَبْيَضُ مِنَ الدَّنَسِ , اللَّهُمَّ اغْسِلْ خَطَايَاىَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ
              </strong><br>
              <strong>(Allahumma baa’id bainii wabaina khathaayaaya kamaa baa’adta bainal masyriqi wa maghribi, allahumma naqinii min khathaayaaya kamaa yunaqats tsaubul abyadhu minad danas. Allahummaghsilnii min khathaayaaya bil maa’i wats tsalji.)</strong>
              </p>
              <li class="font-medium">Surah Al-Fatihah</li>
                <p >
                <strong >
                بِسْمِ اللهِ الرَّحْمنِ الرَّحِيْمِ
              الْحَمْدُ للهِ رَبِّ الْعَالَمِيْنَ, الرَّحْمَـنِ الرَّحِيْمِ, مَالِكِ يَوْمِ الدِّيْنِ, إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ, اِهْدِنَا الصِّرَاطَ المُستَقِيْمَ, صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيهِمْ, غَيْرِ المَغْضُوْبِ عَلَيْهِمْ وَلاَ الضَّالِّيْنَ. آمِيْنَ
                </strong><br>
                <strong>(Bismillaahir-rahmaanir-rahiim, Al-hamdu lillaahi rabbil-‘aalamiin, Ar-rahmaanir-rahiim, Maaliki yaumid-diin, Iyyaaka na’budu wa iyyaaka nasta’iin, Ihdinash-shiraatal-mustaqiim, Shiraatal-ladziina an’amta ‘alaihim, Ghairil-maghdhuubi ‘alaihimwa ladh-dhaalliin. Aamiin.)</strong>
              </p>
              <li class="font-medium">Bacaan Surah Pendek dan Mudah Dihafal</li>
              <p >
              <span>Surah Al-Ikhlas : </span><br>
                <strong>قُلْ هُوَ اللّٰهُ اَحَدٌۚ
                .اَللّٰهُ الصَّمَدُۚ
                .لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ
                .وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ
                </strong><br>
                <span>Surah An-Nas : </span><br>
                <strong>قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ
                .مَلِكِ النَّاسِۙ
                .اِلٰهِ النَّاسِۙ
                .مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ
                .الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ
                .مِنَ الْجِنَّةِ وَالنَّاسِ
                </strong><br>
                <span>Surah An-Falaq : </span><br>
                <strong>قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ
                .مِنْ شَرِّ مَا خَلَقَۙ
                .وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ
                .وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ
                .الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ
                .وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ
                </strong><br>
                <span>Surah An-Kafirun : </span><br>
                <strong>قُلْ يٰٓاَيُّهَا الْكٰفِرُوْنَۙ
                .لَآ اَعْبُدُ مَا تَعْبُدُوْنَۙ
                .وَلَآ اَنْتُمْ عٰبِدُوْنَ مَآ اَعْبُدُۚ
                .وَلَآ اَنَا۠ عَابِدٌ مَّا عَبَدْتُّمْۙ
                .وَلَآ اَنْتُمْ عٰبِدُوْنَ مَآ اَعْبُدُۗ
                .لَكُمْ دِيْنُكُمْ وَلِيَ دِيْنِ
                </strong><br>
                <span>Surah An-Bayyinah : </span><br>
                <strong>لَمْ يَكُنِ الَّذِيْنَ كَفَرُوْا مِنْ اَهْلِ الْكِتٰبِ وَالْمُشْرِكِيْنَ مُنْفَكِّيْنَ حَتّٰى تَأْتِيَهُمُ 
                الْبَيِّنَةُۙ
                .رَسُوْلٌ مِّنَ اللّٰهِ يَتْلُوْا صُحُفًا مُّطَهَّرَةًۙ
                .فِيْهَا كُتُبٌ قَيِّمَةٌ ۗ
                .وَمَا تَفَرَّقَ الَّذِيْنَ اُوْتُوا الْكِتٰبَ اِلَّا مِنْۢ بَعْدِ مَا جَاۤءَتْهُمُ الْبَيِّنَةُ ۗ
                .وَمَآ اُمِرُوْٓا اِلَّا لِيَعْبُدُوا اللّٰهَ مُخْلِصِيْنَ لَهُ الدِّيْنَ ەۙ حُنَفَاۤءَ وَيُقِيْمُوا الصَّلٰوةَ وَيُؤْتُوا الزَّكٰوةَ وَذٰلِكَ دِيْنُ الْقَيِّمَةِۗ
                .اِنَّ الَّذِيْنَ كَفَرُوْا مِنْ اَهْلِ الْكِتٰبِ وَالْمُشْرِكِيْنَ فِيْ نَارِ جَهَنَّمَ خٰلِدِيْنَ فِيْهَاۗ اُولٰۤىِٕكَ هُمْ شَرُّ الْبَرِيَّةِۗ
                .اِنَّ الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصّٰلِحٰتِ اُولٰۤىِٕكَ هُمْ خَيْرُ الْبَرِيَّةِۗ
                .جَزَاۤؤُهُمْ عِنْدَ رَبِّهِمْ جَنّٰتُ عَدْنٍ تَجْرِيْ مِنْ تَحْتِهَا الْاَنْهٰرُ خٰلِدِيْنَ فِيْهَآ اَبَدًا ۗرَضِيَ اللّٰهُ عَنْهُمْ وَرَضُوْا عَنْهُ ۗ ذٰلِكَ لِمَنْ خَشِيَ رَبَّهٗ
                </strong><br>
              </p>
              <li class="font-medium">Ruku'</li>
              <p>Selesai membaca surat, lalu mengangkat kedua tangan setinggi telinga seraya membaca "Allahu Akbar", terus badannya membungkuk, kedua tangannya memegang lutut dan ditekankan antara punggung dan kepala supaya rata.</p>
              <p>
              Setelah cukup sempurna bacalah tasbih sebagai berikut: <br>
              <strong>
              سُبْحَانَ رَبِّيَ اْلعَظِيْمِ وَبِحَمْدِهِ
              (3x)
              </strong>
              </p>
              <li class="font-medium">I'Tidal</li>
              <p>Selesai ruku', terus bangkitlah tegak dengan mengangkat kedua belah tangan setentang telinga, seraya membaca:</p>
              <p >
              <strong>
              سَمِعَ اللهُ لِمَنْ حَمِدَهُ
              <br>رَبَّنَا لَكَ اْلحَمْدُ مِلْءُالسَّمَوَاتِ وَمِلْءُاْلاَرْضِ وَمِلْءُ مَا شِعْتَ مِنْ شَيْءٍ بَعْدُ
              </strong>
              </p>
              <li class="font-medium">Sujud</li>
              <p>Setelah i'tidal terus sujud (tersungkur kebumi) dengan meletakkan dahi kebumi, dan ketika turun serya membaca "Allahu Akbar", dan setelah sujud membaca tasbih sbb:</p>
              <p >
              <strong>
              سُبْحَانَ رَبِّيَ اْلاَعْلَى وَبِحَمْدِهِ
              (3x)
              </strong>
              </p>
              <li class="font-medium">Duduk Antara Dua Sujud</li>
              <p>Setelah sujud kemudian duduk serta membaca "Allahu Akbar" dan setelah duduk membaca:</p>
              <p>
              <strong>
              رَبِّ اغْفِرْلِى وَارْحَمْنِىْ وَاجْبُرْنِىْ وَارْفَعْنِى وَارْزُقْنِىْ وَاهْدِ نِىْ وَعَا فِنِىْ وَاعْفُ عَنِّىْ
              </strong>
              </p>
              <li class="font-medium"> Sujud Kedua</li>
              <p>Sujud kedua ketiga dan keempat dikerjakan seperti pada waktu sujud yang pertama, baik caranya maupun bacaannya.</p>
              <p >
              <strong>
              رَبِّ اغْفِرْلِى وَارْحَمْنِىْ وَاجْبُرْنِىْ وَارْفَعْنِى وَارْزُقْنِىْ وَاهْدِ نِىْ وَعَا فِنِىْ وَاعْفُ عَنِّىْ
              </strong>
              </p>
              <li class="font-medium"> Duduk Tasyahud/Tahiyat Awal</li>
              <p>Pada rakaat kedua, kalau shalat kita rakaat atau empat rakaat, maka pada rakaat kedua ini kita duduk untuk membaca tasyahud awal, dengan duduk kaki kanan tegak dan telapak kaki kiri diduduki.</p>
              <p >
              <strong>
              آلتَّحِيَّاتُ اْلمُبَارَكَاتُ الصَّلَوَاتُالطَّيِّبَاتُ لِلَّهِ اَلسَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ اَلسَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِيْنَ أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًارَسُوْلُ اللَّهِ اَللَّهُمَّ صَلِّ عَلَ سَيِّدِ نَامُحَمَّدٍ
              </strong>
              </p>
              <li class="font-medium">Tasyahud/Tashiyat Akhir</li>
              <p>Bacaan Tasyahud akhir ialah seperti tasyahud awal ditambah dengan shalawat atas keluarga Nabi Muhammad SAW.</p>
              <p >
              <strong>
              آلتَّحِيَّاتُ اْلمُبَارَكَاتُ الصَّلَوَاتُالطَّيِّبَاتُ لِلَّهِ اَلسَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ اَلسَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِيْنَ أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًارَسُوْلُ اللَّهِ اَللَّهُمَّ صَلِّ عَلَ سَيِّدِ نَامُحَمَّدٍ
              وَعَلَى آلِ سَيِّدِ نَامُحَمَّدٍ
              كَمَا صَلَّيْتَ عَلَى سيِدِ نَآ إبْرَاهِيْمَ وَعَلَى آلِ سَّيِدِ نَآ إِبْرَاهِيْمَ وَ بَارِِكْ عَلَى سيِّدِ نَا مُحَمَّدٍ وَعَلَى آلِ سيِّدِ نَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى سيِّدِ نَا إبْرَاهِيَْمَ وَ عَلَى آلِ سَيِّدِ نَاإِبْرَاهِيْمَ فى اْلعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ              
              </strong>
              </p>
              <p class="font-medium">Cara duduk pada tahiyat ialah:</p>
              <p>Supaya pantat langsung ketanah, dan kaki kiri dimasukkan kebawah kaki kanan.</p>
              <p>Jari-jari kaki kanan tetap menekan ketanah.</p>
              <li class="font-medium">Salam</li>
              <p>Selesai tahiyat akhir kemudian salam dengan menengok kekanan dan kekiri dengan membaca:</p>
              <p >
              <strong>
              اَلسَّلَا مُ عَلَيْكُمْ وَرَحْمَتُ اللهِ            
              </strong>
              </p>
            </ol>
          </div>
        </div>
      </div>
    </div>`;
    document.title = 'Bacaan Shalat'
}

function aboutPage() {
  homeContent.innerHTML = `
  <div class="mt-4 surah p-3 d-block bg-bglightmode text-textlightmode dark:bg-selfmode dark:text-white shadow-2xl rounded-2xl">
  <h2 class="text-xl font-bold mb-3">Tentang MuslimApp</h2>
  <p class="text-sm"> MuslimApp adalah aplikasi web progresif untuk menyajikan data Al-Qur'an, doa-doa harian, asmaul-husna serta bacaan shalat semuanya dilengkapi dengan terjamahannya.
  untuk Alquran disertakan juga Audio di setiap surah.</p>
  <p class="text-sm">MuslimApp merupakan web yang dibuat layaknya aplikasi native dengan memanfaatkan fitur web modern dengan PWA.
  </p>
 
  <div class="mt-6">
  <h3 class="mb-3 font-bold text-xl">Sumber Data:</h3>
  <ul>
    <li>
    Kementerian Agama Republik Indonesia (Kemenag RI) </li>
    <li>https://api.quran.sutanlab.id/surah/</li>
    <li>https://github.com/Zhirrr/islamic-rest-api-indonesian</li>
  </ul>
  </div>
  <div class="mt-5">
    <h3 class="mb-3 font-bold text-xl">Find Me</h3>
    <div class="sm">
      <a class="flex overflow-hidden relative" href="https://facebook.com/benidanuarifitrio"><i class="fab fa-facebook-f"></i></a>
      <a class="flex overflow-hidden relative" href="https://github.com/benifitrio"><i class="fab fa-github"></i></a>
      <a class="flex overflow-hidden relative"   href="https://www.linkedin.com/in/beni-fitrio-518412133/"><i class="fab fa-linkedin-in"></i></a>
    </div>
  </div>
</div>

  `
}