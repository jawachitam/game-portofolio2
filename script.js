    import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

    // Inisialisasi Game Engine
    kaboom({
    background: [34, 139, 34], // Warna rumput hijau
    });

    // Load aset karakter bawaan Kaboom (si kotak 'bean') buat testing
    loadSprite("karakter", "https://kaboomjs.com/sprites/bean.png");

    // Bikin karakter player
    const player = add([
    sprite("karakter"),
    pos(width() / 2, height() / 2),
    area(),
    body(),
    ]);

    const SPEED = 200;

    // Logika Jalan pakai Keyboard (buat di laptop)
    onKeyDown("left", () => { player.move(-SPEED, 0); });
    onKeyDown("right", () => { player.move(SPEED, 0); });
    onKeyDown("up", () => { player.move(0, -SPEED); });
    onKeyDown("down", () => { player.move(0, SPEED); });

    // --- LOGIKA JALAN PAKAI TOMBOL HP (TOUCH) ---
    function setupMobileButton(btnId, dirX, dirY) {
    const btn = document.getElementById(btnId);
    let isPressing = false;

    btn.addEventListener("touchstart", (e) => { e.preventDefault(); isPressing = true; }, {passive: false});
    btn.addEventListener("touchend", (e) => { e.preventDefault(); isPressing = false; }, {passive: false});
    
    // Biar bisa ditahan terus buat jalan
    onUpdate(() => {
        if (isPressing) {
        player.move(dirX * SPEED, dirY * SPEED);
        }
    });
    }

    setupMobileButton("btn-up", 0, -1);
    setupMobileButton("btn-down", 0, 1);
    setupMobileButton("btn-left", -1, 0);
    setupMobileButton("btn-right", 1, 0);

    // Tombol Aksi HP
    const actionBtn = document.getElementById("btn-action");
    actionBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    // Nanti logika ngomong sama NPC ditaruh di sini
    addKaboom(player.pos); // Efek ledakan lucu buat ngetes tombol fungsi
    }, {passive: false});