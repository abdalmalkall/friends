import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const NUM_UWALLET = "0788779349";
const NUM_DINARAK = "0797546240";
const CONTACT_PHONE = "0797546240";
const WHATSAPP_INTL = "962797546240"; // بدون الصفر

const Index = () => {
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--pointer-x", `${x}px`);
    e.currentTarget.style.setProperty("--pointer-y", `${y}px`);
  };

  const copyAndNotify = async (label: string, number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      toast({
        title: "✅ تم نسخ الرقم!",
        description: `افتح تطبيق ${label} وأكمل التحويل.`,
      });
      return true;
    } catch (error) {
      toast({
        title: "❌ فشل نسخ الرقم!",
        description: `يرجى نسخ الرقم يدوياً: ${number}`,
        variant: "destructive",
      });
      return false;
    }
  };

  const tryOpenDeepLink = async (urls: string[], number: string, label: string) => {
    for (const url of urls) {
      try {
        const newWindow = window.open(url, "_blank");
        if (newWindow) {
          return;
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 500));
    }
    toast({
      title: "ℹ️ لم نتمكن من فتح التطبيق تلقائياً",
      description: `يرجى فتح تطبيق ${label} يدوياً واستخدام الرقم المنسوخ.`,
    });
  };

  const handleUWallet = async () => {
    const copied = await copyAndNotify("uWallet", NUM_UWALLET);
  
  };

  const handleDinarak = async () => {
    const copied = await copyAndNotify("Dinarak", NUM_DINARAK);
  
  };

  const whatsappText = encodeURIComponent("مرحباً، أرغب بشراء من سوبر ماركت الأصدقاء");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header
        ref={heroRef}
        onMouseMove={onMouseMove}
        className="hero-bg hero-surface text-[hsl(var(--brand-text-light))]"
      >
        <div className="container max-w-3xl py-12 md:py-16 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[hsl(var(--brand-gold))]">
             سوبر ماركت الأصدقاء
          </h1>
          <p className="mt-3 text-[hsl(var(--brand-text-muted))]">
            تجربة شراء راقية بخدمة توصيل فورية وطرق دفع إلكترونية موثوقة.
          </p>
        </div>
      </header>

      <main>
        {/* قسم الدفع الإلكتروني */}
        <section className="section-muted">
          <div className="container max-w-2xl py-10 md:py-12">
            <h2 className="text-2xl font-bold text-[hsl(var(--brand-gold))] mb-2">
              طرق الدفع المتوفرة
            </h2>
            <p className="text-muted-foreground mb-6">
              اختر طريقة الدفع الأنسب لك — ضغطة واحدة، ورقم المحفظة صار عندك. نحن نهتم أن تكون التجربة سهلة كما تستحق.
            </p>

            <div className="grid gap-3">
              <Button variant="uwallet" size="xl" onClick={handleUWallet} className="w-full animate-enter">
                💳 دفع عبر uWallet
              </Button>

              <Button variant="dinarak" size="xl" onClick={handleDinarak} className="w-full animate-enter">
                💳 دفع عبر Dinarak
              </Button>
            </div>

            <Alert className="mt-4 border-[hsl(var(--brand-gold))] bg-[hsl(var(--section-muted))]">
              <AlertTitle>📌 ملاحظة مهمة</AlertTitle>
              <AlertDescription>
                عند الضغط على زر الدفع، يتم نسخ الرقم تلقائيًا. افتح التطبيق المناسب (uWallet أو Dinarak) وأتم التحويل بكل سهولة.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* قسم التواصل والتوصيل */}
        <section>
          <div className="container max-w-2xl py-10 md:py-12">
            <h2 className="text-2xl font-bold text-[hsl(var(--brand-gold))] mb-2">
              🚚 خدمة التوصيل إلى باب بيتك
            </h2>
            <p className="text-muted-foreground mb-6">
              كل شيء يصلك… وكأنك معنا في السوبر ماركت. اطلب، وندبّر لك ما تحتاجه بخدمة توصيل سريعة ولبقة.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <Button variant="call" size="lg" asChild className="w-full">
                <a href={`tel:${CONTACT_PHONE}`} aria-label="اتصل الآن">
                  📞 اتصل الآن
                </a>
              </Button>

              <Button variant="whatsapp" size="lg" asChild className="w-full">
                <a
                  href={`https://wa.me/${WHATSAPP_INTL}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="راسلنا على واتساب"
                >
                  💬 راسلنا على واتساب
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* اللمسة الختامية */}
        <section className="section-muted">
          <div className="container max-w-2xl py-10 md:py-12 text-center animate-fade-in">
            <p className="text-lg md:text-xl">
              "لا تضيّع وقتك في البحث... الجودة، السعر المناسب، والخدمة الراقية تجدها كلها هنا – في سوبر ماركت الأصدقاء."
            </p>
          </div>
        </section>
      </main>

 
    </div>
  );
};

export default Index;
