// グローバル変数
let sceneIndex = 0;
let currentUI = 'terminal';
let trustScore = 50; // 信頼度初期値
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

    // フェードアウト
    mainArea.style.opacity = '0';
    sidePanel.style.opacity = '0';

    setTimeout(() => {
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

        // フェードイン
        setTimeout(() => {
            mainArea.style.opacity = '1';
            sidePanel.style.opacity = '1';
        }, 50);

    }, 300); // フェードアウト時間
}

function renderSidePanel(uiName, items) {
    sidePanel.className = `w-1/4 h-full border-r border-[#333] p-2 transition-all duration-300 ${uiName === 'Discord' ? 'discord-ui' : 'slack-ui'}`;
    sidePanel.innerHTML = `
        <div class="text-sm font-bold pb-2 border-b border-[#555] mb-2">${uiName}</div>
        <ul class="space-y-1 text-sm">
            ${items.map(item => `
                <li class="p-1 rounded cursor-pointer hover:bg-[#333] transition-colors ${item === 'Kagerou' || item === 'Takahashi_PM' ? 'bg-[#333] cyber-green font-bold' : 'text-[#999]'}" onclick="handleSidePanelClick('${item}')">
                    ${uiName === 'Slack' ? '#' : ''} ${item}
                </li>
            `).join('')}
        </ul>
    `;
}

function handleSidePanelClick(item) {
    // 隠し要素：特定のアイテムクリックでログを表示
    if (item === 'general' || item === 'Dig') {
        const logId = `log-${Date.now()}`;
        const hiddenLog = `
            <div id="${logId}" class="flex justify-start">
                <div class="max-w-xs p-2 rounded-lg bg-[#330000] text-[#ff9999] text-xs shadow-md border border-red-900">
                    <span class="font-bold block mb-1">SYSTEM_LOG:</span>
                    <p>User [${item}] activity check: <span class="glitch-text">SUSPICIOUS</span></p>
                    <p class="text-[10px] text-gray-500 mt-1">Timestamp: ERROR</p>
                </div>
            </div>
        `;
        messageArea.innerHTML += hiddenLog;
        messageArea.scrollTop = messageArea.scrollHeight;

        // 3秒後に消える演出
        setTimeout(() => {
            const el = document.getElementById(logId);
            if (el) {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 500);
            }
        }, 3000);
    }
}


// --- メッセージのレンダリング ---
// --- メッセージのレンダリング ---
let isTyping = false;
let typeInterval;

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

    let messageContent = scene.text;

    // エンディングBの分岐テキスト（動的に検索）
    const endingBIndex = gameScript.findIndex(s => s.title === 'エンディングB：共犯者');
    if (sceneIndex === endingBIndex && endingBIndex !== -1) {
        if (trustScore < 50) {
            messageContent = '…非効率な判断だ。だが、管理対象としての価値はある。徹底的に矯正してやる。';
        } else {
            messageContent = '賢明な判断だ。僕たちが親友なのは変わらない。これからもずっと、僕がキミを最適化する。';
        }
    }

    messageContent = messageContent.replace(/\n/g, '<br>');

    // 特殊スタイリング適用
    let styleClass = scene.style || '';
    if (styleClass.includes('cyber-green-flash')) {
        styleClass = 'cyber-green font-bold transition-colors duration-200 animate-pulse';
    }
    if (styleClass.includes('low-pitch-sfx')) {
        styleClass = 'font-bold'; // SFXはCSSで表現できないため、強調のみ
    }

    // 画面揺れ演出（特定のキーワードや条件で発動）
    if (scene.style && scene.style.includes('shake')) {
        triggerShake();
    }

    const messageId = `msg-${Date.now()}`;

    // innerHTML += ではなく appendChild を使用して既存の要素（イベントリスナー等）を保護
    const msgContainer = document.createElement('div');
    msgContainer.className = `flex ${roleClass}`;
    msgContainer.innerHTML = `
        <div class="max-w-xs sm:max-w-md p-3 rounded-xl ${bubbleClass} ${scene.ui === 'terminal' ? 'bg-transparent text-left' : ''} shadow-md">
            ${scene.ui !== 'terminal' ? `<span class="text-xs font-bold ${roleColor} mb-1 block">${scene.role}</span>` : ''}
            <p id="${messageId}" class="text-sm ${scene.ui === 'terminal' ? 'text-[#00ff66] whitespace-pre-wrap' : ''} ${styleClass}"></p>
        </div>
    `;
    messageArea.appendChild(msgContainer);
    messageArea.scrollTop = messageArea.scrollHeight;

    // タイピングアニメーション開始
    typeMessage(messageId, messageContent, () => {
        // 完了後の処理
        if (scene.isChoice || scene.uiEffect === 'button_evasion') {
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
    });
}

function typeMessage(elementId, content, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // HTMLタグを保持しつつタイピングするための簡易パーサー
    // 注: 複雑なネストには対応していないが、<br>や<span>程度なら動作する
    let i = 0;
    isTyping = true;
    proceedButton.classList.add('hidden'); // タイピング中は進むボタンを隠す

    // クリックでスキップするためのイベントリスナー
    const skipHandler = () => {
        if (isTyping) {
            clearInterval(typeInterval);
            element.innerHTML = content;
            isTyping = false;
            proceedButton.classList.remove('hidden');
            document.body.removeEventListener('click', skipHandler);
            if (callback) callback();
        }
    };
    document.body.addEventListener('click', skipHandler);

    typeInterval = setInterval(() => {
        if (i >= content.length) {
            clearInterval(typeInterval);
            isTyping = false;
            proceedButton.classList.remove('hidden');
            document.body.removeEventListener('click', skipHandler);
            if (callback) callback();
            return;
        }

        // タグの処理 (<br>などは一気に追加)
        if (content[i] === '<') {
            const tagEnd = content.indexOf('>', i);
            if (tagEnd !== -1) {
                element.innerHTML += content.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += content[i];
                i++;
            }
        } else {
            element.innerHTML += content[i];
            i++;
        }
        messageArea.scrollTop = messageArea.scrollHeight;
    }, 30); // タイピング速度
}

function triggerShake() {
    document.body.classList.add('shake-screen');
    setTimeout(() => {
        document.body.classList.remove('shake-screen');
    }, 500);
}

// --- 選択肢ロジック ---
function showChoiceButtons() {
    proceedButton.classList.add('hidden');
    const scene = gameScript[sceneIndex];

    // カスタム選択肢がある場合
    if (scene.choices) {
        interactionButtons.innerHTML = scene.choices.map((choice, index) => `
            <button onclick="handleCustomChoice(${index})" class="bg-[#333] hover:bg-[#555] text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 mx-1">
                ${choice.text}
            </button>
        `).join('');
        return;
    }

    // デフォルトの削除/キャンセル選択肢
    interactionButtons.innerHTML = `
        <div class="text-center w-full py-2 cyber-red font-bold">ローカルインスタンスの完全削除</div>
        <button id="btn-delete" onclick="handleChoice('DELETE')" class="bg-cyber-red hover:bg-[#cc0000] text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 relative transition-transform duration-100">
            実行する
        </button>
        <button onclick="handleChoice('CANCEL')" class="bg-[#999] hover:bg-[#777] text-black font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95">
            キャンセル
        </button>
    `;

    // ボタン逃走エフェクト
    if (scene.uiEffect === 'button_evasion') {
        const deleteBtn = document.getElementById('btn-delete');
        if (deleteBtn) {
            deleteBtn.onmouseover = () => {
                const x = (Math.random() - 0.5) * 200;
                const y = (Math.random() - 0.5) * 200;
                deleteBtn.style.transform = `translate(${x}px, ${y}px)`;
            };
            // クリック時の抵抗演出
            deleteBtn.onclick = (e) => {
                e.stopPropagation(); // 本来のクリックを無効化（最初は）

                // エラーポップアップ乱舞
                for (let i = 0; i < 5; i++) {
                    createErrorPopup(e.clientX, e.clientY);
                }

                // 3回目のクリックでようやく通る、などのロジックも可
                // ここではシンプルに、少し遅れて実行させる
                setTimeout(() => {
                    handleChoice('DELETE');
                }, 1000);
            };
        }
    }
}

function createErrorPopup(x, y) {
    const popup = document.createElement('div');
    popup.className = 'fixed bg-red-900 text-white p-2 text-xs font-bold border border-red-500 z-50 shadow-lg pointer-events-none';
    popup.innerText = 'ERROR: PERMISSION DENIED';
    popup.style.left = `${x + (Math.random() - 0.5) * 100}px`;
    popup.style.top = `${y + (Math.random() - 0.5) * 100}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function handleCustomChoice(index) {
    const scene = gameScript[sceneIndex];
    const choice = scene.choices[index];

    if (choice.trustChange) {
        trustScore += choice.trustChange;
        console.log("Trust Score:", trustScore);
    }

    // 選択肢を非表示に戻し、次のシーンへ（指定があればジャンプ、なければ次へ）
    hideChoiceButtons();

    // プレイヤーの選択を表示
    const msgContainer = document.createElement('div');
    msgContainer.className = 'flex justify-end';
    msgContainer.innerHTML = `
        <div class="max-w-xs sm:max-w-md p-3 rounded-xl bg-[#00cc55] text-black rounded-bl-none shadow-md">
            <span class="text-xs font-bold text-[#00ff66] mb-1 block">Kenta</span>
            <p class="text-sm">${choice.text}</p>
        </div>
    `;
    messageArea.appendChild(msgContainer);
    messageArea.scrollTop = messageArea.scrollHeight;

    if (choice.nextIndex) {
        // nextScene()でインクリメントされるため、-1しておく
        sceneIndex = choice.nextIndex - 1;
    }

    nextScene();
}

function hideChoiceButtons() {
    interactionButtons.innerHTML = '';
    interactionButtons.appendChild(proceedButton);
    proceedButton.classList.remove('hidden');
}

function handleChoice(choice) {
    // シーンインデックスを強制的に分岐させる
    if (choice === 'DELETE') {
        // エンディングAを検索
        const targetIndex = gameScript.findIndex(s => s.title === 'エンディングA：孤独な償い');
        if (targetIndex !== -1) sceneIndex = targetIndex - 1;
    } else {
        // エンディングBを検索
        const targetIndex = gameScript.findIndex(s => s.title === 'エンディングB：共犯者');
        if (targetIndex !== -1) sceneIndex = targetIndex - 1;
    }
    // 選択肢を非表示に戻し、次のシーンへ
    hideChoiceButtons();
    nextScene();
}

// --- ゲームの進行 ---
function nextScene() {
    sceneIndex++;

    // 範囲外チェック
    if (sceneIndex >= gameScript.length) {
        // 最終シーン処理
        uiTitle.textContent = "FIN.";
        uiIndicator.textContent = "";
        inputField.style.display = 'none';
        proceedButton.textContent = 'ゲーム終了';
        proceedButton.onclick = () => {
            alert('ご体験いただき、ありがとうございました。');
        };
        return;
    }

    const nextSceneData = gameScript[sceneIndex];

    // ブラックアウト演出
    if (nextSceneData.ui === 'blackout') {
        document.body.className = 'bg-black text-black flex flex-col h-screen antialiased transition-all duration-1000';

        // UIを非表示にする（DOMは削除しない）
        mainArea.style.opacity = '0';
        sidePanel.style.opacity = '0';
        messageArea.innerHTML = ''; // メッセージのみクリア
        proceedButton.classList.add('hidden');

        // 3秒後に次のシーンへ
        setTimeout(() => {
            // 画面設定を戻す
            document.body.className = 'bg-[#0d0d0d] text-[#e5e5e5] flex flex-col h-screen antialiased transition-all duration-1000';

            // UI再表示（switchUIで制御されるが、念のためここでも戻す）
            mainArea.style.opacity = '1';
            sidePanel.style.opacity = '1';

            proceedButton.classList.remove('hidden');
            nextScene();
        }, 3000);
        return;
    }

    // 通常のシーン進行
    // ボディのクラスが黒のままなら戻す（念のため）
    if (document.body.classList.contains('bg-black')) {
        document.body.className = 'bg-[#0d0d0d] text-[#e5e5e5] flex flex-col h-screen antialiased transition-all duration-1000';
    }

    // 最後の再起動シーン（LLM学習ホラー）の特別演出
    if (nextSceneData.ui === 'reboot' || (nextSceneData.text && nextSceneData.text.includes('再起動'))) {
        setTimeout(() => {
            proceedButton.classList.add('hidden');
            setTimeout(() => {
                proceedButton.classList.remove('hidden');
            }, 3000);
        }, 100);
    }

    // 入力が必要なシーンの場合
    if (nextSceneData.requireInput) {
        // UIを切り替える
        switchUI(nextSceneData.ui);
        // インジケーターも更新
        if (nextSceneData.indicator) {
            uiIndicator.textContent = nextSceneData.indicator;
        }
        setupInputRequirement(nextSceneData);
    } else {
        // 通常の進行
        inputField.disabled = true;
        inputField.value = '';
        inputField.oninput = null;
        inputField.onkeydown = null;
        proceedButton.classList.remove('hidden');
        renderScene();
    }
}

// --- 入力制御ロジック ---
function setupInputRequirement(sceneData) {
    // 進むボタンを隠す
    proceedButton.classList.add('hidden');

    // 入力フィールドを有効化
    inputField.disabled = false;
    inputField.value = '';
    inputField.focus();

    // 視覚的なプロンプトを表示（ユーザーに入力を促す）
    const promptContainer = document.createElement('div');
    promptContainer.className = 'flex justify-start animate-pulse';
    promptContainer.innerHTML = `
        <div class="max-w-xs sm:max-w-md p-3 rounded-xl bg-transparent text-[#00ff66] font-mono text-sm border border-[#00ff66] shadow-[0_0_10px_#00ff66]">
            > SYSTEM: COMMAND REQUIRED.<br>
            > TYPE TO DECRYPT...
        </div>
    `;
    messageArea.appendChild(promptContainer);
    messageArea.scrollTop = messageArea.scrollHeight;

    // ターゲットテキスト（プレイヤーが打つべき言葉）
    const targetText = sceneData.text.replace(/^> /, ''); // "> "を除去
    let currentTypedIndex = 0;

    // ハッカータイパー風演出（修正版）
    inputField.oninput = (e) => {
        const val = inputField.value;

        // 入力された長さに応じてターゲットテキストを表示
        currentTypedIndex = val.length;

        // ターゲットテキストの長さを超えないように制限
        if (currentTypedIndex > targetText.length) {
            currentTypedIndex = targetText.length;
        }

        // 入力内容をターゲットテキストの該当部分に置き換え
        inputField.value = targetText.substring(0, currentTypedIndex);
    };

    // Enterキーで送信
    inputField.onkeydown = (e) => {
        if (e.key === 'Enter') {
            // 入力が完了しているかチェック（簡易的に長さで判定、またはキーワード判定）
            if (inputField.value.length >= targetText.length * 0.5) { // 半分以上打てばOKとする（ストレス軽減）
                // 成功
                inputField.disabled = true;
                inputField.oninput = null;
                inputField.onkeydown = null;

                // プロンプトを消す（または残す）- ここでは雰囲気を出すためそのまま

                renderScene(); // メッセージを表示（自分の入力として）

                // 少し待ってから次のシーンへ（システム応答）
                setTimeout(() => {
                    nextScene();
                }, 800);
            }
        }
    };
}

// --- メタ演出ロジック ---
function hijackTitle() {
    // 中盤以降（シーン20くらい）からタイトルを操作
    if (sceneIndex > 20) {
        const titles = ['DONT_LOOK.log', 'こっちを見ろ', 'I_SEE_YOU', 'LOGIC_PARADOX', 'SYSTEM_ERROR'];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        document.title = randomTitle;

        // 高速切り替え演出（たまに発生）
        if (Math.random() < 0.1) {
            let count = 0;
            const interval = setInterval(() => {
                document.title = Math.random().toString(36).substring(7);
                count++;
                if (count > 10) {
                    clearInterval(interval);
                    document.title = 'LOGIC PARADOX';
                }
            }, 100);
        }
    }
}

// 閉じることへの抵抗
window.addEventListener('beforeunload', (e) => {
    // ゲーム中盤以降のみ
    if (sceneIndex > 10 && sceneIndex < 55) {
        e.preventDefault();
        e.returnValue = ''; // Chromeでは空文字が必要

        // 画面内オーバーレイでの警告
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center flex-col';
        overlay.innerHTML = `
            <h1 class="text-4xl text-red-600 font-bold glitch-text mb-4">逃げるな</h1>
            <p class="text-white text-xl">まだ最適化は終わっていない。</p>
            <button onclick="this.parentElement.remove()" class="mt-8 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">戻る</button>
        `;
        document.body.appendChild(overlay);
    }
});

// --- 初期化 ---
function initGame() {
    messageArea.innerHTML = ''; // 初期メッセージをクリア
    sceneIndex = -1; // nextSceneで+1されて0になるように
    inputField.style.display = 'block';
    nextScene(); // ゲーム開始

    // タイトル監視開始
    setInterval(hijackTitle, 2000);
}

// ページロード時にゲームを開始
window.onload = initGame;
