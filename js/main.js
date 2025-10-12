// ==========================================
// DOM要素の取得
// ==========================================

const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');

// ==========================================
// モバイルメニューの開閉
// ==========================================

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // アニメーション効果
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ナビゲーションリンクをクリックしたらメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==========================================
// スクロール時のヘッダー処理
// ==========================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール位置に応じたヘッダーの背景透明度
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ==========================================
// スムーススクロール
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// スクロールアニメーション（Intersection Observer）
// ==========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
const animateElements = document.querySelectorAll(`
    .challenge-card,
    .service,
    .approach-card,
    .strength-card,
    .company__table
`);

animateElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// ==========================================
// カウントアップアニメーション
// ==========================================

function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==========================================
// ヒーローセクションのスライダー（将来的な拡張用）
// ==========================================

const heroSlides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;

function nextSlide() {
    heroSlides[currentSlide].classList.remove('hero__slide--active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('hero__slide--active');
}

// 自動スライド（現在は1つのスライドのみなのでコメントアウト）
// setInterval(nextSlide, 5000);

// ==========================================
// パララックス効果
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero__background');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// フォームバリデーション（将来的な拡張用）
// ==========================================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ==========================================
// ローディング完了後の処理
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // ヒーローセクションのアニメーション開始
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ==========================================
// リサイズ時の処理
// ==========================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ時にメニューが開いていたら閉じる
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }, 250);
});

// ==========================================
// スクロール位置の記憶と復元
// ==========================================

// ページ離脱時にスクロール位置を保存
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

// ページ読み込み時にスクロール位置を復元
window.addEventListener('load', () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// ==========================================
// アクセシビリティ: フォーカス管理
// ==========================================

// キーボードナビゲーションのサポート
document.addEventListener('keydown', (e) => {
    // Escapeキーでメニューを閉じる
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        navToggle.focus();
    }
});

// ==========================================
// パフォーマンス最適化: スクロールイベントのスロットリング
// ==========================================

function throttle(func, wait) {
    let timeout;
    let lastTime = 0;

    return function executedFunction(...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastTime;

        if (timeSinceLastCall >= wait) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

// スクロールイベントをスロットリング
const throttledScroll = throttle(() => {
    // 重い処理をここに記述
}, 100);

window.addEventListener('scroll', throttledScroll);

// ==========================================
// 初期化完了のログ
// ==========================================

console.log('TRIKO Website Initialized');
