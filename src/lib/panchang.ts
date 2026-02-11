import * as Astronomy from 'astronomy-engine';

// Tithi names in Tamil
const TITHIS = [
  'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி',
  'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி',
  'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்தசி', 'பௌர்ணமி',
  'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி',
  'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி',
  'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்தசி', 'அமாவாசை'
];

// Tithi English transliteration for display
const TITHIS_ENGLISH = [
  'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dasami',
  'Ekadasi', 'Dwadasi', 'Trayodasi', 'Chaturdasi', 'Pournami',
  'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dasami',
  'Ekadasi', 'Dwadasi', 'Trayodasi', 'Chaturdasi', 'Amavasai'
];

// Nakshatra names in Tamil
const NAKSHATRAS = [
  'அசுவினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிடம்',
  'திருவாதிரை', 'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்',
  'பூரம்', 'உத்திரம்', 'அஸ்தம்', 'சித்திரை', 'சுவாதி',
  'விசாகம்', 'அனுஷம்', 'கேட்டை', 'மூலம்', 'பூராடம்',
  'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்', 'பூரட்டாதி',
  'உத்திரட்டாதி', 'ரேவதி'
];

// Nakshatra English transliteration
const NAKSHATRAS_ENGLISH = [
  'Ashwini', 'Bharani', 'Karthigai', 'Rohini', 'Mrigasheersham',
  'Thiruvathirai', 'Punarpusam', 'Poosam', 'Ayilyam', 'Magam',
  'Pooram', 'Uthiram', 'Hastham', 'Chithirai', 'Swathi',
  'Visakam', 'Anusham', 'Kettai', 'Moolam', 'Pooradam',
  'Uthiradam', 'Thiruvonam', 'Avittam', 'Sathayam', 'Poorattathi',
  'Uthirattathi', 'Revathi'
];

// Yoga names in Tamil
const YOGAS = [
  'விஷ்கம்பம்', 'ப்ரீதி', 'ஆயுஷ்மான்', 'சௌபாக்யம்', 'சோபனம்',
  'அதிகண்டம்', 'சுகர்மா', 'த்ருதி', 'சூலம்', 'கண்டம்',
  'விருத்தி', 'த்ருவம்', 'வியாகாதம்', 'ஹர்ஷணம்', 'வஜ்ரம்',
  'சித்தி', 'வ்யதீபாதம்', 'வரீயான்', 'பரிகம்', 'சிவம்',
  'சித்தம்', 'சாத்தியம்', 'சுபம்', 'சுக்லம்', 'ப்ரம்மம்',
  'இந்திரம்', 'வைத்ருதி'
];

// Yoga English transliteration
const YOGAS_ENGLISH = [
  'Vishkambam', 'Preethi', 'Ayushman', 'Sowbhagyam', 'Shobanam',
  'Athighandam', 'Sukarma', 'Dhrithi', 'Soolam', 'Gandam',
  'Viruthi', 'Dhruvam', 'Vyagatham', 'Harshanam', 'Vajram',
  'Siddhi', 'Vyatheepatham', 'Vareeyan', 'Parigam', 'Sivam',
  'Siddham', 'Sadhyam', 'Subam', 'Suklam', 'Brahmam',
  'Indram', 'Vaidhrithi'
];

// Karana names in Tamil
const KARANAS = [
  'பவம்', 'பாலவம்', 'கௌலவம்', 'தைதுலம்', 'கரம்',
  'வணிஜம்', 'விஷ்டி', 'சகுனி', 'சதுஷ்பாதம்', 'நாகம்', 'கிம்ஸ்துக்னம்'
];

// Karana English transliteration
const KARANAS_ENGLISH = [
  'Bavam', 'Balavam', 'Kaulavam', 'Thaitulam', 'Garam',
  'Vanijam', 'Vishti', 'Sakuni', 'Chatushpadam', 'Nagam', 'Kimsthughnam'
];

// Paksha (lunar fortnight) in Tamil
const PAKSHAS = ['சுக்ல பட்சம்', 'கிருஷ்ண பட்சம்'];
const PAKSHAS_ENGLISH = ['Sukla Paksham', 'Krishna Paksham'];

// Weekday names in Tamil (Kizhamai)
const VARAS = [
  'ஞாயிற்றுக்கிழமை', 'திங்கட்கிழமை', 'செவ்வாய்க்கிழமை', 
  'புதன்கிழமை', 'வியாழக்கிழமை', 'வெள்ளிக்கிழமை', 'சனிக்கிழமை'
];
const VARAS_ENGLISH = [
  'Nyayiru', 'Thingal', 'Sevvai', 
  'Budhan', 'Viyazhan', 'Velli', 'Sani'
];

// Tamil months (Solar calendar - used in Tamil Nadu)
const TAMIL_MONTHS = [
  'சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி',
  'ஐப்பசி', 'கார்த்திகை', 'மார்கழி', 'தை', 'மாசி', 'பங்குனி'
];
const TAMIL_MONTHS_ENGLISH = [
  'Chithirai', 'Vaikasi', 'Aani', 'Aadi', 'Aavani', 'Purattasi',
  'Aippasi', 'Karthigai', 'Margazhi', 'Thai', 'Maasi', 'Panguni'
];

export interface PanchangData {
  date: Date;
  tithi: string;
  tithiTamil: string;
  tithiNumber: number;
  nakshatra: string;
  nakshatraTamil: string;
  nakshatraNumber: number;
  yoga: string;
  yogaTamil: string;
  karana: string;
  karanaTamil: string;
  paksha: string;
  pakshaTamil: string;
  vara: string;
  varaTamil: string;
  tamilMonth: string;
  tamilMonthTamil: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonPhaseTamil: string;
  moonIllumination: number;
  rahu_kaal: string;
  yamagandam: string;
  gulika_kaal: string;
  auspicious: boolean;
  specialDay: string | null;
  specialDayTamil: string | null;
}

// Get moon longitude in degrees (Spherical uses 'lon')
function getMoonLongitude(date: Date): number {
  const moonPos = Astronomy.EclipticGeoMoon(date);
  return moonPos.lon;
}

// Get sun longitude in degrees (EclipticCoordinates uses 'elon')
function getSunLongitude(date: Date): number {
  const sunPos = Astronomy.SunPosition(date);
  return sunPos.elon;
}

// Calculate Tithi (lunar day)
function calculateTithi(date: Date): { tithi: string; tithiTamil: string; number: number; paksha: string; pakshaTamil: string } {
  const moonLong = getMoonLongitude(date);
  const sunLong = getSunLongitude(date);
  
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;
  
  const tithiNumber = Math.floor(diff / 12) + 1;
  const pakshaIndex = tithiNumber <= 15 ? 0 : 1;
  
  return {
    tithi: TITHIS_ENGLISH[(tithiNumber - 1) % 30] || TITHIS_ENGLISH[0],
    tithiTamil: TITHIS[(tithiNumber - 1) % 30] || TITHIS[0],
    number: tithiNumber,
    paksha: PAKSHAS_ENGLISH[pakshaIndex],
    pakshaTamil: PAKSHAS[pakshaIndex]
  };
}

// Calculate Nakshatra
function calculateNakshatra(date: Date): { nakshatra: string; nakshatraTamil: string; number: number } {
  const moonLong = getMoonLongitude(date);
  const nakshatraNumber = Math.floor(moonLong / (360 / 27)) + 1;
  const index = (nakshatraNumber - 1) % 27;
  
  return {
    nakshatra: NAKSHATRAS_ENGLISH[index],
    nakshatraTamil: NAKSHATRAS[index],
    number: nakshatraNumber
  };
}

// Calculate Yoga
function calculateYoga(date: Date): { yoga: string; yogaTamil: string } {
  const moonLong = getMoonLongitude(date);
  const sunLong = getSunLongitude(date);
  
  let sum = moonLong + sunLong;
  if (sum >= 360) sum -= 360;
  
  const yogaNumber = Math.floor(sum / (360 / 27)) + 1;
  const index = (yogaNumber - 1) % 27;
  
  return {
    yoga: YOGAS_ENGLISH[index],
    yogaTamil: YOGAS[index]
  };
}

// Calculate Karana
function calculateKarana(date: Date): { karana: string; karanaTamil: string } {
  const moonLong = getMoonLongitude(date);
  const sunLong = getSunLongitude(date);
  
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;
  
  const karanaNumber = Math.floor(diff / 6) % 11;
  
  return {
    karana: KARANAS_ENGLISH[karanaNumber],
    karanaTamil: KARANAS[karanaNumber]
  };
}

// Get Tamil month based on sun position (Solar calendar)
function getTamilMonth(date: Date): { month: string; monthTamil: string } {
  const sunLong = getSunLongitude(date);
  // Tamil solar months start from Chithirai (mid-April)
  // Aries (0°) corresponds to Chithirai
  const monthIndex = Math.floor(sunLong / 30);
  
  return {
    month: TAMIL_MONTHS_ENGLISH[monthIndex % 12],
    monthTamil: TAMIL_MONTHS[monthIndex % 12]
  };
}

// Calculate sunrise and sunset for Tamil Nadu (default: Chennai)
function calculateSunTimes(date: Date, lat: number, lon: number): { sunrise: string; sunset: string } {
  const observer = new Astronomy.Observer(lat, lon, 0);
  
  try {
    const sunriseTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, date, 1);
    const sunsetTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, date, 1);
    
    const formatTime = (d: Date | null): string => {
      if (!d) return '--:--';
      return d.toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    };
    
    return {
      sunrise: formatTime(sunriseTime?.date || null),
      sunset: formatTime(sunsetTime?.date || null)
    };
  } catch {
    return { sunrise: '06:00 AM', sunset: '06:30 PM' };
  }
}

// Calculate Rahu Kaal (important in Tamil culture)
function calculateRahuKaal(date: Date, sunrise: string, sunset: string): string {
  const day = date.getDay();
  // Rahu Kaal order for each day (Sunday to Saturday)
  // Sun=8th, Mon=2nd, Tue=7th, Wed=5th, Thu=6th, Fri=4th, Sat=3rd
  const rahuKaalOrder = [8, 2, 7, 5, 6, 4, 3];
  const slot = rahuKaalOrder[day];
  
  // Each slot is 1.5 hours from sunrise
  const startHour = 6 + (slot - 1) * 1.5;
  const endHour = startHour + 1.5;
  
  const formatHour = (h: number): string => {
    const hour = Math.floor(h);
    const min = Math.round((h - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

// Calculate Yamagandam (important in Tamil astrology)
function calculateYamagandam(date: Date): string {
  const day = date.getDay();
  // Yamagandam order for each day
  const yamagandamOrder = [5, 4, 3, 2, 1, 7, 6];
  const slot = yamagandamOrder[day];
  
  const startHour = 6 + (slot - 1) * 1.5;
  const endHour = startHour + 1.5;
  
  const formatHour = (h: number): string => {
    const hour = Math.floor(h);
    const min = Math.round((h - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

// Calculate Gulika Kaal
function calculateGulikaKaal(date: Date): string {
  const day = date.getDay();
  const gulikaOrder = [7, 6, 5, 4, 3, 2, 1];
  const slot = gulikaOrder[day];
  
  const startHour = 6 + (slot - 1) * 1.5;
  const endHour = startHour + 1.5;
  
  const formatHour = (h: number): string => {
    const hour = Math.floor(h);
    const min = Math.round((h - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${min.toString().padStart(2, '0')} ${period}`;
  };
  
  return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

// Check for Tamil special days and festivals
function getSpecialDay(tithi: string, paksha: string, nakshatra: string, tamilMonth: string, dayOfWeek: number): { english: string | null; tamil: string | null } {
  // Pournami (Full Moon)
  if (tithi === 'Pournami') {
    return { english: 'Pournami (Full Moon)', tamil: 'பௌர்ணமி' };
  }
  
  // Amavasai (New Moon)
  if (tithi === 'Amavasai') {
    return { english: 'Amavasai (New Moon)', tamil: 'அமாவாசை' };
  }
  
  // Pradosham (13th lunar day - important in Tamil Shaivism)
  if (tithi === 'Trayodasi') {
    return { english: 'Pradosham', tamil: 'பிரதோஷம்' };
  }
  
  // Ekadasi (11th lunar day - fasting day)
  if (tithi === 'Ekadasi') {
    return { english: 'Ekadasi Viratham', tamil: 'ஏகாதசி விரதம்' };
  }
  
  // Chaturthi (4th lunar day - Vinayagar)
  if (tithi === 'Chaturthi') {
    return { english: 'Sankatahara Chaturthi', tamil: 'சங்கடஹர சதுர்த்தி' };
  }
  
  // Ashtami (8th lunar day)
  if (tithi === 'Ashtami' && paksha === 'Krishna Paksham') {
    return { english: 'Krishna Ashtami', tamil: 'கிருஷ்ண அஷ்டமி' };
  }
  
  // Karthigai Nakshatra
  if (nakshatra === 'Karthigai') {
    return { english: 'Karthigai Nakshatram', tamil: 'கார்த்திகை நட்சத்திரம்' };
  }
  
  // Thiruvonam Nakshatra
  if (nakshatra === 'Thiruvonam') {
    return { english: 'Thiruvonam Nakshatram', tamil: 'திருவோண நட்சத்திரம்' };
  }
  
  // Poosam Nakshatra - very auspicious
  if (nakshatra === 'Poosam') {
    return { english: 'Poosam Nakshatram - Auspicious', tamil: 'பூசம் நட்சத்திரம் - சுபம்' };
  }
  
  // Friday with Pournami
  if (dayOfWeek === 5 && tithi === 'Pournami') {
    return { english: 'Lakshmi Pournami', tamil: 'லட்சுமி பௌர்ணமி' };
  }
  
  // Tuesday with Chaturthi
  if (dayOfWeek === 2 && tithi === 'Chaturthi') {
    return { english: 'Angaaraka Chaturthi', tamil: 'அங்காரக சதுர்த்தி' };
  }
  
  return { english: null, tamil: null };
}

// Check if day is auspicious (Tamil tradition)
function isAuspicious(tithi: string, nakshatra: string, yoga: string): boolean {
  const auspiciousTithis = ['Dvitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dasami', 'Ekadasi', 'Trayodasi', 'Pournami'];
  const auspiciousNakshatras = ['Ashwini', 'Rohini', 'Mrigasheersham', 'Poosam', 'Hastham', 'Chithirai', 'Swathi', 'Anusham', 'Thiruvonam', 'Avittam', 'Revathi'];
  const auspiciousYogas = ['Preethi', 'Ayushman', 'Sowbhagyam', 'Shobanam', 'Sukarma', 'Dhrithi', 'Harshanam', 'Siddhi', 'Sivam', 'Siddham', 'Sadhyam', 'Subam', 'Suklam', 'Brahmam'];
  
  return auspiciousTithis.includes(tithi) && auspiciousNakshatras.includes(nakshatra) && auspiciousYogas.includes(yoga);
}

function getMoonPhaseName(phaseAngle: number): { english: string; tamil: string } {
  if (phaseAngle < 22.5) return { english: 'New Moon', tamil: 'அமாவாசை' };
  if (phaseAngle < 67.5) return { english: 'Waxing Crescent', tamil: 'வளர்பிறை' };
  if (phaseAngle < 112.5) return { english: 'First Quarter', tamil: 'முதல் காலாண்டு' };
  if (phaseAngle < 157.5) return { english: 'Waxing Gibbous', tamil: 'வளர்பிறை பெருநிலா' };
  if (phaseAngle < 202.5) return { english: 'Full Moon', tamil: 'பௌர்ணமி' };
  if (phaseAngle < 247.5) return { english: 'Waning Gibbous', tamil: 'தேய்பிறை பெருநிலா' };
  if (phaseAngle < 292.5) return { english: 'Last Quarter', tamil: 'கடைசி காலாண்டு' };
  if (phaseAngle < 337.5) return { english: 'Waning Crescent', tamil: 'தேய்பிறை' };
  return { english: 'New Moon', tamil: 'அமாவாசை' };
}

// Main function to get Panchang data (default location: Chennai, Tamil Nadu)
export function getPanchang(date: Date = new Date(), lat: number = 13.0827, lon: number = 80.2707): PanchangData {
  const tithiData = calculateTithi(date);
  const nakshatraData = calculateNakshatra(date);
  const yogaData = calculateYoga(date);
  const karanaData = calculateKarana(date);
  const tamilMonthData = getTamilMonth(date);
  const sunTimes = calculateSunTimes(date, lat, lon);
  const rahuKaal = calculateRahuKaal(date, sunTimes.sunrise, sunTimes.sunset);
  const yamagandam = calculateYamagandam(date);
  const gulikaKaal = calculateGulikaKaal(date);
  
  const moonIllum = Astronomy.Illumination(Astronomy.Body.Moon, date);
  const moonPhaseData = getMoonPhaseName(moonIllum.phase_angle);
  
  const dayOfWeek = date.getDay();
  const specialDayData = getSpecialDay(tithiData.tithi, tithiData.paksha, nakshatraData.nakshatra, tamilMonthData.month, dayOfWeek);
  
  return {
    date,
    tithi: tithiData.tithi,
    tithiTamil: tithiData.tithiTamil,
    tithiNumber: tithiData.number,
    nakshatra: nakshatraData.nakshatra,
    nakshatraTamil: nakshatraData.nakshatraTamil,
    nakshatraNumber: nakshatraData.number,
    yoga: yogaData.yoga,
    yogaTamil: yogaData.yogaTamil,
    karana: karanaData.karana,
    karanaTamil: karanaData.karanaTamil,
    paksha: tithiData.paksha,
    pakshaTamil: tithiData.pakshaTamil,
    vara: VARAS_ENGLISH[dayOfWeek],
    varaTamil: VARAS[dayOfWeek],
    tamilMonth: tamilMonthData.month,
    tamilMonthTamil: tamilMonthData.monthTamil,
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    moonPhase: moonPhaseData.english,
    moonPhaseTamil: moonPhaseData.tamil,
    moonIllumination: Math.round(moonIllum.phase_fraction * 100),
    rahu_kaal: rahuKaal,
    yamagandam,
    gulika_kaal: gulikaKaal,
    auspicious: isAuspicious(tithiData.tithi, nakshatraData.nakshatra, yogaData.yoga),
    specialDay: specialDayData.english,
    specialDayTamil: specialDayData.tamil
  };
}
