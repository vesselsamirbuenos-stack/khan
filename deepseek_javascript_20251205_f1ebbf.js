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
            50% { text-shadow: 0 0 5px var(--eclipse-accent), 0 0 10px var(--eclipse-accent), 0 0 15px var(--eclipse-accent); }
        }
        
        .eclipse-splash {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #050510 0%, #0a0a1a 25%, #151525 50%, #0a0a1a 75%, #050510 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            color: white;
            font-family: 'Inter', sans-serif;
            transition: opacity 0.5s;
            overflow: hidden;
        }
        
        .eclipse-splash::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 30%, rgba(26, 115, 232, 0.15) 0%, transparent 30%),
                radial-gradient(circle at 80% 70%, rgba(52, 168, 83, 0.1) 0%, transparent 30%),
                radial-gradient(circle at 40% 80%, rgba(0, 200, 83, 0.05) 0%, transparent 30%);
            z-index: 0;
            animation: hueRotate 20s linear infinite;
        }
        
        .eclipse-splash::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(90deg, transparent 24px, transparent 25px),
                linear-gradient(180deg, transparent 24px, transparent 25px);
            background-size: 25px 25px;
            background-position: 0 0;
            opacity: 0.1;
            z-index: 1;
        }
        
        .matrix-rain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .matrix-column {
            position: absolute;
            top: -100%;
            width: 20px;
            font-family: 'Courier New', monospace;
            font-size: 18px;
            color: var(--eclipse-primary);
            text-shadow: 0 0 8px currentColor;
            animation: matrixRain 3s linear infinite;
            animation-delay: calc(var(--delay) * 1s);
            opacity: var(--opacity);
        }
        
        .eclipse-splash-content {
            position: relative;
            z-index: 2;
            text-align: center;
            animation: fadeIn 1s ease-out;
        }
        
        .eclipse-splash-title {
            font-size: 52px;
            font-weight: 800;
            margin-bottom: 16px;
            background: linear-gradient(45deg, var(--eclipse-primary), var(--eclipse-accent), #34a853);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            animation: textGlow 3s ease-in-out infinite;
            letter-spacing: 2px;
            text-transform: uppercase;
            position: relative;
        }
        
        .eclipse-splash-title::after {
            content: "KHAN VESSEL";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--eclipse-primary), var(--eclipse-accent), #34a853);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            animation: glitch 0.5s infinite;
            opacity: 0.7;
        }
        
        .eclipse-splash-subtitle {
            font-size: 20px;
            color: var(--eclipse-text-muted);
            margin-bottom: 40px;
            font-weight: 400;
            letter-spacing: 1px;
        }
        
        .eclipse-splash-loader {
            width: 80px;
            height: 80px;
            position: relative;
            margin: 0 auto 30px;
        }
        
        .eclipse-splash-loader-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top-color: var(--eclipse-primary);
            border-radius: 50%;
            animation: orbit 2s linear infinite;
            box-shadow: 0 0 15px var(--eclipse-primary);
        }
        
        .eclipse-splash-loader-ring:nth-child(2) {
            border-top-color: var(--eclipse-accent);
            animation-duration: 3s;
            transform: rotate(60deg);
            box-shadow: 0 0 15px var(--eclipse-accent);
        }
        
        .eclipse-splash-loader-ring:nth-child(3) {
            border-top-color: var(--eclipse-success);
            animation-duration: 4s;
            transform: rotate(120deg);
            box-shadow: 0 0 15px var(--eclipse-success);
        }
        
        .eclipse-splash-loader-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, var(--eclipse-primary), var(--eclipse-accent));
            border-radius: 50%;
            box-shadow: 0 0 20px var(--eclipse-primary);
            animation: pulse 2s infinite;
        }
        
        .eclipse-splash-status {
            margin-top: 30px;
            font-size: 16px;
            color: var(--eclipse-text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .eclipse-splash-status-dot {
            width: 10px;
            height: 10px;
            background: var(--eclipse-primary);
            border-radius: 50%;
            animation: pulse 1.5s infinite;
            box-shadow: 0 0 10px var(--eclipse-primary);
        }
        
        .eclipse-splash-credits {
            position: absolute;
            bottom: 30px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: var(--eclipse-text-muted);
            z-index: 2;
        }
        
        .eclipse-splash-credits strong {
            color: var(--eclipse-accent);
            font-weight: 600;
        }
        
        .eclipse-splash.fadeout {
            animation: fadeOut 0.5s forwards;
        }
        
        @keyframes fadeOut {
            to { opacity: 0; pointer-events: none; }
        }
        
        /* Resto do CSS atualizado para tema azul/preto */
        .eclipse-toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            max-width: 320px;
            width: calc(100vw - 48px);
            background: var(--eclipse-surface);
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif;
            z-index: 999999;
            transition: all 0.3s ease;
            opacity: 1;
            transform: translateY(0);
            border-left: 3px solid var(--eclipse-primary);
        }
        
        .eclipse-toast-success {
            border-left-color: var(--eclipse-success);
        }
        
        .eclipse-toast-error {
            border-left-color: var(--eclipse-error);
        }
        
        .eclipse-toast-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .eclipse-toast-message {
            font-size: 14px;
            color: var(--eclipse-text);
            flex: 1;
        }
        
        .eclipse-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, var(--eclipse-primary), var(--eclipse-primary-light));
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 100000;
            color: white;
            font-size: 28px;
            box-shadow: 0 6px 16px rgba(26, 115, 232, 0.35);
            font-family: 'Inter', sans-serif;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 99999;
            overflow: hidden;
            transform: scale(1);
        }
        
        .eclipse-toggle:hover {
            transform: scale(1.08) translateY(-3px);
            box-shadow: 0 10px 24px rgba(26, 115, 232, 0.45);
        }
        
        .eclipse-toggle:active {
            transform: scale(1) translateY(0);
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
        }
        
        .eclipse-toggle.bounce {
            animation: bounce 0.5s;
        }
        
        .eclipse-toggle.float {
            animation: float 3s ease-in-out infinite;
        }
        
        .eclipse-panel {
            position: fixed;
            top: 120px;
            right: 40px;
            width: 360px;
            max-height: 75vh;
            background: var(--eclipse-bg);
            border-radius: 16px;
            border: 1px solid var(--eclipse-border);
            z-index: 99999;
            color: var(--eclipse-text);
            font-family: 'Inter', sans-serif;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            display: none;
            overflow: hidden;
            transform: translateY(10px);
            opacity: 0;
            transition: all 0.3s ease;
            cursor: default;
        }
        
        .eclipse-panel.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .eclipse-header {
            padding: 20px 24px 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        }
        
        .eclipse-title {
            font-weight: 700;
            font-size: 20px;
            background: linear-gradient(to right, white, var(--eclipse-primary-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .eclipse-title-icon {
            font-size: 22px;
        }
        
        .eclipse-version {
            font-size: 13px;
            color: var(--eclipse-text-muted);
            background: rgba(26, 115, 232, 0.1);
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: 500;
            border: 1px solid rgba(26, 115, 232, 0.3);
        }
        
        .eclipse-tabs {
            display: flex;
            border-bottom: 1px solid var(--eclipse-border);
            padding: 0 24px;
            background: rgba(15, 15, 25, 0.5);
        }
        
        .eclipse-tab {
            padding: 14px 0;
            margin-right: 24px;
            cursor: pointer;
            color: var(--eclipse-text-muted);
            font-weight: 500;
            font-size: 14px;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .eclipse-tab:hover {
            color: var(--eclipse-text);
        }
        
        .eclipse-tab.active {
            color: var(--eclipse-primary);
        }
        
        .eclipse-tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, var(--eclipse-primary), var(--eclipse-accent));
            border-radius: 2px 2px 0 0;
        }
        
        .eclipse-tab-content {
            padding: 24px;
            display: none;
            flex-direction: column;
            gap: 12px;
            max-height: calc(75vh - 130px);
            overflow-y: auto;
        }
        
        .eclipse-tab-content.active {
            display: flex;
        }
        
        .eclipse-button {
            background: var(--eclipse-surface);
            border: 1px solid var(--eclipse-border);
            border-radius: 12px;
            padding: 14px 16px;
            color: var(--eclipse-text);
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            text-align: left;
            position: relative;
            overflow: hidden;
        }
        
        .eclipse-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(26, 115, 232, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .eclipse-button:hover {
            border-color: var(--eclipse-primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.15);
        }
        
        .eclipse-button:hover::before {
            left: 100%;
        }
        
        .eclipse-button.active {
            background: rgba(26, 115, 232, 0.1);
            border-color: var(--eclipse-primary);
            color: var(--eclipse-primary);
        }
        
        .eclipse-icon {
            font-size: 18px;
            width: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .eclipse-input-group {
            background: var(--eclipse-surface);
            border: 1px solid var(--eclipse-border);
            border-radius: 12px;
            padding: 16px;
            margin-top: 8px;
        }
        
        .eclipse-input-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            color: var(--eclipse-text);
            font-weight: 500;
        }
        
        .eclipse-speed-value {
            color: var(--eclipse-primary);
            font-weight: 600;
            background: rgba(26, 115, 232, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid rgba(26, 115, 232, 0.3);
        }
        
        .eclipse-range-container {
            position: relative;
            padding: 4px 0 24px 0;
        }
        
        .eclipse-range {
            width: 100%;
            height: 4px;
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            position: relative;
            z-index: 2;
        }
        
        .eclipse-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--eclipse-primary);
            cursor: pointer;
            border: 3px solid var(--eclipse-bg);
            box-shadow: 0 0 0 2px var(--eclipse-primary);
            transition: all 0.2s ease;
        }
        
        .eclipse-range::-moz-range-thumb {
            width: 20px;
            height: 20px;
        a
