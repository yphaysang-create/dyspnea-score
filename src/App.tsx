import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  AlertCircle, 
  Info, 
  RefreshCcw,
  PhoneCall,
  Stethoscope,
  HeartPulse,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Helper to convert Google Drive ID to direct link
const getDirectLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const LEVELS = [
  {
    id: "level-1",
    scoreRange: [0, 1, 2],
    scoreDisplay: "0-2",
    defaultScore: 0,
    label: "ปกติ",
    description: "ระดับ 0-2: หายใจปกติ (No Disturbance)",
    color: "border-[#4caf50]",
    textColor: "text-[#2e7d32]",
    bgColor: "bg-[#e8f5e9]",
    shadowColor: "shadow-[#e8f5e9]",
    advice: "✅ พักผ่อนได้ตามปกติ: Resting comfortably. No change needed.",
    icon: Activity,
    imageUrl: getDirectLink("1yzIgIL6aNxLciVslsKLIRn_-agYAs7aG") // Updated for Score 0-2 image
  },
  {
    id: "level-2",
    scoreRange: [3, 4, 5],
    scoreDisplay: "3-5",
    defaultScore: 4,
    label: "เหนื่อยเล็กน้อย",
    description: "ระดับ 3-5: เหนื่อยเล็กน้อย (Mild Disturbance)",
    color: "border-[#fdd835]",
    textColor: "text-[#fbc02d]",
    bgColor: "bg-[#fffde7]",
    shadowColor: "shadow-[#fffde7]",
    advice: "⚠️ เริ่มรู้สึกถึงการหายใจ: Slight awareness of breath. Check status.",
    icon: Info,
    imageUrl: getDirectLink("1qfht_I-VCI0KdYsu4HWUsv-bG2s03que") // Updated for Score 3-5 image
  },
  {
    id: "level-3",
    scoreRange: [6, 7, 8],
    scoreDisplay: "6-8",
    defaultScore: 7,
    label: "เหนื่อยปานกลาง",
    description: "ระดับ 6-8: เหนื่อยปานกลาง (Moderate Disturbance)",
    color: "border-[#ff9800]",
    textColor: "text-[#ef6c00]",
    bgColor: "bg-[#fff3e0]",
    shadowColor: "shadow-[#fff3e0]",
    advice: "🟠 หายใจลำบากระดับปานกลาง: Moderate breathlessness. Prepare intervention.",
    icon: Stethoscope,
    imageUrl: getDirectLink("1Bd6Qhgu1AwDnRzGNzdgz0j9NVdrdmVmJ") // Updated for Score 6-8 image
  },
  {
    id: "level-4",
    scoreRange: [9, 10],
    scoreDisplay: "9-10",
    defaultScore: 10,
    label: "เหนื่อยรุนแรง",
    description: "ระดับ 9-10: เหนื่อยรุนแรงมาก! (Extreme Disturbance)",
    color: "border-[#f44336]",
    textColor: "text-[#c62828]",
    bgColor: "bg-[#ffebee]",
    shadowColor: "shadow-[#ffebee]",
    advice: "🆘 หายใจลำบากขั้นรุนแรง: Extreme breathlessness. URGENT Action Required!",
    icon: PhoneCall,
    imageUrl: getDirectLink("1J9kx3Ephr-iOrXjNBXaeMSM62FIMox5X") // Updated for Score 9-10 image
  }
];

export default function App() {
  const [score, setScore] = useState<number | null>(null);
  const [currentLevel, setCurrentLevel] = useState<typeof LEVELS[0] | null>(null);
  const [showBalloons, setShowBalloons] = useState(false);

  // Generate 11 individual selection points from 0 to 10
  const SCORE_POINTS = Array.from({ length: 11 }, (_, i) => {
    const levelMapping = LEVELS.find(l => l.scoreRange.includes(i)) || LEVELS[LEVELS.length - 1];
    return {
      score: i,
      level: levelMapping
    };
  });

  useEffect(() => {
    if (score !== null) {
      // Find the appropriate level based on scoreRange
      const level = LEVELS.find(l => l.scoreRange.includes(score)) || LEVELS[LEVELS.length - 1];
      setCurrentLevel(level);
    }
  }, [score]);

  const handleLevelSelect = (targetScore: number) => {
    setScore(targetScore);
  };

  const handleReset = () => {
    setScore(null);
    setCurrentLevel(null);
    setShowBalloons(false);
  };

  const handleSubmit = () => {
    if (score !== null) {
      setShowBalloons(true);
      setTimeout(() => setShowBalloons(false), 3000);
      alert(`บันทึกคะแนน ${score} (${currentLevel?.label}) เรียบร้อยแล้ว!`);
    } else {
      alert("กรุณาเลือกรูปภาพก่อนบันทึก");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 p-4 md:p-8 flex flex-col items-center">
      {/* Balloons effect placeholder */}
      {showBalloons && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎈🎈🎈</div>
        </div>
      )}
      <header className="w-full max-w-7xl mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 border-[#38b2ac] text-[#2c7a7b] font-mono text-[10px] tracking-[0.2em] uppercase py-1.5 px-4 rounded-full bg-[#e6fffa]">
            Clinical Diagnostic Interface
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1a365d] leading-none mb-4">
            🫁 Dyspnea Assessment App
          </h1>
          <p className="text-[#2d3748] text-lg font-medium italic serif max-w-2xl mx-auto border-t border-slate-50 pt-4">
            แบบประเมินภาวะเหนื่อย (คะแนน 0-10)
          </p>
        </motion.div>
      </header>

      <main className="w-full max-w-7xl space-y-12 pb-24 px-4 overflow-hidden">
        {/* Visual Selector Grid - 11 Options Scale 0-10 in a horizontal scrollable row */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
          <section className="flex gap-4 md:gap-6 min-w-max px-4">
            {SCORE_POINTS.map(({ score: pointScore, level }) => (
              <motion.div 
                key={pointScore}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative w-[360px] md:w-[420px] shrink-0"
              >
                <div
                  onClick={() => handleLevelSelect(pointScore)}
                  className={cn(
                    "relative flex flex-col items-center rounded-3xl border-2 transition-all duration-300 overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
                    score === pointScore 
                      ? `${level.color} ring-8 ring-blue-50 z-10 shadow-xl ${level.bgColor}` 
                      : "border-slate-100 hover:border-blue-200 bg-white"
                  )}
                >
                  <div className="w-full aspect-square overflow-hidden bg-white relative group flex items-center justify-center">
                    <img 
                      src={level.imageUrl} 
                      alt={level.label}
                      className={cn(
                        "w-[350px] h-[350px] object-contain transition-all duration-700",
                        score === pointScore ? "scale-105" : "grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-100"
                      )}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  
                  <div className="text-center w-full py-3 md:py-4 px-1 md:px-2 border-t border-slate-50 bg-white">
                    <div className={cn("text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-0.5 md:mb-1 font-mono", level.textColor)}>
                      {pointScore}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-tighter leading-tight italic flex flex-col">
                      <span className="opacity-50 line-clamp-1">{level.label}</span>
                    </div>
                  </div>
                  
                  {score === pointScore && (
                    <motion.div 
                      layoutId="check-icon"
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-white shadow-xl z-20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </section>
        </div>

        {/* Detailed Assessment Panel */}
        <AnimatePresence mode="wait">
          {currentLevel ? (
            <motion.div
              key={currentLevel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "group bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border-2 transition-all duration-500 overflow-hidden relative",
                currentLevel.color
              )}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50 rounded-full -ml-24 -mb-24 opacity-10" />
              
              <div className="relative z-10 flex flex-col items-center gap-16">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
                  <div className="w-full max-w-[550px] aspect-square rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.12)] bg-white relative shrink-0">
                    {/* Blurred Background to minimize whitespace */}
                    <img 
                      src={currentLevel.imageUrl} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-150 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Foreground Image */}
                    <img 
                      src={currentLevel.imageUrl} 
                      alt={currentLevel.label} 
                      className="relative w-full h-full object-contain transition-transform duration-500 scale-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center lg:text-left flex-1">
                    <div className={cn("text-[10rem] md:text-[16rem] font-black tabular-nums tracking-tighter leading-none transition-colors duration-500", currentLevel.textColor)}>
                      {score}
                    </div>
                    <div className="text-base font-black uppercase tracking-[0.6em] text-slate-300 mt-2">Assessment Signal</div>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-10 text-center flex flex-col items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-slate-100 shadow-sm">
                      <HeartPulse className={cn("w-6 h-6", currentLevel.textColor)} />
                      <span className={cn("text-xl md:text-2xl font-black uppercase tracking-widest", currentLevel.textColor)}>
                        ระดับ: {currentLevel.label}
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-3xl">
                      {currentLevel.description}
                    </h2>
                  </div>

                  <div className="max-w-xl mx-auto w-full space-y-4">
                    <Slider
                      value={[score ?? 0]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(vals) => setScore(vals[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.2em]">
                      <span className="bg-slate-100 px-2 py-1 rounded">0 - MINIMUM</span>
                      <span className="text-slate-200">Scale Intensity</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">10 - MAXIMUM</span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 pt-8 w-full max-w-5xl">
                    <div className={cn("space-y-4 p-8 rounded-[2.5rem] border text-left shadow-sm transition-colors duration-500", 
                      currentLevel.bgColor, currentLevel.color
                    )}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn("p-2 rounded-xl bg-white shadow-sm border", currentLevel.textColor)}>
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <h3 className={cn("text-xs font-black uppercase tracking-widest opacity-60", currentLevel.textColor)}>
                          คำแนะนำ: Protocol Advice
                        </h3>
                      </div>
                      <p className={cn("font-bold leading-relaxed serif text-2xl lg:text-4xl", currentLevel.textColor)}>
                        {currentLevel.advice}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                      {score !== null && score >= 9 ? (
                        <Button 
                          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] h-20 text-xl font-black shadow-2xl shadow-red-100 transition-all active:scale-95 group uppercase tracking-widest" 
                          onClick={() => window.location.href = "tel:1669"}
                        >
                          <PhoneCall className="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform" />
                          โทร 1669 ฉุกเฉิน
                        </Button>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <Button 
                            className="w-full bg-slate-900 hover:bg-black text-white rounded-2xl h-20 text-xl font-black transition-all active:scale-95 shadow-xl shadow-slate-100 tracking-widest uppercase"
                            onClick={handleSubmit}
                          >
                            บันทึกข้อมูล
                          </Button>
                          <button 
                            className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-slate-500 transition-colors py-2"
                            onClick={handleReset}
                          >
                            Reset Assessment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[400px] border-4 border-dashed border-emerald-50 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 bg-white"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-8 shadow-sm border border-emerald-100">
                <Clock className="w-10 h-10 text-emerald-200 animate-pulse" />
              </div>
              <h3 className="text-emerald-300 font-black uppercase tracking-[0.5em] mb-4 text-sm">Waiting for selection</h3>
              <p className="text-slate-400 font-medium max-w-sm italic serif text-lg leading-relaxed">
                กรุณาเลือกรูปภาพด้านบนที่ตรงกับความรู้สึกของคุณมากที่สุด เพื่อเริ่มต้นการประเมินภาวะหายใจลำบาก
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Information Section */}
        <section className="grid md:grid-cols-2 gap-8 pt-12 border-t border-slate-50">
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Medical Disclaimer</h4>
            <p className="text-xs text-slate-400 font-medium leading-[1.8] italic serif">
              เครื่องมือนี้มีวัตถุประสงค์เพื่อการประเมินเบื้องต้นเท่านั้น ไม่สามารถทดแทนการวินิจฉัยโดยแพทย์ผู้เชี่ยวชาญได้ หากคุณมีอาการวิกฤต เจ็บหน้าอก หรือหายใจไม่สะดวกขั้นรุนแรง โปรดติดต่อสายด่วนฉุกเฉิน 1669 ทันที
            </p>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-200 uppercase mb-1">Clinic Reference</div>
                <div className="text-xs font-mono text-slate-300">#DS-V2-CRITICAL</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                <HeartPulse className="w-6 h-6" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
