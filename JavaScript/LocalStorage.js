// initSelectedTagArea();
// ゴミを消すよう
// localStorage.removeItem("diary");
// localStorage.removeItem("allTags");
const dummyDiary = [//!debug
    { num: 0, date: "2022/10/1(火)", memo: "aaa" },
    { num: 1, date: "2022/10/2(水)", memo: "aaafff" },
    { num: 2, date: "2022/10/3(木)", memo: "fdsfsdfsdf" },
    { num: 3, date: "2022/10/4(木)", memo: "fdsfsdfsdf" },
    { num: 4, date: "2022/10/5(木)", memo: "fdsfsdfsdf" },
    { num: 5, date: "2022/10/6(木)", memo: "fdsfsdfsdf" },
    { num: 6, date: "2022/10/7(木)", memo: "fdsfsdfsdf" },
    { num: 7, date: "2022/10/8(木)", memo: "fdsfsdfsdf" },
    { num: 8, date: "2022/10/9(木)", memo: "fdsfsdfsdf" },
    { num: 9, date: "2022/10/10(木)", memo: "fdsfsdfsdf" },
    { num: 10, date: "2022/11/1(水)", memo: "gfjksdgjkdfsgdfkgjdffdasfjndsfkdsfldskfdsalfasdgpihjnfpgiodjfmgldkgndflkgndaflgkdnlkdfnds@kldnsgdslkgndsgkdsgmdlvsagdsalkvmdsglsgjsdfngjsfdgnsakfldsmfkldgndslkgndsgklsdngkldsnglkds:ngdkls:ngla:sgldksnglk:sdangkldsanglkdsnfdlksfndslkfdsondsgodsgnsogdslkagndsalgadgndaglndagjangagnadjgkndgkdagndagnd;gndklgndnfakgdfjgdlfs" },
];

const dummyTags = [
    { num: 1, name: "test1" },
    { num: 3, name: "test2" },
    { num: 2, name: "test3" },
    { num: 4, name: "test4" },
    { num: 5, name: "test15" },
    { num: 6, name: "test6" },
    { num: 7, name: "test77" },
    { num: 8, name: "test8" },
]

//-------------
//初期化処理
//-------------
let numPage = 0;
let allDiary = [];
let allTags = [];

//日付取得
const wd = ['日', '月', '火', '水', '木', '金', '土'];
const date = new Date();
const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "(" + wd[date.getDay()] + ")";


//-------------
//function
//-------------
const setHistoryList = () => {
    let historyList = "";
    let tagItem = "";

    // 履歴リストを表示
    for (let i = allDiary.length - 1; i > allDiary.length - 11; i--) {//逆順に表示
        //リストに表示
        if (0 <= i) {
            if (allDiary[i].num) {
                if (allDiary[i].tag) {
                    tagItem = allDiary[i].tag;
                } else {
                    tagItem = "";
                }

                historyList += "<li><p class=historyListDate>" + allDiary[i].num + ",\t" + allDiary[i].date + "</p><p class=historyListTags>" + tagItem + "</p><p class='historyListMemo'>" + allDiary[i].memo + "</p></li>";//TODO :最後にnum消す
            }
        }
    };
    $("#historyListItems").html(historyList);
}

const setTodayMemo = () => {
    //今日すでにメモを書いていたら、テキストエリア内に表示。
    if (allDiary[0]) {
        if (allDiary[allDiary.length - 1].date == today) {
            $("#inputTodayMemo").text(allDiary[allDiary.length - 1].memo);

            $("#inputTodayTags").text(allDiary[allDiary.length - 1].tag);
        }
    }
}

const initDisplay = () => {
    $("#today").text(today);

    //日記データ取得
    if (localStorage.getItem("diary")) {
        //ローカルストレージのデータを持ってくる
        allDiary = JSON.parse(localStorage.getItem("diary"));
    }

    //登録済みタグのデータ取得
    if (localStorage.getItem("allTags")) {
        allTags = JSON.parse(localStorage.getItem("allTags"));
    } else {
        allTags = [];
        allTags = dummyTags;
    };

    setTodayMemo();
    setHistoryList();

    //タグリスト処理
    let htmlTagItems = "";
    for (let i = 0; i < allTags.length; i++) {
        htmlTagItems += "<li><input type='checkbox' name='tagGroup' id='boxTag" + i + "' value=" + allTags[i].name + "><label for='boxTag" + i + "'>" + allTags[i].name + "</label></li>";
    }
    $("#tagCheckBox").html(htmlTagItems);


}

const setObjToLocalStorage = (key, ojb) => {
    localStorage.setItem(key, JSON.stringify(ojb));
}
