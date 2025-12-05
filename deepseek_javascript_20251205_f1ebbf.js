(function() {
    if (document.getElementById("eclipse-panel")) return;
    
    const features = {
        autoAnswer: false,
        revealAnswers: false,
        questionSpoof: false,
        videoSpoof: false,
        darkMode: true,
        rgbLogo: false
    };

    const config = {
        autoAnswerDelay: 1.5
    };

    function showToast(message, type = "info", duration = 3000) {
        const toast = document.createElement("div");
        toast.className = `eclipse-toast eclipse-toast-${type}`;
        toast.innerHTML = `
            <div class="eclipse-toast-icon">${type === "success" ? "✓" : type === "error" ? "✗" : "•"}</div>
            <div class="eclipse-toast-message">${message}</div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        :root {
            --eclipse-bg: #0a0a12;
            --eclipse-surface: #151522;
            --eclipse-border: #2a2a3a;
            --eclipse-primary: #1a73e8;
            --eclipse-primary-light: #4285f4;
            --eclipse-accent: #34a853;
            --eclipse-accent-light: #57d685;
            --eclipse-text: #ffffff;
            --eclipse-text-muted: #b8c1d6;
            --eclipse-success: #00c853;
            --eclipse-error: #ea4335;
            --eclipse-warning: #fbbc05;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4); }
            70% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(26, 115, 232, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(26, 115, 232, 0); }
        }
        
        @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }
            0% { transform: translateY(0) scale(1); }
            20% { transform: translateY(-15px) scale(1.05); }
            53% { transform: translateY(-7px) scale(1.02); }
            80% { transform: translateY(0) scale(1.01); }
            100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
        }
        
        @keyframes matrixRain {
            0% { transform: translateY(-100%); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        @keyframes hueRotate {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px var(--eclipse-primary), 0 0 20px var(--eclipse-primary), 0 0 30px var(--eclipse-primary); }