/**
 * 遥遥领先的一天 - 主脚本
 * 处理所有交互逻辑和功能
 */

// ==================== 工具函数 ====================

const utils = {
    /**
     * 格式化时间为 MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    },

    /**
     * 生成随机数
     */
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * 节流函数
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 存储本地数据
     */
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('Storage failed:', e);
            }
        }
    }
};

// ==================== 时间统计器 ====================

class TimeTracker {
    constructor() {
        this.startTime = Date.now();
        this.elapsed = 0;
        this.isRunning = false;
        this.counter = document.getElementById('time-counter');
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.tick();
    }

    tick() {
        if (!this.isRunning) return;
        
        this.elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        
        if (this.counter) {
            this.counter.textContent = utils.formatTime(this.elapsed);
            
            // 特殊时间提示
            if (this.elapsed === 60) {
                this.showMilestone('🎉 您已经遥遥领先 1 分钟！');
            } else if (this.elapsed === 180) {
                this.showMilestone('⚠️ 3 分钟了，建议去优化模型');
            } else if (this.elapsed === 300) {
                this.showMilestone('💀 5 分钟... 你真的没事干吗？');
            }
        }
        
        requestAnimationFrame(() => this.tick());
    }

    showMilestone(message) {
        // 创建临时提示
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #FF00FF, #00FFFF);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: bold;
            z-index: 3000;
            animation: fade-in-up 0.5s ease, fade-out 0.5s ease 2.5s forwards;
            box-shadow: 0 5px 20px rgba(255,0,255,0.5);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }

    stop() {
        this.isRunning = false;
    }
}

// ==================== 薪资弹窗控制器 ====================

class SalaryModal {
    constructor() {
        this.btn = document.getElementById('salary-btn');
        this.modal = document.getElementById('salary-modal');
        this.closeBtn = this.modal?.querySelector('.close-btn');
        this.init();
    }

    init() {
        if (!this.btn || !this.modal) return;

        this.btn.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        
        // 点击背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // ESC 键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // 播放音效（如果有的话）
        this.playSound('open');
        
        // 触发烟花
        if (window.fireworksManager) {
            setTimeout(() => {
                window.fireworksManager.explode(window.innerWidth / 2, window.innerHeight / 2);
            }, 300);
        }
    }

    close() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    playSound(type) {
        // 预留音效接口
        console.log(`🔊 Sound: ${type}`);
    }
}

// ==================== 回到顶部控制器 ====================

class BackToTop {
    constructor() {
        this.btn = document.getElementById('back-to-top');
        this.visible = false;
        this.init();
    }

    init() {
        if (!this.btn) return;

        this.btn.addEventListener('click', () => this.scrollToTop());
        
        window.addEventListener('scroll', utils.throttle(() => {
            this.toggle(window.pageYOffset > 500);
        }, 100));
    }

    toggle(show) {
        if (show === this.visible) return;
        
        this.visible = show;
        if (show) {
            this.btn.classList.remove('hidden');
        } else {
            this.btn.classList.add('hidden');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ==================== BGM 控制器 ====================

class BGMController {
    constructor() {
        this.btn = document.getElementById('bgm-toggle');
        this.isPlaying = false;
        this.audio = null;
        this.init();
    }

    init() {
        if (!this.btn) return;

        this.btn.addEventListener('click', () => this.toggle());
        
        // 检查用户偏好
        const savedState = utils.storage.get('bgm-enabled', false);
        if (savedState) {
            this.loadAudio();
        }
    }

    loadAudio() {
        // 预留 BGM 加载接口
        // 由于 GitHub Pages 无法托管音频文件，这里使用 Web Audio API 生成简单音效
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    toggle() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.btn.textContent = '🔇 暂停BGM';
            this.btn.style.background = 'linear-gradient(135deg, #ff4444, #ff8844)';
            this.playMockBGM();
        } else {
            this.btn.textContent = '🎵 土味BGM';
            this.btn.style.background = '';
            this.stopMockBGM();
        }
        
        utils.storage.set('bgm-enabled', this.isPlaying);
    }

    playMockBGM() {
        // 模拟 BGM 播放效果
        console.log('🎵 正在播放：土味迪斯科 - 《遥遥领先之夜》');
        
        // 创建视觉反馈
        document.body.style.animation = 'bg-pulse 2s ease-in-out infinite';
    }

    stopMockBGM() {
        document.body.style.animation = '';
    }
}

// ==================== 彩蛋控制器 ====================

class EasterEggs {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                          'b', 'a'];
        this.konamiIndex = 0;
        this.init();
    }

    init() {
        // Konami Code 彩蛋
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.triggerKonami();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });

        // 点击 "遥遥领先" 文字彩蛋
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach(line => {
            line.addEventListener('click', () => {
                this.triggerTitleEffect(line);
            });
        });

        // 双击战绩卡片彩蛋
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach(card => {
            card.addEventListener('dblclick', () => {
                this.triggerCardEffect(card);
            });
        });
    }

    triggerKonami() {
        // 触发全屏烟花
        if (window.fireworksManager) {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    window.fireworksManager.explode(x, y);
                }, i * 200);
            }
        }
        
        // 显示彩蛋提示
        this.showToast('🎮 秘籍激活！无限遥遥领先模式！');
        
        // 改变页面背景
        document.body.style.background = 'linear-gradient(45deg, #FF00FF, #00FFFF, #FFFF00, #FF00FF)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradient-shift 3s ease infinite';
    }

    triggerTitleEffect(element) {
        element.style.animation = 'shake-hard 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
        
        // 计数点击
        const clickCount = parseInt(element.dataset.clicks || 0) + 1;
        element.dataset.clicks = clickCount;
        
        if (clickCount === 10) {
            this.showToast('👆 别再点了，遥遥领先很累的！');
            element.dataset.clicks = 0;
        }
    }

    triggerCardEffect(card) {
        card.style.animation = 'none';
        card.offsetHeight; // 触发重排
        card.style.animation = 'shake-hard 0.5s, card-entrance 0.8s';
        
        // 添加粒子效果
        this.addParticles(card);
    }

    addParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        if (window.fireworksManager) {
            window.fireworksManager.explode(centerX, centerY);
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FF00FF, #00FFFF);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 5000;
            animation: pop-in 0.3s ease, fade-out 0.5s ease 2.5s forwards;
            box-shadow: 0 10px 40px rgba(255,0,255,0.5);
            border: 3px solid #FFFF00;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }
}

// ==================== 性能监控 ====================

class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frames = 0;
        this.init();
    }

    init() {
        if (location.hostname === 'localhost' || location.search.includes('debug')) {
            this.createDisplay();
            this.measure();
        }
    }

    createDisplay() {
        this.display = document.createElement('div');
        this.display.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: #00FF00;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            border: 1px solid #00FF00;
        `;
        document.body.appendChild(this.display);
    }

    measure() {
        const now = performance.now();
        this.frames++;
        
        if (now >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
            this.frames = 0;
            this.lastTime = now;
            
            if (this.display) {
                this.display.textContent = `FPS: ${this.fps}`;
            }
        }
        
        requestAnimationFrame(() => this.measure());
    }
}

// ==================== 主应用类 ====================

class App {
    constructor() {
        this.timeTracker = null;
        this.salaryModal = null;
        this.backToTop = null;
        this.bgmController = null;
        this.easterEggs = null;
        this.performanceMonitor = null;
    }

    init() {
        // 等待 DOM 和动画系统都准备好
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // 初始化各模块
        this.timeTracker = new TimeTracker();
        this.salaryModal = new SalaryModal();
        this.backToTop = new BackToTop();
        this.bgmController = new BGMController();
        this.easterEggs = new EasterEggs();
        this.performanceMonitor = new PerformanceMonitor();

        // 启动时间追踪
        this.timeTracker.start();

        // 监听页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.timeTracker.stop();
            } else {
                this.timeTracker.start();
            }
        });

        // 添加额外的 CSS 动画关键帧
        this.addKeyframes();

        console.log('🚀 遥遥领先的一天 - 系统启动完成！');
        console.log('💡 提示：输入 Konami Code (↑↑↓↓←→←→BA) 触发彩蛋！');
    }

    addKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fade-out {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== 初始化 ====================

// 创建并启动应用
const app = new App();
app.init();

// 暴露全局接口供调试
window.YaoYaoLingXian = {
    app,
    utils,
    TimeTracker,
    SalaryModal,
    BackToTop,
    BGMController,
    EasterEggs,
    version: '1.0.0'
};
