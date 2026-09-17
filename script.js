    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Player
    const player = { x: 400, y: 300, size: 30, speed: 5, color: '#00ffff' };

    // Rumah (Trigger CV)
    const house = { x: 100, y: 100, width: 100, height: 100, color: '#8b4513' };

    // NPC
    const npc = { x: 600, y: 200, size: 30, color: '#ff007f', text: "Halo! Pemilik web ini adalah seorang developer berbakat. Dekati rumah di pojok kiri atas untuk lihat CV-nya!" };

    // Tombol Input
    const keys = {};
    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup', e => keys[e.key] = false);

    // UI Elements
    const modal = document.getElementById('cvModal');
    const closeModal = document.getElementById('closeModal');
    const dialogBox = document.getElementById('dialogBox');
    const dialogText = document.getElementById('dialogText');

    closeModal.onclick = () => modal.classList.add('hidden');

    function update() {
    // Pergerakan Player
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

    // Cek Interaksi dengan Rumah (Buka CV)
    if (
        player.x < house.x + house.width &&
        player.x + player.size > house.x &&
        player.y < house.y + house.height &&
        player.y + player.size > house.y
    ) {
        modal.classList.remove('hidden');
    }

    // Cek Interaksi dengan NPC (Bicara)
    const distToNpc = Math.hypot(player.x - npc.x, player.y - npc.y);
    if (distToNpc < 50) {
        dialogText.innerText = npc.text;
        dialogBox.classList.remove('hidden');
    } else {
        dialogBox.classList.add('hidden');
    }
    }

    function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar Rumah
    ctx.fillStyle = house.color;
    ctx.fillRect(house.x, house.y, house.width, house.height);
    ctx.fillStyle = '#fff';
    ctx.fillText("RUMAH (CV)", house.x + 15, house.y + 55);

    // Gambar NPC
    ctx.fillStyle = npc.color;
    ctx.beginPath();
    ctx.arc(npc.x, npc.y, npc.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText("NPC Info", npc.x - 20, npc.y - 20);

    // Gambar Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    }

    function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
    }

    gameLoop();