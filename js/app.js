const App = {
    init() {
        State.load();
        this.bindUI();
        this.navigate('home');
    },

    bindUI() {
        // Menu
        const menuBtn = document.getElementById('btn-menu');
        const menu = document.getElementById('app-menu');
        
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            menu.classList.toggle('open');
            menuBtn.classList.toggle('active');
        };
        
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== menuBtn) {
                menu.classList.remove('open');
                menuBtn.classList.remove('active');
            }
        });

        // Liens du menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                this.navigate(item.dataset.view);
            };
        });

        // Bouton export (simulation)
        document.getElementById('btn-export').onclick = () => {
            this.toast("Export du fichier en cours de développement...");
        };
    },

    navigate(viewName) {
        const root = document.getElementById('view-root');
        root.innerHTML = '';
        
        if (window.sphereRenderer) window.sphereRenderer.stop();
        
        if (Views[viewName]) {
            Views[viewName](root);
        } else {
            root.innerHTML = `<div class="glass-card"><h1>Vue introuvable</h1></div>`;
        }
        
        document.getElementById('app-menu').classList.remove('open');
        document.getElementById('btn-menu').classList.remove('active');
    },

    // --- LOGIQUE DE LA BOUCLE SELF-PLAY ---
    toggleLoop() {
        if (State.loop.active) {
            this.stopLoop();
        } else {
            this.startLoop();
        }
    },

    startLoop() {
        State.loop.active = true;
        State.loop.iteration = 0;
        State.loop.totalScore = 0;
        this.addLog('interrogate', '▶ DÉMARRAGE', 'Lancement de la boucle.');
        this.navigate('loop');
        
        this.loopInterval = setInterval(() => this.runIteration(), 2500);
    },

    stopLoop() {
        State.loop.active = false;
        clearInterval(this.loopInterval);
        this.addLog('adjust', '⏹ ARRÊT', 'Boucle terminée.');
        this.navigate('loop');
        State.save();
    },

    runIteration() {
        State.loop.iteration++;
        
        // 1. Question
        const questions = [
            "Explique la photosynthèse.", "Quelle est la capitale de l'Australie ?",
            "Résous 15 + 27.", "Traduis 'Bonjour' en anglais.",
            "Qu'est-ce qu'un algorithme ?"
        ];
        const q = questions[Math.floor(Math.random() * questions.length)];
        State.loop.currentQuestion = q;
        this.addLog('interrogate', '🔵 Question', q);
        
        // 2. Réponse simulée
        setTimeout(() => {
            const r = "Ceci est une réponse simulée par l'IA locale.";
            State.loop.currentResponse = r;
            this.addLog('response', '🟡 Réponse', r);
            
            // 3. Correction simulée
            setTimeout(() => {
                const score = Math.floor(Math.random() * 4) + 7; // Score entre 7 et 10
                State.loop.totalScore += score;
                State.loop.currentCorrection = `Score: ${score}/10. Bonne réponse.`;
                this.addLog('correct', '🔴 Correction', State.loop.currentCorrection);
                
                // 4. Ajout d'une règle (simulation)
                setTimeout(() => {
                    if (Math.random() > 0.5) {
                        const newRule = "Règle d'auto-ajustement " + State.loop.iteration;
                        if (!State.ai.rules.includes(newRule)) {
                            State.ai.rules.push(newRule);
                            this.addLog('adjust', '🟢 Ajustement', newRule);
                        }
                    }
                    this.navigate('loop');
                }, 400);
            }, 400);
        }, 400);
    },

    addLog(type, label, content) {
        State.loop.logs.unshift({ type, label, content });
        if (State.loop.logs.length > 20) State.loop.logs.pop();
    },

    toast(msg) {
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = msg;
        document.getElementById('toasts').appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
};

// Démarrage
document.addEventListener('DOMContentLoaded', () => App.init());
