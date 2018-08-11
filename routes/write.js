var express = require('express')
const path = require('../config/5ch_path').default
const input = require('../config/5ch_path').input
const reses = require('../config/5ch_path').reses
const puppeteer = require("puppeteer")

process.on('unhandledRejection', console.dir);
let router = express.Router()


router.get('/build', (req, res, next) => {


    puppeteer.launch().then(async browser => {
        let target = null
        const page = await browser.newPage();
        await page.goto(path.board_url,{waitUntil:"networkidle2"});
        target = await page.$x(path.thread_build_target)
        await target[0].click()

        //-- スレ立て準備
        target = await page.$x(path.thread_build_title)
        await target[0].type(input.title)
        target = await page.$x(path.thread_build_res1)
        await target[0].type(input.res1)
        target = await page.$x(path.thread_build_submit1)
        await target[0].click()
        await page.waitForNavigation({waitUntil:"networkidle2"})

        //-- スレ立て
        target = await page.$x(path.thread_build_submit2)
        await target[0].click()
        await page.waitForNavigation({waitUntil:"networkidle2"})
        
        await page.screenshot({path: 'compelete.png', fullPage:true})
    
        console.log("complete!");
        await page.close();
        await browser.close();
    });
    res.send({ "status": "success" })
})


router.get('/write', (req, res, next) => {


    puppeteer.launch().then(async browser => {
        let target = null
        var page = await browser.newPage();
        await page.goto(path.thread_url,{waitUntil:"networkidle2"});
        target = await page.$x(path.thread_write_target)
        await target[0].click()

        //-- 初回書き込み（確認画面あり）
        target = await page.$x(path.thread_write_res)
        await target[0].type(`何回でも`)
        target = await page.$x(path.thread_write_submit1)
        await target[0].click()
        await page.waitForNavigation({waitUntil:"networkidle2"})

        target = await page.$x(path.thread_write_submit2)
        await target[0].click()
        await page.waitForNavigation({waitUntil:"networkidle2"})

        //-- ２回目以降の書き込み（確認なし）
        for ( _r in reses )  {
            await page.waitFor(1*60*1000)
            target = await page.$x(path.thread_write_res)
            await target[0].type(reses[_r])
            target = await page.$x(path.thread_write_submit1)
            await target[0].click()
            await page.waitForNavigation({waitUntil:"networkidle2"})
        }

        await page.screenshot({path: 'compelete.png', fullPage:true})
    
        console.log("complete!");
        await page.close();
        await browser.close();

    })
    res.send({ "status": "success" })
})

module.exports = router;