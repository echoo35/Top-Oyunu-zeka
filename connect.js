// Oyuncuların sembollerini tanımlar
var playerRed = "R"; // Kırmızı oyuncu sembolü
var playerYellow = "Y"; // Sarı oyuncu sembolü
var currPlayer = playerRed; // Şu anki oyuncu (oyuna kırmızı başlar)

var gameOver = false; // Oyunun bitip bitmediğini belirleyen bayrak
var board; // Oyun tahtasını temsil eden matris
var rows = 6; // Oyun tahtasının satır sayısı
var columns = 7; // Oyun tahtasının sütun sayısı
var currColumns = []; // Sütunlardaki en son kullanılan satır indekslerini tutan dizi

// Sayfa yüklendiğinde oyunu başlatan fonksiyon
window.onload = function() {
    setGame();
}

// Oyunu başlatan fonksiyon
function setGame() {
    board = []; // Oyun tahtası matrisi sıfırlanır
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // Sütunlardaki en son kullanılan satır indeksleri sıfırlanır

    // Oyun tahtasını HTML'de oluşturur
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' '); // Her hücre boş bir karakterle başlatılır

            // Her hücreye tıklanabilirlik özelliği eklenir ve tıklama olayı için bir dinleyici atanır
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row); // Oluşturulan satır, oyun tahtası matrisine eklenir
    }
}

// Oyuncu sembolünü belirli bir hücreye yerleştiren fonksiyon
function setPiece() {
    if (gameOver) {
        return; // Oyun bittiyse herhangi bir işlem yapılmaz
    }

    // Tıklanan hücrenin koordinatlarını alır
    let coords = this.id.split("-");
    let r = parseInt(coords[0]); // Satır indeksi
    let c = parseInt(coords[1]); // Sütun indeksi

    r = currColumns[c]; // Yerleştirilecek sembolün bulunacağı satır indeksi belirlenir

    if (r < 0) {
        return; // Sütun doluysa herhangi bir işlem yapılmaz
    }

    // Oyun tahtasına sembolü yerleştirir
    board[r][c] = currPlayer;

    // Hücreye renkli bir sembol ekler ve sıradaki oyuncuyu değiştirir
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece"); // Kırmızı sembol eklenir
        currPlayer = playerYellow; // Sıradaki oyuncu sarı olur
    } else {
        tile.classList.add("yellow-piece"); // Sarı sembol eklenir
        currPlayer = playerRed; // Sıradaki oyuncu kırmızı olur
    }

    r -= 1; // Üzerine sembol yerleştirilen satırın bir üst satırı belirlenir
    currColumns[c] = r; // Sütundaki en son kullanılan satır indeksi güncellenir

    checkWinner(); // Kazananı kontrol eder
}

// Kazananı kontrol eden fonksiyon
function checkWinner() {
    // Yatay doğrultuda kazananı kontrol eder
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c); // Kazananı belirler ve oyunu bitirir
                    return;
                }
            }
        }
    }

    // Dikey doğrultuda kazananı kontrol eder
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c); // Kazananı belirler ve oyunu bitirir
                    return;
                }
            }
        }
    }

    // Çapraz doğrultuda (sol üstten sağ alta) kazananı kontrol eder
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c); // Kazananı belirler ve oyunu bitirir
                    return;
                }
            }
        }
    }

    // Çapraz doğrultuda (sağ üstten sol alta) kazananı kontrol eder
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c); // Kazananı belirler ve oyunu bitirir
                    return;
                }
            }
        }
    }
}

// Kazananı belirleyen ve oyunu bitiren fonksiyon
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins"; // Kırmızı oyuncu kazandı mesajı
    } else {
        winner.innerText = "Yellow Wins"; // Sarı oyuncu kazandı mesajı
    }
    gameOver = true; // Oyun bitti bayrağı aktif hale getirilir
}
