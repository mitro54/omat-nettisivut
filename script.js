const aboutMe = document.querySelector('.p1');
const updatedText = '"Until then, i am just a guy vigorously learning Web Development."';
const menuButton = document.querySelector('.menu-button');
const headerList = document.querySelector('.header-list');
const header = document.querySelector('.header');
const menuSelector = document.querySelector('.menu-items');
const toggleColor = document.querySelector('.toggleColor');
const img = document.querySelector('.main-content-picture img');
const body = document.querySelector('body')
let menuOpen = false;

window.addEventListener('resize', () => location.reload())

window.onscroll = () => { scrollDetector() };

let sticky = header.offsetTop;

function scrollDetector() {
    if (window.scrollY > sticky) {
        header.classList.add("sticky");
        spacer.style.display = 'block';
        // newMenu.style.top = header.offsetHeight + 'px';
        // newMenu.classList.add('sticky');
    } else {
        header.classList.remove("sticky");
        spacer.style.display = 'none';
        // newMenu.classList.remove('sticky');
    };
};

const spacer = document.querySelector('.spacer');


function createMenu() {
    const newMenu = document.createElement('div');
    const newUl = document.createElement('ul');
    let menuItems = [
        { id: 0, text: "Who am I?", href: "/about.html" },
        { id: 1, text: "Why hire me?", href: "/hire.html" },
        { id: 2, text: "Contact", href: "/contact.html" }
    ];

    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        li.setAttribute('id', `li-${item.id}`);
        a.setAttribute('href', item.href);
        a.innerText = item.text;
        li.append(a);
        newUl.append(li);
    });

    newMenu.setAttribute('class', 'menu-items');
    newMenu.append(newUl);
    menuSelector.remove();

    if (menuOpen) {
        // const oldMenu = document.querySelector('.menu-items');
        // oldMenu.remove();
        menuOpen = false;
        location.reload();
    } else {
        menuOpen = true;
        header.after(newMenu);
        if (window.location.pathname === '/about.html') {
            const a = document.querySelector('#li-0 a')
            a.innerText = 'Go Home';
            a.setAttribute('href', '/')
        } else if (window.location.pathname === '/hire.html') {
            const a = document.querySelector('#li-1 a')
            a.innerText = 'Go Home';
            a.setAttribute('href', '/')
        } else if (window.location.pathname === '/contact.html') {
            const a = document.querySelector('#li-2 a')
            a.innerText = 'Go Home';
            a.setAttribute('href', '/')
        };
    };
    // window.onscroll = () => { scrollDetector() };
    // let stickyHeader = header.offsetTop;

    // function scrollDetector() {
    //     if (window.scrollY > stickyHeader) {
    //         header.classList.add("sticky");
    //         newMenu.style.top = header.offsetHeight + 'px';
    //         newMenu.classList.add('sticky');
    //         spacer.style.display = 'block';
    //     } else {
    //         newMenu.classList.remove('sticky');
    //         header.classList.remove("sticky");
    //         spacer.style.display = 'none';
    //     }

    // }
}

menuButton.addEventListener('click', () => {
    menuButton.innerText = menuOpen ? '☰' : '╳';
    menuButton.style.fontSize = menuOpen ? '32px' : '18px';
    menuButton.style.margin = menuOpen ? '0' : '5px';
    headerList.style.display = menuOpen ? 'none' : 'flex';
    createMenu();
});

// only runs in about.html

if (window.location.pathname === '/about.html') {
    try {
        setTimeout(() => {
            aboutMe.style.color = 'grey';
            aboutMe.style.transform = 'rotate(0.01turn)';
            aboutMe.innerText = updatedText;
        }, 5000);

        aboutMe.addEventListener('mouseover', () => {
            aboutMe.style.color = 'red';
            aboutMe.style.transform = 'rotate(-0.01turn)';
            aboutMe.innerText = '"Oh, and also i like easter eggs so heres one!"'
        });

        aboutMe.addEventListener('mouseout', () => {
            aboutMe.style.color = 'grey';
            aboutMe.innerText = `"Inspiring isn't it, eh?"`;
        });
    } catch {
        console.warn("Didn't find any easter eggs here...");
    }
}

// colorful styles

function toggleModes(bool) {
    localStorage.setItem("isColorful", bool ? "1" : "0");
}

const isColorful = localStorage.getItem("isColorful");
let colors = isColorful === "1";

const head = document.querySelector('head');
const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', '/colorStyles.css');

function colorfulStyles() {
    if (colors) {
        if (window.location.pathname === '/') {
            toggleColor.innerText = 'AAAAGH TURN IT OFF!!';
            img.setAttribute('src', '/pictures/kukat.jpg')
        } else if (window.location.pathname === '/hire.html') {
            img.setAttribute('src', '/pictures/investment.jpg')
        } else if (window.location.pathname === '/contact.html') {
            img.setAttribute('src', '/pictures/contact.jpg')
        }
        head.append(link);
    } else {
        if (window.location.pathname === '/') {
            toggleColor.innerText = 'GIVE ME THE COLORS!';
            img.setAttribute('src', '/pictures/balloon.jpeg')
        }
        link.remove();
    }
}

function handleToggle() {
    colors = !colors;
    toggleModes(colors);
    colorfulStyles();
}

if (window.location.pathname === '/') {
    toggleColor.addEventListener('click', handleToggle);
    colorfulStyles();
} else {
    colorfulStyles();
}