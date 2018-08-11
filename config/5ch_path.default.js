exports.default = {
    board_url: "http://[server].5ch.net/[board]/",
    thread_build_target: "/html/body/div[17]/form/h3/span",
    thread_build_title: "/html/body/div[17]/form/p/input[2]",
    thread_build_res1: "/html/body/div[17]/form/p/textarea",
    thread_build_submit1: "/html/body/div[17]/form/p/input[1]",
    thread_build_submit2: "/html/body/form/input[9]",

    thread_url: "https://[server].5ch.net/test/read.cgi/[board]/[thread]/",
    thread_write_target: "/html/body/div[1]/div[13]/div[1]",
    thread_write_res: "/html/body/div[1]/div[13]/div[2]/form/p/textarea",
    thread_write_submit1: "/html/body/div[1]/div[13]/div[2]/form/p/input[6]",
    thread_write_submit2: "/html/body/form/input[10]",
}

exports.input = {
    //-- スレ立て情報
    title: "thread title",
    res1: `>>1`,
}

exports.reses = [
    //-- テンプレとか
    `>>2`,
    `>>3`,
    `>>4`,
    //`>>5...`,
]
