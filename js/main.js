// ========== 数据定义 ==========
const destinationsData = [
    { id: 1, name: "云栖竹径 · 安吉", desc: "万亩茶山与竹海，打造康养度假村。拥有千年禅茶文化，适合静心养生。", img: "images/destination1.jpg", category: "生态康养", rating: 4.8, location: "浙江安吉", price: "¥288起" },
    { id: 2, name: "镜海 · 泸沽湖", desc: "摩梭文化 + 生态湿地新文旅，神秘女儿国，高原明珠。", img: "images/destination2.jpg", category: "文化体验", rating: 4.9, location: "云南/四川交界", price: "¥358起" },
    { id: 3, name: "丹霞星空营地", desc: "地质奇观观星露营开发计划，亚洲最佳观星地之一。", img: "images/destination3.jpg", category: "户外探险", rating: 4.7, location: "甘肃张掖", price: "¥198起" },
    { id: 4, name: "古堰画乡 · 艺术聚落", desc: "艺术家驻留计划 + 滨水夜游经济带，千年古镇的艺术新生。", img: "images/destination4.jpg", category: "文化艺术", rating: 4.6, location: "浙江丽水", price: "¥168起" },
    { id: 5, name: "稻城亚丁 · 净土之旅", desc: "最后的香格里拉，雪山、湖泊、草原的完美组合。", img: "images/destination5.jpg", category: "自然风光", rating: 4.9, location: "四川稻城", price: "¥468起" },
    { id: 6, name: "涠洲岛 · 火山秘境", desc: "火山地质公园 + 海岛度假，中国最年轻的火山岛。", img: "images/destination6.jpg", category: "海岛度假", rating: 4.7, location: "广西北海", price: "¥228起" },
    { id: 7, name: "喀纳斯 · 湖怪传说", desc: "人间仙境，秋色童话，神秘的湖怪传说吸引无数探险者。", img: "images/destination7.jpg", category: "自然风光", rating: 4.9, location: "新疆阿勒泰", price: "¥528起" },
    { id: 8, name: "西江千户苗寨", desc: "世界最大苗族聚居村寨，体验原生态苗族文化盛宴。", img: "images/destination8.jpg", category: "文化体验", rating: 4.6, location: "贵州黔东南", price: "¥188起" }
];

const guidesData = [
    { id: 1, title: "【深度游】8天川藏秘境环线", days: 8, likes: 156, difficulty: "中等" },
    { id: 2, title: "【亲子游】5天云南自然研学之旅", days: 5, likes: 89, difficulty: "轻松" },
    { id: 3, title: "【摄影专线】7天新疆秋色摄影团", days: 7, likes: 234, difficulty: "中等" },
    { id: 4, title: "【秘境探险】4天丹霞露营观星", days: 4, likes: 67, difficulty: "挑战" }
];

const carouselImages = [
    "images/carousel1.jpg",
    "images/carousel2.jpg",
    "images/carousel3.jpg",
    "images/carousel4.jpg",
    "images/carousel5.jpg"
];

let likesData = { 1: 156, 2: 89, 3: 234, 4: 67 };
let autoInterval = null;
let currentSlide = 0;
let totalSlides = 0;

// ========== 渲染函数 ==========
function renderHotDestinations() {
    const container = document.getElementById('hotDestinationsGrid');
    if (!container) return;
    const hotData = destinationsData.slice(0, 6);
    container.innerHTML = hotData.map(d => createCardHTML(d)).join('');
}

function renderAllDestinations() {
    const container = document.getElementById('allDestinationsGrid');
    if (!container) return;
    container.innerHTML = destinationsData.map(d => createCardHTML(d)).join('');
}

function renderFilterButtons() {
    const container = document.getElementById('filterSection');
    if (!container) return;
    const categories = ['全部', '生态康养', '文化体验', '户外探险', '文化艺术', '自然风光', '海岛度假'];
    container.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === '全部' ? 'active' : ''}" data-filter="${cat === '全部' ? 'all' : cat}">
            ${cat}
        </button>
    `).join('');
}

function renderGuides() {
    const container = document.getElementById('guidesGrid');
    if (!container) return;
    container.innerHTML = guidesData.map(guide => `
        <div class="dest-card">
            <div class="card-info">
                <h3>${guide.title}</h3>
                <p>📅 行程天数：${guide.days}天 &nbsp;|&nbsp; 💪 难度：${guide.difficulty}</p>
                <button class="like-btn" data-id="${guide.id}">👍 收藏攻略</button>
                <span id="likeCount${guide.id}" style="margin-left:0.8rem;">${likesData[guide.id]} 人喜欢</span>
            </div>
        </div>
    `).join('');
}

function renderDestSelect() {
    const select = document.getElementById('preferDest');
    if (!select) return;
    select.innerHTML = '<option value="">请选择</option>' + 
        destinationsData.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
}

function renderCarousel() {
    const container = document.getElementById('carouselSlides');
    if (!container) return;
    container.innerHTML = carouselImages.map((img, idx) => `
        <div class="carousel-slide" style="background-image: linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('${img}');">
            <span>秘境之旅 · 视觉盛宴 ${idx+1}</span>
        </div>
    `).join('');
    totalSlides = carouselImages.length;
}

function createCardHTML(dest) {
    const stars = '★'.repeat(Math.floor(dest.rating)) + '☆'.repeat(5 - Math.floor(dest.rating));
    return `
        <div class="dest-card" data-id="${dest.id}" data-category="${dest.category}">
            <img src="${dest.img}" alt="${dest.name}" loading="lazy">
            <div class="card-info">
                <h3>${dest.name}</h3>
                <div style="color:#ffb347; font-size:0.9rem;">${stars} ${dest.rating}</div>
                <p style="margin: 0.5rem 0; color:#666; font-size:0.9rem;">📍 ${dest.location}</p>
                <p>${dest.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.8rem;">
                    <span class="card-tag">${dest.category}</span>
                    <span style="color:#2a6b54; font-weight: bold;">${dest.price}</span>
                </div>
            </div>
        </div>
    `;
}

// ========== 弹窗 ==========
function showDetail(destId) {
    const dest = destinationsData.find(d => d.id === destId);
    if (!dest) return;
    const stars = '★'.repeat(Math.floor(dest.rating)) + '☆'.repeat(5 - Math.floor(dest.rating));
    const modal = document.createElement('div');
    modal.id = 'detailModal';
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${dest.img}" alt="${dest.name}" style="width:100%; border-radius:16px; margin-bottom:1rem;">
            <h2>${dest.name}</h2>
            <div style="color:#ffb347; margin:0.5rem 0;">${stars} ${dest.rating}</div>
            <p><strong>📍 位置：</strong>${dest.location}</p>
            <p><strong>💰 价格：</strong>${dest.price}/人起</p>
            <p><strong>📝 介绍：</strong>${dest.desc}</p>
            <p><strong>🏷️ 标签：</strong>${dest.category}</p>
            <button id="closeModalBtn" style="margin-top:1rem;">关闭</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeModal = () => modal.remove();
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

// ========== 筛选 ==========
function initFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cards = document.querySelectorAll('#allDestinationsGrid .dest-card');
            cards.forEach(card => {
                const category = card.dataset.category;
                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
            });
        });
    });
}

// ========== 点赞 ==========
function initLikes() {
    const btns = document.querySelectorAll('.like-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            if (id && likesData[id] !== undefined) {
                likesData[id]++;
                const span = document.getElementById(`likeCount${id}`);
                if (span) span.innerText = `${likesData[id]} 人喜欢`;
                btn.style.transform = 'scale(1.1)';
                setTimeout(() => btn.style.transform = 'scale(1)', 200);
            }
        });
    });
}

// ========== 卡片点击 ==========
function initCardClick() {
    const cards = document.querySelectorAll('.dest-card');
    cards.forEach(card => {
        const id = parseInt(card.dataset.id);
        if (id) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') showDetail(id);
            });
        }
    });
}

function initHotCardClick() {
    const cards = document.querySelectorAll('#hotDestinationsGrid .dest-card');
    cards.forEach(card => {
        const id = parseInt(card.dataset.id);
        if (id) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => showDetail(id));
        }
    });
}

// ========== 表单 ==========
function initForm() {
    const form = document.getElementById('travelForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('userName')?.value.trim();
        const email = document.getElementById('userEmail')?.value.trim();
        const prefer = document.getElementById('preferDest')?.value;
        const feedback = document.getElementById('formFeedback');
        if (!name || !email) {
            feedback.innerHTML = '<span class="error-msg">❌ 请填写姓名和邮箱。</span>';
            return;
        }
        if (!email.includes('@')) {
            feedback.innerHTML = '<span class="error-msg">❌ 请输入有效邮箱。</span>';
            return;
        }
        let msg = `✨ 感谢 ${name} 的建议！`;
        if (prefer) msg += ` 我们会重点关注${prefer}的开发。`;
        feedback.innerHTML = `<span class="success-msg">${msg}</span>`;
        form.reset();
        setTimeout(() => feedback.innerHTML = '', 3000);
    });
}

// ========== 轮播 ==========
function initCarousel() {
    const slides = document.getElementById('carouselSlides');
    if (!slides) return;
    totalSlides = carouselImages.length;
    currentSlide = 0;
    updateCarousel();
    renderDots();
    
    document.getElementById('prevSlide')?.addEventListener('click', () => changeSlide(-1));
    document.getElementById('nextSlide')?.addEventListener('click', () => changeSlide(1));
    
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => changeSlide(1), 4000);
}

function updateCarousel() {
    const slides = document.getElementById('carouselSlides');
    if (slides) slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function renderDots() {
    const container = document.getElementById('dotsContainer');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === currentSlide ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
            resetAutoSlide();
        });
        container.appendChild(dot);
    }
}

function changeSlide(dir) {
    currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoSlide();
}

function resetAutoSlide() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => changeSlide(1), 4000);
}

// ========== 页面切换 ==========
function showPage(pageId) {
    const pages = ['page-home', 'page-destinations', 'page-guide', 'page-about'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = id === pageId ? 'block' : 'none';
    });
    
    // 激活导航高亮
    const links = document.querySelectorAll('.main-nav a');
    links.forEach(link => {
        const page = link.dataset.page;
        if ((page === 'home' && pageId === 'page-home') ||
            (page === 'destinations' && pageId === 'page-destinations') ||
            (page === 'guide' && pageId === 'page-guide') ||
            (page === 'about' && pageId === 'page-about')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 刷新各页面的动态内容
    if (pageId === 'page-destinations') {
        renderAllDestinations();
        renderFilterButtons();
        initFilter();
        initCardClick();
    }
    if (pageId === 'page-guide') {
        renderGuides();
        renderDestSelect();
        initLikes();
        initForm();
    }
    if (pageId === 'page-home') {
        renderHotDestinations();
        renderCarousel();
        initCarousel();
        initHotCardClick();
    }
}

// ========== 返回顶部 ==========
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== 移动端菜单 ==========
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
        const ul = nav.querySelector('ul');
        ul.classList.toggle('show');
    });
}

// ========== 导航 ==========
function initNavigation() {
    const links = document.querySelectorAll('.main-nav a');
    const btns = document.querySelectorAll('.btn[data-nav]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page === 'home') showPage('page-home');
            if (page === 'destinations') showPage('page-destinations');
            if (page === 'guide') showPage('page-guide');
            if (page === 'about') showPage('page-about');
            // 关闭移动端菜单
            const ul = document.querySelector('#mainNav ul');
            if (ul) ul.classList.remove('show');
        });
    });
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('page-destinations');
        });
    });
}

// ========== 初始化 ==========
function init() {
    renderHotDestinations();
    renderCarousel();
    initCarousel();
    initHotCardClick();
    initBackToTop();
    initMobileMenu();
    initNavigation();
    showPage('page-home');
}

init();