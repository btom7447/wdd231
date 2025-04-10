document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch services data
        const response = await fetch('./data/services.json');
        if (!response.ok) throw new Error('Failed to load services');
        const services = await response.json();
        
        const nav = document.querySelector('.services-nav');
        const content = document.querySelector('.services-content');
        const serviceTitle = document.getElementById('serviceTitle');
        
        // Create navigation tabs
        const navList = document.createElement('ul');
        services.forEach((service, index) => {
            const li = document.createElement('li');
            li.textContent = service.title;
            li.dataset.id = service.id;
            
            // Set first tab as active by default
            if (index === 0) {
                li.classList.add('active');
                updateServiceContent(service);
                serviceTitle.textContent = service.title;
            }
            
            li.addEventListener('click', () => {
                // Update active tab
                document.querySelectorAll('.services-nav li').forEach(item => {
                    item.classList.remove('active');
                });
                li.classList.add('active');
                
                // Update content
                const selectedService = services.find(s => s.id === service.id);
                updateServiceContent(selectedService);
                
                // Update breadcrumb
                serviceTitle.textContent = service.title;
            });
            
            navList.appendChild(li);
        });
        nav.appendChild(navList);
        
        // Function to update service content
        function updateServiceContent(service) {
            content.innerHTML = `
                ${service.image ? `<img src="images/${service.image}" alt="${service.title}" class="service-image">` : ''}
                <h2>${service.title}</h2>
                <div class="service-description">
                    ${service.description.map(des => `<p>${des}</p>`).join('')}
                </div>
                <div class="service-details">
                    ${service.details ? `<p>${service.details}</p>` : ''}
                    ${service.features ? `
                        <ul class="service-features">
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error loading services:', error);
        document.querySelector('.services-content').innerHTML = `
            <p class="error">Unable to load services at this time. Please try again later.</p>
        `;
    }
});