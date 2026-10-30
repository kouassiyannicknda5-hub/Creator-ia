class SphereRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.t0 = performance.now();
        this.raf = null;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    }

    setState(ai) {
        const px = 280; // Taille fixe pour l'accueil
        this.canvas.width = px * this.dpr;
        this.canvas.height = px * this.dpr;
        this.canvas.style.width = px + 'px';
        this.canvas.style.height = px + 'px';
        this.ai = ai;
    }

    start() {
        if (this.raf) return;
        const loop = () => {
            this.draw();
            this.raf = requestAnimationFrame(loop);
        };
        this.raf = requestAnimationFrame(loop);
    }

    stop() {
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = null;
    }

    draw() {
        if (!this.ai) return;
        const ctx = this.ctx;
        const w = this.canvas.width, h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);
        
        const cx = w / 2, cy = h / 2;
        const base = Math.min(w, h) * 0.38;
        const color = "#d4af37"; // Couleur or
        const t = (performance.now() - this.t0) / 1000;

        // Halo
        const grad = ctx.createRadialGradient(cx, cy, base * 0.2, cx, cy, base * 1.8);
        grad.addColorStop(0, "rgba(212, 175, 55, 0.6)");
        grad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Anneau
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.6);
        ctx.strokeStyle = color;
        ctx.lineWidth = base * 0.05;
        ctx.shadowColor = color;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(0, 0, base, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}
