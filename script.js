document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       THEME MANAGEMENT (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference; default to dark theme
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });


    /* ==========================================================================
       STICKY NAVBAR & SCROLL PROGRESS
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Sticky Navigation
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const scrollPercent = (scrollY / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Scroll To Top Button visibility
        if (scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================================================
       MOBILE RESPONSIVE NAVIGATION MENU
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });


    /* ==========================================================================
       ABOUT SECTION TAB SWITCHING
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Set active states
            btn.classList.add('active');
            const targetEl = document.getElementById(`tab-${targetTab}`);
            if (targetEl) {
                targetEl.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       SCROLLSPY ACTIVE LINK HIGHLIGHTING
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const scrollSpyOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));


    /* ==========================================================================
       SCROLL ENTRY REVEAL ANIMATIONS
       ========================================================================== */
    const animSections = document.querySelectorAll('.section-animate');

    const revealOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // If it is the skills section, animate skill bars
                if (entry.target.id === 'skills') {
                    entry.target.classList.add('animate');
                }
                
                // Once animated, we can stop observing it
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    animSections.forEach(section => revealObserver.observe(section));


    /* ==========================================================================
       HERO TEXT TYPEWRITER EFFECT
       ========================================================================== */
    const typewriter = document.getElementById('typewriter');
    const words = ["Frontend Developer", "Python Programmer", "MySQL Developer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add character
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        // Word completed
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start Typewriter
    setTimeout(type, 1000);


    /* ==========================================================================
       CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Input fields
        const nameField = document.getElementById('contact-name');
        const emailField = document.getElementById('contact-email');
        const messageField = document.getElementById('contact-message');

        // Reset previous validation styles
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));

        // Name Validation
        if (nameField.value.trim() === '') {
            nameField.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailField.value.trim())) {
            emailField.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        // Message Validation
        if (messageField.value.trim() === '') {
            messageField.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        // Form Submission Simulation
        if (isValid) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate server network latency
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show Success Modal
                openModal('success-submit', {
                    name: nameField.value.trim()
                });

                // Reset form
                contactForm.reset();
            }, 1800);
        }
    });

    // Remove validation errors dynamically on user input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (group.classList.contains('invalid')) {
                group.classList.remove('invalid');
            }
        });
    });


    /* ==========================================================================
       INTERACTIVE QUICK DEMO MODALS (PRASANNA'S CUSTOM PROJECTS)
       ========================================================================== */
    const demoModal = document.getElementById('demo-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBodyContent = document.getElementById('modal-body-content');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Attach click events on all demo triggers
    document.querySelectorAll('.project-demo-btn, .demo-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectType = trigger.getAttribute('data-project');
            openModal(projectType);
        });
    });

    function openModal(projectType, extraData = {}) {
        let contentHtml = '';

        switch (projectType) {
            case 'library':
                contentHtml = `
                    <h3 class="modal-project-title">Library Book Manager Simulation</h3>
                    <div class="library-demo" style="display: flex; flex-direction: column; gap: 15px;">
                        <p>Simulate catalog indexing. Search or insert book records in real-time.</p>
                        
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="lib-search-input" placeholder="Search book title..." style="flex: 1; padding: 10px 14px; border-radius: var(--border-radius-sm); background-color: var(--color-border); border: 1px solid var(--color-border); color: var(--color-text-primary); outline: none;">
                        </div>

                        <div style="max-height: 150px; overflow-y: auto; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); background-color: var(--color-bg-base); padding: 10px;">
                            <ul id="lib-book-list" style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                                <li data-title="the computer engineering review" style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 5px;">
                                    <span><strong>The Computer Engineering Review</strong></span>
                                    <span style="color: var(--color-secondary);">2022</span>
                                </li>
                                <li data-title="introduction to python" style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 5px;">
                                    <span><strong>Introduction to Python</strong></span>
                                    <span style="color: var(--color-secondary);">2023</span>
                                </li>
                                <li data-title="mysql guide for database administration" style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 5px;">
                                    <span><strong>MySQL Guide for DBAs</strong></span>
                                    <span style="color: var(--color-secondary);">2021</span>
                                </li>
                            </ul>
                        </div>

                        <hr style="border: 0; border-top: 1px solid var(--color-border); margin: 5px 0;">
                        
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 10px;">
                                <input type="text" id="lib-new-title" placeholder="New Book Title" style="padding: 10px 14px; border-radius: var(--border-radius-sm); background-color: var(--color-border); border: 1px solid var(--color-border); color: var(--color-text-primary); outline: none;">
                                <input type="number" id="lib-new-year" placeholder="Year" value="2026" style="padding: 10px 14px; border-radius: var(--border-radius-sm); background-color: var(--color-border); border: 1px solid var(--color-border); color: var(--color-text-primary); outline: none;">
                            </div>
                            <button class="btn btn-primary" id="lib-add-btn" style="width: 100%;">Add New Book Record</button>
                        </div>
                    </div>
                `;
                break;

            case 'defaulter':
                contentHtml = `
                    <h3 class="modal-project-title">Credit Card Default Risk Evaluator</h3>
                    <div class="defaulter-demo" style="display: flex; flex-direction: column; gap: 15px;">
                        <p>Adjust inputs to run a mock statistical machine learning prediction on credit default risk.</p>
                        
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <label style="font-size: 0.85rem; font-weight:600; color: var(--color-text-secondary);">LIMIT BALANCE ($)</label>
                            <input type="range" id="def-balance-slider" min="1000" max="50000" step="1000" value="15000" style="width: 100%; cursor: pointer;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight:700;">
                                <span>$1,000</span>
                                <span id="def-balance-val" style="color: var(--color-primary);">$15,000</span>
                                <span>$50,000</span>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <label style="font-size: 0.85rem; font-weight:600; color: var(--color-text-secondary); display:block; margin-bottom:5px;">EDUCATION LEVEL</label>
                                <select id="def-education" style="width:100%; padding:10px; border-radius:var(--border-radius-sm); background-color: var(--color-border); border: 1px solid var(--color-border); color: var(--color-text-primary); outline:none;">
                                    <option value="graduate">Graduate School</option>
                                    <option value="undergrad">University Degree</option>
                                    <option value="highschool">High School</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size: 0.85rem; font-weight:600; color: var(--color-text-secondary); display:block; margin-bottom:5px;">PAYMENT DELAY</label>
                                <select id="def-delay" style="width:100%; padding:10px; border-radius:var(--border-radius-sm); background-color: var(--color-border); border: 1px solid var(--color-border); color: var(--color-text-primary); outline:none;">
                                    <option value="0">No Delays</option>
                                    <option value="1">1 Month Late</option>
                                    <option value="2">2+ Months Late</option>
                                </select>
                            </div>
                        </div>

                        <button class="btn btn-primary" id="def-predict-btn" style="width: 100%; margin-top: 10px;">Run Prediction Model</button>

                        <div id="def-result-card" style="display: none; background: rgba(99, 102, 241, 0.05); border: 1px solid var(--color-border); border-radius: var(--border-radius-md); padding: 15px; text-align: center; margin-top: 5px;">
                            <div style="font-size: 0.9rem; font-weight:600; color: var(--color-text-secondary);">PREDICTED DEFAULT RISK</div>
                            <div id="def-probability" style="font-size: 2.2rem; font-weight: 800; font-family: var(--font-heading); margin: 5px 0;">18%</div>
                            <div id="def-risk-label" style="font-size: 0.95rem; font-weight: 700; color: #10b981;">LOW RISK</div>
                        </div>
                    </div>
                `;
                break;

            case 'rescue':
                contentHtml = `
                    <h3 class="modal-project-title">Smart Rescue Lane System Simulator</h3>
                    <div class="rescue-demo" style="display: flex; flex-direction: column; gap: 15px;">
                        <p>Simulate a priority lane alarm routing system when emergency vehicles approach.</p>
                        
                        <!-- Visual Lane Representation -->
                        <div style="background-color: #1e293b; border-radius: var(--border-radius-md); padding: 20px; border: 1px solid var(--color-border); overflow: hidden; position: relative;">
                            <!-- Lane 1 -->
                            <div style="display: flex; align-items: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 15px; margin-bottom: 15px; position: relative;">
                                <span style="font-size: 0.75rem; font-weight: 700; color: #94a3b8; position: absolute; top:0; left:0;">STANDARD LANE</span>
                                <div style="display: flex; gap: 20px; margin-top: 15px; width: 100%;">
                                    <div style="font-size: 1.5rem; filter: grayscale(0.5);" id="car-std-1">🚗</div>
                                    <div style="font-size: 1.5rem; filter: grayscale(0.5);" id="car-std-2">🚙</div>
                                </div>
                                <div style="position: absolute; right: 10px; top: 15px; width: 14px; height: 14px; border-radius: 50%; background-color: #ef4444;" id="std-signal"></div>
                            </div>
                            
                            <!-- Rescue Lane -->
                            <div style="display: flex; align-items: center; position: relative; padding-bottom: 5px;">
                                <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-secondary); position: absolute; top: -5px; left: 0;">RESCUE LANE</span>
                                <div style="font-size: 1.6rem; transform: translateX(0); transition: transform 2.5s cubic-bezier(0.4, 0, 0.2, 1); margin-top: 10px; z-index: 2;" id="rescue-ambulance">🚒</div>
                                <div style="position: absolute; right: 10px; top: 10px; width: 14px; height: 14px; border-radius: 50%; background-color: #ef4444;" id="rescue-signal"></div>
                            </div>
                        </div>

                        <div id="rescue-status-msg" style="text-align: center; font-size: 0.95rem; font-weight: 600; color: var(--color-text-secondary);">Lane System Idle. Normal traffic flow active.</div>

                        <button class="btn btn-primary" id="rescue-alert-btn" style="width: 100%;">Trigger Ambulance Dispatch Alert</button>
                    </div>
                `;
                break;

            case 'success-submit':
                contentHtml = `
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="font-size: 3.5rem; color: #10b981; margin-bottom: 15px;">✓</div>
                        <h3 class="modal-project-title" style="border:none; margin-bottom: 10px; padding:0;">Thank you, ${extraData.name}!</h3>
                        <p style="color: var(--color-text-secondary); margin-bottom: 25px;">Your message has been submitted successfully. I will get back to you shortly.</p>
                        <button class="btn btn-primary" id="success-close-btn" style="padding: 10px 30px;">Close</button>
                    </div>
                `;
                break;
        }

        modalBodyContent.innerHTML = contentHtml;
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll

        // Bind inner elements logic
        if (projectType === 'library') {
            bindLibraryDemo();
        } else if (projectType === 'defaulter') {
            bindDefaulterDemo();
        } else if (projectType === 'rescue') {
            bindRescueDemo();
        } else if (projectType === 'success-submit') {
            document.getElementById('success-close-btn').addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalBodyContent.innerHTML = '';
        }, 300);
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    /* ==========================================================================
       DEMO LOGIC BINDINGS
       ========================================================================== */
    
    // Library Demo Logic
    function bindLibraryDemo() {
        const searchInput = document.getElementById('lib-search-input');
        const listContainer = document.getElementById('lib-book-list');
        const newTitle = document.getElementById('lib-new-title');
        const newYear = document.getElementById('lib-new-year');
        const addBtn = document.getElementById('lib-add-btn');

        // Filter search list
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            const items = listContainer.querySelectorAll('li');
            
            items.forEach(item => {
                const titleText = item.getAttribute('data-title');
                if (titleText.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Add item
        addBtn.addEventListener('click', () => {
            const title = newTitle.value.trim();
            const year = newYear.value.trim();
            
            if (title === '' || year === '') {
                alert('Please enter both title and publication year.');
                return;
            }

            const newLi = document.createElement('li');
            newLi.setAttribute('data-title', title.toLowerCase());
            newLi.style.cssText = 'display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 5px; animation: fade-in-tab 0.4s ease;';
            newLi.innerHTML = `<span><strong>${title}</strong></span><span style="color: var(--color-secondary);">${year}</span>`;
            
            listContainer.appendChild(newLi);
            
            // Clear inputs
            newTitle.value = '';
            newYear.value = '2026';
        });
    }

    // Credit Card Defaulter Predictor Logic
    function bindDefaulterDemo() {
        const slider = document.getElementById('def-balance-slider');
        const sliderVal = document.getElementById('def-balance-val');
        const education = document.getElementById('def-education');
        const delay = document.getElementById('def-delay');
        const predictBtn = document.getElementById('def-predict-btn');
        const resultCard = document.getElementById('def-result-card');
        const probabilityText = document.getElementById('def-probability');
        const riskLabel = document.getElementById('def-risk-label');

        // Update slider value on drag
        slider.addEventListener('input', () => {
            sliderVal.textContent = `$${parseInt(slider.value).toLocaleString()}`;
        });

        predictBtn.addEventListener('click', () => {
            predictBtn.textContent = 'Calculating Probability...';
            predictBtn.disabled = true;
            resultCard.style.display = 'none';

            setTimeout(() => {
                predictBtn.textContent = 'Run Prediction Model';
                predictBtn.disabled = false;
                resultCard.style.display = 'block';

                // Simple mockup formula logic
                const bal = parseInt(slider.value);
                const edu = education.value;
                const dly = parseInt(delay.value);

                let prob = 10; // baseline 10%
                
                // Low balance has slightly higher default probability in mock
                if (bal < 10000) prob += 15;
                else if (bal < 25000) prob += 5;

                // Education factors
                if (edu === 'highschool') prob += 12;
                else if (edu === 'undergrad') prob += 6;

                // Delays are heavy factors
                if (dly === 1) prob += 30;
                else if (dly === 2) prob += 55;

                if (prob > 95) prob = 95; // cap at 95%

                probabilityText.textContent = `${prob}%`;

                // Set labels and color
                if (prob < 25) {
                    riskLabel.textContent = 'LOW RISK';
                    riskLabel.style.color = '#10b981'; // green
                    resultCard.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                } else if (prob < 55) {
                    riskLabel.textContent = 'MODERATE RISK';
                    riskLabel.style.color = '#f59e0b'; // orange
                    resultCard.style.backgroundColor = 'rgba(245, 158, 11, 0.05)';
                } else {
                    riskLabel.textContent = 'HIGH DANGER RISK';
                    riskLabel.style.color = '#ef4444'; // red
                    resultCard.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                }
            }, 900);
        });
    }

    // Rescue Lane System Logic
    function bindRescueDemo() {
        const ambulance = document.getElementById('rescue-ambulance');
        const alertBtn = document.getElementById('rescue-alert-btn');
        const stdSignal = document.getElementById('std-signal');
        const rescueSignal = document.getElementById('rescue-signal');
        const statusMsg = document.getElementById('rescue-status-msg');
        const car1 = document.getElementById('car-std-1');
        const car2 = document.getElementById('car-std-2');

        alertBtn.addEventListener('click', () => {
            alertBtn.disabled = true;
            statusMsg.textContent = 'Emergency Alarm Active! Diverting traffic...';
            statusMsg.style.color = 'var(--color-accent-pink)';
            
            // Flashing signals
            rescueSignal.style.backgroundColor = '#10b981'; // Green for ambulance
            stdSignal.style.backgroundColor = '#ef4444'; // Red for standard lane

            // Standard cars stop
            car1.style.animation = 'none';
            car2.style.animation = 'none';
            
            // Drive ambulance
            const modalWidth = document.querySelector('.modal-content-wrapper').offsetWidth;
            const driveDistance = modalWidth - 120; // estimate path
            ambulance.style.transform = `translateX(${driveDistance}px)`;

            setTimeout(() => {
                statusMsg.textContent = 'Ambulance passed intersection safely. Clearing alarms...';
                statusMsg.style.color = 'var(--color-secondary)';
                rescueSignal.style.backgroundColor = '#ef4444'; // Return to red
            }, 2600);

            setTimeout(() => {
                // Reset
                ambulance.style.transition = 'none';
                ambulance.style.transform = 'translateX(0)';
                setTimeout(() => {
                    ambulance.style.transition = 'transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 50);

                stdSignal.style.backgroundColor = '#10b981'; // Green for normal traffic
                statusMsg.textContent = 'Lane System Idle. Normal traffic flow active.';
                statusMsg.style.color = 'var(--color-text-secondary)';
                alertBtn.disabled = false;
            }, 4500);
        });
    }
});
