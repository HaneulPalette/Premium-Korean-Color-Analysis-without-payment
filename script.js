let analysisData = {};

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

    const id = generateId();

    const undertones = ["Warm", "Cool", "Neutral"];
    const brightness = ["Bright", "Soft"];
    const depth = ["Light", "Deep"];
    const faceShapes = ["Oval", "Round", "Heart", "Square"];

    analysisData = {
      id: id,
      undertone: undertones[Math.floor(Math.random() * undertones.length)],
      brightness: brightness[Math.floor(Math.random() * brightness.length)],
      depth: depth[Math.floor(Math.random() * depth.length)],
      faceShape: faceShapes[Math.floor(Math.random() * faceShapes.length)]
    };

    document.getElementById("analysisId").innerText = analysisData.id;

    document.getElementById("analysisText").innerHTML = `
      <p><b>Undertone:</b> ${analysisData.undertone}</p>
      <p><b>Brightness:</b> ${analysisData.brightness}</p>
      <p><b>Depth:</b> ${analysisData.depth}</p>
      <p><b>Face Shape:</b> ${analysisData.faceShape}</p>
    `;

  }, 1200);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // COVER PAGE
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.text("HANEUL PALETTE", 105, 40, null, null, "center");

  doc.setFontSize(12);
  doc.setTextColor(120);
  doc.text("Premium Korean Color Analysis", 105, 50, null, null, "center");

  doc.setFontSize(10);
  doc.text(`Analysis ID: ${analysisData.id}`, 105, 65, null, null, "center");

  doc.addPage();

  // CONTENT PAGE
  let y = 20;

  function section(title, contentArray) {
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(title, 20, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(60);

    contentArray.forEach(line => {
      doc.text("• " + line, 25, y);
      y += 7;
    });

    y += 5;
  }

  section("Core Analysis", [
    `Undertone: ${analysisData.undertone}`,
    `Brightness: ${analysisData.brightness}`,
    `Depth: ${analysisData.depth}`,
    `Face Shape: ${analysisData.faceShape}`
  ]);

  section("Season Insight", [
    "Personalized seasonal palette",
    "Balanced harmony based on features"
  ]);

  section("Best Colors", [
    "Soft neutrals",
    "Balanced tones",
    "Avoid harsh contrast"
  ]);

  section("Makeup Guide", [
    "Lipsticks: Rose, coral, nude",
    "Eyeshadow: Soft browns, taupe",
    "Blush: Natural peach/rose"
  ]);

  section("Wardrobe Guide", [
    "Avoid neon shades",
    "Prefer balanced tones",
    "Use layering techniques"
  ]);

  doc.save("Haneul_Palette_Premium_Report.pdf");
}
