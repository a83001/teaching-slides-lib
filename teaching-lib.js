// ��ѧ����Ĺ���
const TeachingLib = (function() {
    // ˽�б���
    let slides = [];
    let currentIndex = 0;
    let config = {
        theme: 'dark-blue',
        transitionSpeed: 600,
        enableDrawing: true,
        drawingColors: ['#ff5f56', '#27c93f', '#ffbd2e', '#4a69bd']
    };
    
    // ��ʼ������
    function init(userConfig = {}) {
        // �ϲ�����
        config = {...config, ...userConfig};
        
        // ��ȡ�õ�ƬԪ��
        slides = Array.from(document.querySelectorAll('.slide'));
        
        // ��������
        document.body.classList.add(`theme-${config.theme}`);
        
        // ��ʼ���õ�Ƭ״̬
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.add('next');
            }
        });
        
        // ��Ӽ����¼�����
        document.addEventListener('keydown', handleKeyDown);
        
        // ���ع���API
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
    
    // �õ�Ƭ�л�����
    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        slides[currentIndex].classList.remove('active');
        slides[currentIndex].classList.add(index > currentIndex ? 'prev' : 'next');
        
        slides[index].classList.remove('prev', 'next');
        slides[index].classList.add('active');
        
        currentIndex = index;
        
        // ����UI��ʾ
        if (document.getElementById('current-slide')) {
            document.getElementById('current-slide').textContent = currentIndex + 1;
        }
        
        // ִ�лص�
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
    
    // ��ͼ����
    function toggleDrawing() {
        console.log("�л���ͼģʽ");
        // ʵ��ʵ���н������ﴦ���ͼģʽ���л�
    }
    
    function changeColor(index) {
        if (index >= 0 && index < config.drawingColors.length) {
            console.log(`������ɫΪ: ${config.drawingColors[index]}`);
        }
    }
    
    function clearCanvas() {
        console.log("�����ǰ����");
    }
    
    // �����¼�����
    function handleKeyDown(e) {
        // ��ֹ��������д���
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
    
    // �ص������洢
    const slideChangeCallbacks = [];
    const customSlideRenderers = {};
    
    // ����API
    return {
        init
    };
})();