//-------------
//初期化処理
//-------------
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

    // console.log(allDiary);
    // 履歴リストを表示
    // for (let i = allDiary.length - 1; i > allDiary.length - 11; i--) {//逆順に表示
    for (let i = allDiary.length - 1; i > 0; i--) {//逆順に表示
        //リストに表示
        if (0 <= i) {
            if (allDiary[i].num) {
                if (allDiary[i].tag) {
                    tagItem = "#" + allDiary[i].tag;
                } else {
                    tagItem = "";
                }
                historyList += "<li><p class=historyListDate>" + allDiary[i].date + "</p><p class=historyListTags>" + tagItem + "</p><p class='historyListMemo'>" + allDiary[i].memo + "</p></li>";
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
