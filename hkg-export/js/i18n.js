// HKG EXPORT - Internationalization (EN / AR)
const i18n = {
  en: {
    // Navigation
    nav: {
      whyHkg: "Why HKG",
      about: "About",
      countries: "Countries",
      brands: "Brands",
      vehicleTypes: "Vehicle Types",
      importGuide: "Import Guide",
      knowledge: "Knowledge",
      resources: "Resources",
      contact: "Contact",
      getQuote: "Get a Quote"
    },
    // Homepage
    home: {
      badge: "Global Vehicle Export Leader",
      title: "Driving Global Trade",
      titleHighlight: "One Car at a Time",
      subtitle: "Connecting Chinese automotive brands with global markets. We handle everything from sourcing to delivery across 30+ countries.",
      ctaPrimary: "Explore Our Fleet",
      ctaSecondary: "How It Works",
      stats: {
        countries: "Countries Served",
        brands: "Partner Brands",
        units: "Units Exported",
        years: "Years Experience"
      },
      quickEntry: {
        title: "Quick Navigation",
        countries: "Countries",
        countriesDesc: "30+ markets worldwide",
        brands: "Brands",
        brandsDesc: "20+ Chinese automakers",
        vehicleTypes: "Vehicle Types",
        vehicleTypesDesc: "EV, Hybrid, SUV & more",
        importGuide: "Import Guide",
        importGuideDesc: "Step-by-step process"
      },
      brands: "Trusted Brands We Export"
    },
    // Why HKG
    whyHkg: {
      title: "Why Choose HKG Export",
      subtitle: "We're not just exporters — we're your strategic partner in global automotive trade",
      features: [
        { icon: "🌍", title: "Global Network", desc: "Established partnerships in 30+ countries with local market expertise and regulatory knowledge." },
        { icon: "🚢", title: "End-to-End Logistics", desc: "Complete shipping solutions from factory door to destination port, including customs clearance." },
        { icon: "💰", title: "Competitive Pricing", desc: "Direct factory relationships ensure the best prices with transparent cost structures." },
        { icon: "📋", title: "Full Documentation", desc: "We handle all export documentation, compliance, and certification requirements." },
        { icon: "🔧", title: "After-Sales Support", desc: "Technical support, spare parts supply, and warranty management across markets." },
        { icon: "⚡", title: "Fast Turnaround", desc: "Efficient processes and established routes ensure quick delivery times." }
      ]
    },
    // About
    about: {
      title: "About HKG Export",
      subtitle: "Your trusted partner in Chinese automotive export since 2015",
      story: "HKG Export was founded with a simple mission: to make Chinese automotive brands accessible to the world. Starting from Hong Kong, we've grown into one of the leading vehicle export platforms, connecting over 20 major Chinese manufacturers with buyers in more than 30 countries across the Middle East, Africa, South America, and Asia.",
      story2: "Our team of automotive experts, logistics specialists, and trade professionals work tirelessly to ensure every transaction is smooth, compliant, and profitable for our partners.",
      milestones: [
        { year: "2015", text: "Founded in Hong Kong" },
        { year: "2017", text: "Expanded to 10 countries" },
        { year: "2019", text: "1000+ units exported" },
        { year: "2021", text: "Launched EV export division" },
        { year: "2023", text: "30+ countries, 20+ brands" }
      ]
    },
    // Countries
    countries: {
      title: "Countries We Serve",
      subtitle: "Active export markets across 4 continents",
      searchPlaceholder: "Search countries...",
      regions: {
        middleEast: "Middle East",
        africa: "Africa",
        southAmerica: "South America",
        asia: "Asia",
        other: "Other"
      }
    },
    // Brands
    brands: {
      title: "Our Brand Partners",
      subtitle: "Partnered with China's leading automotive manufacturers",
      models: "models"
    },
    // Vehicle Types
    vehicleTypes: {
      title: "Vehicle Types",
      subtitle: "From electric sedans to rugged pickups — we export them all",
      types: [
        { icon: "⚡", type: "Electric Vehicle", name: "Pure Electric", desc: "Zero-emission vehicles from BYD, Geely, and more. Range from 400-700km.", specs: ["400-700km Range", "Fast Charging", "Smart Features"] },
        { icon: "🔄", type: "Hybrid", name: "Hybrid / PHEV", desc: "Best of both worlds — electric efficiency with gas flexibility.", specs: ["1000km+ Range", "Low Emissions", "Fuel Efficient"] },
        { icon: "🚙", type: "SUV", name: "SUV / Crossover", desc: "Popular SUV models for all terrains and family needs.", specs: ["5-7 Seats", "AWD Options", "Spacious"] },
        { icon: "🛻", type: "Pickup", name: "Pickup Truck", desc: "Commercial and lifestyle pickups for work and adventure.", specs: ["1 Ton Payload", "4WD", "Durable"] },
        { icon: "🚗", type: "Sedan", name: "Sedan / Hatchback", desc: "Comfortable and efficient vehicles for daily driving.", specs: ["Fuel Efficient", "Comfortable", "Modern Tech"] }
      ]
    },
    // Import Guide
    importGuide: {
      title: "Import Guide",
      subtitle: "Your complete roadmap for importing vehicles from China",
      steps: [
        { step: "Step 1", title: "Shipping & Logistics", desc: "We arrange RoRo or container shipping from Chinese ports to your nearest destination. Average transit time: 15-45 days depending on location." },
        { step: "Step 2", title: "Tax & Duties", desc: "We provide detailed breakdown of import duties, VAT, and any applicable taxes for your country. No hidden fees." },
        { step: "Step 3", title: "Documentation", desc: "Bill of Lading, Certificate of Origin, Commercial Invoice, Packing List — we prepare everything." },
        { step: "Step 4", title: "Inspection & Compliance", desc: "Pre-shipment inspection, conformity certification, and country-specific compliance checks." },
        { step: "Step 5", title: "Customs Clearance", desc: "Our local partners assist with customs clearance at destination port for smooth delivery." }
      ]
    },
    // Knowledge Center
    knowledge: {
      title: "Knowledge Center",
      subtitle: "Insights, guides, and resources for automotive importers",
      tabs: {
        faq: "FAQ",
        dealerGuide: "Dealer Guide",
        businessGuide: "Business Guide",
        insights: "Market Insights",
        cases: "Case Studies"
      }
    },
    // Resources
    resources: {
      title: "Resources",
      subtitle: "Everything you need to start importing",
      download: {
        title: "Downloads",
        desc: "Access our latest catalogs, price lists, and documentation templates."
      },
      catalog: {
        title: "Vehicle Catalog",
        desc: "Browse our complete inventory of available vehicles with specifications."
      },
      sales: {
        title: "Contact Sales",
        desc: "Get personalized quotes and discuss your specific import needs."
      }
    },
    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "Let's discuss your import needs",
      form: {
        name: "Full Name",
        email: "Email Address",
        company: "Company",
        country: "Country",
        message: "Message",
        submit: "Send Message"
      },
      info: {
        email: { title: "Email", value: "export@hkg-motors.com" },
        phone: { title: "Phone", value: "+852 1234 5678" },
        address: { title: "Address", value: "Hong Kong, China" },
        hours: { title: "Business Hours", value: "Mon-Fri, 9:00-18:00 HKT" }
      }
    },
    // Footer
    footer: {
      desc: "Connecting Chinese automotive brands with global markets. Your trusted partner in vehicle export.",
      quickLinks: "Quick Links",
      products: "Products",
      support: "Support",
      rights: "All rights reserved."
    }
  },

  ar: {
    // Navigation
    nav: {
      whyHkg: "لماذا HKG",
      about: "عن الشركة",
      countries: "الدول",
      brands: "العلامات التجارية",
      vehicleTypes: "أنواع المركبات",
      importGuide: "دليل الاستيراد",
      knowledge: "مركز المعرفة",
      resources: "الموارد",
      contact: "اتصل بنا",
      getQuote: "اطلب عرض سعر"
    },
    // Homepage
    home: {
      badge: "الشركة الرائدة في تصدير السيارات عالمياً",
      title: "نقود التجارة العالمية",
      titleHighlight: "سيارة واحدة في كل مرة",
      subtitle: "نربط العلامات التجارية الصينية للسيارات بالأسواق العالمية. نتولى كل شيء من التوريد إلى التسليم في أكثر من 30 دولة.",
      ctaPrimary: "استكشف أسطولنا",
      ctaSecondary: "كيف يعمل",
      stats: {
        countries: "دولة نخدمها",
        brands: "علامة تجارية شريكة",
        units: "وحدة مصدرة",
        years: "سنوات من الخبرة"
      },
      quickEntry: {
        title: "التنقل السريع",
        countries: "الدول",
        countriesDesc: "أكثر من 30 سوقاً حول العالم",
        brands: "العلامات التجارية",
        brandsDesc: "أكثر من 20 مصنع سيارات صيني",
        vehicleTypes: "أنواع المركبات",
        vehicleTypesDesc: "كهربائية، هجينة، SUV وغيرها",
        importGuide: "دليل الاستيراد",
        importGuideDesc: "عملية خطوة بخطوة"
      },
      brands: "علامات تجارية موثوقة نصدرها"
    },
    // Why HKG
    whyHkg: {
      title: "لماذا تختار HKG Export",
      subtitle: "نحن لسنا مجرد مصدرين — نحن شريكك الاستراتيجي في تجارة السيارات العالمية",
      features: [
        { icon: "🌍", title: "شبكة عالمية", desc: "شراكات قائمة في أكثر من 30 دولة مع خبرة محلية ومعرفة تنظيمية." },
        { icon: "🚢", title: "لوجستيات شاملة", desc: "حلول شحن كاملة من باب المصنع إلى ميناء الوجهة، بما في ذلك التخليص الجمركي." },
        { icon: "💰", title: "أسعار تنافسية", desc: "علاقات مباشرة مع المصنع تضمن أفضل الأسعار مع هياكل تكاليف شفافة." },
        { icon: "📋", title: "وثائق كاملة", desc: "نتولى جميع وثائق التصدير والامتثال ومتطلبات الشهادات." },
        { icon: "🔧", title: "دعم ما بعد البيع", desc: "دعم فني، توفير قطع الغيار، وإدارة الضمان عبر الأسواق." },
        { icon: "⚡", title: "سرعة الإنجاز", desc: "عمليات فعالة وطرق قائمة تضمن أوقات تسليم سريعة." }
      ]
    },
    // About
    about: {
      title: "عن HKG Export",
      subtitle: "شريكك الموثوق في تصدير السيارات الصينية منذ 2015",
      story: "تأسست HKG Export بمهمة بسيطة: جعل العلامات التجارية الصينية للسيارات متاحة للعالم. بدءاً من هونغ كونغ، أصبحنا واحدة من منصات تصدير السيارات الرائدة، نربط أكثر من 20 مصنع صيني كبير بمشترين في أكثر من 30 دولة عبر الشرق الأوسط وأفريقيا وأمريكا الجنوبية وآسيا.",
      story2: "فريقنا من خبراء السيارات ومتخصصي اللوجستيات ومحترفي التجارة يعمل بلا كلل لضمان أن كل صفقة سلسة ومتوافقة ومربحة لشركائنا.",
      milestones: [
        { year: "2015", text: "تأسست في هونغ كونغ" },
        { year: "2017", text: "توسعنا إلى 10 دول" },
        { year: "2019", text: "أكثر من 1000 وحدة مصدرة" },
        { year: "2021", text: "إطلاق قسم تصدير السيارات الكهربائية" },
        { year: "2023", text: "أكثر من 30 دولة، 20 علامة تجارية" }
      ]
    },
    // Countries
    countries: {
      title: "الدول التي نخدمها",
      subtitle: "أسواق التصدير النشطة عبر 4 قارات",
      searchPlaceholder: "ابحث عن دولة...",
      regions: {
        middleEast: "الشرق الأوسط",
        africa: "أفريقيا",
        southAmerica: "أمريكا الجنوبية",
        asia: "آسيا",
        other: "أخرى"
      }
    },
    // Brands
    brands: {
      title: "شركاؤنا من العلامات التجارية",
      subtitle: "شراكة مع كبار مصنعي السيارات في الصين",
      models: "طراز"
    },
    // Vehicle Types
    vehicleTypes: {
      title: "أنواع المركبات",
      subtitle: "من السيارات الكهربائية إلى شاحنات البيك اب القوية — نصدرها جميعاً",
      types: [
        { icon: "⚡", type: "مركبة كهربائية", name: "كهربائية نقية", desc: "مركبات بدون انبعاثات من BYD وGeely وغيرها. مدى 400-700 كم.", specs: ["مدى 400-700 كم", "شحن سريع", "ميزات ذكية"] },
        { icon: "🔄", type: "هجينة", name: "هجينة / PHEV", desc: "أفضل ما في العالمين — كفاءة الكهرباء مع مرونة البنزين.", specs: ["مدى 1000+ كم", "انبعاثات منخفضة", "كفاءة وقود"] },
        { icon: "🚙", type: "SUV", name: "SUV / كروس أوفر", desc: "موديلات SUV شعبية لجميع التضاريس واحتياجات العائلة.", specs: ["5-7 مقاعد", "خيارات دفع رباعي", "واسعة"] },
        { icon: "🛻", type: "بيك أب", name: "شاحنة بيك أب", desc: "بيك أب تجارية وحياتية للعمل والمغامرة.", specs: ["حمولة 1 طن", "دفع رباعي", "متينة"] },
        { icon: "🚗", type: "سيدان", name: "سيدان / هاتشباك", desc: "مركبات مريحة وفعالة للقيادة اليومية.", specs: ["كفاءة وقود", "مريحة", "تقنية حديثة"] }
      ]
    },
    // Import Guide
    importGuide: {
      title: "دليل الاستيراد",
      subtitle: "خريطتك الكاملة لاستيراد المركبات من الصين",
      steps: [
        { step: "الخطوة 1", title: "الشحن واللوجستيات", desc: "نرتب شحن RoRo أو حاويات من الموانئ الصينية إلى أقرب ميناء وجهة. متوسط وقت العبور: 15-45 يوماً حسب الموقع." },
        { step: "الخطوة 2", title: "الضرائب والرسوم", desc: "نقدم تفصيلاً مفصلاً لرسوم الاستيراد وضريبة القيمة المضافة وأي ضرائب سارية لبلدك. بدون رسوم خفية." },
        { step: "الخطوة 3", title: "الوثائق", desc: "بوليصة الشحن، شهادة المنشأ، الفاتورة التجارية، قائمة التعبئة — نعد كل شيء." },
        { step: "الخطوة 4", title: "الفحص والامتثال", desc: "فحص قبل الشحن، شهادة المطابقة، وفحوصات الامتثال الخاصة بكل دولة." },
        { step: "الخطوة 5", title: "التخليص الجمركي", desc: "شركاؤنا المحليون يساعدون في التخليص الجمركي في ميناء الوجهة لتسليم سلس." }
      ]
    },
    // Knowledge Center
    knowledge: {
      title: "مركز المعرفة",
      subtitle: "رؤى وأدلة وموارد لمستوردي السيارات",
      tabs: {
        faq: "الأسئلة الشائعة",
        dealerGuide: "دليل الموزع",
        businessGuide: "دليل الأعمال",
        insights: "رؤى السوق",
        cases: "دراسات حالة"
      }
    },
    // Resources
    resources: {
      title: "الموارد",
      subtitle: "كل ما تحتاجه لبدء الاستيراد",
      download: {
        title: "التنزيلات",
        desc: "الوصول إلى أحدث الكتالوجات وقوائم الأسعار ونماذج الوثائق."
      },
      catalog: {
        title: "كتالوج المركبات",
        desc: "تصفح مخزوننا الكامل من المركبات المتاحة مع المواصفات."
      },
      sales: {
        title: "اتصل بالمبيعات",
        desc: "احصل على عروض أسعار مخصصة وناقش احتياجات الاستيراد الخاصة بك."
      }
    },
    // Contact
    contact: {
      title: "اتصل بنا",
      subtitle: "دعنا نناقش احتياجات الاستيراد الخاصة بك",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        company: "الشركة",
        country: "الدولة",
        message: "الرسالة",
        submit: "إرسال الرسالة"
      },
      info: {
        email: { title: "البريد الإلكتروني", value: "export@hkg-motors.com" },
        phone: { title: "الهاتف", value: "+852 1234 5678" },
        address: { title: "العنوان", value: "هونغ كونغ، الصين" },
        hours: { title: "ساعات العمل", value: "الإثنين-الجمعة، 9:00-18:00 بتوقيت هونغ كونغ" }
      }
    },
    // Footer
    footer: {
      desc: "نربط العلامات التجارية الصينية للسيارات بالأسواق العالمية. شريكك الموثوق في تصدير المركبات.",
      quickLinks: "روابط سريعة",
      products: "المنتجات",
      support: "الدعم",
      rights: "جميع الحقوق محفوظة."
    }
  }
};

// Current language
let currentLang = localStorage.getItem('hkg-lang') || 'en';

// Translation helper
function t(key) {
  const keys = key.split('.');
  let value = i18n[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  return value || key;
}

// Apply language to page
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('hkg-lang', lang);
  
  const html = document.documentElement;
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    // Load Cairo font for Arabic
    if (!document.getElementById('cairo-font')) {
      const link = document.createElement('link');
      link.id = 'cairo_font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (typeof translation === 'string') {
      el.textContent = translation;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update lang switch button
  const langBtn = document.querySelector('.lang-switch');
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'العربية' : 'English';
  }
}

// Toggle language
function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  applyLanguage(newLang);
}
