// puppeteer을 가져온다.
const puppeteer = require("puppeteer");
// cheerio를 가져온다.
const cheerio = require("cheerio");

async function crawlGuildMaster(serverValue, searchValue) {
    let result = [];
    try {
        await (async () => {
            // 브라우저를 실행한다.
            // 옵션으로 headless모드를 끌 수 있다.
            const browser = await puppeteer.launch({
                headless: true,
            });

            // 새로운 페이지를 연다.
            const page = await browser.newPage();
            // 페이지의 크기를 설정한다.
            await page.setViewport({
                width: 1366,
                height: 768,
            });
            // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
            await page.goto(
                `https://maple.gg/guild/${serverValue}/${searchValue}`
            );
            await page.waitForSelector(
                "#guild-content > section > div:nth-child(5) > div"
            );
            // 페이지의 HTML을 가져온다.
            const content = await page.content();
            // $에 cheerio를 로드한다.
            const $ = cheerio.load(content);
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const worldLocation = $("#app");
            const master = $(
                "#guild-content > section > div.mb-4.row.text-center > div"
            );
            // 각 리스트의 하위 노드중 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
            const name = $(master)
                .find(
                    `section > div.member-grade > div > div:nth-child(1) > b > a`
                )
                .first()
                .text();
            const level = $(master)
                .find(
                    `section > div.member-grade.is-master > div > div:nth-child(2) > span`
                )
                .text();
            const world = $(worldLocation)
                .find(
                    `div > div.card-header.guild-header > section > div.mb-2 > span`
                )
                .text();
            // 브라우저를 종료한다.
            browser.close();
            result.push(name);
            result.push(world);
            result.push(level);
        })();
        return result;
    } catch (error) {
        console.log("길드를 찾지 못했습니다!");
        let result = ["길드를", "찾지", "못했습니다!"];
        return result;
    }
}

async function crawlGuildList(serverValue, searchValue) {
    const result = [];
    const inputList = [serverValue, searchValue];
    const masterList = [];
    const memberList = [];
    await (async () => {
        // 브라우저를 실행한다.
        // 옵션으로 headless모드를 끌 수 있다.
        const browser = await puppeteer.launch({
            headless: true,
        });

        // 새로운 페이지를 연다.
        const page = await browser.newPage();
        // 페이지의 크기를 설정한다.
        await page.setViewport({
            width: 1366,
            height: 768,
        });
        // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
        await page.goto(`https://maple.gg/guild/${serverValue}/${searchValue}`);
        await page.waitForSelector(
            "#guild-content > section > div:nth-child(5) > div"
        );
        // 페이지의 HTML을 가져온다.
        const content = await page.content();
        // $에 cheerio를 로드한다.
        const $ = cheerio.load(content);
        // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
        const master = $(
            "#guild-content > section > div.mb-4.row.text-center > div"
        );
        const member = $("#guild-content > section > div:nth-child(5) > div");

        // 모든 리스트를 순환한다.
        master.each((index, master) => {
            // 각 리스트의 하위 노드중 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
            const name = $(master)
                .find(
                    `section > div.member-grade > div > div:nth-child(1) > b > a`
                )
                .text();
            // 인덱스와 함께 로그를 찍는다.
            masterList.push(name);
        });
        member.each((index, member) => {
            // 각 리스트의 하위 노드중 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
            const name = $(member)
                .find(`section > div:nth-child(2) > b > a`)
                .text();
            memberList.push(name);
        });

        // 브라우저를 종료한다.
        browser.close();
        result.push(inputList);
        result.push(masterList);
        result.push(memberList);
    })();
    return result;
}

async function crawlUserInfo(userName) {
    let object;
    await (async () => {
        // 브라우저를 실행한다.
        // 옵션으로 headless모드를 끌 수 있다.
        const browser = await puppeteer.launch({
            headless: true,
        });

        // 새로운 페이지를 연다.
        const page = await browser.newPage();
        // 페이지의 크기를 설정한다.
        await page.setViewport({
            width: 1366,
            height: 768,
        });
        // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
        await page.goto(`https://maple.gg/u/${userName}`);
        await page.waitForSelector("#app > #user-profile");
        // 페이지의 HTML을 가져온다.
        const content = await page.content();
        // $에 cheerio를 로드한다.
        const $ = cheerio.load(content);
        // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
        const user = $("#app");
        // 모든 리스트를 순환한다.
        user.each((index, user) => {
            object = new Object();
            // 각 리스트의 하위 노드중 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
            // 이름
            object.이름 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > h3 > b`
                )
                .text();
            // 레벨
            object.레벨 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(1)`
                )
                .text()
                .replace(/\(.*\)/gi, "")
                .replace("Lv.", "");
            // 직업
            object.직업 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(2)`
                )
                .text();
            object.서버 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > h3 > img`
                )
                .attr("alt");
            object.마지막접속 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-4.pt-1.pt-sm-0.pb-1.pb-sm-0.text-center.mt-2.mt-lg-0 > div > div.col-6.col-md-8.col-lg-6 > div > span`
                )
                .text()
                .replace("마지막 활동일: ", "")
                .replace("\n                                일 전", "");
            //인기도
            object.인기도 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(3)`
                )
                .text()
                .replace("인기도\n                                ", "");
            // 길드
            object.길드 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.row.row-normal.user-additional > div.col-lg-2.col-md-4.col-sm-4.col-12.mt-3 > a`
                )
                .text();
            // 종합랭킹
            object.종합랭킹 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.row.row-normal.user-additional > div:nth-child(2) > span`
                )
                .text()
                .replace("\n                                위", "")
                .replace("- ", "")
                .replace("-", "");
            // 월드랭킹
            object.월드랭킹 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.row.row-normal.user-additional > div:nth-child(3) > span`
                )
                .text()
                .replace("위", "")
                .replace("- ", "")
                .replace("-", "");
            // 직업월드랭킹
            object.직업월드랭킹 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.row.row-normal.user-additional > div:nth-child(4) > span`
                )
                .text()
                .replace("위", "")
                .replace("- ", "")
                .replace("-", "");
            // 직업전체랭킹
            object.직업전체랭킹 = $(user)
                .find(
                    `#user-profile > section > div.row.row-normal > div.col-lg-8 > div.row.row-normal.user-additional > div:nth-child(5) > span`
                )
                .text()
                .replace("위", "")
                .replace("- ", "")
                .replace("-", "");
            // 무릉도장 기록
            object.무릉도장기록 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(1) > section > div > div > div > h1`
                )
                .text()
                .replace(
                    "\n                                                층",
                    ""
                );
            // 무릉도장 시간
            object.무릉도장시간 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(1) > section > div > div > div > small`
                )
                .text();
            // 더시드 기록
            object.더시드기록 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(2) > section > div > div > div > h1`
                )
                .text()
                .replace(
                    "\n                                                층",
                    ""
                );
            // 더시드 시간
            object.더시드시간 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(2) > section > div > div > div > small`
                )
                .text();
            // 유니온 기록
            object.유니온기록 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(3) > section > div > div > div`
                )
                .text();
            // 유니온 레벨
            object.유니온레벨 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(3) > section > div > div > span`
                )
                .text()
                .replace("Lv.", "");
            // 업적 기록
            object.업적기록 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(4) > section > div > div > div`
                )
                .text();
            // 업적 점수
            object.업적점수 = $(user)
                .find(
                    `div.card.border-bottom-0 > div > section > div.row.text-center > div:nth-child(4) > section > div > div > span`
                )
                .text()
                .replace("업적점수 ", "");
        });
        // 브라우저를 종료한다.
        browser.close();
    })();
    return object;
}

module.exports = { crawlGuildMaster, crawlGuildList, crawlUserInfo };
