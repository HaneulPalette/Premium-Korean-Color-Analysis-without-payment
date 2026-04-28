let data = {};

function generateId() {
  return "HP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function analyzeImage() {
  const input = document.getElementById("imageInput");

  if (!input.files.length) {
    alert("Upload image");
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
      Undertone: ${data.undertone}<br>
      Brightness: ${data.brightness}<br>
      Depth: ${data.depth}
    `;
  }, 1000);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  const img = new Image();
  img.src = "logo.png";

  img.onload = function () {

    // ===== COVER PAGE =====
    doc.setFillColor(250, 247, 244);
    doc.rect(0, 0, pageWidth, 297, "F");

    doc.addImage(img, "PNG", pageWidth/2 - 20, 40, 40, 40);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(60, 60, 60);
    doc.text("HANEUL PALETTE", pageWidth / 2, 100, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(120);
    doc.text("Premium Korean Color Analysis", pageWidth / 2, 110, null, null, "center");

    doc.setFontSize(10);
    doc.text(`Analysis ID: ${data.id}`, pageWidth / 2, 125, null, null, "center");

    doc.addPage();

    // ===== CONTENT =====
    let y = 20;

    function section(title, lines) {
      doc.setFillColor(245, 240, 235);
      doc.rect(15, y - 6, 180, 8, "F");

      doc.setFontSize(13);
      doc.setTextColor(80);
      doc.text(title, 20, y);

      y += 8;

      doc.setFontSize(11);
      doc.setTextColor(50);

      lines.forEach(line => {
        doc.text(line, 20, y);
        y += 7;
      });

      y += 6;
    }

    section("Core Analysis", [
      `Undertone: ${data.undertone}`,
      `Brightness: ${data.brightness}`,
      `Depth: ${data.depth}`
    ]);

    section("Season Insight", [
      "Balanced seasonal harmony",
      "Soft Korean palette mapping"
    ]);

    section("Best Colors", [
      "Muted neutrals",
      "Soft tones",
      "Avoid harsh contrast"
    ]);

    section("Makeup Guide", [
      "Lip: MLBB shades",
      "Eyes: Soft browns",
      "Blush: Natural peach"
    ]);

    section("Wardrobe Guide", [
      "Minimal styling",
      "Layered neutrals",
      "Soft fabrics"
    ]);

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Haneul Palette © Premium Report", pageWidth / 2, 285, null, null, "center");

    doc.save("Haneul_Palette_Luxury_Report.pdf");
  };

  img.onerror = function () {
    alert("Logo not found. Make sure logo.png is uploaded.");
  };
}
