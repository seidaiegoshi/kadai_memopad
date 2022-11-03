//-------------
//タグを押したときの処理
//-------------

let tagSelected = [];

//-------------
//method
//-------------
//新しいタグをタグリストに追加する。
//!これ使ってない
const recordAllTags = () => {

    const textAreaTag = $("#inputTodayTags").val();
    const splittedTagsList = textAreaTag.split(/,|#|\s|\n|\t/);
    for (let i = 0; i < splittedTagsList.length; i++) {
        if (splittedTagsList[i]) {//splitの連続による空白を除外
            //記入したタグが既存のタグ一覧に存在するかどうか
            let isExist = false;
            for (let j = 0; j < allTags.length; j++) {
                if (splittedTagsList[i] == allTags[j].name) {
                    isExist = true;
                }
            }
            //含まれていなかったら登録する。
            if (!isExist) {
                allTags.push({
                    num: allTags.length,
                    name: splittedTagsList[i],
                })
            }
        }
    }
}

//
const initSelectedTagArea = () => {

    //タグ一覧を表示する
    let htmlTagItems = "";
    for (let i = 0; i < allTags.length; i++) {
        htmlTagItems += "<li><input type='checkbox' name='tagGroup' id='boxTag" + i + "' value=" + allTags[i].name + "><label for='boxTag" + i + "'>" + allTags[i].name + "</label></li>";
    }
    $("#tagCheckBox").html(htmlTagItems);

    //タグ一覧にチェックをつける
    let allTagArr = [];
    if (allDiary[0]) {
        const todayTagList = allDiary[allDiary.length - 1].tag;
        // console.log(todayTagList);

        $('#tagCheckBox').find('label').each(function (index, element) {
            allTagArr.push(element.textContent);
            // console.log(index);
        })

        for (let i = 0; i < todayTagList.length; i++) {
            if (todayTagList[i]) {//splitの連続による空白を除外
                //記入したタグが既存のタグ一覧に存在するかどうか
                let isExist = false;
                for (let j = 0; j < allTagArr.length; j++) {
                    if (todayTagList[i] == allTagArr[j]) {
                        $("input[id='boxTag" + j + "']").prop("checked", true);
                    }
                }
            }
        }
    }
}


// tagSelected(選択したタグリスト)をセット
const setTagSelected = () => {
    tagSelected = [];
    $("[name='tagGroup']:checked").each((i, el) => {
        tagSelected.push($(el).val());
    });
}

