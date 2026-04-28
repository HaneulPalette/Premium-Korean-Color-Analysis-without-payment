let data = {};

function generateId() {
  return "HP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function analyzeImage() {
  const input = document.getElementById("imageInput");

  if (!input.files.length) {
    alert("Please upload an image");
    return;
  }

  document.getElementById("loading").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    data = {
      id: generateId(),
      undertone: ["Warm", "Cool", "Neutral"][Math.floor(Math.random()*3)],
      brightness: ["Soft", "Bright"][Math.floor(Math.random()*2)],
      depth: ["Light", "Deep"][Math.floor(Math.random()*2)]
    };

    document.getElementById("analysisId").innerText = data.id;

    document.getElementById("analysisText").innerHTML = `
      <p><b>Undertone:</b> ${data.undertone}</p>
      <p><b>Brightness:</b> ${data.brightness}</p>
      <p><b>Depth:</b> ${data.depth}</p>
    `;

  }, 1000);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const img = new Image();
  img.src = "logo.png";

  img.onload = function () {

    const content = `
    <div style="
      font-family: Helvetica, Arial;
      padding:40px;
      background:#faf7f4;
      color:#333;
    ">

      <!-- COVER -->
      <div style="text-align:center; margin-top:80px;">
        <img src="${img.src}" style="width:80px; margin-bottom:20px;" />
        <h1 style="letter-spacing:2px;">HANEUL PALETTE</h1>
        <p style="color:#888;">Premium Korean Color Analysis</p>
        <p style="margin-top:20px;">Analysis ID: ${data.id}</p>
      </div>

      <div style="page-break-after: always;"></div>

      <!-- CONTENT -->
      <h2 style="border-bottom:1px solid #ddd;">Core Analysis</h2>
      <p><b>Undertone:</b> ${data.undertone}</p>
      <p><b>Brightness:</b> ${data.brightness}</p>
      <p><b>Depth:</b> ${data.depth}</p>

      <h2 style="margin-top:25px; border-bottom:1px solid #ddd;">Season Insight</h2>
      <p>Balanced Korean seasonal harmony based on your features.</p>

      <h2 style="margin-top:25px; border-bottom:1px solid #ddd;">Best Colors</h2>
      <ul>
        <li>Soft neutrals</li>
        <li>Muted tones</li>
        <li>Low contrast palette</li>
      </ul>

      <h2 style="margin-top:25px; border-bottom:1px solid #ddd;">Makeup Guide</h2>
      <ul>
        <li>MLBB lip shades</li>
        <li>Soft brown eyeshadows</li>
        <li>Natural blush tones</li>
      </ul>

      <h2 style="margin-top:25px; border-bottom:1px solid #ddd;">Wardrobe Guide</h2>
      <ul>
        <li>Minimal styling</li>
        <li>Neutral layering</li>
        <li>Soft fabrics</li>
      </ul>

      <p style="text-align:center; margin-top:40px; font-size:12px; color:#aaa;">
        Haneul Palette © Premium Report
      </p>

    </div>
    `;

    doc.html(content, {
      callback: function (doc) {
        doc.save("Haneul_Palette_Luxury_Report.pdf");
      },
      x: 10,
      y: 10,
      width: 180,
      windowWidth: 800
    });
  };

  img.onerror = function () {
    alert("Logo not found. Make sure logo.png is in the same folder.");
  };
}
