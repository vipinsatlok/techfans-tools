import { downloadImage } from "./downloadImage";
import puppeteer from "puppeteer";

export async function youtubeThumbnailDownload(url: string, path: string) {

    try {
        // Launch the browser
        const browser = await puppeteer.launch();

        // Create a page
        const page = await browser.newPage();

        // Go to your site
        await page.goto(url);

        // go to tag
        const selector = ".ytp-cued-thumbnail-overlay-image"
        await page.waitForSelector(selector)

        // get link
        const getImageUrl = await page.$eval(selector, (element: any) => element.getAttribute("style"))

        // create link
        const imageUrl = getImageUrl.split('("')[1].split('")')[0]

        // download image
        downloadImage(imageUrl, path)

        // Close browser.
        await browser.close();
        return true
    } catch (err) {
        return false
    }
}

export async function youtubePostDownload(url: string, path: string) {

    try {
        // Launch the browser
        const browser = await puppeteer.launch();

        // Create a page
        const page = await browser.newPage();

        // Go to your site
        await page.goto(url);

        // go to tag
        const selector = "#image-container #img"
        await page.waitForSelector(selector)

        const getImageUrl = await page.$eval(selector, element => element.getAttribute("src"))

        // download image
        await downloadImage(getImageUrl as string, path)

        // Close browser.
        await browser.close();
        return true
    } catch (err) {
        return false
    }
}