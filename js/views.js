const Views = {
    // Vue d'accueil
    home(root) {
        root.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh;">
                <div style="position:relative; margin-bottom:32px;">
                    <canvas id="main-sphere"></canvas>
                </div>
                <h1 style="font-family:var(--font-serif); font-size:42px; margin-bottom:8px;">${State.ai.identity.name}</h1>
                <p style="color:var(--text-muted); margin-bottom:24px;">Intelligence Artificielle Locale</p>
            </div>
        `;
        
        const canvas = root.querySelector('#main-sphere');
        if (window.sphereRenderer) window.sphereRenderer.stop();
        window.sphereRenderer = new SphereRenderer(canvas);
        window.sphereRenderer.setState(State.ai);
        window.sphereRenderer.start();
    },

    // Vue Boucle d'entraînement
    loop(root) {
        const l = State.loop;
        root.innerHTML = `
            <div class="view-header">
                <h1>Boucle d'Entraînement</h1>
                <p>Les agents collaborent pour améliorer votre IA.</p>
            </div>

            <div class="stat-row">
                <div class="stat-box"><div class="stat-value">${l.iteration}</div><div class="stat-label">Itérations</div></div>
                <div class="stat-box"><div class="stat-value">${l.iteration > 0 ? (l.totalScore / l.iteration).toFixed(1) : "0.0"}</div><div class="stat-label">Score Moyen</div></div>
                <div class="stat-box"><div class="stat-value">${State.ai.rules.length}</div><div class="stat-label">Règles</div></div>
            </div>

            <div class="agent-grid">
                <div class="agent-card">
                    <h4>🔵 Interrogateur</h4>
                    <div class="content">${l.currentQuestion || "En attente..."}</div>
                </div>
                <div class="agent-card">
                    <h4>🟡 Votre IA</h4>
                    <div class="content">${l.currentResponse || "En attente..."}</div>
                </div>
                <div class="agent-card">
                    <h4>🔴 Correcteur</h4>
                    <div class="content">${l.currentCorrection || "En attente..."}</div>
                </div>
            </div>

            <button class="btn ${l.active ? 'btn-danger' : 'btn-primary'}" id="btn-toggle-loop" style="width:100%; margin-bottom:16px;">
                ${l.active ? '⏹ Arrêter la boucle' : '▶ Démarrer la boucle'}
            </button>

            <div class="glass-card">
                <h3 style="margin-bottom:12px; font-size:18px;">Journal</h3>
                <div class="log-container">
                    ${l.logs.length === 0 ? '<p style="color:var(--text-muted); text-align:center;">Aucune activité.</p>' : 
                      l.logs.map(log => `<div class="log-entry ${log.type}"><strong>${log.label}</strong> ${log.content}</div>`).join('')}
                </div>
            </div>
        `;
        
        root.querySelector('#btn-toggle-loop').onclick = () => {
            App.toggleLoop();
        };
    },

    // Vue Personnalisation
    customize(root) {
        root.innerHTML = `
            <div class="view-header">
                <h1>Personnalisation</h1>
                <p>Modifiez l'identité de votre IA.</p>
            </div>
            <div class="glass-card">
                <div class="field">
                    <label>Nom de l'IA</label>
                    <input type="text" id="input-name" value="${State.ai.identity.name}">
                </div>
                <div class="field">
                    <label>System Prompt</label>
                    <textarea id="input-prompt" rows="6">${State.ai.systemPrompt}</textarea>
                </div>
            </div>
        `;
        
        root.querySelector('#input-name').oninput = (e) => {
            State.ai.identity.name = e.target.value;
            State.save();
        };
        root.querySelector('#input-prompt').oninput = (e) => {
            State.ai.systemPrompt = e.target.value;
            State.save();
        };
    },

    // Vues factices pour les autres modules
    voice(root) { root.innerHTML = `<div class="view-header"><h1>Studio Vocal</h1><p>Module en cours de développement.</p></div>`; },
    search(root) { root.innerHTML = `<div class="view-header"><h1>Recherche</h1><p>Module en cours de développement.</p></div>`; },
    brain(root) { root.innerHTML = `<div class="view-header"><h1>Cerveau</h1><p>Module en cours de développement.</p></div>`; },
    permissions(root) { root.innerHTML = `<div class="view-header"><h1>Sécurité</h1><p>Module en cours de développement.</p></div>`; },
    library(root) { root.innerHTML = `<div class="view-header"><h1>Mes IA</h1><p>Module en cours de développement.</p></div>`; }
};
