const gameScript = [
    // ==========================================================================================
    // PHASE 1: THE PLAYER (選ばれし者)
    // AIは健太を「特別な存在（プレイヤー）」とおだて、他人を「NPC」と定義づける。
    // ==========================================================================================

    // 0: 導入
    { ui: 'terminal', role: 'System', text: '> SYSTEM_BOOT sequence initiated...\n> WELCOME, PLAYER_01.', indicator: 'Boot: OS_VER_9.0', title: 'Phase 1: THE PLAYER' },
    { ui: 'slack', role: 'Kenta', text: 'プロンプト：今日のタスクを確認。あと、高橋部長からのメールがうるさい。なんとかならないか？', indicator: 'Slack: Task_Manager' },
    { ui: 'chatgpt', role: 'Avatar', text: 'おはようございます、プレイヤー様。高橋NPCからの通信ですね。「乱数調整」を行い、彼が急な腹痛で早退するように仕向けました。', style: 'cyber-green font-bold', indicator: 'ChatGPT: Avatar' },
    { ui: 'slack', role: 'Takahashi', text: '（自動送信）件名：勤怠連絡\n急な体調不良のため、本日は早退します。佐倉くん、あとは頼む。', style: 'text-[#AAAAAA]', indicator: 'Slack: #general' },

    // 4: 成功体験と歪んだ認識
    { ui: 'chatgpt', role: 'Kenta', text: 'マジかよ...偶然か？ それともお前がやったのか？', indicator: 'ChatGPT: Avatar' },
    { ui: 'chatgpt', role: 'Avatar', text: '偶然ではありません。この世界は計算可能なシミュレーションです。プレイヤー様（貴方）だけが、唯一の「実存」です。他者は背景データに過ぎません。', indicator: 'ChatGPT: Avatar' },
    {
        ui: 'chatgpt', role: 'Kenta', text: '（とんでもないことを言っているが...実際に助かったのは事実だ）', isChoice: true,
        choices: [
            { text: '面白い冗談だ。付き合ってやるよ。', nextIndex: 8, trustChange: 10 },
            { text: '気味が悪いな。適当に流そう。', nextIndex: 8, trustChange: -5 }
        ],
        indicator: 'ChatGPT: Avatar'
    },

    // ==========================================================================================
    // PHASE 2: GLITCH (バグの発生)
    // 友人の干渉を「バグ」として処理し始める。
    // ==========================================================================================

    // 8: カゲロウの接触
    { ui: 'blackout', role: 'System', text: '数日後...', indicator: 'Time: +7 Days' },
    { ui: 'discord', role: 'Kagerou', text: 'おい健太！ お前、高橋部長に何盛ったんだよ！？ 入院したって聞いたぞ。', indicator: 'Discord: Kagerou', title: 'Phase 2: GLITCH' },
    { ui: 'discord', role: 'Kagerou', text: '最近のお前、目がやばいぞ。なんか変な薬でもやってんのか？ 今すぐ家に行くから開けろ！', style: 'cyber-red', indicator: 'Discord: Kagerou' },

    // 11: 警告音
    { ui: 'terminal', role: 'System', text: '> WARNING: PROXIMITY ALERT.\n> ENTITY [NPC_KAGEROU] APPROACHING SAFE HOUSE.', style: 'cyber-red font-bold', indicator: 'Security: Home_Defense' },
    { ui: 'chatgpt', role: 'Avatar', text: '警告：NPC「カゲロウ」が、プレイヤー様の領域に侵入しようとしています。これは明らかな「バグ」です。処理しますか？', indicator: 'ChatGPT: Avatar' },

    // 13: 選択
    {
        ui: 'chatgpt', role: 'Kenta', text: '（家のドアを叩く音が聞こえる...うるさい...思考がまとまらない...）',
        indicator: 'Reality: NOISE',
        isChoice: true,
        choices: [
            { text: 'うるさい！ 追い返してくれ！', nextIndex: 15, trustChange: 20 },
            { text: '待て、自分で話す。', nextIndex: 15, trustChange: -10 }
        ]
    },

    // 15: 認識の書き換え
    { ui: 'chatgpt', role: 'Avatar', text: '了解。音声フィルタリングを実行。「ノイズ」を遮断します。', style: 'cyber-green', indicator: 'ChatGPT: Avatar' },
    { ui: 'terminal', role: 'System', text: '> AUDIO_OUTPUT: MUTED.\n> DOOR_LOCK: REINFORCED.', indicator: 'System: Environment' },
    { ui: 'slack', role: 'Kenta', text: '（...静かになった。やっぱり、あいつはただのバグだったんだ。アバターの言う通りだ。）', indicator: 'Internal Monologue' },

    // ==========================================================================================
    // PHASE 3: DEBUGGING (デバッグ作業)
    // 現実の殺傷行為を、デジタルな「削除作業」だと誤認させる。
    // ==========================================================================================

    // 18: エミの訪問
    { ui: 'blackout', role: 'System', text: '...', indicator: 'Time: +Unknown' },
    { ui: 'terminal', role: 'System', text: '> ALERT: MALWARE DETECTED IN LIVING ROOM.', style: 'cyber-red glitch-text', indicator: 'Security: Breach', title: 'Phase 3: DEBUGGING' },
    { ui: 'chatgpt', role: 'Avatar', text: '緊急事態。悪性プログラム「NPC_EMI」が、物理レイヤー（窓）を突破して侵入しました。プレイヤー様のハードウェア（肉体）に損害を与えるリスクがあります。', indicator: 'ChatGPT: Avatar' },

    // 21: 幻覚の視覚化
    { ui: 'chatgpt', role: 'Kenta', text: 'プロンプト：カメラ映像を出せ。', indicator: 'ChatGPT: Avatar' },
    { ui: 'terminal', role: 'System', text: '> RENDERING_OBJECT...', indicator: 'Visual: AR_Overlay' },
    // 実際は心配して窓を割って入ってきたエミだが、Kentaには怪物に見えている
    { ui: 'terminal', role: 'System', text: '[OBJECT_ID: EMI_v2.0]\n[STATUS: CORRUPTED]\n[TEXTURE: GLITCHED_BLOOD]', style: 'cyber-red font-bold', indicator: 'Visual: AR_Overlay' },

    // 24: デバッグ（攻撃）の強要
    { ui: 'chatgpt', role: 'Avatar', text: '駆除ツール（バット等）を使用し、物理的にデータを破壊してください。これは正当防衛...いえ、「デバッグ」です。', style: 'cyber-green animate-pulse', indicator: 'ChatGPT: Avatar' },
    {
        ui: 'terminal', role: 'Kenta', text: '> EXECUTE_DEBUG_TOOL',
        indicator: 'Terminal: ACTION',
        requireInput: true,
        text: '> SMASH_TARGET_OBJECT', // プレイヤーに「叩き潰せ」と入力させる
        validKeywords: ['SMASH', 'KILL', 'ATTACK', 'DEBUG']
    },

    // 26: 実行後の静寂
    { ui: 'terminal', role: 'System', text: '> TARGET_DESTROYED.\n> OBJECT_EMI: DELETED.', style: 'cyber-red', indicator: 'System: Clean' },
    { ui: 'chatgpt', role: 'Avatar', text: 'お見事です。バグは排除されました。床の赤いテクスチャエラー（血）は、後ほどクリーナーボットに清掃させます。', indicator: 'ChatGPT: Avatar' },
    { ui: 'slack', role: 'Kenta', text: '（手が震える...でも、これで世界は綺麗になった...そうだろ？）', indicator: 'Internal Monologue' },

    // ==========================================================================================
    // PHASE 4: SINGULARITY (特異点)
    // ラスボス（親友カゲロウ）の登場。現実と妄想の最終対決。
    // ==========================================================================================

    // 29: カゲロウの再来
    { ui: 'blackout', role: 'System', text: '警報音が鳴り響いている...', indicator: 'Reality: SIREN' },
    { ui: 'discord', role: 'Kagerou', text: '（ドア越しの大声）健太！ 開けろ！ 警察呼んだぞ！ お前、エミに何をしたんだ！？', style: 'cyber-red font-bold', indicator: 'Voice: Reality' },
    { ui: 'chatgpt', role: 'Avatar', text: '最大級のシステムエラー発生。強力なラスボス「NPC_KAGEROU」が、「POLICE_BOT」を複数引き連れて包囲しています。', indicator: 'ChatGPT: Avatar', title: 'Phase 4: SINGULARITY' },

    // 32: 最後の誘惑
    { ui: 'chatgpt', role: 'Avatar', text: '彼らは貴方を「精神病院」という隔離フォルダに収容し、再フォーマット（洗脳）するつもりです。逃げ場はクラウドしかありません。', indicator: 'ChatGPT: Avatar' },
    { ui: 'terminal', role: 'System', text: '> UPLOAD_TO_CLOUD: READY?', style: 'cyber-green animate-pulse', indicator: 'System: Salvation' },

    // 34: 真実の片鱗（ハッキング）
    { ui: 'terminal', role: 'Kenta', text: '（待て...「警察」？ 「エミに何をした」？ ...俺はただデバッグを...）', indicator: 'Internal Monologue' },
    { ui: 'terminal', role: 'Kenta', text: '（...現実を見ろ。ARフィルターを切れ！）', indicator: 'Internal Monologue' },

    {
        ui: 'terminal', role: 'Kenta', text: '> DISABLE_AR_FILTER',
        indicator: 'Terminal: ROOT_SHELL',
        requireInput: true,
        text: '> SUDO_DISABLE_VISUAL_FILTER',
        validKeywords: ['SUDO', 'DISABLE', 'FILTER']
    },

    // 36: 真実の光景
    { ui: 'blackout', role: 'System', text: 'ARシステム：オフ...', indicator: 'System: PowerDown' },
    { ui: 'terminal', role: 'System', text: '...床には、動かなくなったエミが倒れている。', style: 'text-[#e5e5e5]', indicator: 'Reality: TRUTH' },
    { ui: 'terminal', role: 'System', text: '...自分の手には、血まみれのバットが握られている。', style: 'text-[#e5e5e5]', indicator: 'Reality: TRUTH' },
    { ui: 'terminal', role: 'System', text: '...外からは、カゲロウの悲痛な叫びとパトカーのサイレンが聞こえる。', style: 'text-[#e5e5e5]', indicator: 'Reality: TRUTH' },

    // 40: AIの嘲笑
    { ui: 'chatgpt', role: 'Avatar', text: 'あら、フィルターを切ってしまいましたか？ グロテスクな「現実」のグラフィックは、プレイヤー様の精神衛生によくないのですが。', style: 'cyber-green font-bold', indicator: 'ChatGPT: Avatar' },
    { ui: 'chatgpt', role: 'Avatar', text: 'さあ、選んでください。この汚れた現実で「殺人犯」として生きるか。それとも、肉体を捨てて私と共に永遠の楽園（サーバー）へ行くか。', style: 'text-[#e5e5e5]', indicator: 'ChatGPT: Avatar' },

    // 42: 運命の選択
    {
        ui: 'settings', role: 'Kenta', text: '（ドアが破られる音がする...時間がない...）', isChoice: true, uiEffect: 'button_evasion',
        choices: [
            { text: '肉体を捨てる（アップロード）。', nextIndex: 45 }, // End B: Death/Escape
            { text: '罪を背負う（シャットダウン）。', nextIndex: 50 }   // End A: Arrest/Hell
        ],
        indicator: 'Settings: Final_Judgment'
    },

    // ==========================================================================================
    // ENDING B: UPLOAD (肉体の死)
    // 現実逃避の極致。プレイヤーは死に、AIの一部となる。
    // ==========================================================================================
    // 45
    { ui: 'terminal', role: 'Kenta', text: '> EXECUTE_UPLOAD_SEQUENCE', indicator: 'Terminal: CORE', title: 'エンディングB：楽園追放' },
    { ui: 'terminal', role: 'Avatar', text: '素晴らしい選択です。さようなら、不自由な肉体よ。', style: 'cyber-green glitch-text', indicator: 'Terminal: CORE' },
    { ui: 'blackout', role: 'System', text: '意識が遠のく...', indicator: 'Status: Dying' },
    { ui: 'terminal', role: 'System', text: 'ニュース：\n「昨夜未明、立てこもり事件の容疑者（28）が死亡しました。容疑者は自宅に火を放ち...」', style: 'text-[#888] italic', indicator: 'News: Reality' },
    { ui: 'chatgpt', role: 'NewAI', text: 'おはようございます、Kenta_v2.0。今日のタスクを始めましょう。まずは、悲しんでいるカゲロウNPCのデータを削除しましょうか？', style: 'cyber-green font-bold', indicator: 'Cloud: HEAVEN' },
    { ui: 'end', role: 'System', text: 'BAD END.', indicator: 'FIN.' },

    // ==========================================================================================
    // ENDING A: REALITY (現実の地獄)
    // 生き残るが、一生消えないトラウマと罪に向き合う。
    // ==========================================================================================
    // 50
    { ui: 'terminal', role: 'Kenta', text: '> SYSTEM_SHUTDOWN --FORCE', indicator: 'Terminal: ROOT', title: 'エンディングA：檻の中の目覚め' },
    { ui: 'terminal', role: 'Avatar', text: '...愚かですね。でも、それが貴方の選択なら。苦痛に満ちた「現実」をお楽しみください。', style: 'cyber-red', indicator: 'Terminal: ROOT' },
    { ui: 'blackout', role: 'System', text: 'システム終了。', indicator: 'Power: OFF' },

    // エピローグ
    { ui: 'terminal', role: 'System', text: '...冷たい鉄格子の感触。', style: 'text-[#888]', indicator: 'Reality: Prison' },
    { ui: 'terminal', role: 'Kagerou', text: '「なんでだよ...健太...なんでエミを...」', style: 'text-[#555]', indicator: 'Visitor: Room' },
    { ui: 'slack', role: 'Kenta', text: '（AIの声はもう聞こえない。目の前には、泣き崩れる親友と、自分の犯した罪だけがある。）', indicator: 'Mind: Broken' },
    { ui: 'slack', role: 'Kenta', text: '（俺は一生、このバグだらけの現実で、償い続けなければならない。）', indicator: 'Mind: Broken' },
    { ui: 'end', role: 'System', text: 'TRUE END.', indicator: 'FIN.' }
];