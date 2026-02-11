import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getPanchang, PanchangData } from "@/lib/panchang";
import { Sun, Moon, Calendar, Clock, Star, Sparkles, AlertTriangle } from "lucide-react";

interface PanchangProps {
  date?: Date;
  latitude?: number;
  longitude?: number;
  compact?: boolean;
}

// Default location: Chennai, Tamil Nadu
const Panchang = ({ date, latitude = 13.0827, longitude = 80.2707, compact = false }: PanchangProps) => {
  const [panchang, setPanchang] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculatePanchang = () => {
      setLoading(true);
      try {
        const data = getPanchang(date || new Date(), latitude, longitude);
        setPanchang(data);
      } catch (error) {
        console.error("Error calculating panchang:", error);
      } finally {
        setLoading(false);
      }
    };

    calculatePanchang();
  }, [date, latitude, longitude]);

  if (loading) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!panchang) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-destructive/20">
        <CardContent className="p-6 text-center text-muted-foreground">
          பஞ்சாங்கத்தை கணக்கிட இயலவில்லை
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="bg-gradient-to-br from-saffron/10 to-temple-gold/10 border-primary/20 overflow-hidden">
        <CardHeader className="pb-2 bg-primary/5">
          <CardTitle className="text-lg font-display flex items-center gap-2 text-primary">
            <Calendar className="h-5 w-5" />
            இன்றைய பஞ்சாங்கம்
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-saffron/20 text-saffron border-saffron/30">
              {panchang.varaTamil}
            </Badge>
            <Badge variant="outline" className="bg-temple-gold/20 text-foreground border-temple-gold/30">
              {panchang.tithiTamil}
            </Badge>
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
              {panchang.nakshatraTamil}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-saffron" />
              <span className="text-muted-foreground">சூரிய உதயம்:</span>
              <span className="font-medium">{panchang.sunrise}</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">சூரிய அஸ்தமனம்:</span>
              <span className="font-medium">{panchang.sunset}</span>
            </div>
          </div>

          {panchang.specialDayTamil && (
            <div className="flex items-center gap-2 p-2 rounded-md bg-saffron/10 border border-saffron/20">
              <Sparkles className="h-4 w-4 text-saffron" />
              <span className="text-sm font-medium text-saffron">{panchang.specialDayTamil}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-saffron/5 via-card to-temple-gold/5 border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-saffron/10 border-b border-primary/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-xl font-display flex items-center gap-2 text-primary">
            <Calendar className="h-6 w-6" />
            <span>தினசரி பஞ்சாங்கம்</span>
            <span className="text-sm font-normal text-muted-foreground ml-2">(Tamil Panchangam)</span>
          </CardTitle>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {panchang.date.toLocaleDateString('ta-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-xs text-primary font-medium">
              {panchang.tamilMonthTamil} மாதம் • {panchang.pakshaTamil}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Special Day Alert */}
        {panchang.specialDayTamil && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-saffron/20 to-temple-gold/20 border border-saffron/30">
            <Sparkles className="h-6 w-6 text-saffron animate-pulse" />
            <div>
              <p className="font-display text-lg text-saffron">{panchang.specialDayTamil}</p>
              <p className="text-sm text-muted-foreground">{panchang.specialDay}</p>
            </div>
          </div>
        )}

        {/* Main Panchang Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PanchangItem
            icon={<Star className="h-5 w-5" />}
            label="திதி"
            labelEnglish="Tithi"
            value={panchang.tithiTamil}
            valueEnglish={panchang.tithi}
            subValue={panchang.pakshaTamil}
            color="saffron"
          />
          <PanchangItem
            icon={<Moon className="h-5 w-5" />}
            label="நட்சத்திரம்"
            labelEnglish="Nakshatra"
            value={panchang.nakshatraTamil}
            valueEnglish={panchang.nakshatra}
            color="primary"
          />
          <PanchangItem
            icon={<Sparkles className="h-5 w-5" />}
            label="யோகம்"
            labelEnglish="Yoga"
            value={panchang.yogaTamil}
            valueEnglish={panchang.yoga}
            color="temple-gold"
          />
          <PanchangItem
            icon={<Calendar className="h-5 w-5" />}
            label="கரணம்"
            labelEnglish="Karana"
            value={panchang.karanaTamil}
            valueEnglish={panchang.karana}
            color="muted"
          />
        </div>

        {/* Sun & Moon Times */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-saffron/10 to-orange-100/30 dark:to-orange-900/10 border border-saffron/20">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-5 w-5 text-saffron" />
              <span className="text-sm text-muted-foreground">சூரிய உதயம்</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{panchang.sunrise}</p>
            <p className="text-xs text-muted-foreground">Sunrise</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-100/50 to-purple-100/30 dark:from-indigo-900/20 dark:to-purple-900/10 border border-indigo-200/50 dark:border-indigo-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-5 w-5 text-indigo-500" />
              <span className="text-sm text-muted-foreground">சூரிய அஸ்தமனம்</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{panchang.sunset}</p>
            <p className="text-xs text-muted-foreground">Sunset</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-muted">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">சந்திர நிலை</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{panchang.moonPhaseTamil}</p>
            <p className="text-xs text-muted-foreground">{panchang.moonIllumination}% ஒளி</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-muted">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">கிழமை</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{panchang.varaTamil}</p>
            <p className="text-xs text-muted-foreground">{panchang.vara}</p>
          </div>
        </div>

        {/* Inauspicious Times - Important in Tamil culture */}
        <div className="space-y-3">
          <h3 className="font-display text-sm text-muted-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            தவிர்க்க வேண்டிய நேரங்கள் (Inauspicious Times)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-destructive" />
                <span className="font-medium text-destructive">ராகு காலம்</span>
              </div>
              <p className="text-foreground font-semibold">{panchang.rahu_kaal}</p>
              <p className="text-xs text-muted-foreground mt-1">Rahu Kalam - Avoid new beginnings</p>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-600">எமகண்டம்</span>
              </div>
              <p className="text-foreground font-semibold">{panchang.yamagandam}</p>
              <p className="text-xs text-muted-foreground mt-1">Yamagandam - Avoid travels</p>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-600">குளிகை காலம்</span>
              </div>
              <p className="text-foreground font-semibold">{panchang.gulika_kaal}</p>
              <p className="text-xs text-muted-foreground mt-1">Gulika Kalam - Inauspicious period</p>
            </div>
          </div>
        </div>

        {/* Auspicious Indicator */}
        {panchang.auspicious && (
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300/50 dark:border-green-700/30">
            <Sparkles className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="font-display text-green-700 dark:text-green-400">இன்று சுபதினம்</p>
            <p className="text-sm text-green-600/80 dark:text-green-500/80">Today is an Auspicious Day - Favorable for new ventures</p>
          </div>
        )}

        {/* Location Note */}
        <p className="text-xs text-center text-muted-foreground">
          📍 சென்னை, தமிழ்நாடு அடிப்படையில் கணக்கிடப்பட்டது | Based on Chennai, Tamil Nadu
        </p>
      </CardContent>
    </Card>
  );
};

interface PanchangItemProps {
  icon: React.ReactNode;
  label: string;
  labelEnglish: string;
  value: string;
  valueEnglish?: string;
  subValue?: string;
  color: 'saffron' | 'primary' | 'temple-gold' | 'muted';
}

const PanchangItem = ({ icon, label, labelEnglish, value, valueEnglish, subValue, color }: PanchangItemProps) => {
  const colorClasses = {
    saffron: 'text-saffron bg-saffron/10 border-saffron/20',
    primary: 'text-primary bg-primary/10 border-primary/20',
    'temple-gold': 'text-temple-gold bg-temple-gold/10 border-temple-gold/20',
    muted: 'text-muted-foreground bg-muted/50 border-muted'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <div>
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-xs text-muted-foreground/70 ml-1">({labelEnglish})</span>
        </div>
      </div>
      <p className="text-lg font-semibold text-foreground">{value}</p>
      {valueEnglish && <p className="text-xs text-muted-foreground">{valueEnglish}</p>}
      {subValue && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
    </div>
  );
};

export default Panchang;
