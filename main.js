import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// アイテムを使用して右クリックしたときのイベントを登録
world.afterEvents.itemUse.subscribe((data) => {
    // 右クリックしたプレイヤーを取得 [00:03:00]
    const player = data.source;
    // 使用されたアイテムを取得 [00:03:15]
    const item = data.itemStack;

    // ダイヤモンドを検知した場合に処理を実行 [00:03:28]
    if (item.typeId === "minecraft:diamond") {
        
        // 新しいアクションフォームの作成 [00:04:05]
        const sampleForm = new ActionFormData();
        
        // フォームのタイトルを設定 [00:04:13]
        sampleForm.title("第1回 API基礎知識講座");
        
        // フォームの本文を設定（§aは黄緑色、§rは色リセット、\nは改行） [00:04:21]
        sampleForm.body("今日から§aScript API§rについて紹介いたします。\nあなたも勉強しますか？");
        
        // ボタンの追加（上が0番、下が1番のインデックスになります） [00:04:59]
        sampleForm.button("はい");
        sampleForm.button("いいえ");

        // プレイヤーにフォームを表示 [00:05:20]
        sampleForm.show(player).then((response) => {
            // 右上のバツボタンなどで閉じられた場合は何もしない [00:05:30]
            if (response.canceled) return;

            // 「はい」（0番目のボタン）が押された場合 [00:05:43]
            if (response.selection === 0) {
                player.sendMessage("ありがとうございます！これからもよろしくお願いします！");
            }
            
            // 「いいえ」（1番目のボタン）が押された場合 [00:06:10]
            if (response.selection === 1) {
                player.sendMessage("それは残念です。");
            }
        });
    }
});
