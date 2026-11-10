System.register("chunks:///_virtual/Api.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './level.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, resources, JsonAsset, parseLevel;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      parseLevel = module.parseLevel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8971d9DqApCTLbMjca3NApN", "Api", undefined);
      var Api = exports('Api', /*#__PURE__*/function () {
        function Api(platform) {
          this.platform = platform;
        }
        var _proto = Api.prototype;
        _proto.loadChallenge = /*#__PURE__*/function () {
          var _loadChallenge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var name, asset, level;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  name = this.platform.levelFilename();
                  _context.next = 3;
                  return new Promise(function (resolve, reject) {
                    resources.load("dev-levels/" + name, JsonAsset, function (error, value) {
                      return error ? reject(error) : resolve(value);
                    });
                  });
                case 3:
                  asset = _context.sent;
                  level = parseLevel(asset.json);
                  if (!(level.stage !== 2)) {
                    _context.next = 7;
                    break;
                  }
                  throw new Error('挑战关数据无效');
                case 7:
                  return _context.abrupt("return", level);
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function loadChallenge() {
            return _loadChallenge.apply(this, arguments);
          }
          return loadChallenge;
        }();
        return Api;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Bootstrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './brand.ts', './date.ts', './stage1.ts', './StagePage.ts', './WebPlatform.ts', './Api.ts', './UIKit.ts', './JourneyArt.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, view, Graphics, Color, Node, director, Director, profiler, ResolutionPolicy, Layers, Component, GAME_TITLE, GAME_SUBTITLE, shanghaiDate, stage1, StagePage, WebPlatform, Api, uiNode, fill, label, drawHomeRoad, drawWelcomeHome;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      Graphics = module.Graphics;
      Color = module.Color;
      Node = module.Node;
      director = module.director;
      Director = module.Director;
      profiler = module.profiler;
      ResolutionPolicy = module.ResolutionPolicy;
      Layers = module.Layers;
      Component = module.Component;
    }, function (module) {
      GAME_TITLE = module.GAME_TITLE;
      GAME_SUBTITLE = module.GAME_SUBTITLE;
    }, function (module) {
      shanghaiDate = module.shanghaiDate;
    }, function (module) {
      stage1 = module.stage1;
    }, function (module) {
      StagePage = module.StagePage;
    }, function (module) {
      WebPlatform = module.WebPlatform;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      uiNode = module.uiNode;
      fill = module.fill;
      label = module.label;
    }, function (module) {
      drawHomeRoad = module.drawHomeRoad;
      drawWelcomeHome = module.drawWelcomeHome;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "f351ad+Zc5MRo4tO6llhth2", "Bootstrap", undefined);
      var ccclass = _decorator.ccclass;
      var Bootstrap = exports('Bootstrap', (_dec = ccclass('Bootstrap'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Bootstrap, _Component);
        function Bootstrap() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.stage = void 0;
          _this.platform = new WebPlatform();
          _this.api = new Api(_this.platform);
          return _this;
        }
        var _proto = Bootstrap.prototype;
        _proto.start = function start() {
          if (this.platform.hasLevelOverride()) void this.challenge();else this.show(stage1(shanghaiDate()));
        };
        _proto.update = function update() {
          var _this$stage;
          (_this$stage = this.stage) == null || _this$stage.tick();
        };
        _proto.show = function show(level) {
          var _this2 = this;
          this.node.destroyAllChildren();
          this.stage = new StagePage(this.node, level, function () {
            return _this2.platform.now();
          }, function () {
            if (level.stage === 1) void _this2.challenge();else _this2.message('行李塞满了，回家！', function () {
              return _this2.show(stage1(shanghaiDate()));
            });
          });
        };
        _proto.challenge = /*#__PURE__*/function () {
          var _challenge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this3 = this;
            var level;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.message('年货装上车，准备跑最后一程');
                  _context.prev = 1;
                  _context.next = 4;
                  return this.api.loadChallenge();
                case 4:
                  level = _context.sent;
                  if (this.node.isValid) this.show(level);
                  _context.next = 11;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  if (this.node.isValid) this.message('挑战关读取失败，点屏幕重试', function () {
                    return void _this3.challenge();
                  });
                case 11:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1, 8]]);
          }));
          function challenge() {
            return _challenge.apply(this, arguments);
          }
          return challenge;
        }();
        _proto.message = function message(text, onTap) {
          this.stage = undefined;
          this.node.destroyAllChildren();
          var size = view.getVisibleSize();
          var width = 750;
          var height = 1334;
          var screen = uiNode('Message', this.node, width, height);
          var scale = Math.min(size.width / width, size.height / height);
          screen.setScale(scale, scale, 1);
          var art = screen.addComponent(Graphics);
          fill(art, new Color(255, 246, 229), -width / 2, -height / 2, width, height);
          drawHomeRoad(art, width, height, 0);
          label(screen, 'Brand', GAME_TITLE, 62, 0, 549).color = new Color(255, 246, 229);
          label(screen, 'Subtitle', GAME_SUBTITLE, 25, 0, 488).color = new Color(255, 222, 181);
          var arrived = text === '行李塞满了，回家！';
          if (arrived) {
            drawWelcomeHome(art);
            label(screen, 'Arrival', '春运这一程 · 平安到家', 26, 0, 320);
            label(screen, 'Message', text, 48, 0, -66);
            label(screen, 'Family', '家里还亮着灯，年夜饭等你开席。', 28, 0, -139);
            fill(art, new Color(158, 45, 41), -148, -300, 296, 64, 16);
            label(screen, 'Again', '再跑一趟', 29, 0, -268).color = new Color(255, 246, 229);
          } else {
            label(screen, 'Message', text, 32, 0, 0);
          }
          if (onTap) screen.once(Node.EventType.TOUCH_END, onTap);
        };
        return Bootstrap;
      }(Component)) || _class));
      {
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, function (scene) {
          var canvas = scene.getChildByName('Canvas');
          if (!canvas) return;
          profiler == null || profiler.hideStats();
          view.setDesignResolutionSize(750, 1334, ResolutionPolicy.FIXED_WIDTH);
          var root = canvas.getChildByName('GameRoot');
          if (!root) {
            root = new Node('GameRoot');
            root.layer = Layers.Enum.UI_2D;
            canvas.addChild(root);
          }
          if (!root.getComponent(Bootstrap)) root.addComponent(Bootstrap);
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/brand.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "adf11UdCjZE4o4heQHrld0l", "brand", undefined);
      var GAME_TITLE = exports('GAME_TITLE', '塞满回家');
      var GAME_SUBTITLE = exports('GAME_SUBTITLE', '为老家接回更多人');
      var GAME_SLOGAN = exports('GAME_SLOGAN', '年货塞不下');
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/date.ts", ['cc', './vehicles.ts'], function (exports) {
  var cclegacy, VEHICLES;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      VEHICLES = module.VEHICLES;
    }],
    execute: function () {
      exports({
        shanghaiDate: shanghaiDate,
        vehicleForDate: vehicleForDate
      });
      cclegacy._RF.push({}, "f3c74AZQ9pHW4o77RwTVELk", "date", undefined);
      function shanghaiDate(time) {
        if (time === void 0) {
          time = new Date();
        }
        var parts = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).formatToParts(time);
        var get = function get(type) {
          var _parts$find;
          return (_parts$find = parts.find(function (part) {
            return part.type === type;
          })) == null ? void 0 : _parts$find.value;
        };
        return get('year') + "-" + get('month') + "-" + get('day');
      }
      function vehicleForDate(date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('invalid date');
        var time = Date.parse(date + 'T00:00:00Z');
        if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== date) throw new Error('invalid date');
        var days = (time - Date.UTC(2027, 0, 1)) / 86400000;
        return VEHICLES[(days % 6 + 6) % 6];
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/dlx.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './shapes.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, SHAPES, orientations;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      SHAPES = module.SHAPES;
      orientations = module.orientations;
    }],
    execute: function () {
      exports('solve', solve);
      cclegacy._RF.push({}, "9796aoDn4ZAY73iMZgaRQJx", "dlx", undefined);
      function makeColumn() {
        var column = {};
        Object.assign(column, {
          left: column,
          right: column,
          up: column,
          down: column,
          column: column,
          size: 0
        });
        return column;
      }
      function cover(column) {
        column.right.left = column.left;
        column.left.right = column.right;
        for (var row = column.down; row !== column; row = row.down) {
          for (var node = row.right; node !== row; node = node.right) {
            node.down.up = node.up;
            node.up.down = node.down;
            node.column.size--;
          }
        }
      }
      function uncover(column) {
        for (var row = column.up; row !== column; row = row.up) {
          for (var node = row.left; node !== row; node = node.left) {
            node.column.size++;
            node.down.up = node;
            node.up.down = node;
          }
        }
        column.right.left = column;
        column.left.right = column;
      }
      function solve(level, options) {
        if (!Number.isSafeInteger(options.maxSolutions) || options.maxSolutions < 1 || !Number.isSafeInteger(options.maxNodes) || options.maxNodes < 1) throw new Error('invalid solver limits');
        var root = makeColumn();
        var cells = [];
        var blocked = new Set(level.blocked.map(function (_ref) {
          var x = _ref[0],
            y = _ref[1];
          return x + "," + y;
        }));
        var freeCells = 0;
        for (var y = 0; y < level.height; y++) for (var x = 0; x < level.width; x++) {
          if (blocked.has(x + "," + y)) continue;
          var column = makeColumn();
          column.left = root.left;
          column.right = root;
          root.left.right = column;
          root.left = column;
          cells[y * level.width + x] = column;
          freeCells++;
        }
        var pieces = [].concat(level.pieces).sort(function (a, b) {
          return a.id - b.id;
        });
        if (new Set(pieces.map(function (piece) {
          return piece.id;
        })).size !== pieces.length) throw new Error('duplicate piece id');
        var groups = new Map();
        var pieceArea = 0;
        for (var _iterator = _createForOfIteratorHelperLoose(pieces), _step; !(_step = _iterator()).done;) {
          var _groups$get;
          var piece = _step.value;
          var group = (_groups$get = groups.get(piece.shape)) != null ? _groups$get : {
            column: makeColumn(),
            ids: [],
            remaining: 0
          };
          group.ids.push(piece.id);
          group.remaining++;
          groups.set(piece.shape, group);
          pieceArea += SHAPES[piece.shape].length;
        }
        if (freeCells !== pieceArea) {
          return {
            solutionCount: 0,
            solutionCountCapped: false,
            nodesToFirst: 0,
            totalNodes: 0,
            nodeLimitReached: false
          };
        }

        // Interchangeable pieces share one secondary column with a placement quota.
        for (var _iterator2 = _createForOfIteratorHelperLoose(groups), _step2; !(_step2 = _iterator2()).done;) {
          var _step2$value = _step2.value,
            shape = _step2$value[0],
            _group2 = _step2$value[1];
          for (var _iterator5 = _createForOfIteratorHelperLoose(orientations(shape)), _step5; !(_step5 = _iterator5()).done;) {
            var orientation = _step5.value;
            for (var _y = 0; _y < level.height; _y++) for (var _x = 0; _x < level.width; _x++) {
              var columns = [_group2.column];
              for (var _iterator6 = _createForOfIteratorHelperLoose(orientation.cells), _step6; !(_step6 = _iterator6()).done;) {
                var _step6$value = _step6.value,
                  dx = _step6$value[0],
                  dy = _step6$value[1];
                if (_x + dx >= level.width || _y + dy >= level.height) break;
                var cell = cells[(_y + dy) * level.width + _x + dx];
                if (!cell) break;
                columns.push(cell);
              }
              if (columns.length !== orientation.cells.length + 1) continue;
              var row = {
                group: _group2,
                rotation: orientation.rotation,
                x: _x,
                y: _y
              };
              var first = void 0;
              for (var _i = 0, _columns = columns; _i < _columns.length; _i++) {
                var _column = _columns[_i];
                var node = {
                  column: _column,
                  row: row,
                  up: _column.up,
                  down: _column,
                  left: _column,
                  right: _column
                };
                _column.up.down = node;
                _column.up = node;
                _column.size++;
                if (first) {
                  node.left = first.left;
                  node.right = first;
                  first.left.right = node;
                  first.left = node;
                } else {
                  first = node;
                  node.left = node;
                  node.right = node;
                }
              }
            }
          }
        }
        var solutionCount = 0,
          nodesToFirst = 0,
          totalNodes = 0;
        var firstSolution;
        var nodeLimitReached = false,
          solutionCountCapped = false;
        var chosen = [];
        var search = function search() {
          if (root.right === root) {
            solutionCount++;
            if (!firstSolution) {
              firstSolution = [];
              var _loop = function _loop() {
                var group = _step3.value;
                var ordered = chosen.filter(function (row) {
                  return row.group === group;
                }).sort(function (a, b) {
                  return a.y - b.y || a.x - b.x;
                });
                ordered.forEach(function (_ref2, index) {
                  var x = _ref2.x,
                    y = _ref2.y,
                    rotation = _ref2.rotation;
                  return firstSolution.push({
                    pieceId: group.ids[index],
                    x: x,
                    y: y,
                    rotation: rotation
                  });
                });
              };
              for (var _iterator3 = _createForOfIteratorHelperLoose(groups.values()), _step3; !(_step3 = _iterator3()).done;) {
                _loop();
              }
              nodesToFirst = totalNodes;
            }
            if (solutionCount >= options.maxSolutions) solutionCountCapped = true;
            return;
          }
          var column = root.right;
          for (var next = column.right; next !== root; next = next.right) {
            if (next.size < column.size) column = next;
          }
          for (var _iterator4 = _createForOfIteratorHelperLoose(groups.values()), _step4; !(_step4 = _iterator4()).done;) {
            var _group = _step4.value;
            if (_group.remaining > _group.column.size) return;
            if (_group.remaining === 1 && _group.column.size < column.size) column = _group.column;
          }
          if (column.size === 0) return;
          cover(column);
          for (var link = column.down; link !== column; link = link.down) {
            if (totalNodes >= options.maxNodes) {
              nodeLimitReached = true;
              break;
            }
            totalNodes++;
            var row = link.row;
            var group = row.group;
            group.remaining--;
            chosen.push(row);
            for (var node = link.right; node !== link; node = node.right) {
              if (node.column !== group.column || group.remaining === 0) cover(node.column);
            }
            search();
            for (var _node = link.left; _node !== link; _node = _node.left) {
              if (_node.column !== group.column || group.remaining === 0) uncover(_node.column);
            }
            chosen.pop();
            group.remaining++;
            if (nodeLimitReached || solutionCountCapped) break;
          }
          uncover(column);
        };
        search();
        return {
          solutionCount: solutionCount,
          solutionCountCapped: solutionCountCapped,
          nodesToFirst: nodesToFirst,
          totalNodes: totalNodes,
          firstSolution: firstSolution,
          nodeLimitReached: nodeLimitReached
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './input.ts', './shapes.ts'], function (exports) {
  var _extends, _createClass, cclegacy, trayGesture, isClick, snapToGrid, clockwiseRotation;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      trayGesture = module.trayGesture;
      isClick = module.isClick;
      snapToGrid = module.snapToGrid;
    }, function (module) {
      clockwiseRotation = module.clockwiseRotation;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e97d7v466dPSqlR+ZPVHwJg", "DragController", undefined);
      var DragController = exports('DragController', /*#__PURE__*/function () {
        function DragController() {
          this.gesture = void 0;
        }
        var _proto = DragController.prototype;
        _proto.begin = function begin(start) {
          if (!this.gesture) this.gesture = _extends({}, start, {
            current: start.start,
            mode: 'pending'
          });
        };
        _proto.move = function move(id, current) {
          var gesture = this.gesture;
          if (!gesture || gesture.id !== id) return;
          gesture.current = current;
          if (gesture.mode === 'pending' && Math.hypot(current.x - gesture.start.x, current.y - gesture.start.y) > 10) {
            gesture.mode = gesture.fromTray && (!gesture.piece || trayGesture(gesture.start, current) === 'scroll') ? 'scroll' : 'drag';
          }
          return gesture;
        };
        _proto.release = function release(id, current, now) {
          var gesture = this.move(id, current);
          if (!gesture) return;
          this.gesture = undefined;
          return {
            gesture: gesture,
            tap: gesture.mode === 'pending' && isClick(gesture.start, current, now - gesture.time)
          };
        };
        _proto.cancel = function cancel(id) {
          if (!this.gesture || id !== undefined && this.gesture.id !== id) return false;
          this.gesture = undefined;
          return true;
        };
        _proto.rotateHeld = function rotateHeld() {
          var _this$gesture;
          if (((_this$gesture = this.gesture) == null ? void 0 : _this$gesture.mode) !== 'drag' || !this.gesture.piece) return false;
          this.gesture.rotation = clockwiseRotation(this.gesture.rotation);
          return true;
        };
        _proto.placement = function placement(gesture, origin, cell) {
          if (!gesture.piece) return;
          return _extends({}, snapToGrid(gesture.current, gesture.offset, origin, cell), {
            pieceId: gesture.piece.id,
            rotation: gesture.rotation
          });
        };
        _createClass(DragController, [{
          key: "active",
          get: function get() {
            return this.gesture;
          }
        }]);
        return DragController;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/generator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './dlx.ts', './items.ts', './rng.ts', './shapes.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy, solve, ITEMS, createRng, shuffle, orientations, SHAPES;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      solve = module.solve;
    }, function (module) {
      ITEMS = module.ITEMS;
    }, function (module) {
      createRng = module.createRng;
      shuffle = module.shuffle;
    }, function (module) {
      orientations = module.orientations;
      SHAPES = module.SHAPES;
    }],
    execute: function () {
      exports('generateLevel', generateLevel);
      cclegacy._RF.push({}, "49de0IllGZIV7RZdwTAzoa4", "generator", undefined);
      function generateLevel(template, cfg, seed) {
        var _template$preferredIn;
        var integerLimits = [cfg.minPieces, cfg.maxPieces, cfg.minSix, cfg.maxSix, cfg.maxSmall, cfg.maxSolutions, cfg.minNodesToFirst, cfg.maxNodes, cfg.maxPartitionTries, cfg.maxAttempts];
        if (integerLimits.some(function (value) {
          return !Number.isSafeInteger(value) || value < 0;
        }) || cfg.minPieces > cfg.maxPieces || cfg.minSix > cfg.maxSix || cfg.maxSolutions < 1 || cfg.maxNodes < 1 || cfg.maxPartitionTries < 1 || cfg.maxAttempts < 1 || !Number.isFinite(cfg.minLargeFraction) || cfg.minLargeFraction < 0 || cfg.minLargeFraction > 1) {
          throw new Error('invalid generator configuration');
        }
        if (!Number.isSafeInteger(template.width) || !Number.isSafeInteger(template.height) || template.width < 1 || template.height < 1 || template.blocked.some(function (_ref) {
          var x = _ref[0],
            y = _ref[1];
          return !Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= template.width || y >= template.height;
        }) || new Set(template.blocked.map(function (_ref2) {
          var x = _ref2[0],
            y = _ref2[1];
          return x + "," + y;
        })).size !== template.blocked.length) {
          throw new Error('invalid vehicle template');
        }
        var random = createRng(seed);
        var blocked = new Set(template.blocked.map(function (_ref3) {
          var x = _ref3[0],
            y = _ref3[1];
          return y * template.width + x;
        }));
        var usable = template.width * template.height - blocked.size;
        var board = {
          date: cfg.date,
          stage: 2,
          vehicle: template.id,
          width: template.width,
          height: template.height,
          blocked: template.blocked.map(function (_ref4) {
            var x = _ref4[0],
              y = _ref4[1];
            return [x, y];
          }),
          timeLimitSec: 180
        };
        var acceptableInventory = function acceptableInventory(shapes) {
          var sizes = shapes.map(function (shape) {
            return SHAPES[shape].length;
          });
          var six = sizes.filter(function (size) {
            return size === 6;
          }).length;
          var small = sizes.filter(function (size) {
            return size <= 3;
          }).length;
          return shapes.length >= cfg.minPieces && shapes.length <= cfg.maxPieces && six >= cfg.minSix && six <= cfg.maxSix && small <= cfg.maxSmall && (shapes.length - six - small) / shapes.length >= cfg.minLargeFraction && sizes.reduce(function (total, size) {
            return total + size;
          }, 0) === usable;
        };
        var buildResult = function buildResult(pieces, shapes, result) {
          var indices = shuffle(shapes.map(function (_, index) {
            return index;
          }), random);
          var level = _extends({}, board, {
            pieces: indices.map(function (source, index) {
              return {
                id: index + 1,
                shape: shapes[source],
                item: ITEMS[shapes[source]].key,
                initialRotation: Math.floor(random() * 4)
              };
            })
          });
          var placements = indices.map(function (source, index) {
            var _pieces$source = pieces[source],
              x = _pieces$source.x,
              y = _pieces$source.y,
              rotation = _pieces$source.rotation;
            return {
              x: x,
              y: y,
              rotation: rotation,
              pieceId: index + 1
            };
          });
          var solution = {
            date: cfg.date,
            stage: 2,
            placements: placements
          };
          var stats = {
            solutionCount: result.solutionCount,
            solutionCountCapped: false,
            nodesToFirst: result.nodesToFirst,
            totalNodes: result.totalNodes
          };
          return {
            level: level,
            solution: solution,
            stats: stats
          };
        };
        var preferred = shuffle(((_template$preferredIn = template.preferredInventories) != null ? _template$preferredIn : []).filter(acceptableInventory), random);
        var excessiveInventories = new Set();
        var partitionFailures = 0,
          nodeLimitFailures = 0,
          solutionLimitFailures = 0,
          difficultyFailures = 0;
        var evaluate = function evaluate(shapes) {
          var inventory = [].concat(shapes).sort().join(',');
          if (excessiveInventories.has(inventory)) {
            solutionLimitFailures++;
            return;
          }
          var level = _extends({}, board, {
            pieces: shapes.map(function (shape, index) {
              return {
                id: index + 1,
                shape: shape,
                item: ITEMS[shape].key,
                initialRotation: 0
              };
            })
          });
          var result = solve(level, {
            maxSolutions: cfg.maxSolutions + 1,
            maxNodes: cfg.maxNodes
          });
          if (result.nodeLimitReached) {
            nodeLimitFailures++;
            return;
          }
          if (result.solutionCountCapped || result.solutionCount > cfg.maxSolutions) {
            excessiveInventories.add(inventory);
            solutionLimitFailures++;
            return;
          }
          if (!result.firstSolution || result.nodesToFirst < cfg.minNodesToFirst) {
            difficultyFailures++;
            return;
          }
          return result;
        };
        var attempt = 0;
        for (var _iterator = _createForOfIteratorHelperLoose(preferred.slice(0, cfg.maxAttempts)), _step; !(_step = _iterator()).done;) {
          var shapes = _step.value;
          attempt++;
          var result = evaluate(shapes);
          if (result != null && result.firstSolution) {
            var placements = [].concat(result.firstSolution).sort(function (a, b) {
              return a.pieceId - b.pieceId;
            });
            return buildResult(placements, shapes, result);
          }
        }
        var candidates = Array.from({
          length: template.width * template.height
        }, function () {
          return [];
        });
        var neighbors = Array.from({
          length: template.width * template.height
        }, function (_, cell) {
          var x = cell % template.width,
            y = Math.floor(cell / template.width);
          var adjacent = [];
          if (x > 0) adjacent.push(cell - 1);
          if (x + 1 < template.width) adjacent.push(cell + 1);
          if (y > 0) adjacent.push(cell - template.width);
          if (y + 1 < template.height) adjacent.push(cell + template.width);
          return adjacent;
        });
        for (var _i = 0, _arr = Object.keys(SHAPES); _i < _arr.length; _i++) {
          var shape = _arr[_i];
          for (var _iterator2 = _createForOfIteratorHelperLoose(orientations(shape)), _step2; !(_step2 = _iterator2()).done;) {
            var orientation = _step2.value;
            var _loop = function _loop(y) {
              var _loop2 = function _loop2(x) {
                var points = orientation.cells.map(function (_ref5) {
                  var dx = _ref5[0],
                    dy = _ref5[1];
                  return [x + dx, y + dy];
                });
                if (points.some(function (_ref6) {
                  var px = _ref6[0],
                    py = _ref6[1];
                  return px >= template.width || py >= template.height || blocked.has(py * template.width + px);
                })) return 1; // continue
                var cells = points.map(function (_ref7) {
                  var px = _ref7[0],
                    py = _ref7[1];
                  return py * template.width + px;
                });
                var candidate = {
                  shape: shape,
                  rotation: orientation.rotation,
                  x: x,
                  y: y,
                  cells: cells
                };
                for (var _iterator3 = _createForOfIteratorHelperLoose(cells), _step3; !(_step3 = _iterator3()).done;) {
                  var cell = _step3.value;
                  candidates[cell].push(candidate);
                }
              };
              for (var x = 0; x < template.width; x++) {
                if (_loop2(x)) continue;
              }
            };
            for (var y = 0; y < template.height; y++) {
              _loop(y);
            }
          }
        }
        var _loop3 = function _loop3() {
            var occupied = new Set(blocked),
              placed = [];
            var visits = 0;
            var partition = function partition() {
              if (++visits > cfg.maxPartitionTries) return false;
              if (occupied.size === template.width * template.height) {
                var _six = placed.filter(function (item) {
                  return item.cells.length === 6;
                }).length;
                var _small = placed.filter(function (item) {
                  return item.cells.length <= 3;
                }).length;
                var large = placed.filter(function (item) {
                  return item.cells.length === 4 || item.cells.length === 5;
                }).length;
                return placed.length >= cfg.minPieces && placed.length <= cfg.maxPieces && _six >= cfg.minSix && _six <= cfg.maxSix && _small <= cfg.maxSmall && large / placed.length >= cfg.minLargeFraction;
              }
              if (placed.length >= cfg.maxPieces) return false;
              var first = 0;
              while (occupied.has(first)) first++;
              var six = placed.filter(function (item) {
                return item.cells.length === 6;
              }).length;
              var small = placed.filter(function (item) {
                return item.cells.length <= 3;
              }).length;
              var options = candidates[first].filter(function (candidate) {
                return !candidate.cells.some(function (cell) {
                  return occupied.has(cell);
                }) && (candidate.cells.length !== 6 || six < cfg.maxSix) && (candidate.cells.length > 3 || small < cfg.maxSmall);
              });
              for (var _iterator4 = _createForOfIteratorHelperLoose(shuffle(options, random)), _step4; !(_step4 = _iterator4()).done;) {
                var candidate = _step4.value;
                candidate.cells.forEach(function (cell) {
                  return occupied.add(cell);
                });
                placed.push(candidate);
                var remaining = usable - placed.reduce(function (sum, item) {
                  return sum + item.cells.length;
                }, 0);
                var leavesIsolatedCell = candidate.cells.some(function (cell) {
                  return neighbors[cell].some(function (neighbor) {
                    return !occupied.has(neighbor) && neighbors[neighbor].every(function (adjacent) {
                      return occupied.has(adjacent);
                    });
                  });
                });
                if (!leavesIsolatedCell && placed.length + Math.ceil(remaining / 6) <= cfg.maxPieces && placed.length + Math.floor(remaining / 2) >= cfg.minPieces && partition()) return true;
                placed.pop();
                candidate.cells.forEach(function (cell) {
                  return occupied["delete"](cell);
                });
                if (visits > cfg.maxPartitionTries) break;
              }
              return false;
            };
            if (!partition()) {
              partitionFailures++;
              return 0; // continue
            }

            var shapes = placed.map(function (piece) {
              return piece.shape;
            });
            var result = evaluate(shapes);
            if (result) {
              var _placements = placed.map(function (_ref8) {
                var x = _ref8.x,
                  y = _ref8.y,
                  rotation = _ref8.rotation;
                return {
                  x: x,
                  y: y,
                  rotation: rotation
                };
              });
              return {
                v: buildResult(_placements, shapes, result)
              };
            }
          },
          _ret;
        for (; attempt < cfg.maxAttempts; attempt++) {
          _ret = _loop3();
          if (_ret === 0) continue;
          if (_ret) return _ret.v;
        }
        throw new Error("Failed to generate a level in " + cfg.maxAttempts + " attempts: partition=" + partitionFailures + ", " + ("nodeLimit=" + nodeLimitFailures + ", solutionLimit=" + solutionLimitFailures + ", difficulty=" + difficultyFailures));
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/input.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        isClick: isClick,
        snapToGrid: snapToGrid,
        trayGesture: trayGesture
      });
      cclegacy._RF.push({}, "0ec3fwUvrJCiZBf7Lr232b2", "input", undefined);
      function isClick(start, end, durationMs) {
        return durationMs >= 0 && durationMs <= 250 && Math.hypot(end.x - start.x, end.y - start.y) <= 10;
      }
      function trayGesture(start, end) {
        return Math.abs(end.x - start.x) > Math.abs(end.y - start.y) ? 'scroll' : 'pickup';
      }
      function snapToGrid(finger, offset, origin, cellSize) {
        if (cellSize <= 0) throw new Error('cellSize must be positive');
        return {
          x: Math.round((finger.x - offset.x - origin.x) / cellSize),
          y: Math.round((finger.y - offset.y - origin.y) / cellSize)
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/items.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "275d9ff/ppEdqazbqFsql07", "items", undefined);
      var ITEMS = exports('ITEMS', {
        I2: {
          key: 'liquor',
          name: '一箱白酒'
        },
        I3: {
          key: 'sausage',
          name: '腊肠串'
        },
        L3: {
          key: 'ricecooker',
          name: '电饭煲'
        },
        I4: {
          key: 'sugarcane',
          name: '甘蔗'
        },
        O4: {
          key: 'milk',
          name: '牛奶箱'
        },
        L4: {
          key: 'suitcase_s',
          name: '登机箱'
        },
        J4: {
          key: 'duffel',
          name: '拉杆包'
        },
        T4: {
          key: 'nutbox',
          name: '坚果礼盒'
        },
        S4: {
          key: 'fish',
          name: '鱼'
        },
        Z4: {
          key: 'duck',
          name: '腊鸭'
        },
        P5: {
          key: 'quilt',
          name: '被子'
        },
        L5: {
          key: 'frozenbox',
          name: '冻品泡沫箱'
        },
        T5: {
          key: 'tv',
          name: '电视'
        },
        U5: {
          key: 'coop',
          name: '鸡鸭笼'
        },
        V5: {
          key: 'crab',
          name: '大闸蟹礼盒'
        },
        Z5: {
          key: 'painting',
          name: '年画卷'
        },
        N5: {
          key: 'lotusroot',
          name: '莲藕'
        },
        Y5: {
          key: 'couplets',
          name: '春联礼包'
        },
        R6: {
          key: 'suitcase_l',
          name: '大号行李箱'
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JourneyArt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIKit.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, fill;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      fill = module.fill;
    }],
    execute: function () {
      exports({
        drawHomeRoad: drawHomeRoad,
        drawWelcomeHome: drawWelcomeHome
      });
      cclegacy._RF.push({}, "477e0vjO9VIXImq52P9MQ7r", "JourneyArt", undefined);
      var ink = new Color(51, 30, 42);
      var night = new Color(70, 38, 48);
      var hillside = new Color(106, 51, 52);
      var roofs = new Color(126, 60, 52);
      var gold = new Color(255, 194, 101);
      var lantern = new Color(204, 63, 55);
      var windowLight = new Color(255, 214, 141);
      function drawHomeRoad(graphics, width, height, top) {
        var y = function y(value) {
          return height / 2 - top - value;
        };
        var x = function x(value) {
          return value - width / 2;
        };
        var rect = function rect(left, at, w, h, color, radius) {
          if (radius === void 0) {
            radius = 0;
          }
          fill(graphics, color, x(left), y(at + h), w, h, radius);
        };
        var polygon = function polygon(points, color) {
          graphics.fillColor = color;
          graphics.moveTo(x(points[0][0]), y(points[0][1]));
          for (var _iterator = _createForOfIteratorHelperLoose(points.slice(1)), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              px = _step$value[0],
              py = _step$value[1];
            graphics.lineTo(x(px), y(py));
          }
          graphics.close();
          graphics.fill();
        };
        var circle = function circle(left, at, radius, color) {
          graphics.fillColor = color;
          graphics.circle(x(left), y(at), radius);
          graphics.fill();
        };
        rect(0, 0, width, 248, night);
        circle(627, 112, 40, new Color(184, 93, 63));
        polygon([[0, 190], [92, 145], [165, 171], [265, 157], [345, 190], [460, 153], [555, 183], [652, 141], [750, 184], [750, 248], [0, 248]], hillside);
        polygon([[0, 210], [153, 197], [283, 213], [414, 192], [574, 210], [686, 191], [750, 207], [750, 248], [0, 248]], ink);
        polygon([[0, 248], [750, 248], [450, 220], [403, 212], [369, 213], [418, 224], [165, 248]], roofs);
        polygon([[256, 248], [333, 248], [390, 233], [379, 232]], gold);
        polygon([[408, 228], [425, 228], [443, 224], [435, 223]], gold);
        for (var _i = 0, _arr = [[85, 220, 48], [137, 213, 37], [599, 225, 55], [659, 219, 38]]; _i < _arr.length; _i++) {
          var _arr$_i = _arr[_i],
            left = _arr$_i[0],
            base = _arr$_i[1],
            w = _arr$_i[2];
          rect(left, base - 24, w, 24, roofs);
          polygon([[left - 7, base - 24], [left + w / 2, base - 44], [left + w + 7, base - 24]], ink);
          rect(left + 10, base - 15, 8, 9, windowLight, 2);
          rect(left + w - 18, base - 15, 8, 9, windowLight, 2);
        }
        for (var _i2 = 0, _arr2 = [[52, 64], [698, 70]]; _i2 < _arr2.length; _i2++) {
          var _arr2$_i = _arr2[_i2],
            _left = _arr2$_i[0],
            at = _arr2$_i[1];
          rect(_left - 1, 0, 2, at - 14, gold);
          rect(_left - 16, at - 13, 32, 29, lantern, 12);
          rect(_left - 9, at - 15, 18, 4, gold, 2);
          rect(_left - 9, at + 13, 18, 4, gold, 2);
          rect(_left - 1, at + 17, 2, 13, gold);
        }
      }
      function drawWelcomeHome(graphics) {
        var red = new Color(164, 55, 46);
        var brick = new Color(207, 126, 86);
        fill(graphics, new Color(247, 224, 191), -245, 10, 490, 240, 30);
        fill(graphics, brick, -138, 35, 276, 127, 5);
        graphics.fillColor = ink;
        graphics.moveTo(-162, 152);
        graphics.lineTo(0, 224);
        graphics.lineTo(162, 152);
        graphics.close();
        graphics.fill();
        fill(graphics, red, -37, 35, 74, 91, 5);
        fill(graphics, gold, -9, 72, 18, 18, 4);
        for (var _i3 = 0, _arr3 = [-111, 69]; _i3 < _arr3.length; _i3++) {
          var left = _arr3[_i3];
          fill(graphics, ink, left - 4, 79, 52, 48, 6);
          fill(graphics, windowLight, left, 83, 44, 40, 3);
          fill(graphics, ink, left + 20, 83, 3, 40);
          fill(graphics, ink, left, 101, 44, 3);
        }
        for (var _i4 = 0, _arr4 = [-181, 149]; _i4 < _arr4.length; _i4++) {
          var _left2 = _arr4[_i4];
          fill(graphics, red, _left2, 116, 32, 43, 13);
          fill(graphics, gold, _left2 + 7, 111, 18, 5, 2);
        }
        fill(graphics, red, -104, 27, 208, 7, 3);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/level.ts", ['cc', './shapes.ts'], function (exports) {
  var cclegacy, SHAPES;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      SHAPES = module.SHAPES;
    }],
    execute: function () {
      exports('parseLevel', parseLevel);
      cclegacy._RF.push({}, "a6e92QJj5ZAm7iOT4XvHGCh", "level", undefined);
      function record(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      }
      function integerIn(value, min, max) {
        return typeof value === 'number' && Number.isSafeInteger(value) && value >= min && value <= max;
      }
      function parseLevel(value) {
        if (!record(value)) throw new Error('Invalid level');
        var date = value.date,
          stage = value.stage,
          vehicle = value.vehicle,
          width = value.width,
          height = value.height,
          timeLimitSec = value.timeLimitSec;
        if (typeof date !== 'string' || stage !== 1 && stage !== 2 || typeof vehicle !== 'string' || !vehicle || !integerIn(width, 1, 11) || !integerIn(height, 1, 11) || !integerIn(timeLimitSec, 1, Math.floor(Number.MAX_SAFE_INTEGER / 1000)) || !Array.isArray(value.blocked) || !Array.isArray(value.pieces) || !value.pieces.length) {
          throw new Error('Invalid level header');
        }
        var usedCells = new Set();
        var blocked = value.blocked.map(function (cell) {
          if (!Array.isArray(cell) || cell.length !== 2 || !integerIn(cell[0], 0, width - 1) || !integerIn(cell[1], 0, height - 1)) {
            throw new Error('Invalid blocked cell');
          }
          var x = cell[0],
            y = cell[1];
          var index = y * width + x;
          if (usedCells.has(index)) throw new Error('Duplicate blocked cell');
          usedCells.add(index);
          return [x, y];
        });
        var ids = new Set();
        var area = 0;
        var pieces = value.pieces.map(function (piece) {
          if (!record(piece) || !integerIn(piece.id, 1, Number.MAX_SAFE_INTEGER) || ids.has(piece.id) || typeof piece.shape !== 'string' || !Object.hasOwn(SHAPES, piece.shape) || typeof piece.item !== 'string' || !integerIn(piece.initialRotation, 0, 3)) {
            throw new Error('Invalid or duplicate piece');
          }
          var shape = piece.shape;
          ids.add(piece.id);
          area += SHAPES[shape].length;
          return {
            id: piece.id,
            shape: shape,
            item: piece.item,
            initialRotation: piece.initialRotation
          };
        });
        if (area !== width * height - blocked.length) throw new Error('Pieces do not fill the board');
        return {
          date: date,
          stage: stage,
          vehicle: vehicle,
          width: width,
          height: height,
          blocked: blocked,
          timeLimitSec: timeLimitSec,
          pieces: pieces
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Bootstrap.ts', './brand.ts', './date.ts', './dlx.ts', './generator.ts', './input.ts', './items.ts', './level.ts', './provinces.ts', './rng.ts', './shapes.ts', './stage1.ts', './types.ts', './validate.ts', './vehicles.ts', './DragController.ts', './StageSession.ts', './StagePage.ts', './WebPlatform.ts', './Api.ts', './JourneyArt.ts', './UIKit.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/provinces.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "11959GEcNdDAqCqEOhLInTF", "provinces", undefined);
      var PROVINCES = exports('PROVINCES', ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港', '澳门', '台湾']);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/rng.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        createRng: createRng,
        shuffle: shuffle
      });
      cclegacy._RF.push({}, "d7d46Qw0T5HZbOMxNfAfJ7G", "rng", undefined);
      function cyrb128(seed) {
        var h1 = 1779033703,
          h2 = 3144134277,
          h3 = 1013904242,
          h4 = 2773480762;
        for (var i = 0; i < seed.length; i++) {
          var k = seed.charCodeAt(i);
          h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
          h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
          h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
          h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
        h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
        h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
        h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
        return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
      }
      function createRng(seed) {
        var _cyrb = cyrb128(seed),
          a = _cyrb[0],
          b = _cyrb[1],
          c = _cyrb[2],
          d = _cyrb[3];
        return function () {
          var result = a + b + d | 0;
          d = d + 1 | 0;
          a = b ^ b >>> 9;
          b = c + (c << 3) | 0;
          c = c << 21 | c >>> 11;
          c = c + result | 0;
          return (result >>> 0) / 4294967296;
        };
      }
      function shuffle(values, random) {
        var result = [].concat(values);
        for (var i = result.length - 1; i > 0; i--) {
          var j = Math.floor(random() * (i + 1));
          var _ref = [result[j], result[i]];
          result[i] = _ref[0];
          result[j] = _ref[1];
        }
        return result;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shapes.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        orientations: orientations,
        rotate: rotate
      });
      cclegacy._RF.push({}, "163a1Ps7LpI374dFmMWApJf", "shapes", undefined);
      var SHAPES = exports('SHAPES', {
        I2: [[0, 0], [1, 0]],
        I3: [[0, 0], [1, 0], [2, 0]],
        L3: [[0, 0], [0, 1], [1, 1]],
        I4: [[0, 0], [1, 0], [2, 0], [3, 0]],
        O4: [[0, 0], [1, 0], [0, 1], [1, 1]],
        L4: [[0, 0], [0, 1], [0, 2], [1, 2]],
        J4: [[1, 0], [1, 1], [0, 2], [1, 2]],
        T4: [[0, 0], [1, 0], [2, 0], [1, 1]],
        S4: [[1, 0], [2, 0], [0, 1], [1, 1]],
        Z4: [[0, 0], [1, 0], [1, 1], [2, 1]],
        P5: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]],
        L5: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3]],
        T5: [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]],
        U5: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]],
        V5: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
        Z5: [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]],
        N5: [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]],
        Y5: [[0, 0], [0, 1], [1, 1], [0, 2], [0, 3]],
        R6: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2]]
      });

      // Grid rows increase downwards, while the stored rotation advances counterclockwise.
      var clockwiseRotation = exports('clockwiseRotation', function clockwiseRotation(rotation) {
        return (rotation + 3) % 4;
      });
      function rotate(shape, rotation) {
        var cells = shape.map(function (_ref) {
          var x = _ref[0],
            y = _ref[1];
          return [x, y];
        });
        for (var i = 0; i < rotation; i++) cells = cells.map(function (_ref2) {
          var x = _ref2[0],
            y = _ref2[1];
          return [y, -x];
        });
        var minX = Math.min.apply(Math, cells.map(function (_ref3) {
          var x = _ref3[0];
          return x;
        }));
        var minY = Math.min.apply(Math, cells.map(function (_ref4) {
          var y = _ref4[1];
          return y;
        }));
        return cells.map(function (_ref5) {
          var x = _ref5[0],
            y = _ref5[1];
          return [x - minX, y - minY];
        }).sort(function (a, b) {
          return a[1] - b[1] || a[0] - b[0];
        });
      }
      function orientations(shape) {
        var seen = new Set();
        var result = [];
        for (var _iterator = _createForOfIteratorHelperLoose([0, 1, 2, 3]), _step; !(_step = _iterator()).done;) {
          var rotation = _step.value;
          var cells = rotate(SHAPES[shape], rotation);
          var key = JSON.stringify(cells);
          if (!seen.has(key)) {
            seen.add(key);
            result.push({
              rotation: rotation,
              cells: cells
            });
          }
        }
        return result;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/stage1.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('stage1', stage1);
      cclegacy._RF.push({}, "68345a6MVJCgYOTZUVZCWsS", "stage1", undefined);
      function stage1(date) {
        return {
          date: date,
          stage: 1,
          vehicle: 'sedan',
          width: 4,
          height: 3,
          blocked: [],
          timeLimitSec: 60,
          pieces: [{
            id: 1,
            shape: 'I4',
            item: 'sugarcane',
            initialRotation: 0
          }, {
            id: 2,
            shape: 'O4',
            item: 'milk',
            initialRotation: 0
          }, {
            id: 3,
            shape: 'I2',
            item: 'liquor',
            initialRotation: 0
          }, {
            id: 4,
            shape: 'I2',
            item: 'liquor',
            initialRotation: 0
          }]
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StagePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './brand.ts', './items.ts', './shapes.ts', './vehicles.ts', './StageSession.ts', './DragController.ts', './UIKit.ts', './JourneyArt.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, view, UITransform, Vec3, Graphics, Node, GAME_TITLE, ITEMS, rotate, SHAPES, VEHICLES, StageSession, DragController, label, fill, uiNode, drawHomeRoad;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      view = module.view;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Graphics = module.Graphics;
      Node = module.Node;
    }, function (module) {
      GAME_TITLE = module.GAME_TITLE;
    }, function (module) {
      ITEMS = module.ITEMS;
    }, function (module) {
      rotate = module.rotate;
      SHAPES = module.SHAPES;
    }, function (module) {
      VEHICLES = module.VEHICLES;
    }, function (module) {
      StageSession = module.StageSession;
    }, function (module) {
      DragController = module.DragController;
    }, function (module) {
      label = module.label;
      fill = module.fill;
      uiNode = module.uiNode;
    }, function (module) {
      drawHomeRoad = module.drawHomeRoad;
    }],
    execute: function () {
      cclegacy._RF.push({}, "840c5I1G3xPQLRPODwakFUa", "StagePage", undefined);
      var ink = new Color(74, 44, 26);
      var red = new Color(158, 45, 41);
      var cream = new Color(255, 246, 229);
      var gold = new Color(255, 201, 119);
      var muted = new Color(132, 91, 72);
      var palette = [[174, 64, 53], [157, 99, 36], [65, 115, 97], [95, 87, 140], [152, 70, 106]];
      var packageColors = {
        I2: 0,
        I3: 0,
        L3: 3,
        I4: 2,
        O4: 3,
        L4: 1,
        J4: 3,
        T4: 1,
        S4: 2,
        Z4: 0,
        P5: 4,
        L5: 3,
        T5: 3,
        U5: 1,
        V5: 0,
        Z5: 4,
        N5: 2,
        Y5: 0,
        R6: 1
      };
      var stamps = {
        I2: '酒',
        I3: '腊',
        L3: '煲',
        I4: '蔗',
        O4: '奶',
        L4: '箱',
        J4: '包',
        T4: '礼',
        S4: '鱼',
        Z4: '鸭',
        P5: '被',
        L5: '冻',
        T5: '视',
        U5: '笼',
        V5: '蟹',
        Z5: '画',
        N5: '藕',
        Y5: '联',
        R6: '箱'
      };
      var inRect = function inRect(point, rect) {
        return point.x >= rect.x && point.y >= rect.y && point.x < rect.x + rect.w && point.y < rect.y + rect.h;
      };
      var StagePage = exports('StagePage', /*#__PURE__*/function () {
        function StagePage(parent, level, now, onClear) {
          var _VEHICLES$find$name,
            _VEHICLES$find,
            _this = this;
          this.node = void 0;
          this.graphics = void 0;
          this.session = void 0;
          this.clock = void 0;
          this.notice = void 0;
          this.packed = void 0;
          this.board = void 0;
          this.tray = void 0;
          this.cell = void 0;
          this.width = void 0;
          this.height = void 0;
          this.buttons = [];
          this.itemLabels = new Map();
          this.slots = [];
          this.drag = new DragController();
          this.selected = void 0;
          this.scroll = 0;
          this.scrollLimit = 0;
          this.cleared = false;
          this.scale = 0;
          this.displayedSeconds = -1;
          this.level = level;
          this.now = now;
          this.onClear = onClear;
          this.width = 750;
          this.height = 1334;
          this.node = uiNode('StagePage', parent, this.width, this.height);
          var backdrop = uiNode('JourneyBackdrop', this.node, this.width, this.height).addComponent(Graphics);
          fill(backdrop, cream, -this.width / 2, -this.height / 2, this.width, this.height);
          drawHomeRoad(backdrop, this.width, this.height, 0);
          this.graphics = uiNode('LuggageGraphics', this.node, this.width, this.height).addComponent(Graphics);
          this.session = new StageSession(level, now);
          this.cell = Math.floor(Math.min(110, 640 / level.width, 568 / level.height));
          var boardHeight = this.cell * level.height;
          this.board = {
            x: (this.width - this.cell * level.width) / 2,
            y: 349 + (568 - boardHeight) / 2,
            w: this.cell * level.width,
            h: boardHeight
          };
          this.tray = {
            x: 24,
            y: 1001,
            w: this.width - 48,
            h: 145
          };
          var vehicle = (_VEHICLES$find$name = (_VEHICLES$find = VEHICLES.find(function (entry) {
            return entry.id === level.vehicle;
          })) == null ? void 0 : _VEHICLES$find.name) != null ? _VEHICLES$find$name : '小轿车';
          this.caption('Kicker', '春运归家 · 年前最后一趟', 23, 0, 53, gold);
          this.caption('Title', GAME_TITLE, 65, 0, 118, cream);
          this.caption('Route', '从打拼的城市，到亮着灯的老家', 26, 0, 179, new Color(255, 222, 181));
          this.caption('Vehicle', "\u7B2C " + level.stage + " \u5173 \xB7 " + vehicle, 34, 0, 285, ink);
          this.clock = this.caption('Clock', '', 25, 174, 325, red);
          this.packed = this.caption('Packed', '', 25, -174, 325, muted);
          this.notice = this.caption('Notice', '', 24, 0, 972, ink);
          this.caption('ControlsHint', '拖年货进车厢 · 点按转向 · 横滑托盘', 21, 0, 1275, muted);
          if (level.stage === 1) {
            this.caption('TrunkOpen', '后备箱已打开', 23, 0, 405, muted);
            this.caption('FirstLeg', '装好这车年货，就能出发。', 26, 0, 893, muted);
          }
          for (var _iterator = _createForOfIteratorHelperLoose(level.pieces), _step; !(_step = _iterator()).done;) {
            var piece = _step.value;
            var item = this.caption("Item" + piece.id, '', 22, 0, 0, cream);
            this.itemLabels.set(piece.id, item);
          }
          var controlsY = this.tray.y + this.tray.h + 14;
          this.button('旋转 90°', this.width / 2 - 235, controlsY, function () {
            return _this.rotateSelected();
          }, true);
          this.button('撤销', this.width / 2 - 75, controlsY, function () {
            _this.session.undo();
            _this.paint();
          });
          this.button('重开', this.width / 2 + 85, controlsY, function () {
            _this.session.restart();
            _this.drag.cancel();
            _this.cleared = false;
            _this.selected = undefined;
            _this.scroll = 0;
            _this.paint();
          });
          this.node.on(Node.EventType.TOUCH_START, this.start, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.move, this);
          this.node.on(Node.EventType.TOUCH_END, this.end, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.cancel, this);
          this.paint();
          this.tick();
        }
        var _proto = StagePage.prototype;
        _proto.tick = function tick() {
          var size = view.getVisibleSize();
          var scale = Math.min(size.width / this.width, size.height / this.height);
          var resized = scale > 0 && scale !== this.scale;
          if (resized) {
            this.scale = scale;
            this.node.setScale(scale, scale, 1);
          }
          var seconds = this.session.remainingSeconds;
          if (seconds !== this.displayedSeconds) {
            this.displayedSeconds = seconds;
            this.clock.string = seconds ? "\u8DDD\u51FA\u53D1 " + seconds + " \u79D2" : '时间到 · 重装一趟';
            this.clock.color = seconds <= 30 ? new Color(215, 51, 43) : red;
          }
          if ((resized || !seconds) && this.drag.cancel()) this.paint();
        };
        _proto.point = function point(event) {
          var touch = event.getUILocation();
          var local = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(touch.x, touch.y, 0));
          return {
            x: local.x + this.width / 2,
            y: this.height / 2 - local.y
          };
        };
        _proto.button = function button(text, x, y, action, duringDrag) {
          if (duringDrag === void 0) {
            duringDrag = false;
          }
          var rect = {
            x: x,
            y: y,
            w: 150,
            h: 62
          };
          this.buttons.push({
            rect: rect,
            action: action,
            duringDrag: duringDrag
          });
          var title = label(this.node, text, text, 27, x + rect.w / 2 - this.width / 2, this.height / 2 - y - rect.h / 2);
          title.color = new Color(255, 246, 229);
        };
        _proto.caption = function caption(name, text, size, x, y, color) {
          var result = label(this.node, name, text, size, x, this.height / 2 - y);
          result.color = color;
          return result;
        };
        _proto.positionItem = function positionItem(piece, text, x, y, color) {
          var item = this.itemLabels.get(piece.id);
          item.string = text;
          item.color = color;
          item.node.setPosition(x - this.width / 2, this.height / 2 - y);
          item.node.active = true;
        };
        _proto.rectangle = function rectangle(rect, color, radius) {
          if (radius === void 0) {
            radius = 0;
          }
          fill(this.graphics, color, rect.x - this.width / 2, this.height / 2 - rect.y - rect.h, rect.w, rect.h, radius);
        };
        _proto.paintPiece = function paintPiece(piece, rotation, x, y, size, tint, clip) {
          var _this2 = this;
          var _palette$packageColor = palette[packageColors[piece.shape]],
            r = _palette$packageColor[0],
            g = _palette$packageColor[1],
            b = _palette$packageColor[2];
          var color = tint != null ? tint : new Color(r, g, b);
          var cells = rotate(SHAPES[piece.shape], rotation);
          var box = function box(tile, boxColor, radius) {
            if (clip) {
              var left = Math.max(tile.x, clip.x),
                right = Math.min(tile.x + tile.w, clip.x + clip.w);
              if (left >= right) return;
              tile.x = left;
              tile.w = right - left;
            }
            _this2.rectangle(tile, boxColor, Math.min(radius, tile.w / 2, tile.h / 2));
          };
          var inset = Math.max(2, size * .07);
          var labelInk = new Color(255, 236, 191, 85);
          var _loop = function _loop() {
            var _step2$value = _step2.value,
              dx = _step2$value[0],
              dy = _step2$value[1];
            var left = x + dx * size;
            var top = y + dy * size;
            box({
              x: left + inset,
              y: top + inset,
              w: size - 2 * inset,
              h: size - 2 * inset
            }, color, Math.min(8, size * .17));
            if (tint) return 1; // continue
            if (cells.some(function (_ref) {
              var cx = _ref[0],
                cy = _ref[1];
              return cx === dx + 1 && cy === dy;
            })) {
              box({
                x: left + size - 2 * inset,
                y: top + inset,
                w: 4 * inset,
                h: size - 2 * inset
              }, color, 0);
            }
            if (cells.some(function (_ref2) {
              var cx = _ref2[0],
                cy = _ref2[1];
              return cx === dx && cy === dy + 1;
            })) {
              box({
                x: left + inset,
                y: top + size - 2 * inset,
                w: size - 2 * inset,
                h: 4 * inset
              }, color, 0);
            }
            box({
              x: left + size * .2,
              y: top + size * .20,
              w: size * .6,
              h: Math.max(2, size * .055)
            }, labelInk, 2);
          };
          for (var _iterator2 = _createForOfIteratorHelperLoose(cells), _step2; !(_step2 = _iterator2()).done;) {
            if (_loop()) continue;
          }
        };
        _proto.paint = function paint() {
          var _this$drag$active,
            _this3 = this;
          this.graphics.clear();
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.itemLabels.values()), _step3; !(_step3 = _iterator3()).done;) {
            var item = _step3.value;
            item.node.active = false;
          }
          var _this$board = this.board,
            x = _this$board.x,
            y = _this$board.y,
            w = _this$board.w,
            h = _this$board.h;
          this.rectangle({
            x: x + w * .22,
            y: y - 31,
            w: w * .56,
            h: 20
          }, new Color(82, 58, 54), 7);
          this.rectangle({
            x: x + w * .3,
            y: y - 27,
            w: w * .4,
            h: 7
          }, new Color(180, 132, 115), 3);
          this.rectangle({
            x: x - 30,
            y: y + 8,
            w: 21,
            h: 55
          }, new Color(61, 48, 50), 7);
          this.rectangle({
            x: x + w + 9,
            y: y + 8,
            w: 21,
            h: 55
          }, new Color(61, 48, 50), 7);
          this.rectangle({
            x: x - 30,
            y: y + h - 57,
            w: 21,
            h: 55
          }, new Color(61, 48, 50), 7);
          this.rectangle({
            x: x + w + 9,
            y: y + h - 57,
            w: 21,
            h: 55
          }, new Color(61, 48, 50), 7);
          this.rectangle({
            x: x - 25,
            y: y - 19,
            w: w + 50,
            h: h + 49
          }, new Color(106, 47, 43), 22);
          this.rectangle({
            x: x - 16,
            y: y - 12,
            w: w + 32,
            h: h + 36
          }, new Color(174, 67, 55), 17);
          this.rectangle({
            x: x - 6,
            y: y - 6,
            w: w + 12,
            h: h + 12
          }, new Color(82, 58, 54), 11);
          this.rectangle(this.board, new Color(231, 205, 170), 8);
          this.rectangle({
            x: x - 13,
            y: y + h + 9,
            w: 54,
            h: 9
          }, gold, 4);
          this.rectangle({
            x: x + w - 41,
            y: y + h + 9,
            w: 54,
            h: 9
          }, gold, 4);
          this.rectangle({
            x: x + w / 2 - 37,
            y: y + h + 10,
            w: 74,
            h: 13
          }, new Color(63, 66, 92), 4);
          var blocked = new Set(this.level.blocked.map(function (_ref3) {
            var x = _ref3[0],
              y = _ref3[1];
            return x + "," + y;
          }));
          for (var _y = 0; _y < this.level.height; _y++) for (var _x = 0; _x < this.level.width; _x++) {
            this.rectangle({
              x: this.board.x + _x * this.cell + 1,
              y: this.board.y + _y * this.cell + 1,
              w: this.cell - 2,
              h: this.cell - 2
            }, blocked.has(_x + "," + _y) ? new Color(146, 126, 106) : new Color(255, 241, 212), 4);
          }
          var held = ((_this$drag$active = this.drag.active) == null ? void 0 : _this$drag$active.mode) === 'drag' ? this.drag.active : undefined;
          var placements = this.session.placements;
          var _loop2 = function _loop2() {
            var _held$piece2;
            var placement = _step4.value;
            if ((held == null || (_held$piece2 = held.piece) == null ? void 0 : _held$piece2.id) === placement.pieceId) return 1; // continue
            var piece = _this3.level.pieces.find(function (item) {
              return item.id === placement.pieceId;
            });
            var left = x + placement.x * _this3.cell;
            var top = y + placement.y * _this3.cell;
            _this3.paintPiece(piece, placement.rotation, left, top, _this3.cell);
            var _rotate$ = rotate(SHAPES[piece.shape], placement.rotation)[0],
              dx = _rotate$[0],
              dy = _rotate$[1];
            _this3.positionItem(piece, stamps[piece.shape], left + (dx + .5) * _this3.cell, top + (dy + .5) * _this3.cell, cream);
          };
          for (var _iterator4 = _createForOfIteratorHelperLoose(placements), _step4; !(_step4 = _iterator4()).done;) {
            if (_loop2()) continue;
          }
          this.rectangle(this.tray, new Color(231, 208, 174), 16);
          this.packed.string = "\u5DF2\u88C5\u8F66 " + placements.length + " / " + this.level.pieces.length + " \u4EF6";
          var placed = new Set(placements.map(function (placement) {
            return placement.pieceId;
          }));
          var pieces = this.level.pieces.filter(function (piece) {
            return !placed.has(piece.id);
          });
          this.scrollLimit = Math.max(0, pieces.length * 139 - this.tray.w + 20);
          this.scroll = Math.min(this.scroll, this.scrollLimit);
          this.slots = [];
          for (var _iterator5 = _createForOfIteratorHelperLoose(pieces.entries()), _step5; !(_step5 = _iterator5()).done;) {
            var _held$piece;
            var _step5$value = _step5.value,
              index = _step5$value[0],
              piece = _step5$value[1];
            var rect = {
              x: this.tray.x + 10 + index * 139 - this.scroll,
              y: this.tray.y + 14,
              w: 130,
              h: 108
            };
            this.slots.push({
              piece: piece,
              rect: rect
            });
            if ((held == null || (_held$piece = held.piece) == null ? void 0 : _held$piece.id) === piece.id) continue;
            var left = Math.max(rect.x, this.tray.x + 4);
            var right = Math.min(rect.x + rect.w, this.tray.x + this.tray.w - 4);
            if (right > left) {
              this.rectangle({
                x: left,
                y: rect.y,
                w: right - left,
                h: 119
              }, new Color(255, 244, 222), 9);
            }
            var rotation = this.session.rotationFor(piece.id);
            var cells = rotate(SHAPES[piece.shape], rotation);
            var columns = Math.max.apply(Math, cells.map(function (_ref4) {
              var column = _ref4[0];
              return column;
            })) + 1;
            var rows = Math.max.apply(Math, cells.map(function (_ref5) {
              var row = _ref5[1];
              return row;
            })) + 1;
            var size = Math.floor(Math.min(34, (rect.w - 18) / columns, 80 / rows));
            this.paintPiece(piece, rotation, rect.x + (rect.w - columns * size) / 2, rect.y + (90 - rows * size) / 2, size, undefined, this.tray);
            if (right - left >= 105) {
              this.positionItem(piece, ITEMS[piece.shape].name, (left + right) / 2, rect.y + 104, ink);
            }
          }
          for (var _iterator6 = _createForOfIteratorHelperLoose(this.buttons), _step6; !(_step6 = _iterator6()).done;) {
            var _rect = _step6.value.rect;
            this.rectangle(_rect, red, 13);
          }
          var mission = this.level.stage === 1 ? '先把给家里带的年货装上车' : '年前最后一程，把剩下的年货带回家';
          this.notice.string = this.selected ? "\u6B63\u5728\u88C5\u8F66 \xB7 " + ITEMS[this.selected.shape].name : mission;
          if (held != null && held.piece) {
            var placement = this.drag.placement(held, this.board, this.cell);
            if (placement && inRect(held.current, this.board)) {
              var color = this.session.canDrop(placement) ? new Color(76, 175, 80, 145) : new Color(229, 57, 53, 145);
              this.paintPiece(held.piece, held.rotation, this.board.x + placement.x * this.cell, this.board.y + placement.y * this.cell, this.cell, color);
            } else {
              this.paintPiece(held.piece, held.rotation, held.current.x - held.offset.x, held.current.y - held.offset.y, this.cell);
            }
          }
        };
        _proto.rotateSelected = function rotateSelected() {
          if (!this.selected || this.cleared || !this.session.remainingSeconds) return;
          if (!this.drag.rotateHeld()) this.session.rotatePiece(this.selected.id);
          this.paint();
        };
        _proto.start = function start(event) {
          var _this$slots$find,
            _this4 = this,
            _event$getID;
          var point = this.point(event);
          var button = this.buttons.find(function (entry) {
            return inRect(point, entry.rect);
          });
          if (button) {
            if (!this.drag.active || button.duringDrag && this.drag.active.mode === 'drag') button.action();
            return;
          }
          if (this.drag.active || this.cleared || !this.session.remainingSeconds) return;
          var piece;
          var offset = {
            x: this.cell / 2,
            y: this.cell / 2 + 22
          };
          var fromTray = inRect(point, this.tray);
          if (fromTray) piece = (_this$slots$find = this.slots.find(function (slot) {
            return inRect(point, slot.rect);
          })) == null ? void 0 : _this$slots$find.piece;
          if (inRect(point, this.board)) {
            var x = Math.floor((point.x - this.board.x) / this.cell);
            var y = Math.floor((point.y - this.board.y) / this.cell);
            var placement = this.session.placements.find(function (item) {
              var definition = _this4.level.pieces.find(function (candidate) {
                return candidate.id === item.pieceId;
              });
              return rotate(SHAPES[definition.shape], item.rotation).some(function (_ref6) {
                var dx = _ref6[0],
                  dy = _ref6[1];
                return item.x + dx === x && item.y + dy === y;
              });
            });
            if (placement) {
              piece = this.level.pieces.find(function (item) {
                return item.id === placement.pieceId;
              });
              offset = {
                x: point.x - this.board.x - placement.x * this.cell,
                y: point.y - this.board.y - placement.y * this.cell
              };
            }
          }
          if (!piece && !fromTray) return;
          this.drag.begin({
            id: (_event$getID = event.getID()) != null ? _event$getID : 0,
            start: point,
            time: this.now(),
            piece: piece,
            fromTray: fromTray,
            scrollStart: this.scroll,
            rotation: piece ? this.session.rotationFor(piece.id) : 0,
            offset: offset
          });
        };
        _proto.applyGesture = function applyGesture(gesture) {
          if (gesture.mode === 'drag') this.selected = gesture.piece;
          if (gesture.mode === 'scroll') {
            this.scroll = Math.max(0, Math.min(this.scrollLimit, gesture.scrollStart + gesture.start.x - gesture.current.x));
          }
        };
        _proto.move = function move(event) {
          var _event$getID2;
          var gesture = this.drag.move((_event$getID2 = event.getID()) != null ? _event$getID2 : 0, this.point(event));
          if (!gesture) return;
          this.applyGesture(gesture);
          this.paint();
        };
        _proto.end = function end(event) {
          var _event$getID3;
          var released = this.drag.release((_event$getID3 = event.getID()) != null ? _event$getID3 : 0, this.point(event), this.now());
          if (!released) return;
          var gesture = released.gesture,
            tap = released.tap;
          this.applyGesture(gesture);
          if (gesture.piece && this.session.remainingSeconds) {
            if (tap) {
              this.selected = gesture.piece;
              this.session.rotatePiece(gesture.piece.id);
            } else if (gesture.mode === 'drag') {
              var placement = this.drag.placement(gesture, this.board, this.cell);
              if (placement && inRect(gesture.current, this.board)) this.session.drop(placement);else if (!gesture.fromTray) this.session.returnToTray(gesture.piece.id, gesture.rotation);
            }
          }
          this.paint();
          if (this.session.solved && !this.cleared) {
            this.cleared = true;
            this.onClear();
          }
        };
        _proto.cancel = function cancel(event) {
          var _event$getID4;
          if (this.drag.cancel((_event$getID4 = event.getID()) != null ? _event$getID4 : 0)) this.paint();
        };
        return StagePage;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StageSession.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './shapes.ts', './validate.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, _createClass, cclegacy, clockwiseRotation, rotate, SHAPES, canPlace, validateSolution;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      clockwiseRotation = module.clockwiseRotation;
      rotate = module.rotate;
      SHAPES = module.SHAPES;
    }, function (module) {
      canPlace = module.canPlace;
      validateSolution = module.validateSolution;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7afd6mIJTlBCKEBqw5nOnY2", "StageSession", undefined);
      var StageSession = exports('StageSession', /*#__PURE__*/function () {
        function StageSession(level, now) {
          this.state = {
            rotations: new Map(),
            placements: new Map()
          };
          this.history = [];
          this.deadline = 0;
          this.level = level;
          this.now = now;
          this.restart();
        }
        var _proto = StageSession.prototype;
        _proto.restart = function restart() {
          this.state = {
            rotations: new Map(this.level.pieces.map(function (piece) {
              return [piece.id, piece.initialRotation];
            })),
            placements: new Map()
          };
          this.history = [];
          this.deadline = this.now() + this.level.timeLimitSec * 1000;
        };
        _proto.rotationFor = function rotationFor(id) {
          var _this$state$rotations;
          return (_this$state$rotations = this.state.rotations.get(id)) != null ? _this$state$rotations : 0;
        };
        _proto.canDrop = function canDrop(placement) {
          var _this = this;
          var occupied = new Set();
          var _loop = function _loop() {
            var other = _step.value;
            if (other.pieceId === placement.pieceId) return 1; // continue
            var piece = _this.level.pieces.find(function (item) {
              return item.id === other.pieceId;
            });
            for (var _iterator2 = _createForOfIteratorHelperLoose(rotate(SHAPES[piece.shape], other.rotation)), _step2; !(_step2 = _iterator2()).done;) {
              var _step2$value = _step2.value,
                x = _step2$value[0],
                y = _step2$value[1];
              occupied.add(x + other.x + "," + (y + other.y));
            }
          };
          for (var _iterator = _createForOfIteratorHelperLoose(this.state.placements.values()), _step; !(_step = _iterator()).done;) {
            if (_loop()) continue;
          }
          return canPlace(this.level, occupied, placement);
        };
        _proto.drop = function drop(placement) {
          if (!this.remainingSeconds || !this.canDrop(placement)) return false;
          this.remember();
          this.state.placements.set(placement.pieceId, _extends({}, placement));
          this.state.rotations.set(placement.pieceId, placement.rotation);
          return true;
        };
        _proto.returnToTray = function returnToTray(id, rotation) {
          if (rotation === void 0) {
            rotation = this.rotationFor(id);
          }
          if (!this.remainingSeconds || !this.state.rotations.has(id)) return;
          this.remember();
          this.state.placements["delete"](id);
          this.state.rotations.set(id, rotation);
        };
        _proto.rotatePiece = function rotatePiece(id) {
          if (!this.remainingSeconds || !this.state.rotations.has(id)) return;
          this.remember();
          var rotation = clockwiseRotation(this.rotationFor(id));
          this.state.rotations.set(id, rotation);
          var original = this.state.placements.get(id);
          if (!original) return;
          var rotated = _extends({}, original, {
            rotation: rotation
          });
          if (this.canDrop(rotated)) this.state.placements.set(id, rotated);else this.state.placements["delete"](id);
        };
        _proto.undo = function undo() {
          if (!this.remainingSeconds) return;
          var previous = this.history.pop();
          if (previous) this.state = previous;
        };
        _proto.remember = function remember() {
          this.history.push({
            rotations: new Map(this.state.rotations),
            placements: new Map(this.state.placements)
          });
        };
        _createClass(StageSession, [{
          key: "remainingSeconds",
          get: function get() {
            return Math.max(0, Math.ceil((this.deadline - this.now()) / 1000));
          }

          // Cocos Web Mobile can compile iterator spreads into array concatenation.
        }, {
          key: "placements",
          get: function get() {
            return Array.from(this.state.placements.values());
          }
        }, {
          key: "solved",
          get: function get() {
            return this.state.placements.size === this.level.pieces.length && validateSolution(this.level, this.placements).ok;
          }
        }]);
        return StageSession;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/types.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5aa55epegZEaIRuLwUp1L9E", "types", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIKit.ts", ['cc'], function (exports) {
  var cclegacy, Node, Layers, UITransform, Label, Color;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Label = module.Label;
      Color = module.Color;
    }],
    execute: function () {
      exports({
        fill: fill,
        label: label,
        uiNode: uiNode
      });
      cclegacy._RF.push({}, "038e2sNBGlP9I7KW7j0uXc6", "UIKit", undefined);
      function uiNode(name, parent, width, height) {
        var node = new Node(name);
        node.layer = Layers.Enum.UI_2D;
        node.addComponent(UITransform).setContentSize(width, height);
        parent.addChild(node);
        return node;
      }
      function label(parent, name, text, size, x, y) {
        var node = uiNode(name, parent, 720, size + 12);
        node.setPosition(x, y);
        var result = node.addComponent(Label);
        result.string = text;
        result.fontSize = size;
        result.lineHeight = size + 6;
        result.color = new Color(74, 44, 26);
        return result;
      }
      function fill(graphics, color, x, y, width, height, radius) {
        if (radius === void 0) {
          radius = 0;
        }
        graphics.fillColor = color;
        if (radius) graphics.roundRect(x, y, width, height, radius);else graphics.rect(x, y, width, height);
        graphics.fill();
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/validate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './shapes.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, rotate, SHAPES;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      rotate = module.rotate;
      SHAPES = module.SHAPES;
    }],
    execute: function () {
      exports({
        canPlace: canPlace,
        validateSolution: validateSolution
      });
      cclegacy._RF.push({}, "d836baVmwRLDbtp1iYKTM5O", "validate", undefined);
      function canPlace(level, occupied, placement) {
        var piece = level.pieces.find(function (p) {
          return p.id === placement.pieceId;
        });
        if (!piece || !Number.isInteger(placement.rotation) || placement.rotation < 0 || placement.rotation > 3 || !Number.isInteger(placement.x) || !Number.isInteger(placement.y)) return false;
        var blocked = new Set(level.blocked.map(function (_ref) {
          var x = _ref[0],
            y = _ref[1];
          return x + "," + y;
        }));
        return rotate(SHAPES[piece.shape], placement.rotation).every(function (_ref2) {
          var dx = _ref2[0],
            dy = _ref2[1];
          var x = dx + placement.x,
            y = dy + placement.y;
          return x >= 0 && y >= 0 && x < level.width && y < level.height && !blocked.has(x + "," + y) && !occupied.has(x + "," + y);
        });
      }
      function validateSolution(level, placements, removedPieceId) {
        if (!Number.isSafeInteger(level.width) || !Number.isSafeInteger(level.height) || level.width < 1 || level.height < 1 || new Set(level.pieces.map(function (piece) {
          return piece.id;
        })).size !== level.pieces.length || level.blocked.some(function (_ref3) {
          var x = _ref3[0],
            y = _ref3[1];
          return !Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= level.width || y >= level.height;
        }) || new Set(level.blocked.map(function (_ref4) {
          var x = _ref4[0],
            y = _ref4[1];
          return x + "," + y;
        })).size !== level.blocked.length) {
          return {
            ok: false,
            reason: 'invalid level'
          };
        }
        if (removedPieceId !== undefined && !level.pieces.some(function (p) {
          return p.id === removedPieceId;
        })) return {
          ok: false,
          reason: 'unknown removed piece'
        };
        var occupied = new Set(),
          seen = new Set();
        var _loop = function _loop() {
            var p = _step.value;
            if (p.pieceId === removedPieceId || seen.has(p.pieceId) || !canPlace(level, occupied, p)) return {
              v: {
                ok: false,
                reason: 'invalid placement'
              }
            };
            seen.add(p.pieceId);
            var piece = level.pieces.find(function (v) {
              return v.id === p.pieceId;
            });
            for (var _iterator2 = _createForOfIteratorHelperLoose(rotate(SHAPES[piece.shape], p.rotation)), _step2; !(_step2 = _iterator2()).done;) {
              var _step2$value = _step2.value,
                x = _step2$value[0],
                y = _step2$value[1];
              occupied.add(x + p.x + "," + (y + p.y));
            }
          },
          _ret;
        for (var _iterator = _createForOfIteratorHelperLoose(placements), _step; !(_step = _iterator()).done;) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
        if (seen.size !== level.pieces.length - (removedPieceId === undefined ? 0 : 1)) return {
          ok: false,
          reason: 'missing piece'
        };
        if (removedPieceId === undefined && occupied.size !== level.width * level.height - level.blocked.length) return {
          ok: false,
          reason: 'incomplete board'
        };
        return {
          ok: true
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/vehicles.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b3e01XYqMZNUrD4uKwotk9p", "vehicles", undefined);
      var wulingBlocked = [[0, 0], [10, 0], [0, 8], [10, 8]];
      for (var y = 0; y < 9; y++) {
        if (y !== 4) wulingBlocked.push([5, y]);
      }
      var motoBlocked = [];
      for (var _y = 0; _y < 10; _y++) motoBlocked.push([3, _y], [8, _y]);
      for (var _i = 0, _arr = [0, 1, 2]; _i < _arr.length; _i++) {
        var x = _arr[_i];
        motoBlocked.push([x, 0], [x, 1]);
      }
      for (var _i2 = 0, _arr2 = [9, 10]; _i2 < _arr2.length; _i2++) {
        var _x = _arr2[_i2];
        motoBlocked.push([_x, 8], [_x, 9]);
      }
      var pickupSquares = Array(17).fill('O4');
      var VEHICLES = exports('VEHICLES', [{
        id: 'wuling',
        name: '五菱宏光',
        width: 11,
        height: 9,
        blocked: wulingBlocked,
        preferredInventories: [['Z4', 'Y5', 'L3', 'Y5', 'I2', 'Y5', 'Z4', 'Z4', 'Y5', 'Z4', 'Y5', 'Z4', 'Y5', 'Z4', 'R6', 'Y5', 'Z4', 'Y5', 'Y5', 'I3']]
      }, {
        id: 'suv',
        name: 'SUV',
        width: 11,
        height: 9,
        blocked: [[0, 3], [0, 4], [0, 5], [1, 4], [9, 4]].concat(Array.from({
          length: 9
        }, function (_, y) {
          return [10, y];
        })),
        preferredInventories: [['O4', 'L3', 'Z5', 'O4', 'O4', 'O4', 'I3', 'Z5', 'O4', 'Z5', 'O4', 'Z5', 'O4', 'L3', 'Z5', 'R6', 'Z5', 'O4', 'O4', 'O4']]
      }, {
        id: 'pickup',
        name: '皮卡',
        width: 11,
        height: 8,
        blocked: [[0, 0], [0, 7], [10, 7]],
        preferredInventories: [['I2', 'I4', 'P5', 'R6'].concat(pickupSquares), ['I2', 'I4', 'N5', 'R6'].concat(pickupSquares), ['I3', 'I3', 'P5', 'R6'].concat(pickupSquares), ['I3', 'I3', 'L5', 'R6'].concat(pickupSquares), ['I3', 'I3', 'N5', 'R6'].concat(pickupSquares), ['I3', 'L3', 'P5', 'R6'].concat(pickupSquares)]
      }, {
        id: 'etrike',
        name: '电动三轮',
        width: 10,
        height: 10,
        blocked: [[0, 0], [1, 0], [2, 0], [9, 0], [8, 0], [7, 0], [0, 1], [1, 1], [9, 1], [8, 1], [0, 2], [9, 2], [0, 3], [9, 3], [0, 4], [9, 4], [0, 5], [9, 5]],
        preferredInventories: [['R6', 'L3', 'I3', 'I2', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4', 'O4']]
      }, {
        id: 'moto',
        name: '摩托车',
        width: 11,
        height: 10,
        blocked: motoBlocked,
        preferredInventories: [['O4', 'O4', 'O4', 'I2', 'I3', 'I2', 'O4', 'O4', 'O4', 'U5', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4'], ['O4', 'O4', 'O4', 'S4', 'I2', 'O4', 'O4', 'O4', 'I3', 'L3', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4', 'O4', 'R6', 'O4', 'O4']]
      }, {
        id: 'train',
        name: '绿皮火车',
        width: 11,
        height: 9,
        blocked: Array.from({
          length: 11
        }, function (_, x) {
          return [x, 3];
        }),
        preferredInventories: [['J4', 'Z5', 'L3', 'Z5', 'O4', 'J4', 'O4', 'O4', 'O4', 'Z4', 'Z5', 'O4', 'Z5', 'I2', 'Z5', 'Z4', 'Z5', 'L3', 'O4', 'Z4', 'R6']]
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WebPlatform.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0942ej2FQlO96Q85Swau4ac", "WebPlatform", undefined);
      var WebPlatform = exports('WebPlatform', /*#__PURE__*/function () {
        function WebPlatform() {}
        var _proto = WebPlatform.prototype;
        _proto.now = function now() {
          return Date.now();
        };
        _proto.hasLevelOverride = function hasLevelOverride() {
          return new URLSearchParams(window.location.search).has('level');
        };
        _proto.levelFilename = function levelFilename() {
          var _URLSearchParams$get;
          var value = (_URLSearchParams$get = new URLSearchParams(window.location.search).get('level')) != null ? _URLSearchParams$get : 'demo';
          if (!/^[a-zA-Z0-9_-]+(?:\.json)?$/.test(value)) throw new Error('关卡文件名无效');
          return value.replace(/\.json$/, '');
        };
        return WebPlatform;
      }());
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});