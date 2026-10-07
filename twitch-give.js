// ==UserScript==
// @name         Twitch Auto Claim Bonus
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  กดรับกล่องโบนัส Twitch อัตโนมัติ (Twitch Channel Points Bonus Auto Claim)
// @author       You
// @match        https://www.twitch.tv/*
// @match        https://twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function claimBonus() {
        // ค้นหาปุ่มโบนัสผ่าน icon (.claimable-bonus__icon) หรือ aria-label (รองรับทั้งภาษาไทยและอังกฤษ)
        const bonusIcon = document.querySelector('.claimable-bonus__icon');
        const bonusButton = bonusIcon
            ? bonusIcon.closest('button')
            : document.querySelector('button[aria-label="เคลมโบนัส"], button[aria-label="Claim Bonus"]');

        if (bonusButton) {
            bonusButton.click();
            console.log(`%c[Twitch Auto-Claim]%c เคลมโบนัสสำเร็จแล้ว! (${new Date().toLocaleTimeString()})`, 'color: #9146FF; font-weight: bold;', 'color: green;');
        }
    }

    // ตรวจสอบทุกๆ 3 วินาที
    setInterval(claimBonus, 3000);

    // หรือใช้ MutationObserver เผื่อให้กดทันทีที่ปุ่มโผล่ขึ้นมาใน DOM
    const observer = new MutationObserver(() => {
        claimBonus();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();