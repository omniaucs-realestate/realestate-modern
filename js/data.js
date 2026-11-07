// js/data.js

// 1. بيانات إحصائيات الشركة
const companyStats = [
    { value: 50, prefix: "+", label: "مزادًا تم تنفيذه" },
    { value: 1.5, prefix: "", suffix: "B+", label: "قيمة مزادات (ريال)" },
    { value: 22, prefix: "", label: "وحدة سكنية قيد التطوير" },
    { value: 2, prefix: "", label: "مشروعًا عقاريًا" }
];

// 3. بيانات التواصل الخاصة بالشركة
const contactData = {
    phone: "+966920000000",
    email: "info@company.sa",
    address: "الرياض - المملكة العربية السعودية",
    whatsapp: "+966500000000",
    social: {
        x: "#",
        // linkedin: "[رابط LinkedIn]",
        // instagram: "[رابط Instagram]"
    }
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// 2. بيانات المزادات الأساسية
const auctionsData = [
    {
        id: 7,
        title: "مزاد الشرقية",
        location: "المنطقة الشرقية",
        propertiesCount: "15 عقار",
        type: "مزاد إلكتروني",
        image: "assets/images/auctions/netaq-alsharkia/main.png",
        url: "auction-details.html?id=7",
        // ... باقي البيانات
        start: "25 نوفمبر 2027 | 09:00 صباحا",
        end: "29 نوفمبر 2027 | 17:00 مساءً",
        // الأسطر المسؤولة عن الأتمتة:
        startDateISO: "2027-11-25T09:00:00", // وقت البداية
        endDateISO: "2027-11-29T17:00:00",   // وقت النهاية
        brochureLink: "#", // رابط الكتيب الخاص بجدة
        participateLink: "#" // رابط المشاركة الخاص بجدة
    },
    {
        id: 6,
        title: "مزاد مكة",
        location: "مكة",
        propertiesCount: "5 عقارات",
        type: "مزاد إلكتروني",
        image: "assets/images/auctions/estithmar-mecca/main.png",
        url: "auction-details.html?id=6",
        // ... باقي البيانات
        start: "10 نوفمبر 2026 | 09:00 صباحا",
        end: "15 نوفمبر 2026 | 18:00 مساءً",
        // الأسطر المسؤولة عن الأتمتة:
        startDateISO: "2026-11-10T09:00:00", // وقت البداية
        endDateISO: "2026-11-15T18:00:00",   // وقت النهاية
        brochureLink: "#", // رابط الكتيب الخاص بجدة
        participateLink: "#" // رابط المشاركة الخاص بجدة
    },
    {
        id: 5,
        title: "مزاد الرياض",
        location: "الرياض",
        propertiesCount: "3 عقارات",
        type: "مزاد إلكتروني",
        image: "assets/images/auctions/netaq-alreyad/main.jpg",
        url: "auction-details.html?id=5",
        // ... باقي البيانات
        start: "15 أكتوبر 2026 | 09:00 صباحا",
        end: "18 أكتوبر 2026 | 18:00 مساءً",
        // الأسطر المسؤولة عن الأتمتة:
        startDateISO: "2026-10-15T09:00:00", // وقت البداية
        endDateISO: "2026-10-18T18:00:00",   // وقت النهاية
        brochureLink: "#", // رابط الكتيب الخاص بجدة
        participateLink: "#" // رابط المشاركة الخاص بجدة
    }
];

/* Single source of truth for auction status.
   Previously each page calculated (or forgot to calculate) this itself,
   which is why auction detail pages rendered an "undefined" badge. */
function computeAuctionStatus(auction, now = new Date()) {
    if (!auction) return '';

    if (auction.startDateISO && auction.endDateISO) {
        const startDate = new Date(auction.startDateISO);
        const endDate = new Date(auction.endDateISO);

        if (now < startDate) return 'قريبًا';
        if (now <= endDate) return 'جاري';
        return 'منتهي';
    }

    return auction.status || '';
}

auctionsData.forEach((auction) => {
    auction.status = computeAuctionStatus(auction);
});


// 4. بيانات العقارات التابعة لكل مزاد
const auctionPropertiesData = [
    ////////////////////////////////
    /////مزاد مكة///////////
    ////////////////////////////////

    {
        id: 201,
        auctionId: 6,
        title: "فندق",
        area: "200.54 متر مربع",
        deedNumber: "xxxxxx", // رقم الصك
        description: "فندق .",
        image: "assets/images/auctions/estithmar-mecca/main.png"
    },
    {
        id: 204,
        auctionId: 6,
        title: "أرض خام",
        area: "50,000 متر مربع",
        deedNumber: "xxxxxxxxx", // رقم الصك
        description: "أرض خام .",
        image: "assets/images/auctions/estithmar-mecca/main.png"
    },
    {
        id: 205,
        auctionId: 6,
        title: "عمارة",
        area: "200 متر مربع",
        deedNumber: "xxxxxx", // رقم الصك
        description: "عمارة سكنية تجارية .",
        image: "assets/images/auctions/estithmar-mecca/main.png"
    },
    {
        id: 206,
        auctionId: 6,
        title: "عمارة",
        area: "200 متر مربع",
        deedNumber: "xxxxxxxxx", // رقم الصك
        description: "عمارة سكنية .",
        image: "assets/images/auctions/estithmar-mecca/main.png"
    },
    {
        id: 207,
        auctionId: 6,
        title: "عمارة",
        area: "800 متر مربع",
        deedNumber: "xxxxxxxxxxxxx", // رقم الصك
        description: "عمارة سكنية .",
        image: "assets/images/auctions/estithmar-mecca/main.png"
    }

]



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// 5. بيانات المشاريع التطويرية
const projectsData = [
    {
        id: 1,
        title: "Building 1",
        location: "الرياض - حي العليا",
        type: "سكني ذكي",
        unitsCount: "10 وحدات سكنية",
        status: "بدأ البيع",
        brandColor: "#C6A664",
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        url: "project-details.html?id=1",
        description: "مساحات سكنية صُممت لتمنحك تجربة حياة مختلفة. يجمع المشروع بين جودة التصميم وقيمة الموقع.",
        brochureLink: "#",
        locationMapLink: "#",
        whatsappNumber: "+966500000000",
        // الأسطر الجديدة للمميزات البارزة في الصفحة الرئيسية
        features: ["Smart Entry", "Private Parking", "Double Glazing", "Wide Windows"]
    },
];

// 6. بيانات الوحدات السكنية التابعة لكل مشروع
const projectUnitsData = [
    {
        id: 201,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 01 - الدور الأرضي",
        type: "شقة سكنية",
        area: "170 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "450,000",
        status: "محجوزة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 1 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 202,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 02 - الدور الأرضي",
        type: "شقة سكنية",
        area: "180 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "480,000",
        status: "محجوزة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 2 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 203,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 03 - الدور الأرضي",
        type: "شقة سكنية",
        area: "170 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "450,000",
        status: "محجوزة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 3 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 204,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 04 - الدور الأرضي",
        type: "شقة سكنية",
        area: "180 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "480,000",
        status: "محجوزة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 4 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 205,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 05 - الدور الأول",
        type: "شقة سكنية",
        area: "170 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "450,000",
        status: "مباعة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 1 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 206,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 06 - الدور الأول",
        type: "شقة سكنية",
        area: "180 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "480,000",
        status: "متاحة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 2 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 207,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 07 - الدور الأول",
        type: "شقة سكنية",
        area: "170 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "450,000",
        status: "مباعة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 3 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 208,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 08 - الدور الأول",
        type: "شقة سكنية",
        area: "180 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "480,000",
        status: "متاحة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 4 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 209,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 09 - الدور الثاني",
        type: "شقة سكنية",
        area: "149 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "450,000",
        status: "مباعة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: 1 // <-- أضف هذا السطر (مثلاً 3 تعني أسفل اليمين كما في صورتك)
    },
    {
        id: 210,
        projectId: 1, // يتبع لمشروع اسم الشركة Residence 1 (id: 1)
        title: "وحدة رقم 10 - الدور الثاني",
        type: "شقة سكنية",
        area: "155 م²",
        bedrooms: "3 غرف نوم",
        bathrooms: "3 دورات مياه",
        price: "480,000",
        status: "متاحة", // متاحة | محجوزة | مباعة
        image: "assets/images/development/aqaronaresidence1/residence-01.jpg",
        features: "دخول ذكي | موقف خاص",
        unitPosition: [3,4]
    }
];