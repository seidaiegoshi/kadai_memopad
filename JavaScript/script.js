//!debug
// ゴミを消すよう
// localStorage.removeItem("diary");
// localStorage.removeItem("allTags");
const dummyDiary = [
    { num: 0, date: "2022/10/1(火)", memo: "うおー", tag: "いい日", },
    { num: 1, date: "2022/10/2(水)", memo: "これが", tag: "これは", },
    { num: 2, date: "2022/10/3(木)", memo: "人類の", tag: "人間", },
    { num: 3, date: "2022/10/4(木)", memo: "終焉である。長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト", tag: "オワタ", },
    { num: 4, date: "2022/10/5(木)", memo: "世紀末の", tag: "これはもう世紀末", },
    { num: 5, date: "2022/10/6(木)", memo: "この世界で", tag: "世界の命運", },
    { num: 6, date: "2022/10/7(木)", memo: "生き残ってみせる", tag: "サバイバル宣言日", },
    { num: 7, date: "2022/10/8(木)", memo: "パンデミック発生して", tag: "パンデミック発生宣言日", },
    { num: 8, date: "2022/10/9(木)", memo: "人間がゾンビになった。", tag: "ゾンビだこれ", },
    { num: 9, date: "2022/10/10(木)", memo: "死んでいるのに動いてやがる。", tag: "ゾンビ？", },
    { num: 10, date: "2022/11/1(水)", memo: "死んでいる人間を殺しても罪になりますか？", tag: "冤罪" },
];

const dummyTags = [
    { num: 1, name: "スクワット" },
    { num: 3, name: "瞑想" },
    { num: 2, name: "ランニング" },
    { num: 4, name: "腕立て" },
    { num: 5, name: "HIIT" },
    { num: 6, name: "腹筋" },
    { num: 7, name: "ウォーキング" },
    { num: 8, name: "サイクリング" },
    { num: 9, name: "お酒" },
    { num: 9, name: "大盛り" },
    { num: 9, name: "オートファジー" },
    { num: 10, name: "記憶がない" },
    { num: 11, name: "眠い" },
    { num: 11, name: "お金がない" },
    { num: 11, name: "時間がない" },
    { num: 11, name: "スーパーマン" },
    { num: 11, name: "億万長者になりたい" },
    {
        num: 11, name: "ブラジルの人聞こえますかーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー--------------------?"
    },
]
//!debug

//-------------
//宣言ゾーン
//-------------
memoBefore = $("#inputTodayMemo").val();


//-------------
//処理ゾーン
//-------------
initDisplay();
initSelectedTagArea();

//-------------
//ボタン監視ゾーン
//-------------
//「記録する」ボタンを押したときの処理
$("#buttonRecord").on("click", () => {
    const memo = $("#inputTodayMemo").val();
    setTagSelected();

    //今日の日記をオブジェクト化
    if (allDiary[0]) {
        todayObject = {
            num: allDiary.length,
            date: today,
            memo: memo,
            tag: tagSelected,
        };
    } else {//初めて記録する場合
        todayObject = {
            num: 0,
            date: today,
            memo: memo,
            tag: tagSelected,
        };
    }

    //今日の日記データを全日記配列に入れる。
    if (allDiary[0]) {
        if (allDiary[allDiary.length - 1].date == today) {//日記配列に今日のデータを追加
            allDiary[allDiary.length - 1] = todayObject;
        }
        else {
            allDiary.push(todayObject);
        }
    } else {
        allDiary.push(todayObject);
    }

    //日記データをローカルストレージに入れる。
    setObjToLocalStorage("diary", allDiary);
    // setObjToLocalStorage("diary", dummyDiary);//!debug
    setObjToLocalStorage("allTags", allTags);
    // setObjToLocalStorage("allTags", dummyTags);//!debug

    initDisplay();
    initSelectedTagArea();


});

// タグをせんたくしたときの処理
$("[name='tagGroup']").change(() => {
    setTagSelected();
    $("#buttonRecord").prop("disabled", false);
});


//メモが変更されたら記録ボタンを有効にする。
$("#inputTodayMemo").on("input", () => {
    $("#buttonRecord").prop("disabled", false);
});

$("#delStorage").on("click", () => {
    const result = confirm('今までのをコピーしてどっか保存した？');
    if (result) {
        localStorage.removeItem("diary");
        localStorage.removeItem("allTags");
        location.reload();
    }

});

$("#debugDummy").on("click", () => {//!debug
    setObjToLocalStorage("diary", dummyDiary);
    setObjToLocalStorage("allTags", dummyTags);
    location.reload();
})

$("#buttonAddTag").on("click", () => {
    //入力したタグが存在しなかったらタグ一覧に追加する。
    let isExist = false;
    allTags.forEach(at => {
        isIncluded = at.name.indexOf($("#inputTodayTags").val());
        console.log(isIncluded);
        if (isIncluded != -1) {
            isExist = true;
        }
    });
    if (!isExist) {
        allTags.unshift({
            num: allTags.length,
            name: $("#inputTodayTags").val(),
        })
    }

    setObjToLocalStorage("allTags", allTags);
    initDisplay();
    initSelectedTagArea();
})

