// JavaScript para MotoWorld

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas las funciones
    initNavbar();
    initScrollAnimations();
    initCounters();
    initMotoFilters();
    initMotoModal();
    initContactForm();
    initSmoothScroll();
    
    // Mostrar elementos con animación cuando se carga la página
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Navbar con efecto de scroll
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.moto-card, .service-card, .blog-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contador animado para estadísticas
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 segundos
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Sistema de filtros para motos
function initMotoFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const motoCards = document.querySelectorAll('.moto-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar tarjetas
            motoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal de detalles de moto
function initMotoModal() {
    const modal = document.getElementById('motoModal');
    const modalTitle = document.getElementById('motoModalTitle');
    const modalBody = document.getElementById('motoModalBody');
    
    // Datos de las motos
    const motoData = {
        'yamaha-r1': {
            title: 'Yamaha YZF-R1',
            price: '$35.000.000',
            specs: {
                'Motor': '998cc, 4 cilindros',
                'Potencia': '200 HP',
                'Transmisión': '6 velocidades',
                'Peso': '199 kg',
                'Velocidad máxima': '299 km/h'
            },
            description: 'La Yamaha YZF-R1 es una superbike que incorpora la tecnología más avanzada de MotoGP, ofreciendo un rendimiento excepcional en pista y carretera.',
            image: 'https://motoshotwheels.com/wp-content/uploads/2023/11/yamaha-yzf-r1-azul-2018-mis53b-17.jpeg'
        },
        'harley-sportster': {
            title: 'Harley-Davidson Sportster',
            price: '$42.000.000',
            specs: {
                'Motor': '883cc, V-Twin',
                'Potencia': '50 HP',
                'Transmisión': '5 velocidades',
                'Peso': '247 kg',
                'Velocidad máxima': '175 km/h'
            },
            description: 'La icónica Harley-Davidson Sportster combina el estilo clásico americano con la confiabilidad moderna, perfecta para el cruising urbano.',
            image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=250&fit=crop'
        },
        'kawasaki-z900': {
            title: 'Kawasaki Z900',
            price: '$61.990.000',
            specs: {
                'Motor': '948cc, 4 cilindros',
                'Potencia': '125 HP',
                'Transmisión': '6 velocidades',
                'Peso': '210 kg',
                'Velocidad máxima': '250 km/h'
            },
            description: 'La Kawasaki Z900 es una naked moderna que ofrece potencia, agilidad y un diseño agresivo para la conducción urbana y deportiva.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_u8TL8CsCVQ6PBbSvrR_RkkIkyUWrN1tWcw&s'
        },
        'bmw-r1250gs': {
            title: 'BMW R1250GS',
            price: '$88.000.000',
            specs: {
                'Motor': '1254cc, Boxer',
                'Potencia': '136 HP',
                'Transmisión': '6 velocidades',
                'Peso': '249 kg',
                'Velocidad máxima': '200 km/h'
            },
            description: 'La BMW R1250GS es la moto de aventura por excelencia, diseñada para largas distancias y todo tipo de terrenos.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShRvy-b7mLqt-USR-yGt6yiZIpMG1xWJYJbw&s'
        },
        'ducati-panigale': {
            title: 'Ducati Panigale V4',
            price: '$120.000.000',
            specs: {
                'Motor': '1103cc, V4',
                'Potencia': '214 HP',
                'Transmisión': '6 velocidades',
                'Peso': '198 kg',
                'Velocidad máxima': '300+ km/h'
            },
            description: 'La Ducati Panigale V4 es una obra maestra de la ingeniería italiana, con tecnología derivada directamente de MotoGP.',
            image: 'https://images.unsplash.com/photo-1698695290237-5c7be2bd52a8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVjYXRpJTIwcGFuaWdhbGUlMjB2NHxlbnwwfHwwfHx8MA%3D%3D'
        },
        'honda-cb650r': {
            title: 'Honda CB650R',
            price: '$44.000.000',
            specs: {
                'Motor': '649cc, 4 cilindros',
                'Potencia': '95 HP',
                'Transmisión': '6 velocidades',
                'Peso': '208 kg',
                'Velocidad máxima': '200 km/h'
            },
            description: 'La Honda CB650R combina el estilo neo-sports café con la confiabilidad Honda, perfecta para el uso diario y los fines de semana.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxkbjQdp7qzUFdPMDie6JrNcKlJS3Xoe2VQ&s'
        }
    };
    
    // Manejar clicks en botones de detalles
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-bs-toggle="modal"]')) {
            const motoId = e.target.getAttribute('data-moto');
            const moto = motoData[motoId];
            
            if (moto) {
                modalTitle.textContent = moto.title;
                modalBody.innerHTML = createMotoModalContent(moto);
            }
        }
    });
}

function createMotoModalContent(moto) {
    let specsHtml = '';
    for (const [key, value] of Object.entries(moto.specs)) {
        specsHtml += `
            <div class="row mb-2">
                <div class="col-4 fw-bold">${key}:</div>
                <div class="col-8">${value}</div>
            </div>
        `;
    }
    
    return `
        <div class="row">
            <div class="col-md-6">
                <img src="${moto.image}" class="img-fluid rounded mb-3" alt="${moto.title}">
                <h4 class="text-primary">${moto.price}</h4>
            </div>
            <div class="col-md-6">
                <h5>Especificaciones</h5>
                ${specsHtml}
                <hr>
                <h5>Descripción</h5>
                <p>${moto.description}</p>
            </div>
        </div>
    `;
}

// Formulario de contacto
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        
        // Recopilar datos del formulario
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validar campos
        if (validateForm(data)) {
            // Simular envío
            showFormMessage('Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
        }
    });
}

function validateForm(data) {
    const requiredFields = ['nombre', 'email', 'asunto', 'mensaje'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'Este campo es requerido');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Validar email
    if (data.email && !isValidEmail(data.email)) {
        showFieldError(document.getElementById('email'), 'Ingresa un email válido');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    clearFieldError(input);
    input.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showFormMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funciones auxiliares
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Manejo de errores de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x250?text=Imagen+no+disponible';
    }
}, true);

// Efecto parallax simple
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
}, 10));

// Funciones de utilidad
const Utils = {
    // Formatear números
    formatNumber: function(num) {
        return new Intl.NumberFormat('es-CO').format(num);
    },
    
    // Formatear precios
    formatPrice: function(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(price);
    },
    
    // Mostrar/ocultar loading
    showLoading: function(element) {
        element.innerHTML = '<span class="loading"></span>';
    },
    
    hideLoading: function(element, originalContent) {
        element.innerHTML = originalContent;
    }
};

// Exportar funciones para uso global
window.MotoWorld = {
    Utils,
    initCounters,
    showFormMessage
};