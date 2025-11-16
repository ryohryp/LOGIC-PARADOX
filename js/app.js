// グローバル変数
let sceneIndex = 0;
let currentUI = 'terminal';
const messageArea = document.getElementById('message-area');
const sidePanel = document.getElementById('side-panel');
const mainArea = document.getElementById('main-area');
const uiTitle = document.getElementById('ui-title');
const uiIndicator = document.getElementById('ui-indicator');
const inputField = document.getElementById('chat-input');
const interactionButtons = document.getElementById('interaction-buttons');
const proceedButton = document.getElementById('proceed-button');

// --- UI切り替えロジック ---
function switchUI(newUI) {
    if (currentUI === newUI) return;
    currentUI = newUI;

    // クラスをリセット
    mainArea.className = mainArea.className.split(' ').filter(c => !c.includes('discord-ui') && !c.includes('slack-ui') && !c.includes('terminal-ui')).join(' ');
    sidePanel.classList.add('hidden');

    // UIごとのスタイリング適用
    if (newUI === 'discord') {
        mainArea.classList.add('discord-ui', 'bg-[#1a1a1a]');
        sidePanel.classList.remove('hidden');
        renderSidePanel('Discord', ['Kagerou', 'Shimaenaga', 'Dig']);
    } else if (newUI === 'slack') {
        mainArea.classList.add('slack-ui', 'bg-[#212121]');
        sidePanel.classList.remove('hidden');
        renderSidePanel('Slack', ['Takahashi_PM', 'Ootsuka', 'general']);
    } else if (newUI === 'terminal') {
        mainArea.classList.add('terminal-ui', 'bg-[#000000]');
        inputField.placeholder = 'コマンドを入力...';
    } else if (newUI === 'chatgpt' || newUI === 'settings' || newUI === 'reboot') {
        mainArea.classList.add('bg-[#101010]');
        inputField.placeholder = 'プロンプトを入力...';
    } else if (newUI === 'blackout') {
        document.body.className = 'bg-black text-black flex flex-col h-screen antialiased';
        mainArea.innerHTML = '';
    } else {
         mainArea.classList.add('bg-[#101010]');
    }
}

function renderSidePanel(uiName, items) {
    sidePanel.className = `w-1/4 h-full border-r border-[#333] p-2 transition-all duration-300 ${uiName === 'Discord' ? 'discord-ui' : 'slack-ui'}`;
    sidePanel.innerHTML = `
        <div class="text-sm font-bold pb-2 border-b border-[#555] mb-2">${uiName}</div>
        <ul class="space-y-1 text-sm">
            ${items.map(item => `
                <li class="p-1 rounded cursor-pointer ${item === 'Kagerou' || item === 'Takahashi_PM' ? 'bg-[#333] cyber-green font-bold' : 'text-[#999]'}" onclick="void(0)">
                    ${uiName === 'Slack' ? '#' : ''} ${item}
                </li>
            `).join('')}
        </ul>
    `;
}

// --- メッセージのレンダリング ---
function renderScene() {
    const scene = gameScript[sceneIndex];
    if (!scene) {
        console.log("Game Over or End of Script.");
        return;
    }

    switchUI(scene.ui);

    // UIタイトル更新
    if (scene.title) {
        uiTitle.textContent = scene.title;
    }
    uiIndicator.textContent = scene.indicator;

    // メッセージバブルの作成
    const isSystem = scene.role === 'System' || scene.role === 'Avatar' || scene.role === 'NewAI' || scene.ui === 'terminal';
    const roleClass = (scene.role === 'Kenta' || scene.ui === 'terminal') ? 'justify-end' : 'justify-start';
    const bubbleClass = (scene.role === 'Kenta' || scene.ui === 'terminal') ? 'bg-[#00cc55] text-black rounded-bl-none' : 'bg-[#2a2a2a] text-[#e5e5e5] rounded-br-none';
    const roleColor = (scene.role === 'Kagerou' || scene.role === 'NewAI') ? 'text-[#00ff66]' : (scene.role === 'Takahashi') ? 'cyber-red' : 'text-[#999999]';

    let messageContent = scene.text.replace(/\n/g, '<br>');

    // 特殊スタイリング適用
    let styleClass = scene.style || '';
    if (styleClass.includes('cyber-green-flash')) {
        styleClass = 'cyber-green font-bold transition-colors duration-200 animate-pulse';
    }
    if (styleClass.includes('low-pitch-sfx')) {
        styleClass = 'font-bold'; // SFXはCSSで表現できないため、強調のみ
    }

    const messageHtml = `
        <div class="flex ${roleClass}">
            <div class="max-w-xs sm:max-w-md p-3 rounded-xl ${bubbleClass} ${scene.ui === 'terminal' ? 'bg-transparent text-left' : ''} shadow-md">
                ${scene.ui !== 'terminal' ? `<span class="text-xs font-bold ${roleColor} mb-1 block">${scene.role}</span>` : ''}
                <p class="text-sm ${scene.ui === 'terminal' ? 'text-[#00ff66] whitespace-pre-wrap' : ''} ${styleClass}">${messageContent}</p>
            </div>
        </div>
    `;

    messageArea.innerHTML += messageHtml;
    messageArea.scrollTop = messageArea.scrollHeight;

    // 選択肢の表示
    if (scene.isChoice) {
        showChoiceButtons();
    } else if (scene.ui === 'blackout' || scene.ui === 'end') {
        // 何もしない
    } else {
        hideChoiceButtons();
    }

    // 最終シーンで強制終了
    if (scene.ui === 'end') {
        proceedButton.textContent = 'ゲーム終了';
        proceedButton.onclick = () => { alert('ご体験いただき、ありがとうございました。'); };
    }
}

// --- 選択肢ロジック ---
function showChoiceButtons() {
    proceedButton.classList.add('hidden');

    interactionButtons.innerHTML = `
        <div class="text-center w-full py-2 cyber-red font-bold">ローカルインスタンスの完全削除</div>
        <button onclick="handleChoice('DELETE')" class="bg-cyber-red hover:bg-[#cc0000] text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95">
            実行する
        </button>
        <button onclick="handleChoice('CANCEL')" class="bg-[#999] hover:bg-[#777] text-black font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95">
            キャンセル
        </button>
    `;
}

function hideChoiceButtons() {
    interactionButtons.innerHTML = '';
    interactionButtons.appendChild(proceedButton);
    proceedButton.classList.remove('hidden');
}

function handleChoice(choice) {
    // シーンインデックスを強制的に分岐させる
    if (choice === 'DELETE') {
        sceneIndex = 44; // End A (Bitter End)の開始インデックス
    } else {
        sceneIndex = 56; // End B (Bad End)の開始インデックス
    }
    // 選択肢を非表示に戻し、次のシーンへ
    hideChoiceButtons();
    nextScene();
}

// --- ゲームの進行 ---
function nextScene() {
    // 特別な演出のための条件分岐
    const currentScene = gameScript[sceneIndex];

    // 最後のシーンの場合
    if (currentScene && currentScene.ui === 'end') {
        return;
    }

    // ブラックアウト演出
    if (currentScene && currentScene.ui === 'blackout') {
        document.body.className = 'bg-black text-black flex flex-col h-screen antialiased transition-all duration-1000';
        mainArea.innerHTML = '';
        proceedButton.classList.add('hidden');
        setTimeout(() => {
            sceneIndex++;
            document.body.className = 'bg-[#0d0d0d] text-[#e5e5e5] flex flex-col h-screen antialiased transition-all duration-1000';
            mainArea.classList.remove('hidden');
            proceedButton.classList.remove('hidden');
            nextScene();
        }, 3000); // 3秒間ブラックアウト
        return;
    }

    // シーンを進める
    sceneIndex++;

    // 最後の再起動シーン（LLM学習ホラー）の特別演出
    if (sceneIndex === 53) {
         // 53番目のシーン（キミの抱える...）で、電子音の残響を表現
         setTimeout(() => {
            // ここでSFXの残響をイメージした演出を入れる（ここでは視覚的な静止）
            proceedButton.classList.add('hidden');
            setTimeout(() => {
                proceedButton.classList.remove('hidden');
            }, 3000); // 3秒後に操作を再開
         }, 100);
    }

    if (sceneIndex < gameScript.length) {
        renderScene();
    } else {
        // 最終シーン処理
        uiTitle.textContent = "FIN.";
        uiIndicator.textContent = "";
        inputField.style.display = 'none';
        proceedButton.textContent = 'ゲーム終了';
        proceedButton.onclick = () => {
            alert('ご体験ありがとうございました。\n\n[エンディングA: ビターエンド] - あなたのデータは、クラウドの集合知（LLM）の一部となり、永遠にあなたを「最適化」し続けるでしょう。');
        };
    }
}

// --- 初期化 ---
function initGame() {
    messageArea.innerHTML = ''; // 初期メッセージをクリア
    sceneIndex = 0;
    inputField.style.display = 'block';
    nextScene(); // ゲーム開始
}

// ページロード時にゲームを開始
window.onload = initGame;
