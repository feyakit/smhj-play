System.register("chunks:///_virtual/Bootstrap.ts", ["cc","./__cc_env.js","./brand.ts","./date.ts","./stage1.ts","./StagePage.ts","./StackPage.ts","./WebPlatform.ts","./Api.ts","./UIKit.ts","./JourneyArt.ts"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cc_1, env_1, brand_1, date_1, stage1_1, StagePage_1, StackPage_1, WebPlatform_1, Api_1, UIKit_1, JourneyArt_1, ccclass, Bootstrap;
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
                }
                start() {
                    if (this.platform.isStackMode())
                        this.startStack(this.platform.stackStage());
                    else if (this.platform.isMomMode())
                        void this.startMomMode();
                    else if (this.platform.hasLevelOverride())
                        void this.challenge();
                    else
                        this.show(stage1_1.stage1(date_1.shanghaiDate()));
                }
                update() { var _a, _b; (_a = this.stage) === null || _a === void 0 ? void 0 : _a.tick(); (_b = this.stack) === null || _b === void 0 ? void 0 : _b.tick(); }
                show(level) {
                    this.node.destroyAllChildren();
                    this.stack = undefined;
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
                startStack(stage) {
                    this.node.destroyAllChildren();
                    this.stage = undefined;
                    this.stack = new StackPage_1.StackPage(this.node, stage, (action) => {
                        if (action === 'next')
                            this.startStack(2);
                        else if (action === 'first')
                            this.startStack(1);
                        else
                            this.startStack(stage);
                    });
                }
                async startMomMode() {
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
    var STAGE1_ITEMS, STAGE2_ITEMS, MOM_ITEM_KEYS;
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
        }
    };
});

System.register("chunks:///_virtual/stack-generator.ts", ["./rng.ts","./stack-catalog.ts","./stack-rules.ts","./stack-layout.ts","./stack-solver.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_catalog_1, stack_rules_1, stack_layout_1, stack_solver_1, STACK_SEEDS, STAGE1_CARDS, STAGE2_CARDS, STAGE2_CARD, GRID, HALF, GRID_X0, GRID_Y0, MAIN_LAYERS, SIDE_STACKS;
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
                for (let col = layer.cols[0]; col <= layer.cols[1]; col++) {
                    if ((_a = layer.skip) === null || _a === void 0 ? void 0 : _a.includes(`${col},${row}`))
                        continue;
                    const jitterX = Math.round((random() - .5) * 4);
                    const jitterY = Math.round((random() - .5) * 4);
                    cards.push(pileCard(++id, GRID_X0 + offset + col * GRID + jitterX, GRID_Y0 + offset + row * GRID + jitterY, STAGE2_CARD, STAGE2_CARD, index, 'pile'));
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
    function reservePositions(cardW, cardH, count) {
        const gap = 8, columns = 6;
        const reserveW = Math.round(cardW * .72);
        const total = columns * reserveW + (columns - 1) * gap;
        const start = Math.round((750 - total) / 2);
        return Array.from({ length: count }, (_, index) => ({
            x: start + (index % columns) * (reserveW + gap),
            y: 936 + Math.floor(index / columns) * (Math.round(cardH * .72) + 8),
        }));
    }
    function momPositions(cardW) {
        return [0, 1, 2].map(index => ({ x: Math.round(375 - cardW * 1.5 + index * cardW), y: 290 }));
    }
    function buildCards(stage, random) {
        if (stage === 1) {
            return { cards: layoutStageOne(), items: stack_catalog_1.stackItems(1), w: 136, h: 136 };
        }
        if (stage === 2) {
            return { cards: layoutStageTwo(random), items: stack_catalog_1.stackItems(2), w: STAGE2_CARD, h: STAGE2_CARD };
        }
        throw new Error(`unknown stack stage ${stage}`);
    }
    /**
     * Assigns kinds to a generated legal click order. Each round removes three currently reachable
     * cards, so replaying the recorded ids always clears a triple without filling the seven slots.
     */
    function assignTriples(cards, items, random) {
        let active = [...cards];
        const solution = [];
        const firstCycle = rng_1.shuffle(items, random);
        const totalGroups = cards.length / 3;
        for (let group = 0; group < totalGroups; group++) {
            const picks = [];
            for (let slot = 0; slot < 3; slot++) {
                const available = stack_rules_1.freeCards(active);
                if (available.length === 0)
                    return undefined;
                const pick = available[Math.floor(random() * available.length)];
                picks.push(pick);
                active = active.filter(card => card.id !== pick.id);
            }
            const item = group < firstCycle.length
                ? firstCycle[group]
                : items[Math.floor(random() * items.length)];
            for (const pick of picks) {
                pick.kind = item.key;
                pick.name = item.name;
                solution.push(pick.id);
            }
        }
        return active.length === 0 ? { cards, solution } : undefined;
    }
    function attemptLevel(stage, baseSeed, attempt) {
        const seed = attempt === 0 ? baseSeed : `${baseSeed}#retry-${attempt}`;
        const random = rng_1.createRng(seed);
        const built = buildCards(stage, random);
        const assigned = assignTriples(built.cards, built.items, random);
        if (!assigned)
            throw new Error('layout could not be assigned');
        const level = {
            stage,
            seed,
            cardW: built.w,
            cardH: built.h,
            items: built.items,
            cards: assigned.cards,
            reservePositions: reservePositions(built.w, built.h, 12),
            momPositions: momPositions(built.w),
            solution: assigned.solution,
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
            }
        ],
        execute: function () {
            exports_1("STACK_SEEDS", STACK_SEEDS = ['trunk-stack-stage1-v1', 'trunk-stack-stage2-v1']);
            exports_1("STAGE1_CARDS", STAGE1_CARDS = 18);
            exports_1("STAGE2_CARDS", STAGE2_CARDS = 150);
            STAGE2_CARD = stack_layout_1.STACK_CARD_SIZE;
            GRID = 112;
            HALF = GRID / 2;
            GRID_X0 = Math.round((750 - (5 * GRID + STAGE2_CARD)) / 2);
            GRID_Y0 = 150;
            /**
             * Bottom-to-top layers of the hard mound. Odd layers sit half a card right and down, so every
             * card is pinned by up to four cards above; upper layers shrink towards the centre and the
             * base loses its top corners, giving a hill silhouette instead of a wall.
             */
            MAIN_LAYERS = [
                { cols: [0, 5], rows: [0, 6], half: false, skip: ['0,0', '5,0', '0,1', '5,1'] },
                { cols: [0, 4], rows: [0, 5], half: true, skip: ['0,0', '4,0'] },
                { cols: [1, 4], rows: [0, 6], half: false },
                { cols: [1, 3], rows: [0, 5], half: true },
                { cols: [2, 3], rows: [1, 5], half: false },
                { cols: [2, 2], rows: [1, 4], half: true },
            ];
            SIDE_STACKS = [
                { source: 'side-left', x: 36, y: 1006, count: 12, step: 13 },
                { source: 'side-right', x: 606, y: 1006, count: 12, step: -13 },
            ];
        }
    };
});

System.register("chunks:///_virtual/stack-layout.ts", [], function (exports_1, context_1) {
    "use strict";
    var STACK_DESIGN_WIDTH, STACK_HUD_BOTTOM, STACK_MIN_HEIGHT, STACK_CARD_SIZE, STACK_CAR_SCALE_Y, STACK_ACTION_HEIGHT, STACK_BODY_SIZE, STACK_BODY_HOLE, STACK_BODY_SLICE;
    var __moduleName = context_1 && context_1.id;
    /** Converts a phone viewport to the 750-wide design coordinate used by StackPage. */
    function stackPageHeight(screenWidth, screenHeight) {
        if (!(screenWidth > 0) || !(screenHeight > 0))
            return STACK_MIN_HEIGHT;
        return Math.max(STACK_MIN_HEIGHT, screenHeight / screenWidth * STACK_DESIGN_WIDTH);
    }
    exports_1("stackPageHeight", stackPageHeight);
    /** Shared, renderer-independent geometry for the board, car and bottom action row. */
    function createStackPageLayout(height, safeBottom = 0) {
        const actionY = height - Math.max(0, safeBottom) - 20 - STACK_ACTION_HEIGHT;
        const bodyHeight = Math.round(STACK_BODY_SIZE.h * STACK_CAR_SCALE_Y);
        const carBottom = actionY - 52;
        const carTop = carBottom - bodyHeight;
        const trunk = {
            x: Math.round((STACK_BODY_HOLE.left - STACK_BODY_SIZE.w / 2) + STACK_DESIGN_WIDTH / 2),
            y: carTop + Math.round(STACK_BODY_HOLE.top * STACK_CAR_SCALE_Y),
            w: STACK_BODY_HOLE.right - STACK_BODY_HOLE.left,
            h: Math.round((STACK_BODY_HOLE.bottom - STACK_BODY_HOLE.top) * STACK_CAR_SCALE_Y),
        };
        const stackTop = STACK_HUD_BOTTOM;
        const stackBottom = trunk.y;
        return {
            height,
            safeBottom: Math.max(0, safeBottom),
            actionY,
            carBottom,
            carTop,
            bodyHeight,
            trunk,
            stackTop,
            stackBottom,
            stackRatio: Math.max(0, stackBottom - stackTop) / height,
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
    function stackCardsAreVisible(cards, layout) {
        const bounds = stackCardBounds(cards);
        return bounds.left >= 0
            && bounds.right <= STACK_DESIGN_WIDTH
            && bounds.top >= layout.stackTop
            && bounds.bottom <= layout.stackBottom;
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
        }
    };
});

System.register("chunks:///_virtual/stack-rules.ts", ["./rng.ts","./stack-catalog.ts"], function (exports_1, context_1) {
    "use strict";
    var rng_1, stack_catalog_1, SLOT_CAPACITY, PACK_SIZE, MOM_INTERVAL_MS, StackGame;
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
            }
        ],
        execute: function () {
            exports_1("SLOT_CAPACITY", SLOT_CAPACITY = 7);
            exports_1("PACK_SIZE", PACK_SIZE = 3);
            exports_1("MOM_INTERVAL_MS", MOM_INTERVAL_MS = 25000);
            /** Pure match-three state machine. Rendering owns card nodes, never this class. */
            StackGame = class StackGame {
                constructor(level, random = Math.random, now = 0) {
                    this.level = level;
                    this.random = random;
                    this.slotList = [];
                    this.currentStatus = 'playing';
                    this.propState = { moveOut: false, undo: false, shuffle: false };
                    this.groupsCleared = 0;
                    this.lastMomGroup = 0;
                    this.momEvents = 0;
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
                    if (matching.length >= PACK_SIZE) {
                        packed = matching.slice(0, PACK_SIZE);
                        const packedIds = new Set(packed.map(candidate => candidate.id));
                        this.slotList = this.slotList.filter(candidate => !packedIds.has(candidate.id));
                        this.groupsCleared++;
                    }
                    else if (this.slotList.length >= SLOT_CAPACITY) {
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
                    if (this.propState.moveOut || this.currentStatus !== 'playing' || this.slotList.length < PACK_SIZE)
                        return [];
                    this.propState = Object.assign(Object.assign({}, this.propState), { moveOut: true });
                    return this.moveOutCards();
                }
                revive() {
                    if (this.currentStatus !== 'lost' || this.slotList.length < PACK_SIZE)
                        return [];
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
                triggerMom() {
                    if (this.level.stage !== 2 || this.currentStatus !== 'playing')
                        return [];
                    const item = stack_catalog_1.pickMomItem(this.level.items, this.random);
                    const added = [];
                    for (let i = 0; i < PACK_SIZE; i++) {
                        const pos = this.level.momPositions[i % this.level.momPositions.length];
                        this.maxCardId++;
                        added.push({
                            id: this.maxCardId,
                            kind: item.key,
                            name: item.name,
                            x: pos.x,
                            y: pos.y,
                            w: this.level.cardW,
                            h: this.level.cardH,
                            layer: 2000 + this.momEvents * PACK_SIZE + i,
                            source: 'mom',
                        });
                    }
                    this.momEvents++;
                    this.cardList.push(...added);
                    this.history = undefined;
                    return added;
                }
                tickMom(now) {
                    if (this.level.stage !== 2 || this.currentStatus !== 'playing' || now < this.nextMomAt)
                        return [];
                    this.nextMomAt = now + MOM_INTERVAL_MS;
                    return this.triggerMom();
                }
                maybeMomByGroups(now) {
                    if (this.level.stage === 2 && this.groupsCleared - this.lastMomGroup >= 10) {
                        this.lastMomGroup = this.groupsCleared;
                        this.triggerMom();
                        this.nextMomAt = now + MOM_INTERVAL_MS;
                    }
                }
                moveOutCards() {
                    const moved = this.slotList.splice(0, PACK_SIZE);
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

System.register("chunks:///_virtual/stack-share.ts", ["./brand.ts"], function (exports_1, context_1) {
    "use strict";
    var brand_1, STACK_SHARE_WIDTH, STACK_SHARE_HEIGHT, STACK_SHARE_TITLE, STACK_SHARE_ITEM_KEYS, STACK_CARGO_POSITIONS, STACK_SHARE_CAPTIONS;
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
        return `差 ${safeInteger(result.remaining)} 件就塞满`;
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
    function stackShareFileName(stage, victory) {
        return `${brand_1.GAME_TITLE}-第${safeInteger(stage, 1)}关-${victory ? '胜利' : '差一点'}.png`;
    }
    exports_1("stackShareFileName", stackShareFileName);
    return {
        setters: [
            function (brand_1_1) {
                brand_1 = brand_1_1;
            }
        ],
        execute: function () {
            exports_1("STACK_SHARE_WIDTH", STACK_SHARE_WIDTH = 1080);
            exports_1("STACK_SHARE_HEIGHT", STACK_SHARE_HEIGHT = 1440);
            exports_1("STACK_SHARE_TITLE", STACK_SHARE_TITLE = `《${brand_1.GAME_TITLE}》`);
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
        }
    };
});

System.register("chunks:///_virtual/stack-solver.ts", ["./stack-rules.ts"], function (exports_1, context_1) {
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
            if (slot.length >= stack_rules_1.SLOT_CAPACITY)
                return { valid: false, used: index + 1 };
        }
        return { valid: active.size === 0 && slot.length === 0, used: Math.min(picks.length, maxClicks) };
    }
    exports_1("simulateStackPicks", simulateStackPicks);
    function solveStackLevel(level, options = {}) {
        var _a;
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
                .filter(([kind, cardsOfKind]) => cardsOfKind.length >= stack_rules_1.PACK_SIZE && !state.slot.includes(kind) && state.slot.length <= stack_rules_1.SLOT_CAPACITY - stack_rules_1.PACK_SIZE)
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
                if (state.slot.length >= stack_rules_1.SLOT_CAPACITY && state.slot.filter(kind => kind === card.kind).length < 2)
                    continue;
                const nextActive = [...state.active];
                const index = level.cards.findIndex(candidate => candidate.id === card.id);
                nextActive[index] = false;
                const nextSlot = [...state.slot];
                insertAndClear(nextSlot, card.kind);
                if (nextSlot.length >= stack_rules_1.SLOT_CAPACITY)
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

System.register("chunks:///_virtual/StackPage.ts", ["cc","./stack-generator.ts","./stack-layout.ts","./stack-rules.ts","./rng.ts","./FinishTimeline.ts","./OptionalResources.ts","./StackSound.ts","./StackShareImage.ts","./UIKit.ts","./StackFinishView.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, stack_generator_1, stack_layout_1, stack_rules_1, rng_1, FinishTimeline_1, OptionalResources_1, StackSound_1, StackShareImage_1, UIKit_1, StackFinishView_1, ink, red, brightRed, cream, gold, paleGold, deep, shadow, blockedShade, dimText, gray, ITEM_CROPS, StackPage;
    var __moduleName = context_1 && context_1.id;
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
            function (stack_generator_1_1) {
                stack_generator_1 = stack_generator_1_1;
            },
            function (stack_layout_1_1) {
                stack_layout_1 = stack_layout_1_1;
            },
            function (stack_rules_1_1) {
                stack_rules_1 = stack_rules_1_1;
            },
            function (rng_1_1) {
                rng_1 = rng_1_1;
            },
            function (FinishTimeline_1_1) {
                FinishTimeline_1 = FinishTimeline_1_1;
            },
            function (OptionalResources_1_1) {
                OptionalResources_1 = OptionalResources_1_1;
            },
            function (StackSound_1_1) {
                StackSound_1 = StackSound_1_1;
            },
            function (StackShareImage_1_1) {
                StackShareImage_1 = StackShareImage_1_1;
            },
            function (UIKit_1_1) {
                UIKit_1 = UIKit_1_1;
            },
            function (StackFinishView_1_1) {
                StackFinishView_1 = StackFinishView_1_1;
            }
        ],
        execute: function () {
            ink = new cc_1.Color(74, 44, 26);
            red = new cc_1.Color(184, 27, 43);
            brightRed = new cc_1.Color(218, 52, 43);
            cream = new cc_1.Color(255, 246, 229);
            gold = new cc_1.Color(246, 195, 67);
            paleGold = new cc_1.Color(255, 219, 145);
            deep = new cc_1.Color(61, 24, 32);
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
                constructor(parent, stage, onAction) {
                    this.onAction = onAction;
                    this.carFrames = {};
                    this.carRect = { x: 30, y: 940, w: 690, h: 420 };
                    this.carScaleY = stack_layout_1.STACK_CAR_SCALE_Y;
                    this.soundRect = { x: 647, y: 162, w: 94, h: 52 };
                    this.cardViews = new Map();
                    this.itemFrames = new Map();
                    this.slotViews = [];
                    this.slotRects = Array.from({ length: stack_rules_1.SLOT_CAPACITY }, () => ({ x: 0, y: 0, w: 0, h: 0 }));
                    this.actions = [];
                    this.failButtons = [];
                    this.touchWorld = new cc_1.Vec3();
                    this.touchLocal = new cc_1.Vec3();
                    this.touchPoint = { x: 0, y: 0 };
                    this.onHide = () => { this.busy = false; };
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
                    this.actionY = 1527;
                    this.actionH = stack_layout_1.STACK_ACTION_HEIGHT;
                    this.level = stack_generator_1.generateStackLevel(stage, stack_generator_1.STACK_SEEDS[stage - 1]).level;
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
                    this.carDetail = UIKit_1.uiNode('TrunkDetails', this.carLayer, 750, 1334).addComponent(cc_1.Graphics);
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
                    const subtitle = UIKit_1.label(this.hud, 'Subtitle', '点没被压住的年货 · 三件装一箱', 19, 0, 0);
                    subtitle.color = cream;
                    this.soundButton = UIKit_1.uiNode('SoundToggle', this.hud, 94, 52);
                    this.soundButtonArt = this.soundButton.addComponent(cc_1.Graphics);
                    this.soundButtonLabel = UIKit_1.label(this.soundButton, 'SoundLabel', '声音 开', 16, 0, 0);
                    this.drawSoundButton();
                    this.reserveLayer = UIKit_1.uiNode('ReserveZone', this.node, 750, 1334);
                    this.reserveShelf = this.reserveLayer.addComponent(cc_1.Graphics);
                    this.reserveLayer.active = false;
                    this.pileLayer = UIKit_1.uiNode('CargoPile', this.node, 750, 1334);
                    this.slotLayer = UIKit_1.uiNode('TrunkSlots', this.node, 750, 1334);
                    this.fxLayer = UIKit_1.uiNode('Effects', this.node, 750, 1334);
                    this.slotTitle = UIKit_1.label(this.node, 'SlotTitle', '轿车后备箱 · 7 格', 17, 0, 0);
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
                    this.debugHook = {
                        getState: () => this.debugState(),
                        getClickable: () => this.debugClickable(),
                        getSolution: () => [...this.level.solution],
                        getModalButtons: () => this.debugModalButtons(),
                        getActions: () => this.debugActions(),
                        getFinishButtons: () => this.debugFinishButtons(),
                        getBoard: () => this.game.cards.map(card => ({
                            id: card.id, kind: card.kind, source: card.source, layer: card.layer,
                            x: card.x, y: card.y, w: card.w, h: card.h,
                        })),
                        getLayout: () => this.debugLayout(),
                    };
                    if (typeof window !== 'undefined') {
                        window.__stack = Object.freeze(this.debugHook);
                    }
                    this.node.once(cc_1.Node.EventType.NODE_DESTROYED, () => {
                        cc_1.game.off(cc_1.Game.EVENT_HIDE, this.onHide);
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
                        const bottom = Math.max(0, safe.y / size.height * this.height);
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
                    const metrics = stack_layout_1.createStackPageLayout(this.height, bottom);
                    this.actionY = metrics.actionY;
                    this.trunk = Object.assign({}, metrics.trunk);
                    this.carRect = {
                        x: 375 - stack_layout_1.STACK_BODY_SIZE.w / 2,
                        y: metrics.carTop,
                        w: stack_layout_1.STACK_BODY_SIZE.w,
                        h: metrics.bodyHeight,
                    };
                    this.slotCell = 96;
                    const gap = 3;
                    const slotWidth = stack_rules_1.SLOT_CAPACITY * this.slotCell + (stack_rules_1.SLOT_CAPACITY - 1) * gap;
                    const slotX = Math.round((750 - slotWidth) / 2);
                    this.slotY = this.trunk.y + Math.round((this.trunk.h - this.slotCell) / 2);
                    for (let i = 0; i < stack_rules_1.SLOT_CAPACITY; i++) {
                        this.slotRects[i].x = slotX + i * (this.slotCell + gap);
                        this.slotRects[i].y = this.slotY;
                        this.slotRects[i].w = this.slotCell;
                        this.slotRects[i].h = this.slotCell;
                    }
                    this.stageLabel.node.setPosition(-242, this.height / 2 - 61);
                    this.remainingLabel.node.setPosition(198, this.height / 2 - 61);
                    this.soundButton.setPosition(319, this.height / 2 - 188);
                    this.hud.getChildByName('ModeTitle').setPosition(0, this.height / 2 - 61);
                    this.hud.getChildByName('Subtitle').setPosition(0, this.height / 2 - 105);
                    this.slotTitle.node.setPosition(0, this.height / 2 - (this.slotY - 17));
                    this.reserveTitle.node.setPosition(-235, this.height / 2 - 920);
                    this.momLayer.getChildByName('MomBubble').setPosition(40, this.height / 2 - 204);
                    this.momAvatar.setPosition(-250, this.height / 2 - 204);
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
                    if (!this.carFrames.body) {
                        this.rect(g, new cc_1.Color(34, 22, 29, 210), car.x, car.y, car.w, Math.min(430, car.h), 54);
                        this.rect(g, new cc_1.Color(163, 31, 39), car.x + 28, car.y + 86, car.w - 56, 296, 46);
                        this.rect(g, new cc_1.Color(25, 21, 31), car.x + 158, car.y + 104, car.w - 316, 224, 34);
                    }
                    this.drawCarImages();
                    this.carDetail.clear();
                    this.drawTrunkDetails();
                    const slotWidth = (this.slotRects[stack_rules_1.SLOT_CAPACITY - 1].x + this.slotRects[stack_rules_1.SLOT_CAPACITY - 1].w) - this.slotRects[0].x;
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
                        this.bodyImage.node.setScale(1, this.carScaleY, 1);
                    }
                    if (lid) {
                        const lidW = 642, lidH = 82;
                        this.showImage(this.lidImage, lid, 375, this.carRect.y - 34, lidW, lidH);
                        this.lidImage.node.setScale(1, 1, 1);
                        this.lidImage.node.angle = -3;
                    }
                }
                drawTrunkDetails() {
                    this.rect(this.carDetail, new cc_1.Color(14, 11, 14, 82), this.trunk.x - 4, this.trunk.y - 3, this.trunk.w + 8, this.trunk.h + 6, 18);
                    this.stroke(this.carDetail, new cc_1.Color(255, 206, 120, 120), 2, this.trunk.x - 2, this.trunk.y - 1, this.trunk.w + 4, this.trunk.h + 2, 15);
                    this.rect(this.carDetail, new cc_1.Color(8, 6, 9, 112), this.trunk.x + 8, this.trunk.y + 6, this.trunk.w - 16, 20, 9);
                    const lidBottom = this.carRect.y + 38;
                    this.carDetail.strokeColor = new cc_1.Color(30, 17, 20, 220);
                    this.carDetail.lineWidth = 7;
                    this.carDetail.moveTo(97 - 375, this.height / 2 - (this.carRect.y + 12));
                    this.carDetail.lineTo(157 - 375, this.height / 2 - lidBottom);
                    this.carDetail.moveTo(653 - 375, this.height / 2 - (this.carRect.y + 12));
                    this.carDetail.lineTo(593 - 375, this.height / 2 - lidBottom);
                    this.carDetail.stroke();
                    this.carDetail.strokeColor = new cc_1.Color(255, 197, 101, 105);
                    this.carDetail.lineWidth = 2;
                    this.carDetail.moveTo(98 - 375, this.height / 2 - (this.carRect.y + 12));
                    this.carDetail.lineTo(157 - 375, this.height / 2 - lidBottom);
                    this.carDetail.moveTo(652 - 375, this.height / 2 - (this.carRect.y + 12));
                    this.carDetail.lineTo(593 - 375, this.height / 2 - lidBottom);
                    this.carDetail.stroke();
                }
                makeAction(key, title) {
                    const text = UIKit_1.label(this.buttonsLayer, `Action-${key}`, title, 25, 0, 0);
                    text.color = cream;
                    return { key, title, rect: { x: 0, y: 0, w: 0, h: 0 }, label: text };
                }
                drawSoundButton() {
                    const g = this.soundButtonArt;
                    g.clear();
                    const on = this.sounds.enabled;
                    UIKit_1.fill(g, on ? gold : new cc_1.Color(96, 87, 89), -47, -26, 94, 52, 16);
                    UIKit_1.fill(g, on ? new cc_1.Color(139, 31, 38) : new cc_1.Color(67, 61, 64), -43, -22, 86, 44, 13);
                    g.strokeColor = on ? new cc_1.Color(255, 226, 164) : new cc_1.Color(155, 146, 146);
                    g.lineWidth = 1.5;
                    g.roundRect(-45, -24, 90, 48, 15);
                    g.stroke();
                    this.soundButtonLabel.string = on ? '声音 开' : '声音 关';
                    this.soundButtonLabel.color = on ? paleGold : new cc_1.Color(205, 198, 194);
                }
                drawActions() {
                    const g = this.buttonsArt;
                    g.clear();
                    for (const action of this.actions) {
                        const used = this.game.props[action.key];
                        this.rect(g, used ? new cc_1.Color(69, 61, 63, 220) : new cc_1.Color(86, 28, 37, 238), action.rect.x, action.rect.y, action.rect.w, action.rect.h, 20);
                        this.stroke(g, used ? gray : gold, 2, action.rect.x + 2, action.rect.y + 2, action.rect.w - 4, action.rect.h - 4, 18);
                        this.rect(g, used ? new cc_1.Color(109, 99, 101) : new cc_1.Color(255, 213, 132, 90), action.rect.x + 17, action.rect.y + action.rect.h - 15, action.rect.w - 34, 3, 2);
                        action.label.string = used ? `${action.title} · 已用` : `${action.title} · 1 次`;
                        action.label.color = used ? new cc_1.Color(185, 177, 169) : paleGold;
                    }
                }
                refresh() {
                    this.updateHud();
                    this.updateReserve();
                    this.syncPile();
                    this.renderSlot(this.game.slot);
                    this.drawActions();
                }
                updateReserve() {
                    const reserve = this.game.cards.filter(card => card.source === 'reserve');
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
                    this.stageLabel.string = `第 ${this.level.stage} 关`;
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
                            view = this.makeCardView(card, card.w, this.pileLayer);
                            this.cardViews.set(card.id, view);
                            view.born = true;
                        }
                        if (view.kind !== card.kind || view.size !== card.w)
                            this.configureCard(view, card, card.w);
                        view.node.active = true;
                        view.node.setSiblingIndex(index);
                        const center = this.cardCenter(card);
                        if (view.born) {
                            view.node.setPosition(center.x, center.y + (card.source === 'mom' ? 120 : 0), 0);
                            if (card.source === 'mom')
                                cc_1.tween(view.node).to(0.28, { position: center }, { easing: 'bounceOut' }).start();
                            view.born = false;
                        }
                        else if (!this.busy || card.source !== 'mom') {
                            view.node.setPosition(center);
                        }
                        this.drawDim(view, stack_rules_1.isBlocked(card, this.game.cards));
                    }
                }
                renderSlot(cards) {
                    for (const view of this.slotViews)
                        if (view.node.isValid)
                            view.node.destroy();
                    this.slotViews = [];
                    for (let index = 0; index < cards.length && index < stack_rules_1.SLOT_CAPACITY; index++) {
                        const card = cards[index];
                        const rect = this.slotRects[index];
                        const size = Math.max(42, rect.w - 6);
                        const view = this.makeCardView(card, size, this.slotLayer);
                        view.node.setPosition(rect.x + rect.w / 2 - 375, this.height / 2 - (rect.y + rect.h / 2));
                        this.slotViews.push(view);
                    }
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
                    const dim = UIKit_1.uiNode('PressedShade', node, size, size).addComponent(cc_1.Graphics);
                    const view = { node, art, sprite, fallback, dim, size, kind: '', cardId: card.id, born: false };
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
                    return new cc_1.Vec3(card.x + card.w / 2 - 375, this.height / 2 - (card.y + card.h / 2), 0);
                }
                touch(event) {
                    var _a;
                    this.sounds.unlock();
                    const p = this.point(event);
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
                        this.sounds.toggle();
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
                    const hit = stack_rules_1.topCardAt(this.game.cards, p.x, p.y);
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
                    const flyer = this.makeCardView(result.card, result.card.w, this.fxLayer);
                    flyer.node.setPosition(this.cardCenter(result.card));
                    const targetIndex = Math.min(result.insertIndex, stack_rules_1.SLOT_CAPACITY - 1);
                    const slot = this.slotRects[targetIndex];
                    const target = new cc_1.Vec3(slot.x + slot.w / 2 - 375, this.height / 2 - (slot.y + slot.h / 2), 0);
                    const scale = Math.max(.35, (slot.w - 6) / result.card.w);
                    this.syncPile();
                    this.updateHud();
                    cc_1.tween(flyer.node).to(.2, { position: target, scale: new cc_1.Vec3(scale, scale, 1) }, { easing: 'quadOut' }).call(() => {
                        if (flyer.node.isValid)
                            flyer.node.destroy();
                        if (result.packed.length === stack_rules_1.PACK_SIZE)
                            this.playPack(result);
                        else
                            this.finishTap(result);
                    }).start();
                }
                playPack(result) {
                    this.renderSlot(result.slotBeforePack);
                    this.sounds.play('pack');
                    const packed = new Set(result.packed.map(card => card.id));
                    const views = this.slotViews.filter(view => packed.has(view.cardId));
                    const first = views[0];
                    if (!first) {
                        this.finishTap(result);
                        return;
                    }
                    const center = first.node.position.clone();
                    const start = views.map(view => view.node.position.clone());
                    setTimeout(() => {
                        if (!this.node.isValid)
                            return;
                        for (let i = 0; i < views.length; i++) {
                            const view = views[i];
                            cc_1.tween(view.node).to(.24, { position: center, scale: new cc_1.Vec3(.58, .58, 1), angle: i === 0 ? -8 : i === 2 ? 8 : 0 }, { easing: 'quadIn' }).start();
                        }
                        setTimeout(() => {
                            if (!this.node.isValid)
                                return;
                            for (let i = 0; i < views.length; i++)
                                views[i].node.setPosition(start[i]);
                            this.showPackedBox(center, () => this.finishTap(result));
                        }, 250);
                    }, 80);
                }
                showPackedBox(at, onDone) {
                    for (const view of this.slotViews)
                        view.node.active = false;
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
                    this.refresh();
                    if (result.status === 'lost')
                        this.openFail();
                    else if (result.status === 'won')
                        this.beginFinish();
                }
                useAction(key) {
                    this.sounds.play('tap');
                    if (key === 'moveOut') {
                        const moved = this.game.useMoveOut();
                        if (moved.length)
                            this.sounds.play('fly');
                    }
                    else if (key === 'undo') {
                        if (this.game.useUndo())
                            this.sounds.play('fly');
                    }
                    else if (this.game.useShuffle()) {
                        this.sounds.play('fly');
                    }
                    this.refresh();
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
                    UIKit_1.fill(g, new cc_1.Color(199, 48, 47, 170), -260, -238, 520, 170, 22);
                    const title = UIKit_1.label(layer, 'OverflowTitle', '后备箱塞爆了', 46, 0, 236);
                    title.color = gold;
                    const hint = UIKit_1.label(layer, 'OverflowHint', '7 格全满，还差一件同款年货', 22, 0, 190);
                    hint.color = cream;
                    this.drawOverflowCar(layer);
                    const revive = this.failButton(layer, 'revive', '复活 · 移出 3 件', -100);
                    const share = this.failButton(layer, 'share', '生成分享图', -180);
                    const restart = this.failButton(layer, 'restart', '重来', -260);
                    this.failButtons.push(revive, share, restart);
                    this.sounds.play('fail');
                    this.refreshFailButtons();
                }
                drawOverflowCar(parent) {
                    var _a, _b;
                    (_a = parent.getChildByName('OverflowCar')) === null || _a === void 0 ? void 0 : _a.destroy();
                    const car = UIKit_1.uiNode('OverflowCar', parent, 290, 200);
                    car.setPosition(0, 45);
                    const fallbackNode = UIKit_1.uiNode('OverflowFrame', car, 290, 200);
                    const fallback = fallbackNode.addComponent(cc_1.Graphics);
                    UIKit_1.fill(fallback, new cc_1.Color(30, 14, 18, 80), -132, -88, 264, 166, 28);
                    UIKit_1.fill(fallback, new cc_1.Color(132, 30, 34), -129, -84, 258, 158, 26);
                    UIKit_1.fill(fallback, new cc_1.Color(22, 18, 23), -91, -49, 182, 87, 16);
                    const body = this.makeImageNode('OverflowBody', car);
                    if (this.carFrames.body) {
                        body.spriteFrame = this.carFrames.body;
                        body.enabled = true;
                        body.node.getComponent(cc_1.UITransform).setContentSize(252, 158);
                        body.node.setPosition(0, -8);
                    }
                    const lid = this.makeImageNode('OverflowLid', car);
                    if (this.carFrames.lid) {
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
                        node.setPosition((index - 1) * 54, (_b = [58, 78, 52][index]) !== null && _b !== void 0 ? _b : 58);
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
                    text.color = action === 'revive' ? ink : paleGold;
                    return { action, title, rect, label: text };
                }
                refreshFailButtons() {
                    var _a;
                    if (!((_a = this.failLayer) === null || _a === void 0 ? void 0 : _a.isValid))
                        return;
                    const g = this.failLayer.getComponent(cc_1.Graphics);
                    for (const button of this.failButtons) {
                        UIKit_1.fill(g, button.action === 'revive' ? gold : deep, button.rect.x - 375, this.height / 2 - button.rect.y - button.rect.h, button.rect.w, button.rect.h, 20);
                        if (button.action !== 'revive') {
                            g.strokeColor = gold;
                            g.lineWidth = 2;
                            g.roundRect(button.rect.x - 375 + 2, this.height / 2 - button.rect.y - button.rect.h + 2, button.rect.w - 4, button.rect.h - 4, 18);
                            g.stroke();
                        }
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
                    this.sounds.play('tap');
                    this.refresh();
                }
                beginFinish() {
                    if (this.finish)
                        return;
                    this.busy = true;
                    this.sounds.play('win');
                    this.finishStarted = Date.now();
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
                    const choices = this.level.stage === 1
                        ? [{ title: '下一关', action: 'next' }, { title: '再来一次', action: 'replay' }]
                        : [{ title: '再来一次', action: 'replay' }, { title: '回第 1 关', action: 'first' }];
                    const elapsedSec = Math.max(1, Math.round((Date.now() - this.startedAt) / 1000));
                    this.finishStats = { elapsedSec, boxes: this.game.clearedGroups };
                    this.finishView = new StackFinishView_1.StackFinishView(this.node, choices, this.finishStats, action => this.mapFinish(action), () => this.openShare(true));
                    this.finishView.layout(this.height);
                    this.finishView.render(this.finish.state);
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
                    void StackShareImage_1.showStackShareImage({ stage: this.level.stage, result });
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
                        .map(card => ({
                        id: card.id,
                        kind: card.kind,
                        name: card.name,
                        screenX: (card.x + card.w / 2) / 750 * screenWidth,
                        screenY: (card.y + card.h / 2) / this.height * screenHeight,
                        screenLeft: card.x / 750 * screenWidth,
                        screenRight: (card.x + card.w) / 750 * screenWidth,
                        screenTop: card.y / this.height * screenHeight,
                        screenBottom: (card.y + card.h) / this.height * screenHeight,
                        screenW: card.w / 750 * screenWidth,
                        screenH: card.h / this.height * screenHeight,
                    }));
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
                    const screenWidth = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    const cards = this.game.cards;
                    const bounds = stack_layout_1.stackCardBounds(cards);
                    const layout = stack_layout_1.createStackPageLayout(this.height, this.safeBottom);
                    return {
                        viewport: { width: screenWidth, height: screenHeight },
                        cardSize: {
                            width: this.level.cardW / 750 * screenWidth,
                            height: this.level.cardH / this.height * screenHeight,
                        },
                        cardBounds: {
                            left: bounds.left / 750 * screenWidth,
                            right: bounds.right / 750 * screenWidth,
                            top: bounds.top / this.height * screenHeight,
                            bottom: bounds.bottom / this.height * screenHeight,
                        },
                        hudBottom: 140 / this.height * screenHeight,
                        trunkTop: this.trunk.y / this.height * screenHeight,
                        stackRegion: {
                            top: 140 / this.height * screenHeight,
                            bottom: this.trunk.y / this.height * screenHeight,
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
                    };
                }
                debugFinishButtons() {
                    if (!this.finishView)
                        return [];
                    const screenWidth = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    return this.finishView.buttonPoints().map(button => ({
                        action: button.action,
                        screenX: (button.rect.x + button.rect.w / 2) / 750 * screenWidth,
                        screenY: (button.rect.y + button.rect.h / 2) / this.height * screenHeight,
                    }));
                }
                debugModalButtons() {
                    if (this.modal !== 'fail')
                        return [];
                    const screenWidth = typeof window === 'undefined' ? 750 : window.innerWidth;
                    const screenHeight = typeof window === 'undefined' ? this.height : window.innerHeight;
                    return this.failButtons.map(button => ({
                        action: button.action,
                        screenX: (button.rect.x + button.rect.w / 2) / 750 * screenWidth,
                        screenY: (button.rect.y + button.rect.h / 2) / this.height * screenHeight,
                    }));
                }
            };
            exports_1("StackPage", StackPage);
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

System.register("chunks:///_virtual/WebPlatform.ts", [], function (exports_1, context_1) {
    "use strict";
    var WebPlatform;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            WebPlatform = class WebPlatform {
                now() { return Date.now(); }
                isMomMode() { return new URLSearchParams(window.location.search).get('mode') === 'mom'; }
                isStackMode() { return new URLSearchParams(window.location.search).get('mode') === 'stack'; }
                stackStage() {
                    return new URLSearchParams(window.location.search).get('stage') === '2' ? 2 : 1;
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
                    cc_1.resources.load(path, cc_1.SpriteFrame, (error, frame) => resolve(error ? undefined : frame));
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

System.register("chunks:///_virtual/StackShareImage.ts", ["./brand.ts","./stack-layout.ts","./stack-share.ts","./OptionalResources.ts"], function (exports_1, context_1) {
    "use strict";
    var brand_1, stack_layout_1, stack_share_1, OptionalResources_1, FONT, gold, pale;
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
        fillRounded(context, '#ffd77f', -43, -7, 86, 14, 7);
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
        const copy = stack_share_1.createStackShareCopy(scene.stage, scene.result);
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
        fillRounded(context, 'rgba(93,9,16,.42)', 395, 224, 290, 64, 32);
        context.strokeStyle = 'rgba(255,225,157,.72)';
        context.lineWidth = 3;
        roundedRect(context, 397, 226, 286, 60, 30);
        context.stroke();
        context.font = `700 34px ${FONT}`;
        context.fillStyle = pale;
        context.fillText(copy.stageText, 540, 256);
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
        context.fillText('把年货装进后备箱 · 把团圆带回家', 540, 1392);
    }
    async function renderShareCanvas(scene) {
        if (!canUseBrowserCanvas())
            return null;
        try {
            const [bodyFrame, trunkFrame, ...itemFrames] = await Promise.all([
                OptionalResources_1.loadArt('vehicles/sedan_v1_body'),
                OptionalResources_1.loadArt('vehicles/sedan_v1_trunk'),
                ...stack_share_1.STACK_SHARE_ITEM_KEYS.map(key => OptionalResources_1.loadArt(`items/${key}`)),
            ]);
            const canvas = document.createElement('canvas');
            canvas.width = stack_share_1.STACK_SHARE_WIDTH;
            canvas.height = stack_share_1.STACK_SHARE_HEIGHT;
            const context = canvas.getContext('2d');
            if (!context)
                return null;
            drawBackground(context);
            const copy = drawTexts(context, scene);
            const bodyX = 90, bodyY = 474, bodyWidth = 900, bodyHeight = 562;
            const body = frameDrawable(bodyFrame);
            if (body)
                drawFrame(context, body, bodyX + bodyWidth / 2, bodyY + bodyHeight / 2, bodyWidth, bodyHeight);
            else
                drawFallbackCar(context);
            drawCargo(context, frameDrawable(trunkFrame), itemFrames.map(frameDrawable), bodyX, bodyY, bodyWidth, bodyHeight);
            drawCaption(context, copy.caption);
            return canvas.toDataURL('image/png');
        }
        catch (_a) {
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

System.register("chunks:///_virtual/StackSound.ts", [], function (exports_1, context_1) {
    "use strict";
    var STACK_SOUND_STORAGE_KEY, STACK_SOUND_EVENTS, STACK_SOUND_PROFILES, StackSound;
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
    function browserStorage() {
        try {
            return typeof localStorage === 'undefined' ? undefined : localStorage;
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
    return {
        setters: [],
        execute: function () {
            exports_1("STACK_SOUND_STORAGE_KEY", STACK_SOUND_STORAGE_KEY = 'stack-sound-enabled');
            exports_1("STACK_SOUND_EVENTS", STACK_SOUND_EVENTS = ['tap', 'fly', 'pack', 'fail', 'win', 'mom']);
            exports_1("STACK_SOUND_PROFILES", STACK_SOUND_PROFILES = {
                tap: { label: '短哒', layers: 1 },
                fly: { label: '轻嗖', layers: 2 },
                pack: { label: '封箱咔哒与叮', layers: 2 },
                fail: { label: '下行低音', layers: 2 },
                win: { label: '上行喜庆音', layers: 4 },
                mom: { label: '妈妈提示音', layers: 2 },
            });
            /** Synthesizes short cues after the first real touch unlocks the browser AudioContext. */
            StackSound = class StackSound {
                constructor(storage = browserStorage()) {
                    this.storage = storage;
                    this.soundEnabled = readStackSoundEnabled(storage);
                }
                get enabled() { return this.soundEnabled; }
                toggle() {
                    this.soundEnabled = !this.soundEnabled;
                    writeStackSoundEnabled(this.soundEnabled, this.storage);
                    if (this.soundEnabled) {
                        this.unlock();
                        this.play('tap');
                    }
                    return this.soundEnabled;
                }
                unlock() {
                    const Ctor = contextConstructor();
                    if (!Ctor)
                        return;
                    try {
                        if (!this.context) {
                            this.context = new Ctor();
                            this.master = this.context.createGain();
                            this.master.gain.value = .42;
                            this.master.connect(this.context.destination);
                        }
                        if (this.context.state === 'suspended')
                            void this.context.resume().catch(() => undefined);
                    }
                    catch (_a) {
                        this.context = undefined;
                        this.master = undefined;
                    }
                }
                play(event) {
                    if (!this.soundEnabled)
                        return;
                    const context = this.context;
                    if (!context || !this.master)
                        return;
                    try {
                        if (context.state === 'suspended')
                            void context.resume().catch(() => undefined);
                        if (context.state === 'closed')
                            return;
                        this.synthesize(context, event);
                    }
                    catch ( /* Device/browser failure: audio is optional. */_a) { /* Device/browser failure: audio is optional. */ }
                }
                synthesize(context, event) {
                    const now = context.currentTime + .012;
                    switch (event) {
                        case 'tap':
                            this.tone(context, 'square', 560, 240, now, .052, .13);
                            this.noise(context, now, .022, .045, 1500, 700);
                            break;
                        case 'fly':
                            this.noise(context, now, .14, .09, 480, 1900);
                            this.tone(context, 'sine', 290, 560, now, .11, .035);
                            break;
                        case 'pack':
                            this.noise(context, now, .026, .13, 2400, 500);
                            this.tone(context, 'triangle', 145, 68, now, .085, .18);
                            this.tone(context, 'sine', 880, 880, now + .065, .18, .095);
                            this.tone(context, 'sine', 1318.5, 1318.5, now + .075, .22, .06);
                            break;
                        case 'fail':
                            this.tone(context, 'sawtooth', 245, 82, now, .52, .115);
                            this.tone(context, 'triangle', 164, 62, now + .06, .62, .075);
                            break;
                        case 'win': {
                            const notes = [523.25, 659.25, 783.99, 1046.5];
                            for (let index = 0; index < notes.length; index++) {
                                this.tone(context, 'sine', notes[index], notes[index], now + index * .075, .23, .09);
                                this.tone(context, 'triangle', notes[index] * .5, notes[index] * .5, now + index * .075, .2, .025);
                            }
                            break;
                        }
                        case 'mom':
                            this.tone(context, 'triangle', 659.25, 659.25, now, .16, .11);
                            this.tone(context, 'sine', 880, 880, now + .13, .22, .09);
                            break;
                    }
                }
                tone(context, type, startFrequency, endFrequency, start, duration, peak) {
                    const oscillator = context.createOscillator();
                    const gain = context.createGain();
                    oscillator.type = type;
                    oscillator.frequency.setValueAtTime(Math.max(1, startFrequency), start);
                    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
                    gain.gain.setValueAtTime(.0001, start);
                    gain.gain.linearRampToValueAtTime(peak, start + .012);
                    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
                    oscillator.connect(gain);
                    gain.connect(this.master);
                    oscillator.start(start);
                    oscillator.stop(start + duration + .02);
                }
                noise(context, start, duration, peak, startFrequency, endFrequency) {
                    const frameCount = Math.max(1, Math.ceil(context.sampleRate * duration));
                    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
                    const data = buffer.getChannelData(0);
                    for (let index = 0; index < data.length; index++)
                        data[index] = Math.random() * 2 - 1;
                    const source = context.createBufferSource();
                    const filter = context.createBiquadFilter();
                    const gain = context.createGain();
                    source.buffer = buffer;
                    filter.type = 'bandpass';
                    filter.Q.value = .85;
                    filter.frequency.setValueAtTime(startFrequency, start);
                    filter.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
                    gain.gain.setValueAtTime(.0001, start);
                    gain.gain.linearRampToValueAtTime(peak, start + .008);
                    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
                    source.connect(filter);
                    filter.connect(gain);
                    gain.connect(this.master);
                    source.start(start);
                    source.stop(start + duration + .02);
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
                constructor(parent, choices, stats, onAction, onShare = () => undefined) {
                    this.choices = choices;
                    this.stats = stats;
                    this.onAction = onAction;
                    this.onShare = onShare;
                    this.cargoSprites = [];
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
                    this.actions = UIKit_1.uiNode('FinishActions', this.node, 750, 320);
                    this.actionArt = this.actions.addComponent(cc_1.Graphics);
                    const choicesWithShare = [
                        ...choices,
                        { title: '生成分享图', action: 'share' },
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
                    this.actions.active = state.buttons;
                    this.node.getChildByName('SkipHint').active = !state.buttons;
                }
                press(x, y) {
                    var _a;
                    if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.buttons))
                        return;
                    for (const button of this.buttons) {
                        if (!InteractionGeometry_1.inRect({ x, y }, button.rect))
                            continue;
                        if (button.action === 'share')
                            this.onShare();
                        else
                            this.onAction(button.action);
                        return;
                    }
                }
                buttonPoints() {
                    return this.buttons.map(button => ({ action: button.action, rect: Object.assign({}, button.rect) }));
                }
                imageNode(name, parent) {
                    const sprite = UIKit_1.uiNode(name, parent, 1, 1).addComponent(cc_1.Sprite);
                    sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.enabled = false;
                    return sprite;
                }
                setupCar() {
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

System.register("chunks:///_virtual/main", ["./Bootstrap.ts","./brand.ts","./date.ts","./dlx.ts","./generator.ts","./input.ts","./items.ts","./level.ts","./provinces.ts","./rng.ts","./shapes.ts","./stack-catalog.ts","./stack-generator.ts","./stack-layout.ts","./stack-rules.ts","./stack-share.ts","./stack-solver.ts","./stack-types.ts","./stage1.ts","./types.ts","./validate.ts","./vehicles.ts","./DragController.ts","./FinishTimeline.ts","./InteractionGeometry.ts","./StageSession.ts","./StackPage.ts","./StagePage.ts","./WebPlatform.ts","./Api.ts","./OptionalResources.ts","./SoundEffects.ts","./StackShareImage.ts","./StackSound.ts","./FinishView.ts","./ItemArt.ts","./JourneyArt.ts","./StackFinishView.ts","./StageArt.ts","./UIKit.ts"], function () {
  return { setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], execute: function () {} };
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
