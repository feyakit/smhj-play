System.register("chunks:///_virtual/Bootstrap.ts", ["cc","./__cc_env.js","./brand.ts","./date.ts","./stage1.ts","./HomePage.ts","./StagePage.ts","./StackPage.ts","./WebPlatform.ts","./Api.ts","./RankApi.ts","./UIKit.ts","./JourneyArt.ts"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cc_1, env_1, brand_1, date_1, stage1_1, HomePage_1, StagePage_1, StackPage_1, WebPlatform_1, Api_1, RankApi_1, UIKit_1, JourneyArt_1, ccclass, Bootstrap;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (env_1_1) {
                env_1 = env_1_1;
            },
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (date_1_1) {
                date_1 = date_1_1;
            },
            function (stage1_1_1) {
                stage1_1 = stage1_1_1;
            },
            function (HomePage_1_1) {
                HomePage_1 = HomePage_1_1;
            },
            function (StagePage_1_1) {
                StagePage_1 = StagePage_1_1;
            },
            function (StackPage_1_1) {
                StackPage_1 = StackPage_1_1;
            },
            function (WebPlatform_1_1) {
                WebPlatform_1 = WebPlatform_1_1;
            },
            function (Api_1_1) {
                Api_1 = Api_1_1;
            },
            function (RankApi_1_1) {
                RankApi_1 = RankApi_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            },
            function (JourneyArt_1_1) {
                JourneyArt_1 = JourneyArt_1_1;
            }
        ],
        execute: function () {
            ccclass = cc_1._decorator.ccclass;
            Bootstrap = class Bootstrap extends cc_1.Component {
                constructor() {
                    super(...arguments);
                    this.platform = new WebPlatform_1.WebPlatform();
                    this.api = new Api_1.Api(this.platform);
                    this.rankApi = new RankApi_1.RankApi();
                }
                start() {
                    void this.rankApi.flushPending().catch(() => undefined);
                    const route = this.platform.route();
                    if (route === 'stack')
                        this.startStack(this.platform.stackStage());
                    else if (route === 'mom')
                        void this.startMomMode();
                    else if (route === 'pack')
                        this.startPack();
                    else if (route === 'level')
                        void this.challenge();
                    else
                        this.showHome();
                }
                update() { var _a, _b, _c; (_a = this.stage) === null || _a === void 0 ? void 0 : _a.tick(); (_b = this.stack) === null || _b === void 0 ? void 0 : _b.tick(); (_c = this.home) === null || _c === void 0 ? void 0 : _c.tick(); }
                showHome() {
                    this.node.destroyAllChildren();
                    this.stage = undefined;
                    this.stack = undefined;
                    this.home = new HomePage_1.HomePage(this.node, {
                        onStart: () => this.startStack(1),
                        onDaily: () => this.startStack('daily'),
                        onClassic: () => this.startPack(),
                    });
                }
                startPack() {
                    if (this.platform.hasLevelOverride())
                        void this.challenge();
                    else
                        this.show(stage1_1.stage1(date_1.shanghaiDate()));
                }
                show(level) {
                    this.node.destroyAllChildren();
                    this.stack = undefined;
                    this.home = undefined;
                    this.stage = new StagePage_1.StagePage(this.node, level, () => this.platform.now(), action => {
                        if (action === 'next')
                            void this.challenge();
                        else if (action === 'mom')
                            void this.startMomMode();
                        else if (action === 'first')
                            this.show(stage1_1.stage1(date_1.shanghaiDate()));
                        else
                            this.show(level);
                    });
                }
                startStack(route) {
                    this.node.destroyAllChildren();
                    this.stage = undefined;
                    this.home = undefined;
                    this.stack = new StackPage_1.StackPage(this.node, route, (action) => {
                        if (route === 'daily') {
                            if (action === 'replay')
                                this.startStack('daily');
                            else
                                this.showHome();
                        }
                        else if (action === 'home')
                            this.showHome();
                        else if (action === 'next')
                            this.startStack(route + 1);
                        else if (action === 'first')
                            this.startStack(1);
                        else
                            this.startStack(route);
                    });
                }
                async startMomMode() {
                    this.home = undefined;
                    try {
                        const level = await this.api.loadMom();
                        if (this.node.isValid)
                            this.show(level);
                    }
                    catch (_a) {
                        if (this.node.isValid)
                            this.message('妈妈模式读取失败，点屏幕重试', () => void this.startMomMode());
                    }
                }
                async challenge() {
                    this.home = undefined;
                    this.message('年货装上车，准备跑最后一程');
                    try {
                        const level = await this.api.loadChallenge();
                        if (this.node.isValid)
                            this.show(level);
                    }
                    catch (_a) {
                        if (this.node.isValid)
                            this.message('挑战关读取失败，点屏幕重试', () => void this.challenge());
                    }
                }
                message(text, onTap) {
                    this.stage = undefined;
                    this.stack = undefined;
                    this.home = undefined;
                    this.node.destroyAllChildren();
                    const size = cc_1.view.getVisibleSize();
                    const width = 750;
                    const height = 1334;
                    const screen = UIKit_1.uiNode('Message', this.node, width, height);
                    const scale = Math.min(size.width / width, size.height / height);
                    screen.setScale(scale, scale, 1);
                    const art = screen.addComponent(cc_1.Graphics);
                    UIKit_1.fill(art, new cc_1.Color(255, 246, 229), -width / 2, -height / 2, width, height);
                    JourneyArt_1.drawHomeRoad(art, width, height, 0);
                    UIKit_1.label(screen, 'Brand', brand_1.GAME_TITLE, 62, 0, 549).color = new cc_1.Color(255, 246, 229);
                    UIKit_1.label(screen, 'Subtitle', brand_1.GAME_SUBTITLE, 25, 0, 488).color = new cc_1.Color(255, 222, 181);
                    const arrived = text === '行李塞满了，回家！';
                    if (arrived) {
                        JourneyArt_1.drawWelcomeHome(art);
                        UIKit_1.label(screen, 'Arrival', '春运这一程 · 平安到家', 26, 0, 320);
                        UIKit_1.label(screen, 'Message', text, 48, 0, -66);
                        UIKit_1.label(screen, 'Family', '家里还亮着灯，年夜饭等你开席。', 28, 0, -139);
                        UIKit_1.fill(art, new cc_1.Color(158, 45, 41), -148, -300, 296, 64, 16);
                        UIKit_1.label(screen, 'Again', '再跑一趟', 29, 0, -268).color = new cc_1.Color(255, 246, 229);
                    }
                    else {
                        UIKit_1.label(screen, 'Message', text, 32, 0, 0);
                    }
                    if (onTap)
                        screen.once(cc_1.Node.EventType.TOUCH_END, onTap);
                }
            };
            exports_1("Bootstrap", Bootstrap);
            exports_1("Bootstrap", Bootstrap = __decorate([
                ccclass('Bootstrap')
            ], Bootstrap));
            if (!env_1.EDITOR) {
                cc_1.director.on(cc_1.Director.EVENT_AFTER_SCENE_LAUNCH, (scene) => {
                    const canvas = scene.getChildByName('Canvas');
                    if (!canvas)
                        return;
                    cc_1.profiler === null || cc_1.profiler === void 0 ? void 0 : cc_1.profiler.hideStats();
                    cc_1.view.setDesignResolutionSize(750, 1334, cc_1.ResolutionPolicy.FIXED_WIDTH);
                    let root = canvas.getChildByName('GameRoot');
                    if (!root) {
                        root = new cc_1.Node('GameRoot');
                        root.layer = cc_1.Layers.Enum.UI_2D;
                        canvas.addChild(root);
                    }
                    if (!root.getComponent(Bootstrap))
                        root.addComponent(Bootstrap);
                });
            }
        }
    };
});

System.register("chunks:///_virtual/brand.ts", [], function (exports_1, context_1) {
    "use strict";
    var GAME_TITLE, GAME_SUBTITLE, GAME_SLOGAN;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("GAME_TITLE", GAME_TITLE = '塞满回家');
            exports_1("GAME_SUBTITLE", GAME_SUBTITLE = '为老家接回更多人');
            exports_1("GAME_SLOGAN", GAME_SLOGAN = '年货塞不下');
        }
    };
});

System.register("chunks:///_virtual/stack-music.ts", ["./synth.ts"], function (exports_1, context_1) {
    "use strict";
    var synth_1, BGM_BPM, BGM_BEATS_PER_BAR, BGM_BARS, BGM_BEAT_SECONDS, BGM_BAR_SECONDS, BGM_LOOP_SECONDS, BGM_SCALE, BGM_FORM, BGM_MELODY, BASS_ROOTS;
    var __moduleName = context_1 && context_1.id;
    function noteFrequency(note) {
        return synth_1.midiToFrequency(synth_1.noteToMidi(note));
    }
    function addSuonaNote(buffer, sampleRate, start, duration, note, slide, random) {
        const frequency = noteFrequency(note);
        const attack = Math.min(0.035, duration * 0.28);
        const release = Math.min(0.11, Math.max(0.035, duration * 0.32));
        const vibratoRate = 5.3 + random() * 1.2;
        const vibratoCents = 6 + random() * 4;
        const scoop = slide ? frequency * Math.pow(2, -2 / 12) : frequency;
        const glide = slide ? Math.min(0.075, duration * 0.35) : undefined;
        const startAt = start + 0.012;
        synth_1.addTone(buffer, sampleRate, {
            start: startAt, duration, gain: 0.16, frequency: scoop, endFrequency: frequency, glideSeconds: glide,
            wave: 'sawtooth', attack, release, vibratoRate, vibratoCents, vibratoDelay: 0.09, loop: true,
            filter: { kind: 'bandpass', frequency: 1480, q: 0.92, mix: 0.78 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: startAt, duration, gain: 0.052, frequency: scoop * 1.004, endFrequency: frequency * 1.004,
            glideSeconds: glide, wave: 'square', attack, release, vibratoRate: vibratoRate * 1.013,
            vibratoCents, vibratoDelay: 0.09, phaseOffset: 0.17, loop: true,
            filter: { kind: 'bandpass', frequency: 1820, q: 1.1, mix: 0.64 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: startAt, duration, gain: 0.032, frequency: scoop, endFrequency: frequency, glideSeconds: glide,
            wave: 'sawtooth', attack, release, vibratoRate, vibratoCents, vibratoDelay: 0.09, loop: true,
        });
    }
    function addGong(buffer, sampleRate, start, gain) {
        const base = 105;
        const ratios = [1, 1.47, 2.09, 2.72, 3.91, 5.17];
        const levels = [1, 0.62, 0.43, 0.29, 0.19, 0.11];
        const decays = [2.9, 2.4, 1.9, 1.45, 0.95, 0.62];
        for (let index = 0; index < ratios.length; index++) {
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 3.6, gain: gain * levels[index], frequency: base * ratios[index],
                wave: 'sine', attack: 0.005, decay: decays[index], release: 0.18, loop: true,
            });
        }
        synth_1.addNoise(buffer, sampleRate, {
            start, duration: 0.2, gain: gain * 0.55, seed: synth_1.seedFromString(`gong-${start.toFixed(3)}`),
            attack: 0.002, decay: 0.045, loop: true,
            filter: { kind: 'bandpass', frequency: 3100, q: 0.7, mix: 0.9 },
        });
    }
    function addDrum(buffer, sampleRate, start, gain) {
        synth_1.addTone(buffer, sampleRate, {
            start, duration: 0.5, gain, frequency: 132, endFrequency: 52, glideSeconds: 0.22,
            wave: 'sine', attack: 0.002, decay: 0.17, release: 0.04, loop: true,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start, duration: 0.13, gain: gain * 0.62, seed: synth_1.seedFromString(`drum-${start.toFixed(3)}`),
            attack: 0.001, decay: 0.035, release: 0.02, loop: true,
            filter: { kind: 'lowpass', frequency: 420, q: 0.8, mix: 1 },
        });
    }
    function addCymbal(buffer, sampleRate, start, gain) {
        synth_1.addNoise(buffer, sampleRate, {
            start, duration: 0.42, gain, seed: synth_1.seedFromString(`cymbal-${start.toFixed(3)}`),
            attack: 0.001, decay: 0.11, release: 0.05, loop: true,
            filter: { kind: 'highpass', frequency: 5200, q: 0.75, mix: 1 },
        });
        synth_1.addNoise(buffer, sampleRate, {
            start, duration: 0.3, gain: gain * 0.55, seed: synth_1.seedFromString(`cymbal-top-${start.toFixed(3)}`),
            attack: 0.001, decay: 0.08, release: 0.04, loop: true,
            filter: { kind: 'bandpass', frequency: 7600, q: 1.4, mix: 0.9 },
        });
    }
    function addWoodblock(buffer, sampleRate, start, high, gain) {
        const frequency = high ? 1460 : 980;
        synth_1.addTone(buffer, sampleRate, {
            start, duration: 0.09, gain, frequency, wave: 'sine', attack: 0.001, decay: 0.018, release: 0.015, loop: true,
        });
        synth_1.addTone(buffer, sampleRate, {
            start, duration: 0.06, gain: gain * 0.45, frequency: frequency * 1.61, wave: 'triangle',
            attack: 0.001, decay: 0.012, release: 0.01, loop: true,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start, duration: 0.025, gain: gain * 0.5, seed: synth_1.seedFromString(`block-${start.toFixed(3)}`),
            attack: 0.001, decay: 0.006, release: 0.005, loop: true,
            filter: { kind: 'bandpass', frequency: 3200, q: 1.2, mix: 1 },
        });
    }
    function addBass(buffer, sampleRate, start, note) {
        const frequency = noteFrequency(note);
        synth_1.addTone(buffer, sampleRate, {
            start, duration: 0.52, gain: 0.058, frequency, wave: 'triangle', attack: 0.004, decay: 0.19, release: 0.035, loop: true,
        });
        synth_1.addTone(buffer, sampleRate, {
            start, duration: 0.58, gain: 0.026, frequency: frequency / 2, wave: 'sine', attack: 0.006, decay: 0.24, release: 0.04, loop: true,
        });
    }
    /** Render the complete, seamless mono BGM loop at the requested sample rate. */
    function renderBgm(sampleRate) {
        if (!Number.isFinite(sampleRate) || sampleRate < 1000)
            throw new RangeError('sampleRate must be at least 1000 Hz');
        const length = Math.max(1, Math.round(BGM_LOOP_SECONDS * sampleRate));
        const buffer = new Float32Array(length);
        const random = synth_1.createNoise(synth_1.seedFromString('stack-bgm-v1'));
        for (let bar = 0; bar < BGM_BARS; bar++) {
            const barStart = bar * BGM_BAR_SECONDS;
            const root = BASS_ROOTS[bar];
            addBass(buffer, sampleRate, barStart, root);
            if (bar % 2 === 0) {
                synth_1.addTone(buffer, sampleRate, {
                    start: barStart, duration: BGM_BAR_SECONDS * 2, gain: 0.014, frequency: noteFrequency(root),
                    wave: 'sine', attack: 0.36, release: 0.4, loop: true,
                });
                synth_1.addTone(buffer, sampleRate, {
                    start: barStart, duration: BGM_BAR_SECONDS * 2, gain: 0.009, frequency: noteFrequency(root) * 1.5,
                    wave: 'triangle', attack: 0.42, release: 0.45, loop: true,
                });
            }
            addDrum(buffer, sampleRate, barStart, 0.135);
            addDrum(buffer, sampleRate, barStart + BGM_BEAT_SECONDS * 2, 0.088);
            if (bar % 4 === 3)
                addDrum(buffer, sampleRate, barStart + BGM_BEAT_SECONDS * 3.5, 0.064);
            if (bar % 2 === 0)
                addCymbal(buffer, sampleRate, barStart + BGM_BEAT_SECONDS * 3, 0.042);
            else
                addCymbal(buffer, sampleRate, barStart + BGM_BEAT_SECONDS * 2.5, 0.034);
            for (let beat = 0; beat < BGM_BEATS_PER_BAR; beat++) {
                addWoodblock(buffer, sampleRate, barStart + beat * BGM_BEAT_SECONDS, beat % 2 === 1, beat % 2 === 0 ? 0.031 : 0.021);
            }
            if (bar % 2 === 1)
                addWoodblock(buffer, sampleRate, barStart + BGM_BEAT_SECONDS * 3.5, true, 0.017);
            if (bar % 4 === 0 || bar === BGM_BARS - 1)
                addGong(buffer, sampleRate, barStart, 0.075);
        }
        for (const note of BGM_MELODY) {
            const start = (note.bar - 1) * BGM_BAR_SECONDS + note.beat * BGM_BEAT_SECONDS;
            const duration = note.beats * BGM_BEAT_SECONDS * 0.94;
            addSuonaNote(buffer, sampleRate, start, duration, note.note, note.slide === true, random);
        }
        synth_1.addEcho(buffer, sampleRate, 0.115, 0.16, true);
        synth_1.addEcho(buffer, sampleRate, 0.193, 0.085, true);
        synth_1.matchLoopSeam(buffer);
        synth_1.normalizePeak(buffer, 0.32);
        synth_1.fadeEdges(buffer, sampleRate, 0.002, 0.002);
        return buffer;
    }
    exports_1("renderBgm", renderBgm);
    return {
        setters: [
            function (synth_1_1) {
                synth_1 = synth_1_1;
            }
        ],
        execute: function () {
            /**
             * Original 16-bar festive folk loop in D gong pentatonic (宫商角徵羽 = D E F# A B).
             * 104 BPM, 4/4, so one loop is 36.92 seconds. The melody below was composed for this
             * project; it is not quoted from, or a variation of, any existing tune.
             *
             * Form:
             *   bars 1-2  引子    gong/drum call, rising suona pickup
             *   bars 3-6  A 段    main theme, phrase answers on the second half of each pair
             *   bars 7-10 A' 段   higher answer with a longer, stepwise release
             *   bars 11-14 B 段   contrast section, repeated-note percussion and a rising climax
             *   bars 15-16 尾声   descending cadence on D, final gong wraps into the loop head
             */
            exports_1("BGM_BPM", BGM_BPM = 104);
            exports_1("BGM_BEATS_PER_BAR", BGM_BEATS_PER_BAR = 4);
            exports_1("BGM_BARS", BGM_BARS = 16);
            exports_1("BGM_BEAT_SECONDS", BGM_BEAT_SECONDS = 60 / BGM_BPM);
            exports_1("BGM_BAR_SECONDS", BGM_BAR_SECONDS = BGM_BEATS_PER_BAR * BGM_BEAT_SECONDS);
            exports_1("BGM_LOOP_SECONDS", BGM_LOOP_SECONDS = BGM_BARS * BGM_BAR_SECONDS);
            exports_1("BGM_SCALE", BGM_SCALE = 'D 宫五声：D E F# A B（宫商角徵羽）');
            exports_1("BGM_FORM", BGM_FORM = [
                { bars: '1-2', name: '引子', text: '锣鼓开场，唢呐从徵音上行到羽音，落回宫音' },
                { bars: '3-6', name: 'A 段', text: '主句从高音宫起，第二句逐级下行落徵' },
                { bars: '7-10', name: "A' 段", text: '提高五度再唱一次，句尾拉长并回宫' },
                { bars: '11-14', name: 'B 段', text: '节奏加密，梆子与鼓点推动，旋律冲到高音羽' },
                { bars: '15-16', name: '尾声', text: '羽—徵—角—宫收束，锣声余音卷入循环开头' },
            ]);
            /** Every melody note, written out for review. */
            exports_1("BGM_MELODY", BGM_MELODY = [
                { bar: 1, beat: 0, beats: 0.5, note: 'A4' },
                { bar: 1, beat: 0.5, beats: 0.5, note: 'B4' },
                { bar: 1, beat: 1, beats: 0.5, note: 'A4' },
                { bar: 1, beat: 1.5, beats: 0.5, note: 'F#4' },
                { bar: 1, beat: 2, beats: 1, note: 'E4' },
                { bar: 1, beat: 3, beats: 1, note: 'D4' },
                { bar: 2, beat: 0, beats: 0.5, note: 'D4' },
                { bar: 2, beat: 0.5, beats: 0.5, note: 'E4' },
                { bar: 2, beat: 1, beats: 1, note: 'F#4' },
                { bar: 2, beat: 2, beats: 1, note: 'A4' },
                { bar: 2, beat: 3, beats: 1, note: 'B4' },
                { bar: 3, beat: 0, beats: 0.5, note: 'D5', slide: true },
                { bar: 3, beat: 0.5, beats: 0.5, note: 'E5' },
                { bar: 3, beat: 1, beats: 1, note: 'F#5' },
                { bar: 3, beat: 2, beats: 0.5, note: 'E5' },
                { bar: 3, beat: 2.5, beats: 0.5, note: 'D5' },
                { bar: 3, beat: 3, beats: 1, note: 'B4' },
                { bar: 4, beat: 0, beats: 0.5, note: 'A4' },
                { bar: 4, beat: 0.5, beats: 0.5, note: 'B4' },
                { bar: 4, beat: 1, beats: 1, note: 'D5' },
                { bar: 4, beat: 2, beats: 0.5, note: 'B4' },
                { bar: 4, beat: 2.5, beats: 0.5, note: 'A4' },
                { bar: 4, beat: 3, beats: 1, note: 'F#4' },
                { bar: 5, beat: 0, beats: 0.5, note: 'D5' },
                { bar: 5, beat: 0.5, beats: 0.5, note: 'F#5' },
                { bar: 5, beat: 1, beats: 1, note: 'A5' },
                { bar: 5, beat: 2, beats: 0.5, note: 'F#5' },
                { bar: 5, beat: 2.5, beats: 0.5, note: 'E5' },
                { bar: 5, beat: 3, beats: 1, note: 'D5' },
                { bar: 6, beat: 0, beats: 1, note: 'E5' },
                { bar: 6, beat: 1, beats: 0.5, note: 'D5' },
                { bar: 6, beat: 1.5, beats: 0.5, note: 'B4' },
                { bar: 6, beat: 2, beats: 1, note: 'A4' },
                { bar: 6, beat: 3, beats: 1, note: 'D4' },
                { bar: 7, beat: 0, beats: 0.5, note: 'F#5', slide: true },
                { bar: 7, beat: 0.5, beats: 0.5, note: 'A5' },
                { bar: 7, beat: 1, beats: 1, note: 'B5' },
                { bar: 7, beat: 2, beats: 0.5, note: 'A5' },
                { bar: 7, beat: 2.5, beats: 0.5, note: 'F#5' },
                { bar: 7, beat: 3, beats: 1, note: 'E5' },
                { bar: 8, beat: 0, beats: 0.5, note: 'D5' },
                { bar: 8, beat: 0.5, beats: 0.5, note: 'E5' },
                { bar: 8, beat: 1, beats: 1, note: 'F#5' },
                { bar: 8, beat: 2, beats: 0.5, note: 'A5' },
                { bar: 8, beat: 2.5, beats: 0.5, note: 'F#5' },
                { bar: 8, beat: 3, beats: 1, note: 'E5' },
                { bar: 9, beat: 0, beats: 0.75, note: 'D5' },
                { bar: 9, beat: 0.75, beats: 0.25, note: 'E5' },
                { bar: 9, beat: 1, beats: 0.5, note: 'F#5' },
                { bar: 9, beat: 1.5, beats: 0.5, note: 'E5' },
                { bar: 9, beat: 2, beats: 0.5, note: 'D5' },
                { bar: 9, beat: 2.5, beats: 0.5, note: 'B4' },
                { bar: 9, beat: 3, beats: 1, note: 'A4' },
                { bar: 10, beat: 0, beats: 0.5, note: 'B4' },
                { bar: 10, beat: 0.5, beats: 0.5, note: 'A4' },
                { bar: 10, beat: 1, beats: 1, note: 'F#4' },
                { bar: 10, beat: 2, beats: 0.5, note: 'E4' },
                { bar: 10, beat: 2.5, beats: 0.5, note: 'D4' },
                { bar: 10, beat: 3, beats: 1, note: 'D4' },
                { bar: 11, beat: 0, beats: 0.5, note: 'A4', slide: true },
                { bar: 11, beat: 0.5, beats: 0.5, note: 'B4' },
                { bar: 11, beat: 1, beats: 1, note: 'D5' },
                { bar: 11, beat: 2, beats: 1, note: 'E5' },
                { bar: 11, beat: 3, beats: 1, note: 'D5' },
                { bar: 12, beat: 0, beats: 0.5, note: 'B4' },
                { bar: 12, beat: 0.5, beats: 0.5, note: 'D5' },
                { bar: 12, beat: 1, beats: 1, note: 'E5' },
                { bar: 12, beat: 2, beats: 1, note: 'F#5' },
                { bar: 12, beat: 3, beats: 1, note: 'E5' },
                { bar: 13, beat: 0, beats: 1, note: 'A5' },
                { bar: 13, beat: 1, beats: 0.5, note: 'F#5' },
                { bar: 13, beat: 1.5, beats: 0.5, note: 'E5' },
                { bar: 13, beat: 2, beats: 1, note: 'D5' },
                { bar: 13, beat: 3, beats: 1, note: 'B4' },
                { bar: 14, beat: 0, beats: 0.5, note: 'A4' },
                { bar: 14, beat: 0.5, beats: 0.5, note: 'B4' },
                { bar: 14, beat: 1, beats: 0.5, note: 'D5' },
                { bar: 14, beat: 1.5, beats: 0.5, note: 'E5' },
                { bar: 14, beat: 2, beats: 1, note: 'F#5' },
                { bar: 14, beat: 3, beats: 1, note: 'A5' },
                { bar: 15, beat: 0, beats: 0.5, note: 'B5', slide: true },
                { bar: 15, beat: 0.5, beats: 0.5, note: 'A5' },
                { bar: 15, beat: 1, beats: 1, note: 'F#5' },
                { bar: 15, beat: 2, beats: 1, note: 'E5' },
                { bar: 15, beat: 3, beats: 1, note: 'D5' },
                { bar: 16, beat: 0, beats: 0.5, note: 'E5' },
                { bar: 16, beat: 0.5, beats: 0.5, note: 'D5' },
                { bar: 16, beat: 1, beats: 1, note: 'B4' },
                { bar: 16, beat: 2, beats: 2, note: 'D5' },
            ]);
            BASS_ROOTS = ['D2', 'A2', 'D2', 'A2', 'D2', 'A2', 'D3', 'A2', 'D3', 'A2', 'B2', 'A2', 'D3', 'A2', 'D3', 'D2'];
        }
    };
});

System.register("chunks:///_virtual/stack-sfx.ts", ["./synth.ts"], function (exports_1, context_1) {
    "use strict";
    var synth_1, STACK_SFX_EVENTS, SFX_DURATIONS, SFX_PEAKS;
    var __moduleName = context_1 && context_1.id;
    function comboFrequency(level) {
        const safeLevel = synth_1.clamp(Math.round(level || 1), 1, 8);
        return 523.251 * Math.pow(2, ((safeLevel - 1) * 2) / 12);
    }
    exports_1("comboFrequency", comboFrequency);
    function addTap(buffer, sampleRate) {
        synth_1.addTone(buffer, sampleRate, {
            start: 0.004, duration: 0.075, gain: 0.3, frequency: 980, endFrequency: 660,
            wave: 'triangle', attack: 0.001, decay: 0.031, release: 0.012,
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.004, duration: 0.055, gain: 0.12, frequency: 1580, endFrequency: 1060,
            wave: 'sine', attack: 0.001, decay: 0.018, release: 0.01,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.004, duration: 0.025, gain: 0.13, seed: synth_1.seedFromString('sfx-tap-wood'),
            attack: 0.001, decay: 0.007, release: 0.004,
            filter: { kind: 'bandpass', frequency: 3000, q: 1.2, mix: 1 },
        });
    }
    function addFly(buffer, sampleRate) {
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.01, duration: 0.18, gain: 0.2, seed: synth_1.seedFromString('sfx-fly-air'),
            attack: 0.018, release: 0.05,
            filter: { kind: 'bandpass', frequency: 480, q: 0.9, mix: 0.95 },
            filterEndFrequency: 2600,
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.01, duration: 0.17, gain: 0.12, frequency: 330, endFrequency: 760,
            wave: 'sine', attack: 0.014, release: 0.04,
        });
    }
    function addPack(buffer, sampleRate) {
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.002, duration: 0.08, gain: 0.18, seed: synth_1.seedFromString('sfx-pack-tape'),
            attack: 0.001, decay: 0.02, release: 0.01,
            filter: { kind: 'bandpass', frequency: 2600, q: 1.1, mix: 1 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.006, duration: 0.18, gain: 0.3, frequency: 172, endFrequency: 68,
            wave: 'sine', attack: 0.002, decay: 0.063, release: 0.03,
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.15, duration: 0.2, gain: 0.12, frequency: 1046.5, wave: 'triangle',
            attack: 0.002, decay: 0.07, release: 0.035,
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.155, duration: 0.17, gain: 0.065, frequency: 1568, wave: 'sine',
            attack: 0.002, decay: 0.06, release: 0.03,
        });
    }
    function addCombo(buffer, sampleRate, level) {
        const frequency = comboFrequency(level);
        synth_1.addTone(buffer, sampleRate, {
            start: 0.003, duration: 0.3, gain: 0.36, frequency, endFrequency: frequency * 1.012,
            glideSeconds: 0.055, wave: 'sine', attack: 0.003, decay: 0.17, release: 0.065,
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.003, duration: 0.2, gain: 0.018, frequency: frequency * 3, wave: 'sine',
            attack: 0.003, decay: 0.09, release: 0.04,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.0, duration: 0.014, gain: 0.025, seed: synth_1.seedFromString(`sfx-combo-${level}`),
            attack: 0.001, decay: 0.004, release: 0.003,
            filter: { kind: 'highpass', frequency: 4500, q: 0.8, mix: 1 },
        });
    }
    function addWarn(buffer, sampleRate) {
        const notes = [880, 880, 740];
        for (let index = 0; index < notes.length; index++) {
            const start = index * 0.19;
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 0.11, gain: 0.16, frequency: notes[index], wave: 'square',
                attack: 0.004, release: 0.025,
                filter: { kind: 'lowpass', frequency: 2200, q: 0.9, mix: 0.75 },
            });
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 0.1, gain: 0.055, frequency: notes[index] * 2, wave: 'sine',
                attack: 0.003, release: 0.02,
            });
        }
        synth_1.addTone(buffer, sampleRate, {
            start: 0.41, duration: 0.16, gain: 0.1, frequency: 185, wave: 'sine',
            attack: 0.006, decay: 0.06, release: 0.04,
        });
    }
    function addMom(buffer, sampleRate) {
        synth_1.addTone(buffer, sampleRate, {
            start: 0.01, duration: 0.22, gain: 0.19, frequency: 440, wave: 'triangle',
            attack: 0.01, release: 0.05, vibratoRate: 4.8, vibratoCents: 10, vibratoDelay: 0.04,
            filter: { kind: 'bandpass', frequency: 1200, q: 1.1, mix: 0.35 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.15, duration: 0.3, gain: 0.16, frequency: 587.33, wave: 'triangle',
            attack: 0.012, release: 0.06, vibratoRate: 5.1, vibratoCents: 8, vibratoDelay: 0.05,
            filter: { kind: 'bandpass', frequency: 1350, q: 1.0, mix: 0.35 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.15, duration: 0.27, gain: 0.06, frequency: 880, wave: 'sine',
            attack: 0.012, release: 0.06,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.0, duration: 0.06, gain: 0.035, seed: synth_1.seedFromString('sfx-mom-knock'),
            attack: 0.001, decay: 0.015, release: 0.01,
            filter: { kind: 'bandpass', frequency: 1900, q: 0.9, mix: 1 },
        });
    }
    function addSwap(buffer, sampleRate) {
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.0, duration: 0.17, gain: 0.16, seed: synth_1.seedFromString('sfx-swap-air'),
            attack: 0.006, release: 0.045,
            filter: { kind: 'bandpass', frequency: 2100, q: 0.85, mix: 0.95 },
            filterEndFrequency: 520,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.12, duration: 0.035, gain: 0.12, seed: synth_1.seedFromString('sfx-swap-click'),
            attack: 0.001, decay: 0.009, release: 0.006,
            filter: { kind: 'bandpass', frequency: 1800, q: 1.3, mix: 1 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.12, duration: 0.1, gain: 0.085, frequency: 320, endFrequency: 176,
            wave: 'square', attack: 0.001, decay: 0.03, release: 0.018,
            filter: { kind: 'lowpass', frequency: 1500, q: 0.8, mix: 0.7 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.16, duration: 0.17, gain: 0.18, frequency: 142, endFrequency: 63,
            wave: 'sine', attack: 0.002, decay: 0.055, release: 0.03,
        });
    }
    function addGongOpening(buffer, sampleRate) {
        const ratios = [1, 1.49, 2.13, 2.79, 4.03];
        const levels = [1, 0.58, 0.38, 0.24, 0.13];
        for (let index = 0; index < ratios.length; index++) {
            synth_1.addTone(buffer, sampleRate, {
                start: 0.0, duration: 1.9, gain: 0.075 * levels[index], frequency: 118 * ratios[index],
                wave: 'sine', attack: 0.004, decay: 0.72 / (index * 0.22 + 1), release: 0.08,
            });
        }
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.0, duration: 0.2, gain: 0.055, seed: synth_1.seedFromString('sfx-win-gong'),
            attack: 0.001, decay: 0.04, release: 0.02,
            filter: { kind: 'bandpass', frequency: 3400, q: 0.72, mix: 0.9 },
        });
    }
    function addFirecrackers(buffer, sampleRate) {
        const random = synth_1.createNoise(synth_1.seedFromString('sfx-win-firecrackers-v1'));
        for (let index = 0; index < 34; index++) {
            const start = 0.3 + random() * 1.72;
            const duration = 0.02 + random() * 0.045;
            const frequency = 1300 + random() * 4300;
            const gain = 0.1 + random() * 0.11;
            synth_1.addNoise(buffer, sampleRate, {
                start, duration, gain, seed: Math.floor(random() * 0xffffffff),
                attack: 0.001, decay: 0.009 + random() * 0.008, release: 0.007,
                filter: { kind: 'bandpass', frequency, q: 0.75 + random() * 0.6, mix: 0.95 },
            });
            if (random() < 0.34) {
                synth_1.addTone(buffer, sampleRate, {
                    start, duration: 0.055, gain: 0.045 + random() * 0.035, frequency: 92 + random() * 95,
                    wave: 'sine', attack: 0.001, decay: 0.018, release: 0.012,
                });
            }
        }
        synth_1.addNoise(buffer, sampleRate, {
            start: 2.01, duration: 0.25, gain: 0.15, seed: synth_1.seedFromString('sfx-win-final-cymbal'),
            attack: 0.001, decay: 0.085, release: 0.04,
            filter: { kind: 'highpass', frequency: 4300, q: 0.8, mix: 1 },
        });
    }
    function addWin(buffer, sampleRate) {
        addGongOpening(buffer, sampleRate);
        const notes = [587.33, 739.99, 880, 1174.66];
        for (let index = 0; index < notes.length; index++) {
            const start = index * 0.12;
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 0.23, gain: 0.13, frequency: notes[index], wave: 'sawtooth',
                attack: 0.005, decay: 0.09, release: 0.05,
                filter: { kind: 'bandpass', frequency: 1600, q: 0.9, mix: 0.7 },
            });
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 0.2, gain: 0.04, frequency: notes[index] * 2, wave: 'sine',
                attack: 0.004, decay: 0.075, release: 0.04,
            });
        }
        addFirecrackers(buffer, sampleRate);
    }
    /** Finale at home: a long string of firecrackers, two gongs and a rising festive phrase. */
    function addHome(buffer, sampleRate) {
        const random = synth_1.createNoise(synth_1.seedFromString('sfx-home-firecracker-string-v1'));
        for (let index = 0; index < 120; index++) {
            // Denser in the middle, like a hanging string burning down.
            const start = 0.05 + Math.pow(random(), 0.9) * 3.1;
            const duration = 0.018 + random() * 0.04;
            synth_1.addNoise(buffer, sampleRate, {
                start, duration, gain: 0.08 + random() * 0.12, seed: Math.floor(random() * 0xffffffff),
                attack: 0.001, decay: 0.008 + random() * 0.01, release: 0.006,
                filter: { kind: 'bandpass', frequency: 1200 + random() * 4800, q: 0.7 + random() * 0.7, mix: 0.95 },
            });
            if (random() < 0.3) {
                synth_1.addTone(buffer, sampleRate, {
                    start, duration: 0.06, gain: 0.05 + random() * 0.04, frequency: 80 + random() * 110,
                    wave: 'sine', attack: 0.001, decay: 0.02, release: 0.012,
                });
            }
        }
        for (const start of [0.0, 1.6]) {
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 1.4, gain: 0.16, frequency: 196, endFrequency: 185,
                wave: 'triangle', attack: 0.004, decay: 0.6, release: 0.4,
            });
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 1.2, gain: 0.07, frequency: 523.25, endFrequency: 498,
                wave: 'sine', attack: 0.003, decay: 0.5, release: 0.3,
            });
        }
        const phrase = [587.33, 659.25, 783.99, 880, 1046.5, 880, 1174.66];
        for (let index = 0; index < phrase.length; index++) {
            synth_1.addTone(buffer, sampleRate, {
                start: 0.45 + index * 0.17, duration: index === phrase.length - 1 ? 0.6 : 0.2, gain: 0.12,
                frequency: phrase[index], wave: 'sawtooth', attack: 0.006, decay: 0.08, release: 0.06,
                filter: { kind: 'bandpass', frequency: 1700, q: 0.9, mix: 0.7 },
            });
        }
        synth_1.addNoise(buffer, sampleRate, {
            start: 3.2, duration: 0.3, gain: 0.16, seed: synth_1.seedFromString('sfx-home-final-bang'),
            attack: 0.001, decay: 0.09, release: 0.05,
            filter: { kind: 'lowpass', frequency: 900, q: 0.8, mix: 1 },
        });
    }
    function addFail(buffer, sampleRate) {
        synth_1.addTone(buffer, sampleRate, {
            start: 0.0, duration: 0.58, gain: 0.16, frequency: 392, endFrequency: 196,
            wave: 'sawtooth', attack: 0.01, release: 0.12,
            filter: { kind: 'lowpass', frequency: 1350, q: 0.9, mix: 0.7 },
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.04, duration: 0.76, gain: 0.12, frequency: 293.66, endFrequency: 146.83,
            wave: 'triangle', attack: 0.012, release: 0.16,
        });
        synth_1.addTone(buffer, sampleRate, {
            start: 0.08, duration: 0.7, gain: 0.16, frequency: 110, endFrequency: 55,
            wave: 'sine', attack: 0.008, decay: 0.33, release: 0.12,
        });
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.0, duration: 0.22, gain: 0.08, seed: synth_1.seedFromString('sfx-fail-thud'),
            attack: 0.002, decay: 0.05, release: 0.03,
            filter: { kind: 'lowpass', frequency: 520, q: 0.8, mix: 1 },
        });
    }
    function addProp(buffer, sampleRate) {
        const notes = [587.33, 739.99, 880, 1174.66];
        for (let index = 0; index < notes.length; index++) {
            const start = index * 0.075;
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 0.3, gain: 0.115, frequency: notes[index], wave: 'sine',
                attack: 0.003, decay: 0.12, release: 0.06,
            });
            synth_1.addTone(buffer, sampleRate, {
                start, duration: 0.2, gain: 0.03, frequency: notes[index] * 2.01, wave: 'sine',
                attack: 0.002, decay: 0.075, release: 0.04,
            });
        }
        synth_1.addNoise(buffer, sampleRate, {
            start: 0.02, duration: 0.3, gain: 0.045, seed: synth_1.seedFromString('sfx-prop-shimmer'),
            attack: 0.02, decay: 0.11, release: 0.08,
            filter: { kind: 'bandpass', frequency: 4800, q: 1.3, mix: 0.9 },
            filterEndFrequency: 7200,
        });
    }
    /** Render one deterministic mono sound effect. Peak is always <= 0.6. */
    function renderSfx(event, sampleRate, options = {}) {
        var _a;
        if (!Number.isFinite(sampleRate) || sampleRate < 1000)
            throw new RangeError('sampleRate must be at least 1000 Hz');
        if (!(event in SFX_DURATIONS))
            throw new RangeError(`Unknown sfx event: ${String(event)}`);
        const duration = SFX_DURATIONS[event];
        const buffer = new Float32Array(Math.max(1, Math.round(duration * sampleRate)));
        switch (event) {
            case 'tap':
                addTap(buffer, sampleRate);
                break;
            case 'fly':
                addFly(buffer, sampleRate);
                break;
            case 'pack':
                addPack(buffer, sampleRate);
                break;
            case 'combo':
                addCombo(buffer, sampleRate, (_a = options.level) !== null && _a !== void 0 ? _a : 1);
                break;
            case 'warn':
                addWarn(buffer, sampleRate);
                break;
            case 'mom':
                addMom(buffer, sampleRate);
                break;
            case 'swap':
                addSwap(buffer, sampleRate);
                break;
            case 'win':
                addWin(buffer, sampleRate);
                break;
            case 'fail':
                addFail(buffer, sampleRate);
                break;
            case 'prop':
                addProp(buffer, sampleRate);
                break;
            case 'home':
                addHome(buffer, sampleRate);
                break;
        }
        synth_1.fadeEdges(buffer, sampleRate, 0.0015, event === 'win' || event === 'home' ? 0.03 : 0.012);
        synth_1.normalizePeak(buffer, SFX_PEAKS[event]);
        return buffer;
    }
    exports_1("renderSfx", renderSfx);
    return {
        setters: [
            function (synth_1_1) {
                synth_1 = synth_1_1;
            }
        ],
        execute: function () {
            exports_1("STACK_SFX_EVENTS", STACK_SFX_EVENTS = [
                'tap', 'fly', 'pack', 'combo', 'warn', 'mom', 'swap', 'win', 'fail', 'prop', 'home',
            ]);
            exports_1("SFX_DURATIONS", SFX_DURATIONS = {
                tap: 0.12,
                fly: 0.22,
                pack: 0.36,
                combo: 0.34,
                warn: 0.62,
                mom: 0.55,
                swap: 0.32,
                win: 2.3,
                fail: 0.9,
                prop: 0.6,
                home: 3.6,
            });
            SFX_PEAKS = {
                tap: 0.38,
                fly: 0.42,
                pack: 0.52,
                combo: 0.48,
                warn: 0.5,
                mom: 0.46,
                swap: 0.46,
                win: 0.58,
                fail: 0.52,
                prop: 0.46,
                home: 0.58,
            };
        }
    };
});

/** Pure TypeScript DSP helpers shared by the synthesized music and SFX renderers. */
System.register("chunks:///_virtual/synth.ts", [], function (exports_1, context_1) {
    "use strict";
    var TAU, Biquad;
    var __moduleName = context_1 && context_1.id;
    function clamp(value, minimum, maximum) {
        return Math.min(maximum, Math.max(minimum, value));
    }
    exports_1("clamp", clamp);
    /** Deterministic 32-bit PRNG (mulberry32). Same seed always gives the same stream. */
    function createNoise(seed) {
        let state = seed >>> 0;
        return () => {
            state = (state + 0x6D2B79F5) >>> 0;
            let value = state;
            value = Math.imul(value ^ (value >>> 15), value | 1);
            value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
            return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
        };
    }
    exports_1("createNoise", createNoise);
    function seedFromString(text) {
        let hash = 2166136261;
        for (let index = 0; index < text.length; index++) {
            hash ^= text.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }
    exports_1("seedFromString", seedFromString);
    function midiToFrequency(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }
    exports_1("midiToFrequency", midiToFrequency);
    function noteToMidi(note) {
        const match = /^([A-G]#?)(-?\d)$/.exec(note);
        if (!match)
            throw new RangeError(`Invalid note: ${note}`);
        const semitones = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
        return (Number(match[2]) + 1) * 12 + semitones[match[1]];
    }
    exports_1("noteToMidi", noteToMidi);
    function waveform(wave, phase) {
        const sine = Math.sin(phase);
        if (wave === 'sine')
            return sine;
        if (wave === 'square')
            return sine >= 0 ? 1 : -1;
        const position = (phase / TAU) % 1;
        if (wave === 'sawtooth')
            return position * 2 - 1;
        return 2 * Math.abs(position * 2 - 1) - 1;
    }
    function addAt(target, index, value, loop) {
        if (loop) {
            const length = target.length;
            target[((index % length) + length) % length] += value;
        }
        else if (index >= 0 && index < target.length) {
            target[index] += value;
        }
    }
    function envelope(t, duration, attack, release, decay) {
        const attackGain = attack > 0 ? Math.min(1, t / attack) : 1;
        const releaseGain = release > 0 ? Math.min(1, Math.max(0, duration - t) / release) : 1;
        const body = decay > 0 ? Math.exp(-t / decay) : 1;
        return attackGain * releaseGain * body;
    }
    function addTone(target, sampleRate, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!(options.duration > 0) || !(options.gain > 0) || !Number.isFinite(options.frequency))
            return;
        const loop = options.loop === true;
        const startIndex = Math.round(options.start * sampleRate);
        if (!loop && startIndex >= target.length)
            return;
        const wanted = Math.max(1, Math.round(options.duration * sampleRate));
        const count = loop ? wanted : Math.max(0, Math.min(wanted, target.length - startIndex));
        if (count <= 0)
            return;
        const attack = clamp((_a = options.attack) !== null && _a !== void 0 ? _a : 0.004, 0.0001, options.duration);
        const release = clamp((_b = options.release) !== null && _b !== void 0 ? _b : 0.02, 0, options.duration);
        const decay = Math.max(0, (_c = options.decay) !== null && _c !== void 0 ? _c : 0);
        const wave = (_d = options.wave) !== null && _d !== void 0 ? _d : 'sine';
        const glideDuration = options.endFrequency && options.endFrequency > 0
            ? clamp((_e = options.glideSeconds) !== null && _e !== void 0 ? _e : options.duration, 0.0001, options.duration)
            : 0;
        const vibratoRate = Math.max(0, (_f = options.vibratoRate) !== null && _f !== void 0 ? _f : 0);
        const vibratoCents = Math.max(0, (_g = options.vibratoCents) !== null && _g !== void 0 ? _g : 0);
        const vibratoDelay = Math.max(0, (_h = options.vibratoDelay) !== null && _h !== void 0 ? _h : 0);
        const filter = options.filter ? new Biquad(options.filter.kind, options.filter.frequency, (_j = options.filter.q) !== null && _j !== void 0 ? _j : 1, sampleRate) : undefined;
        const filterMix = clamp((_l = (_k = options.filter) === null || _k === void 0 ? void 0 : _k.mix) !== null && _l !== void 0 ? _l : 1, 0, 1);
        let phase = ((_m = options.phaseOffset) !== null && _m !== void 0 ? _m : 0) * TAU;
        for (let index = 0; index < count; index++) {
            const t = index / sampleRate;
            let frequency = options.frequency;
            if (glideDuration > 0 && options.endFrequency) {
                const glide = Math.min(1, t / glideDuration);
                frequency *= Math.pow(options.endFrequency / options.frequency, glide);
            }
            if (vibratoCents > 0 && t >= vibratoDelay) {
                frequency *= Math.pow(2, (vibratoCents * Math.sin(TAU * vibratoRate * (t - vibratoDelay))) / 1200);
            }
            phase += (TAU * frequency) / sampleRate;
            let sample = waveform(wave, phase) * envelope(t, options.duration, attack, release, decay);
            if (filter)
                sample = sample * (1 - filterMix) + filter.process(sample) * filterMix;
            addAt(target, startIndex + index, sample * options.gain, loop);
        }
    }
    exports_1("addTone", addTone);
    function addNoise(target, sampleRate, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!(options.duration > 0) || !(options.gain > 0))
            return;
        const loop = options.loop === true;
        const startIndex = Math.round(options.start * sampleRate);
        if (!loop && startIndex >= target.length)
            return;
        const wanted = Math.max(1, Math.round(options.duration * sampleRate));
        const count = loop ? wanted : Math.max(0, Math.min(wanted, target.length - startIndex));
        if (count <= 0)
            return;
        const random = createNoise(options.seed);
        const attack = clamp((_a = options.attack) !== null && _a !== void 0 ? _a : 0.002, 0.0001, options.duration);
        const release = clamp((_b = options.release) !== null && _b !== void 0 ? _b : 0.012, 0, options.duration);
        const decay = Math.max(0, (_c = options.decay) !== null && _c !== void 0 ? _c : 0);
        const filter = options.filter ? new Biquad(options.filter.kind, options.filter.frequency, (_d = options.filter.q) !== null && _d !== void 0 ? _d : 1, sampleRate) : undefined;
        const filterMix = clamp((_f = (_e = options.filter) === null || _e === void 0 ? void 0 : _e.mix) !== null && _f !== void 0 ? _f : 1, 0, 1);
        const startFrequency = (_h = (_g = options.filter) === null || _g === void 0 ? void 0 : _g.frequency) !== null && _h !== void 0 ? _h : 1000;
        const endFrequency = (_j = options.filterEndFrequency) !== null && _j !== void 0 ? _j : startFrequency;
        let nextFilterUpdate = 0;
        for (let index = 0; index < count; index++) {
            const t = index / sampleRate;
            if (filter && options.filter && index >= nextFilterUpdate) {
                const sweep = Math.min(1, index / Math.max(1, count - 1));
                filter.set(options.filter.kind, startFrequency * Math.pow(endFrequency / startFrequency, sweep), (_k = options.filter.q) !== null && _k !== void 0 ? _k : 1, sampleRate);
                nextFilterUpdate = index + 32;
            }
            let sample = (random() * 2 - 1) * envelope(t, options.duration, attack, release, decay);
            if (filter)
                sample = sample * (1 - filterMix) + filter.process(sample) * filterMix;
            addAt(target, startIndex + index, sample * options.gain, loop);
        }
    }
    exports_1("addNoise", addNoise);
    /** One-tap echo; the dry copy is used as the source so the delay cannot run away. */
    function addEcho(target, sampleRate, delaySeconds, mix, loop = false) {
        const length = target.length;
        const delay = Math.max(1, Math.round(delaySeconds * sampleRate));
        if (length === 0 || mix <= 0)
            return;
        const dry = target.slice();
        for (let index = 0; index < length; index++) {
            const source = index - delay;
            const wrapped = loop ? (source + length) % length : source;
            if (wrapped >= 0 && wrapped < length)
                target[index] += dry[wrapped] * mix;
        }
    }
    exports_1("addEcho", addEcho);
    /** Fade the very end into the first sample so a loop point is click-free. */
    function matchLoopSeam(target, samples = 128) {
        if (target.length < 2)
            return;
        const count = Math.min(samples, Math.floor(target.length / 4));
        if (count < 2)
            return;
        const delta = target[0] - target[target.length - 1];
        for (let index = 0; index < count; index++) {
            const position = (index + 1) / count;
            target[target.length - count + index] += delta * position * position;
        }
    }
    exports_1("matchLoopSeam", matchLoopSeam);
    /** Scale the whole buffer to an absolute peak. Returns the resulting peak. */
    function normalizePeak(target, peak) {
        if (!(peak > 0))
            return 0;
        let maximum = 0;
        for (let index = 0; index < target.length; index++)
            maximum = Math.max(maximum, Math.abs(target[index]));
        if (maximum <= 1e-9)
            return 0;
        const scale = peak / maximum;
        for (let index = 0; index < target.length; index++)
            target[index] *= scale;
        return peak;
    }
    exports_1("normalizePeak", normalizePeak);
    function fadeEdges(target, sampleRate, fadeInSeconds, fadeOutSeconds) {
        const length = target.length;
        const fadeIn = Math.min(length, Math.max(0, Math.round(fadeInSeconds * sampleRate)));
        for (let index = 0; index < fadeIn; index++) {
            target[index] *= fadeIn > 1 ? index / (fadeIn - 1) : 0;
        }
        const fadeOut = Math.min(length, Math.max(0, Math.round(fadeOutSeconds * sampleRate)));
        for (let index = 0; index < fadeOut; index++) {
            target[length - fadeOut + index] *= fadeOut > 1 ? (fadeOut - 1 - index) / (fadeOut - 1) : 0;
        }
    }
    exports_1("fadeEdges", fadeEdges);
    return {
        setters: [],
        execute: function () {/** Pure TypeScript DSP helpers shared by the synthesized music and SFX renderers. */
            TAU = Math.PI * 2;
            /** RBJ biquad; sufficient for the formant/noise shaping used by these cues. */
            Biquad = class Biquad {
                constructor(kind, frequency, q, sampleRate) {
                    this.b0 = 1;
                    this.b1 = 0;
                    this.b2 = 0;
                    this.a1 = 0;
                    this.a2 = 0;
                    this.x1 = 0;
                    this.x2 = 0;
                    this.y1 = 0;
                    this.y2 = 0;
                    this.set(kind, frequency, q, sampleRate);
                }
                set(kind, frequency, q, sampleRate) {
                    const nyquist = sampleRate * 0.45;
                    const cutoff = clamp(frequency, 20, Math.max(20, nyquist));
                    const resonance = clamp(q, 0.1, 20);
                    const omega = (TAU * cutoff) / sampleRate;
                    const cosine = Math.cos(omega);
                    const sine = Math.sin(omega);
                    const alpha = sine / (2 * resonance);
                    let b0 = 1;
                    let b1 = 0;
                    let b2 = 0;
                    let a0 = 1 + alpha;
                    let a1 = -2 * cosine;
                    let a2 = 1 - alpha;
                    if (kind === 'lowpass') {
                        b0 = (1 - cosine) / 2;
                        b1 = 1 - cosine;
                        b2 = b0;
                    }
                    else if (kind === 'highpass') {
                        b0 = (1 + cosine) / 2;
                        b1 = -(1 + cosine);
                        b2 = b0;
                    }
                    else {
                        b0 = alpha;
                        b1 = 0;
                        b2 = -alpha;
                    }
                    this.b0 = b0 / a0;
                    this.b1 = b1 / a0;
                    this.b2 = b2 / a0;
                    this.a1 = a1 / a0;
                    this.a2 = a2 / a0;
                }
                process(input) {
                    const output = this.b0 * input + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
                    this.x2 = this.x1;
                    this.x1 = input;
                    this.y2 = this.y1;
                    this.y1 = output;
                    return output;
                }
            };
            exports_1("Biquad", Biquad);
        }
    };
});

System.register("chunks:///_virtual/date.ts", ["./vehicles.ts"], function (exports_1, context_1) {
    "use strict";
    var vehicles_1;
    var __moduleName = context_1 && context_1.id;
    function shanghaiDate(time = new Date()) {
        const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(time);
        const get = (type) => { var _a; return (_a = parts.find(part => part.type === type)) === null || _a === void 0 ? void 0 : _a.value; };
        return `${get('year')}-${get('month')}-${get('day')}`;
    }
    exports_1("shanghaiDate", shanghaiDate);
    function vehicleForDate(date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
            throw new Error('invalid date');
        const time = Date.parse(date + 'T00:00:00Z');
        if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== date)
            throw new Error('invalid date');
        const days = (time - Date.UTC(2027, 0, 1)) / 86400000;
        return vehicles_1.VEHICLES[((days % 6) + 6) % 6];
    }
    exports_1("vehicleForDate", vehicleForDate);
    return {
        setters: [
            function (vehicles_1_1) {
                vehicles_1 = vehicles_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/dlx.ts", ["./shapes.ts"], function (exports_1, context_1) {
    "use strict";
    var shapes_1;
    var __moduleName = context_1 && context_1.id;
    function makeColumn() {
        const column = {};
        Object.assign(column, { left: column, right: column, up: column, down: column, column, size: 0 });
        return column;
    }
    function cover(column) {
        column.right.left = column.left;
        column.left.right = column.right;
        for (let row = column.down; row !== column; row = row.down) {
            for (let node = row.right; node !== row; node = node.right) {
                node.down.up = node.up;
                node.up.down = node.down;
                node.column.size--;
            }
        }
    }
    function uncover(column) {
        for (let row = column.up; row !== column; row = row.up) {
            for (let node = row.left; node !== row; node = node.left) {
                node.column.size++;
                node.down.up = node;
                node.up.down = node;
            }
        }
        column.right.left = column;
        column.left.right = column;
    }
    function solve(level, options) {
        var _a;
        if (!Number.isSafeInteger(options.maxSolutions) || options.maxSolutions < 1 ||
            !Number.isSafeInteger(options.maxNodes) || options.maxNodes < 1)
            throw new Error('invalid solver limits');
        const root = makeColumn();
        const cells = [];
        const blocked = new Set(level.blocked.map(([x, y]) => `${x},${y}`));
        let freeCells = 0;
        for (let y = 0; y < level.height; y++)
            for (let x = 0; x < level.width; x++) {
                if (blocked.has(`${x},${y}`))
                    continue;
                const column = makeColumn();
                column.left = root.left;
                column.right = root;
                root.left.right = column;
                root.left = column;
                cells[y * level.width + x] = column;
                freeCells++;
            }
        const pieces = [...level.pieces].sort((a, b) => a.id - b.id);
        if (new Set(pieces.map(piece => piece.id)).size !== pieces.length)
            throw new Error('duplicate piece id');
        const groups = new Map();
        let pieceArea = 0;
        for (const piece of pieces) {
            const group = (_a = groups.get(piece.shape)) !== null && _a !== void 0 ? _a : { column: makeColumn(), ids: [], remaining: 0 };
            group.ids.push(piece.id);
            group.remaining++;
            groups.set(piece.shape, group);
            pieceArea += shapes_1.SHAPES[piece.shape].length;
        }
        if (freeCells !== pieceArea) {
            return { solutionCount: 0, solutionCountCapped: false, nodesToFirst: 0, totalNodes: 0, nodeLimitReached: false };
        }
        // Interchangeable pieces share one secondary column with a placement quota.
        for (const [shape, group] of groups)
            for (const orientation of shapes_1.orientations(shape)) {
                for (let y = 0; y < level.height; y++)
                    for (let x = 0; x < level.width; x++) {
                        const columns = [group.column];
                        for (const [dx, dy] of orientation.cells) {
                            if (x + dx >= level.width || y + dy >= level.height)
                                break;
                            const cell = cells[(y + dy) * level.width + x + dx];
                            if (!cell)
                                break;
                            columns.push(cell);
                        }
                        if (columns.length !== orientation.cells.length + 1)
                            continue;
                        const row = { group, rotation: orientation.rotation, x, y };
                        let first;
                        for (const column of columns) {
                            const node = { column, row, up: column.up, down: column, left: column, right: column };
                            column.up.down = node;
                            column.up = node;
                            column.size++;
                            if (first) {
                                node.left = first.left;
                                node.right = first;
                                first.left.right = node;
                                first.left = node;
                            }
                            else {
                                first = node;
                                node.left = node;
                                node.right = node;
                            }
                        }
                    }
            }
        let solutionCount = 0, nodesToFirst = 0, totalNodes = 0;
        let firstSolution;
        let nodeLimitReached = false, solutionCountCapped = false;
        const chosen = [];
        const search = () => {
            if (root.right === root) {
                solutionCount++;
                if (!firstSolution) {
                    firstSolution = [];
                    for (const group of groups.values()) {
                        const ordered = chosen.filter(row => row.group === group).sort((a, b) => a.y - b.y || a.x - b.x);
                        ordered.forEach(({ x, y, rotation }, index) => firstSolution.push({ pieceId: group.ids[index], x, y, rotation }));
                    }
                    nodesToFirst = totalNodes;
                }
                if (solutionCount >= options.maxSolutions)
                    solutionCountCapped = true;
                return;
            }
            let column = root.right;
            for (let next = column.right; next !== root; next = next.right) {
                if (next.size < column.size)
                    column = next;
            }
            for (const group of groups.values()) {
                if (group.remaining > group.column.size)
                    return;
                if (group.remaining === 1 && group.column.size < column.size)
                    column = group.column;
            }
            if (column.size === 0)
                return;
            cover(column);
            for (let link = column.down; link !== column; link = link.down) {
                if (totalNodes >= options.maxNodes) {
                    nodeLimitReached = true;
                    break;
                }
                totalNodes++;
                const row = link.row;
                const group = row.group;
                group.remaining--;
                chosen.push(row);
                for (let node = link.right; node !== link; node = node.right) {
                    if (node.column !== group.column || group.remaining === 0)
                        cover(node.column);
                }
                search();
                for (let node = link.left; node !== link; node = node.left) {
                    if (node.column !== group.column || group.remaining === 0)
                        uncover(node.column);
                }
                chosen.pop();
                group.remaining++;
                if (nodeLimitReached || solutionCountCapped)
                    break;
            }
            uncover(column);
        };
        search();
        return { solutionCount, solutionCountCapped, nodesToFirst, totalNodes, firstSolution, nodeLimitReached };
    }
    exports_1("solve", solve);
    return {
        setters: [
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/generator.ts", ["./dlx.ts","./items.ts","./rng.ts","./shapes.ts"], function (exports_1, context_1) {
    "use strict";
    var dlx_1, items_1, rng_1, shapes_1;
    var __moduleName = context_1 && context_1.id;
    function generateLevel(template, cfg, seed) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const integerLimits = [cfg.minPieces, cfg.maxPieces, cfg.minSix, cfg.maxSix, cfg.maxSmall, (_a = cfg.maxSameShape) !== null && _a !== void 0 ? _a : 1, (_b = cfg.minSolutions) !== null && _b !== void 0 ? _b : 1, (_c = cfg.timeLimitSec) !== null && _c !== void 0 ? _c : 180, cfg.maxSolutions, cfg.minNodesToFirst, cfg.maxNodes, cfg.maxPartitionTries, cfg.maxAttempts];
        if (integerLimits.some(value => !Number.isSafeInteger(value) || value < 0) ||
            cfg.minPieces > cfg.maxPieces || cfg.minSix > cfg.maxSix ||
            (cfg.stage !== undefined && ![1, 2, 3].includes(cfg.stage)) ||
            (cfg.maxSameShape !== undefined && cfg.maxSameShape < 1) || ((_d = cfg.minSolutions) !== null && _d !== void 0 ? _d : 1) > cfg.maxSolutions || cfg.maxSolutions < 1 || cfg.maxNodes < 1 || cfg.maxPartitionTries < 1 || cfg.maxAttempts < 1 ||
            !Number.isFinite(cfg.minLargeFraction) || cfg.minLargeFraction < 0 || cfg.minLargeFraction > 1) {
            throw new Error('invalid generator configuration');
        }
        if (!Number.isSafeInteger(template.width) || !Number.isSafeInteger(template.height) ||
            template.width < 1 || template.height < 1 ||
            template.blocked.some(([x, y]) => !Number.isInteger(x) || !Number.isInteger(y) ||
                x < 0 || y < 0 || x >= template.width || y >= template.height) ||
            new Set(template.blocked.map(([x, y]) => `${x},${y}`)).size !== template.blocked.length) {
            throw new Error('invalid vehicle template');
        }
        const random = rng_1.createRng(seed);
        const blocked = new Set(template.blocked.map(([x, y]) => y * template.width + x));
        const usable = template.width * template.height - blocked.size;
        const board = {
            date: cfg.date, stage: (_e = cfg.stage) !== null && _e !== void 0 ? _e : 2, vehicle: template.id, width: template.width, height: template.height,
            blocked: template.blocked.map(([x, y]) => [x, y]), timeLimitSec: (_f = cfg.timeLimitSec) !== null && _f !== void 0 ? _f : 180,
        };
        const acceptableInventory = (shapes) => {
            const sizes = shapes.map(shape => shapes_1.SHAPES[shape].length);
            const six = sizes.filter(size => size === 6).length;
            const small = sizes.filter(size => size <= 3).length;
            return shapes.every(shape => { var _a; return shapes.filter(entry => entry === shape).length <= ((_a = cfg.maxSameShape) !== null && _a !== void 0 ? _a : Infinity); }) && shapes.length >= cfg.minPieces && shapes.length <= cfg.maxPieces &&
                six >= cfg.minSix && six <= cfg.maxSix && small <= cfg.maxSmall &&
                (shapes.length - six - small) / shapes.length >= cfg.minLargeFraction &&
                sizes.reduce((total, size) => total + size, 0) === usable;
        };
        const buildResult = (pieces, shapes, result) => {
            const indices = rng_1.shuffle(shapes.map((_, index) => index), random);
            const level = Object.assign(Object.assign({}, board), { 
                // Same shapes, ids and rotations as before; only the drawn cargo is mixed across skins.
                pieces: items_1.diversifySkins(indices.map((source, index) => ({
                    id: index + 1, shape: shapes[source], item: items_1.ITEMS[shapes[source]].key,
                    initialRotation: (cfg.randomInitialRotation === false ? 0 : Math.floor(random() * 4)),
                }))) });
            const placements = indices.map((source, index) => {
                const { x, y, rotation } = pieces[source];
                return { x, y, rotation, pieceId: index + 1 };
            });
            const solution = { date: cfg.date, stage: board.stage, placements };
            const stats = {
                solutionCount: result.solutionCount, solutionCountCapped: false,
                nodesToFirst: result.nodesToFirst, totalNodes: result.totalNodes,
            };
            return { level, solution, stats };
        };
        const preferred = rng_1.shuffle(((_g = template.preferredInventories) !== null && _g !== void 0 ? _g : []).filter(acceptableInventory), random);
        const excessiveInventories = new Set();
        let partitionFailures = 0, nodeLimitFailures = 0, solutionLimitFailures = 0, difficultyFailures = 0;
        const evaluate = (shapes) => {
            var _a;
            const inventory = [...shapes].sort().join(',');
            if (excessiveInventories.has(inventory)) {
                solutionLimitFailures++;
                return;
            }
            const level = Object.assign(Object.assign({}, board), { pieces: shapes.map((shape, index) => ({ id: index + 1, shape, item: items_1.ITEMS[shape].key, initialRotation: 0 })) });
            const result = dlx_1.solve(level, { maxSolutions: cfg.maxSolutions + 1, maxNodes: cfg.maxNodes });
            if (result.nodeLimitReached) {
                nodeLimitFailures++;
                return;
            }
            if (result.solutionCountCapped || result.solutionCount > cfg.maxSolutions) {
                excessiveInventories.add(inventory);
                solutionLimitFailures++;
                return;
            }
            if (!result.firstSolution || result.solutionCount < ((_a = cfg.minSolutions) !== null && _a !== void 0 ? _a : 1) || result.nodesToFirst < cfg.minNodesToFirst) {
                difficultyFailures++;
                return;
            }
            return result;
        };
        let attempt = 0;
        for (const shapes of preferred.slice(0, cfg.maxAttempts)) {
            attempt++;
            const result = evaluate(shapes);
            if (result === null || result === void 0 ? void 0 : result.firstSolution) {
                const placements = [...result.firstSolution].sort((a, b) => a.pieceId - b.pieceId);
                return buildResult(placements, shapes, result);
            }
        }
        const candidates = Array.from({ length: template.width * template.height }, () => []);
        const neighbors = Array.from({ length: template.width * template.height }, (_, cell) => {
            const x = cell % template.width, y = Math.floor(cell / template.width);
            const adjacent = [];
            if (x > 0)
                adjacent.push(cell - 1);
            if (x + 1 < template.width)
                adjacent.push(cell + 1);
            if (y > 0)
                adjacent.push(cell - template.width);
            if (y + 1 < template.height)
                adjacent.push(cell + template.width);
            return adjacent;
        });
        for (const shape of Object.keys(shapes_1.SHAPES)) {
            for (const orientation of shapes_1.orientations(shape)) {
                for (let y = 0; y < template.height; y++)
                    for (let x = 0; x < template.width; x++) {
                        const points = orientation.cells.map(([dx, dy]) => [x + dx, y + dy]);
                        if (points.some(([px, py]) => px >= template.width || py >= template.height || blocked.has(py * template.width + px)))
                            continue;
                        const cells = points.map(([px, py]) => py * template.width + px);
                        const candidate = { shape, rotation: orientation.rotation, x, y, cells };
                        for (const cell of cells)
                            candidates[cell].push(candidate);
                    }
            }
        }
        for (; attempt < cfg.maxAttempts; attempt++) {
            const occupied = new Set(blocked), placed = [];
            let visits = 0;
            const partition = () => {
                if (++visits > cfg.maxPartitionTries)
                    return false;
                if (occupied.size === template.width * template.height) {
                    return acceptableInventory(placed.map(piece => piece.shape));
                }
                if (placed.length >= cfg.maxPieces)
                    return false;
                let first = 0;
                while (occupied.has(first))
                    first++;
                const six = placed.filter(item => item.cells.length === 6).length;
                const small = placed.filter(item => item.cells.length <= 3).length;
                const options = candidates[first].filter(candidate => {
                    var _a;
                    return !candidate.cells.some(cell => occupied.has(cell)) &&
                        placed.filter(piece => piece.shape === candidate.shape).length < ((_a = cfg.maxSameShape) !== null && _a !== void 0 ? _a : Infinity) &&
                        (candidate.cells.length !== 6 || six < cfg.maxSix) &&
                        (candidate.cells.length > 3 || small < cfg.maxSmall);
                });
                for (const candidate of rng_1.shuffle(options, random)) {
                    candidate.cells.forEach(cell => occupied.add(cell));
                    placed.push(candidate);
                    const remaining = usable - placed.reduce((sum, item) => sum + item.cells.length, 0);
                    const leavesIsolatedCell = candidate.cells.some(cell => neighbors[cell].some(neighbor => !occupied.has(neighbor) && neighbors[neighbor].every(adjacent => occupied.has(adjacent))));
                    if (!leavesIsolatedCell && placed.length + Math.ceil(remaining / 6) <= cfg.maxPieces &&
                        placed.length + Math.floor(remaining / 2) >= cfg.minPieces && partition())
                        return true;
                    placed.pop();
                    candidate.cells.forEach(cell => occupied.delete(cell));
                    if (visits > cfg.maxPartitionTries)
                        break;
                }
                return false;
            };
            if (!partition()) {
                partitionFailures++;
                continue;
            }
            const shapes = placed.map(piece => piece.shape);
            const result = evaluate(shapes);
            if (result) {
                const placements = placed.map(({ x, y, rotation }) => ({ x, y, rotation }));
                return buildResult(placements, shapes, result);
            }
        }
        throw new Error(`Failed constraints (pieces=${cfg.minPieces}–${cfg.maxPieces}, maxSameShape=${(_h = cfg.maxSameShape) !== null && _h !== void 0 ? _h : "unlimited"}, six=${cfg.minSix}–${cfg.maxSix}, solutions=${(_j = cfg.minSolutions) !== null && _j !== void 0 ? _j : 1}–${cfg.maxSolutions}, minNodesToFirst=${cfg.minNodesToFirst}) in ${cfg.maxAttempts} attempts: partition=${partitionFailures}, ` +
            `nodeLimit=${nodeLimitFailures}, solutionLimit=${solutionLimitFailures}, difficulty=${difficultyFailures}`);
    }
    exports_1("generateLevel", generateLevel);
    return {
        setters: [
            function (dlx_1_1) {
                dlx_1 = dlx_1_1;
            },
            function (items_1_1) {
                items_1 = items_1_1;
            },
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/input.ts", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isClick(start, end, durationMs) {
        return durationMs >= 0 && durationMs <= 250 && Math.hypot(end.x - start.x, end.y - start.y) <= 10;
    }
    exports_1("isClick", isClick);
    function trayGesture(start, end) {
        return Math.abs(end.x - start.x) > Math.abs(end.y - start.y) ? 'scroll' : 'pickup';
    }
    exports_1("trayGesture", trayGesture);
    function snapToGrid(finger, offset, origin, cellSize) {
        if (cellSize <= 0)
            throw new Error('cellSize must be positive');
        return { x: Math.round((finger.x - offset.x - origin.x) / cellSize), y: Math.round((finger.y - offset.y - origin.y) / cellSize) };
    }
    exports_1("snapToGrid", snapToGrid);
    return {
        setters: [],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/items.ts", [], function (exports_1, context_1) {
    "use strict";
    var ITEMS, EXTRA_ITEMS, byKey;
    var __moduleName = context_1 && context_1.id;
    /** Every skin drawn for a shape: the default first, then the extras in table order. */
    function skinsFor(shape) {
        return [ITEMS[shape], ...EXTRA_ITEMS.filter(item => item.shape === shape)];
    }
    exports_1("skinsFor", skinsFor);
    /**
     * Re-skin pieces for on-screen variety without touching shape, rotation or ids.
     * Each shape cycles through its skins starting at a per-level offset, so one key repeats at most
     * ceil(count/skins) times (≤2 while a shape appears ≤ 2×its skin count).
     */
    function diversifySkins(pieces, offset = 0) {
        const seen = new Map();
        const order = Object.keys(ITEMS);
        return pieces.map(piece => {
            var _a;
            const skins = skinsFor(piece.shape), n = (_a = seen.get(piece.shape)) !== null && _a !== void 0 ? _a : 0;
            seen.set(piece.shape, n + 1);
            return Object.assign(Object.assign({}, piece), { item: skins[(offset + order.indexOf(piece.shape) + n) % skins.length].key });
        });
    }
    exports_1("diversifySkins", diversifySkins);
    /** Level data may skin a piece independently; unknown or legacy values fall back to the shape default. */
    function itemKey(piece) {
        return byKey.has(piece.item) ? piece.item : ITEMS[piece.shape].key;
    }
    exports_1("itemKey", itemKey);
    function itemMeta(piece) {
        var _a;
        return (_a = byKey.get(itemKey(piece))) !== null && _a !== void 0 ? _a : ITEMS[piece.shape];
    }
    exports_1("itemMeta", itemMeta);
    /** Art-only stretch hints; they never change collision cells or gameplay geometry. */
    function itemScale(piece) {
        var _a, _b, _c;
        const scale = (_a = byKey.get(itemKey(piece))) === null || _a === void 0 ? void 0 : _a.scale;
        return { x: (_b = scale === null || scale === void 0 ? void 0 : scale.x) !== null && _b !== void 0 ? _b : 1, y: (_c = scale === null || scale === void 0 ? void 0 : scale.y) !== null && _c !== void 0 ? _c : 1 };
    }
    exports_1("itemScale", itemScale);
    return {
        setters: [],
        execute: function () {
            exports_1("ITEMS", ITEMS = {
                I2: { key: 'liquor', name: '一箱白酒' }, I3: { key: 'sausage', name: '腊肠串', scale: { y: 1.6 } }, L3: { key: 'ricecooker', name: '电饭煲' }, I4: { key: 'sugarcane', name: '甘蔗' }, O4: { key: 'milk', name: '牛奶箱' }, L4: { key: 'suitcase_s', name: '登机箱' }, J4: { key: 'duffel', name: '拉杆包' }, T4: { key: 'nutbox', name: '坚果礼盒' }, S4: { key: 'fish', name: '鱼' }, Z4: { key: 'duck', name: '腊鸭' }, P5: { key: 'quilt', name: '被子' }, L5: { key: 'frozenbox', name: '冻品泡沫箱' }, T5: { key: 'tv', name: '电视' }, U5: { key: 'coop', name: '鸡鸭笼' }, V5: { key: 'crab', name: '大闸蟹礼盒' }, Z5: { key: 'painting', name: '年画卷' }, N5: { key: 'lotusroot', name: '莲藕', scale: { y: 1.12 } }, Y5: { key: 'couplets', name: '春联礼包' }, R6: { key: 'suitcase_l', name: '大号行李箱' }
            });
            /** Extra real-object skins: same footprint as the shape default, so gameplay never changes. */
            exports_1("EXTRA_ITEMS", EXTRA_ITEMS = [
                { key: 'winebox', name: '红酒礼盒', shape: 'I2' }, { key: 'ricecake', name: '年糕条', shape: 'I3' }, { key: 'hairtail', name: '带鱼', shape: 'I4' },
                { key: 'oil', name: '食用油', shape: 'L3' }, { key: 'mandarin', name: '砂糖橘箱', shape: 'O4' }, { key: 'toycar', name: '玩具车礼盒', shape: 'O4' },
                { key: 'ricebag', name: '大米袋', shape: 'L4' }, { key: 'drinks', name: '饮料箱', shape: 'J4' }, { key: 'teabox', name: '茶叶礼盒', shape: 'T4' },
                { key: 'eggs', name: '鸡蛋托', shape: 'S4' }, { key: 'candy', name: '糖果礼盒', shape: 'Z4' }, { key: 'snacks', name: '零食大礼包', shape: 'P5' },
                { key: 'ham', name: '金华火腿', shape: 'L5' }, { key: 'kumquat', name: '金桔盆栽', shape: 'T5' }, { key: 'fruitbasket', name: '果篮', shape: 'U5' },
                { key: 'apples', name: '苹果箱', shape: 'V5' }, { key: 'fudeco', name: '窗花礼包', shape: 'Z5' }, { key: 'larou', name: '腊肉', shape: 'N5' },
                { key: 'lanterns', name: '红灯笼', shape: 'Y5' }, { key: 'woven', name: '土特产编织袋', shape: 'R6' },
                { key: 'scallion', name: '大葱', shape: 'Y5' }, { key: 'dryfish', name: '腊鱼', shape: 'Y5' }, { key: 'giftstack', name: '年货礼盒', shape: 'Y5' },
                { key: 'dates', name: '红枣礼盒', shape: 'Z4' }, { key: 'noodles', name: '方便面', shape: 'Z4' }, { key: 'milkflat', name: '牛奶饮料', shape: 'Z4' },
                { key: 'firecracker', name: '鞭炮礼盒', shape: 'I3' }, { key: 'guamian', name: '挂面礼盒', shape: 'I4' }, { key: 'pomelo', name: '柚子', shape: 'L3' },
                { key: 'thermos', name: '保温壶', shape: 'J4' }, { key: 'pastry', name: '糕点礼盒', shape: 'T4' }, { key: 'driedgoods', name: '干货礼包', shape: 'P5' },
                { key: 'hongbao', name: '红包', shape: 'Z5' }, { key: 'oven', name: '电烤箱', shape: 'R6' },
            ]);
            byKey = new Map([...Object.values(ITEMS), ...EXTRA_ITEMS].map(item => [item.key, item]));
        }
    };
});

System.register("chunks:///_virtual/level.ts", ["./shapes.ts"], function (exports_1, context_1) {
    "use strict";
    var shapes_1;
    var __moduleName = context_1 && context_1.id;
    function record(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
    function integerIn(value, min, max) {
        return typeof value === 'number' && Number.isSafeInteger(value) && value >= min && value <= max;
    }
    function parseLevel(value) {
        if (!record(value))
            throw new Error('Invalid level');
        const { date, stage, vehicle, width, height, timeLimitSec } = value;
        if (typeof date !== 'string' || (stage !== 1 && stage !== 2 && stage !== 3) ||
            typeof vehicle !== 'string' || !vehicle ||
            !integerIn(width, 1, 11) || !integerIn(height, 1, 11) ||
            !integerIn(timeLimitSec, 0, Math.floor(Number.MAX_SAFE_INTEGER / 1000)) ||
            !Array.isArray(value.blocked) || !Array.isArray(value.pieces) || !value.pieces.length) {
            throw new Error('Invalid level header');
        }
        if (value.mode !== undefined && value.mode !== 'normal' && value.mode !== 'mom')
            throw new Error('Invalid level mode');
        if (value.extras !== undefined && (!Array.isArray(value.extras) || value.extras.some(batch => !Array.isArray(batch) || !batch.length)))
            throw new Error('Invalid extras');
        const usedCells = new Set();
        const blocked = value.blocked.map((cell) => {
            if (!Array.isArray(cell) || cell.length !== 2 ||
                !integerIn(cell[0], 0, width - 1) || !integerIn(cell[1], 0, height - 1)) {
                throw new Error('Invalid blocked cell');
            }
            const [x, y] = cell;
            const index = y * width + x;
            if (usedCells.has(index))
                throw new Error('Duplicate blocked cell');
            usedCells.add(index);
            return [x, y];
        });
        const ids = new Set();
        let area = 0;
        const parsePieces = (entries) => entries.map((piece) => {
            if (!record(piece) || !integerIn(piece.id, 1, Number.MAX_SAFE_INTEGER) || ids.has(piece.id) ||
                typeof piece.shape !== 'string' || !Object.hasOwn(shapes_1.SHAPES, piece.shape) ||
                typeof piece.item !== 'string' || !integerIn(piece.initialRotation, 0, 3)) {
                throw new Error('Invalid or duplicate piece');
            }
            const shape = piece.shape;
            ids.add(piece.id);
            area += shapes_1.SHAPES[shape].length;
            return { id: piece.id, shape, item: piece.item, initialRotation: piece.initialRotation };
        });
        const pieces = parsePieces(value.pieces);
        const extras = value.extras === undefined ? undefined : value.extras.map(parsePieces);
        if (area !== width * height - blocked.length)
            throw new Error('Pieces do not fill the board');
        return Object.assign(Object.assign({ date, stage, vehicle, width, height, blocked, timeLimitSec, pieces }, (value.mode === undefined ? {} : { mode: value.mode })), (extras === undefined ? {} : { extras }));
    }
    exports_1("parseLevel", parseLevel);
    return {
        setters: [
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/provinces.ts", [], function (exports_1, context_1) {
    "use strict";
    var PROVINCES;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("PROVINCES", PROVINCES = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港', '澳门', '台湾']);
        }
    };
});

System.register("chunks:///_virtual/rank.ts", ["./brand.ts","./provinces.ts"], function (exports_1, context_1) {
    "use strict";
    var brand_1, provinces_1, RANK_DEFAULT_API_BASE, RANK_PROVINCE_STORAGE_KEY, RANK_DEVICE_STORAGE_KEY, RANK_PENDING_STORAGE_KEY, RANK_REQUEST_TIMEOUT_MS, RANK_MAX_REPORT_ATTEMPTS, RANK_MAX_PENDING_CLEARS, RANK_MIN_CLEAR_MS, RANK_TITLE, RANK_EMPTY_TEXT, RANK_LOADING_TEXT, RANK_ERROR_TEXT, RANK_RETRY_TEXT, RANK_DEBUG_TEXT, SESSION_ID_PATTERN, DEVICE_ALPHABET, MUNICIPALITIES, BARE_NAMES;
    var __moduleName = context_1 && context_1.id;
    /** Resolves the API base from `?api=`; `off` disables every rank request. */
    function resolveRankApi(search) {
        var _a;
        const raw = new URLSearchParams(search).get('api');
        if (raw === null)
            return { enabled: true, base: RANK_DEFAULT_API_BASE };
        const value = raw.trim();
        if (!value || value.toLowerCase() === 'off')
            return { enabled: false, base: null };
        return { enabled: true, base: (_a = normalizeApiBase(value)) !== null && _a !== void 0 ? _a : RANK_DEFAULT_API_BASE };
    }
    exports_1("resolveRankApi", resolveRankApi);
    function isProvince(value) {
        return typeof value === 'string' && provinces_1.PROVINCES.includes(value);
    }
    exports_1("isProvince", isProvince);
    function isRankStage(value) {
        return value === 1 || value === 2;
    }
    exports_1("isRankStage", isRankStage);
    function isValidSessionId(value) {
        return typeof value === 'string' && SESSION_ID_PATTERN.test(value);
    }
    exports_1("isValidSessionId", isValidSessionId);
    function isValidClearMs(stage, ms) {
        return typeof ms === 'number' && Number.isFinite(ms) && ms >= RANK_MIN_CLEAR_MS[stage];
    }
    exports_1("isValidClearMs", isValidClearMs);
    function isValidClearReport(value) {
        if (!value || typeof value !== 'object')
            return false;
        const report = value;
        return isProvince(report.province)
            && isRankStage(report.stage)
            && isPositiveFinite(report.ms)
            && isValidSessionId(report.sessionId)
            && isCount(report.boxes)
            && isCount(report.momBoxes);
    }
    exports_1("isValidClearReport", isValidClearReport);
    /** Any `debug` URL parameter (win/fail/mom/…) marks a run that must never reach the leaderboard. */
    function isDebugRun(search) {
        return new URLSearchParams(search).has('debug');
    }
    exports_1("isDebugRun", isDebugRun);
    /** Creates a device id that satisfies the server's 8–64 character session rule. */
    function createDeviceId(source = globalThis.crypto) {
        var _a, _b;
        try {
            const uuid = (_a = source === null || source === void 0 ? void 0 : source.randomUUID) === null || _a === void 0 ? void 0 : _a.call(source);
            if (isValidSessionId(uuid))
                return uuid;
        }
        catch ( /* Fall through to a generated id. */_c) { /* Fall through to a generated id. */ }
        const length = 24;
        const buffer = new Uint8Array(length);
        try {
            (_b = source === null || source === void 0 ? void 0 : source.getRandomValues) === null || _b === void 0 ? void 0 : _b.call(source, buffer);
            if (buffer.some(byte => byte !== 0))
                return `smhj-${fromBytes(buffer)}`;
        }
        catch ( /* Fall through to Math.random. */_d) { /* Fall through to Math.random. */ }
        let fallback = 'smhj-';
        for (let index = 0; index < length; index++) {
            fallback += DEVICE_ALPHABET[Math.floor(Math.random() * DEVICE_ALPHABET.length)];
        }
        return fallback;
    }
    exports_1("createDeviceId", createDeviceId);
    function readStoredProvince(storage) {
        try {
            const value = storage === null || storage === void 0 ? void 0 : storage.getItem(RANK_PROVINCE_STORAGE_KEY);
            return isProvince(value) ? value : null;
        }
        catch (_a) {
            return null;
        }
    }
    exports_1("readStoredProvince", readStoredProvince);
    function writeStoredProvince(storage, province) {
        try {
            storage === null || storage === void 0 ? void 0 : storage.setItem(RANK_PROVINCE_STORAGE_KEY, province);
        }
        catch ( /* Storage is optional. */_a) { /* Storage is optional. */ }
    }
    exports_1("writeStoredProvince", writeStoredProvince);
    function parsePendingClears(raw) {
        if (!raw)
            return [];
        let value;
        try {
            value = JSON.parse(raw);
        }
        catch (_a) {
            return [];
        }
        if (!Array.isArray(value))
            return [];
        const result = [];
        for (const item of value) {
            if (!isValidClearReport(item))
                continue;
            const queuedAt = item.queuedAt;
            if (typeof queuedAt !== 'number' || !Number.isFinite(queuedAt) || queuedAt < 0)
                continue;
            result.push(Object.assign(Object.assign({}, item), { queuedAt }));
        }
        return result.slice(0, RANK_MAX_PENDING_CLEARS);
    }
    exports_1("parsePendingClears", parsePendingClears);
    function serializePendingClears(items) {
        return JSON.stringify(items.slice(0, RANK_MAX_PENDING_CLEARS));
    }
    exports_1("serializePendingClears", serializePendingClears);
    function readPendingClears(storage) {
        var _a;
        try {
            return parsePendingClears((_a = storage === null || storage === void 0 ? void 0 : storage.getItem(RANK_PENDING_STORAGE_KEY)) !== null && _a !== void 0 ? _a : null);
        }
        catch (_b) {
            return [];
        }
    }
    exports_1("readPendingClears", readPendingClears);
    function writePendingClears(storage, items) {
        try {
            if (!storage)
                return;
            if (!items.length) {
                if (storage.removeItem)
                    storage.removeItem(RANK_PENDING_STORAGE_KEY);
                else
                    storage.setItem(RANK_PENDING_STORAGE_KEY, '[]');
                return;
            }
            storage.setItem(RANK_PENDING_STORAGE_KEY, serializePendingClears(items));
        }
        catch ( /* Storage is optional. */_a) { /* Storage is optional. */ }
    }
    exports_1("writePendingClears", writePendingClears);
    /** Keeps one pending report per device/stage because the server de-duplicates it anyway. */
    function enqueuePendingClear(items, report, queuedAt = Date.now()) {
        const next = items.filter(item => !(item.sessionId === report.sessionId && item.stage === report.stage));
        next.push(Object.assign(Object.assign({}, report), { queuedAt }));
        return next.slice(-RANK_MAX_PENDING_CLEARS);
    }
    exports_1("enqueuePendingClear", enqueuePendingClear);
    function removePendingClear(items, report) {
        return items.filter(item => !(item.sessionId === report.sessionId && item.stage === report.stage));
    }
    exports_1("removePendingClear", removePendingClear);
    function parseRankSnapshot(value) {
        if (!value || typeof value !== 'object')
            return null;
        const data = value;
        if (data.ok !== true || !Array.isArray(data.provinces))
            return null;
        if (!isNonNegativeFinite(data.totalClears) || !isNonNegativeFinite(data.todayClears) || !isNonNegativeFinite(data.updatedAt)) {
            return null;
        }
        const provinces = [];
        for (const item of data.provinces) {
            if (!item || typeof item !== 'object')
                continue;
            const entry = item;
            if (!isProvince(entry.province) || !isNonNegativeFinite(entry.total) || !isNonNegativeFinite(entry.today))
                continue;
            provinces.push({ province: entry.province, total: entry.total, today: entry.today });
        }
        return {
            provinces,
            totalClears: data.totalClears,
            todayClears: data.todayClears,
            updatedAt: data.updatedAt,
        };
    }
    exports_1("parseRankSnapshot", parseRankSnapshot);
    function parseClearResult(value) {
        if (!value || typeof value !== 'object')
            return null;
        const data = value;
        if (data.ok !== true || typeof data.duplicate !== 'boolean')
            return null;
        if (!isProvince(data.province) || !isNonNegativeFinite(data.total))
            return null;
        if (data.rank !== null && (!isPositiveFinite(data.rank)))
            return null;
        return {
            duplicate: data.duplicate,
            province: data.province,
            rank: data.rank === null ? null : data.rank,
            total: data.total,
        };
    }
    exports_1("parseClearResult", parseClearResult);
    function findRankEntry(snapshot, province) {
        return snapshot.provinces.find(entry => entry.province === province);
    }
    exports_1("findRankEntry", findRankEntry);
    function formatRankSummary(snapshot) {
        return `全国累计 ${snapshot.totalClears} 次 · 今日 ${snapshot.todayClears} 次`;
    }
    exports_1("formatRankSummary", formatRankSummary);
    /**
     * Fills the public leaderboard to all 34 provincial regions. Returned API rows keep their
     * server order and only positive totals are ranked; every missing region is appended as waiting.
     */
    function buildRankRows(snapshot, own) {
        const unique = [];
        const seen = new Set();
        for (const entry of snapshot.provinces) {
            if (seen.has(entry.province))
                continue;
            seen.add(entry.province);
            unique.push(entry);
        }
        const ranked = unique.filter(entry => entry.total > 0);
        const ordered = ranked.length === 0 && own
            ? [own, ...provinces_1.PROVINCES.filter(province => province !== own)]
            : [...provinces_1.PROVINCES];
        const rows = [];
        let rank = 0;
        for (const entry of ranked) {
            rank += 1;
            rows.push(Object.assign(Object.assign({}, entry), { rank, badge: rank <= 3 ? rank : null, own: entry.province === own, waiting: false }));
        }
        const rankedProvinces = new Set(ranked.map(entry => entry.province));
        for (const province of ordered) {
            if (rankedProvinces.has(province))
                continue;
            rows.push({ province, total: 0, today: 0, rank: null, badge: null, own: province === own, waiting: true });
        }
        return rows;
    }
    exports_1("buildRankRows", buildRankRows);
    function formatRankToday(today) {
        return `今日 +${Math.max(0, Math.floor(today))}`;
    }
    exports_1("formatRankToday", formatRankToday);
    function formatRankProgress(province) {
        return `正在为${provinceLabel(province)}加油…`;
    }
    exports_1("formatRankProgress", formatRankProgress);
    function formatContributionResult(province, result) {
        const head = result.duplicate ? `你已为${provinceLabel(province)}贡献过` : `你为${provinceLabel(province)} +1`;
        return result.rank === null ? head : `${head}，${provinceLabel(province)}排第 ${result.rank}`;
    }
    exports_1("formatContributionResult", formatContributionResult);
    function formatContributionFailure() {
        return RANK_ERROR_TEXT;
    }
    exports_1("formatContributionFailure", formatContributionFailure);
    function formatYourProvince(province, entry, rank) {
        if (!province)
            return '你的省份：未选择';
        if (!entry)
            return `你的省份：${province} 暂无人通关`;
        if (rank !== undefined)
            return `你的省份：${province} · 排第 ${entryRank(rank)} 名 · ${entry.total} 人通关`;
        return `你的省份：${province} · ${entry.total} 人通关`;
    }
    exports_1("formatYourProvince", formatYourProvince);
    /** Waits 700ms, 1.4s, 2.8s… between transient report failures. */
    function retryDelayMs(retryIndex) {
        const index = Number.isFinite(retryIndex) ? Math.max(0, Math.floor(retryIndex)) : 0;
        return 700 * 2 ** index;
    }
    exports_1("retryDelayMs", retryDelayMs);
    function entryRank(rank) {
        return Math.max(1, Math.floor(rank));
    }
    function normalizeApiBase(raw) {
        try {
            const url = new URL(raw);
            if (url.protocol !== 'http:' && url.protocol !== 'https:')
                return undefined;
            return url.href.replace(/\/+$/, '');
        }
        catch (_a) {
            return undefined;
        }
    }
    function isCount(value) {
        return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
    }
    function isPositiveFinite(value) {
        return typeof value === 'number' && Number.isFinite(value) && value > 0;
    }
    function isNonNegativeFinite(value) {
        return typeof value === 'number' && Number.isFinite(value) && value >= 0;
    }
    function fromBytes(bytes) {
        let result = '';
        for (const byte of bytes)
            result += DEVICE_ALPHABET[byte % DEVICE_ALPHABET.length];
        return result;
    }
    /** “广东省”“北京市”“新疆”: municipalities, autonomous regions and SARs are not 省. */
    function provinceLabel(province) {
        if (MUNICIPALITIES.includes(province))
            return `${province}市`;
        if (BARE_NAMES.includes(province))
            return province;
        return `${province}省`;
    }
    exports_1("provinceLabel", provinceLabel);
    return {
        setters: [
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (provinces_1_1) {
                provinces_1 = provinces_1_1;
            }
        ],
        execute: function () {
            exports_1("RANK_DEFAULT_API_BASE", RANK_DEFAULT_API_BASE = 'https://smhj-api.feyakit.workers.dev');
            exports_1("RANK_PROVINCE_STORAGE_KEY", RANK_PROVINCE_STORAGE_KEY = 'smhj.province');
            exports_1("RANK_DEVICE_STORAGE_KEY", RANK_DEVICE_STORAGE_KEY = 'smhj.deviceId');
            exports_1("RANK_PENDING_STORAGE_KEY", RANK_PENDING_STORAGE_KEY = 'smhj.pendingClears');
            exports_1("RANK_REQUEST_TIMEOUT_MS", RANK_REQUEST_TIMEOUT_MS = 5000);
            exports_1("RANK_MAX_REPORT_ATTEMPTS", RANK_MAX_REPORT_ATTEMPTS = 3);
            exports_1("RANK_MAX_PENDING_CLEARS", RANK_MAX_PENDING_CLEARS = 80);
            exports_1("RANK_MIN_CLEAR_MS", RANK_MIN_CLEAR_MS = Object.freeze({ 1: 4000, 2: 45000 }));
            exports_1("RANK_TITLE", RANK_TITLE = '为家乡而战 · 省份排行');
            exports_1("RANK_EMPTY_TEXT", RANK_EMPTY_TEXT = `还没有人${brand_1.GAME_TITLE}，你来当第一个`);
            exports_1("RANK_LOADING_TEXT", RANK_LOADING_TEXT = '排行加载中…');
            exports_1("RANK_ERROR_TEXT", RANK_ERROR_TEXT = '排行暂时连不上');
            exports_1("RANK_RETRY_TEXT", RANK_RETRY_TEXT = '重试');
            exports_1("RANK_DEBUG_TEXT", RANK_DEBUG_TEXT = '调试模式不计入排行');
            SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
            DEVICE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
            MUNICIPALITIES = ['北京', '天津', '上海', '重庆'];
            BARE_NAMES = ['内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门'];
        }
    };
});

System.register("chunks:///_virtual/rng.ts", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function cyrb128(seed) {
        let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
        for (let i = 0; i < seed.length; i++) {
            const k = seed.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
    }
    function createRng(seed) {
        let [a, b, c, d] = cyrb128(seed);
        return () => {
            const result = (a + b + d) | 0;
            d = (d + 1) | 0;
            a = b ^ (b >>> 9);
            b = (c + (c << 3)) | 0;
            c = (c << 21) | (c >>> 11);
            c = (c + result) | 0;
            return (result >>> 0) / 4294967296;
        };
    }
    exports_1("createRng", createRng);
    function shuffle(values, random) {
        const result = [...values];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    exports_1("shuffle", shuffle);
    return {
        setters: [],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/shapes.ts", [], function (exports_1, context_1) {
    "use strict";
    var SHAPES, clockwiseRotation;
    var __moduleName = context_1 && context_1.id;
    function rotate(shape, rotation) {
        let cells = shape.map(([x, y]) => [x, y]);
        for (let i = 0; i < rotation; i++)
            cells = cells.map(([x, y]) => [y, -x]);
        const minX = Math.min(...cells.map(([x]) => x));
        const minY = Math.min(...cells.map(([, y]) => y));
        return cells.map(([x, y]) => [x - minX, y - minY]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    }
    exports_1("rotate", rotate);
    function orientations(shape) {
        const seen = new Set();
        const result = [];
        for (const rotation of [0, 1, 2, 3]) {
            const cells = rotate(SHAPES[shape], rotation);
            const key = JSON.stringify(cells);
            if (!seen.has(key)) {
                seen.add(key);
                result.push({ rotation, cells });
            }
        }
        return result;
    }
    exports_1("orientations", orientations);
    return {
        setters: [],
        execute: function () {
            exports_1("SHAPES", SHAPES = {
                I2: [[0, 0], [1, 0]], I3: [[0, 0], [1, 0], [2, 0]], L3: [[0, 0], [0, 1], [1, 1]],
                I4: [[0, 0], [1, 0], [2, 0], [3, 0]], O4: [[0, 0], [1, 0], [0, 1], [1, 1]],
                L4: [[0, 0], [0, 1], [0, 2], [1, 2]], J4: [[1, 0], [1, 1], [0, 2], [1, 2]],
                T4: [[0, 0], [1, 0], [2, 0], [1, 1]], S4: [[1, 0], [2, 0], [0, 1], [1, 1]],
                Z4: [[0, 0], [1, 0], [1, 1], [2, 1]], P5: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]],
                L5: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3]], T5: [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]],
                U5: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]], V5: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
                Z5: [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]], N5: [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]],
                Y5: [[0, 0], [0, 1], [1, 1], [0, 2], [0, 3]], R6: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2]],
            });
            // Grid rows increase downwards, while the stored rotation advances counterclockwise.
            exports_1("clockwiseRotation", clockwiseRotation = (rotation) => ((rotation + 3) % 4));
        }
    };
});

System.register("chunks:///_virtual/stack-catalog.ts", [], function (exports_1, context_1) {
    "use strict";
    var STAGE1_ITEMS, STAGE2_ITEMS, MOM_ITEM_KEYS, ENDLESS_ITEMS;
    var __moduleName = context_1 && context_1.id;
    function stackItems(stage) {
        return stage === 1 ? STAGE1_ITEMS : STAGE2_ITEMS;
    }
    exports_1("stackItems", stackItems);
    function stackItemByName(items, key) {
        var _a;
        return (_a = items.find(item => item.key === key)) !== null && _a !== void 0 ? _a : items[0];
    }
    exports_1("stackItemByName", stackItemByName);
    function pickMomItem(items, random = Math.random) {
        const preferredKeys = new Set(MOM_ITEM_KEYS);
        const candidates = items.filter(item => preferredKeys.has(item.key));
        const pool = candidates.length ? candidates : items;
        if (!pool.length)
            return { key: 'mandarin', name: '砂糖橘' };
        const drawn = random();
        const value = Number.isFinite(drawn) ? Math.max(0, Math.min(0.999999, drawn)) : 0;
        return pool[Math.floor(value * pool.length)];
    }
    exports_1("pickMomItem", pickMomItem);
    /**
     * Mom prefers goods that are scarce on the board right now (fewest copies left), so her three
     * cards cannot simply be matched against what is already lying around. Ties are broken randomly.
     */
    function pickRareMomItem(items, boardKinds, random = Math.random) {
        var _a;
        const preferredKeys = new Set(MOM_ITEM_KEYS);
        const candidates = items.filter(item => preferredKeys.has(item.key));
        const pool = candidates.length ? candidates : items;
        if (!pool.length)
            return { key: 'mandarin', name: '砂糖橘' };
        const counts = new Map();
        for (const kind of boardKinds)
            counts.set(kind, ((_a = counts.get(kind)) !== null && _a !== void 0 ? _a : 0) + 1);
        const fewest = Math.min(...pool.map(item => { var _a; return (_a = counts.get(item.key)) !== null && _a !== void 0 ? _a : 0; }));
        const rare = pool.filter(item => { var _a; return ((_a = counts.get(item.key)) !== null && _a !== void 0 ? _a : 0) === fewest; });
        const drawn = random();
        const value = Number.isFinite(drawn) ? Math.max(0, Math.min(0.999999, drawn)) : 0;
        return rare[Math.floor(value * rare.length)];
    }
    exports_1("pickRareMomItem", pickRareMomItem);
    return {
        setters: [],
        execute: function () {
            /** A deliberately distinct subset keeps the dense second pile readable at phone size. */
            exports_1("STAGE1_ITEMS", STAGE1_ITEMS = [
                { key: 'mandarin', name: '砂糖橘' },
                { key: 'duck', name: '烤鸭' },
                { key: 'fruitbasket', name: '果篮' },
            ]);
            exports_1("STAGE2_ITEMS", STAGE2_ITEMS = [
                { key: 'mandarin', name: '砂糖橘' },
                { key: 'duck', name: '烤鸭' },
                { key: 'fruitbasket', name: '果篮' },
                { key: 'fish', name: '鱼' },
                { key: 'kumquat', name: '金桔树' },
                { key: 'milk', name: '牛奶箱' },
                { key: 'oven', name: '烤箱' },
                { key: 'suitcase_l', name: '大行李箱' },
                { key: 'woven', name: '编织袋' },
                { key: 'toycar', name: '玩具车' },
                { key: 'snacks', name: '零食大礼包' },
                { key: 'ham', name: '火腿' },
                { key: 'thermos', name: '保温壶' },
                { key: 'firecracker', name: '鞭炮礼盒' },
            ]);
            /** The mother event uses instantly legible goods that already appear in the stage. */
            exports_1("MOM_ITEM_KEYS", MOM_ITEM_KEYS = [
                'mandarin', 'duck', 'fruitbasket', 'suitcase_l', 'toycar', 'milk', 'oven',
            ]);
            /**
             * Additional cargo keys already backed by art under resources/art/items. Endless levels grow
             * their kind count from this list without changing the fixed stage-two catalog above.
             */
            exports_1("ENDLESS_ITEMS", ENDLESS_ITEMS = [
                ...STAGE2_ITEMS,
                { key: 'apples', name: '苹果' },
                { key: 'candy', name: '糖果' },
                { key: 'coop', name: '鸡笼' },
                { key: 'couplets', name: '春联' },
                { key: 'crab', name: '螃蟹' },
                { key: 'dates', name: '红枣' },
                { key: 'driedgoods', name: '干货' },
                { key: 'drinks', name: '饮料' },
                { key: 'dryfish', name: '鱼干' },
                { key: 'duffel', name: '行李袋' },
                { key: 'eggs', name: '鸡蛋' },
                { key: 'frozenbox', name: '冷冻食品' },
                { key: 'fudeco', name: '福字' },
                { key: 'giftstack', name: '礼盒堆' },
                { key: 'guamian', name: '挂面' },
                { key: 'hairtail', name: '带鱼' },
                { key: 'hongbao', name: '红包' },
                { key: 'lanterns', name: '灯笼' },
                { key: 'larou', name: '腊肉' },
                { key: 'liquor', name: '白酒' },
                { key: 'lotusroot', name: '莲藕' },
                { key: 'milkflat', name: '奶片' },
                { key: 'noodles', name: '面条' },
                { key: 'nutbox', name: '坚果盒' },
                { key: 'oil', name: '食用油' },
                { key: 'painting', name: '年画' },
                { key: 'pastry', name: '糕点' },
                { key: 'pomelo', name: '柚子' },
                { key: 'quilt', name: '棉被' },
                { key: 'ricebag', name: '米袋' },
                { key: 'ricecake', name: '年糕' },
                { key: 'ricecooker', name: '电饭煲' },
                { key: 'sausage', name: '香肠' },
                { key: 'scallion', name: '大葱' },
                { key: 'sugarcane', name: '甘蔗' },
                { key: 'suitcase_s', name: '小行李箱' },
                { key: 'teabox', name: '茶叶' },
                { key: 'tv', name: '电视' },
                { key: 'winebox', name: '酒箱' },
            ]);
        }
    };
});

System.register("chunks:///_virtual/stack-constants.ts", [], function (exports_1, context_1) {
    "use strict";
    var SLOT_CAPACITY, MIN_SLOT_CAPACITY, MAX_SLOT_CAPACITY, PACK_SIZE;
    var __moduleName = context_1 && context_1.id;
    /** Resolves an optional level capacity while keeping every pre-capacity level on seven slots. */
    function slotCapacityOf(level) {
        var _a;
        const capacity = (_a = level.slotCapacity) !== null && _a !== void 0 ? _a : SLOT_CAPACITY;
        if (!Number.isInteger(capacity) || capacity < MIN_SLOT_CAPACITY || capacity > MAX_SLOT_CAPACITY) {
            throw new Error('invalid stack slot capacity');
        }
        return capacity;
    }
    exports_1("slotCapacityOf", slotCapacityOf);
    return {
        setters: [],
        execute: function () {
            /** Shared rule constants (kept dependency-free so solver and rules never import each other). */
            exports_1("SLOT_CAPACITY", SLOT_CAPACITY = 7);
            exports_1("MIN_SLOT_CAPACITY", MIN_SLOT_CAPACITY = 7);
            exports_1("MAX_SLOT_CAPACITY", MAX_SLOT_CAPACITY = 9);
            exports_1("PACK_SIZE", PACK_SIZE = 3);
        }
    };
});

System.register("chunks:///_virtual/stack-daily-table.ts", [], function (exports_1, context_1) {
    "use strict";
    var DAILY_TABLE_START, DAILY_TABLE;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // Generated by tools/gen-daily-table.ts (800 days, 2026-11-01 → 2029-01-08): one base-36 calibrated
            // attempt index per Beijing day, so phones build today's board once instead of re-simulating.
            exports_1("DAILY_TABLE_START", DAILY_TABLE_START = '2026-11-01');
            exports_1("DAILY_TABLE", DAILY_TABLE = '033b4222116e9024023022a305224801d1001c66g340200720109425i0520f431702542h403066202340e273211140b447701f0712707l112c61d00481d54121c611642165156e46360105c2520ag503e54004561d3d4061022236000651330d53l35410511131157b20048010100b0002i28110050a6353513980104485221040042155023201116210002703125441b30h3830201201041040g201k5222140483352fi4040432008a0176047362310006372509070312d363i1121043364c00210218f5520a5004132010054041a27140b4032f220020233k412300i0608651007b7a02714600a5062116121033350g04153005544521e652l153240514c7107i304031f91874541335032b1155063c4c020223514j1g0344082155460201979020e0e3103222202911da9011h5cb1231030460232141012112404121091f2101c41b6082220005hh40002506101822271536b2213361611a5a183870h14b150362011088118224091430n02142272402223378356258681c160881b0048g14120a338024271542232102631615301');
        }
    };
});

System.register("chunks:///_virtual/stack-daily.ts", ["./rng.ts","./stack-catalog.ts","./stack-generator.ts","./stack-layout.ts","./stack-daily-table.ts","./stack-sim.ts","./stack-solver.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_catalog_1, stack_generator_1, stack_layout_1, stack_daily_table_1, stack_sim_1, stack_solver_1, BEIJING_OFFSET_MS, beijingDateKey, DAILY_CARD_OPTIONS, DAILY_LAYERS, DAILY_SLOT_CAPACITY, DAILY_TARGET;
    var __moduleName = context_1 && context_1.id;
    /** Returns the UTC+8 calendar day as YYYY-MM-DD, independent of the host timezone. */
    function dailySeed(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime()))
            throw new Error('invalid daily stack date');
        const beijing = new Date(date.getTime() + BEIJING_OFFSET_MS);
        const year = beijing.getUTCFullYear();
        const month = String(beijing.getUTCMonth() + 1).padStart(2, '0');
        const day = String(beijing.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    exports_1("dailySeed", dailySeed);
    function dateHash(key) {
        let hash = 2166136261 >>> 0;
        for (let index = 0; index < key.length; index++) {
            hash ^= key.charCodeAt(index);
            hash = Math.imul(hash, 16777619) >>> 0;
        }
        return hash;
    }
    function validateDateKey(key) {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
        if (!match)
            throw new Error('invalid daily stack date key');
        const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
            throw new Error('invalid daily stack date key');
        }
    }
    function dailyCard(id, x, y, layer) {
        return { id, kind: '', name: '', x, y, w: stack_layout_1.STACK_CARD_SIZE, h: stack_layout_1.STACK_CARD_SIZE, layer, source: 'pile' };
    }
    function layoutDaily(option, random) {
        const cards = [];
        let id = 0;
        const grid = 112;
        const columns = 5;
        option.layers.forEach((count, layer) => {
            const rows = Math.ceil(count / columns);
            const width = columns * grid + stack_layout_1.STACK_CARD_SIZE;
            const startX = Math.round((750 - width) / 2) + (layer % 2 ? grid / 2 : 0);
            const startY = 190 + layer * 14 + (layer % 2 ? 28 : 0);
            for (let index = 0; index < count; index++) {
                const row = Math.floor(index / columns);
                const col = index % columns;
                const jitterX = Math.round((random() - .5) * 4);
                const jitterY = Math.round((random() - .5) * 4);
                cards.push(dailyCard(++id, startX + col * grid + jitterX, startY + row * grid + jitterY, layer));
            }
            // Keep the row count part of the layout shape even though all cards are explicit.
            if (rows < 1)
                throw new Error('invalid daily layer');
        });
        return cards;
    }
    exports_1("layoutDaily", layoutDaily);
    function attemptDaily(dateKey, baseSeed, attempt) {
        const seed = attempt === 0 ? baseSeed : `${baseSeed}#retry-${attempt}`;
        const random = rng_1.createRng(seed);
        const option = DAILY_CARD_OPTIONS[dateHash(dateKey) % DAILY_CARD_OPTIONS.length];
        const cards = layoutDaily(option, random);
        const items = stack_catalog_1.STAGE2_ITEMS.slice(0, option.items);
        const assigned = stack_generator_1.assignTriples(cards, items, random, {
            capacity: DAILY_SLOT_CAPACITY,
            minGap: 25,
            maxOpenGroups: 4,
        });
        if (!assigned)
            return undefined;
        const level = {
            stage: 0,
            seed,
            cardW: stack_layout_1.STACK_CARD_SIZE,
            cardH: stack_layout_1.STACK_CARD_SIZE,
            items,
            cards: assigned.cards,
            reservePositions: stack_generator_1.stackReservePositions(stack_layout_1.STACK_CARD_SIZE, stack_layout_1.STACK_CARD_SIZE, 12),
            momPositions: stack_generator_1.stackMomPositions(stack_layout_1.STACK_CARD_SIZE),
            solution: assigned.solution,
            slotCapacity: DAILY_SLOT_CAPACITY,
        };
        return stack_solver_1.solveStackLevel(level, { maxNodes: 120000 }).solvable ? level : undefined;
    }
    /** Win rate of the greedy bot without props; deterministic for a given level. */
    function dailyGreedyRate(level, runs = DAILY_TARGET.runs) {
        return stack_sim_1.simulateStackBatch(level, { strategy: 'greedy', itemMode: 'none', seed: 'daily-calibration' }, runs).winRate;
    }
    exports_1("dailyGreedyRate", dailyGreedyRate);
    /**
     * Builds today's board and keeps re-rolling (deterministically) until the greedy no-prop bot wins
     * 42–58% of the time, so every date lands in the same comfortable 30–70% band. Falls back to the
     * closest candidate if none of the attempts hits the window.
     */
    /** Runtime calibration: the first attempt whose greedy rate is in the window (or the closest one). */
    function calibrateDaily(dateKey, maxAttempts = 24) {
        validateDateKey(dateKey);
        if (!Number.isInteger(maxAttempts) || maxAttempts < 1)
            throw new Error('invalid daily generator attempts');
        const seed = `trunk-daily-${dateKey}`;
        let best;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const level = attemptDaily(dateKey, seed, attempt);
            if (!level)
                continue;
            // Cheap screen first; only promising boards pay for the precise 200-run check.
            const screen = dailyGreedyRate(level, DAILY_TARGET.screenRuns);
            const rate = Math.abs(screen - .5) <= .15 ? dailyGreedyRate(level) : screen;
            if (rate >= DAILY_TARGET.low && rate <= DAILY_TARGET.high)
                return { level, attempt };
            const miss = Math.abs(rate - (DAILY_TARGET.low + DAILY_TARGET.high) / 2);
            if (!best || miss < best.miss)
                best = { level, attempt, miss };
        }
        if (best)
            return { level: best.level, attempt: best.attempt };
        throw new Error(`no solvable daily stack seed after ${maxAttempts} attempts`);
    }
    exports_1("calibrateDaily", calibrateDaily);
    /**
     * Today's board, re-rolled (deterministically) until the greedy no-prop bot wins 42–58% of the
     * time so every date lands in the same comfortable 30–70% band. Dates covered by the offline table
     * (tools/gen-daily-table.ts) jump straight to the calibrated attempt, so phones build one board.
     */
    function generateDailyLevel(dateKey, maxAttempts = 24) {
        validateDateKey(dateKey);
        const known = dailyTableAttempt(dateKey);
        if (known !== undefined) {
            const level = attemptDaily(dateKey, `trunk-daily-${dateKey}`, known);
            if (level)
                return level;
        }
        return calibrateDaily(dateKey, maxAttempts).level;
    }
    exports_1("generateDailyLevel", generateDailyLevel);
    /** Calibrated attempt index for a date in the shipped table, if any. */
    function dailyTableAttempt(dateKey) {
        const [sy, sm, sd] = stack_daily_table_1.DAILY_TABLE_START.split('-').map(Number);
        const start = Date.UTC(sy, sm - 1, sd);
        const [y, m, d] = dateKey.split('-').map(Number);
        const index = Math.round((Date.UTC(y, m - 1, d) - start) / 86400000);
        if (index < 0 || index >= stack_daily_table_1.DAILY_TABLE.length)
            return undefined;
        const value = parseInt(stack_daily_table_1.DAILY_TABLE[index], 36);
        return Number.isNaN(value) ? undefined : value;
    }
    exports_1("dailyTableAttempt", dailyTableAttempt);
    function dailySeedFor(dateKey) {
        validateDateKey(dateKey);
        return `trunk-daily-${dateKey}`;
    }
    exports_1("dailySeedFor", dailySeedFor);
    return {
        setters: [
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (stack_catalog_1_1) {
                stack_catalog_1 = stack_catalog_1_1;
            },
            function (stack_generator_1_1) {
                stack_generator_1 = stack_generator_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_daily_table_1_1) {
                stack_daily_table_1 = stack_daily_table_1_1;
            },
            function (stack_sim_1_1) {
                stack_sim_1 = stack_sim_1_1;
            },
            function (stack_solver_1_1) {
                stack_solver_1 = stack_solver_1_1;
            }
        ],
        execute: function () {
            BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;
            exports_1("beijingDateKey", beijingDateKey = dailySeed);
            exports_1("DAILY_CARD_OPTIONS", DAILY_CARD_OPTIONS = [
                { cards: 72, items: 9, layers: [27, 21, 18, 6] },
                { cards: 78, items: 9, layers: [30, 24, 18, 6] },
                { cards: 84, items: 10, layers: [30, 27, 21, 6] },
                { cards: 90, items: 10, layers: [30, 27, 24, 9] },
            ]);
            exports_1("DAILY_LAYERS", DAILY_LAYERS = 4);
            exports_1("DAILY_SLOT_CAPACITY", DAILY_SLOT_CAPACITY = 7);
            /** Greedy no-prop win-rate window every shipped daily board is checked against. */
            exports_1("DAILY_TARGET", DAILY_TARGET = { low: .42, high: .58, screenRuns: 50, runs: 200 });
        }
    };
});

System.register("chunks:///_virtual/stack-endless-table.ts", [], function (exports_1, context_1) {
    "use strict";
    var ENDLESS_TUNING;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Fixed per-level generator seeds for road levels 3–9 (offline calibration, tools/calibrate-endless.ts).
             * Rates: greedy look-ahead bot with every prop + one revive, 400 runs (seed confirm-n) / 600 runs (seed verify-n).
             */
            exports_1("ENDLESS_TUNING", ENDLESS_TUNING = {
                3: { rushRate: 1, minGap: 6, maxOpenGroups: 3, attempt: 0 }, // 26.00% / 20.67% (target ~25%)
                4: { rushRate: .85, minGap: 6, maxOpenGroups: 3, attempt: 5, kindDelta: 2 }, // 21.50% / 21.50% (~20%)
                5: { rushRate: 1, minGap: 6, maxOpenGroups: 3, attempt: 4, kindDelta: 4 }, // 13.75% / 15.50% (~15%)
                6: { rushRate: 1, minGap: 6, maxOpenGroups: 3, attempt: 20 }, // 13.25% / 13.83% (~12%)
                7: { rushRate: 1, minGap: 6, maxOpenGroups: 3, attempt: 1 }, // 8.25% / 7.17% (~9%)
                8: { rushRate: .5, minGap: 6, maxOpenGroups: 3, attempt: 5 }, // 6.00% / 6.83% (~7%)
                9: { rushRate: .7, minGap: 6, maxOpenGroups: 3, attempt: 4 }, // 7.25% / 7.00% (~5%, floor 5%)
            });
        }
    };
});

System.register("chunks:///_virtual/stack-endless.ts", ["./rng.ts","./stack-catalog.ts","./stack-generator.ts","./stack-layout.ts","./stack-rules.ts","./stack-solver.ts","./stack-endless-table.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_catalog_1, stack_generator_1, stack_layout_1, stack_rules_1, stack_solver_1, stack_endless_table_1, ENDLESS_MIN_STAGE, ENDLESS_MAX_CARDS, ENDLESS_BASE_CARDS, ENDLESS_CARDS_PER_STAGE, ENDLESS_MAX_LAYERS, ENDLESS_BASE_LAYERS, ENDLESS_MAX_KINDS, ROUTE_TITLES, ROAD_FINAL_STAGE, MOUND_TEMPLATES, MOUND_STEP_X, MOUND_STEP_Y, MOUND_CENTER_Y, MOUND_LIFT_X, MOUND_LIFT_Y, ENDLESS_OPEN_RANGE, MOUND_ALIGNS, DEFAULT_TUNING;
    var __moduleName = context_1 && context_1.id;
    function capacityForLevel(n) {
        if (!Number.isInteger(n) || n < 1)
            throw new Error('invalid endless level');
        if (n <= 3)
            return 7;
        if (n <= 5)
            return 8;
        return 9;
    }
    exports_1("capacityForLevel", capacityForLevel);
    function routeTitleForLevel(n) {
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE || n > ROAD_FINAL_STAGE)
            throw new Error('invalid endless route level');
        return `第 ${n} 关 · ${ROUTE_TITLES[(n - ENDLESS_MIN_STAGE) % ROUTE_TITLES.length]}`;
    }
    exports_1("routeTitleForLevel", routeTitleForLevel);
    function endlessCardCount(n) {
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE)
            throw new Error('invalid endless level');
        return Math.min(ENDLESS_MAX_CARDS, ENDLESS_BASE_CARDS + (n - ENDLESS_MIN_STAGE) * ENDLESS_CARDS_PER_STAGE);
    }
    exports_1("endlessCardCount", endlessCardCount);
    function endlessKindCount(n, available = stack_catalog_1.ENDLESS_ITEMS.length) {
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE)
            throw new Error('invalid endless level');
        return Math.min(available, ENDLESS_MAX_KINDS, 14 + (n - ENDLESS_MIN_STAGE));
    }
    exports_1("endlessKindCount", endlessKindCount);
    function card(id, x, y, layer, source) {
        return { id, kind: '', name: '', x, y, w: stack_layout_1.STACK_CARD_SIZE, h: stack_layout_1.STACK_CARD_SIZE, layer, source };
    }
    /** Pile count for a mound of `count` cards: 10 piles at 20 cards, 18 at 100 (one open card each). */
    function moundPiles(count) {
        return Math.round(8 + count / 10);
    }
    exports_1("moundPiles", moundPiles);
    /** Levels 4–9 each get their own outline (lantern, ingot, 福 square, fish, knot, gourd). */
    function moundTemplateFor(n) {
        return MOUND_TEMPLATES[((n - ENDLESS_MIN_STAGE - 1) % MOUND_TEMPLATES.length + MOUND_TEMPLATES.length) % MOUND_TEMPLATES.length];
    }
    exports_1("moundTemplateFor", moundTemplateFor);
    /**
     * Per-spot pile heights for `count` cards: the centre of the outline rises highest and the
     * edges stay one card tall, so the mound has visible high and low parts instead of a flat grid.
     */
    function moundHeights(spots, distances, count, piles = moundPiles(count)) {
        if (count <= 0)
            return distances.map(() => 0);
        const order = distances.map((distance, index) => ({ distance, index })).sort((a, b) => a.distance - b.distance || a.index - b.index);
        const heights = new Array(spots).fill(0);
        const used = Math.min(spots, count, Math.max(1, piles));
        const chosen = order.slice(0, used);
        const far = Math.max(1e-6, ...chosen.map(spot => spot.distance));
        let peak = 1;
        const total = (top) => chosen.reduce((sum, spot) => sum + Math.max(1, Math.round(top * (1 - spot.distance / far * .85))), 0);
        while (total(peak + .25) <= count && peak < 12)
            peak += .25;
        for (const spot of chosen)
            heights[spot.index] = Math.max(1, Math.round(peak * (1 - spot.distance / far * .85)));
        let left = count - heights.reduce((sum, height) => sum + height, 0);
        for (let index = 0; left > 0; index = (index + 1) % chosen.length, left--)
            heights[chosen[index].index]++;
        for (let index = chosen.length - 1; left < 0; index = (index - 1 + chosen.length) % chosen.length) {
            if (heights[chosen[index].index] > 1) {
                heights[chosen[index].index]--;
                left++;
            }
        }
        return heights;
    }
    exports_1("moundHeights", moundHeights);
    function addMound(cards, n, count, random, piles, align) {
        if (count <= 0)
            return;
        const template = moundTemplateFor(n);
        const rows = template.rows;
        const spots = [];
        const midRow = (rows.length - 1) / 2;
        rows.forEach((line, row) => {
            const midCol = (line.length - 1) / 2;
            for (let col = 0; col < line.length; col++) {
                if (line[col] !== '#')
                    continue;
                const stagger = row % 2 ? MOUND_STEP_X / 4 : -MOUND_STEP_X / 4;
                const x = 375 + (col - midCol) * MOUND_STEP_X + stagger - stack_layout_1.STACK_CARD_SIZE / 2;
                const y = MOUND_CENTER_Y + (row - midRow) * MOUND_STEP_Y - stack_layout_1.STACK_CARD_SIZE / 2;
                spots.push({ x, y, d: Math.hypot((col - midCol) * 1.1, row - midRow) + random() * .3 });
            }
        });
        const heights = moundHeights(spots.length, spots.map(spot => spot.d), count, piles);
        let id = Math.max(...cards.map(item => item.id));
        // Lay level by level so ids stay ordered bottom-up like the rest of the pile.
        const tallest = Math.max(...heights);
        for (let level = 0; level < tallest; level++) {
            spots.forEach((spot, index) => {
                if (heights[index] <= level)
                    return;
                const jitterX = Math.round((random() - .5) * 6);
                const jitterY = Math.round((random() - .5) * 6);
                cards.push(card(++id, Math.round(spot.x + level * MOUND_LIFT_X + jitterX), Math.round(spot.y + level * MOUND_LIFT_Y + jitterY), 
                // `align` lifts shorter piles toward the tallest one: at 1 every pile top shares the top
                // layer (all open), at 0 only local peaks are open. layoutEndless tunes it for 6–8 openers.
                ENDLESS_BASE_LAYERS + Math.round(align * (tallest - heights[index])) + level, 'pile'));
            });
        }
    }
    function addSideFan(cards, count) {
        const left = Math.ceil(count / 2);
        const right = count - left;
        let id = Math.max(...cards.map(item => item.id));
        for (let index = 0; index < left; index++) {
            cards.push(card(++id, 36 + index * 13, stack_generator_1.STACK_SIDE_FAN_Y, 40 + index, 'side-left'));
        }
        for (let index = 0; index < right; index++) {
            cards.push(card(++id, 606 - index * 13, stack_generator_1.STACK_SIDE_FAN_Y, 40 + index, 'side-right'));
        }
    }
    /**
     * A compact endless mound. The base reuses the approved stage-two footprint; later stages add
     * stacked inner layers and grow the two side fans instead of widening the board.
     */
    function layoutEndless(n, random) {
        const target = endlessCardCount(n);
        const extraCards = Math.max(0, Math.min(5, n - ENDLESS_MIN_STAGE)) * 20;
        const main = stack_generator_1.layoutStageTwo(random).filter(item => item.source === 'pile');
        const moundSeed = Math.floor(random() * 1e9);
        const build = (piles, align) => {
            const cards = main.map(item => (Object.assign({}, item)));
            addMound(cards, n, extraCards, rng_1.createRng(`mound-${moundSeed}-${piles}-${align}`), piles, align);
            const sideCount = target - cards.length;
            if (sideCount < 0)
                throw new Error('endless layout exceeds target');
            addSideFan(cards, sideCount);
            if (cards.length !== target)
                throw new Error('endless layout card count mismatch');
            return cards;
        };
        if (!extraCards)
            return build(0, 0);
        // Piles about four cards tall, then the nearest pile count / top alignment that opens with
        // ENDLESS_OPEN_RANGE tappable cards (pile tops + the two side fans).
        const preferred = Math.max(6, Math.min(25, Math.round(extraCards / 4)));
        let fallback;
        for (let offset = 0; offset <= 20; offset++) {
            for (const piles of offset ? [preferred - offset, preferred + offset] : [preferred]) {
                if (piles < 3 || piles > extraCards)
                    continue;
                for (const align of MOUND_ALIGNS) {
                    const cards = build(piles, align);
                    const open = stack_rules_1.freeCards(cards).length;
                    if (open >= ENDLESS_OPEN_RANGE[0] && open <= ENDLESS_OPEN_RANGE[1])
                        return cards;
                    const miss = Math.max(ENDLESS_OPEN_RANGE[0] - open, open - ENDLESS_OPEN_RANGE[1]);
                    if (!fallback || miss < fallback.miss)
                        fallback = { cards, miss };
                }
            }
        }
        return fallback.cards;
    }
    exports_1("layoutEndless", layoutEndless);
    /** Share of all cards that start as closed cartons: 15% on level 4, +3 points a level, capped at 30%. */
    function cartonRate(n) {
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE)
            throw new Error('invalid endless level');
        if (n < 4)
            return 0;
        return Math.min(.30, .15 + .03 * (n - 4));
    }
    exports_1("cartonRate", cartonRate);
    /**
     * Marks covered cards as cartons, lowest layers first (side fans count as low), so the visible
     * top of the board stays mostly real cargo with dimmed faces underneath.
     */
    function markCartons(cards, n, random) {
        const wanted = Math.round(cartonRate(n) * cards.length);
        if (!wanted)
            return cards.map(item => (Object.assign({}, item)));
        const depth = (item) => item.source === 'pile' ? item.layer : (item.layer - 40) / 4;
        const covered = cards.filter(item => stack_rules_1.isBlocked(item, cards))
            .map(item => ({ item, key: depth(item) + random() * .9 }))
            .sort((a, b) => a.key - b.key)
            .slice(0, wanted);
        const ids = new Set(covered.map(entry => entry.item.id));
        return cards.map(item => ids.has(item.id) ? Object.assign(Object.assign({}, item), { carton: true }) : Object.assign({}, item));
    }
    exports_1("markCartons", markCartons);
    function endlessTuning(n) {
        var _a;
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE || n > ROAD_FINAL_STAGE)
            throw new Error('invalid endless level');
        return (_a = stack_endless_table_1.ENDLESS_TUNING[n]) !== null && _a !== void 0 ? _a : DEFAULT_TUNING;
    }
    exports_1("endlessTuning", endlessTuning);
    function attemptEndless(n, baseSeed, attempt, tuning) {
        var _a;
        const seed = attempt === 0 ? baseSeed : `${baseSeed}#retry-${attempt}`;
        const random = rng_1.createRng(seed);
        const cards = layoutEndless(n, random);
        const items = stack_catalog_1.ENDLESS_ITEMS.slice(0, endlessKindCount(n) - ((_a = tuning.kindDelta) !== null && _a !== void 0 ? _a : 0));
        const capacity = capacityForLevel(n);
        const assigned = stack_generator_1.assignTriples(cards, items, random, {
            capacity,
            minGap: tuning.minGap,
            maxOpenGroups: tuning.maxOpenGroups,
            rushRate: tuning.rushRate,
        });
        if (!assigned)
            return undefined;
        const level = {
            stage: n,
            seed,
            cardW: stack_layout_1.STACK_CARD_SIZE,
            cardH: stack_layout_1.STACK_CARD_SIZE,
            items,
            cards: markCartons(assigned.cards, n, rng_1.createRng(`${seed}:carton`)),
            reservePositions: stack_generator_1.stackReservePositions(stack_layout_1.STACK_CARD_SIZE, stack_layout_1.STACK_CARD_SIZE, 12, stack_generator_1.STACK_SHELF_Y),
            momPositions: stack_generator_1.stackMomPositions(stack_layout_1.STACK_CARD_SIZE),
            solution: assigned.solution,
            slotCapacity: capacity,
        };
        return stack_solver_1.solveStackLevel(level, { maxNodes: 240000 }).solvable ? level : undefined;
    }
    function generateEndlessLevel(n, maxAttempts = 8, tuning = endlessTuning(n)) {
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE || n > ROAD_FINAL_STAGE)
            throw new Error('invalid endless level');
        if (!Number.isInteger(maxAttempts) || maxAttempts < 1)
            throw new Error('invalid endless generator attempts');
        const seed = `trunk-road-${n}`;
        for (let attempt = tuning.attempt; attempt < tuning.attempt + maxAttempts; attempt++) {
            const level = attemptEndless(n, seed, attempt, tuning);
            if (level)
                return level;
        }
        throw new Error(`no solvable endless stack seed after ${maxAttempts} attempts`);
    }
    exports_1("generateEndlessLevel", generateEndlessLevel);
    function endlessSeedFor(n) {
        if (!Number.isInteger(n) || n < ENDLESS_MIN_STAGE)
            throw new Error('invalid endless level');
        return `trunk-road-${n}`;
    }
    exports_1("endlessSeedFor", endlessSeedFor);
    return {
        setters: [
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (stack_catalog_1_1) {
                stack_catalog_1 = stack_catalog_1_1;
            },
            function (stack_generator_1_1) {
                stack_generator_1 = stack_generator_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_rules_1_1) {
                stack_rules_1 = stack_rules_1_1;
            },
            function (stack_solver_1_1) {
                stack_solver_1 = stack_solver_1_1;
            },
            function (stack_endless_table_1_1) {
                stack_endless_table_1 = stack_endless_table_1_1;
            }
        ],
        execute: function () {
            exports_1("ENDLESS_TUNING", stack_endless_table_1.ENDLESS_TUNING);
            exports_1("ENDLESS_MIN_STAGE", ENDLESS_MIN_STAGE = 3);
            exports_1("ENDLESS_MAX_CARDS", ENDLESS_MAX_CARDS = 240);
            exports_1("ENDLESS_BASE_CARDS", ENDLESS_BASE_CARDS = 165);
            exports_1("ENDLESS_CARDS_PER_STAGE", ENDLESS_CARDS_PER_STAGE = 15);
            exports_1("ENDLESS_MAX_LAYERS", ENDLESS_MAX_LAYERS = 11);
            exports_1("ENDLESS_BASE_LAYERS", ENDLESS_BASE_LAYERS = 6);
            exports_1("ENDLESS_MAX_KINDS", ENDLESS_MAX_KINDS = 30);
            /** One place per road level 3–9; level 9 is the finale at home. */
            exports_1("ROUTE_TITLES", ROUTE_TITLES = ['出城收费站', '高速服务区', '跨江大桥', '山区隧道', '县城环岛', '进村牌楼', '到家了']);
            exports_1("ROAD_FINAL_STAGE", ROAD_FINAL_STAGE = 9);
            /** Mound outlines on a staggered lattice ('#' = a pile spot). Rotated level by level. */
            exports_1("MOUND_TEMPLATES", MOUND_TEMPLATES = [
                { key: 'lantern', name: '灯笼', rows: [
                        '...#...',
                        '..###..',
                        '.#####.',
                        '#######',
                        '.#####.',
                        '..###..',
                        '...#...',
                    ] },
                { key: 'ingot', name: '元宝', rows: [
                        '#.....#',
                        '##...##',
                        '###.###',
                        '#######',
                        '.#####.',
                        '..###..',
                    ] },
                { key: 'fu', name: '福字斗方', rows: [
                        '...#...',
                        '..###..',
                        '.##.##.',
                        '###.###',
                        '.##.##.',
                        '..###..',
                        '...#...',
                    ] },
                { key: 'fish', name: '年年有鱼', rows: [
                        '..##...',
                        '.####.#',
                        '#######',
                        '#######',
                        '.####.#',
                        '..##...',
                    ] },
                { key: 'knot', name: '中国结', rows: [
                        '.#...#.',
                        '###.###',
                        '.#####.',
                        '..###..',
                        '.#####.',
                        '###.###',
                        '.#...#.',
                    ] },
                { key: 'gourd', name: '葫芦', rows: [
                        '...#...',
                        '..###..',
                        '..###..',
                        '...#...',
                        '.#####.',
                        '#######',
                        '.#####.',
                    ] },
            ]);
            MOUND_STEP_X = 92;
            MOUND_STEP_Y = 78;
            MOUND_CENTER_Y = 500;
            /** Each card higher in one spot sits a little up-left so the pile reads as a stack. */
            MOUND_LIFT_X = -5;
            MOUND_LIFT_Y = -9;
            /** Opening tappable cards (pile tops + the two side-fan tops) every road board starts with. */
            exports_1("ENDLESS_OPEN_RANGE", ENDLESS_OPEN_RANGE = [6, 8]);
            MOUND_ALIGNS = [0, .25, .5, .75, 1];
            DEFAULT_TUNING = { rushRate: .85, minGap: 6, maxOpenGroups: 3, attempt: 0 };
        }
    };
});

System.register("chunks:///_virtual/stack-generator.ts", ["./rng.ts","./stack-catalog.ts","./stack-rules.ts","./stack-layout.ts","./stack-solver.ts","./stack-constants.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_catalog_1, stack_rules_1, stack_layout_1, stack_solver_1, stack_constants_1, STACK_SEEDS, STAGE1_CARDS, STAGE2_CARDS, STAGE2_ITEM_COUNT, STAGE2_CARD, GRID, HALF, GRID_X0, GRID_Y0, STACK_ROW_STEP, STACK_SIDE_FAN_Y, STACK_SHELF_Y, MAIN_LAYERS, SIDE_STACKS;
    var __moduleName = context_1 && context_1.id;
    function pileCard(id, x, y, w, h, layer, source) {
        return { id, kind: '', name: '', x, y, w, h, layer, source };
    }
    function layoutStageOne() {
        const cards = [];
        let id = 0;
        const w = 136, h = 136;
        const rows = [
            { y: 240, layer: 0, xs: [205, 365] },
            { y: 315, layer: 1, xs: [140, 305, 470] },
            { y: 395, layer: 0, xs: [125, 300, 475] },
            { y: 470, layer: 1, xs: [205, 382] },
            { y: 550, layer: 0, xs: [195, 375] },
            { y: 625, layer: 1, xs: [115, 465] },
            { y: 705, layer: 0, xs: [120, 465] },
            { y: 780, layer: 1, xs: [185, 395] },
        ];
        for (const row of rows) {
            for (const x of row.xs)
                cards.push(pileCard(++id, x, row.y, w, h, row.layer, 'pile'));
        }
        return cards;
    }
    function layoutStageTwo(random) {
        const cards = [];
        let id = 0;
        MAIN_LAYERS.forEach((layer, index) => {
            var _a;
            const offset = layer.half ? HALF : 0;
            for (let row = layer.rows[0]; row <= layer.rows[1]; row++) {
                const wave = layer.wave ? (row % 2 ? layer.wave : -layer.wave) : 0;
                for (let col = layer.cols[0]; col <= layer.cols[1]; col++) {
                    if ((_a = layer.skip) === null || _a === void 0 ? void 0 : _a.includes(`${col},${row}`))
                        continue;
                    const jitterX = Math.round((random() - .5) * 4);
                    const jitterY = Math.round((random() - .5) * 4);
                    cards.push(pileCard(++id, GRID_X0 + offset + wave + col * GRID + jitterX, GRID_Y0 + offset * STACK_ROW_STEP / GRID + row * STACK_ROW_STEP + jitterY, STAGE2_CARD, STAGE2_CARD, index, 'pile'));
                }
            }
        });
        for (const stack of SIDE_STACKS) {
            for (let index = 0; index < stack.count; index++) {
                cards.push(pileCard(++id, stack.x + index * stack.step, stack.y, STAGE2_CARD, STAGE2_CARD, 20 + index, stack.source));
            }
        }
        return cards;
    }
    exports_1("layoutStageTwo", layoutStageTwo);
    function stackReservePositions(cardW, cardH, count, top = 936) {
        const gap = 8, columns = 6;
        const reserveW = Math.round(cardW * .72);
        const total = columns * reserveW + (columns - 1) * gap;
        const start = Math.round((750 - total) / 2);
        return Array.from({ length: count }, (_, index) => ({
            x: start + (index % columns) * (reserveW + gap),
            y: top + Math.floor(index / columns) * (Math.round(cardH * .72) + 8),
        }));
    }
    exports_1("stackReservePositions", stackReservePositions);
    function stackMomPositions(cardW) {
        return [0, 1, 2].map(index => ({ x: Math.round(375 - cardW * 1.5 + index * cardW), y: 290 }));
    }
    exports_1("stackMomPositions", stackMomPositions);
    function buildCards(stage, random) {
        if (stage === 1) {
            return { cards: layoutStageOne(), items: stack_catalog_1.stackItems(1), w: 136, h: 136 };
        }
        if (stage === 2) {
            return {
                cards: layoutStageTwo(random),
                items: stack_catalog_1.stackItems(2).slice(0, STAGE2_ITEM_COUNT),
                w: STAGE2_CARD,
                h: STAGE2_CARD,
            };
        }
        throw new Error(`unknown stack stage ${stage}`);
    }
    function plannedGroupKinds(groupCount, items, random) {
        if (!items.length || groupCount < items.length)
            return undefined;
        const groups = [...items];
        for (let index = items.length; index < groupCount; index++) {
            groups.push(items[Math.floor(random() * items.length)]);
        }
        return rng_1.shuffle(groups, random);
    }
    /**
     * Assigns kinds to a legal click order. A small set of unfinished groups keeps the certificate's
     * slot occupancy around 3–5 cards instead of clearing each triple immediately. Cards of one kind
     * are deliberately separated by other picks, while open groups always have distinct kinds so the
     * recorded order can never auto-pack more than one group at a time.
     */
    function assignTriples(cards, items, random, capacityOrOptions = stack_constants_1.SLOT_CAPACITY) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const options = typeof capacityOrOptions === 'number'
            ? { capacity: capacityOrOptions }
            : capacityOrOptions;
        const capacity = stack_constants_1.slotCapacityOf({ slotCapacity: (_a = options.capacity) !== null && _a !== void 0 ? _a : stack_constants_1.SLOT_CAPACITY });
        const minGap = (_b = options.minGap) !== null && _b !== void 0 ? _b : 7;
        const maxOpenGroups = (_c = options.maxOpenGroups) !== null && _c !== void 0 ? _c : 3;
        const rushRate = (_d = options.rushRate) !== null && _d !== void 0 ? _d : 0;
        if (!(rushRate >= 0 && rushRate <= 1))
            throw new Error('invalid stack rush rate');
        if (!Number.isInteger(minGap) || minGap < 0)
            throw new Error('invalid stack triple gap');
        if (!Number.isInteger(maxOpenGroups) || maxOpenGroups < 1)
            throw new Error('invalid stack in-flight groups');
        if (cards.length % stack_constants_1.PACK_SIZE !== 0)
            return undefined;
        const planned = plannedGroupKinds(cards.length / stack_constants_1.PACK_SIZE, items, random);
        if (!planned)
            return undefined;
        const remaining = new Map();
        for (const item of planned)
            remaining.set(item.key, ((_e = remaining.get(item.key)) !== null && _e !== void 0 ? _e : 0) + 1);
        const itemByKey = new Map(items.map(item => [item.key, item]));
        const lastPick = new Map();
        let active = [...cards];
        const solution = [];
        const open = [];
        let pending = 0;
        let rush;
        const pickOpen = (wanted) => {
            const matches = open.filter(group => group.picks === wanted);
            if (!matches.length)
                return undefined;
            return matches[Math.floor(random() * matches.length)];
        };
        const canStart = (index) => {
            if (open.length >= maxOpenGroups)
                return false;
            const openKeys = new Set(open.map(group => group.item.key));
            return [...remaining.entries()].some(([key, count]) => count > 0 && !openKeys.has(key)
                && (lastPick.get(key) === undefined || index - lastPick.get(key) >= minGap));
        };
        const startGroup = (index) => {
            var _a;
            if (open.length >= maxOpenGroups)
                return undefined;
            const openKeys = new Set(open.map(group => group.item.key));
            const available = [...remaining.entries()]
                .filter(([key, count]) => count > 0 && !openKeys.has(key) && itemByKey.has(key));
            const spaced = available.filter(([key]) => lastPick.get(key) === undefined || index - lastPick.get(key) >= minGap);
            const pool = spaced.length ? spaced : available;
            if (!pool.length)
                return undefined;
            const [key] = pool[Math.floor(random() * pool.length)];
            remaining.set(key, ((_a = remaining.get(key)) !== null && _a !== void 0 ? _a : 0) - 1);
            const group = { item: itemByKey.get(key), picks: 0 };
            open.push(group);
            return group;
        };
        const continueGroup = (group) => {
            group.picks++;
            pending++;
        };
        const completeGroup = (group) => {
            group.picks++;
            pending -= stack_constants_1.PACK_SIZE - 1;
            open.splice(open.indexOf(group), 1);
        };
        for (let index = 0; index < cards.length; index++) {
            const available = stack_rules_1.freeCards(active);
            if (!available.length)
                return undefined;
            let group;
            const pair = pickOpen(2);
            const single = pickOpen(1);
            if (rush) {
                group = rush;
            }
            else if (pending >= 5) {
                if (!pair)
                    return undefined;
                group = pair;
            }
            else if (pending <= 2) {
                group = (_g = (_f = startGroup(index)) !== null && _f !== void 0 ? _f : single) !== null && _g !== void 0 ? _g : pair;
            }
            else if (pending === 3) {
                group = (_h = single !== null && single !== void 0 ? single : startGroup(index)) !== null && _h !== void 0 ? _h : pair;
            }
            else {
                group = canStart(index) ? startGroup(index) : pair;
                group !== null && group !== void 0 ? group : (group = single);
            }
            if (!group)
                return undefined;
            if (rushRate > 0 && !rush && group.picks === 0 && pending <= capacity - 3 && random() < rushRate)
                rush = group;
            if (group.picks === 2) {
                if (group === rush)
                    rush = undefined;
                completeGroup(group);
            }
            else
                continueGroup(group);
            if (pending > capacity)
                return undefined;
            const card = available[Math.floor(random() * available.length)];
            card.kind = group.item.key;
            card.name = group.item.name;
            lastPick.set(group.item.key, index);
            solution.push(card.id);
            active = active.filter(candidate => candidate.id !== card.id);
        }
        if (active.length || pending !== 0 || open.length)
            return undefined;
        return { cards, solution };
    }
    exports_1("assignTriples", assignTriples);
    function attemptLevel(stage, baseSeed, attempt) {
        const seed = attempt === 0 ? baseSeed : `${baseSeed}#retry-${attempt}`;
        const random = rng_1.createRng(seed);
        const built = buildCards(stage, random);
        const capacity = stack_constants_1.SLOT_CAPACITY;
        const assigned = assignTriples(built.cards, built.items, random, {
            capacity,
            minGap: stage === 2 ? 5 : 4,
            maxOpenGroups: stage === 2 ? 2 : 2,
        });
        if (!assigned)
            throw new Error('layout could not be assigned');
        const level = {
            stage,
            seed,
            cardW: built.w,
            cardH: built.h,
            items: built.items,
            cards: assigned.cards,
            reservePositions: stackReservePositions(built.w, built.h, 12, stage === 2 ? STACK_SHELF_Y : 936),
            momPositions: stackMomPositions(built.w),
            solution: assigned.solution,
            slotCapacity: capacity,
        };
        return { level, solvable: stack_solver_1.solveStackLevel(level, { maxNodes: 120000 }).solvable };
    }
    function generateStackLevel(stage, baseSeed, maxAttempts = 8) {
        if (stage !== 1 && stage !== 2)
            throw new Error(`unknown stack stage ${stage}`);
        if (!Number.isInteger(maxAttempts) || maxAttempts < 1)
            throw new Error('invalid stack generator attempts');
        const seedBase = baseSeed !== null && baseSeed !== void 0 ? baseSeed : STACK_SEEDS[stage - 1];
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const built = attemptLevel(stage, seedBase, attempt);
            if (built.solvable)
                return { level: built.level, attempts: attempt + 1 };
        }
        throw new Error(`no solvable stack seed after ${maxAttempts} attempts`);
    }
    exports_1("generateStackLevel", generateStackLevel);
    function stackItemFor(level, key) {
        return stack_catalog_1.stackItemByName(level.items, key);
    }
    exports_1("stackItemFor", stackItemFor);
    return {
        setters: [
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (stack_catalog_1_1) {
                stack_catalog_1 = stack_catalog_1_1;
            },
            function (stack_rules_1_1) {
                stack_rules_1 = stack_rules_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_solver_1_1) {
                stack_solver_1 = stack_solver_1_1;
            },
            function (stack_constants_1_1) {
                stack_constants_1 = stack_constants_1_1;
            }
        ],
        execute: function () {
            exports_1("STACK_SEEDS", STACK_SEEDS = ['trunk-stack-stage1-v1', 'trunk-stack-stage2-v2a']);
            exports_1("STAGE1_CARDS", STAGE1_CARDS = 18);
            exports_1("STAGE2_CARDS", STAGE2_CARDS = 150);
            exports_1("STAGE2_ITEM_COUNT", STAGE2_ITEM_COUNT = 12);
            STAGE2_CARD = stack_layout_1.STACK_CARD_SIZE;
            GRID = 112;
            HALF = GRID / 2;
            GRID_X0 = Math.round((750 - (5 * GRID + STAGE2_CARD)) / 2);
            GRID_Y0 = 150;
            /**
             * Rows sit 100 apart (cards are 108), slightly tighter than the 112 columns, so the 150-card
             * mound fits a 390×844 phone at full card size (≥56px) above the vehicle.
             */
            exports_1("STACK_ROW_STEP", STACK_ROW_STEP = 100);
            /** Top of the two bottom side fans and of the side shelf for moved-out cards. */
            exports_1("STACK_SIDE_FAN_Y", STACK_SIDE_FAN_Y = GRID_Y0 + 6 * STACK_ROW_STEP + STAGE2_CARD + 76);
            exports_1("STACK_SHELF_Y", STACK_SHELF_Y = STACK_SIDE_FAN_Y - 70);
            /**
             * Bottom-to-top layers of the hard mound. Odd layers sit half a card right and down, so every
             * card is pinned by up to four cards above; upper layers shrink towards the centre and the
             * base loses its top corners, giving a hill silhouette instead of a wall. The cap zig-zags six
             * reachable cards across the crown so the opening choices are broader without flattening the pile.
             */
            MAIN_LAYERS = [
                { cols: [0, 5], rows: [0, 6], half: false, skip: ['0,0', '5,0', '0,1', '5,1', '2,6', '3,6'] },
                { cols: [0, 4], rows: [0, 5], half: true, skip: ['0,0', '4,0'] },
                { cols: [1, 4], rows: [0, 6], half: false },
                { cols: [1, 3], rows: [0, 5], half: true },
                { cols: [2, 3], rows: [1, 5], half: false },
                { cols: [2, 2], rows: [0, 5], half: true, wave: 40 },
            ];
            SIDE_STACKS = [
                { source: 'side-left', x: 36, y: STACK_SIDE_FAN_Y, count: 12, step: 13 },
                { source: 'side-right', x: 606, y: STACK_SIDE_FAN_Y, count: 12, step: -13 },
            ];
        }
    };
});

System.register("chunks:///_virtual/stack-layout.ts", [], function (exports_1, context_1) {
    "use strict";
    var STACK_DESIGN_WIDTH, STACK_HUD_BOTTOM, STACK_MIN_HEIGHT, STACK_CARD_SIZE, STACK_CAR_SCALE_Y, STACK_ACTION_HEIGHT, STACK_BODY_SIZE, STACK_BODY_HOLE, STACK_BODY_SLICE, STACK_LID_RISE, STACK_BOARD_GAP, STACK_MIN_SAFE_BOTTOM, STACK_BOARD_MAX_SCALE, IDENTITY_BOARD;
    var __moduleName = context_1 && context_1.id;
    /** Converts a phone viewport to the 750-wide design coordinate used by StackPage. */
    function stackPageHeight(screenWidth, screenHeight) {
        if (!(screenWidth > 0) || !(screenHeight > 0))
            return STACK_MIN_HEIGHT;
        return Math.max(STACK_MIN_HEIGHT, screenHeight / screenWidth * STACK_DESIGN_WIDTH);
    }
    exports_1("stackPageHeight", stackPageHeight);
    /** Shared, renderer-independent geometry for the board, car and bottom action row. */
    /**
     * `vehicleTop` (design y of the top of a non-sedan ride's art) replaces the sedan's lid as the
     * lowest line the board may reach.
     */
    /**
     * `carScale` shrinks the sedan uniformly around the page centre on short phones (the lid, hole and
     * body all follow), freeing board height so 375×667 keeps ≥44px cards.
     */
    function createStackPageLayout(height, safeBottom = 0, vehicleTop, carScale = 1) {
        safeBottom = Math.max(STACK_MIN_SAFE_BOTTOM, safeBottom);
        const actionY = height - safeBottom - 20 - STACK_ACTION_HEIGHT;
        const bodyHeight = Math.round(STACK_BODY_SIZE.h * STACK_CAR_SCALE_Y * carScale);
        const carBottom = actionY - 26;
        const carTop = carBottom - bodyHeight;
        const trunk = {
            x: Math.round((STACK_BODY_HOLE.left - STACK_BODY_SIZE.w / 2) * carScale + STACK_DESIGN_WIDTH / 2),
            y: carTop + Math.round(STACK_BODY_HOLE.top * STACK_CAR_SCALE_Y * carScale),
            w: Math.round((STACK_BODY_HOLE.right - STACK_BODY_HOLE.left) * carScale),
            h: Math.round((STACK_BODY_HOLE.bottom - STACK_BODY_HOLE.top) * STACK_CAR_SCALE_Y * carScale),
        };
        const stackTop = STACK_HUD_BOTTOM;
        // Cards must stay above the open lid, not merely above the trunk hole.
        const stackBottom = (vehicleTop !== null && vehicleTop !== void 0 ? vehicleTop : carTop - STACK_LID_RISE * carScale) - STACK_BOARD_GAP;
        return {
            height,
            safeBottom,
            actionY,
            carBottom,
            carTop,
            bodyHeight,
            trunk,
            stackTop,
            stackBottom,
            stackRatio: Math.max(0, stackBottom - stackTop) / height,
            carScale,
        };
    }
    exports_1("createStackPageLayout", createStackPageLayout);
    function stackCardBounds(cards) {
        if (!cards.length)
            return { left: 0, right: 0, top: 0, bottom: 0 };
        return {
            left: Math.min(...cards.map(card => card.x)),
            right: Math.max(...cards.map(card => card.x + card.w)),
            top: Math.min(...cards.map(card => card.y)),
            bottom: Math.max(...cards.map(card => card.y + card.h)),
        };
    }
    exports_1("stackCardBounds", stackCardBounds);
    /**
     * Everything the board can ever show in level space: the dealt cards, the reserve shelf that
     * move-out fills, and where mom drops her goods. Fitting this box keeps later cards inside too.
     */
    function stackContentBounds(level) {
        const reserve = Math.round(level.cardW * .72);
        const boxes = [
            ...level.cards,
            ...level.reservePositions.map(p => ({ x: p.x, y: p.y, w: reserve, h: reserve })),
            ...level.momPositions.map(p => ({ x: p.x, y: p.y, w: level.cardW, h: level.cardH })),
        ];
        return {
            left: Math.min(...boxes.map(b => b.x)),
            right: Math.max(...boxes.map(b => b.x + b.w)),
            top: Math.min(...boxes.map(b => b.y)),
            bottom: Math.max(...boxes.map(b => b.y + b.h)),
        };
    }
    exports_1("stackContentBounds", stackContentBounds);
    /** Scales the board to the real space between the title bar and the trunk lid and centres it. */
    function fitStackBoard(bounds, layout) {
        const width = Math.max(1, bounds.right - bounds.left);
        const height = Math.max(1, bounds.bottom - bounds.top);
        const availableW = STACK_DESIGN_WIDTH - 16;
        const availableH = Math.max(1, layout.stackBottom - layout.stackTop);
        const scale = Math.min(STACK_BOARD_MAX_SCALE, availableW / width, availableH / height);
        return {
            scale,
            offsetX: (STACK_DESIGN_WIDTH - width * scale) / 2 - bounds.left * scale,
            offsetY: layout.stackTop + (availableH - height * scale) / 2 - bounds.top * scale,
        };
    }
    exports_1("fitStackBoard", fitStackBoard);
    function mapStackRect(fit, rect) {
        return { x: fit.offsetX + rect.x * fit.scale, y: fit.offsetY + rect.y * fit.scale, w: rect.w * fit.scale, h: rect.h * fit.scale };
    }
    exports_1("mapStackRect", mapStackRect);
    /** Page point → level point (inverse of mapStackRect), for hit-testing taps. */
    function unmapStackPoint(fit, x, y) {
        return { x: (x - fit.offsetX) / fit.scale, y: (y - fit.offsetY) / fit.scale };
    }
    exports_1("unmapStackPoint", unmapStackPoint);
    function stackCardsAreVisible(cards, layout, fit = IDENTITY_BOARD) {
        const bounds = stackCardBounds(cards.map(card => (Object.assign(Object.assign({}, card), mapStackRect(fit, card)))));
        const eps = 0.5;
        return bounds.left >= -eps
            && bounds.right <= STACK_DESIGN_WIDTH + eps
            && bounds.top >= layout.stackTop - eps
            && bounds.bottom <= layout.stackBottom + eps;
    }
    exports_1("stackCardsAreVisible", stackCardsAreVisible);
    return {
        setters: [],
        execute: function () {
            exports_1("STACK_DESIGN_WIDTH", STACK_DESIGN_WIDTH = 750);
            exports_1("STACK_HUD_BOTTOM", STACK_HUD_BOTTOM = 140);
            exports_1("STACK_MIN_HEIGHT", STACK_MIN_HEIGHT = 1334);
            exports_1("STACK_CARD_SIZE", STACK_CARD_SIZE = 108);
            exports_1("STACK_CAR_SCALE_Y", STACK_CAR_SCALE_Y = 0.55);
            exports_1("STACK_ACTION_HEIGHT", STACK_ACTION_HEIGHT = 68);
            exports_1("STACK_BODY_SIZE", STACK_BODY_SIZE = { w: 1024, h: 640 });
            exports_1("STACK_BODY_HOLE", STACK_BODY_HOLE = { left: 159, right: 878, top: 104, bottom: 425 });
            exports_1("STACK_BODY_SLICE", STACK_BODY_SLICE = { top: 150, bottom: 380 });
            /** The open trunk lid is drawn 82 tall centred 34 above the car top, so it reaches 75 above it. */
            exports_1("STACK_LID_RISE", STACK_LID_RISE = 75);
            /** Breathing room between the lowest card and the lid. */
            exports_1("STACK_BOARD_GAP", STACK_BOARD_GAP = 10);
            /** Minimum bottom margin (design units) kept clear for the Android gesture bar / iOS home indicator. */
            exports_1("STACK_MIN_SAFE_BOTTOM", STACK_MIN_SAFE_BOTTOM = 28);
            /** The board never grows past this, so wide phones keep the approved card size. */
            exports_1("STACK_BOARD_MAX_SCALE", STACK_BOARD_MAX_SCALE = 1);
            exports_1("IDENTITY_BOARD", IDENTITY_BOARD = { scale: 1, offsetX: 0, offsetY: 0 });
        }
    };
});

System.register("chunks:///_virtual/stack-progress.ts", ["./stack-daily.ts","./stack-endless.ts","./stack-generator.ts"], function (exports_1, context_1) {
    "use strict";
    var stack_daily_1, stack_endless_1, stack_generator_1, STACK_BEST_LEVEL_KEY, STACK_DAILY_DONE_KEY, STACK_HOME_DONE_KEY;
    var __moduleName = context_1 && context_1.id;
    function normalizeRoute(value) {
        if (value === 'daily')
            return 'daily';
        const n = Number(value);
        if (!Number.isInteger(n) || n < 1)
            return 1;
        return Math.min(stack_endless_1.ROAD_FINAL_STAGE, n);
    }
    exports_1("normalizeRoute", normalizeRoute);
    function levelForRoute(route, now = new Date()) {
        if (route === 'daily')
            return stack_daily_1.generateDailyLevel(stack_daily_1.dailySeed(now));
        if (route >= stack_endless_1.ENDLESS_MIN_STAGE)
            return stack_endless_1.generateEndlessLevel(route);
        const stage = route === 2 ? 2 : 1;
        return stack_generator_1.generateStackLevel(stage, stack_generator_1.STACK_SEEDS[stage - 1]).level;
    }
    exports_1("levelForRoute", levelForRoute);
    /** HUD lines: “第 3 关” + “出城收费站”, or the daily date. */
    function routeHeadline(route, now = new Date()) {
        if (route === 'daily') {
            const [, month, day] = stack_daily_1.dailySeed(now).split('-').map(Number);
            return { stage: '每日一关', subtitle: `${month} 月 ${day} 日 · 今日挑战` };
        }
        if (route >= stack_endless_1.ENDLESS_MIN_STAGE) {
            const [stage, place] = stack_endless_1.routeTitleForLevel(route).split(' · ');
            return { stage, subtitle: place };
        }
        return { stage: `第 ${route} 关`, subtitle: null };
    }
    exports_1("routeHeadline", routeHeadline);
    /** Daily boards ride a different vehicle each day (Beijing date), level boards follow the level. */
    function vehicleLevelForRoute(route, now = new Date()) {
        if (route !== 'daily')
            return route;
        const [year, month, day] = stack_daily_1.dailySeed(now).split('-').map(Number);
        const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86400000);
        return 1 + dayNumber % 9;
    }
    exports_1("vehicleLevelForRoute", vehicleLevelForRoute);
    function readBestLevel(storage) {
        try {
            const n = Number(storage === null || storage === void 0 ? void 0 : storage.getItem(STACK_BEST_LEVEL_KEY));
            return Number.isInteger(n) && n > 0 ? n : 0;
        }
        catch (_a) {
            return 0;
        }
    }
    exports_1("readBestLevel", readBestLevel);
    /** Remembers the farthest level the player has reached (started). Returns the new best. */
    function recordLevelReached(storage, level) {
        const best = Math.min(stack_endless_1.ROAD_FINAL_STAGE, Math.max(readBestLevel(storage), Math.floor(level)));
        try {
            storage === null || storage === void 0 ? void 0 : storage.setItem(STACK_BEST_LEVEL_KEY, String(best));
        }
        catch ( /* storage optional */_a) { /* storage optional */ }
        return best;
    }
    exports_1("recordLevelReached", recordLevelReached);
    function isDailyDone(storage, now = new Date()) {
        try {
            return (storage === null || storage === void 0 ? void 0 : storage.getItem(STACK_DAILY_DONE_KEY)) === stack_daily_1.dailySeed(now);
        }
        catch (_a) {
            return false;
        }
    }
    exports_1("isDailyDone", isDailyDone);
    function markDailyDone(storage, now = new Date()) {
        try {
            storage === null || storage === void 0 ? void 0 : storage.setItem(STACK_DAILY_DONE_KEY, stack_daily_1.dailySeed(now));
        }
        catch ( /* storage optional */_a) { /* storage optional */ }
    }
    exports_1("markDailyDone", markDailyDone);
    function nextRouteTitle(route) {
        if (route === 'daily' || route >= stack_endless_1.ROAD_FINAL_STAGE)
            return null;
        return `继续回家路 · 第 ${route + 1} 关`;
    }
    exports_1("nextRouteTitle", nextRouteTitle);
    /** Whether the level-9 finale has been cleared at least once. */
    function isHomeDone(storage) {
        try {
            return (storage === null || storage === void 0 ? void 0 : storage.getItem(STACK_HOME_DONE_KEY)) === '1';
        }
        catch (_a) {
            return false;
        }
    }
    exports_1("isHomeDone", isHomeDone);
    function markHomeDone(storage) {
        try {
            storage === null || storage === void 0 ? void 0 : storage.setItem(STACK_HOME_DONE_KEY, '1');
        }
        catch ( /* storage optional */_a) { /* storage optional */ }
    }
    exports_1("markHomeDone", markHomeDone);
    /** Home-screen progress: “回家进度 N/9”, or “已到家” once the finale is cleared. */
    function homeProgressLabel(storage) {
        if (isHomeDone(storage))
            return '已到家';
        const best = readBestLevel(storage);
        return best >= 2 ? `回家进度 ${best}/${stack_endless_1.ROAD_FINAL_STAGE}` : '';
    }
    exports_1("homeProgressLabel", homeProgressLabel);
    function browserStorage() {
        try {
            return typeof localStorage === 'undefined' ? undefined : localStorage;
        }
        catch (_a) {
            return undefined;
        }
    }
    exports_1("browserStorage", browserStorage);
    return {
        setters: [
            function (stack_daily_1_1) {
                stack_daily_1 = stack_daily_1_1;
            },
            function (stack_endless_1_1) {
                stack_endless_1 = stack_endless_1_1;
            },
            function (stack_generator_1_1) {
                stack_generator_1 = stack_generator_1_1;
            }
        ],
        execute: function () {
            exports_1("ROAD_FINAL_STAGE", stack_endless_1.ROAD_FINAL_STAGE);
            exports_1("STACK_BEST_LEVEL_KEY", STACK_BEST_LEVEL_KEY = 'smhj.bestLevel');
            exports_1("STACK_DAILY_DONE_KEY", STACK_DAILY_DONE_KEY = 'smhj.dailyDone');
            exports_1("STACK_HOME_DONE_KEY", STACK_HOME_DONE_KEY = 'smhj.homeDone');
        }
    };
});

System.register("chunks:///_virtual/stack-rules.ts", ["./rng.ts","./stack-catalog.ts","./stack-state-solver.ts","./stack-constants.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_catalog_1, stack_state_solver_1, stack_constants_1, MOM_INTERVAL_MS, MOM_SOLVE_NODES, MOM_PLACEMENT_ATTEMPTS, StackGame;
    var __moduleName = context_1 && context_1.id;
    function rectsOverlap(a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    exports_1("rectsOverlap", rectsOverlap);
    function isBlocked(card, cards) {
        return cards.some(other => other.id !== card.id && other.layer > card.layer && rectsOverlap(card, other));
    }
    exports_1("isBlocked", isBlocked);
    function freeCards(cards) {
        return cards.filter(card => !isBlocked(card, cards));
    }
    exports_1("freeCards", freeCards);
    function topCardAt(cards, x, y) {
        return [...cards]
            .filter(card => x >= card.x && x <= card.x + card.w && y >= card.y && y <= card.y + card.h)
            .sort((a, b) => b.layer - a.layer)[0];
    }
    exports_1("topCardAt", topCardAt);
    function slotInsertIndex(slot, kind) {
        let index = slot.length;
        for (let i = slot.length - 1; i >= 0; i--) {
            if (slot[i].kind === kind) {
                index = i + 1;
                break;
            }
        }
        return index;
    }
    exports_1("slotInsertIndex", slotInsertIndex);
    function cloneCards(cards) {
        return cards.map(card => (Object.assign({}, card)));
    }
    return {
        setters: [
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (stack_catalog_1_1) {
                stack_catalog_1 = stack_catalog_1_1;
            },
            function (stack_state_solver_1_1) {
                stack_state_solver_1 = stack_state_solver_1_1;
            },
            function (stack_constants_1_1) {
                stack_constants_1 = stack_constants_1_1;
            }
        ],
        execute: function () {
            exports_1("PACK_SIZE", stack_constants_1.PACK_SIZE);
            exports_1("SLOT_CAPACITY", stack_constants_1.SLOT_CAPACITY);
            exports_1("slotCapacityOf", stack_constants_1.slotCapacityOf);
            exports_1("MOM_INTERVAL_MS", MOM_INTERVAL_MS = 25000);
            /** Solver budget per candidate placement of mom's goods. */
            exports_1("MOM_SOLVE_NODES", MOM_SOLVE_NODES = 6000);
            exports_1("MOM_PLACEMENT_ATTEMPTS", MOM_PLACEMENT_ATTEMPTS = 8);
            /** Pure match-three state machine. Rendering owns card nodes, never this class. */
            StackGame = class StackGame {
                constructor(level, random = Math.random, now = 0) {
                    this.level = level;
                    this.random = random;
                    this.slotList = [];
                    this.currentStatus = 'playing';
                    this.propState = { moveOut: false, undo: false, shuffle: false };
                    this.reviveUsed = false;
                    this.groupsCleared = 0;
                    this.lastMomGroup = 0;
                    this.momEvents = 0;
                    this.lastMomSolvable = true;
                    this.cardList = cloneCards(level.cards);
                    this.maxCardId = Math.max(0, ...this.cardList.map(card => card.id));
                    this.nextMomAt = now + MOM_INTERVAL_MS;
                }
                get cards() { return this.cardList; }
                get slot() { return this.slotList; }
                get status() { return this.currentStatus; }
                /** Cards still on the pile, side stacks, reserve shelf, or newly delivered by mom. */
                get pileRemaining() { return this.cardList.length; }
                get remaining() { return this.cardList.length + this.slotList.length; }
                get clearedGroups() { return this.groupsCleared; }
                get momEventCount() { return this.momEvents; }
                get props() { return this.propState; }
                get slotCapacity() { return stack_constants_1.slotCapacityOf(this.level); }
                /** A lost game may be revived once (three slot cards go to the side shelf). */
                get canRevive() { return !this.reviveUsed && this.currentStatus === 'lost' && this.slotList.length >= stack_constants_1.PACK_SIZE; }
                canTap(id) {
                    if (this.currentStatus !== 'playing')
                        return false;
                    const card = this.cardList.find(candidate => candidate.id === id);
                    return !!card && !isBlocked(card, this.cardList);
                }
                tap(id, now = 0) {
                    const card = this.cardList.find(candidate => candidate.id === id);
                    if (this.currentStatus !== 'playing')
                        return this.result(false, 'finished', undefined, [], [], 0);
                    if (!card)
                        return this.result(false, 'missing', undefined, [], [], 0);
                    if (isBlocked(card, this.cardList))
                        return this.result(false, 'blocked', card, [], [], 0);
                    this.history = {
                        cards: cloneCards(this.cardList),
                        slot: cloneCards(this.slotList),
                        status: this.currentStatus,
                        groups: this.groupsCleared,
                    };
                    this.cardList = this.cardList.filter(candidate => candidate.id !== id);
                    const insertAt = slotInsertIndex(this.slotList, card.kind);
                    this.slotList.splice(insertAt, 0, card);
                    const beforePack = cloneCards(this.slotList);
                    const matching = this.slotList.filter(candidate => candidate.kind === card.kind);
                    let packed = [];
                    if (matching.length >= stack_constants_1.PACK_SIZE) {
                        packed = matching.slice(0, stack_constants_1.PACK_SIZE);
                        const packedIds = new Set(packed.map(candidate => candidate.id));
                        this.slotList = this.slotList.filter(candidate => !packedIds.has(candidate.id));
                        this.groupsCleared++;
                    }
                    else if (this.slotList.length >= this.slotCapacity) {
                        this.currentStatus = 'lost';
                    }
                    if (this.cardList.length === 0 && this.slotList.length === 0)
                        this.currentStatus = 'won';
                    this.maybeMomByGroups(now);
                    return this.result(true, undefined, card, packed, beforePack, insertAt);
                }
                useUndo() {
                    if (this.propState.undo || !this.history || this.currentStatus !== 'playing')
                        return false;
                    const snapshot = this.history;
                    this.cardList = cloneCards(snapshot.cards);
                    this.slotList = cloneCards(snapshot.slot);
                    this.currentStatus = snapshot.status;
                    this.groupsCleared = snapshot.groups;
                    this.history = undefined;
                    this.propState = Object.assign(Object.assign({}, this.propState), { undo: true });
                    return true;
                }
                useMoveOut() {
                    if (this.propState.moveOut || this.currentStatus !== 'playing' || this.slotList.length < stack_constants_1.PACK_SIZE)
                        return [];
                    this.propState = Object.assign(Object.assign({}, this.propState), { moveOut: true });
                    return this.moveOutCards();
                }
                revive() {
                    if (!this.canRevive)
                        return [];
                    this.reviveUsed = true;
                    const moved = this.moveOutCards();
                    this.currentStatus = 'playing';
                    this.history = undefined;
                    return moved;
                }
                useShuffle() {
                    if (this.propState.shuffle || this.currentStatus !== 'playing' || this.cardList.length === 0)
                        return false;
                    const kinds = this.cardList.map(card => ({ kind: card.kind, name: card.name }));
                    const mixed = rng_1.shuffle(kinds, this.random);
                    this.cardList = this.cardList.map((card, index) => (Object.assign(Object.assign({}, card), mixed[index])));
                    this.propState = Object.assign(Object.assign({}, this.propState), { shuffle: true });
                    this.history = undefined;
                    return true;
                }
                /**
                 * Mom slips three goods of one (currently scarce) kind into the pile at three different spots:
                 * one on top of a reachable card and two tucked between layers under other cards. A placement
                 * is only kept when the solver confirms the board can still be cleared from the current slot.
                 */
                triggerMom() {
                    var _a;
                    if (this.level.stage < 2 || this.currentStatus !== 'playing')
                        return [];
                    const item = stack_catalog_1.pickRareMomItem(this.level.items, this.cardList.map(card => card.kind), this.random);
                    const slotKinds = this.slotList.map(card => card.kind);
                    let chosen;
                    let fallback;
                    for (let attempt = 0; attempt < MOM_PLACEMENT_ATTEMPTS && !chosen; attempt++) {
                        const added = this.momPlacement(item, attempt);
                        fallback !== null && fallback !== void 0 ? fallback : (fallback = added);
                        const check = stack_state_solver_1.solveStackState([...this.cardList, ...added], slotKinds, { maxNodes: MOM_SOLVE_NODES, capacity: this.slotCapacity });
                        if (check.solvable)
                            chosen = added;
                    }
                    const added = (_a = chosen !== null && chosen !== void 0 ? chosen : fallback) !== null && _a !== void 0 ? _a : [];
                    this.momEvents++;
                    this.lastMomSolvable = !!chosen;
                    this.cardList.push(...added);
                    this.history = undefined;
                    return added;
                }
                /** Whether the last mom insertion was verified solvable (false only if every candidate failed). */
                get momVerified() { return this.lastMomSolvable; }
                momPlacement(item, attempt) {
                    const hosts = this.cardList.filter(card => card.source === 'pile' || card.source === 'side-left' || card.source === 'side-right');
                    const free = rng_1.shuffle(hosts.filter(card => !isBlocked(card, this.cardList)), this.random);
                    const covered = rng_1.shuffle(hosts.filter(card => isBlocked(card, this.cardList)), this.random);
                    const spots = [];
                    const farEnough = (card) => spots.every(spot => Math.abs(spot.x - card.x) + Math.abs(spot.y - card.y) >= card.w * 1.5);
                    const take = (pool, count) => {
                        for (const card of pool) {
                            if (count <= 0)
                                break;
                            if (!spots.includes(card) && farEnough(card)) {
                                spots.push(card);
                                count--;
                            }
                        }
                    };
                    // Late in a level there may be nothing covered left: fall back to reachable spots.
                    const coveredWanted = attempt < MOM_PLACEMENT_ATTEMPTS - 2 ? 2 : 1;
                    take(free, 1);
                    take(covered, coveredWanted);
                    take(free, stack_constants_1.PACK_SIZE - spots.length);
                    take(covered, stack_constants_1.PACK_SIZE - spots.length);
                    take([...free, ...covered], stack_constants_1.PACK_SIZE - spots.length);
                    const positions = spots.length
                        ? spots
                        : this.level.momPositions.map(p => ({ x: p.x, y: p.y, w: this.level.cardW, h: this.level.cardH, layer: 1999 }));
                    return Array.from({ length: stack_constants_1.PACK_SIZE }, (_, i) => {
                        const host = positions[i % positions.length];
                        this.maxCardId++;
                        const nudge = (this.random() - .5) * 12;
                        return {
                            id: this.maxCardId,
                            kind: item.key,
                            name: item.name,
                            x: Math.round(host.x + nudge),
                            y: Math.round(host.y - nudge),
                            w: host.w,
                            h: host.h,
                            // Half a layer above its host: it hides the host card but stays under the host's own covers.
                            layer: host.layer + 0.5 + i * 0.01,
                            source: 'mom',
                        };
                    });
                }
                tickMom(now) {
                    if (this.level.stage < 2 || this.currentStatus !== 'playing' || now < this.nextMomAt)
                        return [];
                    this.nextMomAt = now + MOM_INTERVAL_MS;
                    return this.triggerMom();
                }
                maybeMomByGroups(now) {
                    if (this.level.stage >= 2 && this.groupsCleared - this.lastMomGroup >= 10) {
                        this.lastMomGroup = this.groupsCleared;
                        this.triggerMom();
                        this.nextMomAt = now + MOM_INTERVAL_MS;
                    }
                }
                moveOutCards() {
                    const moved = this.slotList.splice(0, stack_constants_1.PACK_SIZE);
                    const offset = this.cardList.filter(card => card.source === 'reserve').length;
                    const reserveSize = Math.round(this.level.cardW * .72);
                    const restored = moved.map((card, index) => {
                        const pos = this.level.reservePositions[(offset + index) % this.level.reservePositions.length];
                        return Object.assign(Object.assign({}, card), { x: pos.x, y: pos.y, w: reserveSize, h: reserveSize, layer: 1000 + offset + index, source: 'reserve' });
                    });
                    this.cardList.push(...restored);
                    this.history = undefined;
                    this.propState = Object.assign({}, this.propState);
                    return restored;
                }
                result(ok, reason, card, packed, slotBeforePack, insertIndex) {
                    return { ok, reason, card, packed, slotBeforePack, insertIndex, status: this.currentStatus };
                }
            };
            exports_1("StackGame", StackGame);
        }
    };
});

System.register("chunks:///_virtual/stack-share.ts", ["./brand.ts","./rank.ts"], function (exports_1, context_1) {
    "use strict";
    var brand_1, rank_1, STACK_SHARE_WIDTH, STACK_SHARE_HEIGHT, STACK_SHARE_TITLE, STACK_SHARE_BACKLOG_THRESHOLD, STACK_SHARE_ITEM_KEYS, STACK_CARGO_POSITIONS, STACK_SHARE_CAPTIONS, HOMECOMING_CAPTIONS, STACK_SHARE_LINK, FAIL_TAUNTS;
    var __moduleName = context_1 && context_1.id;
    function safeInteger(value, minimum = 0) {
        if (!Number.isFinite(value))
            return minimum;
        return Math.max(minimum, Math.round(value));
    }
    function formatStackShareStats(result) {
        if (result.victory) {
            return `用时 ${safeInteger(result.elapsedSec, 1)} 秒 · 打包 ${safeInteger(result.boxes)} 箱`;
        }
        const remaining = safeInteger(result.remaining);
        if (remaining > STACK_SHARE_BACKLOG_THRESHOLD)
            return '后备箱塞爆了，年货还剩一大堆';
        return `差 ${remaining} 件就塞满`;
    }
    exports_1("formatStackShareStats", formatStackShareStats);
    function formatStackShareStage(stage) {
        return `第 ${safeInteger(stage, 1)} 关`;
    }
    exports_1("formatStackShareStage", formatStackShareStage);
    function pickStackShareCaption(random = Math.random) {
        const drawn = random();
        const value = Number.isFinite(drawn) ? Math.max(0, Math.min(0.999999, drawn)) : 0;
        return STACK_SHARE_CAPTIONS[Math.floor(value * STACK_SHARE_CAPTIONS.length)];
    }
    exports_1("pickStackShareCaption", pickStackShareCaption);
    function createStackShareCopy(stage, result, random = Math.random) {
        return {
            title: STACK_SHARE_TITLE,
            stageText: formatStackShareStage(stage),
            statsText: formatStackShareStats(result),
            caption: pickStackShareCaption(random),
        };
    }
    exports_1("createStackShareCopy", createStackShareCopy);
    /** Copy for the level-9 finale card: “到家了！” instead of the usual title, plus a homecoming line. */
    function createStackHomecomingCopy(result, random = Math.random) {
        return {
            title: '到家了！',
            stageText: '第 9 关 · 到家了',
            statsText: formatStackShareStats(result),
            caption: HOMECOMING_CAPTIONS[Math.min(HOMECOMING_CAPTIONS.length - 1, Math.floor(random() * HOMECOMING_CAPTIONS.length))],
        };
    }
    exports_1("createStackHomecomingCopy", createStackHomecomingCopy);
    function stackShareFileName(stage, victory) {
        return `${brand_1.GAME_TITLE}-第${safeInteger(stage, 1)}关-${victory ? '胜利' : '差一点'}.png`;
    }
    exports_1("stackShareFileName", stackShareFileName);
    /**
     * Province line on the share card: a win claims “+1” (and the rank once the board answered),
     * a loss taunts the player's province. No province chosen → no line.
     */
    function formatStackShareProvince(province, victory, rank = null, random = Math.random, 
    /** Levels the board does not count (3+, debug runs) never claim a “+1”. */
    counted = true) {
        if (!province)
            return null;
        const place = rank_1.provinceLabel(province);
        if (victory && !counted)
            return `我替${place}把年货装满一车了`;
        if (victory)
            return rank === null ? `我为${place}${brand_1.GAME_TITLE} +1` : `我为${place}${brand_1.GAME_TITLE} +1，${place}排第 ${rank}`;
        const drawn = random();
        const value = Number.isFinite(drawn) ? Math.max(0, Math.min(0.999999, drawn)) : 0;
        return FAIL_TAUNTS[Math.floor(value * FAIL_TAUNTS.length)](place);
    }
    exports_1("formatStackShareProvince", formatStackShareProvince);
    function formatStackShareVehicle(name) {
        return name ? `本关座驾：${name}` : null;
    }
    exports_1("formatStackShareVehicle", formatStackShareVehicle);
    return {
        setters: [
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (rank_1_1) {
                rank_1 = rank_1_1;
            }
        ],
        execute: function () {
            exports_1("STACK_SHARE_WIDTH", STACK_SHARE_WIDTH = 1080);
            exports_1("STACK_SHARE_HEIGHT", STACK_SHARE_HEIGHT = 1440);
            exports_1("STACK_SHARE_TITLE", STACK_SHARE_TITLE = `《${brand_1.GAME_TITLE}》`);
            /** Above this many unpacked goods the share card calls the trunk overloaded instead of counting down. */
            exports_1("STACK_SHARE_BACKLOG_THRESHOLD", STACK_SHARE_BACKLOG_THRESHOLD = 30);
            /** Goods visible in both the generated share card and the finish-screen trunk. */
            exports_1("STACK_SHARE_ITEM_KEYS", STACK_SHARE_ITEM_KEYS = [
                'mandarin', 'duck', 'fruitbasket', 'milk', 'suitcase_l', 'toycar', 'oven',
            ]);
            /** Normalized cargo layout (x, y, rotation) inside the trunk opening, from top-left. */
            exports_1("STACK_CARGO_POSITIONS", STACK_CARGO_POSITIONS = [
                [0.18, 0.34, 0.12], [0.39, 0.29, -0.10], [0.61, 0.34, 0.09], [0.82, 0.28, -0.12],
                [0.28, 0.72, -0.08], [0.52, 0.78, 0.06], [0.76, 0.72, -0.06],
            ]);
            exports_1("STACK_SHARE_CAPTIONS", STACK_SHARE_CAPTIONS = [
                '年货塞满，平安到家',
                '今年的后备箱，装的都是爱',
                '满满一车年味，奔赴团圆',
                '车尾装不下，家里的牵挂装得下',
                '一路顺风，回家过年',
            ]);
            HOMECOMING_CAPTIONS = [
                '9 关回家路走完了，爸妈就在门口',
                '一车年货塞满到家，过年好！',
                '拖拉机开到家门口，鞭炮已经响了',
            ];
            /** Trial-site address printed on every share card. */
            exports_1("STACK_SHARE_LINK", STACK_SHARE_LINK = 'feyakit.github.io/smhj-play');
            FAIL_TAUNTS = [
                (place) => `${place}还差我一箱`,
                (place) => `${place}的年货，还差我这一车`,
                (place) => `差一点就为${place}塞满了`,
            ];
        }
    };
});

System.register("chunks:///_virtual/stack-sim.ts", ["./rng.ts","./stack-rules.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_rules_1, DEFAULT_SIM_CLICKS, DEFAULT_CLICK_INTERVAL_MS;
    var __moduleName = context_1 && context_1.id;
    function slotCounts(game) {
        var _a;
        const counts = new Map();
        for (const card of game.slot)
            counts.set(card.kind, ((_a = counts.get(card.kind)) !== null && _a !== void 0 ? _a : 0) + 1);
        return counts;
    }
    function visibleKindCounts(cards) {
        var _a;
        const counts = new Map();
        for (const card of cards)
            counts.set(card.kind, ((_a = counts.get(card.kind)) !== null && _a !== void 0 ? _a : 0) + 1);
        return counts;
    }
    function randomFrom(values, random) {
        const raw = random();
        const value = Number.isFinite(raw) ? Math.max(0, Math.min(0.999999, raw)) : 0;
        return values[Math.floor(value * values.length)];
    }
    function pickBest(scored, random) {
        if (!scored.length)
            return undefined;
        const best = Math.max(...scored.map(entry => entry.score));
        return randomFrom(scored.filter(entry => entry.score === best), random).value;
    }
    function exposureScore(card, cards, slot) {
        var _a;
        let newlyFree = 0;
        let matchingSlot = 0;
        let matchingKind = 0;
        for (const below of cards) {
            if (below.id === card.id || below.layer >= card.layer)
                continue;
            if (!(card.x < below.x + below.w && card.x + card.w > below.x
                && card.y < below.y + below.h && card.y + card.h > below.y))
                continue;
            const stillCovered = cards.some(other => other.id !== card.id && other.id !== below.id
                && other.layer > below.layer
                && other.x < below.x + below.w && other.x + other.w > below.x
                && other.y < below.y + below.h && other.y + other.h > below.y);
            if (stillCovered)
                continue;
            newlyFree++;
            // A covered carton hides its kind; dimmed faces are readable like on the real board.
            if (below.carton)
                continue;
            if (((_a = slot.get(below.kind)) !== null && _a !== void 0 ? _a : 0) > 0)
                matchingSlot++;
            if (below.kind === card.kind)
                matchingKind++;
        }
        return { newlyFree, matchingSlot, matchingKind };
    }
    function chooseCard(game, strategy, random, banned) {
        let candidates = stack_rules_1.freeCards(game.cards);
        if (!candidates.length)
            return undefined;
        if (banned !== undefined && candidates.length > 1) {
            candidates = candidates.filter(card => card.id !== banned);
        }
        if (strategy === 'random')
            return randomFrom(candidates, random);
        const slot = slotCounts(game);
        const visible = visibleKindCounts(candidates);
        if (strategy === 'greedy') {
            return pickBest(candidates.map(card => {
                var _a, _b;
                const inSlot = (_a = slot.get(card.kind)) !== null && _a !== void 0 ? _a : 0;
                const priority = inSlot >= 2 ? 2 : inSlot === 1 ? 1 : 0;
                return { value: card, score: priority * 10000 + ((_b = visible.get(card.kind)) !== null && _b !== void 0 ? _b : 0) };
            }), random);
        }
        const capacity = game.slotCapacity;
        return pickBest(candidates.map(card => {
            var _a, _b;
            const inSlot = (_a = slot.get(card.kind)) !== null && _a !== void 0 ? _a : 0;
            const pack = inSlot >= 2;
            const exposure = exposureScore(card, game.cards, slot);
            const nextSlotSize = pack ? Math.max(0, game.slot.length - 2) : game.slot.length + 1;
            const pressure = nextSlotSize >= capacity - 1 ? 30000 : nextSlotSize >= capacity - 2 ? 8000 : 0;
            return {
                value: card,
                score: (pack ? 1000000 : inSlot === 1 ? 180000 : 0)
                    + ((_b = visible.get(card.kind)) !== null && _b !== void 0 ? _b : 0) * 4000
                    + exposure.newlyFree * 2000
                    + exposure.matchingSlot * 6000
                    + exposure.matchingKind * 3000
                    - pressure,
            };
        }), random);
    }
    function packAvailable(slot, candidates) {
        return candidates.some(card => { var _a; return ((_a = slot.get(card.kind)) !== null && _a !== void 0 ? _a : 0) >= 2; });
    }
    /** Whether at least two copies of some kind can still be brought together. */
    function hasPairPotential(slot, candidates) {
        if ([...slot.values()].some(count => count >= 2))
            return true;
        const visible = visibleKindCounts(candidates);
        if ([...visible.values()].some(count => count >= 2))
            return true;
        return candidates.some(card => { var _a; return ((_a = slot.get(card.kind)) !== null && _a !== void 0 ? _a : 0) === 1; });
    }
    function summarize(results) {
        const runs = results.length;
        const wins = results.filter(result => result.won).length;
        const total = (value) => results.reduce((sum, result) => sum + value(result), 0);
        const rate = (value) => runs ? total(result => value(result) ? 1 : 0) / runs : 0;
        return {
            runs,
            wins,
            winRate: runs ? wins / runs : 0,
            averageRemaining: runs ? total(result => result.remaining) / runs : 0,
            averageClicks: runs ? total(result => result.clicks) / runs : 0,
            averageGroupsCleared: runs ? total(result => result.groupsCleared) / runs : 0,
            averageMomEvents: runs ? total(result => result.momEvents) / runs : 0,
            itemUseRate: {
                moveOut: rate(result => result.itemsUsed.moveOut),
                undo: rate(result => result.itemsUsed.undo),
                shuffle: rate(result => result.itemsUsed.shuffle),
                revive: rate(result => result.itemsUsed.revive),
            },
        };
    }
    /**
     * Plays one deterministic run. The player only sees currently free cards; covered cards are
     * considered only by the lookahead strategy after a candidate tap would reveal them.
     */
    function simulateStackRun(level, options, runIndex = 0) {
        var _a, _b, _c, _d;
        const clickIntervalMs = (_a = options.clickIntervalMs) !== null && _a !== void 0 ? _a : DEFAULT_CLICK_INTERVAL_MS;
        if (!Number.isFinite(clickIntervalMs) || clickIntervalMs <= 0)
            throw new Error('invalid stack click interval');
        const maxClicks = (_b = options.maxClicks) !== null && _b !== void 0 ? _b : DEFAULT_SIM_CLICKS;
        if (!Number.isInteger(maxClicks) || maxClicks < 1)
            throw new Error('invalid stack click limit');
        const itemMode = (_c = options.itemMode) !== null && _c !== void 0 ? _c : 'none';
        const seed = `${(_d = options.seed) !== null && _d !== void 0 ? _d : level.seed}|${options.strategy}|${itemMode}|${runIndex}`;
        const random = rng_1.createRng(seed);
        const game = new stack_rules_1.StackGame(level, random, 0);
        const used = {
            moveOut: false, undo: false, shuffle: false, revive: false,
        };
        let clicks = 0;
        let now = 0;
        let lastTap;
        let bannedAfterUndo;
        while (game.status === 'playing' && clicks < maxClicks) {
            let candidates = stack_rules_1.freeCards(game.cards);
            if (!candidates.length)
                break;
            const slot = slotCounts(game);
            if (itemMode !== 'none') {
                const imminentLoss = game.slot.length >= game.slotCapacity - 1 && !packAvailable(slot, candidates);
                if (!used.undo && game.props.undo === false && imminentLoss && game.useUndo()) {
                    used.undo = true;
                    bannedAfterUndo = lastTap;
                    lastTap = undefined;
                    continue;
                }
                candidates = stack_rules_1.freeCards(game.cards);
                const refreshedSlot = slotCounts(game);
                if (!used.moveOut && !game.props.moveOut && game.slot.length >= 5
                    && !hasPairPotential(refreshedSlot, candidates) && game.useMoveOut().length > 0) {
                    used.moveOut = true;
                    continue;
                }
                if (!used.shuffle && !game.props.shuffle && !packAvailable(refreshedSlot, candidates)
                    && !hasPairPotential(refreshedSlot, candidates) && game.useShuffle()) {
                    used.shuffle = true;
                    candidates = stack_rules_1.freeCards(game.cards);
                }
            }
            const card = chooseCard(game, options.strategy, random, bannedAfterUndo);
            bannedAfterUndo = undefined;
            if (!card)
                break;
            now += clickIntervalMs;
            const result = game.tap(card.id, now);
            if (!result.ok)
                break;
            lastTap = card.id;
            clicks++;
            game.tickMom(now);
            const statusAfterTap = game.status;
            if (statusAfterTap === 'lost' && itemMode === 'all-revive' && !used.revive && game.canRevive) {
                if (game.revive().length > 0)
                    used.revive = true;
            }
        }
        return {
            won: game.status === 'won',
            status: game.status,
            remaining: game.remaining,
            clicks,
            groupsCleared: game.clearedGroups,
            momEvents: game.momEventCount,
            itemsUsed: used,
        };
    }
    exports_1("simulateStackRun", simulateStackRun);
    function simulateStackBatch(level, options, runs = 1000) {
        if (!Number.isInteger(runs) || runs < 1)
            throw new Error('invalid stack simulation run count');
        const results = [];
        for (let index = 0; index < runs; index++)
            results.push(simulateStackRun(level, options, index));
        return summarize(results);
    }
    exports_1("simulateStackBatch", simulateStackBatch);
    /** Exposed for tools/tests that need to inspect the exact card set a player may tap. */
    function visibleStackCards(game) {
        return stack_rules_1.freeCards(game.cards);
    }
    exports_1("visibleStackCards", visibleStackCards);
    return {
        setters: [
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (stack_rules_1_1) {
                stack_rules_1 = stack_rules_1_1;
            }
        ],
        execute: function () {
            exports_1("DEFAULT_SIM_CLICKS", DEFAULT_SIM_CLICKS = 2000);
            exports_1("DEFAULT_CLICK_INTERVAL_MS", DEFAULT_CLICK_INTERVAL_MS = 1800);
        }
    };
});

System.register("chunks:///_virtual/stack-solver.ts", ["./stack-rules.ts","./stack-state-solver.ts"], function (exports_1, context_1) {
    "use strict";
    var stack_rules_1;
    var __moduleName = context_1 && context_1.id;
    function insertAndClear(slot, kind) {
        const index = slotInsertIndexKinds(slot, kind);
        slot.splice(index, 0, kind);
        let packed = false;
        if (slot.filter(value => value === kind).length >= stack_rules_1.PACK_SIZE) {
            let removed = 0;
            for (let i = slot.length - 1; i >= 0 && removed < stack_rules_1.PACK_SIZE; i--) {
                if (slot[i] === kind) {
                    slot.splice(i, 1);
                    removed++;
                }
            }
            packed = true;
        }
        return packed;
    }
    function slotInsertIndexKinds(slot, kind) {
        let index = slot.length;
        for (let i = slot.length - 1; i >= 0; i--) {
            if (slot[i] === kind) {
                index = i + 1;
                break;
            }
        }
        return index;
    }
    function simulateStackPicks(level, picks, maxClicks = picks.length) {
        const capacity = stack_rules_1.slotCapacityOf(level);
        const cards = level.cards.map(card => (Object.assign({}, card)));
        const active = new Map(cards.map(card => [card.id, card]));
        const slot = [];
        for (let index = 0; index < picks.length && index < maxClicks; index++) {
            const card = active.get(picks[index]);
            if (!card)
                return { valid: false, used: index };
            const current = [...active.values()];
            if (stack_rules_1.isBlocked(card, current))
                return { valid: false, used: index };
            active.delete(card.id);
            insertAndClear(slot, card.kind);
            if (slot.length >= capacity)
                return { valid: false, used: index + 1 };
        }
        return { valid: active.size === 0 && slot.length === 0, used: Math.min(picks.length, maxClicks) };
    }
    exports_1("simulateStackPicks", simulateStackPicks);
    function solveStackLevel(level, options = {}) {
        var _a;
        const capacity = stack_rules_1.slotCapacityOf(level);
        const maxNodes = (_a = options.maxNodes) !== null && _a !== void 0 ? _a : 120000;
        if (level.solution.length > 0) {
            const certificate = simulateStackPicks(level, level.solution);
            if (certificate.valid) {
                return { solvable: true, picks: [...level.solution], nodes: level.solution.length, limited: false, method: 'certificate' };
            }
        }
        if (!Number.isInteger(maxNodes) || maxNodes < 1)
            throw new Error('invalid stack solver node limit');
        const active = level.cards.map(() => true);
        const seen = new Set();
        let nodes = 0;
        let limited = false;
        const start = { active, slot: [], picks: [] };
        const search = (state) => {
            var _a;
            if (nodes >= maxNodes) {
                limited = true;
                return undefined;
            }
            nodes++;
            if (!state.active.some(Boolean))
                return state.slot.length === 0 ? [...state.picks] : undefined;
            const key = `${state.active.map(value => value ? '1' : '0').join('')}|${state.slot.join(',')}`;
            if (seen.has(key))
                return undefined;
            seen.add(key);
            const cards = level.cards.filter((_, index) => state.active[index]);
            const reachable = stack_rules_1.freeCards(cards);
            const byKind = new Map();
            for (const card of reachable)
                byKind.set(card.kind, [...((_a = byKind.get(card.kind)) !== null && _a !== void 0 ? _a : []), card]);
            const compound = [...byKind.entries()]
                .filter(([kind, cardsOfKind]) => cardsOfKind.length >= stack_rules_1.PACK_SIZE && !state.slot.includes(kind) && state.slot.length <= capacity - stack_rules_1.PACK_SIZE)
                .sort((a, b) => b[1].length - a[1].length);
            for (const [, cardsOfKind] of compound) {
                const picks = cardsOfKind.slice(0, stack_rules_1.PACK_SIZE).map(card => card.id);
                const nextActive = [...state.active];
                for (const card of cardsOfKind.slice(0, stack_rules_1.PACK_SIZE)) {
                    const index = level.cards.findIndex(candidate => candidate.id === card.id);
                    nextActive[index] = false;
                }
                const nextSlot = [...state.slot];
                for (let i = 0; i < stack_rules_1.PACK_SIZE; i++)
                    insertAndClear(nextSlot, cardsOfKind[0].kind);
                const answer = search({ active: nextActive, slot: nextSlot, picks: [...state.picks, ...picks] });
                if (answer)
                    return answer;
                if (limited)
                    return undefined;
            }
            const singles = [...reachable].sort((a, b) => {
                var _a, _b, _c, _d;
                const aPair = state.slot.filter(kind => kind === a.kind).length;
                const bPair = state.slot.filter(kind => kind === b.kind).length;
                return bPair - aPair || ((_b = (_a = byKind.get(b.kind)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = byKind.get(a.kind)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0);
            });
            for (const card of singles) {
                if (state.slot.length >= capacity && state.slot.filter(kind => kind === card.kind).length < 2)
                    continue;
                const nextActive = [...state.active];
                const index = level.cards.findIndex(candidate => candidate.id === card.id);
                nextActive[index] = false;
                const nextSlot = [...state.slot];
                insertAndClear(nextSlot, card.kind);
                if (nextSlot.length >= capacity)
                    continue;
                const answer = search({ active: nextActive, slot: nextSlot, picks: [...state.picks, card.id] });
                if (answer)
                    return answer;
                if (limited)
                    return undefined;
            }
            return undefined;
        };
        const picks = search(start);
        return {
            solvable: !!picks,
            picks: picks !== null && picks !== void 0 ? picks : [],
            nodes,
            limited,
            method: picks ? 'search' : 'none',
        };
    }
    exports_1("solveStackLevel", solveStackLevel);
    return {
        setters: [
            function (stack_rules_1_1) {
                stack_rules_1 = stack_rules_1_1;
            },
            function (stack_state_solver_1_1) {
                exports_1({
                    "solveStackState": stack_state_solver_1_1["solveStackState"]
                });
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/stack-state-solver.ts", ["./stack-constants.ts"], function (exports_1, context_1) {
    "use strict";
    var stack_constants_1;
    var __moduleName = context_1 && context_1.id;
    /**
     * Depth-first search from a live game state (cards still on the board plus the kinds already in
     * the slot). Blocking is precomputed once; every step only updates blocker counts, so a few
     * thousand nodes stay cheap enough to run on the main thread when mom inserts goods.
     */
    function solveStackState(cards, slotKinds, options = {}) {
        var _a, _b;
        const maxNodes = (_a = options.maxNodes) !== null && _a !== void 0 ? _a : 20000;
        const capacity = (_b = options.capacity) !== null && _b !== void 0 ? _b : stack_constants_1.SLOT_CAPACITY;
        const n = cards.length;
        const kindIndex = new Map();
        const kinds = cards.map(card => {
            if (!kindIndex.has(card.kind))
                kindIndex.set(card.kind, kindIndex.size);
            return kindIndex.get(card.kind);
        });
        for (const kind of slotKinds)
            if (!kindIndex.has(kind))
                kindIndex.set(kind, kindIndex.size);
        const slot = new Array(kindIndex.size).fill(0);
        let slotSize = 0;
        for (const kind of slotKinds) {
            slot[kindIndex.get(kind)]++;
            slotSize++;
        }
        for (let k = 0; k < slot.length; k++) {
            while (slot[k] >= stack_constants_1.PACK_SIZE) {
                slot[k] -= stack_constants_1.PACK_SIZE;
                slotSize -= stack_constants_1.PACK_SIZE;
            }
        }
        // covers[i] = cards that card i sits on top of; blockers[j] = how many active cards cover j.
        const covers = cards.map(() => []);
        const blockers = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j)
                    continue;
                const a = cards[i], b = cards[j];
                if (a.layer > b.layer && a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y) {
                    covers[i].push(j);
                    blockers[j]++;
                }
            }
        }
        const active = new Array(n).fill(true);
        const picks = [];
        const seen = new Set();
        let nodes = 0;
        let limited = false;
        let remaining = n;
        const search = () => {
            if (remaining === 0)
                return slotSize === 0;
            if (nodes >= maxNodes) {
                limited = true;
                return false;
            }
            nodes++;
            let key = '';
            for (let i = 0; i < n; i++)
                key += active[i] ? '1' : '0';
            key += `|${slot.join(',')}`;
            if (seen.has(key))
                return false;
            seen.add(key);
            const free = [];
            const freeOfKind = new Array(slot.length).fill(0);
            for (let i = 0; i < n; i++)
                if (active[i] && blockers[i] === 0) {
                    free.push(i);
                    freeOfKind[kinds[i]]++;
                }
            free.sort((a, b) => (slot[kinds[b]] - slot[kinds[a]]) || (freeOfKind[kinds[b]] - freeOfKind[kinds[a]]));
            for (const i of free) {
                const k = kinds[i];
                const packs = slot[k] === stack_constants_1.PACK_SIZE - 1;
                if (!packs && slotSize + 1 >= capacity)
                    continue;
                active[i] = false;
                remaining--;
                for (const j of covers[i])
                    blockers[j]--;
                if (packs) {
                    slot[k] = 0;
                    slotSize -= stack_constants_1.PACK_SIZE - 1;
                }
                else {
                    slot[k]++;
                    slotSize++;
                }
                picks.push(cards[i].id);
                if (search())
                    return true;
                picks.pop();
                if (packs) {
                    slot[k] = stack_constants_1.PACK_SIZE - 1;
                    slotSize += stack_constants_1.PACK_SIZE - 1;
                }
                else {
                    slot[k]--;
                    slotSize--;
                }
                for (const j of covers[i])
                    blockers[j]++;
                active[i] = true;
                remaining++;
                if (limited)
                    return false;
            }
            return false;
        };
        const solvable = search();
        return { solvable, picks: solvable ? [...picks] : [], nodes, limited };
    }
    exports_1("solveStackState", solveStackState);
    return {
        setters: [
            function (stack_constants_1_1) {
                stack_constants_1 = stack_constants_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/stack-types.ts", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/stack-vehicles.ts", [], function (exports_1, context_1) {
    "use strict";
    var RED_GOLD, VEHICLES, SLOT_GAP, MAX_CELL;
    var __moduleName = context_1 && context_1.id;
    function vehicleByKey(key) {
        return VEHICLES.find(vehicle => vehicle.key === key);
    }
    exports_1("vehicleByKey", vehicleByKey);
    /** One ride per level on the 9-level road home: level 1 the motorcycle … level 9 the tractor. */
    function vehicleForLevel(level) {
        const index = Math.max(0, Math.min(VEHICLES.length - 1, Math.floor(level) - 1));
        const def = VEHICLES[index];
        return { def, displayName: def.name };
    }
    exports_1("vehicleForLevel", vehicleForLevel);
    /** Short phones (page under 1450 design units tall) shrink the ride so the board keeps ~44px cards. */
    function vehicleScaleForPage(pageHeight) {
        return pageHeight < 1450 ? .76 : 1;
    }
    exports_1("vehicleScaleForPage", vehicleScaleForPage);
    /**
     * The code-built sedan is wider and taller than the sprite rides, so short pages shrink it a bit
     * more (whole car, lid and trunk uniformly) to keep ≥44px cards on 375×667.
     */
    function sedanScaleForPage(pageHeight) {
        return pageHeight < 1450 ? .7 : 1;
    }
    exports_1("sedanScaleForPage", sedanScaleForPage);
    function vehicleSlotLabel(def, capacity) {
        return `${def.container} · ${capacity} 格`;
    }
    exports_1("vehicleSlotLabel", vehicleSlotLabel);
    /**
     * The art is bottom-anchored so its wheels tuck behind the prop buttons (starting at `actionY`),
     * but never so low that a cargo cell slips under them.
     */
    function vehicleArtRect(def, actionY, designWidth = 750, scale = 1) {
        var _a;
        const h = def.height * scale;
        const w = h * def.artSize.w / def.artSize.h * ((_a = def.stretchX) !== null && _a !== void 0 ? _a : 1);
        const lowestCargo = Math.max(0, ...def.regions.map(region => region.y + region.h));
        const bottom = Math.min(actionY + 80, actionY - 12 + (1 - lowestCargo) * h);
        return { x: (designWidth - w) / 2, y: bottom - h, w, h };
    }
    exports_1("vehicleArtRect", vehicleArtRect);
    function vehicleRegionRects(def, art) {
        return def.regions.map(region => ({
            x: art.x + region.x * art.w,
            y: art.y + region.y * art.h,
            w: region.w * art.w,
            h: region.h * art.h,
        }));
    }
    exports_1("vehicleRegionRects", vehicleRegionRects);
    function regionSplit(def, capacity, rects) {
        var _a;
        const given = (_a = def.split) === null || _a === void 0 ? void 0 : _a[capacity];
        if (given && given.length === rects.length && given.reduce((a, b) => a + b, 0) === capacity)
            return [...given];
        if (rects.length === 1)
            return [capacity];
        const areas = rects.map(rect => rect.w * rect.h);
        const total = areas.reduce((a, b) => a + b, 0);
        const counts = areas.map(area => Math.max(1, Math.floor(capacity * area / total)));
        let index = 0;
        while (counts.reduce((a, b) => a + b, 0) < capacity)
            counts[index++ % counts.length]++;
        return counts;
    }
    function bestGrid(rect, count) {
        let best = { rows: 1, cols: count, cell: 0 };
        for (let rows = 1; rows <= count; rows++) {
            const cols = Math.ceil(count / rows);
            const cell = Math.min((rect.w - (cols - 1) * SLOT_GAP) / cols, (rect.h - (rows - 1) * SLOT_GAP) / rows);
            if (cell > best.cell + .01)
                best = { rows, cols, cell };
        }
        return best;
    }
    /**
     * Slot cells laid out inside the vehicle's load areas, one uniform cell size for the whole
     * vehicle, region by region and row by row (that is the slot order the rules see).
     */
    function vehicleSlotCells(def, capacity, art) {
        const rects = vehicleRegionRects(def, art);
        const split = regionSplit(def, capacity, rects);
        const grids = rects.map((rect, index) => bestGrid(rect, split[index]));
        const cell = Math.floor(Math.min(MAX_CELL, ...grids.map(grid => grid.cell)));
        const cells = [];
        rects.forEach((rect, index) => {
            const count = split[index];
            const { rows, cols } = grids[index];
            const usedRows = Math.ceil(count / cols);
            const gridH = usedRows * cell + (usedRows - 1) * SLOT_GAP;
            const top = rect.y + (rect.h - gridH) / 2;
            for (let row = 0; row < rows; row++) {
                const inRow = Math.min(cols, count - row * cols);
                if (inRow <= 0)
                    break;
                const rowW = inRow * cell + (inRow - 1) * SLOT_GAP;
                const left = rect.x + (rect.w - rowW) / 2;
                for (let col = 0; col < inRow; col++) {
                    cells.push({ x: Math.round(left + col * (cell + SLOT_GAP)), y: Math.round(top + row * (cell + SLOT_GAP)), w: cell, h: cell });
                }
            }
        });
        return cells;
    }
    exports_1("vehicleSlotCells", vehicleSlotCells);
    /** Sedan: one row inside the trunk hole, shrinking the cells for 8–9 slots. */
    function sedanSlotCells(trunk, capacity, designWidth = 750) {
        const gap = 3;
        const cell = Math.min(96, Math.floor((trunk.w - 20 - (capacity - 1) * gap) / capacity));
        const width = capacity * cell + (capacity - 1) * gap;
        const x0 = Math.round((designWidth - width) / 2);
        const y = trunk.y + Math.round((trunk.h - cell) / 2);
        return Array.from({ length: capacity }, (_, index) => ({ x: x0 + index * (cell + gap), y, w: cell, h: cell }));
    }
    exports_1("sedanSlotCells", sedanSlotCells);
    return {
        setters: [],
        execute: function () {
            RED_GOLD = { panel: [118, 22, 30], accent: [246, 195, 67], text: [255, 233, 180], well: [28, 18, 20] };
            exports_1("VEHICLES", VEHICLES = [
                {
                    key: 'moto', name: '摩托车', container: '摩托后尾箱', art: 'vehicles/moto', artSize: { w: 548, h: 678 }, height: 540,
                    regions: [
                        { x: .12, y: .30, w: .76, h: .20, style: 'box' },
                        { x: 0, y: .54, w: .36, h: .38, style: 'bag' },
                        { x: .64, y: .54, w: .36, h: .38, style: 'bag' },
                    ],
                    split: { 7: [3, 2, 2], 8: [4, 2, 2], 9: [3, 3, 3] },
                    palette: RED_GOLD,
                },
                {
                    key: 'trike', name: '电动三轮', container: '三轮车斗', art: 'vehicles/trike', artSize: { w: 646, h: 670 }, height: 540,
                    regions: [{ x: .09, y: .34, w: .82, h: .36, style: 'bed' }],
                    palette: { panel: [126, 26, 30], accent: [255, 206, 92], text: [255, 236, 190], well: [36, 32, 34] },
                },
                {
                    key: 'sedan', name: '红轿车', container: '轿车后备箱', art: null, artSize: { w: 1024, h: 640 }, height: 0,
                    regions: [],
                    palette: RED_GOLD,
                },
                {
                    key: 'suv', name: 'SUV', container: 'SUV 后备箱', art: 'vehicles/suv', artSize: { w: 682, h: 665 }, height: 540,
                    regions: [{ x: .15, y: .30, w: .70, h: .40, style: 'hatch' }],
                    palette: { panel: [92, 62, 40], accent: [240, 206, 140], text: [255, 241, 214], well: [30, 28, 30] },
                },
                {
                    key: 'van', name: '面包车', container: '面包车后门', art: 'vehicles/van', artSize: { w: 527, h: 680 }, height: 540, stretchX: 1.45,
                    regions: [{ x: .07, y: .40, w: .52, h: .42, style: 'door' }],
                    palette: { panel: [70, 72, 84], accent: [226, 60, 52], text: [250, 246, 240], well: [34, 34, 40] },
                },
                {
                    key: 'pickup', name: '皮卡', container: '皮卡货斗', art: 'vehicles/pickup', artSize: { w: 706, h: 646 }, height: 560,
                    regions: [{ x: .09, y: .41, w: .82, h: .31, style: 'bed' }],
                    palette: { panel: [60, 60, 66], accent: [214, 40, 44], text: [245, 240, 236], well: [24, 24, 28] },
                },
                {
                    key: 'truck', name: '小货车', container: '货车车厢', art: 'vehicles/truck', artSize: { w: 770, h: 625 }, height: 540,
                    regions: [{ x: .10, y: .38, w: .80, h: .32, style: 'bed' }],
                    palette: { panel: [30, 64, 132], accent: [255, 200, 80], text: [236, 244, 255], well: [52, 38, 30] },
                },
                {
                    key: 'bus', name: '大巴车', container: '大巴行李舱', art: 'vehicles/bus', artSize: { w: 519, h: 661 }, height: 540,
                    regions: [{ x: .10, y: .50, w: .80, h: .30, style: 'hatch' }],
                    palette: { panel: [128, 20, 28], accent: [255, 214, 120], text: [255, 238, 200], well: [26, 24, 30] },
                },
                {
                    key: 'tractor', name: '拖拉机', container: '拖拉机拖斗', art: 'vehicles/tractor', artSize: { w: 457, h: 647 }, height: 540,
                    regions: [{ x: .06, y: .46, w: .88, h: .30, style: 'bed' }],
                    palette: { panel: [44, 88, 48], accent: [244, 198, 74], text: [240, 255, 228], well: [40, 30, 26] },
                },
            ]);
            SLOT_GAP = 4;
            MAX_CELL = 96;
        }
    };
});

System.register("chunks:///_virtual/stage1.ts", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function stage1(date) {
        return { date, stage: 1, vehicle: 'sedan', width: 4, height: 3, blocked: [], timeLimitSec: 60, pieces: [
                { id: 1, shape: 'I4', item: 'sugarcane', initialRotation: 0 },
                { id: 2, shape: 'O4', item: 'milk', initialRotation: 0 },
                { id: 3, shape: 'I2', item: 'liquor', initialRotation: 0 },
                { id: 4, shape: 'I2', item: 'liquor', initialRotation: 0 },
            ] };
    }
    exports_1("stage1", stage1);
    return {
        setters: [],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/types.ts", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/validate.ts", ["./shapes.ts"], function (exports_1, context_1) {
    "use strict";
    var shapes_1;
    var __moduleName = context_1 && context_1.id;
    function canPlace(level, occupied, placement) {
        const piece = level.pieces.find(p => p.id === placement.pieceId);
        if (!piece || !Number.isInteger(placement.rotation) || placement.rotation < 0 || placement.rotation > 3 || !Number.isInteger(placement.x) || !Number.isInteger(placement.y))
            return false;
        const blocked = new Set(level.blocked.map(([x, y]) => `${x},${y}`));
        return shapes_1.rotate(shapes_1.SHAPES[piece.shape], placement.rotation).every(([dx, dy]) => {
            const x = dx + placement.x, y = dy + placement.y;
            return x >= 0 && y >= 0 && x < level.width && y < level.height && !blocked.has(`${x},${y}`) && !occupied.has(`${x},${y}`);
        });
    }
    exports_1("canPlace", canPlace);
    function validateSolution(level, placements, removedPieceId) {
        if (!Number.isSafeInteger(level.width) || !Number.isSafeInteger(level.height) || level.width < 1 || level.height < 1 ||
            new Set(level.pieces.map(piece => piece.id)).size !== level.pieces.length ||
            level.blocked.some(([x, y]) => !Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= level.width || y >= level.height) ||
            new Set(level.blocked.map(([x, y]) => `${x},${y}`)).size !== level.blocked.length) {
            return { ok: false, reason: 'invalid level' };
        }
        if (removedPieceId !== undefined && !level.pieces.some(p => p.id === removedPieceId))
            return { ok: false, reason: 'unknown removed piece' };
        const occupied = new Set(), seen = new Set();
        for (const p of placements) {
            if (p.pieceId === removedPieceId || seen.has(p.pieceId) || !canPlace(level, occupied, p))
                return { ok: false, reason: 'invalid placement' };
            seen.add(p.pieceId);
            const piece = level.pieces.find(v => v.id === p.pieceId);
            for (const [x, y] of shapes_1.rotate(shapes_1.SHAPES[piece.shape], p.rotation))
                occupied.add(`${x + p.x},${y + p.y}`);
        }
        if (seen.size !== level.pieces.length - (removedPieceId === undefined ? 0 : 1))
            return { ok: false, reason: 'missing piece' };
        if (removedPieceId === undefined && occupied.size !== level.width * level.height - level.blocked.length)
            return { ok: false, reason: 'incomplete board' };
        return { ok: true };
    }
    exports_1("validateSolution", validateSolution);
    return {
        setters: [
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/vehicles.ts", [], function (exports_1, context_1) {
    "use strict";
    var wulingBlocked, motoBlocked, pickupSquares, VEHICLES;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            wulingBlocked = [[0, 0], [10, 0], [0, 8], [10, 8]];
            for (let y = 0; y < 9; y++) {
                if (y !== 4)
                    wulingBlocked.push([5, y]);
            }
            motoBlocked = [];
            for (let y = 0; y < 10; y++)
                motoBlocked.push([3, y], [8, y]);
            for (const x of [0, 1, 2])
                motoBlocked.push([x, 0], [x, 1]);
            for (const x of [9, 10])
                motoBlocked.push([x, 8], [x, 9]);
            pickupSquares = Array(17).fill('O4');
            exports_1("VEHICLES", VEHICLES = [
                {
                    id: 'wuling', name: '五菱宏光', width: 11, height: 9, blocked: wulingBlocked,
                    preferredInventories: [
                        ['Z4', 'Y5', 'L3', 'Y5', 'I2', 'Y5', 'Z4', 'Z4', 'Y5', 'Z4', 'Y5', 'Z4', 'Y5', 'Z4', 'R6', 'Y5', 'Z4', 'Y5', 'Y5', 'I3'],
                    ],
                },
                {
                    id: 'suv', name: 'SUV', width: 11, height: 9,
                    blocked: [[0, 3], [0, 4], [0, 5], [1, 4], [9, 4], ...Array.from({ length: 9 }, (_, y) => [10, y])],
                    preferredInventories: [
                        ['O4', 'L3', 'Z5', 'O4', 'O4', 'O4', 'I3', 'Z5', 'O4', 'Z5', 'O4', 'Z5', 'O4', 'L3', 'Z5', 'R6', 'Z5', 'O4', 'O4', 'O4'],
                    ],
                },
                {
                    id: 'pickup', name: '皮卡', width: 11, height: 8, blocked: [[0, 0], [0, 7], [10, 7]],
                    preferredInventories: [
                        ['I2', 'I4', 'P5', 'R6', ...pickupSquares],
                        ['I2', 'I4', 'N5', 'R6', ...pickupSquares],
                        ['I3', 'I3', 'P5', 'R6', ...pickupSquares],
                        ['I3', 'I3', 'L5', 'R6', ...pickupSquares],
                        ['I3', 'I3', 'N5', 'R6', ...pickupSquares],
                        ['I3', 'L3', 'P5', 'R6', ...pickupSquares],
                    ],
                },
                {
                    id: 'etrike', name: '电动三轮', width: 10, height: 10,
                    blocked: [[0, 0], [1, 0], [2, 0], [9, 0], [8, 0], [7, 0], [0, 1], [1, 1], [9, 1], [8, 1], [0, 2], [9, 2], [0, 3], [9, 3], [0, 4], [9, 4], [0, 5], [9, 5]],
                    preferredInventories: [
                        ['R6', 'L3', 'I3', 'I2', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4'],
                    ],
                },
                {
                    id: 'moto', name: '摩托车', width: 11, height: 10, blocked: motoBlocked,
                    preferredInventories: [
                        ['O4', 'O4', 'O4', 'I2', 'I3', 'I2', 'O4', 'O4', 'O4', 'U5', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4'],
                        ['O4', 'O4', 'O4', 'S4', 'I2', 'O4', 'O4', 'O4', 'I3', 'L3', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4'],
                    ],
                },
                {
                    id: 'train', name: '绿皮火车', width: 11, height: 9,
                    blocked: Array.from({ length: 11 }, (_, x) => [x, 3]),
                    preferredInventories: [
                        ['J4', 'Z5', 'L3', 'Z5', 'O4', 'J4', 'O4', 'O4', 'O4', 'Z4', 'Z5', 'O4', 'Z5', 'I2', 'Z5', 'Z4', 'Z5', 'L3', 'O4', 'Z4', 'R6'],
                    ],
                },
                { id: 'sedan_v1', name: '小轿车 V1', width: 8, height: 6, blocked: [[0, 5], [7, 5]] },
            ]);
        }
    };
});

System.register("chunks:///_virtual/DragController.ts", ["./input.ts","./shapes.ts"], function (exports_1, context_1) {
    "use strict";
    var input_1, shapes_1, DragController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (input_1_1) {
                input_1 = input_1_1;
            },
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
            DragController = class DragController {
                get active() { return this.gesture; }
                begin(start) {
                    if (!this.gesture)
                        this.gesture = Object.assign(Object.assign({}, start), { start: Object.assign({}, start.start), current: Object.assign({}, start.start), mode: 'pending' });
                }
                move(id, current) {
                    const gesture = this.gesture;
                    if (!gesture || gesture.id !== id)
                        return;
                    gesture.current.x = current.x;
                    gesture.current.y = current.y;
                    if (gesture.mode === 'pending' && Math.hypot(current.x - gesture.start.x, current.y - gesture.start.y) > 8) {
                        if (gesture.piece)
                            gesture.mode = 'drag';
                    }
                    return gesture;
                }
                release(id, current, now) {
                    const gesture = this.move(id, current);
                    if (!gesture)
                        return;
                    this.gesture = undefined;
                    return { gesture, tap: gesture.mode === 'pending' && input_1.isClick(gesture.start, current, now - gesture.time) };
                }
                cancel(id) {
                    if (!this.gesture || (id !== undefined && this.gesture.id !== id))
                        return false;
                    this.gesture = undefined;
                    return true;
                }
                rotateHeld() {
                    var _a;
                    if (((_a = this.gesture) === null || _a === void 0 ? void 0 : _a.mode) !== 'drag' || !this.gesture.piece)
                        return false;
                    this.gesture.rotation = shapes_1.clockwiseRotation(this.gesture.rotation);
                    return true;
                }
                placement(gesture, origin, cell) {
                    if (!gesture.piece)
                        return;
                    return Object.assign(Object.assign({}, input_1.snapToGrid(gesture.current, gesture.offset, origin, cell)), { pieceId: gesture.piece.id, rotation: gesture.rotation });
                }
            };
            exports_1("DragController", DragController);
        }
    };
});

System.register("chunks:///_virtual/FinishTimeline.ts", [], function (exports_1, context_1) {
    "use strict";
    var FINISH_DURATION, MAX_CONFETTI, FINISH_CUES, FinishPlayback;
    var __moduleName = context_1 && context_1.id;
    function finishTimeline(tMs, out = {}) {
        const t = Math.max(0, Math.min(FINISH_DURATION, Number.isNaN(tMs) ? 0 : tMs));
        out.time = t;
        out.lidVisible = t >= 300;
        out.lidProgress = Math.max(0, Math.min(1, (t - 300) / 400));
        out.bodySink = t < 700 ? 0 : t < 850 ? (t - 700) / 150 * 12 : t < 1000 ? 12 - (t - 850) / 150 * 6 : 6;
        out.tailLights = (t >= 1000 && t < 1150) || (t >= 1300 && t < 1450);
        out.celebration = t >= 1200;
        out.buttons = t >= FINISH_DURATION;
        out.particleCount = t >= 1200 && t < FINISH_DURATION ? MAX_CONFETTI : 0;
        return out;
    }
    exports_1("finishTimeline", finishTimeline);
    /** Fixed pool; no random values or allocations while animating. */
    function createConfettiPool() {
        return Array.from({ length: MAX_CONFETTI }, (_, i) => ({ active: false, x: 0, y: 0, angle: 0, variant: i % 4 }));
    }
    exports_1("createConfettiPool", createConfettiPool);
    function updateConfetti(pool, tMs, width, height) {
        const active = tMs >= 1200 && tMs < FINISH_DURATION;
        for (let i = 0; i < pool.length; i++) {
            const p = pool[i];
            p.active = active && i < MAX_CONFETTI;
            if (!p.active) {
                p.x = 0;
                p.y = 0;
                p.angle = 0;
                continue;
            }
            const age = Math.max(0, tMs - 1200 - (i % 12) * 22);
            p.x = ((i * 193) % width) + Math.sin(age / 260 + i) * 28;
            p.y = -45 + age / 1300 * (height + 140);
            p.angle = (i * 47 + age * .22) % 360;
        }
    }
    exports_1("updateConfetti", updateConfetti);
    function finishButtons(stage) {
        return stage === 1 ? [{ title: '下一关', action: 'next' }] :
            stage === 3 ? [{ title: '再来一次', action: 'replay' }, { title: '回第 1 关', action: 'first' }] :
                [{ title: '再来一次', action: 'replay' }, { title: '试试妈妈模式', action: 'mom' }];
    }
    exports_1("finishButtons", finishButtons);
    return {
        setters: [],
        execute: function () {
            /** Milliseconds from the last legal drop. Shared by rendering and tests. */
            exports_1("FINISH_DURATION", FINISH_DURATION = 2500);
            exports_1("MAX_CONFETTI", MAX_CONFETTI = 120);
            exports_1("FINISH_CUES", FINISH_CUES = [
                { time: 700, sound: 'trunk_slam', vibration: 40 },
                { time: 1000, sound: 'horn', vibration: 0 },
                { time: 1200, sound: 'cheer', vibration: 0 },
                { time: 1300, sound: 'horn', vibration: 0 },
            ]);
            /** No timer callbacks: dropping frames crosses each cue once; skip suppresses stale audio. */
            FinishPlayback = class FinishPlayback {
                constructor(emit) {
                    this.emit = emit;
                    this.state = finishTimeline(0);
                    this.nextCue = 0;
                }
                advance(tMs) {
                    finishTimeline(Math.max(this.state.time, tMs), this.state);
                    while (this.nextCue < FINISH_CUES.length && FINISH_CUES[this.nextCue].time <= this.state.time) {
                        this.emit(FINISH_CUES[this.nextCue++]);
                    }
                    return this.state;
                }
                skip() {
                    this.nextCue = FINISH_CUES.length;
                    return finishTimeline(FINISH_DURATION, this.state);
                }
            };
            exports_1("FinishPlayback", FinishPlayback);
        }
    };
});

System.register("chunks:///_virtual/InteractionGeometry.ts", ["./shapes.ts"], function (exports_1, context_1) {
    "use strict";
    var shapes_1, MIN_TRAY_CELL, MAX_TRAY_CELL, inRect, geometry;
    var __moduleName = context_1 && context_1.id;
    function dimensions(piece, rotation) {
        return geometry[piece.shape][rotation];
    }
    exports_1("dimensions", dimensions);
    function pieceCells(piece, rotation) { return geometry[piece.shape][rotation].cells; }
    exports_1("pieceCells", pieceCells);
    function heldOffset(piece, rotation, cell) {
        const box = dimensions(piece, rotation);
        return { x: box.w * cell / 2, y: box.h * cell / 2 + Math.max(1.2 * cell, 120) };
    }
    exports_1("heldOffset", heldOffset);
    function previewVisible(piece, p, width, height) {
        const cells = pieceCells(piece, p.rotation);
        let inside = 0;
        for (let i = 0; i < cells.length; i++) {
            const x = cells[i][0] + p.x, y = cells[i][1] + p.y;
            if (x >= 0 && y >= 0 && x < width && y < height)
                inside++;
        }
        return inside * 2 >= cells.length;
    }
    exports_1("previewVisible", previewVisible);
    /**
     * Use the largest 56–110px cell that fits every tray piece in up to three complete rows. Sparse
     * inventories grow to fill the tray; denser ones keep the 56px minimum and scroll horizontally.
     * Callers re-run this layout after rotating a piece, so slot bounds use its current orientation.
     */
    function trayLayout(pieces, tray, rotationFor = piece => piece.initialRotation) {
        if (!pieces.length)
            return { cell: MIN_TRAY_CELL, slots: [], contentWidth: 0, viewportWidth: tray.w, maxScroll: 0 };
        const gap = 6, pad = 8;
        const metrics = pieces.map(piece => {
            const box = dimensions(piece, rotationFor(piece));
            return { piece, w: box.w, h: box.h };
        });
        const fit = (cell) => {
            let best;
            const consider = (counts) => {
                let start = 0;
                let rowHeight = 0;
                let rowWidth = 0;
                let narrowest = Infinity;
                for (const count of counts) {
                    const row = metrics.slice(start, start + count);
                    start += count;
                    rowHeight += Math.max(...row.map(entry => entry.h)) * cell;
                    const width = row.reduce((sum, entry) => sum + entry.w * cell, 0) + gap * (count - 1);
                    rowWidth = Math.max(rowWidth, width);
                    narrowest = Math.min(narrowest, width);
                }
                const height = pad * 2 + rowHeight + gap * (counts.length - 1);
                const width = pad * 2 + rowWidth;
                if (height > tray.h + 0.001 || width > tray.w + 0.001)
                    return;
                const candidate = { counts: [...counts], height, width, balance: narrowest };
                const better = !best || candidate.counts.length < best.counts.length ||
                    (candidate.counts.length === best.counts.length &&
                        (candidate.height < best.height - 0.001 ||
                            (Math.abs(candidate.height - best.height) <= 0.001 && candidate.balance > best.balance + 0.001)));
                if (better)
                    best = candidate;
            };
            const partition = (row, left, counts) => {
                if (row === 0) {
                    if (left)
                        counts.push(left);
                    if (left)
                        consider(counts);
                    if (left)
                        counts.pop();
                    return;
                }
                const max = left - row;
                for (let count = 1; count <= max; count++) {
                    counts.push(count);
                    partition(row - 1, left - count, counts);
                    counts.pop();
                }
            };
            for (let rows = 1; rows <= Math.min(3, pieces.length); rows++)
                partition(rows - 1, pieces.length, []);
            return best;
        };
        let cell = MAX_TRAY_CELL;
        let best;
        for (; cell >= MIN_TRAY_CELL; cell--) {
            best = fit(cell);
            if (best)
                break;
        }
        // A single 56px row always fits vertically and remains complete through horizontal scrolling.
        if (!best) {
            cell = MIN_TRAY_CELL;
            const width = metrics.reduce((sum, entry) => sum + entry.w * cell, 0) + gap * (metrics.length - 1);
            best = { counts: [pieces.length], height: pad * 2 + Math.max(...metrics.map(entry => entry.h)) * cell, width: pad * 2 + width, balance: width };
        }
        const contentWidth = best.width;
        const contentHeight = best.height;
        const centered = contentWidth <= tray.w + 0.001;
        const startX = centered ? tray.x + (tray.w - contentWidth) / 2 + pad : tray.x + pad;
        let startY = tray.y + (tray.h - contentHeight) / 2 + pad;
        const slots = [];
        let start = 0;
        for (const count of best.counts) {
            const row = metrics.slice(start, start + count);
            start += count;
            const rowHeight = Math.max(...row.map(entry => entry.h)) * cell;
            let x = startX;
            for (const entry of row) {
                const w = entry.w * cell, h = entry.h * cell;
                slots.push({ piece: entry.piece, rect: { x, y: startY + (rowHeight - h) / 2, w, h } });
                x += w + gap;
            }
            startY += rowHeight + gap;
        }
        return { cell, slots, contentWidth, viewportWidth: tray.w, maxScroll: Math.max(0, contentWidth - tray.w) };
    }
    exports_1("trayLayout", trayLayout);
    return {
        setters: [
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
            exports_1("MIN_TRAY_CELL", MIN_TRAY_CELL = 56);
            exports_1("MAX_TRAY_CELL", MAX_TRAY_CELL = 110);
            exports_1("inRect", inRect = (p, r) => p.x >= r.x && p.y >= r.y && p.x < r.x + r.w && p.y < r.y + r.h);
            // Precompute once; touch-move must not allocate shape arrays or bounding boxes.
            geometry = {};
            for (const shape of Object.keys(shapes_1.SHAPES)) {
                geometry[shape] = [0, 1, 2, 3].map(rotation => {
                    const cells = shapes_1.rotate(shapes_1.SHAPES[shape], rotation);
                    return { cells, w: Math.max(...cells.map(([x]) => x)) + 1, h: Math.max(...cells.map(([, y]) => y)) + 1 };
                });
            }
        }
    };
});

System.register("chunks:///_virtual/StageSession.ts", ["./shapes.ts","./validate.ts","./InteractionGeometry.ts"], function (exports_1, context_1) {
    "use strict";
    var shapes_1, validate_1, InteractionGeometry_1, StageSession;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            },
            function (validate_1_1) {
                validate_1 = validate_1_1;
            },
            function (InteractionGeometry_1_1) {
                InteractionGeometry_1 = InteractionGeometry_1_1;
            }
        ],
        execute: function () {
            StageSession = class StageSession {
                constructor(level, now) {
                    var _a;
                    this.level = level;
                    this.now = now;
                    this.state = { rotations: new Map(), placements: new Map() };
                    this.history = [];
                    this.deadline = 0;
                    this.active = [];
                    this.batchIndex = 0;
                    this.batches = level.mode === 'mom'
                        ? [level.pieces, ...((_a = level.extras) !== null && _a !== void 0 ? _a : [])]
                        : [level.pieces];
                    this.restart();
                }
                restart() {
                    this.batchIndex = 0;
                    this.active = [...this.batches[0]];
                    this.state = {
                        rotations: new Map(this.pieces.map(piece => [piece.id, piece.initialRotation])),
                        placements: new Map(),
                    };
                    this.history = [];
                    this.deadline = this.now() + this.level.timeLimitSec * 1000;
                }
                /** Pieces currently available on the board. Appended batches only ever add to this list. */
                get pieces() { return this.active; }
                get totalPieces() { return this.batches.reduce((total, batch) => total + batch.length, 0); }
                get pendingBatches() { return this.batches.length - this.batchIndex - 1; }
                get readyForNextBatch() {
                    return this.pendingBatches > 0 && this.pieces.every(piece => this.state.placements.has(piece.id));
                }
                /** Appends the next configured batch. This state change is deliberately outside undo history. */
                appendNextBatch() {
                    if (!this.readyForNextBatch)
                        return false;
                    this.batchIndex++;
                    const added = this.batches[this.batchIndex];
                    this.active.push(...added);
                    for (const piece of added)
                        this.state.rotations.set(piece.id, piece.initialRotation);
                    return true;
                }
                get expired() { return this.level.timeLimitSec > 0 && this.remainingSeconds === 0; }
                get remainingSeconds() {
                    if (!this.level.timeLimitSec)
                        return Infinity;
                    return Math.max(0, Math.ceil((this.deadline - this.now()) / 1000));
                }
                // Cocos Web Mobile can compile iterator spreads into array concatenation.
                get placements() { return Array.from(this.state.placements.values()); }
                get solved() {
                    return this.pendingBatches === 0 && this.state.placements.size === this.pieces.length &&
                        validate_1.validateSolution(Object.assign(Object.assign({}, this.level), { pieces: [...this.pieces] }), this.placements).ok;
                }
                rotationFor(id) { var _a; return (_a = this.state.rotations.get(id)) !== null && _a !== void 0 ? _a : 0; }
                canDrop(placement) {
                    if (!Number.isInteger(placement.rotation) || placement.rotation < 0 || placement.rotation > 3 ||
                        !Number.isInteger(placement.x) || !Number.isInteger(placement.y))
                        return false;
                    let piece;
                    for (const definition of this.pieces)
                        if (definition.id === placement.pieceId) {
                            piece = definition;
                            break;
                        }
                    if (!piece)
                        return false;
                    const cells = InteractionGeometry_1.pieceCells(piece, placement.rotation);
                    for (let i = 0; i < cells.length; i++) {
                        const x = cells[i][0] + placement.x, y = cells[i][1] + placement.y;
                        if (x < 0 || y < 0 || x >= this.level.width || y >= this.level.height)
                            return false;
                        for (const blocked of this.level.blocked)
                            if (blocked[0] === x && blocked[1] === y)
                                return false;
                        for (const other of this.state.placements.values()) {
                            if (other.pieceId === piece.id)
                                continue;
                            for (const definition of this.pieces) {
                                if (definition.id !== other.pieceId)
                                    continue;
                                const occupied = InteractionGeometry_1.pieceCells(definition, other.rotation);
                                for (let j = 0; j < occupied.length; j++)
                                    if (occupied[j][0] + other.x === x && occupied[j][1] + other.y === y)
                                        return false;
                                break;
                            }
                        }
                    }
                    return true;
                }
                drop(placement) {
                    if (this.expired || !this.canDrop(placement))
                        return false;
                    this.remember();
                    this.state.placements.set(placement.pieceId, Object.assign({}, placement));
                    this.state.rotations.set(placement.pieceId, placement.rotation);
                    return true;
                }
                returnToTray(id, rotation = this.rotationFor(id)) {
                    if (this.expired || !this.state.rotations.has(id))
                        return;
                    this.remember();
                    this.state.placements.delete(id);
                    this.state.rotations.set(id, rotation);
                }
                rotatePiece(id) {
                    if (this.expired || !this.state.rotations.has(id))
                        return false;
                    const rotation = shapes_1.clockwiseRotation(this.rotationFor(id));
                    const original = this.state.placements.get(id);
                    const rotated = original ? Object.assign(Object.assign({}, original), { rotation }) : undefined;
                    if (rotated && !this.canDrop(rotated))
                        return false;
                    this.remember();
                    this.state.rotations.set(id, rotation);
                    if (rotated)
                        this.state.placements.set(id, rotated);
                    return true;
                }
                undo() {
                    var _a;
                    if (this.expired)
                        return;
                    const previous = this.history.pop();
                    if (previous) {
                        for (const piece of this.pieces) {
                            if (!previous.rotations.has(piece.id)) {
                                previous.rotations.set(piece.id, (_a = this.state.rotations.get(piece.id)) !== null && _a !== void 0 ? _a : piece.initialRotation);
                            }
                        }
                        this.state = previous;
                    }
                }
                remember() {
                    this.history.push({ rotations: new Map(this.state.rotations), placements: new Map(this.state.placements) });
                }
            };
            exports_1("StageSession", StageSession);
        }
    };
});

System.register("chunks:///_virtual/HomePage.ts", ["cc","./brand.ts","./stack-layout.ts","./stack-share.ts","./OptionalResources.ts","./RankApi.ts","./ProvincePicker.ts","./UIKit.ts","./stack-progress.ts","./RankPage.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, brand_1, stack_layout_1, stack_share_1, OptionalResources_1, RankApi_1, ProvincePicker_1, UIKit_1, stack_progress_1, RankPage_1, red, deepRed, wine, gold, paleGold, cream, ink, shadowInk, CAR_WIDTH, CAR_HEIGHT, START_WIDTH, START_HEIGHT, CLASSIC_WIDTH, CLASSIC_HEIGHT, HomePage;
    var __moduleName = context_1 && context_1.id;
    function contains(rect, x, y) {
        return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
    }
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_share_1_1) {
                stack_share_1 = stack_share_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (RankApi_1_1) {
                RankApi_1 = RankApi_1_1;
            },
            function (ProvincePicker_1_1) {
                ProvincePicker_1 = ProvincePicker_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            },
            function (stack_progress_1_1) {
                stack_progress_1 = stack_progress_1_1;
            },
            function (RankPage_1_1) {
                RankPage_1 = RankPage_1_1;
            }
        ],
        execute: function () {
            red = new cc_1.Color(184, 29, 42);
            deepRed = new cc_1.Color(84, 18, 27);
            wine = new cc_1.Color(57, 12, 22, 232);
            gold = new cc_1.Color(255, 205, 105);
            paleGold = new cc_1.Color(255, 232, 177);
            cream = new cc_1.Color(255, 246, 229);
            ink = new cc_1.Color(75, 28, 20);
            shadowInk = new cc_1.Color(49, 8, 14, 180);
            CAR_WIDTH = 700;
            CAR_HEIGHT = 438;
            START_WIDTH = 600;
            START_HEIGHT = 88;
            CLASSIC_WIDTH = 360;
            CLASSIC_HEIGHT = 66;
            /** Code-built title screen. The night scene, red-gold chrome and packed car preview the match-three game. */
            HomePage = class HomePage {
                constructor(parent, actions) {
                    this.actions = actions;
                    this.rankApi = new RankApi_1.RankApi();
                    this.cargoSprites = [];
                    this.touchWorld = new cc_1.Vec3();
                    this.touchLocal = new cc_1.Vec3();
                    this.startRect = { x: 75, y: 0, w: START_WIDTH, h: START_HEIGHT };
                    this.classicRect = { x: 195, y: 0, w: CLASSIC_WIDTH, h: CLASSIC_HEIGHT };
                    this.provinceRect = { x: 185, y: 0, w: 380, h: 56 };
                    this.rankRect = { x: 225, y: 0, w: 300, h: 58 };
                    this.dailyRect = { x: 390, y: 0, w: 290, h: 58 };
                    this.width = 750;
                    this.height = 1334;
                    this.layoutWidth = -1;
                    this.layoutHeight = -1;
                    this.hole = { x: 0, y: 0, w: CAR_WIDTH, h: CAR_HEIGHT };
                    this.carTop = 400;
                    this.node = UIKit_1.uiNode('HomePage', parent, 750, 1334);
                    this.background = UIKit_1.uiNode('HomeNight', this.node, 750, 1334).addComponent(cc_1.Sprite);
                    this.background.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    this.background.trim = false;
                    this.background.enabled = false;
                    void OptionalResources_1.loadArt('ui/bg_night').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.background.spriteFrame = frame;
                        this.background.enabled = true;
                        this.layoutBackground();
                    });
                    this.chrome = UIKit_1.uiNode('HomeChrome', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.car = UIKit_1.uiNode('PackedCar', this.node, CAR_WIDTH, CAR_HEIGHT);
                    this.carFallback = UIKit_1.uiNode('CarFallback', this.car, CAR_WIDTH, CAR_HEIGHT).addComponent(cc_1.Graphics);
                    this.trunkImage = this.imageNode('TrunkWell', this.car);
                    this.cargo = UIKit_1.uiNode('HomeCargo', this.car, CAR_WIDTH, CAR_HEIGHT);
                    for (let index = 0; index < stack_share_1.STACK_SHARE_ITEM_KEYS.length; index++) {
                        this.cargoSprites.push(this.imageNode(`CargoItem${index}`, this.cargo));
                    }
                    this.bodyImage = this.imageNode('CarBody', this.car);
                    void Promise.all([
                        OptionalResources_1.loadArt('vehicles/sedan_v1_body'),
                        OptionalResources_1.loadArt('vehicles/sedan_v1_trunk'),
                    ]).then(([body, trunk]) => {
                        if (!this.node.isValid)
                            return;
                        if (trunk) {
                            this.trunkImage.spriteFrame = trunk;
                            this.trunkImage.enabled = true;
                        }
                        if (body) {
                            this.bodyImage.spriteFrame = body;
                            this.bodyImage.enabled = true;
                            this.carFallback.enabled = false;
                        }
                        this.layoutCar();
                    });
                    void Promise.all(stack_share_1.STACK_SHARE_ITEM_KEYS.map(key => OptionalResources_1.loadArt(`items/${key}`))).then(frames => {
                        if (!this.node.isValid)
                            return;
                        for (let index = 0; index < frames.length && index < this.cargoSprites.length; index++) {
                            const frame = frames[index];
                            if (!frame)
                                continue;
                            this.cargoSprites[index].spriteFrame = frame;
                            this.cargoSprites[index].enabled = true;
                        }
                        this.layoutCar();
                    });
                    this.eyebrow = UIKit_1.label(this.node, 'Eyebrow', '春运 · 年货专列', 22, 0, 0);
                    this.eyebrow.color = paleGold;
                    this.titleShadow = UIKit_1.label(this.node, 'TitleShadow', `《${brand_1.GAME_TITLE}》`, 82, 0, 0);
                    this.titleShadow.color = shadowInk;
                    this.title = UIKit_1.label(this.node, 'Title', `《${brand_1.GAME_TITLE}》`, 82, 0, 0);
                    this.title.color = gold;
                    this.subtitle = UIKit_1.label(this.node, 'Subtitle', brand_1.GAME_SUBTITLE, 28, 0, 0);
                    this.subtitle.color = cream;
                    this.cargoTag = UIKit_1.label(this.node, 'CargoTag', '妈妈备好了一车年货，等你装车回家', 23, 0, 0);
                    this.cargoTag.color = paleGold;
                    this.ruleLineOne = UIKit_1.label(this.node, 'RuleOne', '点没被压住的年货，凑齐 3 件同款就打包装车', 22, 0, 0);
                    this.ruleLineOne.color = cream;
                    this.ruleLineTwo = UIKit_1.label(this.node, 'RuleTwo', '7 格塞满就失败', 20, 0, 0);
                    this.ruleLineTwo.color = paleGold;
                    this.startNode = UIKit_1.uiNode('HomeStart', this.node, START_WIDTH, START_HEIGHT);
                    this.startLabel = UIKit_1.label(this.startNode, 'HomeStartText', '开始装车', 34, 0, 0);
                    this.startLabel.color = ink;
                    this.classicNode = UIKit_1.uiNode('HomeClassic', this.node, CLASSIC_WIDTH, CLASSIC_HEIGHT);
                    this.classicLabel = UIKit_1.label(this.classicNode, 'HomeClassicText', '经典装箱玩法', 24, 0, 0);
                    this.classicLabel.color = paleGold;
                    this.provinceLabel = UIKit_1.label(this.node, 'HomeProvinceText', '选择你的省份', 25, 0, 0);
                    this.provinceLabel.color = paleGold;
                    this.rankLabel = UIKit_1.label(this.node, 'HomeRankText', '省份排行', 24, 0, 0);
                    this.rankLabel.color = paleGold;
                    const storage = stack_progress_1.browserStorage();
                    this.dailyLabel = UIKit_1.label(this.node, 'HomeDailyText', stack_progress_1.isDailyDone(storage) ? '每日一关 · 今日已塞满' : '每日一关', 24, 0, 0);
                    this.dailyLabel.color = paleGold;
                    this.bestLabel = UIKit_1.label(this.startNode, 'HomeBestText', stack_progress_1.homeProgressLabel(storage), 19, 0, -26);
                    this.bestLabel.color = new cc_1.Color(110, 40, 20);
                    if (this.bestLabel.string)
                        this.startLabel.node.setPosition(0, 10);
                    this.refreshProvinceLabel();
                    this.node.on(cc_1.Node.EventType.TOUCH_END, this.touch, this);
                    this.debugHook = Object.freeze({
                        getButtons: () => this.debugButtons(),
                        getLayout: () => ({ viewport: { width: this.screenWidth(), height: this.screenHeight() }, height: this.height }),
                        getState: () => {
                            var _a, _b;
                            return ({
                                province: this.rankApi.province,
                                overlay: this.rankPage ? 'rank' : this.provincePicker ? 'province' : null,
                                progress: (_b = (_a = this.bestLabel) === null || _a === void 0 ? void 0 : _a.string) !== null && _b !== void 0 ? _b : '',
                            });
                        },
                    });
                    if (typeof window !== 'undefined') {
                        window.__home = this.debugHook;
                    }
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => {
                        if (typeof window !== 'undefined' && window.__home === this.debugHook) {
                            delete window.__home;
                        }
                    });
                    this.tick();
                }
                tick() {
                    const size = cc_1.view.getVisibleSize();
                    if (size.width !== this.layoutWidth || size.height !== this.layoutHeight) {
                        this.layoutWidth = size.width;
                        this.layoutHeight = size.height;
                        this.height = size.height > 0 && size.width > 0
                            ? Math.max(1334, size.height / size.width * 750)
                            : 1334;
                        const scale = Math.min(size.width / 750, size.height / this.height);
                        this.node.setScale(scale, scale, 1);
                        this.node.getComponent(cc_1.UITransform).setContentSize(750, this.height);
                        this.layout();
                    }
                }
                layout() {
                    this.layoutBackground();
                    this.eyebrow.node.setPosition(0, this.height / 2 - 80);
                    this.titleShadow.node.setPosition(4, this.height / 2 - 165);
                    this.title.node.setPosition(0, this.height / 2 - 160);
                    this.subtitle.node.setPosition(0, this.height / 2 - 296);
                    this.carTop = Math.round(Math.max(398, Math.min(this.height - 842, this.height * .30)));
                    this.car.setPosition(0, this.height / 2 - (this.carTop + CAR_HEIGHT / 2));
                    this.cargoTag.node.setPosition(0, this.height / 2 - (this.carTop + CAR_HEIGHT + 56));
                    this.layoutCar();
                    const rulesY = Math.round(this.height * .70);
                    this.ruleLineOne.node.setPosition(0, this.height / 2 - rulesY);
                    this.ruleLineTwo.node.setPosition(0, this.height / 2 - rulesY - 42);
                    const provinceY = Math.max(340, this.carTop - 112);
                    this.provinceRect = { x: (750 - 380) / 2, y: provinceY, w: 380, h: 56 };
                    this.provinceLabel.node.setPosition(0, this.height / 2 - (provinceY + 28));
                    const rankY = this.height - 382;
                    this.rankRect = { x: 70, y: rankY, w: 290, h: 58 };
                    this.rankLabel.node.setPosition(this.rankRect.x + 145 - 375, this.height / 2 - (rankY + 29));
                    this.dailyRect = { x: 390, y: rankY, w: 290, h: 58 };
                    this.dailyLabel.node.setPosition(this.dailyRect.x + 145 - 375, this.height / 2 - (rankY + 29));
                    const startY = this.height - 272;
                    this.startRect = { x: (750 - START_WIDTH) / 2, y: startY, w: START_WIDTH, h: START_HEIGHT };
                    this.startNode.setPosition(0, this.height / 2 - (startY + START_HEIGHT / 2));
                    const classicY = this.height - 158;
                    this.classicRect = { x: (750 - CLASSIC_WIDTH) / 2, y: classicY, w: CLASSIC_WIDTH, h: CLASSIC_HEIGHT };
                    this.classicNode.setPosition(0, this.height / 2 - (classicY + CLASSIC_HEIGHT / 2));
                    this.drawChrome(rulesY);
                }
                layoutBackground() {
                    const scale = Math.max(1, this.height / 1334);
                    this.background.node.getComponent(cc_1.UITransform).setContentSize(750 * scale, 1334 * scale);
                    this.background.node.setPosition(0, 0);
                }
                drawChrome(rulesY) {
                    const g = this.chrome;
                    g.clear();
                    const top = this.height / 2;
                    const left = -375;
                    const rect = (color, x, y, w, h, radius = 0) => {
                        UIKit_1.fill(g, color, left + x, top - y - h, w, h, radius);
                    };
                    rect(new cc_1.Color(10, 8, 22, 84), 0, 0, 750, this.height);
                    rect(new cc_1.Color(28, 10, 20, 64), 0, this.height - 410, 750, 410, 0);
                    rect(new cc_1.Color(28, 7, 13, 150), 34, 40, 682, 310, 34);
                    rect(new cc_1.Color(94, 22, 29, 238), 40, 44, 670, 304, 32);
                    rect(gold, 48, 52, 654, 288, 27);
                    rect(red, 56, 60, 638, 272, 22);
                    rect(new cc_1.Color(224, 56, 48), 68, 72, 614, 248, 18);
                    rect(new cc_1.Color(255, 229, 164, 150), 126, 224, 498, 2, 1);
                    rect(gold, 292, 250, 166, 3, 1);
                    rect(new cc_1.Color(48, 12, 23, 186), 54, rulesY - 34, 642, 106, 26);
                    rect(new cc_1.Color(255, 211, 117, 42), 62, rulesY - 26, 626, 90, 22);
                    g.strokeColor = new cc_1.Color(255, 205, 105, 130);
                    g.lineWidth = 2;
                    g.roundRect(left + 56, top - (rulesY - 32) - 102, 638, 102, 24);
                    g.stroke();
                    const start = this.startRect;
                    rect(new cc_1.Color(26, 8, 13, 150), start.x + 5, start.y + 10, start.w, start.h, 28);
                    rect(new cc_1.Color(111, 45, 18), start.x, start.y, start.w, start.h, 28);
                    rect(gold, start.x + 4, start.y + 4, start.w - 8, start.h - 8, 24);
                    rect(new cc_1.Color(255, 193, 72), start.x + 12, start.y + 12, start.w - 24, start.h - 24, 19);
                    rect(new cc_1.Color(255, 227, 143, 150), start.x + 28, start.y + 18, start.w - 56, 8, 4);
                    const classic = this.classicRect;
                    rect(new cc_1.Color(53, 10, 19, 196), classic.x, classic.y, classic.w, classic.h, 22);
                    g.strokeColor = gold;
                    g.lineWidth = 2;
                    g.roundRect(left + classic.x + 2, top - (classic.y + classic.h) + 2, classic.w - 4, classic.h - 4, 20);
                    g.stroke();
                    rect(new cc_1.Color(255, 214, 126, 160), classic.x + 92, classic.y + classic.h - 11, classic.w - 184, 2, 1);
                    const province = this.provinceRect;
                    rect(new cc_1.Color(25, 8, 15, 180), province.x, province.y, province.w, province.h, 22);
                    rect(new cc_1.Color(84, 19, 31, 232), province.x + 3, province.y + 3, province.w - 6, province.h - 6, 19);
                    g.strokeColor = new cc_1.Color(255, 207, 111, 175);
                    g.lineWidth = 1.5;
                    g.roundRect(left + province.x + 2, top - (province.y + province.h) + 2, province.w - 4, province.h - 4, 20);
                    g.stroke();
                    rect(new cc_1.Color(255, 219, 145, 58), province.x + 22, province.y + 8, province.w - 44, 2, 1);
                    const rank = this.rankRect;
                    rect(new cc_1.Color(45, 10, 20, 214), rank.x, rank.y, rank.w, rank.h, 20);
                    g.strokeColor = new cc_1.Color(255, 207, 111, 196);
                    g.lineWidth = 2;
                    g.roundRect(left + rank.x + 2, top - (rank.y + rank.h) + 2, rank.w - 4, rank.h - 4, 18);
                    g.stroke();
                    rect(new cc_1.Color(255, 213, 132, 52), rank.x + 44, rank.y + 10, rank.w - 88, 2, 1);
                    const daily = this.dailyRect;
                    rect(new cc_1.Color(120, 22, 30, 228), daily.x, daily.y, daily.w, daily.h, 20);
                    g.strokeColor = new cc_1.Color(255, 207, 111, 220);
                    g.lineWidth = 2;
                    g.roundRect(left + daily.x + 2, top - (daily.y + daily.h) + 2, daily.w - 4, daily.h - 4, 18);
                    g.stroke();
                    rect(new cc_1.Color(255, 213, 132, 52), daily.x + 44, daily.y + 10, daily.w - 88, 2, 1);
                    this.drawCarFallback();
                }
                layoutCar() {
                    const trunkW = CAR_WIDTH;
                    const trunkH = CAR_HEIGHT;
                    const holeX = Math.round((stack_layout_1.STACK_BODY_HOLE.left + stack_layout_1.STACK_BODY_HOLE.right) / 2 / 1024 * trunkW - trunkW / 2);
                    const holeY = Math.round((stack_layout_1.STACK_BODY_HOLE.top + stack_layout_1.STACK_BODY_HOLE.bottom) / 2 / 640 * trunkH - trunkH / 2);
                    const holeW = Math.round((stack_layout_1.STACK_BODY_HOLE.right - stack_layout_1.STACK_BODY_HOLE.left) / 1024 * trunkW);
                    const holeH = Math.round((stack_layout_1.STACK_BODY_HOLE.bottom - stack_layout_1.STACK_BODY_HOLE.top) / 640 * trunkH);
                    this.hole = { x: holeX, y: holeY, w: holeW, h: holeH };
                    this.show(this.bodyImage, 0, 0, CAR_WIDTH, CAR_HEIGHT);
                    this.show(this.trunkImage, 0, holeY, holeW, holeH);
                    const max = Math.min(holeW * .26, holeH * .55, 168);
                    for (let index = 0; index < this.cargoSprites.length && index < stack_share_1.STACK_CARGO_POSITIONS.length; index++) {
                        const sprite = this.cargoSprites[index];
                        const frame = sprite.spriteFrame;
                        if (!frame)
                            continue;
                        const [px, py, angle] = stack_share_1.STACK_CARGO_POSITIONS[index];
                        const ratio = frame.rect.width / Math.max(1, frame.rect.height);
                        const width = ratio >= 1 ? max : max * ratio;
                        const height = ratio >= 1 ? max / ratio : max;
                        sprite.node.getComponent(cc_1.UITransform).setContentSize(width, height);
                        sprite.node.setPosition(holeX + (px - .5) * holeW, holeY + (.45 - py * .64) * holeH);
                        sprite.node.angle = -angle * 180 / Math.PI;
                        sprite.enabled = true;
                    }
                }
                drawCarFallback() {
                    const g = this.carFallback;
                    g.clear();
                    UIKit_1.fill(g, new cc_1.Color(16, 10, 21, 105), -340, -230, 680, 460, 56);
                    UIKit_1.fill(g, new cc_1.Color(111, 18, 30), -350, -216, 700, 438, 62);
                    UIKit_1.fill(g, red, -337, -205, 674, 418, 56);
                    UIKit_1.fill(g, new cc_1.Color(42, 18, 25), -270, -100, 540, 248, 40);
                    UIKit_1.fill(g, deepRed, -278, -214, 556, 92, 24);
                    UIKit_1.fill(g, new cc_1.Color(255, 206, 112), -102, -186, 204, 44, 12);
                    UIKit_1.fill(g, new cc_1.Color(255, 139, 58, 210), -300, -126, 74, 44, 14);
                    UIKit_1.fill(g, new cc_1.Color(255, 139, 58, 210), 226, -126, 74, 44, 14);
                    UIKit_1.fill(g, new cc_1.Color(20, 15, 20), -295, -222, 590, 28, 12);
                }
                touch(event) {
                    var _a, _b;
                    const point = this.point(event);
                    if (this.provincePicker) {
                        this.provincePicker.press(point.x, point.y);
                        return;
                    }
                    if (this.rankPage) {
                        this.rankPage.press(point.x, point.y);
                        return;
                    }
                    if (contains(this.provinceRect, point.x, point.y)) {
                        this.openProvincePicker();
                        return;
                    }
                    if (contains(this.rankRect, point.x, point.y)) {
                        this.openRankPage();
                        return;
                    }
                    if (contains(this.dailyRect, point.x, point.y)) {
                        (_b = (_a = this.actions).onDaily) === null || _b === void 0 ? void 0 : _b.call(_a);
                        return;
                    }
                    if (contains(this.startRect, point.x, point.y)) {
                        this.actions.onStart();
                        return;
                    }
                    if (contains(this.classicRect, point.x, point.y)) {
                        this.actions.onClassic();
                    }
                }
                point(event) {
                    const p = event.getUILocation();
                    this.touchWorld.set(p.x, p.y, 0);
                    const local = this.node.getComponent(cc_1.UITransform).convertToNodeSpaceAR(this.touchWorld, this.touchLocal);
                    return { x: local.x + 375, y: this.height / 2 - local.y };
                }
                debugButtons() {
                    const screenWidth = this.screenWidth();
                    const screenHeight = this.screenHeight();
                    return ['start', 'classic', 'province', 'rank', 'daily'].map(key => {
                        const rect = key === 'start' ? this.startRect
                            : key === 'classic' ? this.classicRect
                                : key === 'province' ? this.provinceRect
                                    : key === 'daily' ? this.dailyRect
                                        : this.rankRect;
                        return {
                            key,
                            screenX: (rect.x + rect.w / 2) / 750 * screenWidth,
                            screenY: (rect.y + rect.h / 2) / this.height * screenHeight,
                            screenLeft: rect.x / 750 * screenWidth,
                            screenRight: (rect.x + rect.w) / 750 * screenWidth,
                            screenTop: rect.y / this.height * screenHeight,
                            screenBottom: (rect.y + rect.h) / this.height * screenHeight,
                            screenW: rect.w / 750 * screenWidth,
                            screenH: rect.h / this.height * screenHeight,
                        };
                    });
                }
                openProvincePicker() {
                    if (this.provincePicker)
                        return;
                    this.provincePicker = new ProvincePicker_1.ProvincePicker(this.node, this.height, this.rankApi.province, {
                        onSelect: province => {
                            this.rankApi.setProvince(province);
                            this.provincePicker = undefined;
                            this.refreshProvinceLabel();
                        },
                        onCancel: () => { this.provincePicker = undefined; },
                    });
                }
                openRankPage() {
                    if (this.rankPage)
                        return;
                    this.rankPage = new RankPage_1.RankPage(this.node, this.height, () => {
                        var _a;
                        (_a = this.rankPage) === null || _a === void 0 ? void 0 : _a.node.destroy();
                        this.rankPage = undefined;
                    }, this.actions.onStart);
                }
                refreshProvinceLabel() {
                    const province = this.rankApi.province;
                    this.provinceLabel.string = province ? `你的省份 · ${province}` : '选择你的省份';
                }
                screenWidth() {
                    return typeof window === 'undefined' ? 750 : window.innerWidth;
                }
                screenHeight() {
                    return typeof window === 'undefined' ? this.height : window.innerHeight;
                }
                imageNode(name, parent) {
                    const sprite = UIKit_1.uiNode(name, parent, 1, 1).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    return sprite;
                }
                show(sprite, x, y, width, height) {
                    sprite.node.getComponent(cc_1.UITransform).setContentSize(width, height);
                    sprite.node.setPosition(x, y);
                    sprite.enabled = true;
                }
            };
            exports_1("HomePage", HomePage);
        }
    };
});

System.register("chunks:///_virtual/RankPage.ts", ["cc","./rank.ts","./OptionalResources.ts","./RankApi.ts","./UIKit.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, rank_1, OptionalResources_1, RankApi_1, UIKit_1, gold, brightGold, paleGold, cream, warmCream, ink, red, brightRed, deepRed, wine, rowWine, muted, silver, bronze, RankPage;
    var __moduleName = context_1 && context_1.id;
    function colorWithAlpha(color, alpha) {
        return new cc_1.Color(color.r, color.g, color.b, alpha);
    }
    function contains(rect, x, y) {
        return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
    }
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (rank_1_1) {
                rank_1 = rank_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (RankApi_1_1) {
                RankApi_1 = RankApi_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            }
        ],
        execute: function () {
            gold = new cc_1.Color(255, 207, 111);
            brightGold = new cc_1.Color(255, 226, 151);
            paleGold = new cc_1.Color(255, 235, 190);
            cream = new cc_1.Color(255, 246, 229);
            warmCream = new cc_1.Color(255, 239, 207);
            ink = new cc_1.Color(75, 28, 20);
            red = new cc_1.Color(184, 29, 42);
            brightRed = new cc_1.Color(211, 52, 48);
            deepRed = new cc_1.Color(84, 18, 27);
            wine = new cc_1.Color(57, 12, 22, 236);
            rowWine = new cc_1.Color(89, 24, 34, 238);
            muted = new cc_1.Color(151, 126, 113);
            silver = new cc_1.Color(218, 224, 228);
            bronze = new cc_1.Color(205, 142, 86);
            /** Full-page leaderboard overlay with real API data only. */
            RankPage = class RankPage {
                constructor(parent, height, onBack, onStart, api = new RankApi_1.RankApi()) {
                    this.onBack = onBack;
                    this.onStart = onStart;
                    this.width = 750;
                    this.backRect = { x: 24, y: 24, w: 112, h: 50 };
                    this.retryRect = { x: 225, y: 0, w: 300, h: 64 };
                    this.status = 'loading';
                    this.rows = [];
                    this.page = 0;
                    this.pageCount = 1;
                    this.rowsPerPage = 1;
                    this.listTop = 286;
                    this.destroyed = false;
                    this.api = api;
                    this.height = Math.max(1334, height);
                    this.node = UIKit_1.uiNode('RankPage', parent, this.width, this.height);
                    this.background = UIKit_1.uiNode('RankNight', this.node, this.width, this.height).addComponent(cc_1.Sprite);
                    this.background.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    this.background.trim = false;
                    this.background.enabled = false;
                    void OptionalResources_1.loadArt('ui/bg_night').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.background.spriteFrame = frame;
                        this.background.enabled = true;
                        this.layoutBackground();
                    });
                    this.chrome = UIKit_1.uiNode('RankChrome', this.node, this.width, this.height).addComponent(cc_1.Graphics);
                    this.contentLayer = UIKit_1.uiNode('RankContent', this.node, this.width, this.height);
                    this.contentArt = this.contentLayer.addComponent(cc_1.Graphics);
                    this.bottomBackRect = { x: 518, y: this.height - 124, w: 196, h: 74 };
                    this.startRect = { x: 36, y: this.height - 124, w: 466, h: 74 };
                    this.prevRect = { x: 36, y: this.height - 292, w: 176, h: 48 };
                    this.nextRect = { x: 538, y: this.height - 292, w: 176, h: 48 };
                    this.layoutBackground();
                    this.drawChrome();
                    this.debugHook = Object.freeze({
                        getState: () => this.debugState(),
                        press: (x, y) => this.press(x, y),
                        retry: () => void this.load(),
                    });
                    if (typeof window !== 'undefined') {
                        window.__rank = this.debugHook;
                    }
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => {
                        this.destroyed = true;
                        if (typeof window !== 'undefined' && window.__rank === this.debugHook) {
                            delete window.__rank;
                        }
                    });
                    this.renderLoading();
                    void this.load();
                }
                press(x, y) {
                    var _a;
                    if (this.destroyed)
                        return false;
                    if (contains(this.backRect, x, y) || contains(this.bottomBackRect, x, y)) {
                        this.onBack();
                        return true;
                    }
                    if (contains(this.startRect, x, y)) {
                        (_a = this.onStart) === null || _a === void 0 ? void 0 : _a.call(this);
                        return true;
                    }
                    if (this.status === 'ready' && this.pageCount > 1) {
                        if (contains(this.prevRect, x, y) && this.page > 0) {
                            this.page--;
                            this.renderReady();
                            return true;
                        }
                        if (contains(this.nextRect, x, y) && this.page < this.pageCount - 1) {
                            this.page++;
                            this.renderReady();
                            return true;
                        }
                    }
                    if (this.status === 'error' && contains(this.retryRect, x, y)) {
                        void this.load();
                    }
                    return true;
                }
                get snapshotData() { return this.snapshot; }
                async load() {
                    this.renderLoading();
                    try {
                        const snapshot = await this.api.fetchRank();
                        if (this.destroyed || !this.node.isValid)
                            return;
                        this.snapshot = snapshot;
                        this.rows = rank_1.buildRankRows(snapshot, this.api.province);
                        this.status = 'ready';
                        this.page = 0;
                        this.renderReady();
                    }
                    catch (_a) {
                        if (this.destroyed || !this.node.isValid)
                            return;
                        this.snapshot = undefined;
                        this.rows = [];
                        this.status = 'error';
                        this.renderError();
                    }
                }
                layoutBackground() {
                    const scale = Math.max(1, this.height / 1334);
                    this.background.node.getComponent(cc_1.UITransform).setContentSize(750 * scale, 1334 * scale);
                    this.background.node.setPosition(0, 0);
                }
                drawChrome() {
                    const g = this.chrome;
                    const top = this.height / 2;
                    const rect = (color, x, y, w, h, radius = 0) => {
                        UIKit_1.fill(g, color, x - 375, top - y - h, w, h, radius);
                    };
                    rect(new cc_1.Color(7, 8, 22, 112), 0, 0, 750, this.height);
                    rect(new cc_1.Color(43, 8, 18, 104), 0, 0, 750, 250, 0);
                    rect(new cc_1.Color(28, 8, 17, 130), 0, this.height - 260, 750, 260, 0);
                    this.drawLanterns(g, 48, 34);
                    this.drawLanterns(g, 702, 34);
                    rect(new cc_1.Color(21, 7, 13, 150), 22, 24, 116, 54, 18);
                    rect(new cc_1.Color(74, 17, 27, 246), 24, 26, 112, 50, 17);
                    g.strokeColor = new cc_1.Color(255, 216, 136, 190);
                    g.lineWidth = 1.5;
                    g.roundRect(26 - 375, top - 74, 108, 46, 15);
                    g.stroke();
                    UIKit_1.label(this.node, 'RankBackArrow', '‹', 32, 44 - 375, top - 49).color = gold;
                    UIKit_1.label(this.node, 'RankBack', '返回', 21, 90 - 375, top - 49).color = paleGold;
                    rect(new cc_1.Color(25, 7, 15, 190), 60, 78, 630, 134, 30);
                    rect(new cc_1.Color(99, 22, 29, 248), 66, 84, 618, 122, 26);
                    rect(gold, 72, 90, 606, 110, 23);
                    rect(red, 78, 96, 594, 98, 19);
                    rect(brightRed, 86, 104, 578, 82, 15);
                    rect(new cc_1.Color(255, 226, 151, 118), 132, 174, 486, 2, 1);
                    const title = UIKit_1.label(this.node, 'RankTitle', rank_1.RANK_TITLE, 34, 0, top - 122);
                    title.color = cream;
                    title.isBold = true;
                    title.node.getComponent(cc_1.UITransform).setContentSize(590, 45);
                    title.overflow = cc_1.Label.Overflow.SHRINK;
                    const subtitle = UIKit_1.label(this.node, 'RankKicker', '灯笼亮起，等你的家乡拔得头筹', 18, 0, top - 164);
                    subtitle.color = paleGold;
                    subtitle.node.getComponent(cc_1.UITransform).setContentSize(550, 26);
                    subtitle.overflow = cc_1.Label.Overflow.SHRINK;
                }
                drawLanterns(g, x, y) {
                    const top = this.height / 2;
                    g.strokeColor = new cc_1.Color(255, 210, 124, 150);
                    g.lineWidth = 2;
                    g.moveTo(x - 375, top - y);
                    g.lineTo(x - 375, top - y - 26);
                    g.stroke();
                    UIKit_1.fill(g, new cc_1.Color(255, 132, 74, 30), x - 33 - 375, top - y - 92, 66, 88, 28);
                    UIKit_1.fill(g, gold, x - 25 - 375, top - y - 27, 50, 9, 4);
                    UIKit_1.fill(g, new cc_1.Color(185, 31, 39), x - 29 - 375, top - y - 92, 58, 70, 22);
                    UIKit_1.fill(g, new cc_1.Color(241, 71, 52), x - 22 - 375, top - y - 84, 44, 54, 18);
                    UIKit_1.fill(g, new cc_1.Color(255, 213, 129, 145), x - 14 - 375, top - y - 77, 9, 39, 4);
                    UIKit_1.fill(g, gold, x - 23 - 375, top - y - 96, 46, 8, 4);
                    UIKit_1.fill(g, new cc_1.Color(255, 210, 124), x - 3 - 375, top - y - 104, 6, 9, 3);
                    g.strokeColor = new cc_1.Color(255, 210, 124, 170);
                    g.moveTo(x - 375, top - y - 96);
                    g.lineTo(x - 7 - 375, top - y - 117);
                    g.lineTo(x + 5 - 375, top - y - 117);
                    g.stroke();
                    UIKit_1.fill(g, gold, x - 4 - 375, top - y - 16, 8, 18, 3);
                }
                renderLoading() {
                    this.status = 'loading';
                    this.rows = [];
                    this.page = 0;
                    this.clearContent();
                    this.drawSummary(null);
                    const card = { x: 86, y: 338, w: 578, h: 218 };
                    this.drawCard(card, wine, gold);
                    const title = this.contentLabel('RankLoading', rank_1.RANK_LOADING_TEXT, 28, 375, card.y + 80, paleGold);
                    title.node.getComponent(cc_1.UITransform).setContentSize(520, 42);
                    title.overflow = cc_1.Label.Overflow.SHRINK;
                    const hint = this.contentLabel('RankLoadingHint', '正在看看乡亲们的年货都装到哪一步了', 20, 375, card.y + 143, muted);
                    hint.node.getComponent(cc_1.UITransform).setContentSize(500, 34);
                    hint.overflow = cc_1.Label.Overflow.SHRINK;
                    this.drawFooter();
                }
                renderError() {
                    this.clearContent();
                    this.drawSummary(null);
                    const card = { x: 64, y: 322, w: 622, h: 276 };
                    this.drawCard(card, wine, gold);
                    const title = this.contentLabel('RankError', rank_1.RANK_ERROR_TEXT, 30, 375, card.y + 78, paleGold);
                    title.node.getComponent(cc_1.UITransform).setContentSize(540, 44);
                    title.overflow = cc_1.Label.Overflow.SHRINK;
                    const hint = this.contentLabel('RankErrorHint', '检查网络后再试一次，排行会在这里等你', 20, 375, card.y + 139, muted);
                    hint.node.getComponent(cc_1.UITransform).setContentSize(520, 34);
                    hint.overflow = cc_1.Label.Overflow.SHRINK;
                    this.retryRect = { x: 225, y: card.y + 174, w: 300, h: 64 };
                    this.drawButton(this.retryRect, gold, ink, rank_1.RANK_RETRY_TEXT, 25, true);
                    this.drawFooter();
                }
                renderReady() {
                    this.clearContent();
                    const snapshot = this.snapshot;
                    if (!snapshot)
                        return;
                    this.drawSummary(snapshot);
                    const empty = !snapshot.provinces.some(entry => entry.total > 0);
                    if (empty) {
                        const callout = { x: 46, y: 272, w: 658, h: 126 };
                        this.drawCard(callout, new cc_1.Color(110, 22, 29, 246), gold);
                        const title = this.contentLabel('RankEmpty', rank_1.RANK_EMPTY_TEXT, 26, 375, callout.y + 52, cream);
                        title.node.getComponent(cc_1.UITransform).setContentSize(600, 42);
                        title.overflow = cc_1.Label.Overflow.SHRINK;
                        const hint = this.contentLabel('RankEmptyHint', '第一箱年货，等你来装车', 19, 375, callout.y + 94, paleGold);
                        hint.node.getComponent(cc_1.UITransform).setContentSize(520, 30);
                        hint.overflow = cc_1.Label.Overflow.SHRINK;
                        this.listTop = 424;
                    }
                    else {
                        this.listTop = 282;
                    }
                    this.drawList(empty);
                    this.drawFooter();
                }
                drawSummary(snapshot) {
                    const pill = { x: 232, y: 220, w: 286, h: 38 };
                    this.drawCard(pill, new cc_1.Color(42, 10, 20, 170), new cc_1.Color(255, 207, 111, 90));
                    const text = snapshot ? rank_1.formatRankSummary(snapshot) : '全国乡亲 · 共赴团圆';
                    const summary = this.contentLabel('RankSummary', text, 18, 375, pill.y + 19, snapshot ? cream : muted);
                    summary.node.getComponent(cc_1.UITransform).setContentSize(270, 28);
                    summary.overflow = cc_1.Label.Overflow.SHRINK;
                }
                drawList(empty) {
                    const footerTop = this.height - 216;
                    const listBottom = footerTop - 16;
                    const pagerTop = listBottom - 48;
                    const rowsBottom = pagerTop - 12;
                    const headerTop = this.listTop;
                    const headerH = 28;
                    const rowH = 54;
                    const gap = 7;
                    const available = Math.max(rowH + gap, rowsBottom - headerTop - headerH - 8);
                    this.rowsPerPage = Math.max(4, Math.floor(available / (rowH + gap)));
                    this.pageCount = Math.max(1, Math.ceil(this.rows.length / this.rowsPerPage));
                    this.page = Math.max(0, Math.min(this.pageCount - 1, this.page));
                    const header = { x: 36, y: headerTop, w: 678, h: headerH };
                    UIKit_1.fill(this.contentArt, new cc_1.Color(51, 12, 22, 180), header.x - 375, this.height / 2 - header.y - header.h, header.w, header.h, 12);
                    const columns = [
                        { x: 76, w: 88, text: '名次' },
                        { x: 236, w: 210, text: '省份' },
                        { x: 503, w: 132, text: '通关' },
                        { x: 642, w: 110, text: '今日' },
                    ];
                    for (let index = 0; index < columns.length; index++) {
                        const column = columns[index];
                        const text = this.contentLabel(`RankHead-${index}`, column.text, 16, column.x, headerTop + 15, muted);
                        text.node.getComponent(cc_1.UITransform).setContentSize(column.w, 24);
                        text.overflow = cc_1.Label.Overflow.SHRINK;
                    }
                    const start = this.page * this.rowsPerPage;
                    const pageRows = this.rows.slice(start, start + this.rowsPerPage);
                    for (let index = 0; index < pageRows.length; index++) {
                        const row = pageRows[index];
                        const top = headerTop + headerH + 8 + index * (rowH + gap);
                        this.drawRow(row, top, rowH, index);
                    }
                    this.prevRect = { x: 36, y: pagerTop, w: 176, h: 48 };
                    this.nextRect = { x: 538, y: pagerTop, w: 176, h: 48 };
                    this.drawPagerButton(this.prevRect, this.page > 0, '上一页');
                    this.drawPagerButton(this.nextRect, this.page < this.pageCount - 1, '下一页');
                    const pageText = this.contentLabel('RankPageCount', `第 ${this.page + 1} / ${this.pageCount} 页`, 19, 375, pagerTop + 24, empty ? muted : paleGold);
                    pageText.node.getComponent(cc_1.UITransform).setContentSize(280, 30);
                    pageText.overflow = cc_1.Label.Overflow.SHRINK;
                }
                drawRow(row, top, height, index) {
                    const x = 36;
                    const w = 678;
                    const radius = 16;
                    const rowColor = row.own
                        ? new cc_1.Color(255, 231, 171, 248)
                        : index % 2 === 0 ? cream : warmCream;
                    UIKit_1.fill(this.contentArt, new cc_1.Color(21, 7, 13, 95), x - 375 + 2, this.height / 2 - top - height + 2, w, height, radius);
                    UIKit_1.fill(this.contentArt, rowColor, x - 375, this.height / 2 - top - height, w, height, radius);
                    if (row.own) {
                        this.contentArt.strokeColor = gold;
                        this.contentArt.lineWidth = 2.5;
                        this.contentArt.roundRect(x + 2 - 375, this.height / 2 - top - height + 2, w - 4, height - 4, radius - 2);
                        this.contentArt.stroke();
                        UIKit_1.fill(this.contentArt, red, x - 375, this.height / 2 - top - height + 10, 6, height - 20, 3);
                    }
                    const centerY = top + height / 2;
                    if (row.badge) {
                        const badgeColor = row.badge === 1 ? gold : row.badge === 2 ? silver : bronze;
                        UIKit_1.fill(this.contentArt, badgeColor, 76 - 375 - 20, this.height / 2 - centerY - 20, 40, 40, 20);
                        UIKit_1.fill(this.contentArt, colorWithAlpha(badgeColor, 72), 76 - 375 - 15, this.height / 2 - centerY - 15, 30, 30, 15);
                    }
                    const rankText = row.badge ? `${row.badge}` : row.rank ? `${row.rank}` : '—';
                    const rank = this.contentLabel(`Rank-${top}-rank`, rankText, row.badge ? 23 : 21, 76, centerY, row.badge ? ink : row.waiting ? muted : deepRed);
                    rank.isBold = !!row.badge;
                    rank.node.getComponent(cc_1.UITransform).setContentSize(70, height - 4);
                    rank.overflow = cc_1.Label.Overflow.SHRINK;
                    const provinceText = row.own ? `★ ${row.province}` : row.province;
                    const province = this.contentLabel(`Rank-${top}-province`, provinceText, 23, 236, centerY, row.own ? deepRed : ink);
                    province.isBold = row.own;
                    province.node.getComponent(cc_1.UITransform).setContentSize(205, height - 4);
                    province.overflow = cc_1.Label.Overflow.SHRINK;
                    const totalText = row.waiting ? '待塞满' : `${Math.max(0, Math.floor(row.total))} 人`;
                    const total = this.contentLabel(`Rank-${top}-total`, totalText, row.waiting ? 19 : 21, 503, centerY, row.waiting ? muted : deepRed);
                    total.isBold = !row.waiting;
                    total.node.getComponent(cc_1.UITransform).setContentSize(132, height - 4);
                    total.overflow = cc_1.Label.Overflow.SHRINK;
                    const todayText = row.waiting ? '—' : rank_1.formatRankToday(row.today);
                    const today = this.contentLabel(`Rank-${top}-today`, todayText, 19, 642, centerY, row.waiting ? muted : red);
                    today.isBold = !row.waiting;
                    today.node.getComponent(cc_1.UITransform).setContentSize(110, height - 4);
                    today.overflow = cc_1.Label.Overflow.SHRINK;
                }
                drawPagerButton(rect, enabled, text) {
                    this.drawCard(rect, enabled ? new cc_1.Color(88, 20, 31, 242) : new cc_1.Color(56, 44, 49, 228), enabled ? new cc_1.Color(255, 218, 145, 190) : new cc_1.Color(136, 119, 109, 130), 13);
                    const item = this.contentLabel(`RankPager-${text}`, text, 21, rect.x + rect.w / 2, rect.y + rect.h / 2, enabled ? paleGold : new cc_1.Color(160, 145, 137));
                    item.node.getComponent(cc_1.UITransform).setContentSize(rect.w - 24, rect.h - 4);
                    item.overflow = cc_1.Label.Overflow.SHRINK;
                }
                drawFooter() {
                    const footerTop = this.height - 216;
                    const card = { x: 36, y: footerTop, w: 678, h: 78 };
                    UIKit_1.fill(this.contentArt, new cc_1.Color(20, 7, 13, 110), card.x - 375 + 2, this.height / 2 - card.y - card.h + 3, card.w, card.h, 24);
                    UIKit_1.fill(this.contentArt, cream, card.x - 375, this.height / 2 - card.y - card.h, card.w, card.h, 24);
                    this.contentArt.strokeColor = gold;
                    this.contentArt.lineWidth = 2;
                    this.contentArt.roundRect(card.x + 2 - 375, this.height / 2 - card.y - card.h + 2, card.w - 4, card.h - 4, 22);
                    this.contentArt.stroke();
                    UIKit_1.fill(this.contentArt, red, card.x + 20 - 375, this.height / 2 - card.y - card.h + 20, 5, card.h - 40, 3);
                    const info = this.footerText();
                    const own = this.contentLabel('RankOwnProvince', info, 22, 375, card.y + card.h / 2, this.api.province ? deepRed : muted);
                    own.isBold = !!this.api.province;
                    own.node.getComponent(cc_1.UITransform).setContentSize(636, card.h - 12);
                    own.overflow = cc_1.Label.Overflow.SHRINK;
                    this.drawButton(this.startRect, gold, ink, '去塞满', 32, true, '第 1 关');
                    this.drawButton(this.bottomBackRect, new cc_1.Color(76, 17, 27, 244), paleGold, '返回', 27, false);
                }
                footerText() {
                    const own = this.api.province;
                    if (!own)
                        return '你的省份：未选择';
                    const row = this.rows.find(item => item.province === own);
                    if (!row || row.waiting || !row.rank)
                        return `你的省份：${own} · 待塞满`;
                    return `你的省份：${own} · 排第 ${row.rank} 名 · ${row.total} 人通关`;
                }
                drawButton(rect, color, textColor, text, size, primary, subtext) {
                    if (primary)
                        UIKit_1.fill(this.contentArt, new cc_1.Color(22, 7, 13, 120), rect.x + 3 - 375, this.height / 2 - rect.y - rect.h - 4, rect.w, rect.h, 24);
                    UIKit_1.fill(this.contentArt, color, rect.x - 375, this.height / 2 - rect.y - rect.h, rect.w, rect.h, 24);
                    if (!primary) {
                        this.contentArt.strokeColor = new cc_1.Color(255, 217, 139, 190);
                        this.contentArt.lineWidth = 1.5;
                        this.contentArt.roundRect(rect.x + 2 - 375, this.height / 2 - rect.y - rect.h + 2, rect.w - 4, rect.h - 4, 22);
                        this.contentArt.stroke();
                    }
                    const title = this.contentLabel(`RankButton-${text}`, text, size, rect.x + rect.w / 2, rect.y + rect.h / 2 - (subtext ? 9 : 0), textColor);
                    title.isBold = primary;
                    title.node.getComponent(cc_1.UITransform).setContentSize(rect.w - 28, rect.h - 10);
                    title.overflow = cc_1.Label.Overflow.SHRINK;
                    if (subtext) {
                        const sub = this.contentLabel(`RankButton-${text}-sub`, subtext, 15, rect.x + rect.w / 2, rect.y + rect.h / 2 + 23, new cc_1.Color(122, 65, 25));
                        sub.node.getComponent(cc_1.UITransform).setContentSize(rect.w - 30, 22);
                        sub.overflow = cc_1.Label.Overflow.SHRINK;
                    }
                }
                drawCard(rect, color, border, radius = 22) {
                    UIKit_1.fill(this.contentArt, color, rect.x - 375, this.height / 2 - rect.y - rect.h, rect.w, rect.h, radius);
                    this.contentArt.strokeColor = border;
                    this.contentArt.lineWidth = 1.5;
                    this.contentArt.roundRect(rect.x + 2 - 375, this.height / 2 - rect.y - rect.h + 2, rect.w - 4, rect.h - 4, Math.max(2, radius - 2));
                    this.contentArt.stroke();
                }
                contentLabel(name, text, size, x, top, color) {
                    const item = UIKit_1.label(this.contentLayer, name, text, size, x - 375, this.height / 2 - top);
                    item.color = color;
                    return item;
                }
                clearContent() {
                    for (const child of [...this.contentLayer.children])
                        child.destroy();
                    this.contentArt.clear();
                }
                debugState() {
                    var _a, _b, _c, _d, _e, _f;
                    const start = this.page * this.rowsPerPage;
                    return {
                        status: this.status,
                        title: rank_1.RANK_TITLE,
                        province: this.api.province,
                        provinces: (_b = (_a = this.snapshot) === null || _a === void 0 ? void 0 : _a.provinces) !== null && _b !== void 0 ? _b : [],
                        totalClears: (_d = (_c = this.snapshot) === null || _c === void 0 ? void 0 : _c.totalClears) !== null && _d !== void 0 ? _d : null,
                        todayClears: (_f = (_e = this.snapshot) === null || _e === void 0 ? void 0 : _e.todayClears) !== null && _f !== void 0 ? _f : null,
                        errorText: this.status === 'error' ? rank_1.RANK_ERROR_TEXT : null,
                        emptyText: rank_1.RANK_EMPTY_TEXT,
                        page: this.page + 1,
                        pages: this.pageCount,
                        rowsPerPage: this.rowsPerPage,
                        allRows: this.rows.map(row => ({
                            province: row.province,
                            total: row.total,
                            today: row.today,
                            rank: row.rank,
                            badge: row.badge,
                            own: row.own,
                            waiting: row.waiting,
                        })),
                        rows: this.rows.slice(start, start + this.rowsPerPage).map(row => row.province),
                        buttons: {
                            back: this.screenRect(this.backRect),
                            bottomBack: this.screenRect(this.bottomBackRect),
                            start: this.screenRect(this.startRect),
                            prev: this.status === 'ready' && this.pageCount > 1 ? this.screenRect(this.prevRect) : null,
                            next: this.status === 'ready' && this.pageCount > 1 ? this.screenRect(this.nextRect) : null,
                            retry: this.status === 'error' ? this.screenRect(this.retryRect) : null,
                        },
                        layout: {
                            width: this.width,
                            height: this.height,
                            listTop: this.listTop,
                            listBottom: this.height - 232,
                            footerTop: this.height - 216,
                        },
                    };
                }
                screenRect(rect) {
                    const screenWidth = typeof window === 'undefined' ? this.width : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    return Object.assign(Object.assign({}, rect), { screenX: (rect.x + rect.w / 2) / this.width * screenWidth, screenY: (rect.y + rect.h / 2) / this.height * screenHeight, screenLeft: rect.x / this.width * screenWidth, screenRight: (rect.x + rect.w) / this.width * screenWidth, screenTop: rect.y / this.height * screenHeight, screenBottom: (rect.y + rect.h) / this.height * screenHeight, screenW: rect.w / this.width * screenWidth, screenH: rect.h / this.height * screenHeight });
                }
            };
            exports_1("RankPage", RankPage);
        }
    };
});

System.register("chunks:///_virtual/StackPage.ts", ["cc","./stack-progress.ts","./stack-layout.ts","./stack-rules.ts","./stack-vehicles.ts","./rng.ts","./rank.ts","./FinishTimeline.ts","./OptionalResources.ts","./RankApi.ts","./StackSound.ts","./StackShareImage.ts","./ProvincePicker.ts","./UIKit.ts","./StackFinishView.ts","./StackHomecomingView.ts","./RankPage.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, stack_progress_1, stack_layout_1, stack_rules_1, stack_vehicles_1, rng_1, rank_1, FinishTimeline_1, OptionalResources_1, RankApi_1, StackSound_1, StackShareImage_1, ProvincePicker_1, UIKit_1, StackFinishView_1, StackHomecomingView_1, RankPage_1, STACK_COMBO_WINDOW_MS, ink, red, brightRed, cream, gold, paleGold, shadow, blockedShade, dimText, gray, ITEM_CROPS, StackPage, safeProbe;
    var __moduleName = context_1 && context_1.id;
    /** CSS env(safe-area-inset-bottom) in CSS pixels (iOS home indicator, Android gesture bar). */
    function cssSafeBottomPx() {
        if (typeof document === 'undefined' || !document.body)
            return 0;
        try {
            if (!safeProbe) {
                safeProbe = document.createElement('div');
                safeProbe.style.cssText = 'position:fixed;left:0;bottom:0;width:0;visibility:hidden;pointer-events:none;height:env(safe-area-inset-bottom,0px)';
                document.body.appendChild(safeProbe);
            }
            return safeProbe.getBoundingClientRect().height || 0;
        }
        catch (_a) {
            return 0;
        }
    }
    function contains(rect, x, y) {
        return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
    }
    function cropItemFrame(key, frame) {
        const crop = ITEM_CROPS[key];
        if (!crop)
            return frame;
        const result = frame.clone();
        result.rect = new cc_1.Rect(crop.x, crop.y, crop.w, crop.h);
        result.originalSize = new cc_1.Size(crop.w, crop.h);
        result.offset = new cc_1.Vec2(0, 0);
        return result;
    }
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (stack_progress_1_1) {
                stack_progress_1 = stack_progress_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_rules_1_1) {
                stack_rules_1 = stack_rules_1_1;
            },
            function (stack_vehicles_1_1) {
                stack_vehicles_1 = stack_vehicles_1_1;
            },
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (rank_1_1) {
                rank_1 = rank_1_1;
            },
            function (FinishTimeline_1_1) {
                FinishTimeline_1 = FinishTimeline_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (RankApi_1_1) {
                RankApi_1 = RankApi_1_1;
            },
            function (StackSound_1_1) {
                StackSound_1 = StackSound_1_1;
            },
            function (StackShareImage_1_1) {
                StackShareImage_1 = StackShareImage_1_1;
            },
            function (ProvincePicker_1_1) {
                ProvincePicker_1 = ProvincePicker_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            },
            function (StackFinishView_1_1) {
                StackFinishView_1 = StackFinishView_1_1;
            },
            function (StackHomecomingView_1_1) {
                StackHomecomingView_1 = StackHomecomingView_1_1;
            },
            function (RankPage_1_1) {
                RankPage_1 = RankPage_1_1;
            }
        ],
        execute: function () {
            /** Packs closer together than this count as a combo. */
            STACK_COMBO_WINDOW_MS = 3000;
            ink = new cc_1.Color(74, 44, 26);
            red = new cc_1.Color(184, 27, 43);
            brightRed = new cc_1.Color(218, 52, 43);
            cream = new cc_1.Color(255, 246, 229);
            gold = new cc_1.Color(246, 195, 67);
            paleGold = new cc_1.Color(255, 219, 145);
            shadow = new cc_1.Color(27, 14, 18, 95);
            blockedShade = new cc_1.Color(30, 22, 28, 102);
            dimText = new cc_1.Color(91, 74, 62);
            gray = new cc_1.Color(126, 117, 109);
            ITEM_CROPS = {
                mandarin: { x: 6, y: 6, w: 244, h: 244 },
                duck: { x: 6, y: 6, w: 372, h: 244 },
                fruitbasket: { x: 6, y: 6, w: 372, h: 244 },
                fish: { x: 6, y: 6, w: 372, h: 244 },
                kumquat: { x: 6, y: 6, w: 370, h: 372 },
                milk: { x: 6, y: 6, w: 244, h: 244 },
                oven: { x: 6, y: 20, w: 244, h: 345 },
                suitcase_l: { x: 6, y: 6, w: 244, h: 372 },
                woven: { x: 6, y: 6, w: 244, h: 372 },
                toycar: { x: 6, y: 6, w: 244, h: 244 },
                snacks: { x: 6, y: 6, w: 244, h: 372 },
                ham: { x: 6, y: 6, w: 244, h: 500 },
                thermos: { x: 6, y: 6, w: 244, h: 372 },
                firecracker: { x: 6, y: 6, w: 372, h: 116 },
                ricecooker: { x: 6, y: 6, w: 244, h: 244 },
            };
            /** Code-built match-three page. All rules live in core/stack; this file only paints and animates. */
            StackPage = class StackPage {
                constructor(parent, route, onAction) {
                    var _a, _b;
                    this.route = route;
                    this.onAction = onAction;
                    this.carFrames = {};
                    this.carRect = { x: 30, y: 940, w: 690, h: 420 };
                    this.carScaleY = stack_layout_1.STACK_CAR_SCALE_Y;
                    /** Uniform sedan shrink on short pages (1 elsewhere and for sprite rides). */
                    this.carScale = 1;
                    this.soundRect = { x: 655, y: 150, w: 86, h: 40 };
                    this.musicRect = { x: 655, y: 196, w: 86, h: 40 };
                    this.comboCount = 0;
                    this.lastPackAt = 0;
                    this.warnActive = false;
                    this.cardViews = new Map();
                    this.itemFrames = new Map();
                    this.slotViews = [];
                    this.slotViewMap = new Map();
                    /** Card ids currently being packed; their nodes are the only ones allowed to vanish. */
                    this.packingIds = new Set();
                    this.slotRects = [];
                    this.artRect = { x: 0, y: 0, w: 0, h: 0 };
                    this.introShown = false;
                    /** Province rank returned by the last stage-2 clear, for the share card. */
                    this.lastProvinceRank = null;
                    this.actions = [];
                    this.failButtons = [];
                    this.touchWorld = new cc_1.Vec3();
                    this.touchLocal = new cc_1.Vec3();
                    this.touchPoint = { x: 0, y: 0 };
                    this.onHide = () => { this.busy = false; this.sounds.pause(); };
                    this.onShow = () => this.sounds.resume();
                    this.rankApi = new RankApi_1.RankApi();
                    this.finishStarted = 0;
                    this.startedAt = Date.now();
                    this.debugMomPending = false;
                    this.busy = false;
                    this.width = 750;
                    this.height = 1334;
                    this.layoutWidth = -1;
                    this.layoutHeight = -1;
                    this.trunk = { x: 16, y: 1174, w: 718, h: 116 };
                    this.slotY = 1185;
                    this.slotCell = 96;
                    this.safeBottom = 0;
                    /** Level → page mapping that keeps the whole board between the title bar and the trunk lid. */
                    this.board = stack_layout_1.IDENTITY_BOARD;
                    this.actionY = 1527;
                    this.actionH = stack_layout_1.STACK_ACTION_HEIGHT;
                    this.level = stack_progress_1.levelForRoute(route);
                    if (route !== 'daily')
                        stack_progress_1.recordLevelReached(stack_progress_1.browserStorage(), route);
                    this.capacity = (_a = this.level.slotCapacity) !== null && _a !== void 0 ? _a : stack_rules_1.SLOT_CAPACITY;
                    const forcedVehicle = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('vehicle');
                    const levelVehicle = stack_vehicles_1.vehicleForLevel(stack_progress_1.vehicleLevelForRoute(route));
                    const forcedDef = forcedVehicle ? stack_vehicles_1.vehicleByKey(forcedVehicle) : undefined;
                    this.vehicle = forcedDef ? { def: forcedDef, displayName: forcedDef.name } : levelVehicle;
                    this.game = new stack_rules_1.StackGame(this.level, rng_1.createRng(`${this.level.seed}:runtime`), Date.now());
                    this.node = UIKit_1.uiNode('StackPage', parent, 750, 1334);
                    this.sounds = new StackSound_1.StackSound();
                    this.bgImage = UIKit_1.uiNode('StackNight', this.node, 750, 1334).addComponent(cc_1.Sprite);
                    this.bgImage.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    this.bgImage.trim = false;
                    this.bgImage.enabled = false;
                    void OptionalResources_1.loadArt('ui/bg_night').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.bgImage.spriteFrame = frame;
                        this.bgImage.enabled = true;
                        this.layoutBackground();
                    });
                    this.background = UIKit_1.uiNode('StackChrome', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.carLayer = UIKit_1.uiNode('SedanRear', this.node, 750, 1334);
                    this.trunkImage = this.makeImageNode('TrunkWell', this.carLayer);
                    this.bodyImage = this.makeImageNode('CarBody', this.carLayer);
                    this.lidImage = this.makeImageNode('TrunkLid', this.carLayer);
                    this.vehicleImage = this.makeImageNode('VehicleRear', this.carLayer);
                    this.carDetail = UIKit_1.uiNode('TrunkDetails', this.carLayer, 750, 1334).addComponent(cc_1.Graphics);
                    if (this.vehicle.def.art) {
                        void OptionalResources_1.loadArt(this.vehicle.def.art).then(frame => {
                            var _a;
                            if (!frame || !this.node.isValid)
                                return;
                            this.vehicleFrame = frame;
                            this.drawCarSlots(this.carRect);
                            if ((_a = this.failLayer) === null || _a === void 0 ? void 0 : _a.isValid)
                                this.drawOverflowCar(this.failLayer);
                        });
                    }
                    void Promise.all([
                        OptionalResources_1.loadArt('vehicles/sedan_v1_body'),
                        OptionalResources_1.loadArt('vehicles/sedan_v1_trunk'),
                        OptionalResources_1.loadArt('vehicles/sedan_v1_lid'),
                    ]).then(([body, trunk, lid]) => {
                        var _a;
                        if (!this.node.isValid)
                            return;
                        this.carFrames.body = body;
                        this.carFrames.trunk = trunk;
                        this.carFrames.lid = lid;
                        this.drawCarSlots(this.carRect);
                        if ((_a = this.failLayer) === null || _a === void 0 ? void 0 : _a.isValid)
                            this.drawOverflowCar(this.failLayer);
                    });
                    this.hud = UIKit_1.uiNode('StackHud', this.node, 750, 1334);
                    this.stageLabel = UIKit_1.label(this.hud, 'Stage', '第 1 关', 29, 0, 0);
                    this.stageLabel.color = paleGold;
                    this.remainingLabel = UIKit_1.label(this.hud, 'Remaining', '剩余 18 件', 24, 0, 0);
                    this.remainingLabel.color = paleGold;
                    UIKit_1.label(this.hud, 'ModeTitle', '年货三消', 38, 0, 0).color = gold;
                    const headline = stack_progress_1.routeHeadline(route);
                    const subtitle = UIKit_1.label(this.hud, 'Subtitle', (_b = headline.subtitle) !== null && _b !== void 0 ? _b : '点没被压住的年货 · 三件装一箱', headline.subtitle ? 22 : 19, 0, 0);
                    subtitle.color = cream;
                    this.soundButton = UIKit_1.uiNode('SoundToggle', this.hud, 86, 40);
                    this.soundButtonArt = this.soundButton.addComponent(cc_1.Graphics);
                    this.soundButtonLabel = UIKit_1.label(this.soundButton, 'SoundLabel', '音效 开', 15, 0, 0);
                    this.musicButton = UIKit_1.uiNode('MusicToggle', this.hud, 86, 40);
                    this.musicButtonArt = this.musicButton.addComponent(cc_1.Graphics);
                    this.musicButtonLabel = UIKit_1.label(this.musicButton, 'MusicLabel', '音乐 开', 15, 0, 0);
                    this.drawSoundButton();
                    this.reserveLayer = UIKit_1.uiNode('ReserveZone', this.node, 750, 1334);
                    this.reserveShelf = this.reserveLayer.addComponent(cc_1.Graphics);
                    this.reserveLayer.active = false;
                    this.pileLayer = UIKit_1.uiNode('CargoPile', this.node, 750, 1334);
                    this.warnLayer = UIKit_1.uiNode('TrunkWarning', this.node, 750, 1334);
                    this.warnArt = this.warnLayer.addComponent(cc_1.Graphics);
                    this.warnLayer.addComponent(cc_1.UIOpacity);
                    this.warnLayer.active = false;
                    this.slotLayer = UIKit_1.uiNode('TrunkSlots', this.node, 750, 1334);
                    this.fxLayer = UIKit_1.uiNode('Effects', this.node, 750, 1334);
                    this.slotTitle = UIKit_1.label(this.node, 'SlotTitle', stack_vehicles_1.vehicleSlotLabel(this.vehicle.def, this.capacity), 17, 0, 0);
                    this.slotTitle.color = paleGold;
                    this.reserveTitle = UIKit_1.label(this.reserveLayer, 'ReserveTitle', '临时暂存区', 16, 0, 0);
                    this.reserveTitle.color = new cc_1.Color(255, 224, 175, 190);
                    this.buttonsLayer = UIKit_1.uiNode('StackActions', this.node, 750, 1334);
                    this.buttonsArt = this.buttonsLayer.addComponent(cc_1.Graphics);
                    this.actions.push(this.makeAction('moveOut', '移出'), this.makeAction('undo', '撤回'), this.makeAction('shuffle', '洗牌'));
                    this.momLayer = UIKit_1.uiNode('MomToast', this.node, 750, 1334);
                    this.momLayer.active = false;
                    const bubble = UIKit_1.uiNode('MomBubble', this.momLayer, 430, 96);
                    const bubbleArt = bubble.addComponent(cc_1.Graphics);
                    UIKit_1.fill(bubbleArt, cream, -215, -48, 430, 96, 24);
                    UIKit_1.fill(bubbleArt, paleGold, -207, -40, 414, 80, 18);
                    this.momBubble = UIKit_1.label(bubble, 'MomText', '妈妈又塞了一件！', 27, 0, 0);
                    this.momBubble.color = red;
                    this.momAvatar = UIKit_1.uiNode('MomAvatar', this.momLayer, 122, 122);
                    const momFallback = this.momAvatar.addComponent(cc_1.Graphics);
                    UIKit_1.fill(momFallback, red, -55, -55, 110, 110, 55);
                    UIKit_1.label(this.momAvatar, 'MomFallback', '妈', 46, 0, 0).color = cream;
                    const momSprite = UIKit_1.uiNode('MomImage', this.momAvatar, 116, 116).addComponent(cc_1.Sprite);
                    momSprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    momSprite.trim = false;
                    momSprite.enabled = false;
                    void OptionalResources_1.loadArt('ui/mom').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        momSprite.spriteFrame = frame;
                        momSprite.enabled = true;
                        momFallback.enabled = false;
                        this.momAvatar.getChildByName('MomFallback').active = false;
                    });
                    this.node.on(cc_1.Node.EventType.TOUCH_END, this.touch, this);
                    cc_1.game.on(cc_1.Game.EVENT_HIDE, this.onHide);
                    cc_1.game.on(cc_1.Game.EVENT_SHOW, this.onShow);
                    this.debugHook = {
                        getState: () => this.debugState(),
                        getClickable: () => this.debugClickable(),
                        getSolution: () => [...this.level.solution],
                        getModalButtons: () => this.debugModalButtons(),
                        getActions: () => this.debugActions(),
                        getFinishButtons: () => this.debugFinishButtons(),
                        getFinishRank: () => { var _a, _b; return (_b = (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.rankStatusText) !== null && _b !== void 0 ? _b : null; },
                        getFinishStats: () => {
                            var _a, _b;
                            return this.finishStats ? {
                                elapsedSec: this.finishStats.elapsedSec,
                                boxes: this.finishStats.boxes,
                                text: (_b = (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.statsLine) !== null && _b !== void 0 ? _b : '',
                            } : null;
                        },
                        getBoard: () => this.game.cards.map(card => ({
                            id: card.id, kind: card.kind, source: card.source, layer: card.layer,
                            x: card.x, y: card.y, w: card.w, h: card.h,
                        })),
                        getLayout: () => this.debugLayout(),
                        getSlotViews: () => this.debugSlotViews(),
                    };
                    if (typeof window !== 'undefined') {
                        window.__stack = Object.freeze(this.debugHook);
                    }
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => {
                        cc_1.game.off(cc_1.Game.EVENT_HIDE, this.onHide);
                        cc_1.game.off(cc_1.Game.EVENT_SHOW, this.onShow);
                        this.sounds.dispose();
                        if (this.momHideTimer)
                            clearTimeout(this.momHideTimer);
                        if (typeof window !== 'undefined' && window.__stack === this.debugHook) {
                            delete window.__stack;
                        }
                    });
                    this.tick();
                    const debug = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('debug');
                    this.debugMomPending = debug === 'mom';
                    if (debug === 'fail') {
                        this.prefillFailure();
                        this.refresh();
                        if (this.game.status === 'lost')
                            this.openFail();
                    }
                    if (debug === 'win')
                        this.beginFinish(true);
                }
                tick() {
                    const size = cc_1.view.getVisibleSize();
                    if (size.width !== this.layoutWidth || size.height !== this.layoutHeight) {
                        this.layoutWidth = size.width;
                        this.layoutHeight = size.height;
                        this.height = stack_layout_1.stackPageHeight(size.width, size.height);
                        const scale = Math.min(size.width / 750, size.height / this.height);
                        this.node.setScale(scale, scale, 1);
                        this.node.getComponent(cc_1.UITransform).setContentSize(750, this.height);
                        const safe = cc_1.sys.getSafeAreaRect(false);
                        const cssInset = cssSafeBottomPx();
                        const innerHeight = typeof window === 'undefined' ? 0 : window.innerHeight;
                        const cssBottom = innerHeight > 0 ? cssInset / innerHeight * this.height : 0;
                        const bottom = Math.max(0, safe.y / size.height * this.height, cssBottom);
                        this.layout(bottom);
                    }
                    if (this.finish) {
                        this.finishView.render(this.finish.advance(Date.now() - this.finishStarted));
                        return;
                    }
                    if (!this.busy && !this.modal && this.game.status === 'playing') {
                        if (this.debugMomPending) {
                            this.debugMomPending = false;
                            const debugAdded = this.game.triggerMom();
                            if (debugAdded.length)
                                this.onMomAdded(debugAdded);
                        }
                        const added = this.game.tickMom(Date.now());
                        if (added.length)
                            this.onMomAdded(added);
                    }
                }
                layout(bottom) {
                    var _a;
                    this.safeBottom = Math.max(0, bottom);
                    this.node.getComponent(cc_1.UITransform).setContentSize(750, this.height);
                    const rideScale = stack_vehicles_1.vehicleScaleForPage(this.height);
                    this.carScale = this.isSedan ? stack_vehicles_1.sedanScaleForPage(this.height) : 1;
                    const base = stack_layout_1.createStackPageLayout(this.height, bottom, undefined, this.carScale);
                    this.artRect = stack_vehicles_1.vehicleArtRect(this.vehicle.def, base.actionY, 750, rideScale);
                    const metrics = this.isSedan ? base : stack_layout_1.createStackPageLayout(this.height, bottom, this.artRect.y);
                    this.safeBottom = metrics.safeBottom;
                    this.board = stack_layout_1.fitStackBoard(stack_layout_1.stackContentBounds(this.level), metrics);
                    this.actionY = metrics.actionY;
                    this.trunk = Object.assign({}, metrics.trunk);
                    this.carRect = {
                        x: 375 - stack_layout_1.STACK_BODY_SIZE.w * this.carScale / 2,
                        y: metrics.carTop,
                        w: stack_layout_1.STACK_BODY_SIZE.w * this.carScale,
                        h: metrics.bodyHeight,
                    };
                    this.slotRects = this.isSedan
                        ? stack_vehicles_1.sedanSlotCells(this.trunk, this.capacity)
                        : stack_vehicles_1.vehicleSlotCells(this.vehicle.def, this.capacity, this.artRect);
                    this.slotCell = this.slotRects[0].w;
                    this.slotY = Math.min(...this.slotRects.map(r => r.y));
                    if (!this.isSedan) {
                        // The red “almost full” pulse wraps the cargo cells of this vehicle.
                        const left = Math.min(...this.slotRects.map(r => r.x)), right = Math.max(...this.slotRects.map(r => r.x + r.w));
                        const bottomY = Math.max(...this.slotRects.map(r => r.y + r.h));
                        this.trunk = { x: left - 10, y: this.slotY - 10, w: right - left + 20, h: bottomY - this.slotY + 20 };
                    }
                    this.stageLabel.node.setPosition(-242, this.height / 2 - 61);
                    this.remainingLabel.node.setPosition(198, this.height / 2 - 61);
                    this.soundButton.setPosition(323, this.height / 2 - 170);
                    this.musicButton.setPosition(323, this.height / 2 - 216);
                    this.hud.getChildByName('ModeTitle').setPosition(0, this.height / 2 - 61);
                    this.hud.getChildByName('Subtitle').setPosition(0, this.height / 2 - 105);
                    this.slotTitle.node.setPosition(0, this.height / 2 - (this.slotY - (this.isSedan ? 17 : 24)));
                    this.reserveTitle.node.setPosition(-235, this.height / 2 - 920);
                    this.momLayer.getChildByName('MomBubble').setPosition(40, this.height / 2 - 204);
                    this.momAvatar.setPosition(-250, this.height / 2 - 204);
                    this.showVehicleIntro();
                    for (let i = 0; i < this.actions.length; i++) {
                        const rect = this.actions[i].rect;
                        rect.x = 44 + i * 222;
                        rect.y = this.actionY;
                        rect.w = 210;
                        rect.h = this.actionH;
                        this.actions[i].label.node.setPosition(rect.x + rect.w / 2 - 375, this.height / 2 - (rect.y + rect.h / 2));
                    }
                    this.layoutBackground();
                    this.drawCarSlots(this.carRect);
                    this.drawActions();
                    this.drawSoundButton();
                    this.drawFailButtons();
                    this.warnActive = false;
                    this.warnLayer.active = false;
                    this.refresh();
                    (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.layout(this.height);
                }
                layoutBackground() {
                    const scale = Math.max(1, this.height / 1334);
                    this.bgImage.node.getComponent(cc_1.UITransform).setContentSize(750 * scale, 1334 * scale);
                    this.bgImage.node.setPosition(0, 0);
                }
                rect(g, color, x, y, w, h, r = 0) {
                    UIKit_1.fill(g, color, x - 375, this.height / 2 - y - h, w, h, r);
                }
                stroke(g, color, lineWidth, x, y, w, h, r = 0) {
                    g.strokeColor = color;
                    g.lineWidth = lineWidth;
                    g.roundRect(x - 375, this.height / 2 - y - h, w, h, r);
                    g.stroke();
                }
                drawCarSlots(car) {
                    const g = this.background;
                    g.clear();
                    this.rect(g, new cc_1.Color(17, 10, 20, 45), 0, 0, 750, this.height);
                    // Festival header.
                    this.rect(g, new cc_1.Color(45, 19, 29, 232), 32, 14, 686, 118, 26);
                    this.rect(g, gold, 38, 20, 674, 106, 22);
                    this.rect(g, new cc_1.Color(144, 31, 39), 46, 28, 658, 90, 18);
                    this.rect(g, new cc_1.Color(205, 51, 45), 55, 36, 640, 72, 13);
                    this.rect(g, new cc_1.Color(255, 222, 161, 150), 95, 110, 560, 2, 1);
                    this.rect(g, new cc_1.Color(255, 224, 165), 302, 25, 146, 4, 2);
                    // A soft night-market wash makes the pile read as one cargo mountain without boxing it in.
                    this.rect(g, new cc_1.Color(21, 14, 28, 42), 34, 136, 682, 982, 42);
                    this.rect(g, new cc_1.Color(255, 194, 102, 24), 74, 912, 602, 206, 44);
                    this.rect(g, new cc_1.Color(246, 195, 67, 62), 132, 1032, 486, 2, 1);
                    if (!this.isSedan) {
                        this.drawVehicle();
                        return;
                    }
                    this.vehicleImage.enabled = false;
                    if (!this.carFrames.body) {
                        this.rect(g, new cc_1.Color(34, 22, 29, 210), car.x, car.y, car.w, Math.min(430, car.h), 54);
                        this.rect(g, new cc_1.Color(163, 31, 39), car.x + 28, car.y + 86, car.w - 56, 296, 46);
                        this.rect(g, new cc_1.Color(25, 21, 31), car.x + 158, car.y + 104, car.w - 316, 224, 34);
                    }
                    this.drawCarImages();
                    this.carDetail.clear();
                    this.drawTrunkDetails();
                    const last = this.slotRects[this.slotRects.length - 1];
                    const slotWidth = (last.x + last.w) - this.slotRects[0].x;
                    const shelfX = this.slotRects[0].x - 13;
                    const shelfY = this.slotY - 10;
                    this.rect(this.carDetail, new cc_1.Color(9, 8, 12, 220), shelfX, shelfY, slotWidth + 26, this.slotCell + 20, 16);
                    this.stroke(this.carDetail, new cc_1.Color(255, 211, 122, 168), 2, shelfX + 2, shelfY + 2, slotWidth + 22, this.slotCell + 16, 14);
                    for (const slot of this.slotRects) {
                        this.rect(this.carDetail, new cc_1.Color(39, 31, 32), slot.x, slot.y, slot.w, slot.h, 12);
                        this.rect(this.carDetail, new cc_1.Color(20, 19, 22), slot.x + 5, slot.y + 5, slot.w - 10, slot.h - 10, 9);
                        this.stroke(this.carDetail, new cc_1.Color(255, 222, 151, 172), 2, slot.x + 2, slot.y + 2, slot.w - 4, slot.h - 4, 10);
                        this.rect(this.carDetail, new cc_1.Color(246, 195, 67, 105), slot.x + slot.w * .31, slot.y + slot.h - 11, slot.w * .38, 3, 2);
                    }
                    this.rect(this.carDetail, new cc_1.Color(255, 196, 81, 118), this.slotRects[0].x + 24, this.slotY + this.slotCell + 9, slotWidth - 48, 2, 1);
                }
                get isSedan() { return !this.vehicle.def.art; }
                paletteColor(rgb, alpha = 255) { return new cc_1.Color(rgb[0], rgb[1], rgb[2], alpha); }
                /** Non-sedan rides: one rear-view sprite plus code-drawn containers, cells and label plate. */
                drawVehicle() {
                    this.trunkImage.enabled = false;
                    this.bodyImage.enabled = false;
                    this.lidImage.enabled = false;
                    const art = this.artRect;
                    const pal = this.vehicle.def.palette;
                    const g = this.carDetail;
                    g.clear();
                    // Ground shadow under the ride.
                    this.rect(g, new cc_1.Color(8, 4, 8, 90), art.x + art.w * .08, art.y + art.h * .9, art.w * .84, art.h * .08, art.h * .04);
                    if (this.vehicleFrame) {
                        this.showImage(this.vehicleImage, this.vehicleFrame, art.x + art.w / 2, art.y + art.h / 2, art.w, art.h);
                        this.vehicleImage.color = cc_1.Color.WHITE;
                    }
                    else {
                        this.vehicleImage.enabled = false;
                        this.rect(g, this.paletteColor(pal.panel, 230), art.x + art.w * .06, art.y + art.h * .2, art.w * .88, art.h * .62, 40);
                    }
                    const regions = stack_vehicles_1.vehicleRegionRects(this.vehicle.def, art);
                    let cursor = 0;
                    const split = regions.map(region => this.slotRects.filter(cell => cell.x >= region.x - 2 && cell.x + cell.w <= region.x + region.w + 2
                        && cell.y >= region.y - 2 && cell.y + cell.h <= region.y + region.h + 2).length);
                    regions.forEach((region, index) => {
                        const cells = this.slotRects.slice(cursor, cursor + split[index]);
                        cursor += split[index];
                        if (!cells.length)
                            return;
                        const left = Math.min(...cells.map(c => c.x)) - 9, top = Math.min(...cells.map(c => c.y)) - 9;
                        const right = Math.max(...cells.map(c => c.x + c.w)) + 9, bottom = Math.max(...cells.map(c => c.y + c.h)) + 9;
                        this.drawContainer(this.vehicle.def.regions[index].style, left, top, right - left, bottom - top);
                    });
                    for (const slot of this.slotRects) {
                        this.rect(g, this.paletteColor(pal.well, 236), slot.x, slot.y, slot.w, slot.h, 10);
                        this.stroke(g, this.paletteColor(pal.accent, 190), 2, slot.x + 2, slot.y + 2, slot.w - 4, slot.h - 4, 9);
                        this.rect(g, this.paletteColor(pal.accent, 110), slot.x + slot.w * .31, slot.y + slot.h - 10, slot.w * .38, 3, 2);
                    }
                    // Label plate above the first container.
                    const plateW = Math.max(200, this.slotTitle.string.length * 17 + 36);
                    this.rect(g, this.paletteColor(pal.panel, 236), 375 - plateW / 2, this.slotY - 38, plateW, 28, 14);
                    this.stroke(g, this.paletteColor(pal.accent, 220), 2, 375 - plateW / 2 + 1, this.slotY - 37, plateW - 2, 26, 13);
                    this.slotTitle.color = this.paletteColor(pal.text);
                }
                drawContainer(style, x, y, w, h) {
                    const g = this.carDetail;
                    const pal = this.vehicle.def.palette;
                    const accent = this.paletteColor(pal.accent, 210);
                    if (style === 'box') {
                        this.rect(g, new cc_1.Color(18, 10, 12, 215), x, y, w, h, 16);
                        this.stroke(g, accent, 3, x + 1, y + 1, w - 2, h - 2, 15);
                        this.rect(g, this.paletteColor(pal.accent, 150), x + 12, y + 3, w - 24, 3, 2);
                    }
                    else if (style === 'bag') {
                        this.rect(g, new cc_1.Color(64, 14, 18, 225), x, y, w, h, 20);
                        this.stroke(g, accent, 3, x + 1, y + 1, w - 2, h - 2, 19);
                        // Flap seam and buckle.
                        this.rect(g, this.paletteColor(pal.accent, 170), x + 10, y + h * .5 - 1, w - 20, 2, 1);
                        this.rect(g, accent, x + w / 2 - 8, y + h * .5 - 7, 16, 14, 4);
                    }
                    else if (style === 'bed') {
                        this.rect(g, new cc_1.Color(40, 30, 26, 205), x, y, w, h, 8);
                        g.strokeColor = new cc_1.Color(255, 220, 160, 40);
                        g.lineWidth = 2;
                        for (let lineX = x + 28; lineX < x + w - 10; lineX += 34) {
                            g.moveTo(lineX - 375, this.height / 2 - y - 4);
                            g.lineTo(lineX - 375, this.height / 2 - y - h + 4);
                        }
                        g.stroke();
                        this.stroke(g, accent, 3, x + 1, y + 1, w - 2, h - 2, 7);
                    }
                    else if (style === 'hatch') {
                        this.rect(g, new cc_1.Color(22, 20, 26, 215), x, y, w, h, 14);
                        this.stroke(g, new cc_1.Color(205, 205, 215, 150), 2, x + 3, y + 3, w - 6, h - 6, 12);
                        this.stroke(g, accent, 2, x + 1, y + 1, w - 2, h - 2, 13);
                    }
                    else {
                        this.rect(g, new cc_1.Color(30, 30, 36, 220), x, y, w, h, 6);
                        this.stroke(g, new cc_1.Color(236, 236, 240, 190), 4, x + 2, y + 2, w - 4, h - 4, 5);
                        this.rect(g, accent, x + 6, y + h - 10, w - 12, 4, 2);
                    }
                }
                /** “本关座驾：…” banner; later levels slide the new ride in with “换车啦”. */
                showVehicleIntro() {
                    if (this.introShown)
                        return;
                    this.introShown = true;
                    const swap = this.route !== 'daily' && this.route >= 2;
                    const banner = UIKit_1.uiNode('VehicleIntro', this.fxLayer, 520, 120);
                    const g = banner.addComponent(cc_1.Graphics);
                    const pal = this.vehicle.def.palette;
                    UIKit_1.fill(g, new cc_1.Color(30, 10, 14, 210), -250, -52, 500, 104, 26);
                    UIKit_1.fill(g, this.paletteColor(pal.accent), -244, -46, 488, 92, 22);
                    UIKit_1.fill(g, this.paletteColor(pal.panel), -238, -40, 476, 80, 18);
                    const title = UIKit_1.label(banner, 'IntroTitle', swap ? '换车啦！' : '出发回家', 24, 0, 18);
                    title.color = this.paletteColor(pal.text);
                    const name = UIKit_1.label(banner, 'IntroVehicle', `本关座驾：${this.vehicle.displayName}`, 30, 0, -16);
                    name.color = this.paletteColor(pal.accent);
                    const opacity = banner.addComponent(cc_1.UIOpacity);
                    const y = this.height / 2 - (this.artRect.y > 0 && !this.isSedan ? this.artRect.y - 70 : this.carRect.y - 150);
                    banner.setPosition(0, y, 40);
                    banner.setScale(.7, .7, 1);
                    cc_1.tween(banner).to(.22, { scale: new cc_1.Vec3(1, 1, 1) }, { easing: 'backOut' }).delay(1.5).call(() => {
                        cc_1.tween(opacity).to(.35, { opacity: 0 }).call(() => { if (banner.isValid)
                            banner.destroy(); }).start();
                    }).start();
                    if (swap) {
                        this.carLayer.setPosition(820, 0, 0);
                        cc_1.tween(this.carLayer).to(.55, { position: new cc_1.Vec3(0, 0, 0) }, { easing: 'quadOut' }).start();
                    }
                    this.sounds.play('swap');
                }
                makeImageNode(name, parent) {
                    const sprite = UIKit_1.uiNode(name, parent, 1, 1).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    return sprite;
                }
                showImage(sprite, frame, cx, cy, w, h) {
                    sprite.spriteFrame = frame;
                    sprite.enabled = true;
                    sprite.node.getComponent(cc_1.UITransform).setContentSize(w, h);
                    sprite.node.setPosition(cx - 375, this.height / 2 - cy);
                }
                drawCarImages() {
                    const { body, trunk, lid } = this.carFrames;
                    if (trunk)
                        this.showImage(this.trunkImage, trunk, this.trunk.x + this.trunk.w / 2, this.trunk.y + this.trunk.h / 2, this.trunk.w, this.trunk.h);
                    if (body) {
                        const frame = body.clone();
                        frame.insetTop = stack_layout_1.STACK_BODY_SLICE.top;
                        frame.insetBottom = stack_layout_1.STACK_BODY_SLICE.bottom;
                        frame.insetLeft = 0;
                        frame.insetRight = 0;
                        this.bodyImage.type = cc_1.Sprite.Type.SLICED;
                        this.showImage(this.bodyImage, frame, this.carRect.x + this.carRect.w / 2, this.carRect.y + this.carRect.h / 2, stack_layout_1.STACK_BODY_SIZE.w, stack_layout_1.STACK_BODY_SIZE.h);
                        this.bodyImage.node.setScale(this.carScale, this.carScaleY * this.carScale, 1);
                    }
                    if (lid) {
                        const lidW = 642 * this.carScale, lidH = 82 * this.carScale;
                        this.showImage(this.lidImage, lid, 375, this.carRect.y - 34 * this.carScale, lidW, lidH);
                        this.lidImage.node.setScale(1, 1, 1);
                        this.lidImage.node.angle = -3;
                    }
                }
                drawTrunkDetails() {
                    this.rect(this.carDetail, new cc_1.Color(14, 11, 14, 82), this.trunk.x - 4, this.trunk.y - 3, this.trunk.w + 8, this.trunk.h + 6, 18);
                    this.stroke(this.carDetail, new cc_1.Color(255, 206, 120, 120), 2, this.trunk.x - 2, this.trunk.y - 1, this.trunk.w + 4, this.trunk.h + 2, 15);
                    this.rect(this.carDetail, new cc_1.Color(8, 6, 9, 112), this.trunk.x + 8, this.trunk.y + 6, this.trunk.w - 16, 20, 9);
                    const k = this.carScale;
                    const sx = (x) => (x - 375) * k;
                    const lidBottom = this.carRect.y + 38 * k;
                    const hinge = this.height / 2 - (this.carRect.y + 12 * k);
                    this.carDetail.strokeColor = new cc_1.Color(30, 17, 20, 220);
                    this.carDetail.lineWidth = 7 * k;
                    this.carDetail.moveTo(sx(97), hinge);
                    this.carDetail.lineTo(sx(157), this.height / 2 - lidBottom);
                    this.carDetail.moveTo(sx(653), hinge);
                    this.carDetail.lineTo(sx(593), this.height / 2 - lidBottom);
                    this.carDetail.stroke();
                    this.carDetail.strokeColor = new cc_1.Color(255, 197, 101, 105);
                    this.carDetail.lineWidth = 2;
                    this.carDetail.moveTo(sx(98), hinge);
                    this.carDetail.lineTo(sx(157), this.height / 2 - lidBottom);
                    this.carDetail.moveTo(sx(652), hinge);
                    this.carDetail.lineTo(sx(593), this.height / 2 - lidBottom);
                    this.carDetail.stroke();
                }
                makeAction(key, title) {
                    const text = UIKit_1.label(this.buttonsLayer, `Action-${key}`, title, 25, 0, 0);
                    text.color = cream;
                    return { key, title, rect: { x: 0, y: 0, w: 0, h: 0 }, label: text };
                }
                drawSoundButton() {
                    this.drawToggle(this.soundButtonArt, this.soundButtonLabel, this.sounds.soundEnabled, '音效');
                    this.drawToggle(this.musicButtonArt, this.musicButtonLabel, this.sounds.musicEnabled, '音乐');
                }
                drawToggle(g, text, on, name) {
                    g.clear();
                    UIKit_1.fill(g, on ? gold : new cc_1.Color(96, 87, 89), -43, -20, 86, 40, 14);
                    UIKit_1.fill(g, on ? new cc_1.Color(139, 31, 38) : new cc_1.Color(67, 61, 64), -40, -17, 80, 34, 11);
                    g.strokeColor = on ? new cc_1.Color(255, 226, 164) : new cc_1.Color(155, 146, 146);
                    g.lineWidth = 1.5;
                    g.roundRect(-41, -18, 82, 36, 12);
                    g.stroke();
                    text.string = `${name} ${on ? '开' : '关'}`;
                    text.color = on ? paleGold : new cc_1.Color(205, 198, 194);
                }
                drawActions() {
                    const g = this.buttonsArt;
                    g.clear();
                    for (const action of this.actions) {
                        const used = this.game.props[action.key];
                        const pal = this.vehicle.def.palette;
                        this.rect(g, used ? new cc_1.Color(69, 61, 63, 240) : this.paletteColor(pal.panel, 246), action.rect.x, action.rect.y, action.rect.w, action.rect.h, 20);
                        this.stroke(g, used ? gray : this.paletteColor(pal.accent), 2, action.rect.x + 2, action.rect.y + 2, action.rect.w - 4, action.rect.h - 4, 18);
                        this.rect(g, used ? new cc_1.Color(109, 99, 101) : this.paletteColor(pal.accent, 90), action.rect.x + 17, action.rect.y + action.rect.h - 15, action.rect.w - 34, 3, 2);
                        action.label.string = used ? `${action.title} · 已用` : `${action.title} · 1 次`;
                        action.label.color = used ? new cc_1.Color(185, 177, 169) : this.paletteColor(pal.text);
                    }
                }
                refresh(animateSlot = false) {
                    this.updateHud();
                    this.updateReserve();
                    this.syncPile();
                    this.renderSlot(this.game.slot, { animate: animateSlot });
                    this.updateWarning();
                    this.drawActions();
                }
                updateReserve() {
                    const reserve = this.game.cards.filter(card => card.source === 'reserve').map(card => stack_layout_1.mapStackRect(this.board, card));
                    this.reserveLayer.active = reserve.length > 0;
                    if (!reserve.length)
                        return;
                    const minX = Math.min(...reserve.map(card => card.x));
                    const minY = Math.min(...reserve.map(card => card.y));
                    const maxX = Math.max(...reserve.map(card => card.x + card.w));
                    const maxY = Math.max(...reserve.map(card => card.y + card.h));
                    const shelfX = Math.max(20, minX - 12);
                    const shelfY = minY - 10;
                    const shelfW = Math.min(710, maxX - minX + 24);
                    const shelfH = maxY - minY + 20;
                    this.reserveShelf.clear();
                    this.rect(this.reserveShelf, new cc_1.Color(35, 22, 31, 214), shelfX, shelfY, shelfW, shelfH, 18);
                    this.stroke(this.reserveShelf, new cc_1.Color(246, 195, 67, 132), 2, shelfX + 2, shelfY + 2, shelfW - 4, shelfH - 4, 16);
                    this.reserveTitle.node.setPosition(shelfX + 70 - 375, this.height / 2 - (shelfY - 5));
                }
                updateHud() {
                    this.stageLabel.string = stack_progress_1.routeHeadline(this.route).stage;
                    this.remainingLabel.string = `剩余 ${this.game.pileRemaining} 件`;
                }
                syncPile() {
                    const active = new Map(this.game.cards.map(card => [card.id, card]));
                    for (const [id, view] of this.cardViews) {
                        if (!active.has(id))
                            view.node.active = false;
                    }
                    const sorted = [...this.game.cards].sort((a, b) => a.layer - b.layer || a.id - b.id);
                    for (let index = 0; index < sorted.length; index++) {
                        const card = sorted[index];
                        let view = this.cardViews.get(card.id);
                        if (!view) {
                            view = this.makeCardView(card, card.w * this.board.scale, this.pileLayer);
                            this.cardViews.set(card.id, view);
                            view.born = true;
                        }
                        const size = card.w * this.board.scale;
                        if (view.kind !== card.kind || Math.abs(view.size - size) > .01)
                            this.configureCard(view, card, size);
                        view.node.active = true;
                        view.node.setSiblingIndex(index);
                        const center = this.cardCenter(card);
                        if (view.born) {
                            view.node.setPosition(center.x, center.y + (card.source === 'mom' ? 120 * this.board.scale : 0), 0);
                            if (card.source === 'mom')
                                cc_1.tween(view.node).to(0.28, { position: center }, { easing: 'bounceOut' }).start();
                            view.born = false;
                        }
                        else if (!this.busy || card.source !== 'mom') {
                            view.node.setPosition(center);
                        }
                        const blocked = stack_rules_1.isBlocked(card, this.game.cards);
                        view.back.node.active = !!card.carton && blocked;
                        this.drawDim(view, blocked && !view.back.node.active);
                    }
                }
                /**
                 * Reconciles slot card nodes with the slot contents. Every card keeps its own node for as long
                 * as it stays in the slot (never hidden, rebuilt or re-textured); cards that move tween to their
                 * new cell, cards that left are destroyed, and `reserve` keeps an empty cell for a card in flight.
                 */
                renderSlot(cards, options = {}) {
                    const keep = new Set(cards.map(card => card.id));
                    for (const [id, view] of this.slotViewMap) {
                        if (keep.has(id) && id !== options.reserve)
                            continue;
                        cc_1.Tween.stopAllByTarget(view.node);
                        if (view.node.isValid)
                            view.node.destroy();
                        this.slotViewMap.delete(id);
                    }
                    for (let index = 0; index < cards.length && index < this.slotRects.length; index++) {
                        const card = cards[index];
                        if (card.id === options.reserve)
                            continue;
                        const rect = this.slotRects[index];
                        const target = new cc_1.Vec3(rect.x + rect.w / 2 - 375, this.height / 2 - (rect.y + rect.h / 2), 0);
                        let view = this.slotViewMap.get(card.id);
                        if (!view) {
                            view = this.makeCardView(card, Math.max(42, rect.w - 6), this.slotLayer);
                            view.node.setPosition(target);
                            this.slotViewMap.set(card.id, view);
                            continue;
                        }
                        const current = view.node.position;
                        if (Math.abs(current.x - target.x) < .5 && Math.abs(current.y - target.y) < .5)
                            continue;
                        cc_1.Tween.stopAllByTarget(view.node);
                        if (options.animate)
                            cc_1.tween(view.node).to(.16, { position: target }, { easing: 'quadOut' }).start();
                        else
                            view.node.setPosition(target);
                    }
                    this.slotViews = [...this.slotViewMap.values()];
                }
                /** Snapshot for the frame-sampling slot check (tools/play-slot.mjs). */
                debugSlotViews() {
                    return [...this.slotViewMap.values()].map(view => {
                        var _a, _b, _c;
                        return ({
                            id: view.cardId,
                            kind: view.kind,
                            uuid: view.node.uuid,
                            active: view.node.isValid && view.node.activeInHierarchy,
                            opacity: (_b = (_a = view.node.getComponent(cc_1.UIOpacity)) === null || _a === void 0 ? void 0 : _a.opacity) !== null && _b !== void 0 ? _b : 255,
                            spriteEnabled: view.sprite.enabled,
                            frame: view.sprite.spriteFrame ? `${view.sprite.spriteFrame.name}#${(_c = view.sprite.spriteFrame._uuid) !== null && _c !== void 0 ? _c : ''}` : 'fallback',
                            x: view.node.position.x,
                            scale: view.node.scale.x,
                        });
                    });
                }
                makeCardView(card, size, parent) {
                    const node = UIKit_1.uiNode(`Card-${card.id}`, parent, size, size);
                    const art = node.addComponent(cc_1.Graphics);
                    const sprite = UIKit_1.uiNode('ItemArt', node, size, size).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    const fallback = UIKit_1.label(node, 'Fallback', card.name, 17, 0, 0);
                    fallback.color = ink;
                    fallback.overflow = cc_1.Label.Overflow.SHRINK;
                    fallback.node.getComponent(cc_1.UITransform).setContentSize(size * .86, size * .7);
                    const back = UIKit_1.uiNode('CartonBack', node, size, size).addComponent(cc_1.Graphics);
                    back.node.active = false;
                    const dim = UIKit_1.uiNode('PressedShade', node, size, size).addComponent(cc_1.Graphics);
                    const view = { node, art, sprite, fallback, dim, back, size, kind: '', cardId: card.id, born: false };
                    this.configureCard(view, card, size);
                    return view;
                }
                configureCard(view, card, size) {
                    view.size = size;
                    view.kind = card.kind;
                    view.cardId = card.id;
                    view.node.getComponent(cc_1.UITransform).setContentSize(size, size);
                    view.node.name = `Card-${card.id}-${card.kind}`;
                    const g = view.art;
                    g.clear();
                    const radius = Math.max(9, size * .14);
                    UIKit_1.fill(g, shadow, -size / 2 + 3, -size / 2 - 5, size, size, radius);
                    UIKit_1.fill(g, cream, -size / 2, -size / 2, size, size, radius);
                    UIKit_1.fill(g, new cc_1.Color(255, 235, 195), -size / 2 + 5, -size / 2 + 5, size - 10, size - 10, radius - 3);
                    g.strokeColor = red;
                    g.lineWidth = Math.max(2, size * .036);
                    g.roundRect(-size / 2 + 1, -size / 2 + 1, size - 2, size - 2, radius);
                    g.stroke();
                    g.strokeColor = new cc_1.Color(246, 195, 67, 210);
                    g.lineWidth = 1.3;
                    g.roundRect(-size / 2 + 5, -size / 2 + 5, size - 10, size - 10, radius - 3);
                    g.stroke();
                    this.drawCartonBack(view.back, size);
                    view.fallback.string = card.name;
                    view.fallback.fontSize = Math.max(12, Math.min(18, size * .2));
                    view.fallback.lineHeight = view.fallback.fontSize + 3;
                    view.fallback.node.active = true;
                    view.sprite.enabled = false;
                    const cached = this.itemFrames.get(card.kind);
                    if (cached)
                        this.showItemFrame(view, cached);
                    else if (!this.itemFrames.has(card.kind)) {
                        this.itemFrames.set(card.kind, undefined);
                        void OptionalResources_1.loadArt(`items/${card.kind}`).then(frame => {
                            if (!frame || !view.node.isValid)
                                return;
                            const cropped = cropItemFrame(card.kind, frame);
                            this.itemFrames.set(card.kind, cropped);
                            for (const candidate of this.cardViews.values())
                                if (candidate.kind === card.kind)
                                    this.showItemFrame(candidate, cropped);
                            for (const candidate of this.slotViews)
                                if (candidate.kind === card.kind)
                                    this.showItemFrame(candidate, cropped);
                        });
                    }
                }
                get hideCovered() {
                    return this.level.cards.some(card => card.carton);
                }
                /** Kraft carton with red tape and a 福 stamp: what a covered card looks like from level 4 on. */
                drawCartonBack(g, size) {
                    g.clear();
                    const radius = Math.max(9, size * .14);
                    UIKit_1.fill(g, new cc_1.Color(120, 78, 40), -size / 2, -size / 2, size, size, radius);
                    UIKit_1.fill(g, new cc_1.Color(196, 142, 82), -size / 2 + 3, -size / 2 + 3, size - 6, size - 6, radius - 2);
                    UIKit_1.fill(g, new cc_1.Color(214, 164, 104), -size / 2 + 6, -size / 2 + size * .52, size - 12, size * .4, radius - 4);
                    // Packing tape across the flaps.
                    UIKit_1.fill(g, new cc_1.Color(186, 38, 40, 235), -size * .12, -size / 2 + 3, size * .24, size - 6, 2);
                    g.strokeColor = new cc_1.Color(120, 78, 40, 160);
                    g.lineWidth = Math.max(1.5, size * .02);
                    g.moveTo(-size / 2 + 6, size * .02);
                    g.lineTo(size / 2 - 6, size * .02);
                    g.stroke();
                    UIKit_1.fill(g, new cc_1.Color(246, 195, 67, 230), -size * .13, size * .16, size * .26, size * .22, 3);
                    g.strokeColor = new cc_1.Color(186, 38, 40);
                    g.lineWidth = Math.max(1.5, size * .025);
                    g.roundRect(-size / 2 + 1, -size / 2 + 1, size - 2, size - 2, radius);
                    g.stroke();
                }
                showItemFrame(view, frame) {
                    if (!view.node.isValid)
                        return;
                    const max = view.size * .84;
                    const ratio = frame.width / frame.height;
                    const w = ratio >= 1 ? max : max * ratio;
                    const h = ratio >= 1 ? max / ratio : max;
                    view.sprite.node.getComponent(cc_1.UITransform).setContentSize(w, h);
                    view.sprite.spriteFrame = frame;
                    view.sprite.enabled = true;
                    view.fallback.node.active = false;
                }
                drawDim(view, blocked) {
                    const g = view.dim;
                    g.clear();
                    if (!blocked)
                        return;
                    UIKit_1.fill(g, blockedShade, -view.size / 2 + 2, -view.size / 2 + 2, view.size - 4, view.size - 4, Math.max(8, view.size * .13));
                }
                cardCenter(card) {
                    const rect = stack_layout_1.mapStackRect(this.board, card);
                    return new cc_1.Vec3(rect.x + rect.w / 2 - 375, this.height / 2 - (rect.y + rect.h / 2), 0);
                }
                /** Page (750-wide design) point → CSS pixel on screen, including letterboxing. */
                toScreen(x, y) {
                    const sw = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const sh = typeof window === 'undefined' ? this.height : window.innerHeight;
                    const k = Math.min(sw / 750, sh / this.height);
                    return { x: (sw - 750 * k) / 2 + x * k, y: (sh - this.height * k) / 2 + y * k, k };
                }
                touch(event) {
                    var _a;
                    this.sounds.unlock();
                    const p = this.point(event);
                    if (this.rankPage) {
                        this.rankPage.press(p.x, p.y);
                        return;
                    }
                    if (this.provincePicker) {
                        this.provincePicker.press(p.x, p.y);
                        return;
                    }
                    if (this.finish) {
                        (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.press(p.x, p.y);
                        return;
                    }
                    if (this.modal === 'fail') {
                        for (const button of this.failButtons) {
                            if (!contains(button.rect, p.x, p.y))
                                continue;
                            if (button.action === 'revive')
                                this.revive();
                            else if (button.action === 'share')
                                this.openShare(false);
                            else
                                this.onAction('replay');
                            return;
                        }
                        return;
                    }
                    if (contains(this.soundRect, p.x, p.y)) {
                        this.sounds.toggleSound();
                        this.drawSoundButton();
                        return;
                    }
                    if (contains(this.musicRect, p.x, p.y)) {
                        this.sounds.toggleMusic();
                        this.drawSoundButton();
                        return;
                    }
                    if (this.busy || this.game.status !== 'playing')
                        return;
                    for (const action of this.actions) {
                        if (!contains(action.rect, p.x, p.y))
                            continue;
                        this.useAction(action.key);
                        return;
                    }
                    const lp = stack_layout_1.unmapStackPoint(this.board, p.x, p.y);
                    const hit = stack_rules_1.topCardAt(this.game.cards, lp.x, lp.y);
                    if (!hit)
                        return;
                    if (!this.game.canTap(hit.id)) {
                        this.sounds.play('tap');
                        return;
                    }
                    this.tapCard(hit.id);
                }
                point(event) {
                    const p = event.getUILocation();
                    this.touchWorld.set(p.x, p.y, 0);
                    const local = this.node.getComponent(cc_1.UITransform).convertToNodeSpaceAR(this.touchWorld, this.touchLocal);
                    this.touchPoint.x = local.x + 375;
                    this.touchPoint.y = this.height / 2 - local.y;
                    return this.touchPoint;
                }
                tapCard(id) {
                    const result = this.game.tap(id, Date.now());
                    if (!result.ok || !result.card) {
                        this.sounds.play('tap');
                        return;
                    }
                    this.busy = true;
                    this.sounds.play('tap');
                    setTimeout(() => { if (this.node.isValid)
                        this.sounds.play('fly'); }, 35);
                    const flyer = this.makeCardView(result.card, result.card.w * this.board.scale, this.fxLayer);
                    flyer.node.setPosition(this.cardCenter(result.card));
                    const targetIndex = Math.min(result.insertIndex, this.slotRects.length - 1);
                    const slot = this.slotRects[targetIndex];
                    const target = new cc_1.Vec3(slot.x + slot.w / 2 - 375, this.height / 2 - (slot.y + slot.h / 2), 0);
                    const scale = Math.max(.35, (slot.w - 6) / (result.card.w * this.board.scale));
                    this.syncPile();
                    this.updateHud();
                    // Neighbours after the insert point slide right now, leaving a gap the flyer lands in.
                    this.renderSlot(result.slotBeforePack, { animate: true, reserve: result.card.id });
                    const landed = result.card;
                    cc_1.tween(flyer.node).to(.2, { position: target, scale: new cc_1.Vec3(scale, scale, 1) }, { easing: 'quadOut' }).call(() => {
                        if (flyer.node.isValid)
                            flyer.node.destroy();
                        this.renderSlot(result.slotBeforePack, { animate: true });
                        void landed;
                        if (result.packed.length === stack_rules_1.PACK_SIZE)
                            this.playPack(result);
                        else
                            this.finishTap(result);
                    }).start();
                }
                playPack(result) {
                    this.sounds.play('pack');
                    const now = Date.now();
                    this.comboCount = now - this.lastPackAt <= STACK_COMBO_WINDOW_MS ? this.comboCount + 1 : 1;
                    this.lastPackAt = now;
                    if (this.comboCount >= 2) {
                        const level = Math.min(8, this.comboCount - 1);
                        setTimeout(() => { if (this.node.isValid)
                            this.sounds.play('combo', { level }); }, 120);
                        this.showCombo(this.comboCount);
                    }
                    const packed = new Set(result.packed.map(card => card.id));
                    this.packingIds = packed;
                    const views = [...this.slotViewMap.values()].filter(view => packed.has(view.cardId));
                    const first = views[0];
                    if (!first) {
                        this.packingIds = new Set();
                        this.finishTap(result);
                        return;
                    }
                    const center = views[Math.min(1, views.length - 1)].node.position.clone();
                    setTimeout(() => {
                        if (!this.node.isValid)
                            return;
                        for (let i = 0; i < views.length; i++) {
                            const view = views[i];
                            cc_1.Tween.stopAllByTarget(view.node);
                            cc_1.tween(view.node).to(.24, { position: center, scale: new cc_1.Vec3(.58, .58, 1), angle: i === 0 ? -8 : i === 2 ? 8 : 0 }, { easing: 'quadIn' }).start();
                        }
                        setTimeout(() => {
                            if (!this.node.isValid)
                                return;
                            // Only the three packed cards leave; every other slot card keeps its node and slides left.
                            for (const view of views) {
                                cc_1.Tween.stopAllByTarget(view.node);
                                if (view.node.isValid)
                                    view.node.destroy();
                                this.slotViewMap.delete(view.cardId);
                            }
                            this.slotViews = [...this.slotViewMap.values()];
                            this.packingIds = new Set();
                            this.renderSlot(this.game.slot, { animate: true });
                            this.showPackedBox(center, () => this.finishTap(result));
                        }, 250);
                    }, 80);
                }
                showPackedBox(at, onDone) {
                    const box = UIKit_1.uiNode('PackedBox', this.fxLayer, 132, 104);
                    box.setPosition(at.x, at.y, 20);
                    const g = box.addComponent(cc_1.Graphics);
                    UIKit_1.fill(g, new cc_1.Color(33, 18, 17, 80), -62, -48, 128, 92, 10);
                    UIKit_1.fill(g, new cc_1.Color(222, 177, 104), -60, -45, 120, 88, 8);
                    UIKit_1.fill(g, new cc_1.Color(247, 213, 153), -55, -40, 110, 78, 6);
                    UIKit_1.fill(g, new cc_1.Color(184, 40, 40), -55, -8, 110, 20, 3);
                    g.strokeColor = new cc_1.Color(114, 56, 33);
                    g.lineWidth = 2;
                    g.roundRect(-60, -45, 120, 88, 8);
                    g.stroke();
                    UIKit_1.fill(g, gold, -8, -16, 16, 38, 4);
                    const seal = UIKit_1.label(box, 'Fu', '福', 42, 0, 7);
                    seal.color = cream;
                    box.setScale(.42, .42, 1);
                    cc_1.tween(box).to(.18, { scale: new cc_1.Vec3(1.06, 1.06, 1) }, { easing: 'backOut' }).to(.08, { scale: new cc_1.Vec3(1, 1, 1) }).start();
                    setTimeout(() => {
                        if (!box.isValid) {
                            onDone();
                            return;
                        }
                        cc_1.tween(box).to(.34, { position: new cc_1.Vec3(at.x, at.y + 118, 20), scale: new cc_1.Vec3(.36, .36, 1) }, { easing: 'quadIn' }).call(() => {
                            if (box.isValid)
                                box.destroy();
                            onDone();
                        }).start();
                    }, 360);
                }
                finishTap(result) {
                    this.busy = false;
                    this.refresh(true);
                    if (result.status === 'lost')
                        this.openFail();
                    else if (result.status === 'won')
                        this.beginFinish();
                }
                useAction(key) {
                    let used = false;
                    if (key === 'moveOut')
                        used = this.game.useMoveOut().length > 0;
                    else if (key === 'undo')
                        used = this.game.useUndo();
                    else
                        used = this.game.useShuffle();
                    this.sounds.play(used ? 'prop' : 'tap');
                    this.refresh();
                }
                /** “连击 ×N” floats up from the slot and fades out. */
                showCombo(count) {
                    const node = UIKit_1.uiNode('ComboFloat', this.fxLayer, 320, 80);
                    const text = UIKit_1.label(node, 'ComboText', `连击 ×${count}`, 44, 0, 0);
                    text.color = gold;
                    text.enableOutline = true;
                    text.outlineColor = new cc_1.Color(120, 14, 22);
                    text.outlineWidth = 4;
                    const opacity = node.addComponent(cc_1.UIOpacity);
                    const y = this.height / 2 - (this.slotY - 70);
                    node.setPosition(0, y, 30);
                    node.setScale(.6, .6, 1);
                    cc_1.tween(node).to(.16, { scale: new cc_1.Vec3(1.15, 1.15, 1) }, { easing: 'backOut' }).to(.5, { position: new cc_1.Vec3(0, y + 70, 30) }).call(() => { if (node.isValid)
                        node.destroy(); }).start();
                    cc_1.tween(opacity).delay(.35).to(.3, { opacity: 0 }).start();
                }
                /** Red pulsing trunk when only one or two slot cells are left. */
                updateWarning() {
                    const free = this.capacity - this.game.slot.length;
                    const danger = this.game.status === 'playing' && !this.finish && free <= 2;
                    if (danger === this.warnActive)
                        return;
                    this.warnActive = danger;
                    const opacity = this.warnLayer.getComponent(cc_1.UIOpacity);
                    cc_1.Tween.stopAllByTarget(opacity);
                    this.warnLayer.active = danger;
                    if (!danger)
                        return;
                    this.sounds.play('warn');
                    const g = this.warnArt;
                    g.clear();
                    const t = this.trunk;
                    g.fillColor = new cc_1.Color(230, 30, 36, 92);
                    g.roundRect(t.x - 6 - 375, this.height / 2 - (t.y + t.h) - 6, t.w + 12, t.h + 12, 18);
                    g.fill();
                    g.strokeColor = new cc_1.Color(255, 70, 60, 255);
                    g.lineWidth = 5;
                    g.roundRect(t.x - 6 - 375, this.height / 2 - (t.y + t.h) - 6, t.w + 12, t.h + 12, 18);
                    g.stroke();
                    opacity.opacity = 255;
                    cc_1.tween(opacity).repeatForever(cc_1.tween().to(.32, { opacity: 70 }).to(.32, { opacity: 255 })).start();
                }
                prefillFailure() {
                    var _a;
                    let guard = 0;
                    while (this.game.status === 'playing' && this.game.slot.length < stack_rules_1.SLOT_CAPACITY && guard++ < 100) {
                        const free = this.game.cards.filter(card => this.game.canTap(card.id));
                        const target = (_a = free.find(card => this.game.slot.filter(item => item.kind === card.kind).length === 0)) !== null && _a !== void 0 ? _a : free.find(card => this.game.slot.filter(item => item.kind === card.kind).length === 1);
                        if (!target)
                            break;
                        this.game.tap(target.id, Date.now());
                    }
                }
                openFail() {
                    var _a;
                    this.modal = 'fail';
                    (_a = this.failLayer) === null || _a === void 0 ? void 0 : _a.destroy();
                    this.failLayer = undefined;
                    this.failButtons.length = 0;
                    const layer = UIKit_1.uiNode('TrunkOverflow', this.node, 750, this.height);
                    this.failLayer = layer;
                    const g = layer.addComponent(cc_1.Graphics);
                    UIKit_1.fill(g, new cc_1.Color(20, 12, 18, 176), -375, -this.height / 2, 750, this.height);
                    UIKit_1.fill(g, new cc_1.Color(61, 18, 26, 245), -300, -320, 600, 640, 34);
                    UIKit_1.fill(g, gold, -292, -312, 584, 624, 29);
                    UIKit_1.fill(g, new cc_1.Color(176, 34, 42), -284, -304, 568, 608, 24);
                    const title = UIKit_1.label(layer, 'OverflowTitle', this.isSedan ? '后备箱塞爆了' : `${this.vehicle.def.container}塞爆了`, 46, 0, 236);
                    title.color = gold;
                    const hint = UIKit_1.label(layer, 'OverflowHint', `${this.capacity} 格全满，还差一件同款年货`, 22, 0, 190);
                    hint.color = cream;
                    this.drawOverflowCar(layer);
                    const share = this.failButton(layer, 'share', '生成分享图', -180);
                    const restart = this.failButton(layer, 'restart', '重来', -262);
                    if (this.game.canRevive)
                        this.failButtons.push(this.failButton(layer, 'revive', '用道具复活一次 · 移出 3 件', -98));
                    else
                        UIKit_1.label(layer, 'ReviveUsed', '本局复活已用过', 22, 0, -98).color = cream;
                    this.failButtons.push(share, restart);
                    this.sounds.play('fail');
                    this.refreshFailButtons();
                }
                drawOverflowCar(parent) {
                    var _a, _b, _c;
                    (_a = parent.getChildByName('OverflowCar')) === null || _a === void 0 ? void 0 : _a.destroy();
                    const car = UIKit_1.uiNode('OverflowCar', parent, 290, 200);
                    car.setPosition(0, 45);
                    const fallbackNode = UIKit_1.uiNode('OverflowFrame', car, 290, 200);
                    const fallback = fallbackNode.addComponent(cc_1.Graphics);
                    UIKit_1.fill(fallback, new cc_1.Color(30, 14, 18, 80), -132, -88, 264, 166, 28);
                    UIKit_1.fill(fallback, new cc_1.Color(132, 30, 34), -129, -84, 258, 158, 26);
                    UIKit_1.fill(fallback, new cc_1.Color(22, 18, 23), -91, -49, 182, 87, 16);
                    const body = this.makeImageNode('OverflowBody', car);
                    if (!this.isSedan) {
                        fallbackNode.active = !this.vehicleFrame;
                        if (this.vehicleFrame) {
                            body.spriteFrame = this.vehicleFrame;
                            body.enabled = true;
                            const h = 196, w = h * this.vehicle.def.artSize.w / this.vehicle.def.artSize.h * ((_b = this.vehicle.def.stretchX) !== null && _b !== void 0 ? _b : 1);
                            body.node.getComponent(cc_1.UITransform).setContentSize(Math.min(290, w), h);
                            body.node.setPosition(0, -6);
                        }
                    }
                    else if (this.carFrames.body) {
                        body.spriteFrame = this.carFrames.body;
                        body.enabled = true;
                        body.node.getComponent(cc_1.UITransform).setContentSize(252, 158);
                        body.node.setPosition(0, -8);
                    }
                    const lid = this.makeImageNode('OverflowLid', car);
                    if (this.isSedan && this.carFrames.lid) {
                        lid.spriteFrame = this.carFrames.lid;
                        lid.enabled = true;
                        lid.node.getComponent(cc_1.UITransform).setContentSize(238, 76);
                        lid.node.setPosition(0, 54);
                        lid.node.angle = -7;
                    }
                    const items = this.level.items.slice(0, 3);
                    for (let index = 0; index < items.length; index++) {
                        const item = items[index];
                        const node = UIKit_1.uiNode(`OverflowItem-${index}`, car, 42, 42);
                        node.setPosition((index - 1) * 54, (_c = [58, 78, 52][index]) !== null && _c !== void 0 ? _c : 58);
                        node.angle = (index - 1) * 10;
                        const art = node.addComponent(cc_1.Graphics);
                        UIKit_1.fill(art, cream, -21, -21, 42, 42, 9);
                        art.strokeColor = gold;
                        art.lineWidth = 2;
                        art.roundRect(-20, -20, 40, 40, 8);
                        art.stroke();
                        const sprite = this.makeImageNode('Art', node);
                        sprite.node.getComponent(cc_1.UITransform).setContentSize(34, 34);
                        sprite.node.setPosition(0, 0);
                        const frame = this.itemFrames.get(item.key);
                        if (frame) {
                            sprite.spriteFrame = frame;
                            sprite.enabled = true;
                        }
                        else {
                            void OptionalResources_1.loadArt(`items/${item.key}`).then(loaded => {
                                if (!loaded || !node.isValid)
                                    return;
                                const cropped = cropItemFrame(item.key, loaded);
                                this.itemFrames.set(item.key, cropped);
                                sprite.spriteFrame = cropped;
                                sprite.enabled = true;
                                for (const candidate of this.cardViews.values())
                                    if (candidate.kind === item.key)
                                        this.showItemFrame(candidate, cropped);
                            });
                        }
                    }
                }
                failButton(parent, action, title, localY) {
                    const rect = { x: 150, y: this.height / 2 - localY - 35, w: 450, h: 70 };
                    const text = UIKit_1.label(parent, `Fail-${action}`, title, 29, 0, localY);
                    text.color = ink;
                    return { action, title, rect, label: text };
                }
                refreshFailButtons() {
                    var _a;
                    if (!((_a = this.failLayer) === null || _a === void 0 ? void 0 : _a.isValid))
                        return;
                    const g = this.failLayer.getComponent(cc_1.Graphics);
                    for (const button of this.failButtons) {
                        UIKit_1.fill(g, gold, button.rect.x - 375, this.height / 2 - button.rect.y - button.rect.h, button.rect.w, button.rect.h, 20);
                        g.strokeColor = new cc_1.Color(120, 52, 19);
                        g.lineWidth = 2;
                        g.roundRect(button.rect.x - 375 + 2, this.height / 2 - button.rect.y - button.rect.h + 2, button.rect.w - 4, button.rect.h - 4, 18);
                        g.stroke();
                    }
                }
                drawFailButtons() {
                    if (this.failLayer)
                        this.refreshFailButtons();
                }
                revive() {
                    var _a;
                    const moved = this.game.revive();
                    if (!moved.length)
                        return;
                    this.modal = undefined;
                    (_a = this.failLayer) === null || _a === void 0 ? void 0 : _a.destroy();
                    this.failLayer = undefined;
                    this.failButtons.length = 0;
                    this.sounds.play('prop');
                    this.refresh();
                }
                beginFinish(instant = false) {
                    var _a;
                    if (this.finish)
                        return;
                    this.busy = true;
                    this.sounds.play('win');
                    const elapsedMs = instant ? Math.max(Date.now() - this.startedAt, 60000) : Math.max(0, Date.now() - this.startedAt);
                    this.finishStarted = instant ? Date.now() - FinishTimeline_1.FINISH_DURATION : Date.now();
                    this.finish = new FinishTimeline_1.FinishPlayback(cue => {
                        if (cue.sound === 'trunk_slam')
                            this.sounds.play('pack');
                        else if (cue.sound === 'horn')
                            this.sounds.play('tap');
                        if (cue.vibration && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                            try {
                                navigator.vibrate(cue.vibration);
                            }
                            catch ( /* Optional vibration: silent. */_a) { /* Optional vibration: silent. */ }
                        }
                    });
                    if (this.route === 'daily')
                        stack_progress_1.markDailyDone(stack_progress_1.browserStorage());
                    const finale = this.route === stack_progress_1.ROAD_FINAL_STAGE;
                    const elapsedSecFinale = instant ? Math.round(elapsedMs / 1000) : Math.max(1, Math.round(elapsedMs / 1000));
                    if (finale) {
                        // Level 9 is the end of the road: the homecoming scene replaces the usual finish screen.
                        stack_progress_1.markHomeDone(stack_progress_1.browserStorage());
                        this.sounds.play('home');
                        this.finishStats = { elapsedSec: elapsedSecFinale, boxes: instant ? Math.floor(this.level.cards.length / 3) : this.game.clearedGroups };
                        this.finishView = new StackHomecomingView_1.StackHomecomingView(this.node, this.finishStats, action => {
                            if (action === 'share')
                                this.openShare(true);
                            else if (action === 'road')
                                this.onAction('first');
                            else
                                this.onAction('home');
                        });
                        this.finishView.layout(this.height);
                        this.finishView.render(instant ? this.finish.advance(FinishTimeline_1.FINISH_DURATION) : this.finish.state);
                        if (typeof window !== 'undefined' && rank_1.isDebugRun(window.location.search))
                            this.finishView.setRankStatus(rank_1.RANK_DEBUG_TEXT);
                        return;
                    }
                    const choices = this.route === 'daily'
                        ? [{ title: '今日已塞满 · 回首页', action: 'first' }, { title: '再来一次', action: 'replay' }]
                        : this.route === 1
                            ? [{ title: '下一关', action: 'next' }, { title: '再来一次', action: 'replay' }]
                            : [{ title: (_a = stack_progress_1.nextRouteTitle(this.route)) !== null && _a !== void 0 ? _a : '下一关', action: 'next' }, { title: '再来一次', action: 'replay' }];
                    const elapsedSec = instant ? Math.round(elapsedMs / 1000) : Math.max(1, Math.round(elapsedMs / 1000));
                    const totalBoxes = Math.floor(this.level.cards.length / 3);
                    this.finishStats = { elapsedSec, boxes: instant ? totalBoxes : this.game.clearedGroups };
                    this.finishView = new StackFinishView_1.StackFinishView(this.node, choices, this.finishStats, action => this.mapFinish(action), () => this.openShare(true), () => this.openRankPage(), this.vehicle.def.art ? {
                        art: this.vehicle.def.art,
                        w: this.vehicle.def.artSize.w,
                        h: this.vehicle.def.artSize.h,
                        stretchX: this.vehicle.def.stretchX,
                        region: this.vehicle.def.regions[0],
                    } : undefined);
                    this.finishView.layout(this.height);
                    this.finishView.render(instant ? this.finish.advance(FinishTimeline_1.FINISH_DURATION) : this.finish.state);
                    // Any ?debug=… run (win/fail/mom/…) is a test drive: it never reaches the leaderboard.
                    if (typeof window !== 'undefined' && rank_1.isDebugRun(window.location.search)) {
                        this.finishView.setRankStatus(rank_1.RANK_DEBUG_TEXT);
                        return;
                    }
                    // Only the first two levels count for the province board; the endless road and the daily board never report.
                    if (this.route === 2)
                        this.startRankReporting(elapsedMs);
                    else if (this.route === 1)
                        this.startStageOneReporting(elapsedMs);
                }
                startStageOneReporting(elapsedMs) {
                    if (!this.rankApi.enabled)
                        return;
                    const province = this.rankApi.province;
                    if (!province) {
                        this.provincePicker = new ProvincePicker_1.ProvincePicker(this.node, this.height, null, {
                            onSelect: selected => {
                                this.rankApi.setProvince(selected);
                                this.provincePicker = undefined;
                                void this.sendClear(1, selected, elapsedMs);
                            },
                            onCancel: () => { this.provincePicker = undefined; },
                        });
                        return;
                    }
                    void this.sendClear(1, province, elapsedMs);
                }
                startRankReporting(elapsedMs) {
                    var _a;
                    if (!this.rankApi.enabled) {
                        (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.setRankStatus(rank_1.formatContributionFailure());
                        return;
                    }
                    const province = this.rankApi.province;
                    if (!province) {
                        this.provincePicker = new ProvincePicker_1.ProvincePicker(this.node, this.height, null, {
                            onSelect: selected => {
                                this.rankApi.setProvince(selected);
                                this.provincePicker = undefined;
                                this.sendClear(2, selected, elapsedMs);
                            },
                            onCancel: () => {
                                var _a;
                                this.provincePicker = undefined;
                                (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.setRankStatus('未选择省份，排行未上报');
                            },
                        });
                        return;
                    }
                    this.sendClear(2, province, elapsedMs);
                }
                async sendClear(stage, province, ms) {
                    var _a, _b;
                    if (stage === 2)
                        (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.setRankStatus(rank_1.formatRankProgress(province));
                    let outcome;
                    try {
                        outcome = await this.rankApi.submitClear({
                            province,
                            stage,
                            ms,
                            sessionId: this.rankApi.deviceId,
                            boxes: this.game.clearedGroups,
                            momBoxes: this.game.momEventCount,
                        });
                    }
                    catch (_c) {
                        outcome = { ok: false, reason: 'network' };
                    }
                    if (!this.node.isValid || stage !== 2)
                        return;
                    if (outcome.ok)
                        this.lastProvinceRank = outcome.result.rank;
                    (_b = this.finishView) === null || _b === void 0 ? void 0 : _b.setRankStatus(outcome.ok ? rank_1.formatContributionResult(province, outcome.result) : rank_1.formatContributionFailure());
                }
                openRankPage() {
                    if (this.rankPage)
                        return;
                    this.rankPage = new RankPage_1.RankPage(this.node, this.height, () => {
                        var _a;
                        (_a = this.rankPage) === null || _a === void 0 ? void 0 : _a.node.destroy();
                        this.rankPage = undefined;
                    }, () => this.onAction('first'));
                }
                mapFinish(action) {
                    if (action === 'next')
                        this.onAction('next');
                    else if (action === 'first')
                        this.onAction('first');
                    else
                        this.onAction('replay');
                }
                openShare(victory) {
                    var _a, _b, _c, _d;
                    const result = victory
                        ? {
                            victory: true,
                            elapsedSec: (_b = (_a = this.finishStats) === null || _a === void 0 ? void 0 : _a.elapsedSec) !== null && _b !== void 0 ? _b : Math.max(1, Math.round((Date.now() - this.startedAt) / 1000)),
                            boxes: (_d = (_c = this.finishStats) === null || _c === void 0 ? void 0 : _c.boxes) !== null && _d !== void 0 ? _d : this.game.clearedGroups,
                        }
                        : { victory: false, remaining: this.game.pileRemaining };
                    const def = this.vehicle.def;
                    void StackShareImage_1.showStackShareImage({
                        stage: this.level.stage,
                        stageLabel: stack_progress_1.routeHeadline(this.route).stage,
                        result,
                        province: this.rankApi.province,
                        rank: victory ? this.lastProvinceRank : null,
                        counted: (this.route === 1 || this.route === 2) && !(typeof window !== 'undefined' && rank_1.isDebugRun(window.location.search)),
                        ending: victory && this.route === stack_progress_1.ROAD_FINAL_STAGE,
                        ride: {
                            name: this.vehicle.displayName,
                            art: def.art,
                            w: def.artSize.w,
                            h: def.artSize.h,
                            stretchX: def.stretchX,
                            region: def.regions[0],
                        },
                    });
                }
                onMomAdded(added) {
                    if (!added.length)
                        return;
                    this.sounds.play('mom');
                    this.refresh();
                    this.momLayer.active = true;
                    this.momBubble.string = '妈妈又塞了一件！';
                    if (this.momHideTimer)
                        clearTimeout(this.momHideTimer);
                    this.momHideTimer = setTimeout(() => { if (this.node.isValid)
                        this.momLayer.active = false; }, 2300);
                }
                debugClickable() {
                    const size = cc_1.view.getVisibleSize();
                    const screenWidth = typeof window === 'undefined' ? size.width : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? size.height : window.innerHeight;
                    return this.game.cards
                        .filter(card => this.game.canTap(card.id))
                        .sort((a, b) => b.layer - a.layer)
                        .map(card => {
                        const rect = stack_layout_1.mapStackRect(this.board, card);
                        const a = this.toScreen(rect.x, rect.y);
                        const b = this.toScreen(rect.x + rect.w, rect.y + rect.h);
                        void screenWidth;
                        void screenHeight;
                        return {
                            id: card.id,
                            kind: card.kind,
                            name: card.name,
                            screenX: (a.x + b.x) / 2,
                            screenY: (a.y + b.y) / 2,
                            screenLeft: a.x,
                            screenRight: b.x,
                            screenTop: a.y,
                            screenBottom: b.y,
                            screenW: b.x - a.x,
                            screenH: b.y - a.y,
                        };
                    });
                }
                debugActions() {
                    const screenWidth = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    return this.actions.map(action => ({
                        key: action.key,
                        used: this.game.props[action.key],
                        screenX: (action.rect.x + action.rect.w / 2) / 750 * screenWidth,
                        screenY: (action.rect.y + action.rect.h / 2) / this.height * screenHeight,
                    }));
                }
                debugLayout() {
                    const viewport = this.toScreen(750, this.height);
                    const origin = this.toScreen(0, 0);
                    const cards = this.game.cards.map(card => (Object.assign(Object.assign({}, card), stack_layout_1.mapStackRect(this.board, card))));
                    const bounds = stack_layout_1.stackCardBounds(cards);
                    const layout = this.isSedan ? stack_layout_1.createStackPageLayout(this.height, this.safeBottom, undefined, this.carScale) : stack_layout_1.createStackPageLayout(this.height, this.safeBottom, this.artRect.y);
                    const topLeft = this.toScreen(bounds.left, bounds.top);
                    const bottomRight = this.toScreen(bounds.right, bounds.bottom);
                    const lidTop = this.isSedan ? this.carRect.y - 75 * this.carScale : this.artRect.y;
                    const actionsBottom = this.actionY + this.actionH;
                    return {
                        viewport: { width: typeof window === 'undefined' ? 750 : window.innerWidth, height: typeof window === 'undefined' ? this.height : window.innerHeight },
                        canvas: { left: origin.x, top: origin.y, right: viewport.x, bottom: viewport.y },
                        boardScale: this.board.scale,
                        cardSize: {
                            width: this.level.cardW * this.board.scale * origin.k,
                            height: this.level.cardH * this.board.scale * origin.k,
                        },
                        cardBounds: { left: topLeft.x, right: bottomRight.x, top: topLeft.y, bottom: bottomRight.y },
                        hudBottom: this.toScreen(0, layout.stackTop).y,
                        trunkTop: this.toScreen(0, this.trunk.y).y,
                        lidTop: this.toScreen(0, lidTop).y,
                        carTop: this.toScreen(0, this.isSedan ? this.carRect.y : this.artRect.y).y,
                        vehicle: { key: this.vehicle.def.key, name: this.vehicle.displayName, capacity: this.capacity, label: this.slotTitle.string },
                        actionsTop: this.toScreen(0, this.actionY).y,
                        reserveBounds: (() => {
                            const size = Math.round(this.level.cardW * .72);
                            const rects = this.level.reservePositions.map(p => stack_layout_1.mapStackRect(this.board, { x: p.x, y: p.y, w: size, h: size }));
                            const a = this.toScreen(Math.min(...rects.map(r => r.x)), Math.min(...rects.map(r => r.y)));
                            const b = this.toScreen(Math.max(...rects.map(r => r.x + r.w)), Math.max(...rects.map(r => r.y + r.h)));
                            return { left: a.x, top: a.y, right: b.x, bottom: b.y };
                        })(),
                        slotCells: this.slotRects.map(r => {
                            const a = this.toScreen(r.x, r.y), b = this.toScreen(r.x + r.w, r.y + r.h);
                            return { left: a.x, top: a.y, right: b.x, bottom: b.y };
                        }),
                        actionsBottom: this.toScreen(0, actionsBottom).y,
                        safeBottom: this.safeBottom * origin.k,
                        stackRegion: {
                            top: this.toScreen(0, layout.stackTop).y,
                            bottom: this.toScreen(0, layout.stackBottom).y,
                            ratio: layout.stackRatio,
                        },
                        sideCounts: {
                            left: cards.filter(card => card.source === 'side-left').length,
                            right: cards.filter(card => card.source === 'side-right').length,
                        },
                    };
                }
                debugState() {
                    var _a, _b;
                    const kindCounts = {};
                    for (const card of this.game.cards)
                        kindCounts[card.kind] = ((_a = kindCounts[card.kind]) !== null && _a !== void 0 ? _a : 0) + 1;
                    return {
                        stage: this.level.stage,
                        finale: this.finishView instanceof StackHomecomingView_1.StackHomecomingView,
                        route: this.route,
                        headline: stack_progress_1.routeHeadline(this.route),
                        capacity: this.capacity,
                        hideCovered: this.hideCovered,
                        cartonCards: this.game.cards.filter(card => card.carton).length,
                        cartonBacks: [...this.cardViews.values()].filter(view => view.node.active && view.back.node.active).length,
                        status: this.game.status,
                        remaining: this.game.pileRemaining,
                        pileRemaining: this.game.pileRemaining,
                        totalRemaining: this.game.remaining,
                        modal: (_b = this.modal) !== null && _b !== void 0 ? _b : null,
                        busy: this.busy,
                        finishing: !!this.finish,
                        momEvents: this.game.momEventCount,
                        momVisible: this.momLayer.active,
                        soundEnabled: this.sounds.enabled,
                        slot: this.game.slot.map(card => ({ id: card.id, kind: card.kind, name: card.name })),
                        props: this.game.props,
                        kindCounts,
                        clickable: this.debugClickable(),
                        province: this.rankApi.province,
                        overlay: this.rankPage ? 'rank' : this.provincePicker ? 'province' : null,
                    };
                }
                debugFinishButtons() {
                    if (!this.finishView)
                        return [];
                    const screenWidth = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    return this.finishView.buttonPoints().map(button => (Object.assign(Object.assign({}, this.debugRect(button.action, button.rect, screenWidth, screenHeight)), { title: button.title })));
                }
                debugModalButtons() {
                    if (this.modal !== 'fail')
                        return [];
                    const screenWidth = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    return this.failButtons.map(button => this.debugRect(button.action, button.rect, screenWidth, screenHeight));
                }
                debugRect(action, rect, screenWidth, screenHeight) {
                    return {
                        action,
                        screenX: (rect.x + rect.w / 2) / 750 * screenWidth,
                        screenY: (rect.y + rect.h / 2) / this.height * screenHeight,
                        screenLeft: rect.x / 750 * screenWidth,
                        screenRight: (rect.x + rect.w) / 750 * screenWidth,
                        screenTop: rect.y / this.height * screenHeight,
                        screenBottom: (rect.y + rect.h) / this.height * screenHeight,
                        screenW: rect.w / 750 * screenWidth,
                        screenH: rect.h / this.height * screenHeight,
                    };
                }
            };
            exports_1("StackPage", StackPage);
            safeProbe = null;
        }
    };
});

System.register("chunks:///_virtual/StagePage.ts", ["cc","./brand.ts","./items.ts","./StageSession.ts","./DragController.ts","./InteractionGeometry.ts","./SoundEffects.ts","./OptionalResources.ts","./UIKit.ts","./FinishTimeline.ts","./FinishView.ts","./StageArt.ts","./ItemArt.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, brand_1, items_1, StageSession_1, DragController_1, InteractionGeometry_1, SoundEffects_1, OptionalResources_1, UIKit_1, FinishTimeline_1, FinishView_1, StageArt_1, ItemArt_1, ink, red, cream, gold, green, invalid, shadow, BODY_SIZE, BODY_HOLE, BODY_SLICE, BODY_PLATE_Y, BODY_SEAL_Y, MOM_INTRO_MS, MOM_APPEAR_MS, MOM_STAY_MS, ITEM_OVERSCAN, StagePage;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (items_1_1) {
                items_1 = items_1_1;
            },
            function (StageSession_1_1) {
                StageSession_1 = StageSession_1_1;
            },
            function (DragController_1_1) {
                DragController_1 = DragController_1_1;
            },
            function (InteractionGeometry_1_1) {
                InteractionGeometry_1 = InteractionGeometry_1_1;
            },
            function (SoundEffects_1_1) {
                SoundEffects_1 = SoundEffects_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            },
            function (FinishTimeline_1_1) {
                FinishTimeline_1 = FinishTimeline_1_1;
            },
            function (FinishView_1_1) {
                FinishView_1 = FinishView_1_1;
            },
            function (StageArt_1_1) {
                StageArt_1 = StageArt_1_1;
            },
            function (ItemArt_1_1) {
                ItemArt_1 = ItemArt_1_1;
            }
        ],
        execute: function () {
            ink = new cc_1.Color(74, 44, 26), red = new cc_1.Color(215, 51, 43), cream = new cc_1.Color(255, 246, 229);
            gold = new cc_1.Color(246, 195, 67);
            green = new cc_1.Color(76, 175, 80, 128), invalid = new cc_1.Color(229, 57, 53, 128);
            shadow = new cc_1.Color(40, 20, 10, 70);
            // Measured on art/vehicles/sedan_v1_body.png (1024×640).
            BODY_SIZE = { w: 1024, h: 640 };
            BODY_HOLE = { left: 159, right: 878, top: 104, bottom: 425 };
            BODY_SLICE = { top: 150, bottom: 380 };
            BODY_PLATE_Y = 498, BODY_SEAL_Y = 72;
            MOM_INTRO_MS = 3800, MOM_APPEAR_MS = 700, MOM_STAY_MS = 1300;
            ITEM_OVERSCAN = 1.025;
            StagePage = class StagePage {
                constructor(parent, level, now, onClear) {
                    var _a;
                    this.level = level;
                    this.now = now;
                    this.onClear = onClear;
                    this.sceneFrames = {};
                    this.itemFrames = new Map();
                    this.pieces = new Map();
                    this.drag = new DragController_1.DragController();
                    this.buttons = [];
                    this.slots = [];
                    this.board = { x: 0, y: 0, w: 0, h: 0 };
                    this.tray = { x: 24, y: 880, w: 702, h: 270 };
                    this.car = { x: 0, y: 0, w: 0, h: 0 };
                    this.trunk = { x: 0, y: 0, w: 0, h: 0 };
                    this.buttonY = 1170;
                    this.buttonH = 120;
                    this.cell = 0;
                    this.trayCell = 0;
                    this.trayScrollX = 0;
                    this.trayScrollMax = 0;
                    this.trayContentWidth = 0;
                    this.width = 750;
                    this.height = 1334;
                    this.cleared = false;
                    this.finishStarted = 0;
                    this.displayedSeconds = -1;
                    this.layoutWidth = -1;
                    this.layoutHeight = -1;
                    this.browserWidth = -1;
                    this.browserHeight = -1;
                    this.previewX = NaN;
                    this.previewY = NaN;
                    this.previewRotation = 0;
                    this.candidate = { pieceId: 0, x: 0, y: 0, rotation: 0 };
                    this.touchWorld = new cc_1.Vec3();
                    this.touchLocal = new cc_1.Vec3();
                    this.touchPoint = { x: 0, y: 0 };
                    this.landscape = false;
                    this.momIntroUntil = 0;
                    this.guideStarted = 0;
                    this.guideDismissed = false;
                    this.onHide = () => this.cancelDrag();
                    this.node = UIKit_1.uiNode('StagePage', parent, 750, 1334);
                    this.allPieces = [...level.pieces, ...(level.mode === 'mom' ? ((_a = level.extras) !== null && _a !== void 0 ? _a : []).flat() : [])];
                    this.session = new StageSession_1.StageSession(level, now);
                    this.sounds = new SoundEffects_1.SoundEffects(parent);
                    this.backdrop = UIKit_1.uiNode('Backdrop', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.bgImage = this.imageNode('BackdropImage');
                    this.bodyImage = this.imageNode('CarBodyImage');
                    this.background = UIKit_1.uiNode('GridBackground', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.trayEmpty = UIKit_1.uiNode('TrayEmptyState', this.node, 750, 1334);
                    this.trayEmptyArt = this.trayEmpty.addComponent(cc_1.Graphics);
                    this.trayEmptyTitle = UIKit_1.label(this.trayEmpty, 'TrayEmptyTitle', '已全部装车', 34, 0, 0);
                    this.trayEmptyTitle.color = cream;
                    this.trayEmptyHint = UIKit_1.label(this.trayEmpty, 'TrayEmptyHint', '福气满箱 · 准备出发', 21, 0, 0);
                    this.trayEmptyHint.color = gold;
                    this.trayEmpty.active = false;
                    this.trunkImage = this.imageNode('TrunkFloorImage');
                    this.floorMarks = UIKit_1.uiNode('TrunkFloorMarks', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    for (const [file, slot] of [['ui/bg_night', 'bg'], ['vehicles/sedan_v1_body', 'body'], ['vehicles/sedan_v1_trunk', 'trunk']])
                        void OptionalResources_1.loadArt(file).then(frame => {
                            if (!frame || !this.node.isValid)
                                return;
                            this.sceneFrames[slot] = frame;
                            if (this.height)
                                this.drawBackground();
                        });
                    const look = StageArt_1.vehicleLook(level.vehicle);
                    this.clock = UIKit_1.label(this.node, 'Clock', '', 28, 0, 0);
                    this.clock.color = gold;
                    this.packed = UIKit_1.label(this.node, 'Packed', '', 26, 0, 0);
                    this.packed.color = gold;
                    this.notice = UIKit_1.label(this.node, 'Notice', '', 24, 0, 0);
                    this.notice.color = gold;
                    this.momIntroBubble = UIKit_1.uiNode('MomIntroBubble', this.node, 470, 110);
                    this.momIntroBubble.active = false;
                    this.drawMomIntroBubble(this.momIntroBubble.addComponent(cc_1.Graphics));
                    this.momIntro = UIKit_1.label(this.node, 'MomIntro', '妈妈说：再带点东西！', 28, 0, 0);
                    this.momIntro.color = red;
                    this.momIntro.node.active = false;
                    this.momIntroUntil = level.mode === 'mom' ? now() + MOM_INTRO_MS : 0;
                    this.title = UIKit_1.label(this.node, 'Title', brand_1.GAME_TITLE, 54, 0, 0);
                    this.title.color = gold;
                    this.vehicle = UIKit_1.label(this.node, 'Vehicle', `第 ${level.stage} 关 · ${look.name}后备箱`, 27, 0, 0);
                    this.vehicle.color = cream;
                    this.plate = UIKit_1.label(this.node, 'Plate', '回家', 24, 0, 0);
                    this.plate.color = gold;
                    this.lidSeal = UIKit_1.label(this.node, 'TrunkLidSeal', '福', 30, 0, 0);
                    this.lidSeal.color = gold;
                    this.preview = UIKit_1.uiNode('DropPreview', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    for (const piece of this.allPieces) {
                        const node = UIKit_1.uiNode(`Piece${piece.id}`, this.node, 1, 1);
                        const graphics = UIKit_1.uiNode(`Fallback${piece.id}`, node, 1, 1).addComponent(cc_1.Graphics);
                        const shadowSprite = UIKit_1.uiNode(`Shadow${piece.id}`, node, 1, 1).addComponent(cc_1.Sprite);
                        shadowSprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                        shadowSprite.trim = false;
                        shadowSprite.enabled = false;
                        const sprite = UIKit_1.uiNode(`Sprite${piece.id}`, node, 1, 1).addComponent(cc_1.Sprite);
                        sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                        sprite.trim = false;
                        sprite.enabled = false;
                        const featureNode = UIKit_1.uiNode(`Feature${piece.id}`, node, 1, 1);
                        const feature = featureNode.addComponent(cc_1.Graphics);
                        const title = UIKit_1.label(node, `Item${piece.id}`, StageArt_1.itemShortName(piece), 18, 0, 0);
                        this.pieces.set(piece.id, { node, sprite, shadow: shadowSprite, graphics, featureNode, feature, title, held: false, failed: false, rect: { x: 0, y: 0, w: 0, h: 0 }, rotation: 0, size: 0 });
                    }
                    this.controls = UIKit_1.uiNode('Controls', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.button('旋转 90°', 45, 180, () => this.rotateSelected(), true);
                    this.button('撤销', 295, 160, () => { this.cancelDrag(); this.session.undo(); this.sounds.play('undo'); this.selected = undefined; this.sync(); });
                    this.button('重开', 515, 160, () => { this.cancelDrag(); this.modal = 'restart'; this.updateOverlay(); });
                    this.momLayer = UIKit_1.uiNode('MomAppear', this.node, 750, 1334);
                    this.momLayer.active = false;
                    const bubble = UIKit_1.uiNode('MomBubble', this.momLayer, 430, 104);
                    this.momBubbleNode = bubble;
                    UIKit_1.fill(bubble.addComponent(cc_1.Graphics), cream, -215, -52, 430, 104, 26);
                    this.momBubble = UIKit_1.label(bubble, 'MomBubbleText', '等等！还有这个！', 30, 0, 0);
                    this.momBubble.color = ink;
                    this.momAvatar = UIKit_1.uiNode('MomAvatar', this.momLayer, 180, 180);
                    const momFallback = this.momAvatar.addComponent(cc_1.Graphics);
                    UIKit_1.fill(momFallback, red, -78, -78, 156, 156, 78);
                    const momFallbackText = UIKit_1.label(this.momAvatar, 'MomFallbackText', '妈', 72, 0, 0);
                    momFallbackText.color = cream;
                    const momImage = UIKit_1.uiNode('MomImage', this.momAvatar, 170, 170).addComponent(cc_1.Sprite);
                    momImage.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    momImage.trim = false;
                    momImage.enabled = false;
                    if (level.mode === 'mom')
                        void OptionalResources_1.loadArt('ui/mom').then(frame => {
                            if (!frame || !this.node.isValid)
                                return;
                            momImage.spriteFrame = frame;
                            momImage.enabled = true;
                            momFallback.enabled = false;
                            momFallbackText.node.active = false;
                        });
                    this.overlay = UIKit_1.uiNode('InteractionOverlay', this.node, 750, 1334);
                    this.overlay.addComponent(cc_1.Graphics);
                    this.overlayText = UIKit_1.label(this.overlay, 'Prompt', '', 38, 0, 50);
                    this.guideNode = UIKit_1.uiNode('FirstLevelGuide', this.node, 750, 1334);
                    this.guideNode.active = false;
                    this.guideArt = this.guideNode.addComponent(cc_1.Graphics);
                    this.guideHand = UIKit_1.uiNode('GuideHand', this.guideNode, 96, 112);
                    this.drawGuideHand(this.guideHand.addComponent(cc_1.Graphics));
                    this.node.on(cc_1.Node.EventType.TOUCH_START, this.start, this);
                    this.node.on(cc_1.Node.EventType.TOUCH_MOVE, this.move, this);
                    this.node.on(cc_1.Node.EventType.TOUCH_END, this.end, this);
                    this.node.on(cc_1.Node.EventType.TOUCH_CANCEL, this.cancel, this);
                    cc_1.game.on(cc_1.Game.EVENT_HIDE, this.onHide);
                    if (typeof document !== 'undefined') {
                        this.safeProbe = document.createElement('div');
                        this.safeProbe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)';
                        document.body.appendChild(this.safeProbe);
                    }
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => {
                        var _a;
                        cc_1.game.off(cc_1.Game.EVENT_HIDE, this.onHide);
                        (_a = this.safeProbe) === null || _a === void 0 ? void 0 : _a.remove();
                    });
                    this.tick();
                }
                tick() {
                    const size = cc_1.view.getVisibleSize();
                    const browserWidth = typeof window !== 'undefined' ? window.innerWidth : size.width;
                    const browserHeight = typeof window !== 'undefined' ? window.innerHeight : size.height;
                    if (size.width !== this.layoutWidth || size.height !== this.layoutHeight ||
                        browserWidth !== this.browserWidth || browserHeight !== this.browserHeight) {
                        this.cancelDrag();
                        this.layoutWidth = size.width;
                        this.layoutHeight = size.height;
                        this.browserWidth = browserWidth;
                        this.browserHeight = browserHeight;
                        this.landscape = browserWidth > browserHeight;
                        const safe = cc_1.sys.getSafeAreaRect(false);
                        this.height = Math.max(1334, size.height / size.width * 750);
                        {
                            const k = Math.min(size.width / 750, size.height / this.height);
                            this.node.setScale(k, k, 1);
                        }
                        this.node.getComponent(cc_1.UITransform).setContentSize(750, this.height);
                        let top = Math.max(0, (size.height - safe.y - safe.height) / size.height * this.height);
                        let bottom = Math.max(0, safe.y / size.height * this.height);
                        if (this.safeProbe) {
                            const css = window.getComputedStyle(this.safeProbe);
                            const ratio = 750 / browserWidth;
                            top = Math.max(top, (parseFloat(css.paddingTop) || 0) * ratio);
                            bottom = Math.max(bottom, (parseFloat(css.paddingBottom) || 0) * ratio);
                        }
                        this.layout(top, bottom);
                    }
                    if (this.finish) {
                        this.finishView.render(this.finish.advance(this.now() - this.finishStarted));
                        return;
                    }
                    if (this.canShowGuide()) {
                        if (!this.guidePlacement)
                            this.prepareGuideRoute();
                        this.updateGuide();
                    }
                    else {
                        this.guideNode.active = false;
                    }
                    const showIntro = this.level.mode === 'mom' && !this.mom && this.now() < this.momIntroUntil;
                    this.momIntro.node.active = showIntro;
                    this.momIntroBubble.active = showIntro;
                    if (this.mom)
                        this.updateMomSequence();
                    else if (this.session.readyForNextBatch && !this.cleared)
                        this.startMomSequence();
                    const seconds = this.session.remainingSeconds;
                    if (seconds !== this.displayedSeconds) {
                        if (this.displayedSeconds >= 0 && seconds > 0 && seconds <= 10)
                            this.sounds.play('tick');
                        this.displayedSeconds = seconds;
                        this.clock.string = Number.isFinite(seconds) ? `距出发 ${seconds} 秒` : '慢慢装，不限时';
                        this.clock.color = seconds <= 10 ? new cc_1.Color(255, 224, 158) : gold;
                    }
                    if (this.session.expired && !this.cleared && this.modal !== 'timeout') {
                        this.cancelDrag();
                        this.modal = 'timeout';
                        this.updateOverlay();
                    }
                }
                layout(top, bottom) {
                    var _a;
                    const frame = StageArt_1.computeStageLayout(this.level, this.height, top, bottom);
                    this.cell = frame.cell;
                    this.board = frame.board;
                    this.tray = frame.tray;
                    this.car = frame.car;
                    this.trunk = frame.trunk;
                    this.buttonY = frame.buttonY;
                    this.buttonH = frame.buttonH;
                    this.layoutTray();
                    this.placeLabel('Title', 64 + top);
                    this.placeLabel('Vehicle', 116 + top);
                    this.placeLabel('MomIntro', 281 + top);
                    this.momIntroBubble.setPosition(0, this.height / 2 - 281 - top);
                    this.placeLabel('Clock', 187 + top, 190);
                    this.placeLabel('Packed', 187 + top, -180);
                    this.placeLabel('Notice', frame.noticeY);
                    this.placeLabel('Plate', this.car.y + this.car.h - 98);
                    this.placeLabel('TrunkLidSeal', this.car.y + 51);
                    this.momBubbleNode.setPosition(-75, this.height / 2 - 735);
                    this.momAvatar.setPosition(300, this.height / 2 - 795);
                    for (const [i, button] of this.buttons.entries()) {
                        button.rect.y = this.buttonY;
                        button.rect.h = this.buttonH;
                        this.placeLabel(`Button${i}`, button.rect.y + 58, button.rect.x + button.rect.w / 2 - 375);
                    }
                    this.drawBackground();
                    this.sync();
                    this.updateOverlay();
                    this.guidePlacement = undefined;
                    this.guideFrom = undefined;
                    this.guideTo = undefined;
                    if (this.guideNode)
                        this.prepareGuideRoute();
                    (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.layout(this.height, this.board);
                }
                placeLabel(name, y, x = 0) { this.node.getChildByName(name).setPosition(x, this.height / 2 - y); }
                rect(g, r, color) { UIKit_1.fill(g, color, r.x - 375, this.height / 2 - r.y - r.h, r.w, r.h, 6); }
                imageNode(name) {
                    const sprite = UIKit_1.uiNode(name, this.node, 1, 1).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    return sprite;
                }
                drawBackground() {
                    const g = this.background;
                    g.clear();
                    this.backdrop.clear();
                    this.floorMarks.clear();
                    const look = StageArt_1.vehicleLook(this.level.vehicle);
                    const { bg, body, trunk } = this.sceneFrames;
                    // Painted backdrop covers the screen (cropping the sides on tall phones); code art is the fallback.
                    if (bg) {
                        const scale = Math.max(1, this.height / 1334);
                        this.showImage(this.bgImage, bg, 375, this.height / 2, 750 * scale, 1334 * scale);
                    }
                    else
                        StageArt_1.drawStageBackdrop(this.backdrop, 750, this.height, 0, look);
                    if (body)
                        this.drawCarBody(body);
                    else
                        StageArt_1.drawCarRear(g, 750, this.height, 0, this.car, this.trunk, look);
                    if (trunk) {
                        this.rect(g, this.trunk, new cc_1.Color(28, 22, 24));
                        this.showImage(this.trunkImage, trunk, this.trunk.x + this.trunk.w / 2, this.trunk.y + this.trunk.h / 2, this.trunk.w, this.trunk.h);
                        StageArt_1.drawTrunkGrid(this.floorMarks, 750, this.height, 0, this.board, this.level, this.cell);
                    }
                    else
                        StageArt_1.drawTrunkFloor(g, 750, this.height, 0, this.trunk, this.board, this.level, this.cell);
                    StageArt_1.drawStageChrome(g, 750, this.height, 0, this.board, this.tray, this.tray.y - 20, look);
                }
                showImage(sprite, frame, cx, cy, w, h) {
                    sprite.spriteFrame = frame;
                    sprite.enabled = true;
                    sprite.node.getComponent(cc_1.UITransform).setContentSize(w, h);
                    sprite.node.setPosition(cx - 375, this.height / 2 - cy);
                }
                // The car-rear painting has a transparent trunk opening (BODY_HOLE). It is scaled so the opening
                // matches the trunk rect; only the plain pillar band between the slanted top and the tail lights stretches.
                drawCarBody(frame) {
                    const s = this.trunk.w / (BODY_HOLE.right - BODY_HOLE.left);
                    frame.insetTop = BODY_SLICE.top;
                    frame.insetBottom = BODY_SLICE.bottom;
                    frame.insetLeft = 0;
                    frame.insetRight = 0;
                    const sprite = this.bodyImage;
                    sprite.type = cc_1.Sprite.Type.SLICED;
                    const h = this.trunk.h / s + BODY_HOLE.top + (BODY_SIZE.h - BODY_HOLE.bottom);
                    const left = this.trunk.x - BODY_HOLE.left * s, top = this.trunk.y - BODY_HOLE.top * s;
                    this.showImage(sprite, frame, left + BODY_SIZE.w * s / 2, top + h * s / 2, BODY_SIZE.w, h);
                    sprite.node.setScale(s, s, 1);
                    this.placeLabel('Plate', this.trunk.y + this.trunk.h + (BODY_PLATE_Y - BODY_HOLE.bottom) * s);
                    this.placeLabel('TrunkLidSeal', this.trunk.y - (BODY_HOLE.top - BODY_SEAL_Y) * s);
                    this.lidSeal.color = new cc_1.Color(150, 28, 32);
                    this.plate.color = new cc_1.Color(150, 28, 32);
                }
                drawMomIntroBubble(g) {
                    UIKit_1.fill(g, new cc_1.Color(255, 205, 114), -207, -39, 414, 86, 24);
                    UIKit_1.fill(g, new cc_1.Color(255, 246, 229), -201, -33, 402, 74, 19);
                    UIKit_1.fill(g, new cc_1.Color(255, 226, 190), -189, -23, 378, 54, 14);
                    g.fillColor = new cc_1.Color(255, 246, 229);
                    g.moveTo(-12, -39);
                    g.lineTo(20, -39);
                    g.lineTo(2, -62);
                    g.close();
                    g.fill();
                }
                canShowGuide() {
                    return this.level.stage === 1 && this.level.mode !== 'mom' && !this.guideDismissed &&
                        !this.cleared && !this.finish && !this.modal;
                }
                prepareGuideRoute() {
                    this.guideNode.active = false;
                    if (!this.canShowGuide())
                        return;
                    const piece = this.remainingPieces()[0];
                    if (!piece)
                        return;
                    const view = this.pieces.get(piece.id);
                    if (!view.node.active || !view.rect.w || !view.rect.h)
                        return;
                    const placement = this.findGuidePlacement(piece);
                    if (!placement)
                        return;
                    const box = InteractionGeometry_1.dimensions(piece, placement.rotation);
                    this.guidePlacement = placement;
                    this.guideFrom = { x: view.rect.x + view.rect.w / 2, y: view.rect.y + view.rect.h / 2 };
                    this.guideTo = { x: this.board.x + (placement.x + box.w / 2) * this.cell,
                        y: this.board.y + (placement.y + box.h / 2) * this.cell };
                    this.guideStarted = this.now();
                    this.guideNode.active = true;
                    this.drawGuideMarker(piece, placement);
                    this.updateGuide();
                }
                findGuidePlacement(piece) {
                    const preferred = this.session.rotationFor(piece.id);
                    const rotations = [preferred, 0, 1, 2];
                    const seen = new Set();
                    let best, bestScore = Infinity;
                    for (const rotation of rotations) {
                        if (seen.has(rotation))
                            continue;
                        seen.add(rotation);
                        const box = InteractionGeometry_1.dimensions(piece, rotation);
                        for (let y = 0; y <= this.level.height - box.h; y++)
                            for (let x = 0; x <= this.level.width - box.w; x++) {
                                const placement = { pieceId: piece.id, x, y, rotation };
                                if (!this.session.canDrop(placement))
                                    continue;
                                const score = (rotation === preferred ? 0 : 1000) + Math.abs(x + box.w / 2 - this.level.width / 2) + y * 2;
                                if (score < bestScore) {
                                    best = placement;
                                    bestScore = score;
                                }
                            }
                    }
                    return best;
                }
                updateGuide() {
                    if (!this.guideNode.active || !this.guideFrom || !this.guideTo)
                        return;
                    const travel = 1100, dwell = 320, total = (travel + dwell) * 2;
                    const elapsed = Math.max(0, this.now() - this.guideStarted) % total;
                    let progress = 0;
                    if (elapsed < travel)
                        progress = elapsed / travel;
                    else if (elapsed < travel + dwell)
                        progress = 1;
                    else if (elapsed < travel * 2 + dwell)
                        progress = 1 - (elapsed - travel - dwell) / travel;
                    const eased = progress * progress * (3 - 2 * progress);
                    const x = this.guideFrom.x + (this.guideTo.x - this.guideFrom.x) * eased;
                    const y = this.guideFrom.y + (this.guideTo.y - this.guideFrom.y) * eased;
                    const bob = Math.sin(elapsed / total * Math.PI * 4) * 2.5;
                    this.guideHand.setPosition(x - 375, this.height / 2 - y + bob);
                }
                drawGuideMarker(piece, placement) {
                    const g = this.guideArt;
                    g.clear();
                    const box = InteractionGeometry_1.dimensions(piece, placement.rotation);
                    const left = this.board.x + placement.x * this.cell - 375;
                    const right = left + box.w * this.cell;
                    const top = this.height / 2 - (this.board.y + placement.y * this.cell);
                    const bottom = top - box.h * this.cell;
                    const corner = Math.min(22, this.cell * .34);
                    g.strokeColor = new cc_1.Color(246, 195, 67, 220);
                    g.lineWidth = 3;
                    g.moveTo(left, top - corner);
                    g.lineTo(left, top);
                    g.lineTo(left + corner, top);
                    g.moveTo(right - corner, top);
                    g.lineTo(right, top);
                    g.lineTo(right, top - corner);
                    g.moveTo(left, bottom + corner);
                    g.lineTo(left, bottom);
                    g.lineTo(left + corner, bottom);
                    g.moveTo(right - corner, bottom);
                    g.lineTo(right, bottom);
                    g.lineTo(right, bottom + corner);
                    g.stroke();
                    const cx = (left + right) / 2, cy = (top + bottom) / 2;
                    g.fillColor = new cc_1.Color(255, 246, 229, 190);
                    g.circle(cx, cy, 8);
                    g.fill();
                    g.strokeColor = new cc_1.Color(215, 51, 43, 170);
                    g.lineWidth = 2;
                    g.circle(cx, cy, 12);
                    g.stroke();
                }
                drawGuideHand(g) {
                    const outline = new cc_1.Color(112, 28, 31, 235), fingertip = new cc_1.Color(255, 243, 214);
                    UIKit_1.fill(g, new cc_1.Color(40, 20, 10, 65), -9, -94, 57, 80, 23);
                    UIKit_1.fill(g, outline, -11, -49, 22, 52, 11);
                    UIKit_1.fill(g, fingertip, -7, -45, 14, 45, 7);
                    UIKit_1.fill(g, outline, 0, -75, 48, 51, 22);
                    UIKit_1.fill(g, cream, 4, -71, 40, 43, 19);
                    UIKit_1.fill(g, outline, -4, -56, 23, 24, 12);
                    UIKit_1.fill(g, cream, -1, -53, 17, 18, 9);
                    UIKit_1.fill(g, outline, 7, -94, 40, 24, 10);
                    UIKit_1.fill(g, new cc_1.Color(184, 40, 42), 10, -91, 34, 18, 7);
                    UIKit_1.fill(g, gold, 12, -81, 30, 3, 2);
                    UIKit_1.fill(g, new cc_1.Color(255, 255, 255, 90), -4, -40, 7, 26, 4);
                    UIKit_1.fill(g, new cc_1.Color(246, 195, 67, 205), -18, -71, 5, 5, 3);
                    UIKit_1.fill(g, new cc_1.Color(246, 195, 67, 175), 35, -51, 4, 4, 2);
                    UIKit_1.fill(g, new cc_1.Color(215, 51, 43, 175), 28, -99, 4, 4, 2);
                }
                dismissGuide() {
                    if (this.guideDismissed)
                        return;
                    this.guideDismissed = true;
                    this.guideNode.active = false;
                    this.guidePlacement = undefined;
                    this.guideFrom = undefined;
                    this.guideTo = undefined;
                }
                button(text, x, w, action, duringDrag = false) {
                    const index = this.buttons.length;
                    this.buttons.push({ rect: { x, y: this.buttonY, w, h: this.buttonH }, action, duringDrag });
                    return UIKit_1.label(this.node, `Button${index}`, text, 28, 0, 0);
                }
                updateControls() {
                    var _a, _b;
                    this.controls.clear();
                    for (const [i, b] of this.buttons.entries()) {
                        const active = i === 0 && !!this.selected;
                        this.rect(this.controls, { x: b.rect.x + 3, y: b.rect.y + 6, w: b.rect.w, h: b.rect.h }, new cc_1.Color(34, 15, 21, 180));
                        this.rect(this.controls, b.rect, gold);
                        this.rect(this.controls, { x: b.rect.x + 4, y: b.rect.y + 4, w: b.rect.w - 8, h: b.rect.h - 8 }, active ? new cc_1.Color(239, 181, 62) : new cc_1.Color(184, 40, 42));
                        const content = StageArt_1.controlContentLayout(b.rect), cy = this.height / 2 - (b.rect.y + b.rect.h / 2);
                        this.drawControlIcon(this.controls, i, content.iconX - 375, cy, active ? ink : gold);
                        const text = this.node.getChildByName(`Button${i}`);
                        text === null || text === void 0 ? void 0 : text.setPosition(content.textX - 375, cy);
                    }
                    const rotateTitle = (_a = this.node.getChildByName('Button0')) === null || _a === void 0 ? void 0 : _a.getComponent(cc_1.Label);
                    if (rotateTitle)
                        rotateTitle.color = this.selected ? ink : gold;
                    for (let i = 1; i < this.buttons.length; i++) {
                        const text = (_b = this.node.getChildByName(`Button${i}`)) === null || _b === void 0 ? void 0 : _b.getComponent(cc_1.Label);
                        if (text)
                            text.color = cream;
                    }
                    this.notice.string = this.selected ? `已选中 · ${items_1.itemMeta(this.selected).name}` :
                        this.trayScrollMax > 0 ? '轻点年货选中 · 拖进后备箱 · 托盘左右滑动' : '轻点年货选中 · 拖进后备箱';
                    const total = this.level.mode === 'mom' ? this.session.totalPieces : this.session.pieces.length;
                    this.packed.string = `已装车 ${this.session.placements.length} / ${total} 件`;
                    if (this.trayScrollMax > 0) {
                        const trackW = this.tray.w - 40, trackY = this.height / 2 - (this.tray.y + this.tray.h - 18);
                        const thumbW = Math.max(52, trackW * this.tray.w / this.trayContentWidth);
                        const thumbX = -trackW / 2 + (trackW - thumbW) * this.trayScrollX / this.trayScrollMax;
                        UIKit_1.fill(this.controls, new cc_1.Color(255, 218, 153, 48), -trackW / 2, trackY, trackW, 4, 2);
                        UIKit_1.fill(this.controls, gold, thumbX, trackY, thumbW, 4, 2);
                    }
                }
                drawControlIcon(g, index, cx, cy, color) {
                    if (index === 0) {
                        g.strokeColor = color;
                        g.lineWidth = 5;
                        g.circle(cx, cy, 14);
                        g.stroke();
                        UIKit_1.fill(g, color, cx + 11, cy + 4, 10, 6, 2);
                        g.fillColor = color;
                        g.moveTo(cx + 21, cy + 7);
                        g.lineTo(cx + 9, cy + 14);
                        g.lineTo(cx + 21, cy + 18);
                        g.close();
                        g.fill();
                    }
                    else if (index === 1) {
                        UIKit_1.fill(g, color, cx - 15, cy - 7, 22, 5, 2);
                        UIKit_1.fill(g, color, cx - 15, cy - 7, 5, 18, 2);
                        g.fillColor = color;
                        g.moveTo(cx - 18, cy - 13);
                        g.lineTo(cx - 8, cy - 13);
                        g.lineTo(cx - 15, cy - 2);
                        g.close();
                        g.fill();
                    }
                    else {
                        g.strokeColor = color;
                        g.lineWidth = 4;
                        g.circle(cx, cy, 13);
                        g.stroke();
                        UIKit_1.fill(g, color, cx - 3, cy + 5, 6, 12, 2);
                        g.fillColor = color;
                        g.moveTo(cx - 10, cy + 15);
                        g.lineTo(cx + 7, cy + 15);
                        g.lineTo(cx, cy + 5);
                        g.close();
                        g.fill();
                    }
                }
                updateOverlay() {
                    this.overlay.active = this.landscape || !!this.modal;
                    if (!this.overlay.active)
                        return;
                    this.overlay.setSiblingIndex(this.node.children.length - 1);
                    const g = this.overlay.getComponent(cc_1.Graphics);
                    g.clear();
                    this.rect(g, { x: -2000, y: -2000, w: 4750, h: this.height + 4000 }, new cc_1.Color(40, 20, 10, 235));
                    this.overlayText.color = cream;
                    this.overlayText.string = this.landscape ? '请竖屏游玩' : this.modal === 'restart' ? '重新装车？' : '时间到 · 再装一次';
                    for (const child of this.overlay.children.slice(1))
                        child.destroy();
                    if (!this.landscape) {
                        const r = this.confirmRect();
                        this.rect(g, r, red);
                        UIKit_1.label(this.overlay, 'Confirm', '重新装车', 32, 0, this.height / 2 - r.y - r.h / 2).color = cream;
                        if (this.modal === 'restart')
                            UIKit_1.label(this.overlay, 'Cancel', '取消', 28, 0, this.height / 2 - r.y - 160).color = cream;
                    }
                }
                confirmRect() { return { x: 225, y: this.height / 2 + 20, w: 300, h: 120 }; }
                sync() {
                    this.layoutTray();
                    const active = new Set(this.session.pieces.map(piece => piece.id));
                    for (const piece of this.allPieces) {
                        const visible = active.has(piece.id), view = this.pieces.get(piece.id);
                        view.node.active = visible;
                        if (visible)
                            this.renderPiece(piece);
                    }
                    this.clearPreview();
                    this.updateTrayState();
                    this.updateControls();
                }
                remainingPieces() {
                    return this.session.pieces.filter(piece => !this.session.placements.some(placement => placement.pieceId === piece.id));
                }
                layoutTray() {
                    const tray = InteractionGeometry_1.trayLayout(this.remainingPieces(), this.tray, piece => this.session.rotationFor(piece.id));
                    this.slots = tray.slots;
                    this.trayCell = tray.cell;
                    this.trayContentWidth = tray.contentWidth;
                    this.trayScrollMax = tray.maxScroll;
                    this.trayScrollX = Math.max(0, Math.min(this.trayScrollX, this.trayScrollMax));
                }
                updateTrayState() {
                    const show = this.remainingPieces().length === 0 && this.level.mode !== 'mom';
                    this.trayEmpty.active = show;
                    if (!show)
                        return;
                    const g = this.trayEmptyArt;
                    g.clear();
                    const cx = 0, cy = this.tray.y + this.tray.h / 2;
                    const left = -this.tray.w / 2;
                    UIKit_1.fill(g, new cc_1.Color(255, 241, 205, 20), left + 30, this.height / 2 - (this.tray.y + this.tray.h - 34), this.tray.w - 60, this.tray.h - 68, 26);
                    for (const x of [left + 66, left + this.tray.w - 66]) {
                        UIKit_1.fill(g, new cc_1.Color(255, 218, 153, 85), x - 12, this.height / 2 - (cy + 5), 24, 2, 1);
                        UIKit_1.fill(g, new cc_1.Color(255, 218, 153, 85), x - 12, this.height / 2 - (cy - 5), 24, 2, 1);
                    }
                    g.fillColor = new cc_1.Color(255, 218, 153, 80);
                    g.circle(cx, this.height / 2 - (cy - 42), 64);
                    g.fill();
                    g.fillColor = gold;
                    g.circle(cx, this.height / 2 - (cy - 42), 55);
                    g.fill();
                    g.fillColor = new cc_1.Color(173, 38, 43);
                    g.circle(cx, this.height / 2 - (cy - 42), 47);
                    g.fill();
                    g.strokeColor = cream;
                    g.lineWidth = 8;
                    g.moveTo(cx - 21, this.height / 2 - (cy - 42));
                    g.lineTo(cx - 6, this.height / 2 - (cy - 27));
                    g.lineTo(cx + 24, this.height / 2 - (cy - 63));
                    g.stroke();
                    UIKit_1.fill(g, gold, left + 42, this.height / 2 - (cy + 78), 80, 3, 1);
                    UIKit_1.fill(g, gold, left + this.tray.w - 122, this.height / 2 - (cy + 78), 80, 3, 1);
                    const titleY = cy + 35, hintY = cy + 77;
                    this.trayEmptyTitle.node.setPosition(0, this.height / 2 - titleY);
                    this.trayEmptyHint.node.setPosition(0, this.height / 2 - hintY);
                }
                renderPiece(piece) {
                    var _a, _b, _c, _d, _e;
                    const view = this.pieces.get(piece.id);
                    cc_1.Tween.stopAllByTarget(view.node);
                    view.node.angle = 0;
                    view.node.setScale(1, 1, 1);
                    const placement = this.session.placements.find(p => p.pieceId === piece.id);
                    const rotation = this.session.rotationFor(piece.id);
                    const size = placement ? this.cell : this.trayCell;
                    const box = InteractionGeometry_1.dimensions(piece, rotation);
                    const slot = (_a = this.slots.find(s => s.piece.id === piece.id)) === null || _a === void 0 ? void 0 : _a.rect;
                    const rect = placement ? { x: this.board.x + placement.x * size, y: this.board.y + placement.y * size, w: box.w * size, h: box.h * size } :
                        { x: ((_b = slot === null || slot === void 0 ? void 0 : slot.x) !== null && _b !== void 0 ? _b : this.tray.x) - this.trayScrollX + (((_c = slot === null || slot === void 0 ? void 0 : slot.w) !== null && _c !== void 0 ? _c : this.tray.w) - box.w * size) / 2,
                            y: ((_d = slot === null || slot === void 0 ? void 0 : slot.y) !== null && _d !== void 0 ? _d : this.tray.y) + (((_e = slot === null || slot === void 0 ? void 0 : slot.h) !== null && _e !== void 0 ? _e : this.tray.h) - box.h * size) / 2, w: box.w * size, h: box.h * size };
                    view.rect = rect;
                    view.rotation = rotation;
                    view.size = size;
                    this.drawPiece(piece, rotation, size, false);
                    this.position(view, rect.x + rect.w / 2, rect.y + rect.h / 2);
                    view.node.active = !!placement ||
                        (rect.x >= this.tray.x - 0.5 && rect.x + rect.w <= this.tray.x + this.tray.w + 0.5);
                }
                position(view, x, y) { view.node.setPosition(x - 375, this.height / 2 - y); }
                drawPiece(piece, rotation, size, held, failed = false) {
                    var _a;
                    const view = this.pieces.get(piece.id);
                    view.rotation = rotation;
                    view.size = size;
                    view.held = held;
                    view.failed = failed;
                    const g = view.graphics;
                    g.clear();
                    const box = InteractionGeometry_1.dimensions(piece, rotation), w = box.w * size, h = box.h * size;
                    view.node.getComponent(cc_1.UITransform).setContentSize(w, h);
                    const chosen = ((_a = this.selected) === null || _a === void 0 ? void 0 : _a.id) === piece.id;
                    if (this.drawPieceArt(piece, view, rotation, size, w, h, held, failed, chosen))
                        return;
                    view.sprite.enabled = false;
                    view.shadow.enabled = false;
                    view.title.node.active = true;
                    const tone = ItemArt_1.itemTone(piece);
                    const bodyColor = failed ? new cc_1.Color(172, 35, 37) : tone.base;
                    const outline = failed ? new cc_1.Color(92, 20, 22) : tone.edge;
                    const cells = InteractionGeometry_1.pieceCells(piece, rotation);
                    const cellRect = ([x, y]) => ({
                        x: x * size - w / 2, y: h / 2 - (y + 1) * size,
                    });
                    for (const cell of cells) {
                        const r = cellRect(cell);
                        if (held)
                            UIKit_1.fill(g, shadow, r.x + 8, r.y - 9, size - 3, size - 3, 5);
                        UIKit_1.fill(g, bodyColor, r.x, r.y, size + 1, size + 1);
                    }
                    g.strokeColor = chosen ? gold : outline;
                    g.lineWidth = Math.max(3, Math.min(6, size * .075));
                    const occupied = new Set(cells.map(([x, y]) => `${x},${y}`));
                    for (const [x, y] of cells) {
                        const r = cellRect([x, y]);
                        if (!occupied.has(`${x},${y - 1}`)) {
                            g.moveTo(r.x, r.y + size);
                            g.lineTo(r.x + size, r.y + size);
                        }
                        if (!occupied.has(`${x},${y + 1}`)) {
                            g.moveTo(r.x, r.y);
                            g.lineTo(r.x + size, r.y);
                        }
                        if (!occupied.has(`${x - 1},${y}`)) {
                            g.moveTo(r.x, r.y);
                            g.lineTo(r.x, r.y + size);
                        }
                        if (!occupied.has(`${x + 1},${y}`)) {
                            g.moveTo(r.x + size, r.y);
                            g.lineTo(r.x + size, r.y + size);
                        }
                    }
                    g.stroke();
                    g.strokeColor = chosen ? new cc_1.Color(255, 244, 198, 180) : tone.light;
                    g.lineWidth = Math.max(1, Math.min(2, size * .022));
                    for (const [x, y] of cells) {
                        if (occupied.has(`${x},${y - 1}`))
                            continue;
                        const r = cellRect([x, y]);
                        g.moveTo(r.x + 4, r.y + size - 4);
                        g.lineTo(r.x + size - 4, r.y + size - 4);
                    }
                    g.stroke();
                    view.title.string = StageArt_1.itemShortName(piece);
                    view.title.fontSize = Math.max(13, Math.min(22, size * .38));
                    view.title.color = cream;
                    view.title.lineHeight = view.title.fontSize + 4;
                    const labelW = Math.min(w - 8, Math.max(32, view.title.string.length * (view.title.fontSize - 1) + 16));
                    const labelH = view.title.fontSize + 6, labelY = -h / 2 + labelH / 2 + 3;
                    const centers = cells.map(([x, y]) => ({ x: x * size - w / 2 + size / 2, y: h / 2 - (y + .5) * size }));
                    const anchorX = centers.reduce((sum, p) => sum + p.x, 0) / centers.length;
                    const anchorY = centers.reduce((sum, p) => sum + p.y, 0) / centers.length;
                    const roomTop = h / 2 - 4, roomBottom = labelY + labelH / 2 + 3;
                    const featureHalf = Math.min(size * .55, Math.max(6, (roomTop - roomBottom) * .48));
                    const featureY = Math.max(roomBottom + featureHalf, Math.min(roomTop - featureHalf, anchorY));
                    view.feature.clear();
                    view.featureNode.setPosition(anchorX, featureY);
                    ItemArt_1.drawItemFeature(view.feature, piece, size, w, h, labelH, tone);
                    UIKit_1.fill(g, new cc_1.Color(30, 24, 28, 228), -labelW / 2, labelY - labelH / 2, labelW, labelH, Math.min(10, labelH / 2));
                    UIKit_1.fill(g, new cc_1.Color(255, 214, 145, 210), -labelW / 2, labelY - labelH / 2, labelW, 2, 1);
                    view.title.node.setPosition(0, labelY);
                }
                // Real item art: one Sprite per piece, rotated as a whole (art is drawn for rotation 0).
                // Until the frame is available the coloured-cell fallback is drawn instead.
                drawPieceArt(piece, view, rotation, size, w, h, held, failed, chosen) {
                    const key = items_1.itemKey(piece);
                    const frame = this.itemFrames.get(key);
                    if (!frame) {
                        if (!this.itemFrames.has(key)) {
                            this.itemFrames.set(key, undefined);
                            void OptionalResources_1.loadArt(`items/${key}`).then(loaded => {
                                if (!loaded || !this.node.isValid)
                                    return;
                                this.itemFrames.set(key, loaded);
                                for (const other of this.allPieces)
                                    if (items_1.itemKey(other) === key) {
                                        const pv = this.pieces.get(other.id);
                                        if (pv.size)
                                            this.drawPiece(other, pv.rotation, pv.size, pv.held, pv.failed);
                                    }
                            });
                        }
                        return false;
                    }
                    const g = view.graphics;
                    const base = InteractionGeometry_1.dimensions(piece, 0);
                    const fitted = { w: base.w * size * ITEM_OVERSCAN, h: base.h * size * ITEM_OVERSCAN };
                    const placed = !held && this.session.placements.some(p => p.pieceId === piece.id);
                    // Soft glow under the occupied cells shows selection / pickup without hiding the art.
                    for (const [x, y] of InteractionGeometry_1.pieceCells(piece, rotation)) {
                        const cx = x * size - w / 2, cy = h / 2 - (y + 1) * size;
                        if (held)
                            UIKit_1.fill(g, shadow, cx + 8, cy - 9, size - 3, size - 3, Math.max(6, size * .18));
                        if (chosen || held)
                            UIKit_1.fill(g, new cc_1.Color(255, 214, 120, held ? 70 : 95), cx + 1, cy + 1, size - 2, size - 2, Math.max(6, size * .18));
                        if (failed)
                            UIKit_1.fill(g, new cc_1.Color(220, 40, 40, 90), cx + 1, cy + 1, size - 2, size - 2, Math.max(6, size * .18));
                    }
                    const sn = view.sprite.node;
                    sn.getComponent(cc_1.UITransform).setContentSize(fitted.w, fitted.h);
                    sn.angle = 90 * rotation;
                    sn.setPosition(0, 0);
                    const artScale = items_1.itemScale(piece);
                    sn.setScale(artScale.x, artScale.y, 1);
                    const shadowNode = view.shadow.node;
                    shadowNode.getComponent(cc_1.UITransform).setContentSize(fitted.w, fitted.h);
                    shadowNode.angle = 90 * rotation;
                    shadowNode.setPosition(4, -6);
                    shadowNode.setScale(artScale.x, artScale.y, 1);
                    view.shadow.spriteFrame = frame;
                    view.shadow.color = new cc_1.Color(18, 12, 16, 80);
                    view.shadow.enabled = placed;
                    view.sprite.spriteFrame = frame;
                    view.sprite.enabled = true;
                    view.sprite.color = failed ? new cc_1.Color(255, 150, 150) : cc_1.Color.WHITE;
                    view.title.node.active = false;
                    // The fallback card's emblem lives on its own Graphics; drop it once the real picture shows.
                    view.feature.clear();
                    return true;
                }
                point(event) {
                    const p = event.getUILocation();
                    this.touchWorld.set(p.x, p.y, 0);
                    const local = this.node.getComponent(cc_1.UITransform).convertToNodeSpaceAR(this.touchWorld, this.touchLocal);
                    this.touchPoint.x = local.x + 375;
                    this.touchPoint.y = this.height / 2 - local.y;
                    return this.touchPoint;
                }
                start(event) {
                    var _a;
                    this.dismissGuide();
                    const p = this.point(event);
                    if (this.finish) {
                        if (!this.finish.state.buttons)
                            this.finishView.render(this.finish.skip());
                        else if (!this.landscape)
                            this.finishView.press(p.x, p.y);
                        return;
                    }
                    if (this.landscape)
                        return;
                    if (this.mom)
                        return;
                    if (this.modal) {
                        if (InteractionGeometry_1.inRect(p, this.confirmRect())) {
                            this.modal = undefined;
                            this.restartStage();
                        }
                        else if (this.modal === 'restart' && p.y > this.confirmRect().y + 130) {
                            this.modal = undefined;
                            this.updateOverlay();
                        }
                        return;
                    }
                    if (this.cleared || this.session.expired)
                        return;
                    const button = this.buttons.find(b => InteractionGeometry_1.inRect(p, b.rect));
                    if (button) {
                        if (!this.drag.active || (button.duringDrag && this.drag.active.mode === 'drag'))
                            button.action();
                        return;
                    }
                    if (this.drag.active)
                        return;
                    // The entire grid bounding region includes the gaps between occupied cells.
                    const piece = this.session.pieces.slice().reverse().find(piece => {
                        const view = this.pieces.get(piece.id);
                        return view.node.active && InteractionGeometry_1.inRect(p, view.rect);
                    });
                    if (piece && this.selected && piece.id !== this.selected.id) {
                        const old = this.selected;
                        this.selected = undefined;
                        this.renderPiece(old);
                        this.updateControls();
                    }
                    const id = (_a = event.getID()) !== null && _a !== void 0 ? _a : 0, fromTray = InteractionGeometry_1.inRect(p, this.tray);
                    if (fromTray && this.trayScrollMax > 0)
                        this.trayPan = { id, startX: p.x, startY: p.y, startScroll: this.trayScrollX, active: false };
                    this.drag.begin({ id, start: p, time: this.now(), piece, fromTray,
                        rotation: piece ? this.session.rotationFor(piece.id) : 0, offset: { x: 0, y: 0 } });
                }
                move(event) {
                    var _a, _b;
                    const id = (_a = event.getID()) !== null && _a !== void 0 ? _a : 0, p = this.point(event), pan = this.trayPan;
                    if (pan && pan.id === id) {
                        const dx = p.x - pan.startX, dy = p.y - pan.startY;
                        if (!pan.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.25) {
                            pan.active = true;
                            this.drag.cancel(id);
                            this.selected = undefined;
                        }
                        if (pan.active) {
                            this.trayScrollX = Math.max(0, Math.min(pan.startScroll - dx, this.trayScrollMax));
                            this.sync();
                            return;
                        }
                        if (Math.abs(dy) > 8)
                            this.trayPan = undefined;
                    }
                    const previous = (_b = this.drag.active) === null || _b === void 0 ? void 0 : _b.mode;
                    const gesture = this.drag.move(id, p);
                    if (!gesture || gesture.mode !== 'drag' || !gesture.piece)
                        return;
                    if (previous !== 'drag') {
                        this.sounds.play('pickup');
                        this.selected = gesture.piece;
                        const v = this.pieces.get(gesture.piece.id);
                        cc_1.Tween.stopAllByTarget(v.node);
                        v.node.angle = 0;
                        v.node.setSiblingIndex(this.controls.node.getSiblingIndex() - 1);
                        this.drawPiece(gesture.piece, gesture.rotation, this.cell, true);
                        v.node.setScale(1.05, 1.05, 1);
                        this.updateControls();
                    }
                    this.updateHeld(gesture);
                }
                updateHeld(g) {
                    if (!g.piece)
                        return;
                    const box = InteractionGeometry_1.dimensions(g.piece, g.rotation);
                    const lift = Math.max(1.2 * this.cell, 120);
                    g.offset.x = box.w * this.cell / 2;
                    g.offset.y = box.h * this.cell / 2 + lift;
                    this.position(this.pieces.get(g.piece.id), g.current.x, g.current.y - lift);
                    const x = Math.round((g.current.x - g.offset.x - this.board.x) / this.cell);
                    const y = Math.round((g.current.y - g.offset.y - this.board.y) / this.cell);
                    if (x === this.previewX && y === this.previewY && g.rotation === this.previewRotation)
                        return;
                    this.previewX = x;
                    this.previewY = y;
                    this.previewRotation = g.rotation;
                    this.preview.clear();
                    this.previewPlacement = undefined;
                    const placement = this.candidate;
                    placement.x = x;
                    placement.y = y;
                    placement.rotation = g.rotation;
                    placement.pieceId = g.piece.id;
                    if (!InteractionGeometry_1.previewVisible(g.piece, placement, this.level.width, this.level.height))
                        return;
                    this.previewPlacement = placement;
                    const color = this.session.canDrop(placement) ? green : invalid;
                    const cells = InteractionGeometry_1.pieceCells(g.piece, g.rotation);
                    for (let i = 0; i < cells.length; i++) {
                        UIKit_1.fill(this.preview, color, this.board.x + (x + cells[i][0]) * this.cell - 375, this.height / 2 - this.board.y - (y + cells[i][1] + 1) * this.cell, this.cell, this.cell, 6);
                    }
                }
                clearPreview() { this.preview.clear(); this.previewX = NaN; this.previewPlacement = undefined; }
                rotateSelected() {
                    if (!this.selected || this.session.expired || this.cleared)
                        return;
                    const piece = this.selected, v = this.pieces.get(piece.id);
                    if (this.drag.rotateHeld()) {
                        this.sounds.play('rotate');
                        cc_1.Tween.stopAllByTarget(v.node);
                        v.node.angle = 0;
                        this.drawPiece(piece, this.drag.active.rotation, this.cell, true);
                        this.previewX = NaN;
                        this.updateHeld(this.drag.active);
                        cc_1.tween(v.node).set({ angle: 90 }).to(.12, { angle: 0 }).start();
                    }
                    else if (this.session.rotatePiece(piece.id)) {
                        this.sounds.play('rotate');
                        this.renderPiece(piece);
                        cc_1.tween(v.node).set({ angle: 90 }).to(.12, { angle: 0 }).start();
                    }
                    else {
                        this.sounds.play('invalid');
                        this.drawPiece(piece, v.rotation, v.size, false, true);
                        cc_1.tween(v.node).by(.05, { position: new cc_1.Vec3(-8, 0, 0) }).by(.05, { position: new cc_1.Vec3(16, 0, 0) })
                            .by(.05, { position: new cc_1.Vec3(-16, 0, 0) }).by(.05, { position: new cc_1.Vec3(8, 0, 0) }).call(() => this.renderPiece(piece)).start();
                    }
                }
                end(event) {
                    var _a, _b, _c;
                    const id = (_a = event.getID()) !== null && _a !== void 0 ? _a : 0, pan = this.trayPan;
                    this.trayPan = undefined;
                    if (pan === null || pan === void 0 ? void 0 : pan.active) {
                        this.drag.cancel(id);
                        return;
                    }
                    const released = this.drag.release(id, this.point(event), this.now());
                    if (!released)
                        return;
                    const { gesture: g, tap } = released;
                    if (this.session.expired) {
                        this.cancelDrag();
                        this.sync();
                        return;
                    }
                    if (tap) {
                        this.selected = ((_b = this.selected) === null || _b === void 0 ? void 0 : _b.id) === ((_c = g.piece) === null || _c === void 0 ? void 0 : _c.id) ? undefined : g.piece;
                        this.sync();
                        return;
                    }
                    if (g.mode !== 'drag' || !g.piece)
                        return;
                    // release() also handles quick gestures without an intermediate move event.
                    const v = this.pieces.get(g.piece.id);
                    if (!v.held)
                        this.sounds.play('pickup');
                    this.selected = g.piece;
                    this.drawPiece(g.piece, g.rotation, this.cell, true);
                    v.node.setScale(1.05, 1.05, 1);
                    this.updateHeld(g);
                    let accepted = false;
                    if (InteractionGeometry_1.inRect(g.current, this.tray)) {
                        if (!g.fromTray) {
                            this.session.returnToTray(g.piece.id, g.rotation);
                            accepted = true;
                        }
                    }
                    else if (this.previewPlacement)
                        accepted = this.session.drop(this.previewPlacement);
                    this.sounds.play(accepted ? 'drop' : 'invalid');
                    if (accepted && this.level.mode === 'mom')
                        this.layoutTray();
                    const from = v.node.position.clone();
                    this.renderPiece(g.piece);
                    const destination = v.node.position.clone();
                    if (accepted) {
                        cc_1.tween(v.node).to(.08, { scale: new cc_1.Vec3(1.04, 1.04, 1) }).to(.16, { scale: new cc_1.Vec3(1, 1, 1) }).start();
                    }
                    else {
                        v.node.setPosition(from);
                        const returnScale = this.cell / v.size * 1.05;
                        v.node.setScale(returnScale, returnScale, 1);
                        cc_1.tween(v.node).to(.18, { position: destination, scale: new cc_1.Vec3(1, 1, 1) }, { easing: 'quadOut' }).start();
                    }
                    this.clearPreview();
                    this.updateControls();
                    if (this.session.readyForNextBatch)
                        this.startMomSequence();
                    else if (this.session.solved && !this.cleared)
                        this.beginFinish();
                }
                beginFinish() {
                    this.cleared = true;
                    this.selected = undefined;
                    this.dismissGuide();
                    this.momIntro.node.active = false;
                    this.momLayer.active = false;
                    this.momIntroBubble.active = false;
                    this.finishStarted = this.now();
                    this.finish = new FinishTimeline_1.FinishPlayback(cue => {
                        this.sounds.play(cue.sound);
                        if (cue.vibration && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                            try {
                                navigator.vibrate(cue.vibration);
                            }
                            catch ( /* Unsupported device: silent. */_a) { /* Unsupported device: silent. */ }
                        }
                    });
                    this.finishView = new FinishView_1.FinishView(this.node, this.level.stage, this.onClear);
                    this.finishView.layout(this.height, this.board);
                    this.finishView.render(this.finish.state);
                }
                startMomSequence() {
                    if (this.mom || this.cleared || !this.session.readyForNextBatch)
                        return;
                    this.cancelDrag();
                    this.selected = undefined;
                    this.momIntro.node.active = false;
                    this.momIntroBubble.active = false;
                    this.momIntroUntil = 0;
                    this.mom = { started: this.now(), appended: false };
                    this.momLayer.active = true;
                    this.momBubble.string = '等等！还有这个！';
                    this.momAvatar.setPosition(520, this.height / 2 - 795);
                    cc_1.tween(this.momAvatar).to(.24, { position: new cc_1.Vec3(300, this.height / 2 - 795, 0) }, { easing: 'quadOut' }).start();
                    this.updateControls();
                }
                updateMomSequence() {
                    if (!this.mom)
                        return;
                    const elapsed = this.now() - this.mom.started;
                    if (!this.mom.appended && elapsed >= MOM_APPEAR_MS) {
                        const previous = new Set(this.session.pieces.map(piece => piece.id));
                        if (this.session.appendNextBatch()) {
                            const added = this.session.pieces.filter(piece => !previous.has(piece.id));
                            this.sync();
                            for (const piece of added) {
                                const view = this.pieces.get(piece.id);
                                const destination = view.node.position.clone();
                                view.node.setPosition(destination.x, destination.y + 280, destination.z);
                                cc_1.Tween.stopAllByTarget(view.node);
                                cc_1.tween(view.node).to(.3, { position: destination }, { easing: 'bounceOut' }).start();
                            }
                            this.sounds.play('mom');
                            this.updateControls();
                        }
                        this.mom.appended = true;
                    }
                    if (this.mom.appended && elapsed >= MOM_APPEAR_MS + MOM_STAY_MS) {
                        this.mom = undefined;
                        this.momLayer.active = false;
                        this.sync();
                    }
                }
                restartStage() {
                    this.session.restart();
                    this.selected = undefined;
                    this.cleared = false;
                    this.modal = undefined;
                    this.mom = undefined;
                    this.momLayer.active = false;
                    this.momIntroUntil = this.level.mode === 'mom' ? this.now() + MOM_INTRO_MS : 0;
                    this.sync();
                    this.updateOverlay();
                    this.guidePlacement = undefined;
                    this.guideFrom = undefined;
                    this.guideTo = undefined;
                    if (this.canShowGuide())
                        this.prepareGuideRoute();
                }
                cancelDrag() { this.trayPan = undefined; if (this.drag.cancel())
                    this.sync(); }
                cancel(event) { var _a; this.trayPan = undefined; if (this.drag.cancel((_a = event.getID()) !== null && _a !== void 0 ? _a : 0))
                    this.sync(); }
            };
            exports_1("StagePage", StagePage);
        }
    };
});

System.register("chunks:///_virtual/WebPlatform.ts", ["./stack-progress.ts","./route.ts"], function (exports_1, context_1) {
    "use strict";
    var stack_progress_1, route_1, WebPlatform;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (stack_progress_1_1) {
                stack_progress_1 = stack_progress_1_1;
            },
            function (route_1_1) {
                route_1 = route_1_1;
            }
        ],
        execute: function () {
            WebPlatform = class WebPlatform {
                now() { return Date.now(); }
                route() { return route_1.resolveRoute(window.location.search); }
                isMomMode() { return this.route() === 'mom'; }
                isStackMode() { return this.route() === 'stack'; }
                /** ?stage=N (1 and up) or ?stage=daily. */
                stackStage() {
                    return stack_progress_1.normalizeRoute(new URLSearchParams(window.location.search).get('stage'));
                }
                hasLevelOverride() { return new URLSearchParams(window.location.search).has('level'); }
                levelFilename() {
                    var _a;
                    const value = (_a = new URLSearchParams(window.location.search).get('level')) !== null && _a !== void 0 ? _a : 'demo';
                    if (!/^[a-zA-Z0-9_-]+(?:\.json)?$/.test(value))
                        throw new Error('关卡文件名无效');
                    return value.replace(/\.json$/, '');
                }
            };
            exports_1("WebPlatform", WebPlatform);
        }
    };
});

System.register("chunks:///_virtual/route.ts", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /** Maps a URL query string to the page shell, without touching browser globals. */
    function resolveRoute(search) {
        const params = new URLSearchParams(search);
        const mode = params.get('mode');
        if (mode === 'mom')
            return 'mom';
        if (mode === 'stack')
            return 'stack';
        if (mode === 'pack')
            return 'pack';
        if (params.has('level'))
            return 'level';
        return 'home';
    }
    exports_1("resolveRoute", resolveRoute);
    return {
        setters: [],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/Api.ts", ["cc","./level.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, level_1, Api;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (level_1_1) {
                level_1 = level_1_1;
            }
        ],
        execute: function () {
            Api = class Api {
                constructor(platform) {
                    this.platform = platform;
                }
                async load(path) {
                    const asset = await new Promise((resolve, reject) => {
                        cc_1.resources.load(path, cc_1.JsonAsset, (error, value) => error ? reject(error) : resolve(value));
                    });
                    return level_1.parseLevel(asset.json);
                }
                async loadChallenge() {
                    const path = this.platform.hasLevelOverride()
                        ? `dev-levels/${this.platform.levelFilename()}`
                        : 'levels/v1/stage2';
                    const level = await this.load(path);
                    if (level.stage !== 2)
                        throw new Error('挑战关数据无效');
                    return level;
                }
                async loadMom() {
                    const level = await this.load('levels/v1/mom');
                    if (level.stage !== 3 || level.mode !== 'mom')
                        throw new Error('妈妈模式数据无效');
                    return level;
                }
            };
            exports_1("Api", Api);
        }
    };
});

System.register("chunks:///_virtual/OptionalResources.ts", ["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1, images, AUDIO_NAMES, audio;
    var __moduleName = context_1 && context_1.id;
    function loadArt(file) {
        const path = `art/${file}/spriteFrame`;
        let pending = images.get(path);
        if (!pending) {
            pending = new Promise(resolve => {
                try {
                    if (!cc_1.resources.getInfoWithPath(path, cc_1.SpriteFrame)) {
                        resolve(undefined);
                        return;
                    }
                    cc_1.resources.load(path, cc_1.SpriteFrame, (error, frame) => {
                        // Keep goods out of the dynamic atlas: cropped clones share the packed region, and
                        // destroying a page freed it, so replays showed the wrong goods and a missing car body.
                        if (!error && frame)
                            frame.packable = false;
                        resolve(error ? undefined : frame);
                    });
                }
                catch (_a) {
                    resolve(undefined);
                }
            });
            images.set(path, pending);
        }
        return pending;
    }
    exports_1("loadArt", loadArt);
    function loadAudio(name) {
        let pending = audio.get(name);
        if (!pending) {
            pending = new Promise(resolve => {
                try {
                    const path = `audio/${name}`;
                    if (!cc_1.resources.getInfoWithPath(path, cc_1.AudioClip)) {
                        resolve(undefined);
                        return;
                    }
                    cc_1.resources.load(path, cc_1.AudioClip, (error, clip) => resolve(error ? undefined : clip));
                }
                catch (_a) {
                    resolve(undefined);
                }
            });
            audio.set(name, pending);
        }
        return pending;
    }
    exports_1("loadAudio", loadAudio);
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
            // Resource paths omit extensions. Cocos imports PNG frames as <name>/spriteFrame.
            // Missing entries are checked before load so absent optional assets do not log errors.
            images = new Map();
            exports_1("AUDIO_NAMES", AUDIO_NAMES = ['pickup', 'drop', 'invalid', 'rotate', 'undo', 'tick', 'trunk_slam', 'horn', 'cheer', 'mom', 'pack']);
            audio = new Map();
        }
    };
});

System.register("chunks:///_virtual/RankApi.ts", ["./rank.ts"], function (exports_1, context_1) {
    "use strict";
    var rank_1, RankApi;
    var __moduleName = context_1 && context_1.id;
    function currentSearch() {
        try {
            return typeof window === 'undefined' ? '' : window.location.search;
        }
        catch (_a) {
            return '';
        }
    }
    function browserStorage() {
        try {
            return typeof localStorage === 'undefined' ? undefined : localStorage;
        }
        catch (_a) {
            return undefined;
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return {
        setters: [
            function (rank_1_1) {
                rank_1 = rank_1_1;
            }
        ],
        execute: function () {
            exports_1("RANK_PENDING_STORAGE_KEY", rank_1.RANK_PENDING_STORAGE_KEY);
            /** Thin, failure-tolerant HTTP client for the provincial leaderboard. */
            RankApi = class RankApi {
                constructor(config = rank_1.resolveRankApi(currentSearch()), storage = browserStorage(), fetcher = globalThis.fetch) {
                    this.config = config;
                    this.storage = storage;
                    this.fetcher = fetcher;
                }
                get enabled() { return this.config.enabled; }
                get deviceId() {
                    var _a, _b;
                    if (this.memoryDeviceId)
                        return this.memoryDeviceId;
                    try {
                        const stored = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.getItem(rank_1.RANK_DEVICE_STORAGE_KEY);
                        if (rank_1.isValidSessionId(stored)) {
                            this.memoryDeviceId = stored;
                            return stored;
                        }
                    }
                    catch ( /* Fall through to a new id. */_c) { /* Fall through to a new id. */ }
                    const created = rank_1.createDeviceId();
                    this.memoryDeviceId = created;
                    try {
                        (_b = this.storage) === null || _b === void 0 ? void 0 : _b.setItem(rank_1.RANK_DEVICE_STORAGE_KEY, created);
                    }
                    catch ( /* In-memory only. */_d) { /* In-memory only. */ }
                    return created;
                }
                get province() {
                    return rank_1.readStoredProvince(this.storage);
                }
                setProvince(province) {
                    rank_1.writeStoredProvince(this.storage, province);
                }
                async fetchRank() {
                    if (!this.config.enabled)
                        throw new Error('rank api disabled');
                    const response = await this.request('/api/rank');
                    if (!response.ok)
                        throw new Error(`rank api ${response.status}`);
                    const snapshot = rank_1.parseRankSnapshot(await response.json());
                    if (!snapshot)
                        throw new Error('rank api payload invalid');
                    return snapshot;
                }
                /** Never rejects: transient errors retry, then become a persisted pending report. */
                async submitClear(report) {
                    if (!this.config.enabled)
                        return { ok: false, reason: 'disabled' };
                    if (!rank_1.isValidClearReport(report) || !rank_1.isValidClearMs(report.stage, report.ms)) {
                        return { ok: false, reason: 'invalid' };
                    }
                    let last = { kind: 'retry' };
                    try {
                        for (let attempt = 0; attempt < rank_1.RANK_MAX_REPORT_ATTEMPTS; attempt++) {
                            last = await this.attemptClear(report);
                            if (last.kind === 'ok') {
                                this.removeQueued(report);
                                return { ok: true, result: last.result };
                            }
                            if (last.kind === 'permanent')
                                return { ok: false, reason: 'invalid' };
                            if (attempt < rank_1.RANK_MAX_REPORT_ATTEMPTS - 1)
                                await sleep(rank_1.retryDelayMs(attempt));
                        }
                        this.queue(report);
                        return { ok: false, reason: 'network' };
                    }
                    catch (_a) {
                        this.queue(report);
                        return { ok: false, reason: 'network' };
                    }
                }
                /** Best-effort one-shot flush for reports left behind by an earlier session. */
                async flushPending() {
                    if (!this.config.enabled)
                        return;
                    try {
                        const pending = rank_1.readPendingClears(this.storage);
                        if (!pending.length)
                            return;
                        const keep = [];
                        for (const report of pending) {
                            const outcome = await this.attemptClear(report);
                            if (outcome.kind === 'retry')
                                keep.push(report);
                        }
                        rank_1.writePendingClears(this.storage, keep);
                    }
                    catch ( /* Pending reports stay for the next launch. */_a) { /* Pending reports stay for the next launch. */ }
                }
                async attemptClear(report) {
                    if (!this.config.enabled || !this.fetcher)
                        return { kind: 'retry' };
                    let response;
                    try {
                        response = await this.request('/api/clear', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({
                                province: report.province,
                                stage: report.stage,
                                ms: report.ms,
                                sessionId: report.sessionId,
                                boxes: report.boxes,
                                momBoxes: report.momBoxes,
                            }),
                        });
                    }
                    catch (_a) {
                        return { kind: 'retry' };
                    }
                    if (response.status === 400 || response.status === 422)
                        return { kind: 'permanent' };
                    if (!response.ok)
                        return { kind: 'retry' };
                    try {
                        const result = rank_1.parseClearResult(await response.json());
                        return result ? { kind: 'ok', result } : { kind: 'retry' };
                    }
                    catch (_b) {
                        return { kind: 'retry' };
                    }
                }
                async request(path, init) {
                    if (!this.config.enabled)
                        throw new Error('rank api disabled');
                    const fetcher = this.fetcher;
                    if (!fetcher)
                        throw new Error('fetch unavailable');
                    const controller = typeof AbortController === 'undefined' ? undefined : new AbortController();
                    const timer = controller
                        ? setTimeout(() => controller.abort(), rank_1.RANK_REQUEST_TIMEOUT_MS)
                        : undefined;
                    try {
                        return await fetcher(`${this.config.base}${path}`, Object.assign(Object.assign({}, init), { signal: controller === null || controller === void 0 ? void 0 : controller.signal }));
                    }
                    finally {
                        if (timer !== undefined)
                            clearTimeout(timer);
                    }
                }
                queue(report) {
                    try {
                        const next = rank_1.enqueuePendingClear(rank_1.readPendingClears(this.storage), report, Date.now());
                        rank_1.writePendingClears(this.storage, next);
                    }
                    catch ( /* A full/blocked storage must not affect gameplay. */_a) { /* A full/blocked storage must not affect gameplay. */ }
                }
                removeQueued(report) {
                    try {
                        const next = rank_1.removePendingClear(rank_1.readPendingClears(this.storage), report);
                        if (next.length !== rank_1.readPendingClears(this.storage).length)
                            rank_1.writePendingClears(this.storage, next);
                    }
                    catch ( /* Best effort. */_a) { /* Best effort. */ }
                }
            };
            exports_1("RankApi", RankApi);
        }
    };
});

System.register("chunks:///_virtual/SoundEffects.ts", ["cc","./OptionalResources.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, OptionalResources_1, SoundEffects;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            }
        ],
        execute: function () {
            /** Optional effects never block input or replay an old action after a slow load. */
            SoundEffects = class SoundEffects {
                constructor(owner) {
                    var _a;
                    this.owner = owner;
                    this.clips = new Map();
                    // Keep the source on the persistent page parent so a clear sound survives a stage switch.
                    this.source = (_a = owner.getComponent(cc_1.AudioSource)) !== null && _a !== void 0 ? _a : owner.addComponent(cc_1.AudioSource);
                    this.source.playOnAwake = false;
                    for (const name of OptionalResources_1.AUDIO_NAMES) {
                        void OptionalResources_1.loadAudio(name).then(clip => {
                            if (clip && owner.isValid)
                                this.clips.set(name, clip);
                        });
                    }
                }
                play(name) {
                    const clip = this.clips.get(name);
                    if (!clip || !this.owner.isValid)
                        return;
                    try {
                        this.source.playOneShot(clip, 1);
                    }
                    catch ( /* Decoder/device/browser failure: silence. */_a) { /* Decoder/device/browser failure: silence. */ }
                }
            };
            exports_1("SoundEffects", SoundEffects);
        }
    };
});

System.register("chunks:///_virtual/StackShareImage.ts", ["cc","./brand.ts","./stack-layout.ts","./stack-share.ts","./OptionalResources.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, brand_1, stack_layout_1, stack_share_1, OptionalResources_1, FONT, gold, pale;
    var __moduleName = context_1 && context_1.id;
    function canUseBrowserCanvas() {
        return typeof document !== 'undefined' && typeof HTMLCanvasElement !== 'undefined';
    }
    function frameDrawable(frame) {
        var _a, _b, _c;
        if (!frame)
            return null;
        try {
            const texture = frame.texture;
            const image = (_a = texture === null || texture === void 0 ? void 0 : texture.getHtmlElementObj) === null || _a === void 0 ? void 0 : _a.call(texture);
            if (!image)
                return null;
            const imageWidth = 'naturalWidth' in image
                ? Number(image.naturalWidth)
                : Number(image.width);
            const imageHeight = 'naturalHeight' in image
                ? Number(image.naturalHeight)
                : Number(image.height);
            const width = Math.max(1, Number((_b = frame.rect) === null || _b === void 0 ? void 0 : _b.width) || imageWidth || 1);
            const height = Math.max(1, Number((_c = frame.rect) === null || _c === void 0 ? void 0 : _c.height) || imageHeight || 1);
            return { image, width, height };
        }
        catch (_d) {
            return null;
        }
    }
    /**
     * Cocos may drop an image's DOM element after uploading it to the GPU (for example once the finish
     * view has drawn the same goods), so reload the original file from its URL and only fall back to
     * the cached element when that is impossible.
     */
    async function freshDrawable(path, frame) {
        var _a, _b;
        try {
            const info = cc_1.resources.getInfoWithPath(path, cc_1.ImageAsset);
            const url = info
                ? cc_1.assetManager.utils.getUrlWithUuid(info.uuid, { isNative: true, nativeExt: '.png', bundle: 'resources' })
                : (_b = (_a = frame === null || frame === void 0 ? void 0 : frame.texture) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.nativeUrl;
            if (url && typeof Image !== 'undefined') {
                const image = await new Promise(resolve => {
                    const element = new Image();
                    element.onload = () => resolve(element);
                    element.onerror = () => resolve(null);
                    element.src = url;
                });
                if (image && image.naturalWidth > 0) {
                    return { image, width: image.naturalWidth, height: image.naturalHeight };
                }
            }
        }
        catch ( /* fall back to the cached element */_c) { /* fall back to the cached element */ }
        return frameDrawable(frame);
    }
    function roundedRect(context, x, y, width, height, radius) {
        const r = Math.max(0, Math.min(radius, width / 2, height / 2));
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + width - r, y);
        context.quadraticCurveTo(x + width, y, x + width, y + r);
        context.lineTo(x + width, y + height - r);
        context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        context.lineTo(x + r, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - r);
        context.lineTo(x, y + r);
        context.quadraticCurveTo(x, y, x + r, y);
        context.closePath();
    }
    function fillRounded(context, color, x, y, width, height, radius) {
        context.fillStyle = color;
        roundedRect(context, x, y, width, height, radius);
        context.fill();
    }
    function fitFont(context, text, maxWidth, size, weight = '900') {
        let current = size;
        while (current > 24) {
            context.font = `${weight} ${current}px ${FONT}`;
            if (context.measureText(text).width <= maxWidth)
                break;
            current -= 2;
        }
    }
    function drawFrame(context, frame, x, y, width, height, angle = 0) {
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.drawImage(frame.image, 0, 0, frame.width, frame.height, -width / 2, -height / 2, width, height);
        context.restore();
    }
    function drawLantern(context, x, y, scale) {
        context.save();
        context.translate(x, y);
        context.scale(scale, scale);
        context.strokeStyle = '#ffd27a';
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(0, -95);
        context.lineTo(0, -67);
        context.stroke();
        context.fillStyle = '#8b111a';
        context.beginPath();
        context.ellipse(0, 0, 54, 67, 0, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = '#ffbd52';
        context.lineWidth = 7;
        context.beginPath();
        context.ellipse(0, 0, 54, 67, 0, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = '#ffd77f';
        fillRounded(context, '#ffd77f', -36, -86, 72, 13, 6);
        context.fillStyle = '#a81b23';
        fillRounded(context, '#a81b23', -30, -79, 60, 11, 5);
        for (let index = -2; index <= 2; index++) {
            context.strokeStyle = '#f6a83f';
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(index * 12, 68);
            context.lineTo(index * 12, 104);
            context.stroke();
        }
        context.restore();
    }
    function drawBackground(context) {
        const gradient = context.createLinearGradient(0, 0, 0, stack_share_1.STACK_SHARE_HEIGHT);
        gradient.addColorStop(0, '#8f1720');
        gradient.addColorStop(0.44, '#c92f2d');
        gradient.addColorStop(1, '#661019');
        context.fillStyle = gradient;
        context.fillRect(0, 0, stack_share_1.STACK_SHARE_WIDTH, stack_share_1.STACK_SHARE_HEIGHT);
        const glow = context.createRadialGradient(540, 330, 50, 540, 330, 620);
        glow.addColorStop(0, 'rgba(255,216,126,.28)');
        glow.addColorStop(1, 'rgba(255,216,126,0)');
        context.fillStyle = glow;
        context.fillRect(0, 0, stack_share_1.STACK_SHARE_WIDTH, stack_share_1.STACK_SHARE_HEIGHT);
        context.strokeStyle = 'rgba(255,216,126,.23)';
        context.lineWidth = 3;
        for (let index = 0; index < 9; index++) {
            context.beginPath();
            context.arc(540, 380, 190 + index * 46, Math.PI * 1.08, Math.PI * 1.92);
            context.stroke();
        }
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 8; column++) {
                const x = 86 + column * 130 + (row % 2 ? 54 : 0);
                const y = 455 + row * 152;
                context.fillStyle = row % 2 ? 'rgba(255,210,122,.12)' : 'rgba(255,244,210,.08)';
                context.beginPath();
                context.arc(x, y, 7, 0, Math.PI * 2);
                context.fill();
            }
        }
        drawLantern(context, 76, 167, .68);
        drawLantern(context, 1004, 167, .68);
        drawLantern(context, 174, 105, .38);
        drawLantern(context, 906, 105, .38);
        context.strokeStyle = 'rgba(255,210,122,.85)';
        context.lineWidth = 6;
        roundedRect(context, 30, 30, 1020, 1380, 46);
        context.stroke();
        context.strokeStyle = 'rgba(255,238,187,.35)';
        context.lineWidth = 2;
        roundedRect(context, 52, 52, 976, 1336, 34);
        context.stroke();
    }
    function drawTexts(context, scene) {
        var _a;
        const copy = scene.ending ? stack_share_1.createStackHomecomingCopy(scene.result) : stack_share_1.createStackShareCopy(scene.stage, scene.result);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.save();
        context.shadowColor = 'rgba(73,5,11,.72)';
        context.shadowBlur = 18;
        context.shadowOffsetY = 8;
        fitFont(context, copy.title, 900, 94);
        context.fillStyle = gold;
        context.fillText(copy.title, 540, 156);
        context.restore();
        const pillW = scene.ending ? 380 : 290;
        fillRounded(context, 'rgba(93,9,16,.42)', 540 - pillW / 2, 224, pillW, 64, 32);
        context.strokeStyle = 'rgba(255,225,157,.72)';
        context.lineWidth = 3;
        roundedRect(context, 542 - pillW / 2, 226, pillW - 4, 60, 30);
        context.stroke();
        context.font = `700 34px ${FONT}`;
        context.fillStyle = pale;
        context.fillText(scene.ending ? copy.stageText : (_a = scene.stageLabel) !== null && _a !== void 0 ? _a : copy.stageText, 540, 256);
        fitFont(context, copy.statsText, 900, 45, '800');
        context.fillStyle = pale;
        context.fillText(copy.statsText, 540, 346);
        return copy;
    }
    function drawFallbackCar(context) {
        context.save();
        context.shadowColor = 'rgba(35,0,5,.55)';
        context.shadowBlur = 30;
        context.shadowOffsetY = 24;
        fillRounded(context, '#8f141c', 92, 514, 896, 548, 74);
        context.restore();
        fillRounded(context, '#b52228', 108, 500, 864, 500, 68);
        fillRounded(context, '#6f1018', 188, 576, 704, 286, 36);
        fillRounded(context, '#17141b', 207, 594, 666, 248, 26);
        fillRounded(context, '#ffb34c', 118, 766, 96, 58, 18);
        fillRounded(context, '#ffb34c', 866, 766, 96, 58, 18);
        fillRounded(context, '#f7d178', 370, 932, 340, 48, 22);
        fillRounded(context, '#2b1115', 420, 990, 240, 38, 18);
    }
    function drawCargo(context, frame, items, bodyX, bodyY, bodyWidth, bodyHeight) {
        const hole = {
            x: bodyX + stack_layout_1.STACK_BODY_HOLE.left / stack_layout_1.STACK_BODY_SIZE.w * bodyWidth,
            y: bodyY + stack_layout_1.STACK_BODY_HOLE.top / stack_layout_1.STACK_BODY_SIZE.h * bodyHeight,
            w: (stack_layout_1.STACK_BODY_HOLE.right - stack_layout_1.STACK_BODY_HOLE.left) / stack_layout_1.STACK_BODY_SIZE.w * bodyWidth,
            h: (stack_layout_1.STACK_BODY_HOLE.bottom - stack_layout_1.STACK_BODY_HOLE.top) / stack_layout_1.STACK_BODY_SIZE.h * bodyHeight,
        };
        context.save();
        roundedRect(context, hole.x, hole.y, hole.w, hole.h, 28);
        context.clip();
        if (frame) {
            drawFrame(context, frame, hole.x + hole.w / 2, hole.y + hole.h / 2, hole.w + 4, hole.h + 4);
        }
        else {
            context.fillStyle = '#17131a';
            context.fillRect(hole.x, hole.y, hole.w, hole.h);
            context.fillStyle = 'rgba(255,207,111,.2)';
            for (let stripe = 0; stripe < 8; stripe++) {
                context.fillRect(hole.x + stripe * hole.w / 8, hole.y, 2, hole.h);
            }
        }
        for (let index = 0; index < stack_share_1.STACK_CARGO_POSITIONS.length && index < items.length; index++) {
            const item = items[index];
            if (!item)
                continue;
            const [px, py, angle] = stack_share_1.STACK_CARGO_POSITIONS[index];
            const max = Math.min(hole.w * .24, hole.h * .48, 164);
            const ratio = item.width / item.height;
            const width = ratio >= 1 ? max : max * ratio;
            const height = ratio >= 1 ? max / ratio : max;
            drawFrame(context, item, hole.x + hole.w * px, hole.y + hole.h * py, width, height, angle);
        }
        context.restore();
        context.strokeStyle = 'rgba(255,211,125,.78)';
        context.lineWidth = 7;
        roundedRect(context, hole.x - 2, hole.y - 2, hole.w + 4, hole.h + 4, 30);
        context.stroke();
    }
    function drawPill(context, text, y, size, fillColor, textColor) {
        context.font = `800 ${size}px ${FONT}`;
        const width = Math.min(960, context.measureText(text).width + size * 1.6);
        fillRounded(context, fillColor, 540 - width / 2, y - size * .85, width, size * 1.7, size * .85);
        context.strokeStyle = 'rgba(255,225,157,.8)';
        context.lineWidth = 3;
        roundedRect(context, 540 - width / 2 + 2, y - size * .85 + 2, width - 4, size * 1.7 - 4, size * .85 - 2);
        context.stroke();
        fitFont(context, text, width - size, size, '800');
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = textColor;
        context.fillText(text, 540, y + 1);
    }
    /** Non-sedan ride: its rear art with the goods heaped on the load area. */
    function drawRide(context, ride, art, items) {
        var _a, _b, _c;
        const maxH = 610, maxW = 900;
        let h = maxH, w = h * ride.w / ride.h * ((_a = ride.stretchX) !== null && _a !== void 0 ? _a : 1);
        if (w > maxW) {
            w = maxW;
            h = w / (ride.w / ride.h * ((_b = ride.stretchX) !== null && _b !== void 0 ? _b : 1));
        }
        const x = 540 - w / 2, y = 1080 - h;
        if (art) {
            context.save();
            context.shadowColor = 'rgba(35,0,5,.55)';
            context.shadowBlur = 30;
            context.shadowOffsetY = 18;
            drawFrame(context, art, x + w / 2, y + h / 2, w, h);
            context.restore();
        }
        else {
            drawFallbackCar(context);
        }
        const region = (_c = ride.region) !== null && _c !== void 0 ? _c : { x: .15, y: .35, w: .7, h: .3 };
        const hole = { x: x + region.x * w, y: y + region.y * h, w: region.w * w, h: region.h * h };
        for (let index = 0; index < stack_share_1.STACK_CARGO_POSITIONS.length && index < items.length; index++) {
            const item = items[index];
            if (!item)
                continue;
            const [px, py, angle] = stack_share_1.STACK_CARGO_POSITIONS[index];
            const max = Math.min(hole.w * .3, hole.h * .7, 150);
            const ratio = item.width / item.height;
            const iw = ratio >= 1 ? max : max * ratio;
            const ih = ratio >= 1 ? max / ratio : max;
            drawFrame(context, item, hole.x + hole.w * px, hole.y + hole.h * (py * .9 - .1), iw, ih, angle);
        }
    }
    function drawCaption(context, caption) {
        context.save();
        context.shadowColor = 'rgba(71,5,12,.58)';
        context.shadowBlur = 20;
        context.shadowOffsetY = 10;
        fillRounded(context, '#ffd27a', 76, 1206, 928, 150, 44);
        context.restore();
        fillRounded(context, '#8f141c', 88, 1218, 904, 126, 34);
        context.strokeStyle = 'rgba(255,239,190,.78)';
        context.lineWidth = 3;
        roundedRect(context, 98, 1228, 884, 106, 27);
        context.stroke();
        fitFont(context, caption, 820, 56);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = pale;
        context.fillText(caption, 540, 1282);
        context.font = `700 24px ${FONT}`;
        context.fillStyle = 'rgba(255,225,162,.82)';
        context.fillText(`试玩：${stack_share_1.STACK_SHARE_LINK}`, 540, 1392);
    }
    /** Finale card: bg_home (gate, parents, couplets, lanterns, firecrackers) with the tractor parked. */
    async function renderHomecomingCanvas(scene) {
        var _a, _b;
        const [homeFrame, tractorFrame] = await Promise.all([OptionalResources_1.loadArt('ui/bg_home'), OptionalResources_1.loadArt('vehicles/tractor')]);
        const [home, tractor] = await Promise.all([
            freshDrawable('art/ui/bg_home', homeFrame),
            freshDrawable('art/vehicles/tractor', tractorFrame),
        ]);
        const canvas = document.createElement('canvas');
        canvas.width = stack_share_1.STACK_SHARE_WIDTH;
        canvas.height = stack_share_1.STACK_SHARE_HEIGHT;
        const context = canvas.getContext('2d');
        if (!context)
            return null;
        drawBackground(context);
        if (home) {
            // Width-fit the 750×1334 art and crop so the gate and the parents sit mid-card.
            const h = stack_share_1.STACK_SHARE_WIDTH * home.height / home.width;
            drawFrame(context, home, 540, h / 2 - 300, stack_share_1.STACK_SHARE_WIDTH, h);
            const shade = context.createLinearGradient(0, 0, 0, 420);
            shade.addColorStop(0, 'rgba(20,6,20,.75)');
            shade.addColorStop(1, 'rgba(20,6,20,0)');
            context.fillStyle = shade;
            context.fillRect(0, 0, stack_share_1.STACK_SHARE_WIDTH, 420);
        }
        if (tractor) {
            const h = 380, w = h * tractor.width / tractor.height;
            context.save();
            context.shadowColor = 'rgba(20,0,5,.55)';
            context.shadowBlur = 24;
            context.shadowOffsetY = 14;
            drawFrame(context, tractor, 840, 1180 - h / 2, w, h);
            context.restore();
        }
        const copy = drawTexts(context, scene);
        const provinceLine = stack_share_1.formatStackShareProvince(scene.province, scene.result.victory, (_a = scene.rank) !== null && _a !== void 0 ? _a : null, Math.random, (_b = scene.counted) !== null && _b !== void 0 ? _b : true);
        if (provinceLine)
            drawPill(context, provinceLine, 422, 38, 'rgba(120,12,22,.82)', gold);
        drawCaption(context, copy.caption);
        return canvas.toDataURL('image/png');
    }
    async function renderShareCanvas(scene) {
        var _a, _b, _c, _d, _e, _f;
        if (!canUseBrowserCanvas())
            return null;
        try {
            if (scene.ending)
                return await renderHomecomingCanvas(scene);
            const rideArt = (_b = (_a = scene.ride) === null || _a === void 0 ? void 0 : _a.art) !== null && _b !== void 0 ? _b : null;
            const [bodyFrame, trunkFrame, ...itemFrames] = await Promise.all([
                OptionalResources_1.loadArt(rideArt !== null && rideArt !== void 0 ? rideArt : 'vehicles/sedan_v1_body'),
                rideArt ? Promise.resolve(undefined) : OptionalResources_1.loadArt('vehicles/sedan_v1_trunk'),
                ...stack_share_1.STACK_SHARE_ITEM_KEYS.map(key => OptionalResources_1.loadArt(`items/${key}`)),
            ]);
            const paths = [`art/${rideArt !== null && rideArt !== void 0 ? rideArt : 'vehicles/sedan_v1_body'}`, 'art/vehicles/sedan_v1_trunk', ...stack_share_1.STACK_SHARE_ITEM_KEYS.map(key => `art/items/${key}`)];
            const [bodyArt, trunkArt, ...itemArt] = await Promise.all([bodyFrame, trunkFrame, ...itemFrames].map((frame, index) => freshDrawable(paths[index], frame)));
            const canvas = document.createElement('canvas');
            canvas.width = stack_share_1.STACK_SHARE_WIDTH;
            canvas.height = stack_share_1.STACK_SHARE_HEIGHT;
            const context = canvas.getContext('2d');
            if (!context)
                return null;
            drawBackground(context);
            const copy = drawTexts(context, scene);
            if ((_c = scene.ride) === null || _c === void 0 ? void 0 : _c.art) {
                drawRide(context, scene.ride, bodyArt, itemArt);
            }
            else {
                const bodyX = 90, bodyY = 474, bodyWidth = 900, bodyHeight = 562;
                const body = bodyArt;
                if (body)
                    drawFrame(context, body, bodyX + bodyWidth / 2, bodyY + bodyHeight / 2, bodyWidth, bodyHeight);
                else
                    drawFallbackCar(context);
                drawCargo(context, trunkArt, itemArt, bodyX, bodyY, bodyWidth, bodyHeight);
            }
            const provinceLine = stack_share_1.formatStackShareProvince(scene.province, scene.result.victory, (_d = scene.rank) !== null && _d !== void 0 ? _d : null, Math.random, (_e = scene.counted) !== null && _e !== void 0 ? _e : true);
            if (provinceLine)
                drawPill(context, provinceLine, 422, 38, scene.result.victory ? 'rgba(120,12,22,.82)' : 'rgba(60,8,14,.82)', gold);
            const rideLine = stack_share_1.formatStackShareVehicle((_f = scene.ride) === null || _f === void 0 ? void 0 : _f.name);
            if (rideLine)
                drawPill(context, rideLine, 1132, 30, 'rgba(93,9,16,.78)', pale);
            drawCaption(context, copy.caption);
            return canvas.toDataURL('image/png');
        }
        catch (_g) {
            return null;
        }
    }
    function showShareOverlay(dataUrl, fileName) {
        var _a;
        if (typeof document === 'undefined' || !document.body)
            return;
        (_a = document.getElementById('stack-share-overlay')) === null || _a === void 0 ? void 0 : _a.remove();
        const overlay = document.createElement('div');
        overlay.id = 'stack-share-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', '晒战绩分享图');
        overlay.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:2147483000',
            'display:flex', 'align-items:center', 'justify-content:center',
            'padding:16px', 'box-sizing:border-box',
            'background:rgba(25,4,9,.82)', 'backdrop-filter:blur(5px)',
            'font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
        ].join(';');
        overlay.addEventListener('click', event => event.stopPropagation());
        overlay.addEventListener('touchstart', event => event.stopPropagation(), { passive: true });
        overlay.addEventListener('touchend', event => event.stopPropagation(), { passive: true });
        const panel = document.createElement('div');
        panel.style.cssText = [
            'width:min(92vw,430px)', 'max-height:94vh', 'box-sizing:border-box',
            'padding:14px 14px 16px', 'border-radius:24px',
            'background:linear-gradient(160deg,#b4262c,#711019)',
            'border:3px solid #ffd27a', 'box-shadow:0 18px 60px rgba(0,0,0,.55)',
            'display:flex', 'flex-direction:column', 'align-items:center', 'gap:12px',
        ].join(';');
        const title = document.createElement('div');
        title.textContent = '长按图片保存 · 晒出你的满满一车';
        title.style.cssText = 'color:#fff2cf;font-size:15px;font-weight:700;letter-spacing:.04em;text-align:center';
        const image = document.createElement('img');
        image.id = 'stack-share-image';
        image.alt = `${brand_1.GAME_TITLE}战绩分享图`;
        image.src = dataUrl;
        image.style.cssText = [
            'display:block', 'width:min(78vw,352px)', 'max-height:62vh',
            'height:auto', 'object-fit:contain', 'border-radius:16px',
            'box-shadow:0 10px 30px rgba(0,0,0,.36)', 'background:#7b1119',
        ].join(';');
        const actions = document.createElement('div');
        actions.style.cssText = 'display:flex;gap:10px;width:min(78vw,352px)';
        const download = document.createElement('a');
        download.id = 'stack-share-download';
        download.href = dataUrl;
        download.download = fileName;
        download.textContent = '下载图片';
        download.style.cssText = [
            'flex:1', 'display:flex', 'align-items:center', 'justify-content:center',
            'min-height:44px', 'border-radius:14px', 'text-decoration:none',
            'background:#ffd27a', 'color:#5f1018', 'font-size:16px', 'font-weight:800',
        ].join(';');
        const close = document.createElement('button');
        close.id = 'stack-share-close';
        close.type = 'button';
        close.textContent = '关闭';
        close.style.cssText = [
            'flex:1', 'min-height:44px', 'border-radius:14px', 'cursor:pointer',
            'background:#74131b', 'color:#ffe3a5', 'border:2px solid #ffd27a',
            'font-family:inherit', 'font-size:16px', 'font-weight:800',
        ].join(';');
        close.addEventListener('click', () => overlay.remove());
        actions.append(download, close);
        panel.append(title, image, actions);
        overlay.append(panel);
        document.body.appendChild(overlay);
    }
    /** Generates and displays a share card. Returns the data URL, or null outside a browser. */
    async function showStackShareImage(scene) {
        const dataUrl = await renderShareCanvas(scene);
        if (!dataUrl)
            return null;
        showShareOverlay(dataUrl, stack_share_1.stackShareFileName(scene.stage, scene.result.victory));
        return dataUrl;
    }
    exports_1("showStackShareImage", showStackShareImage);
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (brand_1_1) {
                brand_1 = brand_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_share_1_1) {
                stack_share_1 = stack_share_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            }
        ],
        execute: function () {
            FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
            gold = '#ffd27a';
            pale = '#fff2cf';
        }
    };
});

System.register("chunks:///_virtual/StackSound.ts", ["./stack-music.ts","./stack-sfx.ts"], function (exports_1, context_1) {
    "use strict";
    var stack_music_1, stack_sfx_1, STACK_SOUND_STORAGE_KEY, STACK_MUSIC_STORAGE_KEY, STACK_SOUND_EVENTS, STACK_SOUND_PROFILES, SFX_MASTER_LEVEL, MUSIC_MASTER_LEVEL, RENDER_RATE, bgmSamples, sfxSamples, StackSound;
    var __moduleName = context_1 && context_1.id;
    function readStackSoundEnabled(storage = browserStorage()) {
        try {
            return (storage === null || storage === void 0 ? void 0 : storage.getItem(STACK_SOUND_STORAGE_KEY)) !== '0';
        }
        catch (_a) {
            return true;
        }
    }
    exports_1("readStackSoundEnabled", readStackSoundEnabled);
    function writeStackSoundEnabled(enabled, storage = browserStorage()) {
        try {
            storage === null || storage === void 0 ? void 0 : storage.setItem(STACK_SOUND_STORAGE_KEY, enabled ? '1' : '0');
        }
        catch ( /* Private mode: keep in-memory state. */_a) { /* Private mode: keep in-memory state. */ }
    }
    exports_1("writeStackSoundEnabled", writeStackSoundEnabled);
    function readStackMusicEnabled(storage = browserStorage()) {
        try {
            return (storage === null || storage === void 0 ? void 0 : storage.getItem(STACK_MUSIC_STORAGE_KEY)) !== '0';
        }
        catch (_a) {
            return true;
        }
    }
    exports_1("readStackMusicEnabled", readStackMusicEnabled);
    function writeStackMusicEnabled(enabled, storage = browserStorage()) {
        try {
            storage === null || storage === void 0 ? void 0 : storage.setItem(STACK_MUSIC_STORAGE_KEY, enabled ? '1' : '0');
        }
        catch ( /* Private mode: keep in-memory state. */_a) { /* Private mode: keep in-memory state. */ }
    }
    exports_1("writeStackMusicEnabled", writeStackMusicEnabled);
    function browserStorage() {
        try {
            return typeof localStorage === 'undefined' ? undefined : localStorage;
        }
        catch (_a) {
            return undefined;
        }
    }
    function browserDocument() {
        try {
            return typeof document === 'undefined' ? undefined : document;
        }
        catch (_a) {
            return undefined;
        }
    }
    function contextConstructor() {
        var _a;
        const scope = globalThis;
        return (_a = scope.AudioContext) !== null && _a !== void 0 ? _a : scope.webkitAudioContext;
    }
    function comboLevel(level) {
        if (level === undefined || !Number.isFinite(level))
            return 1;
        return Math.max(1, Math.min(8, Math.round(level)));
    }
    function renderRateFor(context) {
        return Math.min(RENDER_RATE, Math.max(8000, Math.round(context.sampleRate)));
    }
    function bgmData(rate) {
        let data = bgmSamples.get(rate);
        if (!data) {
            data = stack_music_1.renderBgm(rate);
            bgmSamples.set(rate, data);
        }
        return data;
    }
    function sfxData(event, level, rate) {
        const key = `${event}:${level}:${rate}`;
        let data = sfxSamples.get(key);
        if (!data) {
            data = stack_sfx_1.renderSfx(event, rate, event === 'combo' ? { level } : undefined);
            sfxSamples.set(key, data);
        }
        return data;
    }
    return {
        setters: [
            function (stack_music_1_1) {
                stack_music_1 = stack_music_1_1;
            },
            function (stack_sfx_1_1) {
                stack_sfx_1 = stack_sfx_1_1;
            }
        ],
        execute: function () {
            exports_1("STACK_SOUND_STORAGE_KEY", STACK_SOUND_STORAGE_KEY = 'stack-sound-enabled');
            exports_1("STACK_MUSIC_STORAGE_KEY", STACK_MUSIC_STORAGE_KEY = 'stack-music-enabled');
            exports_1("STACK_SOUND_EVENTS", STACK_SOUND_EVENTS = [
                'tap', 'fly', 'pack', 'combo', 'warn', 'mom', 'swap', 'win', 'fail', 'prop', 'home',
            ]);
            exports_1("STACK_SOUND_PROFILES", STACK_SOUND_PROFILES = {
                tap: { label: '短哒木鱼', layers: 1 },
                fly: { label: '飞入轻嗖', layers: 2 },
                pack: { label: '封箱咔哒与叮', layers: 3 },
                combo: { label: '连击高音铃', layers: 3 },
                warn: { label: '槽位告急双音', layers: 2 },
                mom: { label: '妈妈加塞提示', layers: 3 },
                swap: { label: '换车机械声', layers: 3 },
                win: { label: '通关唢呐与鞭炮', layers: 5 },
                fail: { label: '下行低音', layers: 3 },
                prop: { label: '道具闪光铃', layers: 3 },
                home: { label: '到家鞭炮与锣', layers: 4 },
            });
            SFX_MASTER_LEVEL = 0.65;
            MUSIC_MASTER_LEVEL = 0.58;
            RENDER_RATE = 22050;
            bgmSamples = new Map();
            sfxSamples = new Map();
            /** Synthesizes music and cues after the first real touch unlocks the browser AudioContext. */
            StackSound = class StackSound {
                constructor(storage = browserStorage()) {
                    this.visibilityListener = () => {
                        const doc = browserDocument();
                        if (!doc)
                            return;
                        if (doc.hidden)
                            this.pause();
                        else
                            this.resume();
                    };
                    this.listening = false;
                    this.paused = false;
                    this.disposed = false;
                    this.sfxBuffers = new Map();
                    this.storage = storage;
                    this._soundEnabled = readStackSoundEnabled(storage);
                    this._musicEnabled = readStackMusicEnabled(storage);
                    const doc = browserDocument();
                    if (doc) {
                        try {
                            doc.addEventListener('visibilitychange', this.visibilityListener);
                            this.listening = true;
                        }
                        catch ( /* Optional browser integration. */_a) { /* Optional browser integration. */ }
                    }
                }
                /** Backwards-compatible alias for the sound-effects switch. */
                get enabled() { return this._soundEnabled; }
                get soundEnabled() { return this._soundEnabled; }
                get musicEnabled() { return this._musicEnabled; }
                setSoundEnabled(enabled) {
                    this._soundEnabled = !!enabled;
                    writeStackSoundEnabled(this._soundEnabled, this.storage);
                    this.updateSfxGain();
                }
                setMusicEnabled(enabled) {
                    this._musicEnabled = !!enabled;
                    writeStackMusicEnabled(this._musicEnabled, this.storage);
                    if (!this._musicEnabled)
                        this.stopMusic();
                    else if (this.context && !this.paused)
                        this.startMusic();
                }
                toggleSound() {
                    this.setSoundEnabled(!this._soundEnabled);
                    if (this._soundEnabled)
                        this.unlock();
                    return this._soundEnabled;
                }
                toggleMusic() {
                    this.setMusicEnabled(!this._musicEnabled);
                    if (this._musicEnabled)
                        this.unlock();
                    return this._musicEnabled;
                }
                /** Backwards-compatible alias for the sound-effects toggle. */
                toggle() {
                    return this.toggleSound();
                }
                /** Called from the first real touch. Creates/resumes the AudioContext and starts music. */
                unlock() {
                    if (this.disposed)
                        return;
                    const Ctor = contextConstructor();
                    if (!Ctor)
                        return;
                    try {
                        if (!this.context) {
                            const context = new Ctor();
                            const sfxGain = context.createGain();
                            const musicGain = context.createGain();
                            sfxGain.gain.value = this._soundEnabled ? SFX_MASTER_LEVEL : 0.0001;
                            musicGain.gain.value = 0.0001;
                            sfxGain.connect(context.destination);
                            musicGain.connect(context.destination);
                            this.context = context;
                            this.sfxGain = sfxGain;
                            this.musicGain = musicGain;
                        }
                        if (this.context.state === 'suspended' && !this.paused) {
                            void this.context.resume().catch(() => undefined);
                        }
                        if (!this.paused)
                            this.startMusic();
                    }
                    catch (_a) {
                        this.close();
                    }
                }
                play(event, options = {}) {
                    if (!this._soundEnabled || this.paused || this.disposed)
                        return;
                    const context = this.context;
                    const output = this.sfxGain;
                    if (!context || !output)
                        return;
                    try {
                        if (context.state === 'suspended' && !this.paused)
                            void context.resume().catch(() => undefined);
                        if (context.state === 'closed')
                            return;
                        const level = comboLevel(options.level);
                        const buffer = this.sfxBuffer(context, event, level);
                        if (!buffer)
                            return;
                        const source = context.createBufferSource();
                        source.buffer = buffer;
                        source.connect(output);
                        source.start();
                    }
                    catch ( /* Device/browser failure: audio is optional. */_a) { /* Device/browser failure: audio is optional. */ }
                }
                /** Pause music and suspend the context while the game is in the background. */
                pause() {
                    var _a;
                    if (this.disposed)
                        return;
                    this.paused = true;
                    try {
                        if (((_a = this.context) === null || _a === void 0 ? void 0 : _a.state) === 'running')
                            void this.context.suspend().catch(() => undefined);
                    }
                    catch ( /* Optional browser integration. */_b) { /* Optional browser integration. */ }
                }
                /** Resume music after the game returns to the foreground, if the music switch is on. */
                resume() {
                    var _a;
                    if (this.disposed)
                        return;
                    if ((_a = browserDocument()) === null || _a === void 0 ? void 0 : _a.hidden) {
                        this.paused = true;
                        return;
                    }
                    this.paused = false;
                    const context = this.context;
                    if (!context)
                        return;
                    try {
                        if (context.state === 'suspended')
                            void context.resume().catch(() => undefined);
                        if (this._musicEnabled)
                            this.startMusic();
                    }
                    catch ( /* Optional browser integration. */_b) { /* Optional browser integration. */ }
                }
                dispose() {
                    if (this.disposed)
                        return;
                    this.disposed = true;
                    const doc = browserDocument();
                    if (doc && this.listening) {
                        try {
                            doc.removeEventListener('visibilitychange', this.visibilityListener);
                        }
                        catch ( /* Optional. */_a) { /* Optional. */ }
                    }
                    this.listening = false;
                    this.stopMusic();
                    this.close();
                }
                updateSfxGain() {
                    var _a;
                    const context = this.context;
                    const gain = (_a = this.sfxGain) === null || _a === void 0 ? void 0 : _a.gain;
                    if (!context || !gain)
                        return;
                    try {
                        const now = context.currentTime;
                        gain.cancelScheduledValues(now);
                        gain.setTargetAtTime(this._soundEnabled ? SFX_MASTER_LEVEL : 0.0001, now, 0.01);
                    }
                    catch ( /* Optional browser integration. */_b) { /* Optional browser integration. */ }
                }
                startMusic() {
                    var _a;
                    const context = this.context;
                    const output = this.musicGain;
                    if (!context || !output || !this._musicEnabled || this.paused || this.disposed)
                        return;
                    if (this.musicSource)
                        return;
                    try {
                        const buffer = (_a = this.musicBuffer) !== null && _a !== void 0 ? _a : this.createMusicBuffer(context);
                        this.musicBuffer = buffer;
                        const source = context.createBufferSource();
                        source.buffer = buffer;
                        source.loop = true;
                        source.connect(output);
                        const now = context.currentTime;
                        const gain = output.gain;
                        gain.cancelScheduledValues(now);
                        gain.setValueAtTime(0.0001, now);
                        gain.exponentialRampToValueAtTime(MUSIC_MASTER_LEVEL, now + 0.18);
                        source.start();
                        this.musicSource = source;
                    }
                    catch ( /* Device/browser failure: audio is optional. */_b) { /* Device/browser failure: audio is optional. */ }
                }
                stopMusic() {
                    var _a;
                    const context = this.context;
                    const gain = (_a = this.musicGain) === null || _a === void 0 ? void 0 : _a.gain;
                    const source = this.musicSource;
                    this.musicSource = undefined;
                    if (!context || !source)
                        return;
                    try {
                        const now = context.currentTime;
                        if (gain) {
                            gain.cancelScheduledValues(now);
                            gain.setValueAtTime(Math.max(0.0001, gain.value), now);
                            gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
                        }
                        source.stop(now + 0.12);
                    }
                    catch ( /* The source may already have stopped. */_b) { /* The source may already have stopped. */ }
                }
                createMusicBuffer(context) {
                    const rate = renderRateFor(context);
                    const data = bgmData(rate);
                    const buffer = context.createBuffer(1, data.length, rate);
                    buffer.getChannelData(0).set(data);
                    return buffer;
                }
                sfxBuffer(context, event, level) {
                    const rate = renderRateFor(context);
                    const key = `${event}:${level}:${rate}`;
                    const cached = this.sfxBuffers.get(key);
                    if (cached)
                        return cached;
                    const data = sfxData(event, level, rate);
                    const buffer = context.createBuffer(1, data.length, rate);
                    buffer.getChannelData(0).set(data);
                    this.sfxBuffers.set(key, buffer);
                    return buffer;
                }
                close() {
                    const context = this.context;
                    this.context = undefined;
                    this.sfxGain = undefined;
                    this.musicGain = undefined;
                    this.musicSource = undefined;
                    this.musicBuffer = undefined;
                    this.sfxBuffers.clear();
                    if (!context)
                        return;
                    try {
                        if (context.state !== 'closed')
                            void context.close().catch(() => undefined);
                    }
                    catch ( /* Optional browser integration. */_a) { /* Optional browser integration. */ }
                }
            };
            exports_1("StackSound", StackSound);
        }
    };
});

System.register("chunks:///_virtual/FinishView.ts", ["cc","./FinishTimeline.ts","./InteractionGeometry.ts","./OptionalResources.ts","./UIKit.ts","./JourneyArt.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, FinishTimeline_1, InteractionGeometry_1, OptionalResources_1, UIKit_1, JourneyArt_1, red, bright, gold, pale, dark, tire, lightGlow, confettiColors, FinishView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (FinishTimeline_1_1) {
                FinishTimeline_1 = FinishTimeline_1_1;
            },
            function (InteractionGeometry_1_1) {
                InteractionGeometry_1 = InteractionGeometry_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            },
            function (JourneyArt_1_1) {
                JourneyArt_1 = JourneyArt_1_1;
            }
        ],
        execute: function () {
            red = new cc_1.Color(184, 27, 43), bright = new cc_1.Color(238, 65, 48), gold = new cc_1.Color(255, 205, 114);
            pale = new cc_1.Color(255, 238, 194), dark = new cc_1.Color(88, 22, 38), tire = new cc_1.Color(43, 25, 34);
            lightGlow = new cc_1.Color(255, 124, 70, 95);
            confettiColors = [gold, bright, pale, new cc_1.Color(255, 136, 107)];
            /** Allocates its nodes once on clear; render mutates existing states and nodes only. */
            FinishView = class FinishView {
                constructor(parent, stage, onAction, choices = FinishTimeline_1.finishButtons(stage)) {
                    this.onAction = onAction;
                    this.choices = choices;
                    this.pool = FinishTimeline_1.createConfettiPool();
                    this.particles = [];
                    this.buttonRects = [];
                    this.height = 1334;
                    this.carY = 0;
                    this.lidHeight = 0;
                    this.lightsOn = false;
                    this.node = UIKit_1.uiNode('Finish', parent, 750, 1334);
                    this.backdrop = UIKit_1.uiNode('HomewardNight', this.node, 750, 1334);
                    this.backdrop.addComponent(cc_1.Graphics);
                    this.car = UIKit_1.uiNode('LoadedCar', this.node, 700, 600);
                    this.body = this.car.addComponent(cc_1.Graphics);
                    this.lid = UIKit_1.uiNode('TrunkLid', this.car, 600, 400);
                    this.lidFallback = this.lid.addComponent(cc_1.Graphics);
                    this.lidImage = UIKit_1.uiNode('LidImage', this.lid, 600, 400).addComponent(cc_1.Sprite);
                    this.lidImage.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    this.lidImage.trim = false;
                    this.lidImage.enabled = false;
                    void OptionalResources_1.loadArt('vehicles/sedan_v1_lid').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.lidImage.spriteFrame = frame;
                        this.lidImage.enabled = true;
                        this.lidFallback.enabled = false;
                    });
                    this.lights = UIKit_1.uiNode('TailLights', this.car, 700, 100).addComponent(cc_1.Graphics);
                    UIKit_1.label(this.car, 'Plate', '年货满载 · 平安回家', 23, 0, 0).color = dark;
                    this.headline = UIKit_1.uiNode('Celebration', this.node, 750, 250);
                    const banner = this.headline.addComponent(cc_1.Graphics);
                    UIKit_1.fill(banner, dark, -353, -70, 706, 140, 24);
                    UIKit_1.fill(banner, gold, -343, -60, 686, 120, 20);
                    UIKit_1.fill(banner, red, -337, -54, 674, 108, 16);
                    UIKit_1.label(this.headline, 'FinishTitle', '塞满了！回家！', 62, 0, 1).color = pale;
                    UIKit_1.label(this.headline, 'FinishSubtitle', '把一整年的牵挂，装进回家的路', 25, 0, -104).color = gold;
                    this.actions = UIKit_1.uiNode('FinishActions', this.node, 750, 320);
                    const buttons = this.actions.addComponent(cc_1.Graphics);
                    for (let i = 0; i < this.choices.length; i++) {
                        const y = -i * 108;
                        UIKit_1.fill(buttons, i === 0 ? gold : dark, -250, y - 40, 500, 80, 22);
                        const text = UIKit_1.label(this.actions, `FinishButton${i}`, this.choices[i].title, 32, 0, y);
                        text.color = i === 0 ? dark : gold;
                    }
                    for (let i = 0; i < this.pool.length; i++) {
                        const node = UIKit_1.uiNode(`Confetti${i}`, this.node, 18, 24);
                        const fallback = node.addComponent(cc_1.Graphics);
                        UIKit_1.fill(fallback, confettiColors[i % 4], -5, -10, 10, 20, 2);
                        const sprite = UIKit_1.uiNode('Image', node, 24, 24).addComponent(cc_1.Sprite);
                        sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                        sprite.enabled = false;
                        this.particles.push({ node, sprite, fallback });
                        node.active = false;
                    }
                    for (let variant = 0; variant < 4; variant++)
                        void OptionalResources_1.loadArt(`fx/confetti_${variant + 1}`).then(frame => {
                            if (!frame || !this.node.isValid)
                                return;
                            for (let i = variant; i < this.particles.length; i += 4) {
                                this.particles[i].sprite.spriteFrame = frame;
                                this.particles[i].sprite.enabled = true;
                                this.particles[i].fallback.enabled = false;
                            }
                        });
                    UIKit_1.label(this.node, 'SkipHint', '轻点屏幕 · 立即出发', 23, 0, -600).color = gold;
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => FinishTimeline_1.updateConfetti(this.pool, 2500, 750, this.height));
                }
                layout(height, board, headlineLift = 0) {
                    this.height = height;
                    this.node.getComponent(cc_1.UITransform).setContentSize(750, height);
                    this.carY = height / 2 - board.y - board.h / 2;
                    const w = Math.min(680, Math.max(510, board.w + 80)), h = board.h + 90;
                    this.lidHeight = board.h + 16;
                    this.body.clear();
                    UIKit_1.fill(this.body, tire, -w / 2 - 14, -h / 2 - 30, 52, 135, 18);
                    UIKit_1.fill(this.body, tire, w / 2 - 38, -h / 2 - 30, 52, 135, 18);
                    // Four rails leave the packed board visible while the lid travels down.
                    UIKit_1.fill(this.body, dark, -w / 2 - 12, -h / 2 - 36, w + 24, 75, 28);
                    UIKit_1.fill(this.body, red, -w / 2, -h / 2 - 20, w, 65, 20);
                    UIKit_1.fill(this.body, red, -w / 2, -h / 2 + 40, (w - board.w) / 2, h - 40, 18);
                    UIKit_1.fill(this.body, red, board.w / 2, -h / 2 + 40, (w - board.w) / 2, h - 40, 18);
                    UIKit_1.fill(this.body, red, -w / 2, board.h / 2, w, 42, 18);
                    UIKit_1.fill(this.body, gold, -w / 2 + 12, -h / 2 - 1, w - 24, 12, 6);
                    UIKit_1.fill(this.body, gold, -165, -h / 2 - 5, 330, 43, 8);
                    this.car.getChildByName('Plate').setPosition(0, -h / 2 + 16);
                    this.lid.getComponent(cc_1.UITransform).setContentSize(board.w + 16, this.lidHeight);
                    this.lidImage.node.getComponent(cc_1.UITransform).setContentSize(board.w + 16, this.lidHeight);
                    this.lidFallback.clear();
                    UIKit_1.fill(this.lidFallback, red, -board.w / 2 - 8, -this.lidHeight / 2, board.w + 16, this.lidHeight, 20);
                    UIKit_1.fill(this.lidFallback, gold, -board.w / 2 + 8, this.lidHeight / 2 - 24, board.w - 16, 7, 3);
                    UIKit_1.fill(this.lidFallback, dark, -40, -8, 80, 16, 8);
                    this.lights.node.setPosition(0, -h / 2 + 68);
                    this.drawLights(false);
                    const bg = this.backdrop.getComponent(cc_1.Graphics);
                    bg.clear();
                    UIKit_1.fill(bg, red, -375, -height / 2, 750, height);
                    JourneyArt_1.drawHomeRoad(bg, 750, height, 0);
                    // Long gold side ornaments and road markings frame the loaded car.
                    UIKit_1.fill(bg, gold, -352, -height / 2 + 32, 3, height - 304);
                    UIKit_1.fill(bg, gold, 349, -height / 2 + 32, 3, height - 304);
                    for (let i = 0; i < 5; i++)
                        UIKit_1.fill(bg, new cc_1.Color(224, 91, 62), -7, -height / 2 + 80 + i * 95, 14, 44, 4);
                    this.headline.setPosition(0, -110 + headlineLift);
                    this.actions.setPosition(0, -height / 2 + 330);
                    this.buttonRects.length = 0;
                    for (let i = 0; i < this.choices.length; i++)
                        this.buttonRects.push({
                            rect: { x: 125, y: height - 370 + i * 108, w: 500, h: 80 }, action: this.choices[i].action,
                        });
                    this.node.getChildByName('SkipHint').setPosition(0, -height / 2 + 74);
                    if (this.state)
                        this.render(this.state);
                }
                drawLights(on) {
                    this.lightsOn = on;
                    this.lights.clear();
                    for (const x of [-225, 155]) {
                        if (on)
                            UIKit_1.fill(this.lights, lightGlow, x - 14, -29, 98, 58, 20);
                        UIKit_1.fill(this.lights, on ? pale : bright, x, -15, 70, 30, 8);
                        UIKit_1.fill(this.lights, gold, x + 4, -3, 62, 4, 2);
                    }
                }
                render(state) {
                    this.state = state;
                    this.backdrop.active = state.time >= 700;
                    this.car.active = state.lidVisible;
                    this.car.setPosition(0, this.carY - state.bodySink);
                    this.lid.setPosition(0, (1 - state.lidProgress) * (this.height / 2 - this.carY + this.lidHeight));
                    this.lid.setScale(1, 0.7 + state.lidProgress * .3, 1);
                    if (this.lightsOn !== state.tailLights)
                        this.drawLights(state.tailLights);
                    this.headline.active = state.celebration;
                    this.actions.active = state.buttons;
                    this.node.getChildByName('SkipHint').active = !state.buttons;
                    FinishTimeline_1.updateConfetti(this.pool, state.time, 750, this.height);
                    for (let i = 0; i < this.pool.length; i++) {
                        const p = this.pool[i], v = this.particles[i];
                        v.node.active = p.active;
                        if (p.active) {
                            v.node.setPosition(p.x - 375, this.height / 2 - p.y);
                            v.node.angle = p.angle;
                        }
                    }
                }
                press(x, y) {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.buttons))
                        return;
                    for (const b of this.buttonRects)
                        if (InteractionGeometry_1.inRect({ x, y }, b.rect)) {
                            this.onAction(b.action);
                            return;
                        }
                }
            };
            exports_1("FinishView", FinishView);
        }
    };
});

System.register("chunks:///_virtual/ItemArt.ts", ["cc","./items.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, items_1, tones, fallback;
    var __moduleName = context_1 && context_1.id;
    function itemTone(piece) {
        var _a, _b, _c;
        return (_c = (_a = tones[items_1.itemKey(piece)]) !== null && _a !== void 0 ? _a : tones[(_b = items_1.ITEMS[piece.shape]) === null || _b === void 0 ? void 0 : _b.key]) !== null && _c !== void 0 ? _c : fallback;
    }
    exports_1("itemTone", itemTone);
    function block(g, color, x, y, w, h, r = 0) {
        g.fillColor = color;
        if (r)
            g.roundRect(x, y, w, h, r);
        else
            g.rect(x, y, w, h);
        g.fill();
    }
    function shape(g, color, points) {
        g.fillColor = color;
        g.moveTo(points[0][0], points[0][1]);
        for (const [x, y] of points.slice(1))
            g.lineTo(x, y);
        g.close();
        g.fill();
    }
    function line(g, color, width, points) {
        g.strokeColor = color;
        g.lineWidth = width;
        g.moveTo(points[0][0], points[0][1]);
        for (const [x, y] of points.slice(1))
            g.lineTo(x, y);
        g.stroke();
    }
    function dot(g, color, x, y, r) {
        g.fillColor = color;
        g.circle(x, y, r);
        g.fill();
    }
    /** A compact, upright cargo emblem that stays legible at tray and board sizes. */
    function drawItemFeature(g, piece, size, width, height, labelHeight, tone) {
        const key = items_1.itemKey(piece);
        const room = Math.max(12, height - labelHeight - 8), s = Math.max(12, Math.min(size * .95, room));
        const long = Math.max(20, Math.min(width * .7, size * 2.45));
        const y = 0, lw = Math.max(1, Math.min(3, s * .07));
        const edge = tone.edge, accent = tone.accent, light = tone.light;
        switch (key) {
            case 'liquor': {
                const bw = Math.max(13, s * .48), bh = Math.max(18, s * .9);
                block(g, light, -bw / 2, y - bh * .43, bw, bh * .74, Math.max(2, bw * .16));
                shape(g, light, [[-bw * .23, y + bh * .3], [-bw * .23, y + bh * .18], [bw * .23, y + bh * .18], [bw * .23, y + bh * .3]]);
                block(g, accent, -bw * .17, y + bh * .35, bw * .34, bh * .13, 1);
                block(g, accent, -bw / 2 + 2, y - bh * .17, bw - 4, bh * .3, 1);
                g.strokeColor = edge;
                g.lineWidth = Math.max(1.5, lw);
                g.roundRect(-bw / 2, y - bh * .43, bw, bh * .77, Math.max(2, bw * .16));
                g.stroke();
                g.moveTo(-bw * .23, y + bh * .29);
                g.lineTo(-bw * .23, y + bh * .18);
                g.lineTo(bw * .23, y + bh * .18);
                g.lineTo(bw * .23, y + bh * .29);
                g.stroke();
                dot(g, light, -bw * .14, y + bh * .02, Math.max(1.5, s * .045));
                dot(g, light, bw * .1, y - bh * .08, Math.max(1.5, s * .045));
                break;
            }
            case 'milk': {
                const bw = Math.max(22, s * .75), bh = Math.max(18, s * .62), bodyH = bh * .68;
                block(g, light, -bw / 2, y - bh * .45, bw, bodyH, 2);
                shape(g, accent, [[-bw / 2, y + bh * .23], [0, y + bh * .45], [bw / 2, y + bh * .23], [bw / 2, y + bh * .13], [-bw / 2, y + bh * .13]]);
                block(g, accent, -bw / 2 + 3, y - bh * .2, bw - 6, Math.max(3, bh * .15), 1);
                g.strokeColor = edge;
                g.lineWidth = Math.max(1.5, lw);
                g.moveTo(-bw / 2, y + bh * .23);
                g.lineTo(-bw / 2, y - bh * .45);
                g.lineTo(bw / 2, y - bh * .45);
                g.lineTo(bw / 2, y + bh * .23);
                g.stroke();
                shape(g, accent, [[bw * .02, y + bh * .07], [bw * .24, y + bh * .22], [bw * .34, y + bh * .03], [bw * .12, y - bh * .03]]);
                dot(g, accent, bw * .3, y - bh * .06, Math.max(2, s * .05));
                break;
            }
            case 'sugarcane': {
                const half = long / 2, stalk = Math.max(3.5, s * .16);
                line(g, accent, stalk, [[-half, y - s * .16], [-half * .42, y + s * .22], [half * .24, y + s * .12], [half * .9, y + s * .26]]);
                line(g, tone.base, stalk, [[-half * .82, y - s * .32], [-half * .2, y - s * .02], [half * .48, y - s * .08], [half, y + s * .02]]);
                line(g, edge, Math.max(2, s * .08), [[-half * .92, y + s * .3], [-half * .28, y + s * .38], [half * .4, y + s * .3], [half * .94, y + s * .4]]);
                line(g, edge, Math.max(2, s * .08), [[-half * .86, y - s * .36], [-half * .2, y - s * .42], [half * .5, y - s * .37], [half * .94, y - s * .22]]);
                for (const at of [-.38, .22, .65]) {
                    line(g, light, Math.max(1, s * .035), [[half * at, y - s * .26], [half * at + s * .06, y + s * .18]]);
                }
                line(g, edge, Math.max(2, s * .065), [[0, y - s * .36], [0, y + s * .35]]);
                dot(g, accent, 0, y + s * .02, Math.max(2.5, s * .08));
                break;
            }
            case 'nutbox': {
                const bw = Math.max(22, s * .68), bh = Math.max(18, s * .54);
                block(g, tone.light, -bw / 2, y - bh * .28, bw, bh * .62, 2);
                block(g, accent, -bw / 2, y + bh * .18, bw, bh * .2, 1);
                block(g, light, -bw * .09, y - bh * .3, bw * .18, bh * .72, 1);
                shape(g, edge, [[-bw * .09, y + bh * .37], [-bw * .3, y + bh * .52], [-bw * .11, y + bh * .27]]);
                shape(g, edge, [[bw * .09, y + bh * .37], [bw * .3, y + bh * .52], [bw * .11, y + bh * .27]]);
                dot(g, accent, 0, y + bh * .36, Math.max(2, s * .06));
                break;
            }
            case 'frozenbox': {
                const bw = Math.max(24, s * .76), bh = Math.max(18, s * .58);
                block(g, light, -bw / 2, y - bh * .44, bw, bh * .88, 3);
                block(g, accent, -bw / 2, y + bh * .2, bw, bh * .17, 1);
                line(g, edge, lw, [[0, y + bh * .08], [0, y - bh * .27]]);
                line(g, edge, lw, [[-bw * .17, y - bh * .09], [bw * .17, y - bh * .09]]);
                line(g, edge, lw, [[-bw * .11, y + bh * .06], [bw * .11, y - bh * .22]]);
                line(g, edge, lw, [[bw * .11, y + bh * .06], [-bw * .11, y - bh * .22]]);
                break;
            }
            case 'tv': {
                const bw = Math.min(width * .68, size * 1.9), bh = Math.max(16, s * .48);
                block(g, edge, -bw / 2, y - bh * .28, bw, bh * .62, 3);
                block(g, accent, -bw / 2 + 3, y - bh * .21, bw - 6, bh * .47, 2);
                shape(g, new cc_1.Color(235, 252, 250, 150), [[-bw * .34, y + bh * .2], [-bw * .14, y + bh * .2], [-bw * .32, y - bh * .14]]);
                block(g, edge, -bw * .28, y - bh * .46, bw * .56, bh * .14, 1);
                line(g, tone.light, lw, [[-bw * .1, y + bh * .08], [bw * .22, y - bh * .1]]);
                break;
            }
            case 'painting': {
                const bw = Math.max(22, s * .56), bh = Math.max(18, s * .78);
                block(g, tone.light, -bw / 2, y - bh * .42, bw, bh * .84, 2);
                block(g, accent, -bw / 2 + 3, y - bh * .36, bw - 6, bh * .1, 1);
                block(g, accent, -bw * .34, y - bh * .2, bw * .25, bh * .34, 1);
                line(g, tone.base, Math.max(1, s * .035), [[-bw * .03, y + bh * .28], [-bw * .03, y - bh * .02]]);
                line(g, tone.base, Math.max(1, s * .035), [[bw * .2, y + bh * .2], [bw * .2, y - bh * .12]]);
                block(g, accent, bw * .16, y - bh * .4, bw * .07, bw * .07, 1);
                block(g, edge, bw * .2, y + bh * .45, bw * .18, bh * .1, 1);
                break;
            }
            case 'duck': {
                const bw = Math.max(22, s * .72), bh = Math.max(18, s * .5);
                block(g, tone.light, -bw / 2, y - bh * .25, bw, bh * .56, bh * .25);
                dot(g, tone.light, bw * .29, y + bh * .22, Math.max(4, s * .12));
                shape(g, accent, [[bw * .39, y + bh * .22], [bw * .57, y + bh * .16], [bw * .4, y + bh * .1]]);
                shape(g, light, [[-bw * .17, y + bh * .05], [bw * .04, y + bh * .16], [bw * .12, y - bh * .05], [-bw * .1, y - bh * .12]]);
                line(g, edge, lw, [[-bw * .42, y - bh * .23], [bw * .05, y - bh * .1], [bw * .48, y - bh * .19]]);
                line(g, edge, lw, [[0, y + bh * .32], [0, y + bh * .55]]);
                break;
            }
            case 'sausage': {
                const bw = Math.min(width * .72, size * 2.1), bh = Math.max(16, s * .45);
                for (const [ox, oy] of [[-bw * .3, bh * .18], [0, -bh * .02], [bw * .3, bh * .16]]) {
                    block(g, tone.light, ox - bw * .19, oy - bh * .24, bw * .38, bh * .48, bh * .24);
                    line(g, accent, Math.max(1, s * .035), [[ox - bw * .06, oy - bh * .22], [ox + bw * .06, oy + bh * .22]]);
                }
                line(g, edge, lw, [[-bw * .48, y + bh * .32], [0, y + bh * .45], [bw * .48, y + bh * .3]]);
                break;
            }
            case 'fish': {
                const bw = Math.min(width * .68, size * 1.9), bh = Math.max(16, s * .46);
                block(g, tone.light, -bw * .34, y - bh * .32, bw * .66, bh * .64, bh * .3);
                shape(g, accent, [[bw * .27, y], [bw * .5, y + bh * .3], [bw * .47, y - bh * .3]]);
                shape(g, light, [[-bw * .1, y + bh * .05], [-bw * .24, y + bh * .3], [bw * .02, y + bh * .18]]);
                dot(g, edge, -bw * .33, y + bh * .08, Math.max(1.5, s * .04));
                line(g, edge, lw, [[-bw * .7, y], [bw * .5, y]]);
                break;
            }
            case 'suitcase_s':
            case 'suitcase_l': {
                const bw = Math.max(24, s * .68), bh = Math.max(20, s * .58);
                block(g, tone.light, -bw / 2, y - bh * .4, bw, bh * .78, 3);
                line(g, accent, Math.max(2, s * .06), [[-bw * .24, y + bh * .38], [-bw * .24, y + bh * .56], [bw * .24, y + bh * .56], [bw * .24, y + bh * .38]]);
                block(g, accent, -bw * .34, y - bh * .34, bw * .12, bh * .68, 1);
                block(g, accent, bw * .22, y - bh * .34, bw * .12, bh * .68, 1);
                dot(g, edge, -bw * .35, y - bh * .45, Math.max(1.5, s * .04));
                dot(g, edge, bw * .35, y - bh * .45, Math.max(1.5, s * .04));
                break;
            }
            case 'duffel': {
                const bw = Math.max(26, s * .8), bh = Math.max(17, s * .48);
                block(g, tone.light, -bw / 2, y - bh * .32, bw, bh * .64, bh * .24);
                line(g, accent, Math.max(2, s * .055), [[-bw * .25, y + bh * .35], [-bw * .12, y + bh * .56], [bw * .12, y + bh * .56], [bw * .25, y + bh * .35]]);
                line(g, edge, lw, [[-bw * .43, y - bh * .06], [bw * .43, y - bh * .06]]);
                block(g, accent, bw * .34, y - bh * .1, bw * .08, bh * .22, 2);
                break;
            }
            case 'quilt': {
                const bw = Math.max(25, s * .76), bh = Math.max(17, s * .52);
                block(g, tone.light, -bw / 2, y - bh * .3, bw, bh * .5, 4);
                block(g, accent, -bw / 2, y + bh * .14, bw, bh * .18, 3);
                line(g, edge, Math.max(1, s * .035), [[-bw * .38, y - bh * .1], [bw * .38, y + bh * .14]]);
                line(g, edge, Math.max(1, s * .035), [[-bw * .38, y + bh * .14], [bw * .38, y - bh * .1]]);
                line(g, accent, Math.max(1, s * .03), [[-bw * .4, y + bh * .23], [bw * .4, y + bh * .23]]);
                break;
            }
            case 'coop': {
                const bw = Math.max(24, s * .72), bh = Math.max(20, s * .58);
                block(g, new cc_1.Color(66, 58, 48, 70), -bw / 2, y - bh * .4, bw, bh * .8, 3);
                line(g, edge, lw, [[-bw / 2, y - bh * .4], [-bw / 2, y + bh * .4], [bw / 2, y + bh * .4], [bw / 2, y - bh * .4]]);
                line(g, accent, Math.max(1, s * .035), [[-bw * .25, y - bh * .35], [-bw * .25, y + bh * .35]]);
                line(g, accent, Math.max(1, s * .035), [[0, y - bh * .35], [0, y + bh * .35]]);
                line(g, accent, Math.max(1, s * .035), [[bw * .25, y - bh * .35], [bw * .25, y + bh * .35]]);
                line(g, edge, lw, [[-bw * .24, y + bh * .4], [0, y + bh * .58], [bw * .24, y + bh * .4]]);
                break;
            }
            case 'crab': {
                const bw = Math.max(25, s * .72), bh = Math.max(17, s * .5);
                block(g, tone.light, -bw / 2, y - bh * .39, bw, bh * .74, 3);
                block(g, accent, -bw / 2, y + bh * .18, bw, bh * .16, 1);
                block(g, edge, -bw * .25, y - bh * .05, bw * .5, bh * .22, bh * .11);
                line(g, edge, Math.max(2, s * .05), [[-bw * .24, y + bh * .06], [-bw * .43, y + bh * .28], [-bw * .5, y + bh * .13]]);
                line(g, edge, Math.max(2, s * .05), [[bw * .24, y + bh * .06], [bw * .43, y + bh * .28], [bw * .5, y + bh * .13]]);
                dot(g, accent, -bw * .1, y + bh * .08, Math.max(1.5, s * .035));
                dot(g, accent, bw * .1, y + bh * .08, Math.max(1.5, s * .035));
                break;
            }
            case 'lotusroot': {
                const bw = Math.min(width * .72, size * 2.1), bh = Math.max(15, s * .42);
                block(g, tone.light, -bw / 2, y - bh * .28, bw * .55, bh * .56, bh * .26);
                block(g, tone.light, bw * .01, y - bh * .18, bw * .43, bh * .42, bh * .2);
                dot(g, edge, -bw * .28, y, Math.max(1.4, s * .035));
                dot(g, edge, -bw * .12, y, Math.max(1.4, s * .035));
                dot(g, edge, bw * .15, y + bh * .02, Math.max(1.4, s * .035));
                line(g, accent, Math.max(1, s * .03), [[-bw * .02, y - bh * .22], [-bw * .02, y + bh * .22]]);
                break;
            }
            case 'couplets': {
                const bw = Math.max(24, s * .7), bh = Math.max(20, s * .7);
                for (const ox of [-bw * .28, bw * .28]) {
                    block(g, tone.light, ox - bw * .13, y - bh * .4, bw * .26, bh * .8, 2);
                    block(g, accent, ox - bw * .13, y + bh * .22, bw * .26, bh * .12, 1);
                    block(g, accent, ox - bw * .13, y - bh * .34, bw * .26, bh * .09, 1);
                    line(g, edge, Math.max(1, s * .035), [[ox, y + bh * .16], [ox, y - bh * .22]]);
                }
                line(g, accent, Math.max(2, s * .05), [[-bw * .15, y + bh * .42], [0, y + bh * .52], [bw * .15, y + bh * .42]]);
                dot(g, accent, 0, y + bh * .46, Math.max(2, s * .06));
                break;
            }
            case 'ricecooker': {
                const bw = Math.max(25, s * .72), bh = Math.max(18, s * .55);
                block(g, tone.light, -bw / 2, y - bh * .3, bw, bh * .64, bh * .16);
                block(g, accent, -bw * .42, y + bh * .18, bw * .84, bh * .16, bh * .08);
                line(g, edge, lw, [[-bw * .3, y + bh * .36], [-bw * .15, y + bh * .55], [bw * .15, y + bh * .55], [bw * .3, y + bh * .36]]);
                dot(g, accent, bw * .33, y + bh * .05, Math.max(2, s * .06));
                break;
            }
            default:
                line(g, accent, Math.max(2, s * .06), [[-s * .22, y - s * .2], [s * .22, y + s * .2]]);
                line(g, accent, Math.max(2, s * .06), [[-s * .22, y + s * .2], [s * .22, y - s * .2]]);
        }
    }
    exports_1("drawItemFeature", drawItemFeature);
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (items_1_1) {
                items_1 = items_1_1;
            }
        ],
        execute: function () {
            tones = {
                liquor: { hex: '#EDF3F7', base: new cc_1.Color(237, 243, 247), edge: new cc_1.Color(27, 70, 113), accent: new cc_1.Color(49, 112, 164), light: new cc_1.Color(255, 255, 255) },
                sausage: { hex: '#8B3B3B', base: new cc_1.Color(139, 59, 59), edge: new cc_1.Color(63, 18, 18), accent: new cc_1.Color(224, 146, 99), light: new cc_1.Color(193, 88, 72) },
                ricecooker: { hex: '#D8DDD8', base: new cc_1.Color(216, 221, 216), edge: new cc_1.Color(70, 78, 77), accent: new cc_1.Color(87, 157, 146), light: new cc_1.Color(246, 248, 243) },
                sugarcane: { hex: '#6DA552', base: new cc_1.Color(109, 165, 82), edge: new cc_1.Color(38, 82, 48), accent: new cc_1.Color(112, 63, 137), light: new cc_1.Color(187, 222, 135) },
                milk: { hex: '#F4F6ED', base: new cc_1.Color(244, 246, 237), edge: new cc_1.Color(46, 95, 65), accent: new cc_1.Color(58, 135, 83), light: new cc_1.Color(255, 255, 255) },
                suitcase_s: { hex: '#3B607C', base: new cc_1.Color(59, 96, 124), edge: new cc_1.Color(24, 44, 59), accent: new cc_1.Color(244, 194, 76), light: new cc_1.Color(124, 164, 184) },
                duffel: { hex: '#BE8B44', base: new cc_1.Color(190, 139, 68), edge: new cc_1.Color(85, 53, 31), accent: new cc_1.Color(238, 213, 166), light: new cc_1.Color(232, 179, 100) },
                nutbox: { hex: '#87542F', base: new cc_1.Color(135, 84, 47), edge: new cc_1.Color(66, 38, 23), accent: new cc_1.Color(222, 164, 85), light: new cc_1.Color(171, 113, 66) },
                fish: { hex: '#73A2AE', base: new cc_1.Color(115, 162, 174), edge: new cc_1.Color(39, 76, 88), accent: new cc_1.Color(220, 240, 234), light: new cc_1.Color(159, 201, 206) },
                duck: { hex: '#AE6036', base: new cc_1.Color(174, 96, 54), edge: new cc_1.Color(86, 41, 28), accent: new cc_1.Color(236, 171, 85), light: new cc_1.Color(207, 128, 76) },
                quilt: { hex: '#CFA4B2', base: new cc_1.Color(207, 164, 178), edge: new cc_1.Color(100, 62, 78), accent: new cc_1.Color(247, 220, 215), light: new cc_1.Color(236, 198, 203) },
                frozenbox: { hex: '#B8E1EB', base: new cc_1.Color(184, 225, 235), edge: new cc_1.Color(48, 103, 124), accent: new cc_1.Color(239, 252, 255), light: new cc_1.Color(255, 255, 255) },
                tv: { hex: '#4D5664', base: new cc_1.Color(77, 86, 100), edge: new cc_1.Color(30, 33, 39), accent: new cc_1.Color(157, 210, 220), light: new cc_1.Color(112, 124, 140) },
                coop: { hex: '#BF9A53', base: new cc_1.Color(191, 154, 83), edge: new cc_1.Color(83, 63, 37), accent: new cc_1.Color(240, 213, 147), light: new cc_1.Color(220, 184, 113) },
                crab: { hex: '#346F67', base: new cc_1.Color(52, 111, 103), edge: new cc_1.Color(24, 57, 53), accent: new cc_1.Color(239, 129, 86), light: new cc_1.Color(104, 157, 143) },
                painting: { hex: '#E7C782', base: new cc_1.Color(231, 199, 130), edge: new cc_1.Color(115, 73, 48), accent: new cc_1.Color(196, 53, 47), light: new cc_1.Color(255, 238, 193) },
                lotusroot: { hex: '#DDCDA6', base: new cc_1.Color(221, 205, 166), edge: new cc_1.Color(110, 85, 62), accent: new cc_1.Color(96, 65, 53), light: new cc_1.Color(244, 232, 203) },
                couplets: { hex: '#E1B858', base: new cc_1.Color(225, 184, 88), edge: new cc_1.Color(128, 59, 36), accent: new cc_1.Color(190, 56, 48), light: new cc_1.Color(250, 222, 143) },
                suitcase_l: { hex: '#5A4482', base: new cc_1.Color(90, 68, 130), edge: new cc_1.Color(47, 33, 69), accent: new cc_1.Color(231, 170, 75), light: new cc_1.Color(142, 115, 177) },
            };
            fallback = { hex: '#4E7D78', base: new cc_1.Color(78, 125, 120), edge: new cc_1.Color(30, 55, 52), accent: new cc_1.Color(238, 196, 105), light: new cc_1.Color(128, 170, 161) };
        }
    };
});

System.register("chunks:///_virtual/JourneyArt.ts", ["cc","./UIKit.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, UIKit_1, ink, night, hillside, roofs, gold, lantern, windowLight;
    var __moduleName = context_1 && context_1.id;
    function drawHomeRoad(graphics, width, height, top) {
        const y = (value) => height / 2 - top - value;
        const x = (value) => value - width / 2;
        const rect = (left, at, w, h, color, radius = 0) => {
            UIKit_1.fill(graphics, color, x(left), y(at + h), w, h, radius);
        };
        const polygon = (points, color) => {
            graphics.fillColor = color;
            graphics.moveTo(x(points[0][0]), y(points[0][1]));
            for (const [px, py] of points.slice(1))
                graphics.lineTo(x(px), y(py));
            graphics.close();
            graphics.fill();
        };
        const circle = (left, at, radius, color) => {
            graphics.fillColor = color;
            graphics.circle(x(left), y(at), radius);
            graphics.fill();
        };
        rect(0, 0, width, 248, night);
        circle(627, 112, 40, new cc_1.Color(184, 93, 63));
        polygon([[0, 190], [92, 145], [165, 171], [265, 157], [345, 190], [460, 153], [555, 183], [652, 141], [750, 184], [750, 248], [0, 248]], hillside);
        polygon([[0, 210], [153, 197], [283, 213], [414, 192], [574, 210], [686, 191], [750, 207], [750, 248], [0, 248]], ink);
        polygon([[0, 248], [750, 248], [450, 220], [403, 212], [369, 213], [418, 224], [165, 248]], roofs);
        polygon([[256, 248], [333, 248], [390, 233], [379, 232]], gold);
        polygon([[408, 228], [425, 228], [443, 224], [435, 223]], gold);
        for (const [left, base, w] of [[85, 220, 48], [137, 213, 37], [599, 225, 55], [659, 219, 38]]) {
            rect(left, base - 24, w, 24, roofs);
            polygon([[left - 7, base - 24], [left + w / 2, base - 44], [left + w + 7, base - 24]], ink);
            rect(left + 10, base - 15, 8, 9, windowLight, 2);
            rect(left + w - 18, base - 15, 8, 9, windowLight, 2);
        }
        for (const [left, at] of [[52, 64], [698, 70]]) {
            rect(left - 1, 0, 2, at - 14, gold);
            rect(left - 16, at - 13, 32, 29, lantern, 12);
            rect(left - 9, at - 15, 18, 4, gold, 2);
            rect(left - 9, at + 13, 18, 4, gold, 2);
            rect(left - 1, at + 17, 2, 13, gold);
        }
    }
    exports_1("drawHomeRoad", drawHomeRoad);
    function drawWelcomeHome(graphics) {
        const red = new cc_1.Color(164, 55, 46);
        const brick = new cc_1.Color(207, 126, 86);
        UIKit_1.fill(graphics, new cc_1.Color(247, 224, 191), -245, 10, 490, 240, 30);
        UIKit_1.fill(graphics, brick, -138, 35, 276, 127, 5);
        graphics.fillColor = ink;
        graphics.moveTo(-162, 152);
        graphics.lineTo(0, 224);
        graphics.lineTo(162, 152);
        graphics.close();
        graphics.fill();
        UIKit_1.fill(graphics, red, -37, 35, 74, 91, 5);
        UIKit_1.fill(graphics, gold, -9, 72, 18, 18, 4);
        for (const left of [-111, 69]) {
            UIKit_1.fill(graphics, ink, left - 4, 79, 52, 48, 6);
            UIKit_1.fill(graphics, windowLight, left, 83, 44, 40, 3);
            UIKit_1.fill(graphics, ink, left + 20, 83, 3, 40);
            UIKit_1.fill(graphics, ink, left, 101, 44, 3);
        }
        for (const left of [-181, 149]) {
            UIKit_1.fill(graphics, red, left, 116, 32, 43, 13);
            UIKit_1.fill(graphics, gold, left + 7, 111, 18, 5, 2);
        }
        UIKit_1.fill(graphics, red, -104, 27, 208, 7, 3);
    }
    exports_1("drawWelcomeHome", drawWelcomeHome);
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            }
        ],
        execute: function () {
            ink = new cc_1.Color(51, 30, 42);
            night = new cc_1.Color(70, 38, 48);
            hillside = new cc_1.Color(106, 51, 52);
            roofs = new cc_1.Color(126, 60, 52);
            gold = new cc_1.Color(255, 194, 101);
            lantern = new cc_1.Color(204, 63, 55);
            windowLight = new cc_1.Color(255, 214, 141);
        }
    };
});

System.register("chunks:///_virtual/ProvincePicker.ts", ["cc","./provinces.ts","./UIKit.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, provinces_1, UIKit_1, deep, panel, gold, paleGold, cream, ink, cell, cellGlow, ProvincePicker;
    var __moduleName = context_1 && context_1.id;
    function contains(rect, x, y) {
        return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
    }
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (provinces_1_1) {
                provinces_1 = provinces_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            }
        ],
        execute: function () {
            deep = new cc_1.Color(30, 8, 18, 246);
            panel = new cc_1.Color(121, 24, 34, 250);
            gold = new cc_1.Color(255, 207, 111);
            paleGold = new cc_1.Color(255, 231, 173);
            cream = new cc_1.Color(255, 246, 229);
            ink = new cc_1.Color(76, 30, 20);
            cell = new cc_1.Color(80, 17, 28, 245);
            cellGlow = new cc_1.Color(255, 216, 136, 34);
            /** Reusable five-column province chooser. Geometry is independent of the page that opens it. */
            ProvincePicker = class ProvincePicker {
                constructor(parent, height, current, actions) {
                    this.actions = actions;
                    this.cells = [];
                    this.width = 750;
                    this.destroyed = false;
                    this.height = Math.max(1334, height);
                    this.node = UIKit_1.uiNode('ProvincePicker', parent, this.width, this.height);
                    const backdrop = UIKit_1.uiNode('PickerBackdrop', this.node, this.width, this.height).addComponent(cc_1.Graphics);
                    UIKit_1.fill(backdrop, new cc_1.Color(5, 7, 18, 208), -375, -this.height / 2, 750, this.height);
                    UIKit_1.fill(backdrop, new cc_1.Color(0, 0, 0, 72), -375, -this.height / 2, 750, this.height);
                    const columns = 5;
                    const cellW = 118;
                    const cellH = 52;
                    const gap = 10;
                    const gridW = columns * cellW + (columns - 1) * gap;
                    const rows = Math.ceil(provinces_1.PROVINCES.length / columns);
                    const panelW = 690;
                    const panelH = 88 + rows * cellH + (rows - 1) * gap + 78;
                    const panelX = (this.width - panelW) / 2;
                    const panelY = Math.round((this.height - panelH) / 2);
                    const gridX = Math.round((this.width - gridW) / 2);
                    const gridY = panelY + 88;
                    const art = UIKit_1.uiNode('PickerChrome', this.node, this.width, this.height).addComponent(cc_1.Graphics);
                    const box = (color, x, y, w, h, radius = 0) => {
                        UIKit_1.fill(art, color, x - 375, this.height / 2 - y - h, w, h, radius);
                    };
                    const strokeBox = (x, y, w, h, radius) => {
                        art.roundRect(x - 375, this.height / 2 - y - h, w, h, radius);
                        art.stroke();
                    };
                    box(new cc_1.Color(8, 5, 14, 180), panelX + 7, panelY + 9, panelW, panelH, 34);
                    box(gold, panelX, panelY, panelW, panelH, 34);
                    box(deep, panelX + 5, panelY + 5, panelW - 10, panelH - 10, 30);
                    box(panel, panelX + 12, panelY + 12, panelW - 24, panelH - 24, 26);
                    box(new cc_1.Color(255, 219, 145, 42), panelX + 20, panelY + 18, panelW - 40, 2, 1);
                    box(new cc_1.Color(255, 209, 121, 34), panelX + 18, panelY + 65, panelW - 36, 1, 1);
                    const title = UIKit_1.label(this.node, 'PickerTitle', '选择你的省份', 38, 0, this.height / 2 - (panelY + 36));
                    title.color = paleGold;
                    const subtitle = UIKit_1.label(this.node, 'PickerSubtitle', '为家乡而战 · 可随时修改', 19, 0, this.height / 2 - (panelY + 66));
                    subtitle.color = cream;
                    for (let index = 0; index < provinces_1.PROVINCES.length; index++) {
                        const province = provinces_1.PROVINCES[index];
                        const column = index % columns;
                        const row = Math.floor(index / columns);
                        const x = gridX + column * (cellW + gap);
                        const y = gridY + row * (cellH + gap);
                        const selected = province === current;
                        box(selected ? gold : cell, x, y + 3, cellW, cellH, 16);
                        if (!selected) {
                            box(cellGlow, x + 2, y + 5, cellW - 4, cellH - 4, 14);
                            art.strokeColor = new cc_1.Color(255, 207, 111, 150);
                            art.lineWidth = 1.5;
                            strokeBox(x + 1, y + 1, cellW - 2, cellH - 2, 16);
                        }
                        const text = UIKit_1.label(this.node, `Province-${province}`, province, 22, 0, 0);
                        text.node.getComponent(cc_1.UITransform).setContentSize(cellW - 8, cellH);
                        text.overflow = cc_1.Label.Overflow.SHRINK;
                        text.node.setPosition(x + cellW / 2 - 375, this.height / 2 - (y + cellH / 2));
                        text.color = selected ? ink : cream;
                        text.isBold = selected;
                        this.cells.push({ province, x, y, w: cellW, h: cellH, node: text.node });
                    }
                    this.cancelRect = {
                        x: Math.round((this.width - 220) / 2),
                        y: panelY + panelH - 66,
                        w: 220,
                        h: 52,
                    };
                    box(new cc_1.Color(255, 231, 173, 18), this.cancelRect.x, this.cancelRect.y, this.cancelRect.w, this.cancelRect.h, 16);
                    art.strokeColor = new cc_1.Color(255, 207, 111, 150);
                    art.lineWidth = 1.5;
                    strokeBox(this.cancelRect.x, this.cancelRect.y, this.cancelRect.w, this.cancelRect.h, 16);
                    const cancel = UIKit_1.label(this.node, 'PickerCancel', '取消', 22, 0, this.height / 2 - (this.cancelRect.y + this.cancelRect.h / 2));
                    cancel.color = paleGold;
                    this.debugHook = Object.freeze({
                        getState: () => this.debugState(),
                        press: (x, y) => this.press(x, y),
                    });
                    if (typeof window !== 'undefined') {
                        window.__provincePicker = this.debugHook;
                    }
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => {
                        this.destroyed = true;
                        if (typeof window !== 'undefined'
                            && window.__provincePicker === this.debugHook) {
                            delete window.__provincePicker;
                        }
                    });
                }
                press(x, y) {
                    if (this.destroyed)
                        return false;
                    for (const cell of this.cells) {
                        if (!contains(cell, x, y))
                            continue;
                        const province = cell.province;
                        this.close();
                        this.actions.onSelect(province);
                        return true;
                    }
                    if (contains(this.cancelRect, x, y)) {
                        this.close();
                        this.actions.onCancel();
                    }
                    return true;
                }
                close() {
                    if (!this.destroyed && this.node.isValid)
                        this.node.destroy();
                }
                debugState() {
                    const screenWidth = typeof window === 'undefined' ? this.width : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    const points = this.cells.map(item => ({
                        province: item.province,
                        screenX: (item.x + item.w / 2) / this.width * screenWidth,
                        screenY: (item.y + item.h / 2) / this.height * screenHeight,
                        screenLeft: item.x / this.width * screenWidth,
                        screenRight: (item.x + item.w) / this.width * screenWidth,
                        screenTop: item.y / this.height * screenHeight,
                        screenBottom: (item.y + item.h) / this.height * screenHeight,
                    }));
                    return {
                        visible: !this.destroyed,
                        provinceCount: points.length,
                        points,
                        cancel: {
                            screenX: (this.cancelRect.x + this.cancelRect.w / 2) / this.width * screenWidth,
                            screenY: (this.cancelRect.y + this.cancelRect.h / 2) / this.height * screenHeight,
                        },
                    };
                }
            };
            exports_1("ProvincePicker", ProvincePicker);
        }
    };
});

System.register("chunks:///_virtual/StackFinishView.ts", ["cc","./FinishTimeline.ts","./InteractionGeometry.ts","./OptionalResources.ts","./stack-share.ts","./UIKit.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, FinishTimeline_1, InteractionGeometry_1, OptionalResources_1, stack_share_1, UIKit_1, red, darkRed, gold, pale, ink, night, StackFinishView, BODY_HOLE;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (FinishTimeline_1_1) {
                FinishTimeline_1 = FinishTimeline_1_1;
            },
            function (InteractionGeometry_1_1) {
                InteractionGeometry_1 = InteractionGeometry_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (stack_share_1_1) {
                stack_share_1 = stack_share_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            }
        ],
        execute: function () {
            red = new cc_1.Color(188, 34, 43);
            darkRed = new cc_1.Color(83, 22, 29);
            gold = new cc_1.Color(255, 207, 111);
            pale = new cc_1.Color(255, 242, 208);
            ink = new cc_1.Color(63, 29, 24);
            night = new cc_1.Color(12, 15, 34, 150);
            /** Stack-mode celebration: the night backdrop stays visible while the loaded car closes up and drives away. */
            StackFinishView = class StackFinishView {
                constructor(parent, choices, stats, onAction, onShare = () => undefined, onRank, 
                /** Non-sedan ride of this level: its art drives home instead of the sedan. */
                ride) {
                    this.choices = choices;
                    this.stats = stats;
                    this.onAction = onAction;
                    this.onShare = onShare;
                    this.onRank = onRank;
                    this.ride = ride;
                    this.cargoSprites = [];
                    this.rankText = null;
                    this.buttons = [];
                    this.height = 1334;
                    this.ready = false;
                    this.squeeze = 0;
                    this.trunkY = -39;
                    this.hole = { x: 0, y: -39, w: 506, h: 226 };
                    this.node = UIKit_1.uiNode('StackFinish', parent, 750, 1334);
                    this.backdrop = UIKit_1.uiNode('NightBackdrop', this.node, 750, 1334).addComponent(cc_1.Sprite);
                    this.backdrop.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    this.backdrop.trim = false;
                    this.backdrop.enabled = false;
                    void OptionalResources_1.loadArt('ui/bg_night').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.backdrop.spriteFrame = frame;
                        this.backdrop.enabled = true;
                        this.layout(this.height);
                    });
                    this.wash = UIKit_1.uiNode('NightWash', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.car = UIKit_1.uiNode('HomewardCar', this.node, 760, 520);
                    this.carFallback = UIKit_1.uiNode('CarFallback', this.car, 760, 520).addComponent(cc_1.Graphics);
                    this.trunkImage = this.imageNode('TrunkWell', this.car);
                    this.cargo = UIKit_1.uiNode('TrunkCargo', this.car, 720, 450);
                    for (let index = 0; index < stack_share_1.STACK_SHARE_ITEM_KEYS.length; index++) {
                        this.cargoSprites.push(this.imageNode(`CargoItem${index}`, this.cargo));
                    }
                    this.bodyImage = this.imageNode('CarBody', this.car);
                    if (ride) {
                        // Cargo rides on top of the load area, so it must draw above the vehicle art.
                        this.cargo.setSiblingIndex(this.car.children.length - 1);
                    }
                    void Promise.all(ride ? [OptionalResources_1.loadArt(ride.art), Promise.resolve(null)] : [
                        OptionalResources_1.loadArt('vehicles/sedan_v1_body'),
                        OptionalResources_1.loadArt('vehicles/sedan_v1_trunk'),
                    ]).then(([body, trunk]) => {
                        if (!this.node.isValid)
                            return;
                        if (trunk) {
                            this.trunkImage.spriteFrame = trunk;
                            this.trunkImage.enabled = true;
                        }
                        if (body) {
                            this.bodyImage.spriteFrame = body;
                            this.bodyImage.enabled = true;
                            this.carFallback.enabled = false;
                        }
                        this.ready = true;
                        this.layout(this.height);
                        if (this.state)
                            this.render(this.state);
                    });
                    void Promise.all(stack_share_1.STACK_SHARE_ITEM_KEYS.map(key => OptionalResources_1.loadArt(`items/${key}`))).then(frames => {
                        if (!this.node.isValid)
                            return;
                        for (let index = 0; index < frames.length && index < this.cargoSprites.length; index++) {
                            const frame = frames[index];
                            if (!frame)
                                continue;
                            this.cargoSprites[index].spriteFrame = frame;
                            this.cargoSprites[index].enabled = true;
                        }
                        this.layoutCargo();
                    });
                    this.headline = UIKit_1.uiNode('HomeBanner', this.node, 750, 230);
                    const banner = this.headline.addComponent(cc_1.Graphics);
                    UIKit_1.fill(banner, new cc_1.Color(90, 23, 29, 232), -330, -63, 660, 126, 28);
                    UIKit_1.fill(banner, gold, -322, -55, 644, 110, 23);
                    UIKit_1.fill(banner, red, -315, -48, 630, 96, 19);
                    UIKit_1.label(this.headline, 'FinishTitle', '塞满了！回家！', 58, 0, 6).color = pale;
                    this.statsLabel = UIKit_1.uiNode('FinishStats', this.node, 700, 92);
                    const statsBg = this.statsLabel.addComponent(cc_1.Graphics);
                    UIKit_1.fill(statsBg, new cc_1.Color(112, 25, 32, 245), -290, -35, 580, 70, 24);
                    statsBg.strokeColor = new cc_1.Color(255, 207, 111, 190);
                    statsBg.lineWidth = 2;
                    statsBg.roundRect(-288, -33, 576, 66, 22);
                    statsBg.stroke();
                    UIKit_1.fill(statsBg, new cc_1.Color(255, 219, 145, 46), -280, -27, 560, 54, 18);
                    UIKit_1.label(this.statsLabel, 'StatsText', this.statsText(), 26, 0, 0).color = pale;
                    this.rankLabel = UIKit_1.uiNode('FinishRank', this.node, 720, 58);
                    const rankBg = this.rankLabel.addComponent(cc_1.Graphics);
                    UIKit_1.fill(rankBg, new cc_1.Color(49, 12, 22, 168), -306, -24, 612, 48, 18);
                    this.rankTextLabel = UIKit_1.label(this.rankLabel, 'FinishRankText', '', 23, 0, 0);
                    this.rankTextLabel.color = pale;
                    this.rankLabel.active = false;
                    this.actions = UIKit_1.uiNode('FinishActions', this.node, 750, 320);
                    this.actionArt = this.actions.addComponent(cc_1.Graphics);
                    const choicesWithShare = [
                        ...choices,
                        { title: '生成分享图', action: 'share' },
                        ...(this.onRank ? [{ title: '看省份排行', action: 'rank' }] : []),
                    ];
                    for (let index = 0; index < choicesWithShare.length; index++) {
                        const choice = choicesWithShare[index];
                        const text = UIKit_1.label(this.actions, `FinishButton${index}`, choice.title, 30, 0, 0);
                        text.color = index === 0 ? ink : gold;
                        this.buttons.push({ action: choice.action, rect: { x: 125, y: 0, w: 500, h: 74 }, label: text.node });
                    }
                    UIKit_1.label(this.node, 'SkipHint', '轻点屏幕 · 立即出发', 22, 0, 0).color = gold;
                    this.layout(this.height);
                }
                layout(height) {
                    this.height = height;
                    this.node.getComponent(cc_1.UITransform).setContentSize(750, height);
                    const scale = Math.max(1, height / 1334);
                    this.backdrop.node.getComponent(cc_1.UITransform).setContentSize(750 * scale, 1334 * scale);
                    this.backdrop.node.setPosition(0, 0);
                    this.wash.clear();
                    UIKit_1.fill(this.wash, night, -375, -height / 2, 750, height, 0);
                    this.drawCarFallback();
                    // Tall phones leave a gap between the car and the bottom buttons; lower the car and banner into it.
                    this.squeeze = Math.min(110, Math.max(0, (height - 1334) * .38));
                    this.headline.setPosition(0, height / 2 - 207 - this.squeeze);
                    this.statsLabel.setPosition(0, height / 2 - 380 - this.squeeze);
                    this.rankLabel.setPosition(0, height / 2 - 438 - this.squeeze);
                    const actionsY = -height / 2 + 300;
                    this.actions.setPosition(0, actionsY);
                    this.actionArt.clear();
                    const baseY = 68;
                    for (let index = 0; index < this.buttons.length; index++) {
                        const button = this.buttons[index];
                        const localY = baseY - index * 92;
                        button.rect.y = height / 2 - (actionsY + localY) - 37;
                        button.label.setPosition(0, localY);
                        UIKit_1.fill(this.actionArt, index === 0 ? gold : darkRed, -250, localY - 37, 500, 74, 22);
                        if (index !== 0) {
                            this.actionArt.strokeColor = gold;
                            this.actionArt.lineWidth = 2;
                            this.actionArt.roundRect(-248, localY - 35, 496, 70, 20);
                            this.actionArt.stroke();
                        }
                    }
                    this.node.getChildByName('SkipHint').setPosition(0, -height / 2 + 86);
                    this.setupCar();
                    if (this.state)
                        this.render(this.state);
                }
                render(state) {
                    this.state = state;
                    const drive = Math.max(0, Math.min(1, (state.time - 1050) / (FinishTimeline_1.FINISH_DURATION - 1050)));
                    const carScale = .98 - .12 * drive;
                    this.car.setScale(carScale, carScale, 1);
                    this.car.setPosition(0, -this.height * .035 + this.height * .055 * drive - this.squeeze * 1.65);
                    this.headline.active = state.celebration;
                    this.statsLabel.active = state.celebration;
                    this.rankLabel.active = state.celebration && !!this.rankText;
                    this.actions.active = state.buttons;
                    this.node.getChildByName('SkipHint').active = !state.buttons;
                }
                press(x, y) {
                    var _a, _b;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.buttons))
                        return;
                    for (const button of this.buttons) {
                        if (!InteractionGeometry_1.inRect({ x, y }, button.rect))
                            continue;
                        if (button.action === 'share')
                            this.onShare();
                        else if (button.action === 'rank')
                            (_b = this.onRank) === null || _b === void 0 ? void 0 : _b.call(this);
                        else
                            this.onAction(button.action);
                        return;
                    }
                }
                setRankStatus(text) {
                    var _a;
                    this.rankText = text;
                    this.rankTextLabel.string = text !== null && text !== void 0 ? text : '';
                    this.rankLabel.active = !!text && !!((_a = this.state) === null || _a === void 0 ? void 0 : _a.celebration);
                }
                get rankStatusText() { return this.rankText; }
                get statsLine() { return this.statsText(); }
                buttonPoints() {
                    return this.buttons.map(button => {
                        var _a, _b;
                        return ({
                            action: button.action,
                            title: (_b = (_a = button.label.getComponent(cc_1.Label)) === null || _a === void 0 ? void 0 : _a.string) !== null && _b !== void 0 ? _b : '',
                            rect: Object.assign({}, button.rect),
                        });
                    });
                }
                imageNode(name, parent) {
                    const sprite = UIKit_1.uiNode(name, parent, 1, 1).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    return sprite;
                }
                setupCar() {
                    var _a;
                    if (this.ride) {
                        const bodyH = 470;
                        const bodyW = Math.min(700, bodyH * this.ride.w / this.ride.h * ((_a = this.ride.stretchX) !== null && _a !== void 0 ? _a : 1));
                        const r = this.ride.region;
                        this.hole = { x: (r.x + r.w / 2 - .5) * bodyW, y: (.5 - (r.y + r.h / 2)) * bodyH + 40, w: r.w * bodyW, h: r.h * bodyH + 80 };
                        this.show(this.bodyImage, 0, 0, bodyW, bodyH);
                        this.trunkImage.enabled = false;
                        this.layoutCargo();
                        this.car.setScale(.98, .98, 1);
                        this.car.setPosition(0, -this.height * .035 - this.squeeze * 1.65);
                        return;
                    }
                    const bodyW = 720, bodyH = 450;
                    const holeX = Math.round((BODY_HOLE.left + BODY_HOLE.right) / 2 / 1024 * bodyW - bodyW / 2);
                    const holeY = Math.round((BODY_HOLE.top + BODY_HOLE.bottom) / 2 / 640 * bodyH - bodyH / 2);
                    const holeW = Math.round((BODY_HOLE.right - BODY_HOLE.left) / 1024 * bodyW);
                    const holeH = Math.round((BODY_HOLE.bottom - BODY_HOLE.top) / 640 * bodyH);
                    this.hole = { x: holeX, y: holeY, w: holeW, h: holeH };
                    this.trunkY = holeY;
                    this.show(this.bodyImage, 0, 0, bodyW, bodyH);
                    this.show(this.trunkImage, 0, this.trunkY, holeW, holeH);
                    this.layoutCargo();
                    this.car.setScale(.98, .98, 1);
                    this.car.setPosition(0, -this.height * .035 - this.squeeze * 1.65);
                }
                layoutCargo() {
                    const { x, y, w, h } = this.hole;
                    const max = Math.min(w * .26, h * .55, 180);
                    for (let index = 0; index < this.cargoSprites.length && index < stack_share_1.STACK_CARGO_POSITIONS.length; index++) {
                        const sprite = this.cargoSprites[index];
                        const frame = sprite.spriteFrame;
                        if (!frame)
                            continue;
                        const [px, py, angle] = stack_share_1.STACK_CARGO_POSITIONS[index];
                        const ratio = frame.rect.width / Math.max(1, frame.rect.height);
                        const width = ratio >= 1 ? max : max * ratio;
                        const height = ratio >= 1 ? max / ratio : max;
                        sprite.node.getComponent(cc_1.UITransform).setContentSize(width, height);
                        // The body art hides the lower part of the hole, so lift the cargo into the visible opening.
                        sprite.node.setPosition(x + (px - .5) * w, y + (.5 - (py * .8 - .15)) * h);
                        sprite.node.angle = -angle * 180 / Math.PI;
                        sprite.enabled = true;
                    }
                }
                drawCarFallback() {
                    const g = this.carFallback;
                    g.clear();
                    UIKit_1.fill(g, new cc_1.Color(20, 13, 24, 95), -345, -235, 690, 480, 54);
                    UIKit_1.fill(g, red, -350, -225, 700, 450, 64);
                    UIKit_1.fill(g, darkRed, -248, -134, 496, 244, 42);
                    UIKit_1.fill(g, new cc_1.Color(25, 21, 33), -232, -121, 464, 214, 34);
                    UIKit_1.fill(g, new cc_1.Color(255, 176, 68), -324, -83, 72, 38, 12);
                    UIKit_1.fill(g, new cc_1.Color(255, 176, 68), 252, -83, 72, 38, 12);
                }
                show(sprite, x, y, width, height) {
                    sprite.node.getComponent(cc_1.UITransform).setContentSize(width, height);
                    sprite.node.setPosition(x, y);
                    sprite.enabled = !!sprite.spriteFrame;
                }
                statsText() {
                    const minutes = Math.floor(this.stats.elapsedSec / 60);
                    const seconds = this.stats.elapsedSec % 60;
                    const time = minutes > 0 ? `${minutes} 分 ${String(seconds).padStart(2, '0')} 秒` : `${seconds} 秒`;
                    return `用时 ${time}  ·  打包 ${this.stats.boxes} 箱`;
                }
            };
            exports_1("StackFinishView", StackFinishView);
            BODY_HOLE = { left: 159, right: 878, top: 104, bottom: 425 };
        }
    };
});

System.register("chunks:///_virtual/StackHomecomingView.ts", ["cc","./InteractionGeometry.ts","./rng.ts","./OptionalResources.ts","./UIKit.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, InteractionGeometry_1, rng_1, OptionalResources_1, UIKit_1, gold, pale, ink, darkRed, STRINGS, HOMECOMING_ARRIVE_MS, StackHomecomingView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (InteractionGeometry_1_1) {
                InteractionGeometry_1 = InteractionGeometry_1_1;
            },
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            }
        ],
        execute: function () {
            gold = new cc_1.Color(255, 207, 111);
            pale = new cc_1.Color(255, 242, 208);
            ink = new cc_1.Color(63, 29, 24);
            darkRed = new cc_1.Color(83, 22, 29);
            /** Firecracker strings painted in bg_home (design units at 750×1334, before cover scaling). */
            STRINGS = [{ x: 45, top: 470, bottom: 790 }, { x: 705, top: 470, bottom: 790 }];
            /** Time for the tractor to roll up the lane to the gate. */
            exports_1("HOMECOMING_ARRIVE_MS", HOMECOMING_ARRIVE_MS = 1800);
            /**
             * Level-9 finale: the family gate at night with parents waving, couplets and lanterns. The tractor
             * rolls up the lane and stops at the door, firecrackers keep popping, and the only ways on are
             * “再走一遍回家路”, the homecoming share image or the home screen — never a next level.
             */
            StackHomecomingView = class StackHomecomingView {
                constructor(parent, stats, onAction, tractorArt = 'vehicles/tractor', tractorSize = { w: 457, h: 647 }) {
                    this.stats = stats;
                    this.onAction = onAction;
                    this.tractorArt = tractorArt;
                    this.tractorSize = tractorSize;
                    this.buttons = [];
                    this.started = Date.now();
                    this.height = 1334;
                    this.rankText = null;
                    this.node = UIKit_1.uiNode('StackHomecoming', parent, 750, 1334);
                    const shade = UIKit_1.uiNode('HomeShade', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    UIKit_1.fill(shade, new cc_1.Color(10, 6, 18, 255), -375, -1000, 750, 2000, 0);
                    this.backdrop = this.image('HomeBackdrop');
                    this.tractor = this.image('HomeTractor');
                    this.sparks = UIKit_1.uiNode('HomeFirecrackers', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    void OptionalResources_1.loadArt('ui/bg_home').then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.backdrop.spriteFrame = frame;
                        this.layout(this.height);
                    });
                    void OptionalResources_1.loadArt(this.tractorArt).then(frame => {
                        if (!frame || !this.node.isValid)
                            return;
                        this.tractor.spriteFrame = frame;
                        this.layout(this.height);
                    });
                    this.title = UIKit_1.label(this.node, 'HomeTitle', '到家了！', 92, 0, 0).node;
                    this.title.getComponent(cc_1.Label).color = gold;
                    this.subtitle = UIKit_1.label(this.node, 'HomeSubtitle', '爸妈在门口等你 · 新年快乐', 30, 0, 0).node;
                    this.subtitle.getComponent(cc_1.Label).color = pale;
                    this.statsLabel = UIKit_1.label(this.node, 'HomeStats', this.statsText(), 25, 0, 0).node;
                    this.statsLabel.getComponent(cc_1.Label).color = pale;
                    this.actions = UIKit_1.uiNode('HomeActions', this.node, 750, 320);
                    this.actionArt = this.actions.addComponent(cc_1.Graphics);
                    const choices = [
                        { title: '再走一遍回家路', action: 'road' },
                        { title: '到家分享图', action: 'share' },
                        { title: '回首页', action: 'home' },
                    ];
                    choices.forEach((choice, index) => {
                        const text = UIKit_1.label(this.actions, `HomeButton${index}`, choice.title, 30, 0, 0);
                        text.color = index === 0 ? ink : gold;
                        this.buttons.push({ action: choice.action, rect: { x: 125, y: 0, w: 500, h: 74 }, label: text.node });
                    });
                    this.layout(this.height);
                }
                layout(height) {
                    this.height = height;
                    this.node.getComponent(cc_1.UITransform).setContentSize(750, height);
                    const scale = this.coverScale();
                    this.show(this.backdrop, 0, 0, 750 * scale, 1334 * scale);
                    this.title.setPosition(0, height / 2 - 150);
                    this.subtitle.setPosition(0, height / 2 - 228);
                    this.statsLabel.setPosition(0, height / 2 - 276);
                    // Primary button on its own row, share + home side by side below it; all under the tractor.
                    const actionsY = -height / 2 + 175;
                    this.actions.setPosition(0, actionsY);
                    this.actionArt.clear();
                    const slots = [{ x: -250, w: 500, y: 46 }, { x: -250, w: 240, y: -46 }, { x: 10, w: 240, y: -46 }];
                    this.buttons.forEach((button, index) => {
                        const slot = slots[index];
                        button.rect.x = 375 + slot.x;
                        button.rect.w = slot.w;
                        button.rect.y = height / 2 - (actionsY + slot.y) - 37;
                        button.label.setPosition(slot.x + slot.w / 2, slot.y);
                        UIKit_1.fill(this.actionArt, index === 0 ? gold : darkRed, slot.x, slot.y - 37, slot.w, 74, 22);
                        if (index) {
                            this.actionArt.strokeColor = gold;
                            this.actionArt.lineWidth = 2;
                            this.actionArt.roundRect(slot.x + 2, slot.y - 35, slot.w - 4, 70, 20);
                            this.actionArt.stroke();
                        }
                    });
                    if (this.state)
                        this.render(this.state);
                }
                render(state) {
                    this.state = state;
                    const now = Date.now() - this.started;
                    const arrive = Math.min(1, now / HOMECOMING_ARRIVE_MS);
                    const ease = 1 - Math.pow(1 - arrive, 3);
                    // Rear view: the tractor rolls in big from the bottom edge and parks small beside the door,
                    // leaving the waving parents in the doorway visible.
                    const scale = this.coverScale();
                    const h = (560 - 300 * ease) * scale;
                    const w = h * this.tractorSize.w / this.tractorSize.h;
                    const parkY = this.toLocal(830 * scale);
                    const startY = -this.height / 2 + h * .2;
                    // Tall screens crop the cover-scaled backdrop's sides; keep the parked tractor fully on screen.
                    const x = Math.min(235 * scale, 375 - 14 - w / 2) * ease;
                    this.show(this.tractor, x, startY + (parkY - startY) * ease + Math.sin(now / 90) * (1 - ease) * 4, w, h);
                    this.title.active = arrive >= .7;
                    this.subtitle.active = arrive >= .8;
                    this.statsLabel.active = arrive >= .8;
                    this.actions.active = arrive >= 1;
                    this.drawFirecrackers(now, scale);
                }
                press(x, y) {
                    if (!this.actions.active)
                        return;
                    for (const button of this.buttons) {
                        if (InteractionGeometry_1.inRect({ x, y }, button.rect)) {
                            this.onAction(button.action);
                            return;
                        }
                    }
                }
                setRankStatus(text) { this.rankText = text; }
                get rankStatusText() { return this.rankText; }
                get statsLine() { return this.statsText(); }
                buttonPoints() {
                    return this.buttons.map(button => {
                        var _a, _b;
                        return ({
                            action: button.action,
                            title: (_b = (_a = button.label.getComponent(cc_1.Label)) === null || _a === void 0 ? void 0 : _a.string) !== null && _b !== void 0 ? _b : '',
                            rect: Object.assign({}, button.rect),
                        });
                    });
                }
                /** Bursts of sparks and red paper bits at the foot of both painted firecracker strings. */
                drawFirecrackers(now, scale) {
                    const g = this.sparks;
                    g.clear();
                    const frame = Math.floor(now / 70);
                    for (const string of STRINGS) {
                        const random = rng_1.createRng(`home-spark-${string.x}-${frame}`);
                        // Clamp into the visible 750-wide column when tall screens crop the painted strings.
                        const x = Math.max(-345, Math.min(345, (string.x - 375) * scale));
                        // The burning point creeps up the string, then the string starts again.
                        const burn = (now / 2600) % 1;
                        const y = this.toLocal((string.bottom - (string.bottom - string.top) * burn) * scale);
                        for (let index = 0; index < 14; index++) {
                            const angle = random() * Math.PI * 2;
                            const distance = (10 + random() * 46) * scale;
                            const size = (2 + random() * 4) * scale;
                            const hot = random();
                            g.fillColor = hot > .6 ? new cc_1.Color(255, 244, 170, 255) : hot > .25 ? new cc_1.Color(255, 170, 60, 235) : new cc_1.Color(230, 40, 40, 220);
                            g.circle(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, size);
                            g.fill();
                        }
                        g.fillColor = new cc_1.Color(255, 255, 220, 200);
                        g.circle(x, y, 9 * scale);
                        g.fill();
                        for (let index = 0; index < 6; index++) {
                            const fall = ((now / 1000 + index * .37) % 1.6) / 1.6;
                            g.fillColor = new cc_1.Color(214, 30, 36, Math.round(230 * (1 - fall)));
                            g.rect(x + (random() - .5) * 120 * scale, y - fall * 260 * scale, 7 * scale, 4 * scale);
                            g.fill();
                        }
                    }
                }
                coverScale() { return Math.max(1, this.height / 1334); }
                /** Converts a y measured from the top of the cover-scaled backdrop into node-local y. */
                toLocal(fromTop) { return 1334 * this.coverScale() / 2 - fromTop; }
                image(name) {
                    const sprite = UIKit_1.uiNode(name, this.node, 1, 1).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    return sprite;
                }
                show(sprite, x, y, width, height) {
                    sprite.node.getComponent(cc_1.UITransform).setContentSize(width, height);
                    sprite.node.setPosition(x, y);
                    sprite.enabled = !!sprite.spriteFrame;
                }
                statsText() {
                    const minutes = Math.floor(this.stats.elapsedSec / 60);
                    const seconds = this.stats.elapsedSec % 60;
                    const time = minutes > 0 ? `${minutes} 分 ${String(seconds).padStart(2, '0')} 秒` : `${seconds} 秒`;
                    return `第 9 关 · 用时 ${time} · 打包 ${this.stats.boxes} 箱`;
                }
            };
            exports_1("StackHomecomingView", StackHomecomingView);
        }
    };
});

System.register("chunks:///_virtual/StageArt.ts", ["cc","./items.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, items_1, looks, fallback, shorts;
    var __moduleName = context_1 && context_1.id;
    function vehicleLook(vehicle) { var _a; return (_a = looks[vehicle]) !== null && _a !== void 0 ? _a : fallback; }
    exports_1("vehicleLook", vehicleLook);
    function itemName(piece) { return items_1.itemMeta(piece).name; }
    exports_1("itemName", itemName);
    function itemShortName(piece) { var _a; return (_a = shorts[items_1.itemMeta(piece).key]) !== null && _a !== void 0 ? _a : itemName(piece); }
    exports_1("itemShortName", itemShortName);
    function controlContentLayout(rect) {
        return { iconX: rect.x + 34, textX: rect.x + (rect.w + 62) / 2 };
    }
    exports_1("controlContentLayout", controlContentLayout);
    function computeStageLayout(level, height, top, bottom) {
        const buttonH = 112;
        const buttonY = height - bottom - 24 - buttonH;
        const trayH = Math.max(300, Math.min(420, height * .26));
        const trayY = buttonY - 24 - trayH;
        const carTop = (level.mode === 'mom' ? 326 : 286) + top;
        const carBottom = Math.max(carTop + 430, trayY - 46);
        const car = { x: 14, y: carTop, w: 722, h: carBottom - carTop };
        const trunk = { x: 44, y: carTop + 78, w: 662, h: Math.max(250, car.h - 78 - 144) };
        const cell = Math.floor(Math.min(112, (trunk.w - 20) / level.width, (trunk.h - 20) / level.height));
        const board = { x: (750 - level.width * cell) / 2, y: trunk.y + (trunk.h - level.height * cell) / 2,
            w: level.width * cell, h: level.height * cell };
        return { cell, car, trunk, board, tray: { x: 5, y: trayY, w: 740, h: trayH }, buttonY, buttonH, noticeY: trayY - 20 };
    }
    exports_1("computeStageLayout", computeStageLayout);
    function polygon(graphics, points, color) {
        graphics.fillColor = color;
        graphics.moveTo(points[0][0], points[0][1]);
        for (const [x, y] of points.slice(1))
            graphics.lineTo(x, y);
        graphics.close();
        graphics.fill();
    }
    exports_1("polygon", polygon);
    function circle(graphics, x, y, radius, color) {
        graphics.fillColor = color;
        graphics.circle(x, y, radius);
        graphics.fill();
    }
    exports_1("circle", circle);
    function topDown(width, height, top) {
        return {
            x: (value) => value - width / 2,
            y: (value) => height / 2 - top - value,
        };
    }
    /** Full-screen Spring Festival night road, drawn back-to-front with Graphics only. */
    function drawStageBackdrop(graphics, width, height, top, look) {
        const p = topDown(width, height, top), rect = (x, y, w, h, c, r = 0) => {
            if (r) {
                graphics.fillColor = c;
                graphics.roundRect(p.x(x), p.y(y + h), w, h, r);
                graphics.fill();
            }
            else {
                graphics.fillColor = c;
                graphics.rect(p.x(x), p.y(y + h), w, h);
                graphics.fill();
            }
        };
        const poly = (points, c) => polygon(graphics, points.map(([x, y]) => [p.x(x), p.y(y)]), c);
        const orb = (x, y, r, c) => circle(graphics, p.x(x), p.y(y), r, c);
        rect(0, 0, width, height, new cc_1.Color(31, 21, 39));
        rect(0, 0, width, 510, new cc_1.Color(48, 27, 49));
        rect(0, 54, width, 390, new cc_1.Color(78, 34, 49));
        rect(0, 156, width, 294, new cc_1.Color(121, 45, 48));
        // Warm horizon glow behind the village.
        rect(0, 234, width, 190, new cc_1.Color(180, 75, 52));
        orb(604, 104, 72, new cc_1.Color(255, 207, 127, 38));
        orb(604, 104, 48, new cc_1.Color(255, 218, 142));
        orb(590, 93, 38, new cc_1.Color(255, 241, 183));
        for (const [x, y, r] of [[78, 74, 2], [137, 116, 2], [232, 58, 2], [310, 103, 1], [438, 67, 2], [510, 139, 1], [702, 177, 2], [663, 48, 1]])
            orb(x, y, r, new cc_1.Color(255, 227, 159, 185));
        // Layered hills and a warm village street.
        poly([[0, 282], [74, 220], [150, 253], [240, 214], [334, 267], [425, 221], [510, 251], [607, 207], [750, 264], [750, 399], [0, 399]], new cc_1.Color(77, 42, 54));
        poly([[0, 318], [92, 277], [174, 305], [274, 266], [370, 313], [489, 264], [589, 305], [680, 274], [750, 307], [750, 414], [0, 414]], new cc_1.Color(47, 31, 42));
        poly([[0, 375], [750, 375], [750, 510], [510, 430], [408, 414], [332, 417], [430, 438], [210, 510], [0, 510]], new cc_1.Color(119, 49, 45));
        for (const [x, base, w, h] of [[62, 334, 58, 45], [130, 320, 42, 37], [548, 334, 66, 48], [623, 318, 45, 37]]) {
            rect(x, base - h, w, h, new cc_1.Color(91, 41, 39), 3);
            poly([[x - 9, base - h], [x + w / 2, base - h - 27], [x + w + 9, base - h]], new cc_1.Color(42, 27, 36));
            rect(x + 10, base - h + 13, 10, 12, new cc_1.Color(255, 213, 133), 2);
            rect(x + w - 20, base - h + 13, 10, 12, new cc_1.Color(255, 213, 133), 2);
        }
        poly([[326, 410], [347, 410], [358, 382], [331, 382]], new cc_1.Color(255, 205, 117));
        poly([[414, 388], [431, 388], [446, 380], [438, 379]], new cc_1.Color(255, 205, 117));
        rect(0, 414, width, height - 414, new cc_1.Color(47, 29, 38));
        poly([[0, height], [0, 492], [304, 390], [441, 390], [750, 492], [750, height]], new cc_1.Color(61, 32, 39));
        poly([[306, height], [440, height], [445, 448], [408, 418], [340, 419], [304, 448]], new cc_1.Color(100, 45, 44));
        for (let y = 500; y < height - 30; y += 82)
            rect(360, y, 29, 43, new cc_1.Color(246, 195, 67, 115), 5);
        for (const [x, y, size] of [[42, 88, 32], [716, 82, 29], [64, 204, 23], [690, 214, 24]]) {
            rect(x - 2, y - 28, 4, 39, look.trim, 2);
            rect(x - size / 2, y, size, 40, new cc_1.Color(202, 50, 44), 12);
            rect(x - size / 2 + 5, y + 4, size - 10, 3, look.trim, 1);
            rect(x - size / 2 + 5, y + 32, size - 10, 3, look.trim, 1);
            rect(x - 2, y + 40, 4, 13, look.trim, 2);
        }
        // Side curtains leave a clean centre lane for the open trunk.
        rect(0, 0, 16, height, new cc_1.Color(95, 29, 38));
        rect(width - 16, 0, 16, height, new cc_1.Color(95, 29, 38));
        rect(16, 0, 2, height, new cc_1.Color(246, 195, 67, 95));
        rect(width - 18, 0, 2, height, new cc_1.Color(246, 195, 67, 95));
    }
    exports_1("drawStageBackdrop", drawStageBackdrop);
    function drawStageChrome(graphics, width, height, top, board, tray, noticeY, look) {
        const p = topDown(width, height, top);
        const rect = (x, y, w, h, c, r = 0) => {
            if (r) {
                graphics.fillColor = c;
                graphics.roundRect(p.x(x), p.y(y + h), w, h, r);
                graphics.fill();
            }
            else {
                graphics.fillColor = c;
                graphics.rect(p.x(x), p.y(y + h), w, h);
                graphics.fill();
            }
        };
        const poly = (points, c) => polygon(graphics, points.map(([x, y]) => [p.x(x), p.y(y)]), c);
        // Spring Festival header banner and paired gold ribbons.
        rect(34, 15, 682, 127, new cc_1.Color(40, 19, 28, 145), 26);
        rect(38, 18, 674, 120, look.trim, 24);
        rect(44, 24, 662, 108, new cc_1.Color(147, 31, 39), 18);
        rect(53, 31, 644, 94, new cc_1.Color(206, 48, 43), 13);
        poly([[69, 52], [94, 52], [79, 76], [72, 74]], new cc_1.Color(255, 219, 149, 120));
        poly([[681, 52], [656, 52], [671, 76], [678, 74]], new cc_1.Color(255, 219, 149, 120));
        rect(112, 112, 526, 2, new cc_1.Color(255, 222, 161, 170), 1);
        rect(300, 24, 150, 4, new cc_1.Color(255, 224, 165), 2);
        // Two HUD tablets: loaded count on the left, departure clock on the right.
        rect(42, 158, 326, 58, new cc_1.Color(91, 25, 35, 235), 18);
        rect(382, 158, 326, 58, new cc_1.Color(91, 25, 35, 235), 18);
        rect(44, 160, 322, 54, look.trim, 16);
        rect(384, 160, 322, 54, look.trim, 16);
        rect(49, 165, 312, 44, new cc_1.Color(153, 34, 42), 12);
        rect(389, 165, 312, 44, new cc_1.Color(153, 34, 42), 12);
        rect(66, 183, 104, 2, new cc_1.Color(255, 218, 154, 100), 1);
        rect(580, 183, 104, 2, new cc_1.Color(255, 218, 154, 100), 1);
        // The notice ribbon sits in the narrow gap above the cargo tray.
        rect(75, noticeY - 25, 600, 42, new cc_1.Color(72, 25, 33, 220), 14);
        rect(78, noticeY - 22, 594, 36, look.trim, 12);
        rect(82, noticeY - 18, 586, 28, new cc_1.Color(141, 32, 40), 9);
        // Open wooden cargo tray with rope handles and gold trim.
        rect(tray.x - 5, tray.y - 5, tray.w + 10, tray.h + 10, new cc_1.Color(79, 28, 34), 25);
        rect(tray.x, tray.y, tray.w, tray.h, look.trim, 21);
        rect(tray.x + 5, tray.y + 5, tray.w - 10, tray.h - 10, new cc_1.Color(112, 39, 39), 17);
        for (let y = tray.y + 56; y < tray.y + tray.h - 16; y += 38)
            rect(tray.x + 10, y, tray.w - 20, 2, new cc_1.Color(255, 217, 151, 42));
        rect(tray.x + 25, tray.y + 10, tray.w - 50, 3, new cc_1.Color(255, 229, 174, 75), 2);
        rect(tray.x - 13, tray.y + tray.h / 2 - 23, 10, 46, new cc_1.Color(226, 170, 98), 5);
        rect(tray.x + tray.w + 3, tray.y + tray.h / 2 - 23, 10, 46, new cc_1.Color(226, 170, 98), 5);
        // A subtle gold rim keeps the board readable without washing out its floor.
        const rim = new cc_1.Color(255, 218, 153, 135);
        rect(board.x - 8, board.y - 8, board.w + 16, 8, rim, 4);
        rect(board.x - 8, board.y + board.h, board.w + 16, 8, rim, 4);
        rect(board.x - 8, board.y, 8, board.h, rim, 4);
        rect(board.x + board.w, board.y, 8, board.h, rim, 4);
    }
    exports_1("drawStageChrome", drawStageChrome);
    function drawCarRear(graphics, width, height, top, car, trunk, look) {
        const p = topDown(width, height, top);
        const rect = (x, y, w, h, c, r = 0) => {
            if (r) {
                graphics.fillColor = c;
                graphics.roundRect(p.x(x), p.y(y + h), w, h, r);
                graphics.fill();
            }
            else {
                graphics.fillColor = c;
                graphics.rect(p.x(x), p.y(y + h), w, h);
                graphics.fill();
            }
        };
        const poly = (points, c) => polygon(graphics, points.map(([x, y]) => [p.x(x), p.y(y)]), c);
        const orb = (x, y, r, c) => circle(graphics, p.x(x), p.y(y), r, c);
        // Ground shadow and an open lid rising behind the car body.
        rect(car.x + 26, car.y + 28, car.w - 52, car.h + 44, new cc_1.Color(16, 11, 17, 155), 48);
        poly([[car.x + 66, car.y + 2], [car.x + car.w - 66, car.y + 2], [trunk.x + trunk.w - 4, trunk.y - 10], [trunk.x + 4, trunk.y - 10]], look.deep);
        poly([[car.x + 80, car.y + 13], [car.x + car.w - 80, car.y + 13], [trunk.x + trunk.w - 18, trunk.y - 20], [trunk.x + 18, trunk.y - 20]], look.body);
        poly([[car.x + 100, car.y + 19], [car.x + car.w - 100, car.y + 19], [trunk.x + trunk.w - 36, trunk.y - 25], [trunk.x + 36, trunk.y - 25]], look.light);
        poly([[trunk.x + 40, trunk.y - 35], [trunk.x + trunk.w - 40, trunk.y - 35], [trunk.x + trunk.w - 52, trunk.y - 16], [trunk.x + 52, trunk.y - 16]], look.trim);
        poly([[trunk.x + trunk.w / 2, car.y + 25], [trunk.x + trunk.w / 2 + 25, car.y + 51], [trunk.x + trunk.w / 2, car.y + 77], [trunk.x + trunk.w / 2 - 25, car.y + 51]], look.trim);
        poly([[trunk.x + trunk.w / 2, car.y + 31], [trunk.x + trunk.w / 2 + 18, car.y + 51], [trunk.x + trunk.w / 2, car.y + 71], [trunk.x + trunk.w / 2 - 18, car.y + 51]], look.deep);
        rect(trunk.x + trunk.w / 2 - 54, trunk.y - 56, 108, 18, look.deep, 9);
        rect(trunk.x + trunk.w / 2 - 41, trunk.y - 51, 82, 7, look.trim, 3);
        // Broad rear body, quarter panels and bumper.
        rect(car.x, car.y + 20, car.w, car.h - 20, look.deep, 44);
        rect(car.x + 7, car.y + 27, car.w - 14, car.h - 34, look.body, 38);
        rect(car.x + 16, car.y + 39, car.w - 32, 22, look.light, 10);
        rect(trunk.x - 24, trunk.y - 12, 24, trunk.h + 28, look.deep, 8);
        rect(trunk.x + trunk.w, trunk.y - 12, 24, trunk.h + 28, look.deep, 8);
        rect(trunk.x - 20, trunk.y - 5, 20, trunk.h + 14, look.body, 6);
        rect(trunk.x + trunk.w, trunk.y - 5, 20, trunk.h + 14, look.body, 6);
        rect(car.x + 52, car.y + car.h - 91, car.w - 104, 19, look.light, 9);
        rect(car.x + 35, car.y + car.h - 71, car.w - 70, 46, look.deep, 21);
        rect(car.x + 52, car.y + car.h - 62, car.w - 104, 27, look.body, 13);
        // Trunk opening rim and deep interior.
        rect(trunk.x - 13, trunk.y - 13, trunk.w + 26, trunk.h + 26, look.trim, 20);
        rect(trunk.x - 8, trunk.y - 8, trunk.w + 16, trunk.h + 16, look.deep, 16);
        rect(trunk.x, trunk.y, trunk.w, trunk.h, new cc_1.Color(27, 31, 34), 12);
        rect(trunk.x + 8, trunk.y + 8, trunk.w - 16, trunk.h - 16, new cc_1.Color(37, 42, 45), 8);
        // Tail lights, reflector strip, plate recess and exhaust.
        for (const x of [car.x + 50, car.x + car.w - 190]) {
            rect(x, car.y + car.h - 128, 140, 45, new cc_1.Color(77, 20, 27), 14);
            rect(x + 8, car.y + car.h - 121, 124, 31, look.light, 10);
            rect(x + 20, car.y + car.h - 113, 100, 13, new cc_1.Color(255, 172, 91), 6);
        }
        rect(car.x + 238, car.y + car.h - 136, 246, 54, new cc_1.Color(49, 25, 27), 11);
        rect(car.x + 245, car.y + car.h - 129, 232, 40, look.trim, 8);
        rect(car.x + 251, car.y + car.h - 123, 220, 28, new cc_1.Color(48, 40, 34), 6);
        rect(car.x + car.w - 116, car.y + car.h - 35, 70, 18, new cc_1.Color(38, 28, 29), 9);
        orb(car.x + 46, car.y + car.h - 25, 18, new cc_1.Color(20, 14, 18));
        orb(car.x + car.w - 46, car.y + car.h - 25, 18, new cc_1.Color(20, 14, 18));
    }
    exports_1("drawCarRear", drawCarRear);
    function drawTrunkFloor(graphics, width, height, top, trunk, board, level, cell) {
        const p = topDown(width, height, top);
        const rect = (x, y, w, h, c, r = 0) => {
            if (r) {
                graphics.fillColor = c;
                graphics.roundRect(p.x(x), p.y(y + h), w, h, r);
                graphics.fill();
            }
            else {
                graphics.fillColor = c;
                graphics.rect(p.x(x), p.y(y + h), w, h);
                graphics.fill();
            }
        };
        rect(trunk.x + 12, trunk.y + 12, trunk.w - 24, trunk.h - 24, new cc_1.Color(24, 28, 31), 8);
        for (let y = trunk.y + 26; y < trunk.y + trunk.h - 20; y += 44)
            rect(trunk.x + 17, y, trunk.w - 34, 2, new cc_1.Color(226, 232, 225, 18));
        rect(board.x - 5, board.y - 5, board.w + 10, board.h + 10, new cc_1.Color(13, 17, 19), 8);
        for (let y = 0; y < level.height; y++)
            for (let x = 0; x < level.width; x++) {
                const blocked = level.blocked.some(([bx, by]) => bx === x && by === y);
                const rx = board.x + x * cell, ry = board.y + y * cell;
                rect(rx + 1, ry + 1, cell - 2, cell - 2, blocked ? new cc_1.Color(24, 28, 31) : (x + y) % 2 ? new cc_1.Color(43, 49, 52) : new cc_1.Color(49, 56, 59));
                if (blocked) {
                    rect(rx + 7, ry + 7, cell - 14, cell - 14, new cc_1.Color(31, 36, 39), 7);
                    graphics.strokeColor = new cc_1.Color(246, 195, 67, 145);
                    graphics.lineWidth = 2;
                    graphics.moveTo(p.x(rx + 15), p.y(ry + cell - 15));
                    graphics.lineTo(p.x(rx + cell - 15), p.y(ry + 15));
                    graphics.moveTo(p.x(rx + 15), p.y(ry + 15));
                    graphics.lineTo(p.x(rx + cell - 15), p.y(ry + cell - 15));
                    graphics.stroke();
                }
                rect(rx + cell - 1, ry + 1, 1, cell - 2, new cc_1.Color(224, 231, 226, 24));
                rect(rx + 1, ry + cell - 1, cell - 2, 1, new cc_1.Color(224, 231, 226, 24));
            }
        // The mat around a small stage-one grid still reads as a real trunk floor.
        rect(board.x, board.y, board.w, 2, new cc_1.Color(255, 218, 153, 90));
        rect(board.x, board.y + board.h - 2, board.w, 2, new cc_1.Color(255, 218, 153, 90));
    }
    exports_1("drawTrunkFloor", drawTrunkFloor);
    // Barely-there cell lines and wheel-arch cells over the painted trunk carpet.
    function drawTrunkGrid(graphics, width, height, top, board, level, cell) {
        const p = topDown(width, height, top);
        graphics.fillColor = new cc_1.Color(255, 226, 170, 18);
        graphics.roundRect(p.x(board.x), p.y(board.y + board.h), board.w, board.h, 6);
        graphics.fill();
        graphics.strokeColor = new cc_1.Color(255, 214, 140, 120);
        graphics.lineWidth = 3;
        graphics.roundRect(p.x(board.x - 3), p.y(board.y + board.h + 3), board.w + 6, board.h + 6, 8);
        graphics.stroke();
        graphics.strokeColor = new cc_1.Color(255, 226, 170, 38);
        graphics.lineWidth = 1.5;
        for (let x = 1; x < level.width; x++) {
            graphics.moveTo(p.x(board.x + x * cell), p.y(board.y));
            graphics.lineTo(p.x(board.x + x * cell), p.y(board.y + board.h));
        }
        for (let y = 1; y < level.height; y++) {
            graphics.moveTo(p.x(board.x), p.y(board.y + y * cell));
            graphics.lineTo(p.x(board.x + board.w), p.y(board.y + y * cell));
        }
        graphics.stroke();
        for (const [x, y] of level.blocked) {
            const rx = board.x + x * cell, ry = board.y + y * cell;
            graphics.fillColor = new cc_1.Color(14, 11, 13, 235);
            graphics.roundRect(p.x(rx + 2), p.y(ry + cell - 2), cell - 4, cell - 4, 10);
            graphics.fill();
            graphics.strokeColor = new cc_1.Color(246, 195, 67, 120);
            graphics.lineWidth = 2;
            graphics.moveTo(p.x(rx + 16), p.y(ry + cell - 16));
            graphics.lineTo(p.x(rx + cell - 16), p.y(ry + 16));
            graphics.moveTo(p.x(rx + 16), p.y(ry + 16));
            graphics.lineTo(p.x(rx + cell - 16), p.y(ry + cell - 16));
            graphics.stroke();
        }
    }
    exports_1("drawTrunkGrid", drawTrunkGrid);
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            },
            function (items_1_1) {
                items_1 = items_1_1;
            }
        ],
        execute: function () {
            looks = {
                sedan: { name: '小轿车', body: new cc_1.Color(202, 41, 42), deep: new cc_1.Color(112, 25, 31), light: new cc_1.Color(239, 86, 55), trim: new cc_1.Color(255, 205, 114) },
                sedan_v1: { name: '小轿车', body: new cc_1.Color(194, 35, 43), deep: new cc_1.Color(104, 21, 30), light: new cc_1.Color(235, 75, 52), trim: new cc_1.Color(255, 211, 121) },
                wuling: { name: '五菱宏光', body: new cc_1.Color(178, 44, 39), deep: new cc_1.Color(91, 27, 27), light: new cc_1.Color(224, 88, 54), trim: new cc_1.Color(246, 195, 67) },
                suv: { name: 'SUV', body: new cc_1.Color(137, 42, 48), deep: new cc_1.Color(70, 24, 31), light: new cc_1.Color(197, 76, 64), trim: new cc_1.Color(255, 204, 121) },
                pickup: { name: '皮卡', body: new cc_1.Color(176, 78, 37), deep: new cc_1.Color(91, 37, 25), light: new cc_1.Color(222, 119, 55), trim: new cc_1.Color(250, 201, 104) },
                etrike: { name: '电动三轮', body: new cc_1.Color(51, 111, 91), deep: new cc_1.Color(27, 62, 53), light: new cc_1.Color(95, 151, 112), trim: new cc_1.Color(246, 195, 67) },
                moto: { name: '摩托车', body: new cc_1.Color(155, 49, 38), deep: new cc_1.Color(78, 25, 25), light: new cc_1.Color(211, 86, 53), trim: new cc_1.Color(255, 205, 114) },
                train: { name: '绿皮火车', body: new cc_1.Color(44, 105, 78), deep: new cc_1.Color(23, 58, 46), light: new cc_1.Color(90, 146, 98), trim: new cc_1.Color(246, 195, 67) },
            };
            fallback = looks.sedan;
            shorts = {
                liquor: '白酒', sausage: '腊肠', ricecooker: '饭煲', sugarcane: '甘蔗', milk: '牛奶',
                suitcase_s: '登机箱', duffel: '拉杆包', nutbox: '坚果', fish: '鱼', duck: '腊鸭',
                quilt: '被子', frozenbox: '冻品', tv: '电视', coop: '鸡鸭笼', crab: '闸蟹',
                painting: '年画', lotusroot: '莲藕', couplets: '春联', suitcase_l: '行李箱',
                winebox: '红酒', ricecake: '年糕', hairtail: '带鱼', oil: '食用油', mandarin: '砂糖橘', toycar: '玩具车',
                ricebag: '大米', drinks: '饮料', teabox: '茶叶', eggs: '鸡蛋', candy: '糖果', snacks: '零食',
                ham: '火腿', kumquat: '金桔', fruitbasket: '果篮', apples: '苹果', fudeco: '窗花', larou: '腊肉',
                lanterns: '灯笼', woven: '编织袋',
                scallion: '大葱', dryfish: '腊鱼', giftstack: '礼盒', dates: '红枣', noodles: '方便面', milkflat: '牛奶',
                firecracker: '鞭炮', guamian: '挂面', pomelo: '柚子', thermos: '保温壶', pastry: '糕点', driedgoods: '干货',
                hongbao: '红包', oven: '烤箱',
            };
        }
    };
});

System.register("chunks:///_virtual/UIKit.ts", ["cc"], function (exports_1, context_1) {
    "use strict";
    var cc_1;
    var __moduleName = context_1 && context_1.id;
    function uiNode(name, parent, width, height) {
        const node = new cc_1.Node(name);
        node.layer = cc_1.Layers.Enum.UI_2D;
        node.addComponent(cc_1.UITransform).setContentSize(width, height);
        parent.addChild(node);
        return node;
    }
    exports_1("uiNode", uiNode);
    function label(parent, name, text, size, x, y) {
        const node = uiNode(name, parent, 720, size + 12);
        node.setPosition(x, y);
        const result = node.addComponent(cc_1.Label);
        result.string = text;
        result.fontSize = size;
        result.lineHeight = size + 6;
        result.color = new cc_1.Color(74, 44, 26);
        return result;
    }
    exports_1("label", label);
    function fill(graphics, color, x, y, width, height, radius = 0) {
        graphics.fillColor = color;
        if (radius)
            graphics.roundRect(x, y, width, height, radius);
        else
            graphics.rect(x, y, width, height);
        graphics.fill();
    }
    exports_1("fill", fill);
    return {
        setters: [
            function (cc_1_1) {
                cc_1 = cc_1_1;
            }
        ],
        execute: function () {
        }
    };
});

System.register("chunks:///_virtual/__cc_env.js", [], function (exports) {
  return { execute: function () { exports({ EDITOR: false, PREVIEW: false, BUILD: true, DEBUG: true, DEV: false, TEST: false,
    JSB: false, NATIVE: false, HTML5: true, WECHAT: false, MINIGAME: false, RUNTIME_BASED: false, SUPPORT_JIT: true,
    EDITOR_NOT_IN_PREVIEW: false, SERVER_MODE: false, NOT_PACK_PHYSX_LIBS: false, WEBGPU: false, OPEN_HARMONY: false }); } };
});

System.register("chunks:///_virtual/main", ["./Bootstrap.ts","./brand.ts","./stack-music.ts","./stack-sfx.ts","./synth.ts","./date.ts","./dlx.ts","./generator.ts","./input.ts","./items.ts","./level.ts","./provinces.ts","./rank.ts","./rng.ts","./shapes.ts","./stack-catalog.ts","./stack-constants.ts","./stack-daily-table.ts","./stack-daily.ts","./stack-endless-table.ts","./stack-endless.ts","./stack-generator.ts","./stack-layout.ts","./stack-progress.ts","./stack-rules.ts","./stack-share.ts","./stack-sim.ts","./stack-solver.ts","./stack-state-solver.ts","./stack-types.ts","./stack-vehicles.ts","./stage1.ts","./types.ts","./validate.ts","./vehicles.ts","./DragController.ts","./FinishTimeline.ts","./InteractionGeometry.ts","./StageSession.ts","./HomePage.ts","./RankPage.ts","./StackPage.ts","./StagePage.ts","./WebPlatform.ts","./route.ts","./Api.ts","./OptionalResources.ts","./RankApi.ts","./SoundEffects.ts","./StackShareImage.ts","./StackSound.ts","./FinishView.ts","./ItemArt.ts","./JourneyArt.ts","./ProvincePicker.ts","./StackFinishView.ts","./StackHomecomingView.ts","./StageArt.ts","./UIKit.ts"], function () {
  return { setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], execute: function () {} };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main');
})(function(mid, cid) {
  System.register(mid, [cid], function (_export, _context) {
    return {
      setters: [function(_m) {
        var _exportObj = {};
        for (var _key in _m) { if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key]; }
        _export(_exportObj);
      }],
      execute: function () { }
    };
  });
});
