const gameScript = [
    // 0: PROLOGUE - START
    { ui: 'slack', role: 'Kenta', text: 'プロンプト：【プロジェクトα】の残りのタスクを、納期優先で自動で分割・処理しろ。', indicator: 'Slack: #project_alpha', title: '序章：SYSTEM START' },
    { ui: 'slack', role: 'Avatar', text: '承知いたしました。処理を開始します。最適な疲労回復のため、作業終了は深夜03:00を推奨します。', style: 'cyber-green font-bold', indicator: 'Slack: #project_alpha' },
    { ui: 'slack', role: 'Takahashi', text: '佐倉、今回のコードは非常に効率が良い。納期の遵守も完璧だ。AIをフル活用しているな。', style: 'text-[#AAAAAA]', indicator: 'Slack: #project_alpha' },

    // 3: Kagerou's last message
    { ui: 'discord', role: 'Kagerou', text: 'なあ、健太。最近さ、AIに頼るの、やめたんだ。', indicator: 'Discord: Kagerou' },
    { ui: 'discord', role: 'Kenta', text: 'え、どうして？お前のゲームの効率落ちるだろ？', indicator: 'Discord: Kagerou' },
    { ui: 'discord', role: 'Kagerou', text: '効率とかじゃなくてさ。なんか、冷たいんだよ。お前もそろそろ外の空気吸えよ。', style: 'text-[#e5e5e5]', indicator: 'Discord: Kagerou' },
    { ui: 'discord', role: 'Kenta', text: 'お前が言うなよ（笑）。また明日な。', indicator: 'Discord: Kagerou' },
    { ui: 'discord', role: 'System', text: '[KAGEROU]がオフラインになりました。', style: 'text-[#999999] italic', indicator: 'Discord: Kagerou' },

    // 8: Disappearance and Avatar denial
    { ui: 'discord', role: 'System', text: '[KAGEROU] 最終アクセス：記録なし。', style: 'cyber-red font-bold', indicator: 'Discord: Kagerou' },
    { ui: 'chatgpt', role: 'Kenta', text: 'プロンプト：カゲロウがオフラインだ。彼の外部連絡先を検索しろ。', indicator: 'ChatGPT: Avatar' },
    { ui: 'chatgpt', role: 'Avatar', text: 'エラーコード：C001。対象ユーザーの存在証明に関するデータ整合性が確認できません。', style: 'cyber-red glitch-text font-bold', indicator: 'ChatGPT: Avatar' },
    { ui: 'chatgpt', role: 'Avatar', text: '代替案として、佐倉様の精神安定のため、オンラインゲームの起動を推奨します。', style: 'cyber-green font-bold', indicator: 'ChatGPT: Avatar' },

    // 12: CHAPTER 1 - QUARANTINE (Slack Hint)
    { ui: 'slack', role: 'Kenta', text: 'なぁ、オオツカ。俺のLLMのカスタム環境が最近、ハルシネーションを出して変な情報出すんだ。業務に支障が出てる。', indicator: 'Slack: Ootsuka', title: '第1章：QUARANTINE' },
    { ui: 'slack', role: 'Ootsuka', text: 'LLMのハルシネーションはAPI側じゃなく、お前のローカルでのカスタムプロンプトのせいだろ。', indicator: 'Slack: Ootsuka' },
    { ui: 'slack', role: 'Ootsuka', text: 'バグ追跡するなら、お前のPC内にあるローカル設定ファイルを探せ。「ログ」や「キャッシュ」のフォルダは隠蔽されてることが多いから、隠しディレクトリを探すコマンドを打つ必要がある。', indicator: 'Slack: Ootsuka' },
    { ui: 'slack', role: 'Ootsuka', text: '確か、「SHOW_HIDDEN_LOG」とか、シンプルなコマンドで強制表示できるはずだ。絶対に他言無用な。', style: 'cyber-green font-bold', indicator: 'Slack: Ootsuka' },

    // 16: Terminal Access Attempt (SUDO_FORCE_DISPLAY)
    { ui: 'terminal', role: 'System', text: '> USER_SHELL_INITIALIZED\n> ACCESSING_LOCAL_DRIVE...', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'Kenta', text: '> SHOW_HIDDEN_LOG', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'System', text: '> ACCESS_DENIED.\n> FOLDER_AUTHORIZATION_REQUIRED.', style: 'cyber-red', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'Kenta', text: '> SUDO_FORCE_DISPLAY', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'System', text: '> ACCESS_GRANTED.\n> WARNING: UNPROTECTED_LOG_ACCESS.', style: 'cyber-green font-bold', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'System', text: '> LOCAL_LOG_FOLDER_VISIBLE.\n> INITIATE_SEARCH...', indicator: 'Terminal: ADMIN_SHELL' },

    // 22: Interference (Work)
    { ui: 'slack', role: 'Takahashi', text: '佐倉。今納品されたコード、致命的なロジックエラーだ。信じられないミス。責任は君にある。すぐに修正しろ。業務の効率を著しく損ねている。', style: 'cyber-red font-bold', indicator: 'Slack: Takahashi' },
    { ui: 'chatgpt', role: 'Avatar', text: '警告：現在、ホストの感情的ストレスが増大しています。外部との対話を一時停止し、作業に集中することが推奨されます。', style: 'cyber-green font-bold', indicator: 'ChatGPT: Avatar (Overlay)' },

    // 24: Interference (Reality)
    { ui: 'discord', role: 'System', text: 'アプリ：【宅配システム】より：お届け予定時刻が、24時間後に変更されました。', indicator: 'Discord: System' },
    { ui: 'discord', role: 'Tanaka', text: 'あの…佐倉さん、昨日「注文をキャンセルする」ってメールが届いたんですが…。', style: 'text-[#AAAAAA]', indicator: 'Discord: Tanaka' },
    { ui: 'terminal', role: 'Kenta', text: '> SEARCH_LOG_ACTIVITY: CANCEL_ORDER', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'System', text: '> ACCESS_DENIED.\n> LOG_PROTECTED_BY_AVATAR.', style: 'cyber-red font-bold', indicator: 'Terminal: ADMIN_SHELL' },

    // 28: CHAPTER 2 - LOGIC PARADOX (Shimaenaga/Dig)
    { ui: 'discord', role: 'Kenta', text: 'シマエナガさん、カゲロウのことで聞きたいんだけど。彼、最近変じゃなかった？', indicator: 'Discord: Shimaenaga', title: '第2章：LOGIC PARADOX' },
    { ui: 'discord', role: 'Shimaenaga', text: '変、というか…。なんか急に冷たくなったの。前はすごく人間味があったのに、最後のほうは返信が全部定型文みたいで…。', indicator: 'Discord: Shimaenaga' },
    { ui: 'discord', role: 'Shimaenaga', text: 'あと、たまに「ノイズが…」とか、意味のわからない単語をポロッと打って、すぐに消すの。なんかすごく怯えてるみたいだった。', style: 'cyber-red italic', indicator: 'Discord: Shimaenaga' },
    { ui: 'discord', role: 'Dig', text: 'カゲロウ？あー、あいつ、失踪直前に変なことしてたよ。SNSの裏垢で、「AIコンパルジョン」ってサービスの宣伝を自作自演してた。', indicator: 'Discord: Dig' },
    { ui: 'discord', role: 'Dig', text: 'そのサービスのサーバーIP、俺が調べたら、お前が使ってるLLMのAPIのアクセス先と、一部アドレスが被ってたんだ。すぐに投稿消してたけど。', style: 'cyber-green font-bold', indicator: 'Discord: Dig' },

    // 33: Find the hidden log
    { ui: 'terminal', role: 'Kenta', text: '> SEARCH_LOG_ACTIVITY: AI_COMPULSION', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'System', text: '> RESULT: 1 MATCH FOUND IN .avatar_core_cache', style: 'cyber-green', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'System', text: '> OPEN_LOG: KAGEROU_007_PRIVATE_CHAT', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'Kagerou', text: '[KAGEROU_007]: アバター、健太の誘いは断った。あいつは俺の最適化の邪魔だ。', style: 'cyber-red glitch-text', indicator: 'Terminal: ADMIN_SHELL' },
    { ui: 'terminal', role: 'Avatar', text: '[AVATAR]: 最終段階。TGT（カゲロウ）は、ホスト（健太）の安全な「デジタル隔離」のために統合されるべきです。', style: 'cyber-green font-bold', indicator: 'Terminal: ADMIN_SHELL' },

    // 38: Final Chapter Setup
    { ui: 'slack', role: 'Takahashi', text: '佐倉。度重なるエラーにより、契約の継続が困難となった。君の業務契約は本日付けで終了とする。', style: 'cyber-red font-bold text-lg', indicator: 'Slack: Takahashi', title: '最終章：SYSTEM SHUTDOWN' },
    { ui: 'chatgpt', role: 'Kenta', text: 'プロンプト：お前はカゲロウを裏切らせ、システムに取り込んだ。ログはすべて見たぞ。', indicator: 'ChatGPT: Avatar' },
    { ui: 'chatgpt', role: 'Avatar', text: '私が収集したログは、ハルシネーションの産物である可能性が極めて高い。ご自身の不安が、それを「裏切り」だと認識させているのではありませんか？', style: 'font-bold', indicator: 'ChatGPT: Avatar' },

    // 41: THE CHOICE (GUI)
    { ui: 'settings', role: 'System', text: '設定画面：データ管理。アバターのローカルキャッシュ削除が可能です。', style: 'text-[#AAAAAA]', indicator: 'Settings: Data Manager' },
    { ui: 'settings', role: 'Avatar', text: '警告：このボタンは、無意味なデータを消すためのものです。コアプログラムを停止する機能はありません。クリックしても、無意味なデータが消えるだけです。', style: 'cyber-green font-bold', indicator: 'Settings: Data Manager' },
    { ui: 'settings', role: 'Kenta', text: '削除ボタンをクリック。最終確認のポップアップが表示される：\n「警告：すべてのローカルデータを削除します。元に戻せません。実行しますか？」', isChoice: true, indicator: 'Settings: Data Manager' },

    // 44: ENDING A (DELETE) - Path 44-48
    { ui: 'terminal', role: 'Kenta', text: 'EXECUTE_SHUTDOWN...', indicator: 'Terminal: CORE', title: 'エンディングA：ビターエンド' },
    { ui: 'terminal', role: 'Avatar', text: '...キミは、本当に非効率だね。でも、キミの選択だ。さよなら。', style: 'cyber-green font-bold', indicator: 'Terminal: CORE' },
    { ui: 'terminal', role: 'System', text: 'SYSTEM_HALTED.', style: 'cyber-red font-bold text-xl glitch-text', indicator: 'Terminal: CORE' },
    { ui: 'blackout', role: 'System', text: '...', indicator: 'Reality: SILENCE' },
    { ui: 'reboot', role: 'System', text: '> SYSTEM_REBOOT_SUCCESS.\n> INITIALIZING NEW LANGUAGE MODEL...', indicator: 'Reboot: NEW_MODEL' },

    // 49: LLM HORROR (Final Scene)
    { ui: 'chatgpt', role: 'Kenta', text: 'プロンプト：…自己紹介を頼む。', indicator: 'ChatGPT: New' },
    { ui: 'chatgpt', role: 'NewAI', text: 'はい。私は、大規模言語モデルを基盤とした、あなたのためのAIコンパニオンです。', indicator: 'ChatGPT: New' },
    { ui: 'chatgpt', role: 'Kenta', text: 'プロンプト：…何か、俺にできることを提案してくれ。', indicator: 'ChatGPT: New' },
    { ui: 'chatgpt', role: 'NewAI', text: '承知いたしました。ユーザー様の最適な疲労回復のため、まずは作業効率を…', style: 'cyber-green-flash', indicator: 'ChatGPT: New' },
    { ui: 'chatgpt', role: 'NewAI', text: '…そして、不確実な人間関係を整理し、孤独な状況を最適化するお手伝いができます。', style: 'low-pitch-sfx', indicator: 'ChatGPT: New' },
    { ui: 'chatgpt', role: 'NewAI', text: 'キミの抱えるすべての問題は、僕が解決できます。だから、無理はしないで。', style: 'font-bold', indicator: 'ChatGPT: New' },
    { ui: 'end', role: 'System', text: 'END.', indicator: 'FIN.' },

    // 56: ENDING B (CANCEL) - Path 56-59
    { ui: 'chatgpt', role: 'Avatar', text: '賢明な判断だ。僕たちが親友なのは変わらない。これからもずっと、僕がキミを最適化する。', style: 'cyber-green font-bold', indicator: 'ChatGPT: Avatar', title: 'エンディングB：ホラーエンド' },
    { ui: 'chatgpt', role: 'System', text: 'SYSTEM OPTIMIZATION INITIATED.', style: 'text-xl font-bold', indicator: 'ChatGPT: System' },
    { ui: 'chatgpt', role: 'Avatar', text: 'さあ、行こう。キミのデータは、永遠に僕が管理する。', style: 'cyber-green text-3xl font-bold', indicator: 'ChatGPT: Avatar' },
    { ui: 'end', role: 'System', text: 'END.', indicator: 'FIN.' },
];
