/* ==========================================================================
   ROHITH K - PORTFOLIO INTERACTIVE LOGIC & AI ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. PARTICLE CANVAS ANIMATION (Cyber Ambient Network)
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(138, 43, 226, ';
                this.alpha = Math.random() * 0.4 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < 65; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Draw connecting lines between nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* --------------------------------------------------------------------------
       2. HERO TYPING TEXT EFFECT
       -------------------------------------------------------------------------- */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            "AI & Deep Learning Systems",
            "Computer Vision Platforms",
            "Flutter Mobile Applications",
            "Agri-Tech Solutions",
            "Embedded & IoT Backends"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200; // Pause at full text
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400;
            }

            setTimeout(typeLoop, typeSpeed);
        }
        typeLoop();
    }

    /* --------------------------------------------------------------------------
       3. NAVBAR SCROLL EFFECT & SMOOTH SCROLLING
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --------------------------------------------------------------------------
       4. ANIMATED STATS COUNTER ON SCROLL
       -------------------------------------------------------------------------- */
    const counters = document.querySelectorAll('.counter');
    let hasAnimatedCounters = false;

    function animateCounters() {
        const metricsSection = document.getElementById('metrics');
        if (!metricsSection) return;

        const sectionPos = metricsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !hasAnimatedCounters) {
            hasAnimatedCounters = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = target / 50;

                function updateCount() {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.textContent = target;
                    }
                }
                updateCount();
            });
        }
    }
    window.addEventListener('scroll', animateCounters);

    /* --------------------------------------------------------------------------
       5. 3D CARD TILT EFFECT ON MOUSE MOVE
       -------------------------------------------------------------------------- */
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    /* --------------------------------------------------------------------------
       6. PROJECT FILTERING
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       7. INTERACTIVE PROJECT MODAL POPUPS
       -------------------------------------------------------------------------- */
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    const projectData = {
        '1': {
            title: 'AI-Based Smart Classroom Attendance System',
            category: 'AI / Computer Vision / Flask',
            img: './assets/smart_attendance.jpg',
            metrics: [
                { label: 'Recognition Accuracy', val: '95%+' },
                { label: 'Time Reduction', val: '90%' },
                { label: 'Database Records', val: '100+ Students' }
            ],
            description: `
                <p>This end-to-end AI attendance solution replaces traditional manual roll-call using real-time Computer Vision. Built with Python and OpenCV, it leverages LBPH (Local Binary Patterns Histograms) face recognition combined with a custom 2-of-3 frame verification algorithm to eliminate false positives.</p>
                <br>
                <h4>Key Technical Highlights:</h4>
                <ul>
                    <li>Integrated Flask web dashboard allowing professors to monitor live attendance sessions.</li>
                    <li>SQLite database back-end storing facial embeddings and attendance timestamps.</li>
                    <li>Automated export of attendance logs to Excel/CSV formats.</li>
                </ul>
            `,
            tech: ['Python', 'OpenCV', 'LBPH Face Recognition', 'Flask', 'SQLite', 'HTML/CSS']
        },
        '2': {
            title: 'Crop Disease Detection – Smart Crop Platform',
            category: 'Agri-Tech AI / TensorFlow / Flutter',
            img: './assets/crop_disease.jpg',
            metrics: [
                { label: 'Detection Accuracy', val: '>90%' },
                { label: 'Crop Diseases Supported', val: '5+ Types' },
                { label: 'Inference Speed', val: '< 200ms' }
            ],
            description: `
                <p>A smart agriculture platform designed to empower farmers with early crop disease diagnosis. The system uses a deep Convolutional Neural Network (CNN) trained with TensorFlow/Keras on plant leaf datasets.</p>
                <br>
                <h4>Key Technical Highlights:</h4>
                <ul>
                    <li>Deploys lightweight Transfer Learning models for real-time mobile inference.</li>
                    <li>Cross-platform Flutter application allowing farmers to take a picture of a leaf and receive instant diagnostics.</li>
                    <li>Provides actionable remedies, fertilizer recommendations, and prevention tips.</li>
                </ul>
            `,
            tech: ['TensorFlow', 'Keras', 'Python', 'Flutter', 'Dart', 'OpenCV']
        },
        '3': {
            title: 'Quality Control AI – Automated Defect Detection',
            category: 'Computer Vision / Industrial AI',
            img: './assets/defect_detection.jpg',
            metrics: [
                { label: 'Inspection Speedup', val: '70%' },
                { label: 'Defect Types', val: 'Cracks, Scratches, Anomalies' },
                { label: 'Target Industry', val: 'Manufacturing' }
            ],
            description: `
                <p>An automated industrial quality assurance system developed using Python and OpenCV to detect surface defects on manufactured parts (e.g., PCBs, metal parts, agricultural products) in real-time camera feeds.</p>
                <br>
                <h4>Key Technical Highlights:</h4>
                <ul>
                    <li>Reduces manual quality inspection time by approximately 70%.</li>
                    <li>Improves production yield by highlighting defects with color-coded bounding boxes and alert logs.</li>
                    <li>Custom contour analysis and morphological image filtering algorithms.</li>
                </ul>
            `,
            tech: ['Python', 'OpenCV', 'Image Processing', 'Matplotlib', 'NumPy']
        },
        '4': {
            title: 'Smart Ration Distribution – App & IoT Backend',
            category: 'Flutter / IoT / Embedded Firmware',
            img: './assets/smart_ration.jpg',
            metrics: [
                { label: 'Hardware', val: 'Arduino Microcontroller' },
                { label: 'Features', val: 'Real-time Stock & Auth' },
                { label: 'Platform', val: 'Flutter Mobile App' }
            ],
            description: `
                <p>An innovative IoT public distribution system designed to modernize ration shops. It combines a user-friendly Flutter mobile application for citizens with an Arduino-based microcontroller hardware unit.</p>
                <br>
                <h4>Key Technical Highlights:</h4>
                <ul>
                    <li>Real-time stock quota tracking and electronic weight measurement.</li>
                    <li>User authentication preventing ration fraud and ensuring transparent allocation.</li>
                    <li>Automated inventory syncing via RESTful API connectors.</li>
                </ul>
            `,
            tech: ['Flutter', 'Dart', 'Arduino C++', 'Embedded Firmware', 'SQLite/REST']
        },
        '5': {
            title: 'Staff Availability Tracker Mobile App',
            category: 'Flutter / Campus Application',
            img: './assets/smart_attendance.jpg',
            metrics: [
                { label: 'Target Users', val: 'College Campus Students' },
                { label: 'Latency', val: 'Real-time Sync' },
                { label: 'Platform', val: 'Flutter Cross-Platform' }
            ],
            description: `
                <p>A campus productivity mobile app built in Flutter that enables college students and faculty to track real-time staff availability across department offices and laboratories.</p>
                <br>
                <h4>Key Technical Highlights:</h4>
                <ul>
                    <li>Instant status indicators (Available, In Meeting, Out of Office).</li>
                    <li>Interactive campus map view for room locations.</li>
                    <li>Built with Flutter, Dart, and real-time event listeners.</li>
                </ul>
            `,
            tech: ['Flutter', 'Dart', 'Android Studio', 'REST API']
        }
    };

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projId = btn.getAttribute('data-project');
            const data = projectData[projId];

            if (data) {
                modalBody.innerHTML = `
                    <div style="margin-bottom: 1.5rem;">
                        <span style="color: var(--primary-cyan); font-weight: 700; font-size: 0.85rem;">${data.category}</span>
                        <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.3rem;">${data.title}</h2>
                    </div>

                    ${data.img ? `<img src="${data.img}" alt="${data.title}" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: 14px; margin-bottom: 1.5rem; border: 1px solid var(--border-color);">` : ''}

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        ${data.metrics.map(m => `
                            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 0.8rem; border-radius: 12px; text-align: center;">
                                <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary-cyan);">${m.val}</div>
                                <div style="font-size: 0.75rem; color: #64748b;">${m.label}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6;">
                        ${data.description}
                    </div>

                    <div style="margin-top: 1.5rem;">
                        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.6rem; color: #fff;">Technologies Used:</h4>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${data.tech.map(t => `<span style="background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); color: var(--primary-cyan); padding: 0.3rem 0.8rem; border-radius: 8px; font-size: 0.8rem;">${t}</span>`).join('')}
                        </div>
                    </div>
                `;

                projectModal.classList.remove('hidden');
                lucide.createIcons();
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.add('hidden');
        });
    }

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.add('hidden');
        }
    });

    /* --------------------------------------------------------------------------
       0. DARK / LIGHT THEME TOGGLE SWITCHER
       -------------------------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            if (themeIcon) {
                themeIcon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    /* --------------------------------------------------------------------------
       8. INTERACTIVE VOICE CONTROLLER & AI SPEECH SYNTHESIS ENGINE
       -------------------------------------------------------------------------- */
    const voiceIntroBtn = document.getElementById('voiceIntroBtn');
    const equalizerBars = document.getElementById('equalizerBars');
    const voicePlayIcon = document.getElementById('voicePlayIcon');
    const voiceTitleText = document.getElementById('voiceTitleText');
    const aiBotTrigger = document.getElementById('aiBotTrigger');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    let isSpeaking = false;
    const synth = window.speechSynthesis;
    let cachedMaleVoice = null;

    function selectSoftMaleVoice() {
        if (!synth) return null;
        const voices = synth.getVoices();
        if (!voices || voices.length === 0) return null;

        const femaleKeywords = ['zira', 'hazel', 'susan', 'catherine', 'eva', 'jenny', 'aria', 'female', 'woman', 'samantha', 'victoria', 'karen'];
        const maleKeywords = ['david', 'guy', 'mark', 'george', 'male', 'man', 'richard', 'james', 'google us english', 'natural'];

        let selected = voices.find(v => 
            v.lang.startsWith('en') && 
            maleKeywords.some(m => v.name.toLowerCase().includes(m)) &&
            !femaleKeywords.some(f => v.name.toLowerCase().includes(f))
        );

        if (!selected) {
            selected = voices.find(v => 
                v.lang.startsWith('en') && 
                !femaleKeywords.some(f => v.name.toLowerCase().includes(f))
            );
        }

        return selected || voices[0];
    }

    if (synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => { cachedMaleVoice = selectSoftMaleVoice(); };
    }

    function speakText(text, onEndCallback) {
        if (!synth) return;
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.88;
        utterance.pitch = 0.85;
        utterance.volume = 0.95;

        const maleVoice = cachedMaleVoice || selectSoftMaleVoice();
        if (maleVoice) utterance.voice = maleVoice;

        utterance.onstart = () => {
            isSpeaking = true;
            if (equalizerBars) equalizerBars.classList.add('active');
            if (voiceTitleText) voiceTitleText.textContent = "Speaking...";
        };

        utterance.onend = () => {
            isSpeaking = false;
            if (equalizerBars) equalizerBars.classList.remove('active');
            if (voiceTitleText) voiceTitleText.textContent = "Listen to Intro";
            if (onEndCallback) onEndCallback();
        };

        utterance.onerror = () => {
            isSpeaking = false;
            if (equalizerBars) equalizerBars.classList.remove('active');
            if (voiceTitleText) voiceTitleText.textContent = "Listen to Intro";
        };

        synth.speak(utterance);
    }

    // Hero Voice Intro Controller
    if (voiceIntroBtn) {
        const introSpeechText = "Hello, welcome to my portfolio! I am Rohith K, an Electrical and Electronics Engineer specializing in AI, Machine Learning, Deep Learning, Computer Vision, and Flutter app development. Feel free to explore my work or ask my AI assistant any question!";

        voiceIntroBtn.addEventListener('click', () => {
            if (isSpeaking) {
                synth.cancel();
                isSpeaking = false;
                if (equalizerBars) equalizerBars.classList.remove('active');
                if (voiceTitleText) voiceTitleText.textContent = "Listen to Intro";
            } else {
                speakText(introSpeechText);
            }
        });
    }

    if (aiBotTrigger) {
        aiBotTrigger.addEventListener('click', () => {
            aiChatWindow.classList.toggle('hidden');
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            aiChatWindow.classList.add('hidden');
            if (synth) synth.cancel();
        });
    }

    // Comprehensive Knowledgebase (Portfolio Specific + General AI Knowledge)
    const kb = [
        // Rohith's Specific Portfolio Knowledge
        {
            keywords: ['project', 'attendance', 'face', 'opencv', 'lbph'],
            answer: "Rohith built an AI-Based Smart Classroom Attendance System using OpenCV & LBPH face recognition with 2-of-3 frame verification, achieving 95%+ accuracy and reducing recording time by 90%."
        },
        {
            keywords: ['crop', 'disease', 'agriculture', 'tensorflow', 'keras', 'plant'],
            answer: "Rohith developed an ML Crop Disease Detection platform using TensorFlow/Keras image classification to detect 5+ crop diseases with over 90% accuracy, integrated with a Flutter mobile application."
        },
        {
            keywords: ['defect', 'quality', 'manufacturing', 'inspection'],
            answer: "Rohith created a Quality Control AI system for automated manufacturing defect detection using OpenCV, speeding up quality inspection by approximately 70%."
        },
        {
            keywords: ['ration', 'iot', 'arduino', 'distribution'],
            answer: "Rohith designed a Smart Ration Distribution Platform combining a Flutter mobile application with Arduino embedded firmware for real-time stock tracking and automated inventory management."
        },
        {
            keywords: ['staff', 'tracker', 'faculty', 'campus', 'availability'],
            answer: "Rohith created a Staff Availability Tracker App in Flutter enabling campus students to locate available faculty and department staff in real time."
        },
        {
            keywords: ['cgpa', 'college', 'education', 'marks', 'degree', 'study', 'university', 'mcet'],
            answer: "Rohith is pursuing a B.E. in Electrical and Electronics Engineering at Dr. Mahalingam College of Engineering and Technology, Coimbatore, maintaining a high CGPA of 8.013."
        },
        {
            keywords: ['skill', 'languages', 'tech stack', 'what do you know', 'programming'],
            answer: "Rohith's technical skills include Python, Machine Learning, Deep Learning, Computer Vision, OpenCV, TensorFlow, Keras, Flutter, Dart, Flask, SQLite, C, Java, and Git."
        },
        {
            keywords: ['contact', 'email', 'phone', 'hire', 'linkedin', 'github', 'reach'],
            answer: "You can reach Rohith directly via email at connectwithrohithofficial@gmail.com, call +91 9037193207, or connect on LinkedIn (rohith23112004) and GitHub (rohith072)."
        },
        {
            keywords: ['hackathon', 'vcet', 'achievement', 'certificate', 'award', 'drone'],
            answer: "Rohith participated in the IEEE VCET HackElite 24-Hour National Technical Hackathon, completed the Drone Lab Workshop, and holds a Microsoft Excel Certification."
        },
        {
            keywords: ['who are you', 'about rohith', 'tell me about rohith', 'intro'],
            answer: "Rohith K is a motivated AI/ML & Software Engineer from Coimbatore specializing in Computer Vision, Deep Learning, Python, and Flutter app development."
        },

        // General Knowledge & Tech QA Engine
        {
            keywords: ['machine learning', 'what is ml'],
            answer: "Machine Learning is a subset of AI where systems learn patterns from data to make predictions or decisions without being explicitly programmed."
        },
        {
            keywords: ['deep learning', 'what is dl', 'neural network'],
            answer: "Deep Learning is an advanced ML technique using multi-layered artificial neural networks (like CNNs and RNNs) to analyze complex data such as images, video, audio, and text."
        },
        {
            keywords: ['computer vision', 'opencv', 'image processing'],
            answer: "Computer Vision is a field of AI that enables computers to interpret and extract meaningful information from visual inputs like digital images and camera feeds. OpenCV is a popular library for this!"
        },
        {
            keywords: ['flutter', 'dart', 'mobile dev'],
            answer: "Flutter is Google's open-source UI toolkit for building beautiful, natively compiled cross-platform applications for mobile, web, and desktop from a single Dart codebase."
        },
        {
            keywords: ['python', 'what is python'],
            answer: "Python is a versatile, high-level programming language widely used in AI, Machine Learning, Data Science, Data Analytics, and Web Backend development."
        },
        {
            keywords: ['tensorflow', 'keras', 'pytorch'],
            answer: "TensorFlow and PyTorch are leading open-source deep learning frameworks used for building, training, and deploying neural network models."
        },
        {
            keywords: ['flask', 'rest api', 'backend'],
            answer: "Flask is a lightweight Python web framework used for building web servers and RESTful APIs to connect AI models to front-end mobile and web apps."
        },
        {
            keywords: ['hello', 'hi', 'hey', 'greetings'],
            answer: "Hello! I am Rohith's AI Assistant. How can I help you today? You can ask me about Rohith's background or any general engineering question!"
        },
        {
            keywords: ['how are you', 'how r u'],
            answer: "I am doing great! Ready to answer your questions about Rohith K or any tech topics you'd like to discuss."
        }
    ];

    function handleChatSubmit(text) {
        if (!text.trim()) return;

        // Append User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-msg user-msg';
        userDiv.textContent = text;
        chatMessages.appendChild(userDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const lower = text.toLowerCase();
        let match = kb.find(item => item.keywords.some(k => lower.includes(k)));

        let reply = "";
        if (match) {
            reply = match.answer;
        } else if (lower.includes('why') || lower.includes('how') || lower.includes('what') || lower.includes('explain')) {
            reply = `That is a great question! While I am tailored to answer questions about Rohith's AI/ML projects and skills, I can tell you that Rohith specializes in building intelligent systems to solve real-world problems. Feel free to ask about his Computer Vision, Flutter, or Deep Learning work!`;
        } else {
            reply = `Thanks for asking! Rohith is an AI/ML and Software Engineer skilled in Python, Deep Learning, OpenCV, and Flutter. Feel free to ask about his projects, CGPA, or technical background!`;
        }

        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-msg bot-msg';
            botDiv.textContent = reply;
            chatMessages.appendChild(botDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Speak response aloud in soft male voice!
            speakText(reply);
        }, 350);
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = chatInput.value;
            chatInput.value = '';
            handleChatSubmit(val);
        });
    }

    document.querySelectorAll('.prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.getAttribute('data-prompt');
            handleChatSubmit(promptText);
        });
    });

    /* --------------------------------------------------------------------------
       9. CONTACT FORM HANDLING - DIRECT 1-CLICK EMAIL DISPATCH
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Hi Rohith,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`);
            
            showToast(`Opening your email application to send directly to connectwithrohithofficial@gmail.com...`);

            setTimeout(() => {
                window.location.href = `mailto:connectwithrohithofficial@gmail.com?subject=${subject}&body=${body}`;
            }, 600);

            contactForm.reset();
        });
    }

    /* --------------------------------------------------------------------------
       10. INTERACTIVE SKILL RADAR CANVAS RENDERER
       -------------------------------------------------------------------------- */
    const radarCanvas = document.getElementById('skillRadarCanvas');
    if (radarCanvas) {
        const ctx = radarCanvas.getContext('2d');
        const labels = ['AI & ML', 'Computer Vision', 'Flutter & Mobile', 'Python Analytics', 'Embedded (EEE)', 'Flask & DB'];
        const values = [0.92, 0.90, 0.88, 0.92, 0.82, 0.85];
        const numAxes = labels.length;
        const centerX = radarCanvas.width / 2;
        const centerY = radarCanvas.height / 2;
        const radius = 120;

        function drawRadar() {
            ctx.clearRect(0, 0, radarCanvas.width, radarCanvas.height);

            // Draw concentric web rings
            for (let ring = 1; ring <= 4; ring++) {
                ctx.beginPath();
                const r = (radius / 4) * ring;
                for (let i = 0; i < numAxes; i++) {
                    const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                    const x = centerX + r * Math.cos(angle);
                    const y = centerY + r * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Draw axis lines and labels
            for (let i = 0; i < numAxes; i++) {
                const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
                ctx.stroke();

                // Draw Text Labels
                const labelX = centerX + (radius + 24) * Math.cos(angle);
                const labelY = centerY + (radius + 20) * Math.sin(angle);
                ctx.font = '11px Plus Jakarta Sans, sans-serif';
                ctx.fillStyle = '#cbd5e1';
                ctx.textAlign = 'center';
                ctx.fillText(labels[i], labelX, labelY);
            }

            // Draw Skill Polygon Area
            ctx.beginPath();
            for (let i = 0; i < numAxes; i++) {
                const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                const r = radius * values[i];
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 242, 254, 0.25)';
            ctx.fill();
            ctx.strokeStyle = '#00f2fe';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw Data Points
            for (let i = 0; i < numAxes; i++) {
                const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                const r = radius * values[i];
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ff5e62';
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
        drawRadar();
    }

    /* --------------------------------------------------------------------------
       11. RESUME PDF MODAL VIEWER HANDLER
       -------------------------------------------------------------------------- */
    const openResumeBtn = document.getElementById('openResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const resumeModalClose = document.getElementById('resumeModalClose');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('hidden');
        });
    }

    if (resumeModalClose && resumeModal) {
        resumeModalClose.addEventListener('click', () => {
            resumeModal.classList.add('hidden');
        });
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.add('hidden');
            }
        });
    }

});
