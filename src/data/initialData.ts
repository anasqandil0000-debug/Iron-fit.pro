import { Product, Review, Order, NotificationItem } from '../types/store';

import barbellImg from '../assets/images/product_olympic_barbell_1791723805859.jpg';
import benchImg from '../assets/images/product_adjustable_bench_1791723816166.jpg';
import treadmillImg from '../assets/images/product_smart_treadmill_1791723826063.jpg';
import glovesImg from '../assets/images/product_boxing_gloves_1791723836349.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'IF-BAR-20KG',
    name: 'طقم البار الأولمبي الاحترافي مع أوزان مطاطية 100 كجم',
    nameEn: 'Olympic Barbell & Bumper Plates 100kg Set',
    category: 'weights',
    categoryLabel: 'أوزان وأثقال',
    price: 1850,
    originalPrice: 2200,
    rating: 4.9,
    reviewCount: 38,
    stock: 8,
    image: barbellImg,
    description: 'بار أولمبي معتمد لرفع الأثقال والكروس فيت بقطر 50 مم مع محامل كروية دقيقة وخشونة مسكة (Knurling) محسوبة لمنع الانزلاق. مرفق معه طقم أقراص مطاطية Bumper Plates عالية الكثافة امتصاصية للصدمات.',
    features: [
      'فولاذ صلب مقوى يتحمل حتى 680 كجم (1500 رطل)',
      'محامل نحاسية وكروية مزدوجة لدوران فائق السلاسة',
      'أقراص مطاطية ممتصة للصوت والارتداد لحماية الأرضيات',
      'قطر المقبض 28 مم مطابق للمواصفات الدولية'
    ],
    specs: {
      'الوزن الإجمالي': '100 كجم (بار 20 كجم + أقراص 80 كجم)',
      'طول البار': '220 سم',
      'المادة': 'فولاذ كربوني مطلي بالكروم المقاوم للصدأ',
      'الضمان': 'ضمان 5 سنوات ضد الكسر والاعوجاج',
      'بلد المنشأ': 'تايوان'
    },
    isBestSeller: true,
    warranty: 'ضمان ذهبي 5 سنوات'
  },
  {
    id: 'prod-2',
    sku: 'IF-BNCH-PRO',
    name: 'مقعد تمارين متعدد الزوايا شديد التحمل Commercial Pro',
    nameEn: 'Heavy Duty Multi-Angle Adjustable Workout Bench',
    category: 'benches',
    categoryLabel: 'مقاعد وأقفاص تدريب',
    price: 980,
    originalPrice: 1250,
    rating: 4.8,
    reviewCount: 29,
    stock: 5,
    image: benchImg,
    description: 'مقعد تمرين تجاري قابل للتعديل بـ 7 زوايا مختلفة للمسند و3 زوايا للمقعد، مصمم بهيكل فولاذي قوي ووسائد عالية الكثافة مع مسند قدم مدمج لتوفير أقصى درجات الثبات أثناء رفع الأوزان الثقيلة.',
    features: [
      'تعديل سلس بـ 7 درجات (من -15 درجة انحدار حتى 90 درجة استقامة)',
      'وسادة إسفنجية مضغوطة بسماكة 7 سم مكسوة بجلد صناعي مقاوم للتعرق',
      'عجلات خلفية ومقبض أمامي لسهولة النقل والتخزين داخل المنزل أو الجيم',
      'هيكل فولاذي أنبوبي قياس 2.5 مم يتحمل وزن يصل إلى 400 كجم'
    ],
    specs: {
      'أقصى حمل': '400 كجم',
      'الأبعاد': '145 سم × 55 سم × 46 سم',
      'وزن المقعد': '28 كجم',
      'الطلاء': 'بودرة إلكتروستاتيك مقاومة للخدش والتآكل',
      'الضمان': 'ضمان 3 سنوات على الهيكل'
    },
    isBestSeller: true,
    warranty: 'ضمان 3 سنوات'
  },
  {
    id: 'prod-3',
    sku: 'IF-TRD-X7',
    name: 'جهاز سير كهربائي ذكي Smart Pro X7 بمحرك 4.5 حصان',
    nameEn: 'Smart Cardio Treadmill Pro X7 with HD Touchscreen',
    category: 'cardio',
    categoryLabel: 'أجهزة الكارديو',
    price: 3450,
    originalPrice: 4100,
    rating: 4.9,
    reviewCount: 44,
    stock: 3,
    image: treadmillImg,
    description: 'جهاز جري منزلي واحترافي فائق التطور بمحرك تيار مستمر هادئ، شاشة لمس ملونة عالية الدقة، ونظام امتصاص صدمات هيدروليكي سداسي لحماية مفاصل الركبة والظهر أثناء الجري المكثف.',
    features: [
      'شاشة ذكية HD تدعم تطبيقات التدريب واليوتيوب وبلوتوث لقياس نبضات القلب',
      'سرعة قصوى تصل إلى 20 كم/ساعة وانحدار آلي إلكتروني حتى 15%',
      'نظام امتصاص صدمات متعدد الطبقات يخفف 40% من الضغط على المفاصل',
      'تصميم هيدروليكي قابل للطي لتوفير المساحة بمجرد لمسة زر واحدة'
    ],
    specs: {
      'قوة المحرك': '4.5 حصان (Peak Power)',
      'مساحة الجري': '140 سم × 52 سم',
      'أقصى وزن للمستخدم': '160 كجم',
      'البرامج التدريبية': '24 برنامج مسبق الإعداد',
      'الضمان': 'ضمان شامل 5 سنوات على المحرك وسنتين على الأجزاء'
    },
    isNewArrival: true,
    warranty: 'ضمان 5 سنوات على المحرك'
  },
  {
    id: 'prod-4',
    sku: 'IF-BOX-GLV',
    name: 'قفازات ملاكمة احترافية من الجلد الطبيعي Velocity Pro',
    nameEn: 'Velocity Pro Genuine Leather Boxing & Sparring Gloves',
    category: 'combat',
    categoryLabel: 'رياضات قتالية',
    price: 320,
    originalPrice: 390,
    rating: 4.7,
    reviewCount: 52,
    stock: 14,
    image: glovesImg,
    description: 'قفازات ملاكمة وتدريب كيك بوكسينغ مصنوعة يدوياً من أفخر أنواع الجلد الطبيعي المحبب مع حشوة رغوية ثلاثية الطبقات لحماية قبضة اليد والمعصم أثناء الضربات القوية.',
    features: [
      'جلد طبيعي ممتاز 100% يدوم لسنوات دون تشقق',
      'نظام إغلاق بمعصم عريض مع لاصق فيلكرو مقوى لدعم المعصم وتثبيته',
      'شبكة تهوية داخلية مضادة للرائحة والبكتيريا تحافظ على جفاف اليدين',
      'تصميم مقوس تشريحياً يضمن قبضة طبيعية ومريحة'
    ],
    specs: {
      'المقاسات': '12 أونصة / 14 أونصة / 16 أونصة',
      'المادة الخارجية': 'جلد بقري طبيعي ممتاز',
      'الحشوة': 'رغوة إيفا ثلاثية الكثافة عالية الامتصاص',
      'الاستخدام': 'الملاكمة، مواي تاي، التمارين على كيس اللكم',
      'الضمان': 'ضمان سنة كاملة'
    },
    isBestSeller: true,
    warranty: 'ضمان سنة'
  },
  {
    id: 'prod-5',
    sku: 'IF-DMB-SET',
    name: 'طقم دمبلز سداسي مطاطي Hex Dumbbells من 2.5 إلى 25 كجم',
    nameEn: 'Rubber Hex Dumbbell Full Set with Storage Rack',
    category: 'weights',
    categoryLabel: 'أوزان وأثقال',
    price: 2150,
    originalPrice: 2600,
    rating: 4.9,
    reviewCount: 31,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80',
    description: 'طقم متكامل من الأثقال الحرة السداسية المكسوة بمطاط خام طبيعي لمنع التدحرج والضوضاء، مع مقبض كروم مصمم هندسياً ليمنحك ثباتاً تاماً في جميع تمارين العضلات.',
    features: [
      'تصميم سداسي يمنع التدحرج ويسهل أداء تمارين البوش آب بالدمبل',
      'مطاط خام متين يحمي الأرضيات من الكسر والتآكل',
      'مقبض مريح مطلي بالكروم مع تخشين مسكة ضد الانزلاق',
      'يشمل حامل ثلاثي الطبقات متين لتنظيم الأوزان في صالتك'
    ],
    specs: {
      'الأوزان المشمولة': '5 أزواج (2.5، 5، 10، 15، 25 كجم)',
      'المادة': 'حديد زهر مكسو بمطاط صناعي عالي الكثافة',
      'الحامل': 'فولاذ أسود مطفي مع مساند واقية',
      'الضمان': 'ضمان 3 سنوات'
    },
    isBestSeller: true,
    warranty: 'ضمان 3 سنوات'
  },
  {
    id: 'prod-6',
    sku: 'IF-BIKE-AIR',
    name: 'دراجة هوائية للتدريب المتقاطع Air Assault Bike Pro',
    nameEn: 'Commercial Wind Resistance Cross-Training Assault Bike',
    category: 'cardio',
    categoryLabel: 'أجهزة الكارديو',
    price: 2890,
    originalPrice: 3400,
    rating: 4.8,
    reviewCount: 19,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80',
    description: 'دراجة المقاومة الهوائية المصممة لتمارين الـ HIIT والكروس فيت عالية الكثافة. كلما زادت قوة البدال زادت المقاومة الهوائية لتمرين كامل لعضلات الجزء العلوي والسفلي معاً.',
    features: [
      'مروحة هوائية فولاذية بقطر 68 سم تولد مقاومة ديناميكية لا محدودة',
      'شاشة رقمية تعرض السعرات، المسافة، القدرة بالواط ومعدل ضربات القلب',
      'مقعد مريح قابل للتعديل في 4 اتجاهات ليناسب جميع أطوال المتدربين',
      'هيكل فولاذي شديد الصلابة ثابت تماماً حتى في أقصى سرعات التسارع'
    ],
    specs: {
      'نظام المقاومة': 'مقاومة هوائية غير محدودة',
      'أقصى وزن للمستخدم': '150 كجم',
      'الوزن الصافي': '49 كجم',
      'نظام الدفع': 'سلسلة فولاذية مزدوجة التحمل',
      'الضمان': 'ضمان 3 سنوات'
    },
    isNewArrival: true,
    warranty: 'ضمان 3 سنوات'
  },
  {
    id: 'prod-7',
    sku: 'IF-RCK-PWR',
    name: 'قفص تمارين القوة المتكامل Power Rack مع ملحقات السحب',
    nameEn: 'Full Commercial Power Cage Rack with Lat Pull-Down',
    category: 'benches',
    categoryLabel: 'مقاعد وأقفاص تدريب',
    price: 4200,
    originalPrice: 4950,
    rating: 5.0,
    reviewCount: 22,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    description: 'محطة تدريب حديدية متكاملة للجيم والمنزل تحتوي على أعمدة رفع أثقال أمان، عقلة متعددة القبضات، بكرة سحب علوية وسفلية (Lat Pulldown & Low Row) وحوامل للأوزان الأولمبية.',
    features: [
      'أنابيب فولاذية مقاس 75×75 مم بسماكة 3 مم لأعلى درجات الأمان',
      'نظام بكرات سحب علوي وسفلي فائق السلاسة لكافة تمارين الظهر والترايسبس',
      'مرفق حوامل J-Hooks مبطنة بالنايلون لحماية البار من الخدش',
      'أذرع أمان ثقيلة للسكوات والضغط لضمان التمرين الفردي دون مساعدة'
    ],
    specs: {
      'القدرة الاستيعابية': '550 كجم',
      'الأبعاد': '215 سم ارتفاع × 130 سم عرض × 140 سم عمق',
      'الوزن الإجمالي': '115 كجم',
      'الضمان': 'ضمان 10 سنوات على الهيكل الفولاذي'
    },
    isBestSeller: true,
    warranty: 'ضمان 10 سنوات'
  },
  {
    id: 'prod-8',
    sku: 'IF-BAG-PNC',
    name: 'كيس ملاكمة معلق مع حشو امتصاصي 50 كجم + سلاسل تثبيت',
    nameEn: 'Heavy Duty 50kg Hanging Punching Bag with Swivel Chain',
    category: 'combat',
    categoryLabel: 'رياضات قتالية',
    price: 490,
    originalPrice: 620,
    rating: 4.6,
    reviewCount: 41,
    stock: 11,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'كيس ملاكمة احترافي بطول 120 سم محشو بأقمشة مضغوطة ورغوة مرنة لامتصاص أقصى الصدمات دون التأثير على معصم اليد أو المفاصل، مجهز بسلاسل دوارة تمنع الالتواء.',
    features: [
      'جلد صناعي مقوى بخيوط نيلون رباعية التماسك ضد التمزق',
      'سلسلة فولاذية مع وصلة دوران 360 درجة لتوزيع الطاقة',
      'حشو داخلي متوازن يضمن استقرار الكيس أثناء اللكمات المتتالية',
      'حلقة تثبيت سفلية للربط بالأرضية لتقليل التأرجح الزائد'
    ],
    specs: {
      'الوزن': '50 كجم',
      'الارتفاع': '120 سم، القطر: 40 سم',
      'المادة': 'بولي يوريثان مصفح متعدد الطبقات',
      'الضمان': 'ضمان سنتين ضد التمزق'
    },
    warranty: 'ضمان سنتين'
  },
  {
    id: 'prod-9',
    sku: 'IF-BND-PRO',
    name: 'طقم أشرطة المقاومة اللاتكس الطبيعية مع مقابض وحزام كاحل',
    nameEn: 'Pro Resistance Bands Set 150 LBS with Handles & Door Anchor',
    category: 'accessories',
    categoryLabel: 'إكسسوارات ولياقة منزلية',
    price: 145,
    originalPrice: 195,
    rating: 4.8,
    reviewCount: 68,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    description: 'مجموعة أحبال مقاومة مكونة من 5 مستويات مختلفة مصنوعة من اللاتكس الماليزي النقي 100% تعادل ما يصل إلى 150 رطلاً من المقاومة، مثالية لتمارين الإحماء، السفر، وبناء العضلات في المنزل.',
    features: [
      '5 أشرطة ملونة بمستويات مقاومة من 10 أرطال حتى 50 رطلاً لكل حبل',
      'مقابض فوم مريحة وحلقات فولاذية متينة ضد الانقطاع',
      'مرساة باب مبطنة تسمح بتحويل أي باب لغرفة تمرين متكاملة',
      'حقيبة حمل مدمجة خفيفة الوزن للتنقل والرحلات'
    ],
    specs: {
      'المادة': 'مطاط لاتكس طبيعي 100%',
      'المقاومة الإجمالية': '150 رطل (68 كجم)',
      'الملحقات': '5 أشرطة، مقبضين، حزامين كاحل، مثبت باب، حقيبة',
      'الضمان': 'ضمان استبدال فوري لمدة سنة'
    },
    isBestSeller: true,
    warranty: 'ضمان استبدال سنة'
  },
  {
    id: 'prod-10',
    sku: 'IF-GUN-MSG',
    name: 'جهاز المساج والاستشفاء العضلي العميق Massage Gun Pro V3',
    nameEn: 'Deep Tissue Muscle Percussion Massage Gun Pro V3',
    category: 'accessories',
    categoryLabel: 'إكسسوارات ولياقة منزلية',
    price: 360,
    originalPrice: 480,
    rating: 4.9,
    reviewCount: 47,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    description: 'مسدس تدليك واسترخاء عضلي نبضي محمول بقوة 3200 دورة في الدقيقة لتفكيك العقد العضلية وتسريع التعافي بعد التمارين الرياضية الشاقة، مع 6 رؤوس تدليك متخصصة وبطارية تدوم 8 ساعات.',
    features: [
      'محرك عزم فائق الصمت يعمل بتقنية Quiet Glide',
      '30 مستوى سرعة مع شاشة لمس LCD ذكية لمراقبة القوة والبطارية',
      '6 رؤوس تدليك سيليكونية مصممة لمختلف المجموعات العضلية',
      'بطارية ليثيوم 2600 مللي أمبير تدوم حتى 8 ساعات شحن سريع'
    ],
    specs: {
      'التردد': '1200 - 3200 نبضة/دقيقة',
      'مستوى الصوت': 'أقل من 40 ديسيبل',
      'الوزن': '0.9 كجم مع مقبض مطاطي مانع للانزلاق',
      'الشاحن': 'شحن سريع عبر منفذ Type-C',
      'الضمان': 'ضمان سنتين'
    },
    isNewArrival: true,
    warranty: 'ضمان سنتين'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    author: 'عبدالرحمن الشهري',
    rating: 5,
    date: '2026-03-28',
    comment: 'البار جودته تفوق التوقعات! المحامل تدور بنعومة خيالية بدون أي تعليق، والأقراص المطاطية ممتازة جداً ما تطلع صوت عالي وقت الديدلفت. أنصح به بشدة لكل من يبني صالة منزلية.',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    author: 'كابتن طارق ناصر',
    rating: 5,
    date: '2026-03-15',
    comment: 'كمدرب أثقال استخدمت بارات كثيرة، تخشين المسكة هنا ممتاز ومريح لليد بدون ما يجرح الجلد. شحن سريع وتغليف احترافي من المتجر.',
    verifiedPurchase: true,
    helpfulCount: 16
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    author: 'فيصل العتيبي',
    rating: 5,
    date: '2026-04-01',
    comment: 'مقعد تمرين جبار وثابت على الأرض بدون أي اهتزاز حتى مع أوزان تفوق 100 كجم في تمرين الصدر. تغيير الزوايا سهل وسريع جداً.',
    verifiedPurchase: true,
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    author: 'سعود المنصور',
    rating: 5,
    date: '2026-03-20',
    comment: 'جهاز السير هادئ للغاية والشاشة واضحة وممتعة أثناء الجري. نظام امتصاص الصدمات ممتاز وريح ركبي تماماً مقارنة بالأجهزة القديمة.',
    verifiedPurchase: true,
    helpfulCount: 31
  },
  {
    id: 'rev-5',
    productId: 'prod-4',
    author: 'بدر الشمري',
    rating: 5,
    date: '2026-04-05',
    comment: 'جلد أصلي فاخر ورائحته واضحة، دعم المعصم ممتاز جداً ويحمي اليد وقت السبارينغ واللكم الثقيل. تستاهل كل ريال.',
    verifiedPurchase: true,
    helpfulCount: 12
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SP-8941',
    customerName: 'فهد إبراهيم السعد',
    customerPhone: '+966 50 123 4567',
    customerEmail: 'fahad.alsad@example.com',
    city: 'الرياض',
    address: 'حي النرجس، شارع الأمير فيصل، فيلا 14',
    notes: 'يرجى الاتصال قبل الوصول بنصف ساعة والتوصيل في الفترة المسائية',
    items: [
      {
        productId: 'prod-1',
        productName: 'طقم البار الأولمبي الاحترافي مع أوزان مطاطية 100 كجم',
        price: 1850,
        quantity: 1,
        image: barbellImg
      },
      {
        productId: 'prod-2',
        productName: 'مقعد تمارين متعدد الزوايا شديد التحمل Commercial Pro',
        price: 980,
        quantity: 1,
        image: benchImg
      }
    ],
    subtotal: 2830,
    shippingFee: 0,
    discount: 150,
    totalAmount: 2680,
    paymentMethod: 'apple_pay',
    status: 'out_for_delivery',
    createdAt: '2026-04-10 11:30',
    trackingNumber: 'SMSA-9920148',
    courier: 'سمسا إكسبريس (SMSA Express)',
    estimatedDelivery: 'اليوم خلال 3 ساعات (بين 4:00 - 7:00 مساءً)',
    driverName: 'عمر القحطاني',
    driverPhone: '+966 55 987 6543',
    timeline: [
      {
        status: 'new',
        label: 'تم استلام وتأكيد الطلب',
        timestamp: '10 أبريل 2026 - 11:30 ص',
        note: 'تمت عملية الدفع بنجاح عبر Apple Pay وتم تأكيد حجز المنتجات من المستودع المركزي.',
        completed: true
      },
      {
        status: 'processing',
        label: 'قيد التجهيز والتغليف الآمن',
        timestamp: '10 أبريل 2026 - 01:15 م',
        note: 'تم فحص جودة الأوزان والمقعد وتغليفها بصناديق مصفحة مدعمة.',
        completed: true
      },
      {
        status: 'shipped',
        label: 'تم الشحن والتسليم للناقل',
        timestamp: '10 أبريل 2026 - 06:40 م',
        note: 'تم استلام الشحنة من قبل سمسا إكسبريس في مركز الفرز بالرياض.',
        completed: true
      },
      {
        status: 'out_for_delivery',
        label: 'المندوب في الطريق للتوصيل',
        timestamp: 'اليوم - 02:10 م',
        note: 'الشحنة مع المندوب عمر القحطاني، في الطريق لحي النرجس.',
        completed: true
      },
      {
        status: 'delivered',
        label: 'تم التسليم والتركيب بنجاح',
        timestamp: 'متوقع اليوم 05:30 م',
        note: 'سيتم تسليم الشحنة والتوقيع على استلام الضمان.',
        completed: false
      }
    ]
  },
  {
    id: 'SP-8722',
    customerName: 'سارة خالد الدوسري',
    customerPhone: '+966 54 876 5432',
    customerEmail: 'sara.khalid@example.com',
    city: 'جدة',
    address: 'حي الشاطئ، برج اللؤلؤة، شقة 802',
    items: [
      {
        productId: 'prod-3',
        productName: 'جهاز سير كهربائي ذكي Smart Pro X7 بمحرك 4.5 حصان',
        price: 3450,
        quantity: 1,
        image: treadmillImg
      }
    ],
    subtotal: 3450,
    shippingFee: 0,
    discount: 0,
    totalAmount: 3450,
    paymentMethod: 'tabby',
    status: 'shipped',
    createdAt: '2026-04-09 16:20',
    trackingNumber: 'ARAMEX-4418290',
    courier: 'أرامكس (Aramex)',
    estimatedDelivery: 'غداً 12 أبريل 2026',
    driverName: 'محمود السيد',
    driverPhone: '+966 56 112 2334',
    timeline: [
      {
        status: 'new',
        label: 'تم استلام الطلب',
        timestamp: '09 أبريل 2026 - 04:20 م',
        note: 'تمت الموافقة على خطة التقسيط عبر تابي (4 دفعات بقيمة 862.5 ر.س).',
        completed: true
      },
      {
        status: 'processing',
        label: 'قيد التجهيز واختبار التشغيل',
        timestamp: '09 أبريل 2026 - 07:00 م',
        note: 'تم اختبار محرك السير والشاشة والتأكد من سلامة كرتون التغليف.',
        completed: true
      },
      {
        status: 'shipped',
        label: 'تم الشحن بين المدن',
        timestamp: '10 أبريل 2026 - 09:30 ص',
        note: 'الشحنة غادرت مستودع الرياض باتجاه محطة جدة للتوزيع.',
        completed: true
      },
      {
        status: 'out_for_delivery',
        label: 'جاري التوصيل للمنزل',
        timestamp: 'متوقع 12 أبريل',
        note: 'بانتظار وصول الشاحنة لمركز التوزيع المحلي.',
        completed: false
      },
      {
        status: 'delivered',
        label: 'تم التسليم والتركيب',
        timestamp: 'متوقع 12 أبريل',
        note: 'فريق التركيب المجاني سيقوم بتركيب السير وضبطه.',
        completed: false
      }
    ]
  },
  {
    id: 'SP-8650',
    customerName: 'عبدالعزيز المطيري',
    customerPhone: '+966 53 445 6677',
    customerEmail: 'aziz.mutairi@example.com',
    city: 'الدمام',
    address: 'حي الشاطئ الغربي، شارع 18',
    items: [
      {
        productId: 'prod-4',
        productName: 'قفازات ملاكمة احترافية من الجلد الطبيعي Velocity Pro',
        price: 320,
        quantity: 2,
        image: glovesImg
      }
    ],
    subtotal: 640,
    shippingFee: 0,
    discount: 50,
    totalAmount: 590,
    paymentMethod: 'mada',
    status: 'delivered',
    createdAt: '2026-04-07 14:10',
    trackingNumber: 'SMSA-8819203',
    courier: 'سمسا إكسبريس',
    estimatedDelivery: 'تم التسليم في 09 أبريل 2026',
    driverName: 'سلمان الدوسري',
    driverPhone: '+966 50 778 9900',
    timeline: [
      {
        status: 'new',
        label: 'تم استلام وتأكيد الطلب',
        timestamp: '07 أبريل 2026 - 02:10 م',
        note: 'تم الدفع بنجاح عبر بطاقة مدى.',
        completed: true
      },
      {
        status: 'processing',
        label: 'التجهيز والتغليف',
        timestamp: '07 أبريل 2026 - 04:30 م',
        note: 'تم تجهيز قفازات الملاكمة مع هدايا أربطة معصم مجانية.',
        completed: true
      },
      {
        status: 'shipped',
        label: 'تم الشحن',
        timestamp: '08 أبريل 2026 - 10:00 ص',
        note: 'تم النقل لفرع الدمام.',
        completed: true
      },
      {
        status: 'out_for_delivery',
        label: 'جاري التوصيل',
        timestamp: '09 أبريل 2026 - 01:20 م',
        note: 'المندوب تواصل مع العميل للتوصيل.',
        completed: true
      },
      {
        status: 'delivered',
        label: 'تم التسليم بنجاح',
        timestamp: '09 أبريل 2026 - 03:45 م',
        note: 'تم تسليم الطلب للعميل واستلام التوقيع الإلكتروني.',
        completed: true
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'تنبيه وصول منتج جديد 🔥',
    message: 'وصل حديثاً: جهاز سير كهربائي ذكي Smart Pro X7 بمحرك 4.5 حصان متوفر الآن بكمية محدودة وبخصم حصري!',
    date: 'منذ ساعتين',
    type: 'new_arrival',
    read: false,
    productId: 'prod-3'
  },
  {
    id: 'notif-2',
    title: 'تحديث حالة شحنتك 🚚',
    message: 'شحنتك رقم SP-8941 خرجت للتوصيل الآن مع المندوب عمر القحطاني في الرياض.',
    date: 'منذ 3 ساعات',
    type: 'order',
    read: false,
    orderId: 'SP-8941'
  },
  {
    id: 'notif-3',
    title: 'تنبيه توفر مخزون إضافي ⚡',
    message: 'طقم البار الأولمبي والأقراص المطاطية 100 كجم تم تجديد مخزونه اليوم بالمستودع المركزي.',
    date: 'أمس',
    type: 'stock',
    read: true,
    productId: 'prod-1'
  },
  {
    id: 'notif-4',
    title: 'كوبون خصم التجهيز الرياضي 🎁',
    message: 'استخدم الكود FIT10 عند إنهاء الطلب واحصل على خصم فوري 10% على كافة الأجهزة والمعدات.',
    date: 'منذ يومين',
    type: 'promo',
    read: true
  }
];

export const CHAT_QUICK_ACTIONS = [
  { text: 'أين موقع طلبي الآن؟', reply: 'يمكنك تتبع شحنتك فوراً بإدخال رقم الطلب في نافذة "تتبع الطلبات" بالأعلى، أو شاركني رقم هاتفك أو رقم الطلب هنا وسأعطيك موقع السائق وموعد وصوله الدقيق!' },
  { text: 'هل التوصيل والتركيب مجاني؟', reply: 'نعم! التوصيل والتركيب مجاني بالكامل لجميع الطلبات التي تتجاوز 500 ريال لكافة مدن المملكة، ويصلك فريق فني مختص لتركيب الأجهزة الثقيلة وتجربتها أمامك.' },
  { text: 'ما هي طرق الدفع المتوفرة؟', reply: 'نوفر جميع وسائل الدفع المعتمدة: مدى، فيزا وماستركارد، Apple Pay، STC Pay، والدفع بالتقسيط على 4 دفعات بدون فوائد أو رسوم عبر تابي وتمارا، بالإضافة إلى خيار الدفع عند الاستلام.' },
  { text: 'كم مدة الضمان على الأجهزة؟', reply: 'نوفر ضماناً ذهبياً شاملاً يتراوح بين 3 سنوات إلى 10 سنوات على الهياكل الفولاذية والمحركات، مع توفير قطع غيار أصلية وصيانة دورية منزلية.' },
  { text: 'أحتاج استشارة لاختيار الأوزان المناسبة للمنزل', reply: 'أهلاً بك كابتن! لتجهيز صالة منزلية متكاملة ننصح بالبدء بـ "مقعد التمارين متعدد الزوايا" مع "طقم دمبلز سداسي" أو "بار أولمبي 100 كجم". تمنحك هذه العدة إمكانية أداء أكثر من 80 تمريناً لجميع عضلات الجسم.' }
];
