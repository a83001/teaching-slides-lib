// 教学库核心功能
const TeachingLib = (function() {
    // 私有变量
    let slides = [];
    let currentIndex = 0;
    let config = {
        theme: 'dark-blue',
        transitionSpeed: 600,
        enableDrawing: true,
        drawingColors: ['#ff5f56', '#27c93f', '#ffbd2e', '#4a69bd']
    };
    
    // 初始化函数
    function init(userConfig = {}) {
        // 合并配置
        config = {...config, ...userConfig};
        
        // 获取幻灯片元素
        slides = Array.from(document.querySelectorAll('.slide'));
        
        // 设置主题
        document.body.classList.add(`theme-${config.theme}`);
        
        // 初始化幻灯片状态
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.add('next');
            }
        });
        
        // 添加键盘事件监听
        document.addEventListener('keydown', handleKeyDown);
        
        // 返回公共API
        return {
            nextSlide,
            prevSlide,
            gotoSlide,
            toggleDrawing,
            changeColor,
            clearCanvas,
            getCurrentSlide: () => currentIndex,
            getTotalSlides: () => slides.length,
            updateConfig: (newConfig) => {
                config = {...config, ...newConfig};
            },
            onSlideChange: (callback) => {
                slideChangeCallbacks.push(callback);
            },
            addCustomSlideType: (type, renderer) => {
                customSlideRenderers[type] = renderer;
            }
        };
    }
    
    // 幻灯片切换函数
    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        slides[currentIndex].classList.remove('active');
        slides[currentIndex].classList.add(index > currentIndex ? 'prev' : 'next');
        
        slides[index].classList.remove('prev', 'next');
        slides[index].classList.add('active');
        
        currentIndex = index;
        
        // 更新UI显示
        if (document.getElementById('current-slide')) {
            document.getElementById('current-slide').textContent = currentIndex + 1;
        }
        
        // 执行回调
        slideChangeCallbacks.forEach(cb => cb(currentIndex));
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    function gotoSlide(index) {
        showSlide(index);
    }
    
    // 绘图功能
    function toggleDrawing() {
        console.log("切换绘图模式");
        // 实际实现中将在这里处理绘图模式的切换
    }
    
    function changeColor(index) {
        if (index >= 0 && index < config.drawingColors.length) {
            console.log(`更改颜色为: ${config.drawingColors[index]}`);
        }
    }
    
    function clearCanvas() {
        console.log("清除当前画布");
    }
    
    // 键盘事件处理
    function handleKeyDown(e) {
        // 防止在输入框中触发
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                nextSlide();
                break;
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'd':
            case 'D':
                toggleDrawing();
                break;
            case 'c':
            case 'C':
                clearCanvas();
                break;
            case '1':
                changeColor(0);
                break;
            case '2':
                changeColor(1);
                break;
            case '3':
                changeColor(2);
                break;
            case '4':
                changeColor(3);
                break;
        }
    }
    
    // 回调函数存储
    const slideChangeCallbacks = [];
    const customSlideRenderers = {};
    
    // 公共API
    return {
        init
    };
})();