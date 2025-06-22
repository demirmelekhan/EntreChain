# 🎨 Frontend Customization PDR Template

## 📋 ** Project Information **

### **Selected Sector**: [Technology, Trade, Production, Import, Export]
### **Platform Name**: [EntreToken]
### **Main Asset Type**: [Entrepreneur Income]
### **Target Group**: [Individual Backers]

---

## 🎯 **Platform Vision**

### **Core Consept**
EntreChain is a streamlined blockchain platform built on the Stellar Soroban network designed to empower entrepreneurs by enabling them to raise capital through tokenized investment rounds. On the frontend screen, users will be greeted with a page displaying various projects. Entrepreneurs will specify the amount of capital needed for their projects and indicate the estimated profit. The platform facilitates transparent, secure, and straightforward capital raising and profit distribution without complex contract logic, ensuring accessibility and trust for both entrepreneurs and investors.

### **Value Proposition**
- **[Individual Backers] for**: [Even though they may have limited funds, they can pool their tokens with others to support promising startups and become part-owners of innovative projects.]
- **[ Token-Based Supporters] for**: [Access to early-stage entrepreneurial ideas, transparent profit-sharing through tokens, and the opportunity to directly influence and benefit from startup success.]
- **[ Micro Investors] for**: [A low-barrier entry into venture investing with diversified opportunities, clear tokenized returns, and protection via refund mechanisms if the venture fails.]

---

## 🎨 ** Visual Identity Updates **

### ** Color Palette **
```css
/* [Entrepreneur] Teması – Modern Turuncu Tonları */
--primary: #ff6f00;      /* Canlı Turuncu – Dinamik, dikkat çekici, marka rengi */
--secondary: #ffd180;    /* Pastel Turuncu – Yumuşak geçiş, sıcak ve davetkar */
--accent: #FF0059;       /* Pembe – Güven ve derinlik hissi, kontrast sağlar */
--background: #fefcfb;   /* Nötr Açık Gri – Minimalist ve temiz bir görünüm için */
--foreground: #212121;   /* Koyu Antrasit – Modern, göz yormayan metin rengi */
```


### **Icons and Emojis**
- **Main Theme**: [🏠 🏢 🏗️ 💼 📊 💰]
- **Subcategories**: [🏠 🏢 🏬 🏭 🏘️ 🏙️]
- **Actions**: [📝 💰 📈 🔍 ✅ 🚀]

### **Typography**
- **Headings**: [Inter, Roboto, Poppins]
- **Content**: [System fonts, Open Sans]
- **Tone**: [Modern & reliable, Warm & friendly, Professional & premium]
- **Tone**: Warm, reliable, professional
---

## 📁 ** Files That Need to Be Updated **

### **🏠 Main Page (`pages/index.tsx`)**

#### **Title and Description**
```typescript
// Güncellenmesi gereken içerik:
title: "[EntreToken]" // Platformunuzun adı
description: "[ bringing entrepreneurial ideas to life]" // Ana konseptinizin kısa açıklaması
```

#### **Dashboard Cards**
```typescript
// Sektörünüze uygun metrik örnekleri seçin veya kendi metriklerinizi yazın:

// 📊 GENERAL PLATFORM TERMINOLOGY
"Portfolio Değeri"     → "My Investment Portfolio"
"Toplam Yatırım"       → "Total Capital Deployed"
"Aktif Varlıklar"      → "Active Startup Shares"
"Compliance Status"    → "Project Legitimacy Score"
"Enterprise project"    → "Projects awaiting capital" 

Entreprenuer: "entrepreneurial idea", "supported projects", "Active Attempt", "Legal Check"
Startup: "patented idea", "supported projects", "Active Idea", "patent status"
Trade: "marketed goods", "supported projects", "Active Products", "license check"

// SEKTÖR ÖRNEKLERİ:
// Emlak: "Gayrimenkul Portföyü", "Desteklediğim Projeler", "Aktif Mülkler", "Yasal Durum"
// Sanat: "Sanat Koleksiyonu", "Desteklediğim Sanatçılar", "Aktif Eserler", "Otantiklik Durumu"
// Enerji: "Enerji Portföyü", "Desteklediğim Projeler", "Aktif Santrafler", "Çevre Sertifikası"
```

#### **QUICK ACTIONS**
```typescript
// Platform ana eylemlerinizi belirleyin:
"Girişim Keşfet"    → "Explore Attempt"
"Token Transfer"   → "Invest in a Project"
"Tokenize Et"      → "Submit Your Idea"

Entreprenuer: "Discover initiative", "Sharing the profit", "Active Attempt", "Legal Check"
Startup: "Discover startup", "Sharing the profit", "Active Idea", "patent status"
Trade: "Discover Trade", "Sharing the profit", "Active Products", "license check"

 
// Örnekler:
// Emlak: "Mülk Keşfet", "Hisse Transferi", "Mülkünü Tokenize Et"
// Sanat: "Eser Keşfet", "Sahiplik Transferi", "Eserini Tokenize Et"
// Enerji: "Proje Keşfet", "Pay Transferi", "Projeni Tokenize Et"
```

### **🏪 Marketplace(`app/marketplace/page.tsx`)**

#### ** Search and Filters **
```typescript
// Sektörünüze uygun filtre kategorilerini belirleyin:

// For ENTREPRENEURSHIP:
asset_type: ["Tech Startup", "Trade Product", "Mobility", "Health Enterprise"]
location: ["Istanbul", "Ankara", "Izmir", "Online"]
category: ["Technology", "Sustainability", "Transportation", "Healthcare"]
certification: ["Team Verified", "Pitch Approved", "MVP Ready"]

```

#### ** 🧾 Asset Cards **
```typescript
// Sektörünüze uygun örnek varlık kartı:
{
  name: " Paper products of the created brand ",
  symbol: " Printing press",
  creator: "Melek Girişimci - Istanbul",
  date: "Launch Date: 2025-07-01",
  specs: "Automated irrigation, IoT sensors",
  price_per_token: "10 XLM",
  total_supply: 10000,
  sold_percentage: 67
}
// SEKTÖR ÖRNEKLERİ:
// Emlak: {name: "Merkez Ofis", creator: "ABC İnşaat - İstanbul", date: "Teslim: 2025-12-15"}
// Sanat: {name: "Gün Batımı", creator: "Ahmet Yılmaz - İstanbul", date: "Yaratım: 1995"}
// Enerji: {name: "Güneş Santrali", creator: "Enerji A.Ş. - İzmir", date: "Devreye Alma: 2025-06-01"}
```

#### ** 📈 Platform Metrics **
```typescript
// Platform istatistiklerinizi sektörünüze uyarlayın:
" Total Asset Value " → "Total Capital Raised"
" Active Investors " → "Active Backers"
" Completed Transactions " → "Funded Ventures"

// Örnekler:
// Emlak: "Toplam Gayrimenkul Değeri", "Aktif Yatırımcılar", "Tamamlanan Projeler"
// Sanat: "Toplam Koleksiyon Değeri", "Aktif Koleksiyonerler", "Satılan Eserler"
// Enerji: "Toplam Proje Değeri", "Aktif Yatırımcılar", "Devreye Alınan Santrafler"
```

### **🌱 Tokenization (`app/tokenize/page.tsx`)**

#### **5 Adımlı Süreç**
```typescript
// Tokenization sürecinizi sektörünüze uyarlayın:

1. "Temel Bilgiler" → "Basic Info"
   - Project name, category, target audience

2. "Varlık Detayları" → "Project Details"
   - Technology, prototype, timeline

3. "Yasal Belgeler" → "Verification Documents"
   - Founder ID, business license, team info

4. "Token Ekonomisi" → "Tokenomics"
   - Token price, total supply, rewards, refund policy

5. "Yayınlama" → "Launch"
   - Final confirmation and publish to platform

// SEKTÖR ÖRNEKLERİ:
// Emlak: "Mülk Bilgileri" → "Mülk Detayları" → "Tapu & Belgeler" → "Yatırım Planı" → "Projeyi Yayınla"
// Sanat: "Eser Bilgileri" → "Sanat Detayları" → "Otantiklik & Sertifika" → "Değer Belirleme" → "Koleksiyona Ekle"
// Enerji: "Proje Bilgileri" → "Teknik Detaylar" → "Lisans & İzinler" → "Finansman Planı" → "Projeyi Başlat"
```

### **💸 Transfer (`app/transfer/page.tsx`)**

#### **💸 Transfer Page Terminology**
```typescript
// Transfer işlemlerinizin terminolojisini güncelleyin:
"Token Transfer"       → "Investment Transfer"
"Recipient Address"    → "Entrepreneur Wallet"
"Transfer Amount"      → "Investment Amount"
"Compliance Check"     → "Project Verification"

// Örnekler:
// Emlak: "Mülk Hissesi Transferi", "Yeni Sahip Bilgileri", "Hisse Miktarı", "Yasal Kontrol"
// Sanat: "Eser Sahipliği Transferi", "Yeni Koleksiyoner", "Sahiplik Payı", "Otantiklik Kontrolü"
// Enerji: "Proje Payı Transferi", "Yeni Yatırımcı", "Pay Miktarı", "Lisans Kontrolü"
```

### **🎨 Layout (`app/layout.tsx`)**

#### **Metadata**
```typescript
export const metadata = {
  title: 'EntreChain - Empowering Ideas with Token-Based Funding',
  description: 'EntreChain enables entrepreneurs to raise capital by offering project-based tokens to a community of backers.',
  icons: {
    icon: '/entrechain.ico',
  }
}

// Örnekler:
// Emlak: title: 'PropertyToken - Gayrimenkul Yatırım Platformu'
// Sanat: title: 'ArtChain - Dijital Sanat Koleksiyonu' 
// Enerji: title: 'GreenToken - Yenilenebilir Enerji Yatırımları'
```

### **📱 Header (`components/layout/Header.tsx`)**

#### ** Navigation Menu**
```typescript
// Menü öğelerinizi sektörünüze uyarlayın:
"Dashboard" → "My Dashboard"
"Marketplace" → "Explore project"
"Tokenize" → "Start a Project"
"Transfer" → "Send token"
"Involved" → "Check your investment"

// Örnekler:
// Emlak: "Yatırımcı Paneli", "Gayrimenkul Pazarı", "Mülkümü Listele", "Hisse Transferi"
// Sanat: "Koleksiyonum", "Sanat Galerisi", "Eserimi Listele", "Sahiplik Transferi"
// Enerji: "Enerji Paneli", "Proje Pazarı", "Projemi Listele", "Pay Transferi"
```

---

## 🔧 **Teknik Güncellemeler**

### **Type Definitions (`lib/types.ts`)**

```typescript
// Sektörünüze uygun tip tanımları oluşturun:
export interface EntrepreneurAsset {
  id: string;
  name: string;
  symbol: string;
  asset_type: 'tech' | 'food' | 'print' | 'social';
  creator_info: {
    name: string;
    location: string;
    experience_years: number;
    certifications: string[];
  };
  asset_details: {
    team_size: number;
    prototype_ready: boolean;
    target_market: string;
    verified: boolean;
  };
  timeline_info: {
    creation_date: string;
    milestone_date: string;
    estimated_completion: string;
    quality_grade: 'A' | 'B' | 'C';
  };
  financial: {
    funding_goal: number;
    current_funding: number;
    token_price: number;
    total_supply: number;
  };
}

// SEKTÖR ÖRNEKLERİ:
// Emlak: PropertyAsset, asset_type: 'residential' | 'commercial' | 'land' | 'industrial'
// Sanat: ArtworkAsset, asset_type: 'painting' | 'sculpture' | 'digital' | 'photography'  
// Enerji: EnergyAsset, asset_type: 'solar' | 'wind' | 'hydro' | 'biomass'
```

### **Mock Data (`lib/contract.ts`)**

```typescript
// Sektörünüze uygun örnek veri yapısı:
const SAMPLE_ENTREPRENEUR_PROJECTS = [
  {
    id: 'project-001',
    name: 'Solar-Powered Street Vendor Carts',
    symbol: 'SOLCART',
    asset_type: 'green',
    creator_info: {
      name: 'Melek Demirhan',
      location: 'İstanbul',
      experience_years: 4,
      certifications: ['Team Verified', 'Pitch Approved']
    },
    
  }
];
```

## 🎯 **Parts we want the Agent to pay attention to when customizing the application**

### **UX for induvial backers**
- ✅ Customize the project in the most basic and bug free way
- ✅ Add new features, only update the existing ones in the PDR-FRONTEND-TEMP.md file and the prompt I gave
- ✅ The application should be completely in English
- ✅ PassKey feature will be added to connect to the wallet
- ✅ You do not need to update unnecessary places, let is just update the parts that appear in the frontend
- ✅ Do not change the Rust codes, only the frontend codes will be customized.
- ✅ Develop the project as simple and error free as possible, without extending it
- ✅ Write test.rs file appropriate to lib.rs file
- ✅ Deployment process will be done manually

## 📝 **Implementation Checklist**

### **Phase 1: Basic Customization**
- [ ] Update title and descriptions
- [ ] Change color palette
- [ ] Adapt icons and emojis
- [ ] Update navigation menu
- [ ] Adapt mock data to industry

### **Phase 2: Advanced Content**
- [ ] Customize Dashboard widgets
- [ ] Expand Marketplace filters
- [ ] Update type definitions
- [ ] Adapt tokenization flow
- [ ] Change transfer terminology
---

## 💡 **Customization Tips**

### **Quick Start**
1. **Terminology First**: List all terminology first
2. **Visual Identity**: Set color and icon palette
3. **User Journey**: Draw main user flows
4. **Content Strategy**: Plan content hierarchy

### **Common Mistakes**
❌ **Things to Avoid:**
- Do not try to add too many new features
- You will only customize the PDR-FRONTEND-TEMP we have in the project, you will not add new things
- Do not make any changes other than the frontend
- Do not make any changes to the wallet connection part, that works too
- Do not deploy

✅ **What We Want**
- Simple and focused design
- Only the frontend will be updated
- Things that will not be added as a new feature will be customized according to our project

---

<div align="center">

**🚀💡 Building Bridges Between Entrepreneurs and Backers via Blockchain 💡🚀**

*"Empowering real-world ideas with decentralized trust."*

</div>
---


