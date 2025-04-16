async function checkStatus() {
  const phone = document.getElementById("phoneNumber").value.trim();
  if (!phone) {
    alert("Please enter a valid USA number");
    return;
  }

  const tcpaApi = `https://api.uspeoplesearch.net/tcpa/v1?x=${phone}`;
  const premiumLookupApi = `https://premium_lookup-1-h4761841.deta.app/person?x=${phone}`;

  try {
    const [tcpaResponse, personResponse] = await Promise.all([
      fetch(tcpaApi),
      fetch(premiumLookupApi)
    ]);

    const tcpaData = await tcpaResponse.json();
    const personData = await personResponse.json();

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <p><strong>Status:</strong> ${tcpaData.status || 'N/A'}</p>
      <p><strong>Phone:</strong> ${tcpaData.phone || 'N/A'}</p>
      <p><strong>Blacklist:</strong> ${tcpaData.listed || 'N/A'}</p>
      <p><strong>Litigator:</strong> ${tcpaData.type || 'N/A'}</p>
      <p><strong>State:</strong> ${tcpaData.state || 'N/A'}</p>
      <p><strong>DNC National:</strong> ${tcpaData.ndnc || 'N/A'}</p>
      <p><strong>DNC State:</strong> ${tcpaData.sdnc || 'N/A'}</p>
      <p><strong>Owner Name:</strong> ${personData.name || 'N/A'}</p>
      <p><strong>Address:</strong> ${personData.address || 'N/A'}</p>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("result").innerHTML = "<p style='color: red;'>Error fetching data</p>";
  }
}
