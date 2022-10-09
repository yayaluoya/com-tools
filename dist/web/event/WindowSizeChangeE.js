"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowSizeChangeE = void 0;
var BaseEvent_1 = require("../../BaseEvent");
var instanceTool_1 = require("../../instanceTool");
/**
 * 窗口大小改变事件
 */
var WindowSizeChangeE = /** @class */ (function (_super) {
    __extends(WindowSizeChangeE, _super);
    function WindowSizeChangeE() {
        var _this = _super.call(this) || this;
        addEventListener('resize', function () {
            _this.emit('resize');
        });
        return _this;
    }
    WindowSizeChangeE = __decorate([
        (0, instanceTool_1.instanceTool)(),
        __metadata("design:paramtypes", [])
    ], WindowSizeChangeE);
    return WindowSizeChangeE;
}(BaseEvent_1.BaseEvent));
exports.WindowSizeChangeE = WindowSizeChangeE;