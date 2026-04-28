let fullReport = "";

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
    document.getElementById("analysisId").innerText = id;

    // Random logic (placeholder)
    const undertones = ["Warm", "Cool", "Neutral"];
    const brightness = ["Bright", "Soft"];
    const depth = ["Light", "Deep"];
    const faceShapes = ["Oval", "Round", "Heart", "Square"];

    const u = undertones[Math.floor(Math.random() * undertones.length)];
    const b = brightness[Math.floor(Math.random() * brightness.length)];
    const d = depth[Math.floor(Math.random() * depth.length)];
    const f = faceShapes[Math.floor(Math.random() * faceShapes.length)];

    // Preview
    document.getElementById("analysisText").innerHTML = `
      <p><b>Undertone:</b> ${u}</p>
      <p><b>Brightness:</b> ${b}</p>
      <p><b>Depth:</b> ${d}</p>
      <p><b>Face Shape:</b> ${f}</p>
    `;

    // FULL PDF CONTENT
    fullReport = `
HANEUL PALETTE – PREMIUM REPORT

Analysis ID: ${id}

----------------------------------
CORE ANALYSIS
----------------------------------
Undertone: ${u}
Brightness: ${b}
Depth: ${d}
Face Shape: ${f}

----------------------------------
SEASON RESULT (SIMULATED)
----------------------------------
Primary Season: ${u} ${b} ${d}

----------------------------------
BEST COLORS
----------------------------------
• Soft neutrals
• Balanced tones
• Avoid extreme contrast

----------------------------------
MAKEUP GUIDE
----------------------------------
• Lipsticks: Nude, rose, coral
• Eyeshadow: Soft browns, taupe
• Blush: Natural peach/rose

----------------------------------
WARDROBE GUIDE
----------------------------------
• Avoid overly bright neon shades
• Prefer balanced tones
• Use layering for harmony

----------------------------------
END OF REPORT
----------------------------------
Haneul Palette ©
    `;

  }, 1200);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const lines = doc.splitTextToSize(fullReport, 180);
  doc.text(lines, 10, 10);

  doc.save("Haneul_Palette_Report.pdf");
}
