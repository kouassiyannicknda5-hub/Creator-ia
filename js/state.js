const State = {
    ai: {
        identity: { name: "NOVA", id: "nova-001" },
        systemPrompt: "Tu es NOVA, une assistante utile et précise.",
        rules: ["Réponds toujours en français.", "Sois concis."]
    },
    loop: {
        active: false,
        iteration: 0,
        score: 0,
        totalScore: 0,
        logs: [],
        currentQuestion: "",
        currentResponse: "",
        currentCorrection: ""
    },
    
    // Sauvegarde dans le navigateur
    save() {
        localStorage.setItem('tchallah_state', JSON.stringify({
            ai: this.ai,
            loop: { iteration: this.loop.iteration, totalScore: this.loop.totalScore, logs: this.loop.logs }
        }));
    },
    
    // Chargement au démarrage
    load() {
        const saved = localStorage.getItem('tchallah_state');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.ai) this.ai = data.ai;
                if (data.loop) {
                    this.loop.iteration = data.loop.iteration || 0;
                    this.loop.totalScore = data.loop.totalScore || 0;
                    this.loop.logs = data.loop.logs || [];
                }
            } catch (e) { console.error("Erreur de chargement", e); }
        }
    }
};
