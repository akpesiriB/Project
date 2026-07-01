const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach(el =>{
    observer.observe(el);
});
//fade section
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            section.classList.add('active');
            section.classList.remove('fade-out');
        } else if (!entry.isIntersecting) {
            section.classList.remove('active');
            section.classList.add('fade-out');
        }
    });
}, {
    threshold: [0, 0.15, 0.35, 0.6]
});

document.querySelectorAll('section.fade-section').forEach(section => {
    sectionObserver.observe(section);
});

let scrollTimeout = null;
window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 120);
});
//burger menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        const expanded = mobileMenu.classList.contains("open");
        mobileMenu.setAttribute("aria-hidden", expanded ? "false" : "true");
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu) {
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
    }
});

// Hover gallery: switch images only while hovering over the figure
document.querySelectorAll('figure.hover-gallery').forEach(fig => {
    const imgs = Array.from(fig.querySelectorAll('img'));
    if (imgs.length <= 1) return;

    let activeIndex = 0;

    const showIndex = (index) => {
        imgs.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
            img.style.zIndex = i === index ? '1' : '0';
        });
    };

    showIndex(activeIndex);

    fig.addEventListener('mouseenter', () => {
        activeIndex = (activeIndex + 1) % imgs.length;
        showIndex(activeIndex);
    });

    fig.addEventListener('mouseleave', () => {
        activeIndex = 0;
        showIndex(activeIndex);
    });

    fig.addEventListener('touchstart', (event) => {
        event.preventDefault();
        activeIndex = (activeIndex + 1) % imgs.length;
        showIndex(activeIndex);
    });
});
//play music


    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    let playing = false;

musicBtn.addEventListener("click", () => {

    if(!playing){

        music.play();

    musicBtn.textContent = "⏸ Pause Music";

    } else {

        music.pause();

    musicBtn.textContent = "🎵 Play Music";

    }

    playing = !playing;
});



// Dark mode toggle: switch the page between light and dark themes
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkModeToggle.setAttribute('aria-pressed', String(isDark));
    });
}