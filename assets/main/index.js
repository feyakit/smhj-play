System.register("chunks:///_virtual/Bootstrap.ts", ["cc","./__cc_env.js","./brand.ts","./date.ts","./stage1.ts","./StagePage.ts","./WebPlatform.ts","./Api.ts","./UIKit.ts","./JourneyArt.ts"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cc_1, env_1, brand_1, date_1, stage1_1, StagePage_1, WebPlatform_1, Api_1, UIKit_1, JourneyArt_1, ccclass, Bootstrap;
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
                    if (this.platform.isMomMode())
                        void this.startMomMode();
                    else if (this.platform.hasLevelOverride())
                        void this.challenge();
                    else
                        this.show(stage1_1.stage1(date_1.shanghaiDate()));
                }
                update() { var _a; (_a = this.stage) === null || _a === void 0 ? void 0 : _a.tick(); }
                show(level) {
                    this.node.destroyAllChildren();
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
            const level = Object.assign(Object.assign({}, board), { pieces: indices.map((source, index) => ({
                    id: index + 1, shape: shapes[source], item: items_1.ITEMS[shapes[source]].key,
                    initialRotation: (cfg.randomInitialRotation === false ? 0 : Math.floor(random() * 4)),
                })) });
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
    var ITEMS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("ITEMS", ITEMS = {
                I2: { key: 'liquor', name: '一箱白酒' }, I3: { key: 'sausage', name: '腊肠串' }, L3: { key: 'ricecooker', name: '电饭煲' }, I4: { key: 'sugarcane', name: '甘蔗' }, O4: { key: 'milk', name: '牛奶箱' }, L4: { key: 'suitcase_s', name: '登机箱' }, J4: { key: 'duffel', name: '拉杆包' }, T4: { key: 'nutbox', name: '坚果礼盒' }, S4: { key: 'fish', name: '鱼' }, Z4: { key: 'duck', name: '腊鸭' }, P5: { key: 'quilt', name: '被子' }, L5: { key: 'frozenbox', name: '冻品泡沫箱' }, T5: { key: 'tv', name: '电视' }, U5: { key: 'coop', name: '鸡鸭笼' }, V5: { key: 'crab', name: '大闸蟹礼盒' }, Z5: { key: 'painting', name: '年画卷' }, N5: { key: 'lotusroot', name: '莲藕' }, Y5: { key: 'couplets', name: '春联礼包' }, R6: { key: 'suitcase_l', name: '大号行李箱' }
            });
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
    var shapes_1, inRect, geometry;
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
    // Reserve every piece's largest orientation so drops/rotations never move another slot.
    function trayLayout(pieces, tray) {
        const extents = pieces.map(piece => {
            const box = dimensions(piece, 0);
            return Math.max(box.w, box.h);
        });
        const gap = 6;
        const fit = (rows) => {
            const count = Math.ceil(pieces.length / rows);
            let cell = 40;
            for (let row = 0; row < rows; row++) {
                const values = extents.slice(row * count, (row + 1) * count);
                if (values.length)
                    cell = Math.min(cell, (tray.w - gap * (values.length + 1)) / values.reduce((a, b) => a + b, 0), (tray.h / rows - 2 * gap) / Math.max(...values));
            }
            return { cell, count };
        };
        let rows = 1;
        let result = fit(rows);
        if (result.cell < 28) {
            rows = 2;
            result = fit(rows);
        }
        // Layout callers must provide enough room for the specified 20px minimum.
        if (pieces.length <= 12 && result.cell < 20)
            throw new Error('Tray too small for 20px luggage cells');
        const cell = Math.floor(result.cell);
        const slots = [];
        for (let row = 0; row < rows; row++) {
            let x = tray.x + gap;
            for (let i = row * result.count; i < Math.min((row + 1) * result.count, pieces.length); i++) {
                const size = extents[i] * cell;
                slots.push({ piece: pieces[i], rect: { x, y: tray.y + row * tray.h / rows + (tray.h / rows - size) / 2, w: size, h: size } });
                x += size + gap;
            }
        }
        return { cell, slots };
    }
    exports_1("trayLayout", trayLayout);
    return {
        setters: [
            function (shapes_1_1) {
                shapes_1 = shapes_1_1;
            }
        ],
        execute: function () {
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

System.register("chunks:///_virtual/StagePage.ts", ["cc","./brand.ts","./items.ts","./StageSession.ts","./DragController.ts","./InteractionGeometry.ts","./SoundEffects.ts","./OptionalResources.ts","./UIKit.ts","./FinishTimeline.ts","./FinishView.ts"], function (exports_1, context_1) {
    "use strict";
    var cc_1, brand_1, items_1, StageSession_1, DragController_1, InteractionGeometry_1, SoundEffects_1, OptionalResources_1, UIKit_1, FinishTimeline_1, FinishView_1, ink, red, cream, gold, gray, green, invalid, colors, shadow, MOM_INTRO_MS, MOM_APPEAR_MS, MOM_STAY_MS, StagePage;
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
            }
        ],
        execute: function () {
            ink = new cc_1.Color(74, 44, 26), red = new cc_1.Color(215, 51, 43), cream = new cc_1.Color(255, 246, 229);
            gold = new cc_1.Color(246, 195, 67), gray = new cc_1.Color(160, 151, 136);
            green = new cc_1.Color(76, 175, 80, 128), invalid = new cc_1.Color(229, 57, 53, 128);
            colors = [new cc_1.Color(174, 64, 53), new cc_1.Color(157, 99, 36), new cc_1.Color(65, 115, 97), new cc_1.Color(95, 87, 140)];
            shadow = new cc_1.Color(40, 20, 10, 70);
            MOM_INTRO_MS = 3800, MOM_APPEAR_MS = 700, MOM_STAY_MS = 1300;
            StagePage = class StagePage {
                constructor(parent, level, now, onClear) {
                    var _a;
                    this.level = level;
                    this.now = now;
                    this.onClear = onClear;
                    this.pieces = new Map();
                    this.drag = new DragController_1.DragController();
                    this.buttons = [];
                    this.slots = [];
                    this.board = { x: 0, y: 0, w: 0, h: 0 };
                    this.tray = { x: 24, y: 880, w: 702, h: 270 };
                    this.cell = 0;
                    this.trayCell = 0;
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
                    this.onHide = () => this.cancelDrag();
                    this.node = UIKit_1.uiNode('StagePage', parent, 750, 1334);
                    this.allPieces = [...level.pieces, ...(level.mode === 'mom' ? ((_a = level.extras) !== null && _a !== void 0 ? _a : []).flat() : [])];
                    this.session = new StageSession_1.StageSession(level, now);
                    this.sounds = new SoundEffects_1.SoundEffects(parent);
                    this.background = UIKit_1.uiNode('GridBackground', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.clock = UIKit_1.label(this.node, 'Clock', '', 28, 0, 0);
                    this.packed = UIKit_1.label(this.node, 'Packed', '', 26, 0, 0);
                    this.notice = UIKit_1.label(this.node, 'Notice', '', 24, 0, 0);
                    this.momIntro = UIKit_1.label(this.node, 'MomIntro', '妈妈说：再带点东西！', 28, 0, 0);
                    this.momIntro.color = red;
                    this.momIntro.node.active = false;
                    this.momIntroUntil = level.mode === 'mom' ? now() + MOM_INTRO_MS : 0;
                    UIKit_1.label(this.node, 'Title', brand_1.GAME_TITLE, 42, 0, 0);
                    UIKit_1.label(this.node, 'Vehicle', `第 ${level.stage} 关 · 拖年货进后备箱`, 27, 0, 0);
                    this.preview = UIKit_1.uiNode('DropPreview', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    for (const piece of this.allPieces) {
                        const node = UIKit_1.uiNode(`Piece${piece.id}`, this.node, 1, 1);
                        const graphics = UIKit_1.uiNode(`Fallback${piece.id}`, node, 1, 1).addComponent(cc_1.Graphics);
                        const sprite = UIKit_1.uiNode(`Sprite${piece.id}`, node, 1, 1).addComponent(cc_1.Sprite);
                        sprite.sizeMode = cc_1.Sprite.SizeMode.CUSTOM;
                        sprite.trim = false;
                        sprite.enabled = false;
                        const title = UIKit_1.label(node, `Item${piece.id}`, items_1.ITEMS[piece.shape].name, 18, 0, 0);
                        this.pieces.set(piece.id, { node, sprite, graphics, title, held: false, failed: false, rect: { x: 0, y: 0, w: 0, h: 0 }, rotation: 0, size: 0 });
                    }
                    this.controls = UIKit_1.uiNode('Controls', this.node, 750, 1334).addComponent(cc_1.Graphics);
                    this.rotateTitle = this.button('旋转 90°', 45, 180, () => this.rotateSelected(), true);
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
                    for (const piece of this.allPieces) {
                        void OptionalResources_1.loadArt(`items/${items_1.ITEMS[piece.shape].key}`).then(frame => {
                            if (!frame || !this.node.isValid)
                                return;
                            const v = this.pieces.get(piece.id);
                            v.sprite.spriteFrame = frame;
                            this.drawPiece(piece, v.rotation, v.size, v.held, v.failed);
                        });
                    }
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
                    this.momIntro.node.active = this.level.mode === 'mom' && !this.mom && this.now() < this.momIntroUntil;
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
                        this.clock.color = seconds <= 10 ? red : ink;
                    }
                    if (this.session.expired && !this.cleared && this.modal !== 'timeout') {
                        this.cancelDrag();
                        this.modal = 'timeout';
                        this.updateOverlay();
                    }
                }
                layout(top, bottom) {
                    var _a;
                    const extra = this.height - 1334;
                    const boardTop = (this.level.mode === 'mom' ? 230 : 205) + top;
                    const boardBottom = 850 + extra - bottom;
                    this.cell = Math.floor(Math.min(110, 640 / this.level.width, (boardBottom - boardTop - 35) / this.level.height));
                    this.board = { x: (750 - this.cell * this.level.width) / 2, y: boardTop + (boardBottom - boardTop - this.cell * this.level.height) / 2,
                        w: this.cell * this.level.width, h: this.cell * this.level.height };
                    this.tray = { x: 24, y: 880 + extra - bottom, w: 702, h: 270 };
                    this.layoutTray();
                    this.placeLabel('Title', 65 + top);
                    this.placeLabel('Vehicle', this.level.mode === 'mom' ? 100 + top : 122 + top);
                    this.placeLabel('MomIntro', 150 + top);
                    this.placeLabel('Clock', (this.level.mode === 'mom' ? 190 : 172) + top, 190);
                    this.placeLabel('Packed', (this.level.mode === 'mom' ? 190 : 172) + top, -180);
                    this.placeLabel('Notice', 860 + extra - bottom);
                    this.momBubbleNode.setPosition(-75, this.height / 2 - 735);
                    this.momAvatar.setPosition(300, this.height / 2 - 795);
                    for (const [i, button] of this.buttons.entries()) {
                        button.rect.y = 1170 + extra - bottom;
                        this.placeLabel(`Button${i}`, button.rect.y + 60, button.rect.x + button.rect.w / 2 - 375);
                    }
                    this.drawBackground();
                    this.sync();
                    this.updateOverlay();
                    (_a = this.finishView) === null || _a === void 0 ? void 0 : _a.layout(this.height, this.board);
                }
                placeLabel(name, y, x = 0) { this.node.getChildByName(name).setPosition(x, this.height / 2 - y); }
                rect(g, r, color) { UIKit_1.fill(g, color, r.x - 375, this.height / 2 - r.y - r.h, r.w, r.h, 6); }
                drawBackground() {
                    const g = this.background;
                    g.clear();
                    this.rect(g, { x: 0, y: 0, w: 750, h: this.height }, cream);
                    this.rect(g, { x: this.board.x - 14, y: this.board.y - 14, w: this.board.w + 28, h: this.board.h + 28 }, red);
                    this.rect(g, this.board, new cc_1.Color(232, 217, 191));
                    for (let y = 0; y < this.level.height; y++)
                        for (let x = 0; x < this.level.width; x++) {
                            const blocked = this.level.blocked.some(([bx, by]) => bx === x && by === y);
                            const r = { x: this.board.x + x * this.cell + 1, y: this.board.y + y * this.cell + 1, w: this.cell - 2, h: this.cell - 2 };
                            this.rect(g, r, blocked ? ink : cream);
                            if (blocked) {
                                g.strokeColor = gold;
                                g.lineWidth = 3;
                                for (let d = 6; d < this.cell - 6; d += 12) {
                                    g.moveTo(r.x - 375 + d, this.height / 2 - r.y - 4);
                                    g.lineTo(r.x - 375 + 4, this.height / 2 - r.y - d);
                                    g.stroke();
                                }
                            }
                        }
                    this.rect(g, this.tray, new cc_1.Color(232, 217, 191));
                }
                button(text, x, w, action, duringDrag = false) {
                    const index = this.buttons.length;
                    this.buttons.push({ rect: { x, y: 1170, w, h: 120 }, action, duringDrag });
                    return UIKit_1.label(this.node, `Button${index}`, text, 30, 0, 0);
                }
                updateControls() {
                    this.controls.clear();
                    for (const [i, b] of this.buttons.entries())
                        this.rect(this.controls, b.rect, i === 0 ? (this.selected ? gold : gray) : red);
                    this.rotateTitle.color = this.selected ? ink : cream;
                    this.notice.string = this.selected ? `已选中 · ${items_1.ITEMS[this.selected.shape].name}` : '轻点选中 · 拖动装车 · 按按钮旋转';
                    const total = this.level.mode === 'mom' ? this.session.totalPieces : this.session.pieces.length;
                    this.packed.string = `已装车 ${this.session.placements.length} / ${total} 件`;
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
                    if (this.level.mode === 'mom')
                        this.layoutTray();
                    const active = new Set(this.session.pieces.map(piece => piece.id));
                    for (const piece of this.allPieces) {
                        const visible = active.has(piece.id), view = this.pieces.get(piece.id);
                        view.node.active = visible;
                        if (visible)
                            this.renderPiece(piece);
                    }
                    this.clearPreview();
                    this.updateControls();
                }
                layoutTray() {
                    const unplaced = this.level.mode === 'mom'
                        ? this.session.pieces.filter(piece => !this.session.placements.some(placement => placement.pieceId === piece.id))
                        : this.session.pieces;
                    const tray = InteractionGeometry_1.trayLayout(unplaced, this.tray);
                    this.slots = tray.slots;
                    this.trayCell = tray.cell;
                }
                renderPiece(piece) {
                    var _a, _b;
                    const view = this.pieces.get(piece.id);
                    cc_1.Tween.stopAllByTarget(view.node);
                    view.node.angle = 0;
                    view.node.setScale(1, 1, 1);
                    const placement = this.session.placements.find(p => p.pieceId === piece.id);
                    const rotation = this.session.rotationFor(piece.id);
                    const size = placement ? this.cell : this.trayCell;
                    const box = InteractionGeometry_1.dimensions(piece, rotation);
                    const slot = (_b = (_a = this.slots.find(s => s.piece.id === piece.id)) === null || _a === void 0 ? void 0 : _a.rect) !== null && _b !== void 0 ? _b : this.tray;
                    const rect = placement ? { x: this.board.x + placement.x * size, y: this.board.y + placement.y * size, w: box.w * size, h: box.h * size } :
                        { x: slot.x + (slot.w - box.w * size) / 2, y: slot.y + (slot.h - box.h * size) / 2, w: box.w * size, h: box.h * size };
                    view.rect = rect;
                    view.rotation = rotation;
                    view.size = size;
                    this.drawPiece(piece, rotation, size, false);
                    this.position(view, rect.x + rect.w / 2, rect.y + rect.h / 2);
                }
                position(view, x, y) { view.node.setPosition(x - 375, this.height / 2 - y); }
                drawPiece(piece, rotation, size, held, failed = false) {
                    var _a, _b;
                    const view = this.pieces.get(piece.id);
                    view.rotation = rotation;
                    view.size = size;
                    view.held = held;
                    view.failed = failed;
                    const g = view.graphics;
                    g.clear();
                    const box = InteractionGeometry_1.dimensions(piece, rotation), w = box.w * size, h = box.h * size;
                    view.node.getComponent(cc_1.UITransform).setContentSize(w, h);
                    const hasImage = !!view.sprite.spriteFrame;
                    view.sprite.enabled = hasImage;
                    view.title.node.active = !hasImage;
                    if (hasImage) {
                        const base = InteractionGeometry_1.dimensions(piece, 0);
                        view.sprite.node.getComponent(cc_1.UITransform).setContentSize(base.w * size, base.h * size);
                        view.sprite.node.angle = rotation * 90;
                        view.sprite.color = failed ? red : ((_a = this.selected) === null || _a === void 0 ? void 0 : _a.id) === piece.id ? gold : cc_1.Color.WHITE;
                    }
                    for (const [x, y] of InteractionGeometry_1.pieceCells(piece, rotation)) {
                        if (held)
                            UIKit_1.fill(g, shadow, x * size - w / 2 + 8, h / 2 - (y + 1) * size - 9, size - 3, size - 3, 5);
                        if (hasImage)
                            continue;
                        UIKit_1.fill(g, failed ? red : ((_b = this.selected) === null || _b === void 0 ? void 0 : _b.id) === piece.id ? gold : ink, x * size - w / 2 + 1, h / 2 - (y + 1) * size + 1, size - 2, size - 2, 5);
                        UIKit_1.fill(g, colors[piece.id % colors.length], x * size - w / 2 + 4, h / 2 - (y + 1) * size + 4, size - 8, size - 8, 4);
                    }
                    view.title.fontSize = Math.max(12, Math.min(22, size * .6));
                    view.title.color = cream;
                    view.title.node.setPosition(0, 0);
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
                    const piece = this.session.pieces.slice().reverse().find(piece => InteractionGeometry_1.inRect(p, this.pieces.get(piece.id).rect));
                    if (piece && this.selected && piece.id !== this.selected.id) {
                        const old = this.selected;
                        this.selected = undefined;
                        this.renderPiece(old);
                        this.updateControls();
                    }
                    this.drag.begin({ id: (_a = event.getID()) !== null && _a !== void 0 ? _a : 0, start: p, time: this.now(), piece, fromTray: InteractionGeometry_1.inRect(p, this.tray),
                        rotation: piece ? this.session.rotationFor(piece.id) : 0, offset: { x: 0, y: 0 } });
                }
                move(event) {
                    var _a, _b;
                    const previous = (_a = this.drag.active) === null || _a === void 0 ? void 0 : _a.mode;
                    const gesture = this.drag.move((_b = event.getID()) !== null && _b !== void 0 ? _b : 0, this.point(event));
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
                    const released = this.drag.release((_a = event.getID()) !== null && _a !== void 0 ? _a : 0, this.point(event), this.now());
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
                    this.momIntro.node.active = false;
                    this.momLayer.active = false;
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
                }
                cancelDrag() { if (this.drag.cancel())
                    this.sync(); }
                cancel(event) { var _a; if (this.drag.cancel((_a = event.getID()) !== null && _a !== void 0 ? _a : 0))
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
                    const level = await this.load(`dev-levels/${this.platform.levelFilename()}`);
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
            exports_1("AUDIO_NAMES", AUDIO_NAMES = ['pickup', 'drop', 'invalid', 'rotate', 'undo', 'tick', 'trunk_slam', 'horn', 'cheer', 'mom']);
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
                constructor(parent, stage, onAction) {
                    this.onAction = onAction;
                    this.pool = FinishTimeline_1.createConfettiPool();
                    this.particles = [];
                    this.buttonRects = [];
                    this.height = 1334;
                    this.carY = 0;
                    this.lidHeight = 0;
                    this.lightsOn = false;
                    this.node = UIKit_1.uiNode('Finish', parent, 750, 1334);
                    this.choices = FinishTimeline_1.finishButtons(stage);
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
                layout(height, board) {
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
                    this.headline.setPosition(0, -110);
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

System.register("chunks:///_virtual/main", ["./Bootstrap.ts","./brand.ts","./date.ts","./dlx.ts","./generator.ts","./input.ts","./items.ts","./level.ts","./provinces.ts","./rng.ts","./shapes.ts","./stage1.ts","./types.ts","./validate.ts","./vehicles.ts","./DragController.ts","./FinishTimeline.ts","./InteractionGeometry.ts","./StageSession.ts","./StagePage.ts","./WebPlatform.ts","./Api.ts","./OptionalResources.ts","./SoundEffects.ts","./FinishView.ts","./JourneyArt.ts","./UIKit.ts"], function () {
  return { setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], execute: function () {} };
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
