//!debug
// ゴミを消すよう
// localStorage.removeItem("diary");
// localStorage.removeItem("allTags");
const dummyDiary = [
    { num: 0, date: "2022/10/1(火)", memo: "aaa", tag: "test1", },
    { num: 1, date: "2022/10/2(水)", memo: "aaafff", tag: "test2", },
    { num: 2, date: "2022/10/3(木)", memo: "fdsfsdfsdf", tag: "test3", },
    { num: 3, date: "2022/10/4(木)", memo: "fdsfsdfsdf", tag: "test4", },
    { num: 4, date: "2022/10/5(木)", memo: "fdsfsdfsdf", tag: "test5", },
    { num: 5, date: "2022/10/6(木)", memo: "fdsfsdfsdf", tag: "test6", },
    { num: 6, date: "2022/10/7(木)", memo: "fdsfsdfsdf", tag: "test7", },
    { num: 7, date: "2022/10/8(木)", memo: "fdsfsdfsdf", tag: "test8", },
    { num: 8, date: "2022/10/9(木)", memo: "fdsfsdfsdf", tag: "test9", },
    { num: 9, date: "2022/10/10(木)", memo: "fdsfsdfsdf", tag: "test10", },
    { num: 10, date: "2022/11/1(水)", memo: "gfjksdgjkdfsgdfkgjdffdasfjndsfkdsfldskfdsalfasdgpihjnfpgiodjfmgldkgndflkgndaflgkdnlkdfnds@kldnsgdslkgndsgkdsgmdlvsagdsalkvmdsglsgjsdfngjsfdgnsakfldsmfkldgndslkgndsgklsdngkldsnglkds:ngdkls:ngla:sgldksnglk:sdangkldsanglkdsnfdlksfndslkfdsondsgodsgnsogdslkagndsalgadgndaglndagjangagnadjgkndgkdagndagnd;gndklgndnfakgdfjgdlfs", tag: "test11" },
];

const dummyTags = [
    { num: 1, name: "test1" },
    { num: 3, name: "test2" },
    { num: 2, name: "test3" },
    { num: 4, name: "test4" },
    { num: 5, name: "test5" },
    { num: 6, name: "test6" },
    { num: 7, name: "test7" },
    { num: 8, name: "test8" },
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
})

// タグ追加ボタンをクリックしたとき
$("#buttonAddTag").on("click", () => {
    recordAllTags();
    setObjToLocalStorage("allTags", allTags);
})

//メモが変更されたら記録ボタンを有効にする。
$("#inputTodayMemo").on("input", () => {
    // if ()
    $("#buttonRecord").prop("disabled", false);
    console.log("test");
})