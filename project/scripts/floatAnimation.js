document.addEventListener('DOMContentLoaded', function() {
    const floatingSpans = document.querySelectorAll('.explore-stat span');
    
    
    const animationSettings = {
        duration: 3000, 
        distance: 20,   
        delayIncrement: 500 
    };
    
    
    floatingSpans.forEach((span, index) => {
        
        span.style.transform = 'translateY(0)';
        span.style.willChange = 'transform';
        
        
        setTimeout(() => {
            animateFloat(span, animationSettings.duration, animationSettings.distance);
        }, index * animationSettings.delayIncrement);
    });
    
    
    function animateFloat(element, duration, distance) {
        let startTime = null;
        
        function float(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            
            
            const yPos = Math.sin(progress * Math.PI * 2) * distance;
            element.style.transform = `translateY(${yPos}px)`;
            
            
            requestAnimationFrame(float);
        }
        
        
        requestAnimationFrame(float);
    }
});