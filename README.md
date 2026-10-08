# QC Instruments - Calibration Management System

نظام إدارة معايرة أجهزة QC باستخدام QR Code

## 🚀 النشر على GitHub Pages

### الطريقة التلقائية (موصى بها)

1. ارفع المشروع على GitHub
2. اذهب إلى **Settings** → **Pages**
3. في قسم **Source**، اختر **GitHub Actions**
4. ادفع أي تغيير للـ `main` branch
5. الـ workflow هيشتغل تلقائياً وينشر الموقع

الموقع هيكون متاح على: `https://username.github.io/repository-name/`

### الطريقة اليدوية

```bash
# 1. اعمل build
npm run build

# 2. ارفع مجلد dist على branch gh-pages
git subtree push --prefix dist origin gh-pages
```

## 🔧 التعديلات المطبقة لـ GitHub Pages

- ✅ تم إضافة `base: './'` في `vite.config.js`
- ✅ تم تغيير الـ manifest path لـ relative path
- ✅ تم إضافة GitHub Actions workflow للـ deploy التلقائي

## 👥 بيانات الدخول التجريبية

| الدور | اسم المستخدم | كلمة المرور |
|------|-------------|-------------|
| Admin | admin | admin123 |
| QC Manager | qcmanager | qc123 |
| QC Engineer | engineer | eng123 |
| Operator | operator | op123 |
| Viewer | viewer | view123 |

## 📱 المميزات

- ✅ مسح QR Code بالكاميرا
- ✅ عرض حالة المعايرة (صالح/قارب الانتهاء/متأخر)
- ✅ سجل المعايرات الكامل
- ✅ رفع شهادات المعايرة
- ✅ لوحة تحكم للمسؤول
- ✅ تصميم متجاوب للموبايل
- ✅ PWA support

## 🛠️ التطوير المحلي

```bash
# تثبيت المتطلبات
npm install

# تشغيل السيرفر المحلي
npm run dev

# عمل build
npm run build
```

## 📋 المتطلبات

- Node.js 18+
- npm 9+

## 📄 الترخيص

MIT License
