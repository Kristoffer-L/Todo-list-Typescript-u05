var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Initialize Supabase client
// const { createClient } = require('@supabase/supabase-js'); // Required for Node.js
// or if using a CDN:
var createClient = supabase.createClient;
var SUPABASE_URL = 'https://oztjzscfexuysiadcuzp.supabase.co'; // Replace with your Supabase URL
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dGp6c2NmZXh1eXNpYWRjdXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjY0ODYsImV4cCI6MjA1MjYwMjQ4Nn0.xsfo1W0hJSzYREYoBD3PYN79SuLd_8whoEwTECbQLH8'; // Replace with your Supabase Anon key
var supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
function getInfoSupa() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(supabase)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("response status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("data", data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var mainContainer = document.querySelector(".todo-section");
var input = document.querySelector(".desc-input");
var saveBtn = document.querySelector(".btn-save");
var clearBtn = document.querySelector(".btn-clear");
var todoItems = document.querySelectorAll("todo-element");
var count = 0;
var localStorageInfo = [];
var smtharray = JSON.parse(localStorage.localStorageInfo);
smtharray.forEach(function (item) {
    count++;
    item.id = count;
    createTodo(item);
});
saveBtn.addEventListener("click", function () {
    var todo = {
        id: count,
        description: input.value,
        status: true
    };
    count++;
    createTodo(todo);
});
function createTodo(todo) {
    localStorageInfo.push(todo);
    localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
    var divs = document.createElement("div");
    mainContainer.appendChild(divs);
    divs.classList.add("todo-element");
    var description = document.createElement("p");
    divs.appendChild(description);
    description.classList.add("description");
    description.textContent = todo.description;
    description.addEventListener("click", function () {
        if (todo.status) {
            description.style.textDecoration = "line-through";
            todo.status = false;
        }
        else {
            description.style.textDecoration = "none";
            todo.status = true;
        }
    });
    var edit = document.createElement("button");
    divs.appendChild(edit);
    edit.textContent = "redigera";
    edit.addEventListener("click", function () {
        var editInput = document.createElement("input");
        divs.appendChild(editInput);
        var editSave = document.createElement("button");
        divs.appendChild(editSave);
        editSave.textContent = "save";
        editSave.addEventListener("click", function () {
            description.textContent = editInput.value;
            todo.description = editInput.value;
            localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
            editInput.remove();
            editSave.remove();
        });
    });
    var remove = document.createElement("p");
    divs.appendChild(remove);
    remove.textContent = "X";
    remove.classList.add("remove");
    remove.addEventListener("click", function () {
        divs.remove();
    });
}
clearBtn.addEventListener("click", function () {
    mainContainer.innerHTML = "";
    localStorage.clear();
});
