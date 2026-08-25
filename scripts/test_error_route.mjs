async function testErrorRoute() {
  try {
    const res = await fetch("http://localhost:3000/report/nonexistentuser_xyz_987654");
    console.log(`Error route status: ${res.status}`);
    const html = await res.text();
    console.log(`Contains Letterboxd user not found:`, html.includes("Letterboxd user not found"));
    console.log(`Contains Try another username:`, html.includes("Try another username"));
  } catch (err) {
    console.error("Error route test error:", err.message);
  }
}

testErrorRoute();
