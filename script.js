/* ==========================================================================
   SCRIPT.JS - DỮ LIỆU 8 BẠN NỮ & XỬ LÝ CHUYỂN TRANG VIDEO
   ========================================================================== */

/* --------------------------------------------------------------------------
   BẠN HÃY DÁN 8 ĐƯỜNG LINK VIDEO CỦA TỪNG BẠN VÀO THUỘC TÍNH `videoUrl` DƯỚI ĐÂY
   (Hỗ trợ: Link YouTube, Link Google Drive, hoặc file video .mp4 trực tiếp)
   -------------------------------------------------------------------------- */
const girlsData = [
    {
        name: "Tường Vy",
        icon: "🌸",
        wish: "Chúc Tường Vy luôn xinh đẹp, rạng rỡ như đóa hoa xuân và đạt được mọi nguyện vọng mơ ước trong năm cuối cấp 12A5 nhé!",
        videoUrl: "https://drive.google.com/file/d/1_w46etoKPd8m4TAuVvzh4yPykdiU3740/view?usp=sharing" // <-- Thay link video của Tường Vy vào đây
    },
    {
        name: "Nguyên",
        icon: "🌷",
        wish: "Chúc Nguyên một ngày lễ tràn ngập niềm vui, tiếng cười, luôn giữ vững nguồn năng lượng tích cực và học thật giỏi nhé!",
        videoUrl: "https://drive.google.com/file/d/18qLmKiaGs8wEP4RNkl2AyDrA9FrhTnNf/view?usp=sharing" // <-- Thay link video của Nguyên vào đây
    },
    {
        name: "Hương Giang",
        icon: "🌺",
        wish: "Chúc Hương Giang luôn giữ nụ cười tỏa nắng trên môi, gặp thật nhiều may mắn và bứt phá điểm số thật cao trong năm lớp 12!",
        videoUrl: "https://drive.google.com/file/d/1kWnIEPeKmvkY8pFZS4Tm6xsd1ebb6Fzi/view?usp=sharingQ" // <-- Thay link video của Hương Giang vào đây
    },
    {
        name: "Ánh Ngọc",
        icon: "💎",
        wish: "Chúc Ánh Ngọc luôn tỏa sáng lấp lánh như chính tên gọi của mình, mãi vui vẻ, tự tin và hạnh phúc bên tập thể 12A5 nhé!",
        videoUrl: "https://drive.google.com/file/d/1zBD9qocc0Z91O2Wmmxw2JsqotfiNUCxi/view?usp=sharing" // <-- Thay link video của Ánh Ngọc vào đây
    },
    {
        name: "Minh Loan",
        icon: "🌻",
        wish: "Chúc Minh Loan có một ngày thật ý nghĩa, luôn rạng ngời như hoa hướng dương và gặt hái thật nhiều thành công phía trước!",
        videoUrl: "https://drive.google.com/file/d/1lh7wJRTgsJpkP-xuxjat2Nb6_kNPMnGP/view?usp=sharing" // <-- Thay link video của Minh Loan vào đây
    },
    {
        name: "Linh Sang",
        icon: "🌼",
        wish: "Chúc Linh Sang luôn yêu đời, xinh tươi, ngập tràn niềm vui mỗi ngày và đỗ vào ngôi trường đại học mà bạn hằng mơ ước!",
        videoUrl: "https://drive.google.com/file/d/1dSMvbTc_OqgwFOuKoa1s9_ieBLLiLJ1F/view?usp=sharing" // <-- Thay link video của Linh Sang vào đây
    },
    {
        name: "Thu Phương",
        icon: "🌹",
        wish: "Chúc Thu Phương dịu dàng, đáng yêu luôn nhận được thật nhiều yêu thương và đạt kết quả học tập rực rỡ nhất!",
        videoUrl: "https://drive.google.com/file/d/14IlI1QYcAggBQXyJIKSRyLuu1vnUGJtY/view?usp=sharing" // <-- Thay link video của Thu Phương vào đây
    },
    {
        name: "Khánh Chi",
        icon: "💐",
        wish: "Chúc Khánh Chi luôn tươi tắn, hạnh phúc, gặp nhiều điều may mắn và lưu giữ thật nhiều kỷ niệm đẹp cùng đại gia đình 12A5!",
        videoUrl: "https://drive.google.com/file/d/1Ws-Kjmh_cNCawzcw5KtXtTcGoveRCyJ5/view?usp=sharing" // <-- Thay link video của Khánh Chi vào đây
    }
];

// Lấy các phần tử giao diện
const homeView = document.getElementById('homeView');
const videoPageView = document.getElementById('videoPageView');
const girlsGrid = document.getElementById('girlsGrid');
const backHomeBtn = document.getElementById('backHomeBtn');

const recipientIcon = document.getElementById('recipientIcon');
const recipientName = document.getElementById('recipientName');
const recipientWish = document.getElementById('recipientWish');
const videoContainer = document.getElementById('videoContainer');
const directVideoLink = document.getElementById('directVideoLink');

// Hàm tự động chuyển đổi link YouTube hoặc Google Drive sang định dạng nhúng (Embed)
function convertToEmbedUrl(url) {
    if (!url) return "";

    // 1. Link YouTube dạng https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // 2. Link YouTube rút gọn dạng https://youtu.be/VIDEO_ID
    if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // 3. Link Google Drive dạng https://drive.google.com/file/d/FILE_ID/view...
    if (url.includes("drive.google.com/file/d/")) {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/file/d/${match[1]}/preview`;
        }
    }

    return url;
}

// Khởi tạo 8 nút bấm tên các bạn nữ
function renderGirlsList() {
    girlsGrid.innerHTML = "";
    girlsData.forEach((girl, index) => {
        const card = document.createElement('div');
        card.className = 'girl-card';
        card.onclick = () => showGirlVideoPage(index);
        card.innerHTML = `
            <div class="girl-icon">${girl.icon}</div>
            <div class="girl-name">${girl.name}</div>
            <div class="girl-btn-text">▶ Mở trang video</div>
        `;
        girlsGrid.appendChild(card);
    });
}

// Chuyển từ trang chủ sang trang chứa video riêng của bạn nữ được bấm
function showGirlVideoPage(index) {
    const girl = girlsData[index];

    recipientIcon.textContent = girl.icon;
    recipientName.textContent = `Dành tặng bạn ${girl.name} 💖`;
    recipientWish.textContent = girl.wish;
    directVideoLink.href = girl.videoUrl;

    const embedUrl = convertToEmbedUrl(girl.videoUrl);

    // Kiểm tra nếu là file video trực tiếp (.mp4, .webm, .mov) hay link nhúng iframe
    if (embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm') || embedUrl.endsWith('.mov')) {
        videoContainer.innerHTML = `
            <video controls autoplay>
                <source src="${embedUrl}" type="video/mp4">
                Trình duyệt của bạn không hỗ trợ phát video trực tiếp.
            </video>
        `;
    } else {
        videoContainer.innerHTML = `
            <iframe src="${embedUrl}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>
        `;
    }

    // Ẩn trang chủ, hiện trang video riêng và cuộn lên đầu trang
    homeView.classList.add('hidden');
    videoPageView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quay lại trang chủ (Lá thư & danh sách 8 bạn)
backHomeBtn.addEventListener('click', () => {
    videoContainer.innerHTML = ""; // Dừng phát video
    videoPageView.classList.add('hidden');
    homeView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Tạo hiệu ứng cánh hoa rơi lãng mạn
function createFallingPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 24;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 14 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 6 + 6}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petalsContainer.appendChild(petal);
    }
}

// Chạy khi tải trang
renderGirlsList();
createFallingPetals();
