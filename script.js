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

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== BACKGROUND =====
  doc.setFillColor(250, 247, 244);
  doc.rect(0, 0, pageWidth, 297, "F");

  // ===== LOGO LOAD =====
  const img = new Image();
  img.src = "logo.png";

  img.onload = function () {

    // LOGO
    doc.addImage(img, "PNG", pageWidth/2 - 20, 20, 40, 40);

    // TITLE
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(60, 60, 60);
    doc.text("HANEUL PALETTE", pageWidth / 2, 70, null, null, "center");

    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text("Premium Korean Color Analysis", pageWidth / 2, 78, null, null, "center");

    doc.setFontSize(10);
    doc.text(`Analysis ID: ${data.id}`, pageWidth / 2, 90, null, null, "center");

    // ===== SECTIONS =====
    let y = 110;

    function section(title, lines) {
      doc.setFillColor(245, 240, 235);
      doc.rect(20, y - 6, 170, 8, "F");

      doc.setFontSize(13);
      doc.setTextColor(80);
      doc.text(title, 25, y);

      y += 8;

      doc.setFontSize(11);
      doc.setTextColor(50);

      lines.forEach(line => {
        doc.text(line, 25, y);
        y += 7;
      });

      y += 5;
    }

    section("Core Analysis", [
      `Undertone: ${data.undertone}`,
      `Brightness: ${data.brightness}`,
      `Depth: ${data.depth}`
    ]);

    section("Season Insight", [
      "Balanced Korean seasonal harmony",
      "Soft aesthetic mapping"
    ]);

    section("Best Colors", [
      "Muted neutrals",
      "Soft tones",
      "Avoid high contrast"
    ]);

    section("Makeup Guide", [
      "Lip: MLBB shades",
      "Eyes: soft browns",
      "Blush: peach tones"
    ]);

    section("Wardrobe Guide", [
      "Minimal styling",
      "Neutral layering",
      "Soft fabrics"
    ]);

    // FOOTER
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Haneul Palette ©", pageWidth / 2, 285, null, null, "center");

    // ✅ DOWNLOAD (THIS WILL WORK)
    doc.save("Haneul_Palette_Report.pdf");
  };

  img.onerror = function () {
    alert("logo.png not found. Please upload it in same folder.");
  };
}
