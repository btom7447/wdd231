document.addEventListener('DOMContentLoaded', function() {
    const odometers = document.querySelectorAll('.odometer h3');
    
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    
    function animateOdometer(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = true;
        
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2500; 
        const start = 0;
        const startTime = Date.now();
        
        
        const originalContent = element.innerHTML;
        const suffix = originalContent.replace(/^[0-9\s]+/, ''); 
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(start + (target - start) * progress);
            
            
            element.innerHTML = currentValue + ' ' + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    
    function handleScroll() {
        odometers.forEach(odometer => {
            if (isInViewport(odometer) && !odometer.dataset.animated) {
                animateOdometer(odometer);
            }
        });
    }
    
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
});