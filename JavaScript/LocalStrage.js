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
    { num: 10, date: "2022/10/11(木)", memo: "gfjksdgjkdfsgdfkgjdffdasfjndsfkdsfldskfdsalfasdgpihjnfpgiodjfmgldkgndflkgndaflgkdnlkdfnds@kldnsgdslkgndsgkdsgmdlvsagdsalkvmdsglsgjsdfngjsfdgnsakfldsmfkldgndslkgndsgklsdngkldsnglkds:ngdkls:ngla:sgldksnglk:sdangkldsanglkdsnfdlksfndslkfdsondsgodsgnsogdslkagndsalgadgndaglndagjangagnadjgkndgkdagndagnd;gndklgndnfakgdfjgdlfs" },
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

let historyList = "";

//日付取得
const wd = ['日', '月', '火', '水', '木', '金', '土'];
const date = new Date();
const today = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "(" + wd[date.getDay()] + ")";
$("#today").text(today);




//データ取得
if (localStorage.getItem("diary")) {
    //ローカルストレージのデータを持ってくる
    //TODO 改行をちゃんと改行として認識するようにする。
    allDiary = JSON.parse(localStorage.getItem("diary"));

    // !debug
    // allDiary = dummyDiary;

    numPage = allDiary.length;

    // 日記の内容を表示
    for (let i = numPage - 1; i > numPage - 11; i--) {//逆順に表示
        //リストに表示
        if (0 <= i) {
            if (allDiary[i].num && 0 <= i) {
                historyList += "<li><p class=historyListDate>" + allDiary[i].num + ",\t" + allDiary[i].date + "</p>\t<p class='historyListMemo'>" + allDiary[i].memo + "</p></li>";//TODO :最後にnum消す
            }
        }
    };
    $("#historyListItems").html(historyList);

    //今日すでにメモを書いていたら、テキストエリア内に表示。
    if (allDiary[numPage - 1].date == today) {
        $("#inputTodayMemo").text(allDiary[numPage - 1].memo);
        $("#inputTodayTags").text(allDiary[numPage - 1].tag);

    }
}

//タグのデータ取得
if (localStorage.getItem("allTags")) {
    allTags = JSON.parse(localStorage.getItem("allTags"));
} else {
    allTags = [];
    allTags = dummyTags;
};

//-------------
//ボタンを押したときの処理
//-------------
$("#recordButton").on("click", () => {
    const memo = $("#inputTodayMemo").val();
    const textAreaTag = $("#inputTodayTags").val();
    const splittedTagsList = textAreaTag.split(" ");

    //新しいタグをタグリストに追加する。
    for (let i = 0; i < splittedTagsList.length; i++) {
        duplicationIndex = splittedTagsList.indexOf(allTags[i].name);
        //含まれていなかったら登録する。
        if (duplicationIndex === -1) {
            allTags.push({
                num: allTags.length,
                name: splittedTagsList[i],
            })
        }
    }

    //初めての投稿の場合
    if (!localStorage.getItem("diary")) {
        numPage = 0;
    } else {
        todayObject = {
            num: numPage,
            date: today,
            memo: memo,
            tag: splittedTagsList,
        };
    }

    //今日の日記データを全日記配列に入れる。
    if (allDiary[numPage - 1].date == today) {//日記配列に今日のデータを追加
        allDiary[numPage - 1] = todayObject;
    } else {
        console.log(allDiary[numPage - 1].date);
        console.log(today);
        allDiary.push(todayObject);
    }

    //日記データをローカルストレージに入れる。
    localStorage.setItem("diary", JSON.stringify(allDiary));
    localStorage.setItem("allTags", JSON.stringify(allTags));

});



