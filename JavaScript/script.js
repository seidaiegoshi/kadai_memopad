
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

    initDisplay();

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