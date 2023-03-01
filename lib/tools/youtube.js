"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubePostDownload = exports.youtubeThumbnailDownload = void 0;
const downloadImage_1 = require("./downloadImage");
const puppeteer_1 = require("puppeteer");
function youtubeThumbnailDownload(url, path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Launch the browser
            const browser = yield puppeteer_1.default.launch();
            // Create a page
            const page = yield browser.newPage();
            // Go to your site
            yield page.goto(url);
            // go to tag
            const selector = ".ytp-cued-thumbnail-overlay-image";
            yield page.waitForSelector(selector);
            // get link
            const getImageUrl = yield page.$eval(selector, (element) => element.getAttribute("style"));
            // create link
            const imageUrl = getImageUrl.split('("')[1].split('")')[0];
            // download image
            (0, downloadImage_1.downloadImage)(imageUrl, path);
            // Close browser.
            yield browser.close();
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.youtubeThumbnailDownload = youtubeThumbnailDownload;
function youtubePostDownload(url, path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Launch the browser
            const browser = yield puppeteer_1.default.launch();
            // Create a page
            const page = yield browser.newPage();
            // Go to your site
            yield page.goto(url);
            // go to tag
            const selector = "#image-container #img";
            yield page.waitForSelector(selector);
            const getImageUrl = yield page.$eval(selector, element => element.getAttribute("src"));
            // download image
            yield (0, downloadImage_1.downloadImage)(getImageUrl, path);
            // Close browser.
            yield browser.close();
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.youtubePostDownload = youtubePostDownload;
