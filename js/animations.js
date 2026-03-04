/**
 * 遥遥领先的一天 - 动画控制脚本
 * 使用 Intersection Observer 实现滚动触发动画
 */

// ==================== 工具函数 ====================

/**
 * 检查元素是否在视口内
 * @param {Element} element - DOM元素
 * @param {number} threshold - 触发阈值 (0-1)
 * @returns {boolean}
 */
function isInViewport(element, threshold = 0.2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= 0;
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间间隔
 * @returns {Function}
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间
 * @returns {Function}
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ==================== 滚动动画控制器 ====================

class ScrollAnimationController {
    constructor() {
        this.observers = [];
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.setupAchievementCards();
        this.setupMoodItems();
        this.setupParallaxEffects();
    }

    /**
     * 设置战绩卡片动画
     */
    setupAchievementCards() {
        const cards = document.querySelectorAll('.achievement-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    const index = parseInt(entry.target.dataset.index);
                    
                    // 延迟动画，创建依次出现效果
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        
                        // 最后一个卡片触发特殊效果
                        if (entry.target.classList.contains('final-card')) {
                            this.triggerFinalEffect();
                        }
                    }, index * 150);
                    
                    this.animatedElements.add(entry.target);
                    
                    // 添加额外的入场动画类
                    if (index % 2 === 0) {
                        entry.target.style.animationName = 'card-entrance';
                    } else {
                        entry.target.style.animationName = 'card-entrance-right';
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => observer.observe(card));
        this.observers.push(observer);
    }

    /**
     * 设置心情项目动画
     */
    setupMoodItems() {
        const items = document.querySelectorAll('.mood-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5
        });

        items.forEach(item => observer.observe(item));
        this.observers.push(observer);
    }

    /**
     * 设置视差滚动效果
     */
    setupParallaxEffects() {
        const heroBg = document.querySelector('.hero-bg-pattern');
        const achievementBg = document.querySelector('.achievements-bg');
        
        if (!heroBg && !achievementBg) return;

        const handleScroll = throttle(() => {
            const scrollY = window.pageYOffset;
            
            if (heroBg) {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    const heroRect = heroSection.getBoundingClientRect();
                    if (heroRect.bottom > 0) {
                        heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`;
                    }
                }
            }
            
            if (achievementBg) {
                const achievementSection = document.getElementById('achievements');
                if (achievementSection) {
                    const achievementRect = achievementSection.getBoundingClientRect();
                    if (achievementRect.top < window.innerHeight && achievementRect.bottom > 0) {
                        achievementBg.style.transform = `translateY(${scrollY * 0.1}px)`;
                    }
                }
            }
        }, 16);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * 触发最终特效（蚌埠住了）
     */
    triggerFinalEffect() {
        setTimeout(() => {
            const bangbu = document.getElementById('bangbu');
            if (bangbu) {
                bangbu.classList.add('show');
                
                // 触发烟花
                if (window.fireworksManager) {
                    window.fireworksManager.explode(window.innerWidth / 2, window.innerHeight / 2);
                }
                
                // 3秒后隐藏
                setTimeout(() => {
                    bangbu.classList.remove('show');
                }, 3000);
            }
        }, 1000);
    }

    /**
     * 销毁所有观察器
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.animatedElements.clear();
    }
}

// ==================== 烟花管理器 ====================

class FireworksManager {
    constructor(container) {
        this.container = container || document.getElementById('fireworks');
        this.particles = [];
        this.colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#00FF00', '#FF0000', '#FF8800'];
        this.isActive = false;
    }

    /**
     * 创建单个烟花
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     */
    explode(x, y) {
        if (!this.container) return;

        const particleCount = 30 + Math.random() * 20;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y);
        }
    }

    /**
     * 创建单个粒子
     */
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const size = 4 + Math.random() * 6;
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 3 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 50;
        const ty = Math.sin(angle) * velocity * 50;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            pointer-events: none;
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation: firework-particle 1s ease-out forwards;
        `;
        
        this.container.appendChild(particle);
        
        // 动画结束后移除
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    /**
     * 自动烟花秀
     */
    startAutoFireworks() {
        if (this.isActive) return;
        this.isActive = true;
        
        const launch = () => {
            if (!this.isActive) return;
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
            this.explode(x, y);
            
            setTimeout(launch, 500 + Math.random() * 1500);
        };
        
        launch();
    }

    /**
     * 停止自动烟花
     */
    stopAutoFireworks() {
        this.isActive = false;
    }
}

// ==================== 文字特效 ====================

class TextEffects {
    /**
     * 打字机效果
     * @param {Element} element - 目标元素
     * @param {string} text - 要显示的文本
     * @param {number} speed - 打字速度 (ms)
     */
    static typewriter(element, text, speed = 100) {
        element.textContent = '';
        element.classList.add('typing-effect');
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-effect');
            }
        };
        
        type();
    }

    /**
     * 文字乱码效果
     * @param {Element} element - 目标元素
     * @param {string} finalText - 最终文本
     * @param {number} duration - 动画时长
     */
    static glitchText(element, finalText, duration = 1000) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const steps = 20;
        const interval = duration / steps;
        let step = 0;
        
        const glitch = setInterval(() => {
            if (step >= steps) {
                element.textContent = finalText;
                clearInterval(glitch);
                return;
            }
            
            let result = '';
            for (let i = 0; i < finalText.length; i++) {
                if (Math.random() < step / steps) {
                    result += finalText[i];
                } else {
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            
            element.textContent = result;
            step++;
        }, interval);
    }

    /**
     * 文字跳动效果
     * @param {Element} element - 目标元素
     */
    static bounceLetters(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.animation = `bounce 0.5s ease ${i * 0.05}s infinite alternate`;
            element.appendChild(span);
        });
    }
}

// ==================== 粒子效果 ====================

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 50,
            colors: options.colors || ['#FF00FF', '#00FFFF', '#FFFF00'],
            size: options.size || { min: 2, max: 6 },
            speed: options.speed || { min: 0.5, max: 2 },
            ...options
        };
        this.particles = [];
        this.animationId = null;
    }

    createParticle() {
        const particle = document.createElement('div');
        const size = this.options.size.min + Math.random() * (this.options.size.max - this.options.size.min);
        const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.7};
            pointer-events: none;
            transition: transform 0.3s ease;
        `;
        
        return {
            element: particle,
            x: Math.random() * 100,
            y: Math.random() * 100,
            speedX: (Math.random() - 0.5) * this.options.speed.max,
            speedY: (Math.random() - 0.5) * this.options.speed.max,
            size: size
        };
    }

    init() {
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle.element);
            this.particles.push(particle);
        }
    }

    animate() {
        this.particles.forEach(p => {
            p.x += p.speedX * 0.1;
            p.y += p.speedY * 0.1;
            
            if (p.x < 0 || p.x > 100) p.speedX *= -1;
            if (p.y < 0 || p.y > 100) p.speedY *= -1;
            
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        this.init();
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles.forEach(p => p.element.remove());
        this.particles = [];
    }
}

// ==================== 导出模块 ====================

// 初始化函数
function initAnimations() {
    // 创建滚动动画控制器
    window.scrollAnimationController = new ScrollAnimationController();
    
    // 创建烟花管理器
    window.fireworksManager = new FireworksManager();
    
    console.log('🚀 遥遥领先动画系统已启动！');
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// 导出类供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimationController,
        FireworksManager,
        TextEffects,
        ParticleSystem
    };
}
